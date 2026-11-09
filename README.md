# @currybag/website-kit

Shared platform UI for Currybag marketing sites (`lovinglanka-website`, `einfall-website`, …).

Public so DO/CI can install via `github:` without a registry token. Brand copy, nav, tokens, and pages stay in each site. Only infra-alike pieces live here.

## Install

```bash
pnpm add github:Currybag/currybag-website-kit#v0.2.0
```

Pin a semver tag and bump consciously in each consumer.

## EnvSwitch

```tsx
import { EnvSwitch } from "@currybag/website-kit/env-switch";

<EnvSwitch
  localOrigin="http://localhost:3001"
  liveOrigin={site.origin}
  requireStaff
  staffEnabled={staffEnabled}
/>
```

On localhost the switch always shows. On live, pass `staffEnabled` from the staff-bridge cookie session.

Expects optional CSS variables `--bg` and `--ink-soft` on the host (both marketing sites define them).

## Staff bridge (server-only)

```ts
import {
  verifyStaffBridgeToken,
  signStaffSessionToken,
  resolveStaffBridgeHmacSecret,
} from "@currybag/website-kit/staff-bridge";
```

Uses `STAFF_BRIDGE_HMAC_SECRET` (same value as currybag-erp). Do not import this entry from client components (`node:crypto`).

## Develop

```bash
pnpm install
pnpm build
```
