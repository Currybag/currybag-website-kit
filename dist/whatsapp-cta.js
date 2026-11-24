/**
 * Shared Click-to-Chat helpers for marketing sites.
 * Display number is public (NEXT_PUBLIC_WHATSAPP_E164) — never put API tokens here.
 */
export function buildWaMeUrl(displayE164, prefillText) {
    const digits = displayE164.replace(/\D/g, '');
    return `https://wa.me/${digits}?text=${encodeURIComponent(prefillText)}`;
}
export function buildBrandPrefill(options) {
    const head = `[${options.brand} · ${options.intent}]`;
    return options.extra ? `${head} ${options.extra}` : `${head} `;
}
