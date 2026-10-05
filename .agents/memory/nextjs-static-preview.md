---
name: Next.js static preview
description: Next.js 16 static export and development preview behavior in this workspace.
---

For Next.js static export, set `output: "export"` only for production builds and allow `127.0.0.1` as a development origin. Leaving export mode on during `next dev` caused catch-all static-parameter errors; not allowing the proxy origin blocked HMR.

**Why:** The Replit preview proxies the app through `127.0.0.1`, and Next.js 16 applies static-export checks differently in development and production.

**How to apply:** Keep the development server on normal `next dev` behavior, allow its proxied origin, and verify static export through the production build.
