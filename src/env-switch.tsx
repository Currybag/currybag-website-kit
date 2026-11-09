"use client";

import { useEffect, useState, type CSSProperties } from "react";

export interface EnvSwitchProps {
  /** Local dev origin, e.g. http://localhost:3001 */
  localOrigin: string;
  /** Production origin, e.g. https://lovinglanka.ch */
  liveOrigin: string;
  className?: string;
  style?: CSSProperties;
}

interface EnvSwitchTarget {
  href: string;
  toLive: boolean;
}

function isLocalOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin);
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0"
    );
  } catch {
    return false;
  }
}

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/$/, "");
}

function resolveEnvSwitchTarget(
  localOrigin: string,
  liveOrigin: string,
): EnvSwitchTarget {
  const { origin, pathname, search, hash } = window.location;
  const suffix = `${pathname}${search}${hash}`;
  if (isLocalOrigin(origin)) {
    return { href: `${normalizeOrigin(liveOrigin)}${suffix}`, toLive: true };
  }
  return { href: `${normalizeOrigin(localOrigin)}${suffix}`, toLive: false };
}

const defaultStyle: CSSProperties = {
  position: "fixed",
  bottom: "0.375rem",
  left: "1rem",
  zIndex: 60,
  margin: 0,
  borderRadius: "0.25rem",
  background: "color-mix(in srgb, var(--bg, #fff) 90%, transparent)",
  padding: "0.125rem 0.375rem",
  fontSize: "11px",
  lineHeight: 1.4,
  color: "var(--ink-soft, #666)",
  boxShadow: "0 1px 2px rgb(0 0 0 / 0.06)",
};

const linkStyle: CSSProperties = {
  color: "inherit",
  textDecoration: "none",
};

/**
 * Live ↔ Local origin hop (path/search/hash preserved).
 * Uses CSS vars `--bg` / `--ink-soft` when the host site defines them.
 */
export function EnvSwitch({
  localOrigin,
  liveOrigin,
  className,
  style,
}: EnvSwitchProps) {
  const [target, setTarget] = useState<EnvSwitchTarget | null>(null);

  useEffect(() => {
    setTarget(resolveEnvSwitchTarget(localOrigin, liveOrigin));
  }, [localOrigin, liveOrigin]);

  if (!target) return null;

  const label = target.toLive ? "Live" : "Local";

  return (
    <p className={className} style={{ ...defaultStyle, ...style }}>
      <a href={target.href} title={label} style={linkStyle}>
        {label}
      </a>
    </p>
  );
}
