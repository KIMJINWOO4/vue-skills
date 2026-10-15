---
name: nuxt
description: Nuxt 4 full-stack Vue framework. app directory layout, file-based routing, layouts and middleware, useFetch and useAsyncData, useState, server routes on Nitro, rendering modes and route rules, modules and layers, deployment, plus Nitro v3 and Nuxt 5 preparation. Use when working in a project with nuxt.config.ts, server/ routes, Nuxt modules, or when writing a Nuxt module.
---

# Nuxt

Versions checked on 2026-10-15: Nuxt 4.6.1 (Node `^22.22.3 || ^24.15.0 || >=26`). Nuxt 3 reached end of life on 2026-07-31. Nuxt 5 is planned for Q4 2026 and exists only as nightly builds. Nuxt 4 server code runs on `nitropack` 2.x; Nitro v3 (`nitro`) is in public beta.

## Before writing code

1. Read `nuxt.config.ts`: `compatibilityVersion`, modules, `experimental` flags, `srcDir`.
2. Check the layout. Nuxt 4 puts app code in `app/` (`~` and `@` point there); `server/`, `shared/`, `public/`, `modules/` and `layers/` stay at the root (`~~`, `@@`). A Nuxt 3 style layout without `app/` still works.
3. Check how server utilities are imported. Since 4.6 they can come from `nuxt/server`; a project uses either that or auto-imports, not both (`NUXT_E8012`).
4. A Nuxt 3 project is migration work first: see the `vue-upgrade` skill.

## Rules

- Fetch in pages and components with `useFetch` or `useAsyncData` so the result travels in the SSR payload. Use `$fetch` in event handlers. Calling `$fetch` directly in setup fetches twice.
- Nuxt 4 data refs are shallow: replace `data.value` instead of mutating nested fields, or opt into `deep: true`.
- Give `useAsyncData` stable, unique keys. Calls with the same key share state.
- Shared state across components uses `useState`, never a module-level `ref` (it leaks between SSR requests).
- Browser-only code goes in `onMounted`, `<ClientOnly>` or a `.client` plugin.
- Secrets live in `runtimeConfig` (server only). Only `runtimeConfig.public` reaches the browser.
- Validate input in server routes; throw `createError` with a status code instead of returning error objects.

## Reference map

| Topic | Start here |
|-------|-----------|
| Nuxt 4 docs: structure, config, routing, data fetching, server, rendering, layers, hooks | [nuxt-guide](references/nuxt-guide.md) |
| Nuxt 3 to 4 changes | [nuxt4-migration](references/nuxt4-migration.md) |
| Writing and publishing Nuxt modules | [modules-guide](references/modules-guide.md) |
| Nitro v3 (beta), for standalone Nitro and Nuxt 5 | [nitro-guide](references/nitro-guide.md) |
| 4.5 and 4.6 changes, Nuxt 5 prep | `vue-upgrade` skill, nuxt guide |

Related: `vue` for components, `vue-data` for data-fetching patterns, `vue-ui` for Nuxt UI, `design` for UnoCSS.
