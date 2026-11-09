import { type CSSProperties } from "react";
export interface EnvSwitchProps {
    /** Local dev origin, e.g. http://localhost:3001 */
    localOrigin: string;
    /** Production origin, e.g. https://lovinglanka.ch */
    liveOrigin: string;
    /**
     * When true (default), hide on non-local origins unless staff status is ok.
     * Localhost / 127.0.0.1 / 0.0.0.0 always show.
     */
    requireStaff?: boolean;
    /**
     * Same-origin status endpoint returning `{ ok: boolean }`.
     * Default: `/api/staff-bridge/status`
     */
    staffStatusUrl?: string;
    className?: string;
    style?: CSSProperties;
}
/**
 * Live ↔ Local origin hop (path/search/hash preserved).
 * On live, gated by staff-bridge status fetch (avoids static RSC baking).
 */
export declare function EnvSwitch({ localOrigin, liveOrigin, requireStaff, staffStatusUrl, className, style, }: EnvSwitchProps): import("react").JSX.Element | null;
//# sourceMappingURL=env-switch.d.ts.map