<!-- Synced from antfu/skills@8886fe2:skills/nitro/SKILL.md by scripts/sync.mjs. Edit sources.json, not this file. -->

> The skill is based on Nitro v3 (beta, 3.0.260903), generated at 2026-09-25.

Nitro is a framework-agnostic, deployment-agnostic server toolkit powered by [H3](https://h3.dev) v2, [unstorage](https://unstorage.unjs.io), and Vite/Rolldown/Rollup. It powers Nuxt and works standalone. From one codebase it builds optimized output for Node.js, Bun, Deno, Cloudflare, Vercel, Netlify, and more.

Key capabilities:
- **Filesystem routing** with H3 v2 event handlers, dynamic params, and method suffixes.
- **Route rules** for declarative caching, headers, redirects, proxying, and CORS.
- **Caching** layer (cached handlers/functions, SWR) on top of the **unstorage** KV layer.
- **Runtime config** overridable via `NITRO_*` env vars.
- **Tasks** (on-demand + scheduled/cron), **WebSockets**/SSE, a SQL **database** layer, and **OpenAPI** auto-docs.
- **Plugins & lifecycle hooks**, custom **renderer**/**server entry**, and portable **deployment presets**.

> **Key v3 changes** (vs. `nitropack` v2): the package is renamed `nitropack` → `nitro` with H3 v2 (web-standard `Request`/`Response`); **auto-imports are removed** (import everything explicitly); directory scanning is **opt-in** via `serverDir`; `useStorage` → `useKV` (`nitro/kv`) and the `storage` config option → `kv`; cache `swr` now defaults to `false`. If unsure about v2-vs-v3 APIs, read [advanced-migration](nitro/advanced-migration.md) first.

## Core

| Topic | Description | Reference |
|-------|-------------|-----------|
| Routing | File-based routes, `defineHandler`, params, middleware, route rules, errors | [core-routing](nitro/core-routing.md) |
| Configuration | `nitro.config.ts`, `defineConfig`, key options, runtime config | [core-configuration](nitro/core-configuration.md) |
| Storage | unstorage KV, mount points, drivers, dynamic mounts | [core-storage](nitro/core-storage.md) |
| Cache | `defineCachedHandler`, `defineCachedFunction`, SWR, invalidation | [core-cache](nitro/core-cache.md) |
| Assets | Public assets, compression, server assets via storage | [core-assets](nitro/core-assets.md) |
| Rendering | Renderer (HTML/SSR), server entry, framework integration | [core-rendering](nitro/core-rendering.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Plugins & Hooks | `definePlugin`, runtime lifecycle hooks, error capture | [features-plugins](nitro/features-plugins.md) |
| Tasks | On-demand & scheduled (cron) tasks, `runTask` | [features-tasks](nitro/features-tasks.md) |
| WebSocket & SSE | `defineWebSocketHandler`, pub/sub, namespaces, event streams | [features-websocket](nitro/features-websocket.md) |
| Database | Built-in SQL layer via db0, `useDatabase`, connectors | [features-database](nitro/features-database.md) |
| OpenAPI | Auto spec from `defineRouteMeta`, Scalar/Swagger UIs | [features-openapi](nitro/features-openapi.md) |

## Advanced / Deployment

| Topic | Description | Reference |
|-------|-------------|-----------|
| Deployment Presets | Runtimes & providers, compatibility dates, platform integration | [deploy-presets](nitro/deploy-presets.md) |
| v2 → v3 Migration | Package rename, `nitro/*` imports, H3 v2 API, preset changes | [advanced-migration](nitro/advanced-migration.md) |
