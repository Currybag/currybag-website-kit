import { type CSSProperties } from "react";
export interface EnvSwitchProps {
    /** Local dev origin, e.g. http://localhost:3001 */
    localOrigin: string;
    /** Production origin, e.g. https://lovinglanka.ch */
    liveOrigin: string;
    /**
     * When true (default), hide on non-local origins unless `staffEnabled`.
     * Localhost / 127.0.0.1 / 0.0.0.0 always show.
     */
    requireStaff?: boolean;
    /** Server-resolved staff bridge cookie session (live only). */
    staffEnabled?: boolean;
    className?: string;
    style?: CSSProperties;
}
/**
 * Live ↔ Local origin hop (path/search/hash preserved).
 * Uses CSS vars `--bg` / `--ink-soft` when the host site defines them.
 */
export declare function EnvSwitch({ localOrigin, liveOrigin, requireStaff, staffEnabled, className, style, }: EnvSwitchProps): import("react").JSX.Element | null;
//# sourceMappingURL=env-switch.d.ts.map