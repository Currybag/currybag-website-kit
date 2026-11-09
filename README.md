# @currybag/website-kit

Shared platform UI for Currybag marketing sites (`lovinglanka-website`, `einfall-website`, …).

Brand copy, nav, tokens, and pages stay in each site. Only infra-alike pieces live here.

## Install

```bash
pnpm add github:Currybag/currybag-website-kit#v0.1.1
```

Pin a semver tag and bump consciously in each consumer.

## EnvSwitch

```tsx
import { EnvSwitch } from "@currybag/website-kit/env-switch";

<EnvSwitch localOrigin="http://localhost:3001" liveOrigin={site.origin} />
```

Expects optional CSS variables `--bg` and `--ink-soft` on the host (both marketing sites define them).

## Develop

```bash
pnpm install
pnpm build
```
