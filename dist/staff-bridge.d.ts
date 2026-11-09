/** One-time ERP→marketing bridge token (short TTL). */
export interface StaffBridgeTokenPayload {
    sub: string;
    exp: number;
    aud: "marketing";
    site: string;
    path: string;
}
/** Longer-lived first-party marketing cookie session. */
export interface StaffSessionPayload {
    sub: string;
    exp: number;
    aud: "staff-session";
}
export declare const STAFF_SESSION_TTL_MS: number;
export declare function resolveStaffBridgeHmacSecret(env?: NodeJS.ProcessEnv): string | null;
export declare function verifyStaffBridgeToken(token: string, secret: string): StaffBridgeTokenPayload | null;
export declare function signStaffSessionToken(payload: StaffSessionPayload, secret: string): string;
export declare function verifyStaffSessionToken(token: string, secret: string): StaffSessionPayload | null;
/** Relative path only — rejects open redirects. */
export declare function sanitizeStaffBridgePath(raw: string | null | undefined): string;
//# sourceMappingURL=staff-bridge.d.ts.map