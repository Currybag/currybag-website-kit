import { createHmac, timingSafeEqual } from "node:crypto";
const MIN_SECRET_LENGTH = 32;
export const STAFF_SESSION_TTL_MS = 12 * 60 * 60 * 1000;
export function resolveStaffBridgeHmacSecret(env = process.env) {
    const dedicated = env.STAFF_BRIDGE_HMAC_SECRET?.trim();
    if (dedicated && dedicated.length >= MIN_SECRET_LENGTH) {
        return dedicated;
    }
    return null;
}
function signBody(body, secret) {
    const sig = createHmac("sha256", secret).update(body).digest("base64url");
    return Buffer.from(`${body}.${sig}`, "utf8").toString("base64url");
}
function verifyBody(token, secret) {
    let raw;
    try {
        raw = Buffer.from(token, "base64url").toString("utf8");
    }
    catch {
        return null;
    }
    const dot = raw.lastIndexOf(".");
    if (dot <= 0)
        return null;
    const body = raw.slice(0, dot);
    const sig = raw.slice(dot + 1);
    const expected = createHmac("sha256", secret).update(body).digest("base64url");
    try {
        if (sig.length !== expected.length ||
            !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
            return null;
        }
    }
    catch {
        return null;
    }
    return body;
}
export function verifyStaffBridgeToken(token, secret) {
    const body = verifyBody(token, secret);
    if (!body)
        return null;
    try {
        const payload = JSON.parse(body);
        if (payload.aud !== "marketing")
            return null;
        if (typeof payload.exp !== "number" || payload.exp < Date.now())
            return null;
        if (typeof payload.sub !== "string" || !payload.sub)
            return null;
        if (typeof payload.site !== "string" || !payload.site)
            return null;
        if (typeof payload.path !== "string" || !payload.path.startsWith("/")) {
            return null;
        }
        return payload;
    }
    catch {
        return null;
    }
}
export function signStaffSessionToken(payload, secret) {
    return signBody(JSON.stringify(payload), secret);
}
export function verifyStaffSessionToken(token, secret) {
    const body = verifyBody(token, secret);
    if (!body)
        return null;
    try {
        const payload = JSON.parse(body);
        if (payload.aud !== "staff-session")
            return null;
        if (typeof payload.exp !== "number" || payload.exp < Date.now())
            return null;
        if (typeof payload.sub !== "string" || !payload.sub)
            return null;
        return payload;
    }
    catch {
        return null;
    }
}
/** Relative path only — rejects open redirects. */
export function sanitizeStaffBridgePath(raw) {
    const fallback = "/";
    if (!raw?.trim())
        return fallback;
    const path = raw.trim();
    if (!path.startsWith("/"))
        return fallback;
    if (path.startsWith("//") || path.startsWith("/\\"))
        return fallback;
    if (path.includes("://") || path.includes("\\") || /[\0\r\n]/.test(path)) {
        return fallback;
    }
    return path.split("#")[0] || fallback;
}
