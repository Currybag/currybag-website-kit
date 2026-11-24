/**
 * Shared Click-to-Chat helpers for marketing sites.
 * Display number is public (NEXT_PUBLIC_WHATSAPP_E164) — never put API tokens here.
 */
export declare function buildWaMeUrl(displayE164: string, prefillText: string): string;
export declare function buildBrandPrefill(options: {
    brand: 'Loving Lanka' | 'Currybag';
    intent: string;
    extra?: string;
}): string;
//# sourceMappingURL=whatsapp-cta.d.ts.map