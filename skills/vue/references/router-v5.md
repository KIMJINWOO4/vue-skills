# Vue Router 5

Current release on 2026-10-15: 5.4.0. Router 5.0 (January 2026) merged `unplugin-vue-router` into core and kept the v4 API, so upgrading from v4 is a version bump. Release notes: [github.com/vuejs/router/releases](https://github.com/vuejs/router/releases).

## What changed across 5.x

| Version | Date | Changes worth knowing |
|---------|------|-----------------------|
| 5.0 | 2026-01-29 | File-based routing in core (`vue-router/vite`, `vue-router/auto-routes`). Data loaders ship as experimental under `vue-router/experimental`. The IIFE build no longer bundles `@vue/devtools-api`. |
| 5.1 | 2026-05-28 | Typed `definePage` `params.path`, raw and string param parsers, a way to override the global `Router` type, runtime warning for badly formatted query params. |
| 5.2 | 2026-07-15 | Diagnostics, Pinia 4 accepted as a peer. |
| 5.3 | 2026-08-27 | Volar narrows `typeof useRoute` in type positions. Scroll handling honors `history.scrollRestoration`. Dev-only error for navigation race conditions. |
| 5.4 | 2026-10-07 | `useScrollRestoration()` and `onRouteRendered()`. `createRouter` accepts a prebuilt matcher. Hash and top scroll positions are restored by default. In the experimental router only: query values are normalized to arrays (breaking), hash params in `definePage`, custom regexps for path params. |

## File-based routing

```ts
// vite.config.ts
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import VueRouter from 'vue-router/vite'

export default defineConfig({
  plugins: [
    VueRouter({ /* routesFolder: 'src/pages' */ }),
    Vue(), // must come after VueRouter()
  ],
})
```

```ts
// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

if (import.meta.hot)
  handleHotUpdate(router)
```

| File | Route |
|------|-------|
| `src/pages/index.vue` | `/` |
| `src/pages/about.vue` | `/about` |
| `src/pages/users/[id].vue` | `/users/:id` |
| `src/pages/[...path].vue` | `/:path(.*)` catch-all |
| `src/pages/(group)/a.vue` | `/a`; the group folder adds no URL segment |

## Typed routes and `definePage`

```ts
const route = useRoute('/users/[id]')
route.params.id // string, no cast needed
```

```vue
<script setup lang="ts">
definePage({
  meta: { requiresAuth: true },
  alias: ['/u/:id'],
})
</script>
```

Change generated routes in one place with `extendRoute`:

```ts
VueRouter({
  extendRoute(route) {
    if (route.name === '/admin')
      route.addToMeta({ requiresAdmin: true })
  },
})
```

## Gotchas

- Plugin order matters. `VueRouter()` has to run before `Vue()`, or `definePage` blocks stay in the SFC.
- Types come from the generated `typed-router.d.ts`. If inference is missing, add that file to `tsconfig` `include`.
- Coming from `unplugin-vue-router`: only import paths change. `unplugin-vue-router/vite` becomes `vue-router/vite`, and `unplugin-vue-router/data-loaders/*` becomes `vue-router/experimental`.
- File-based routes and hand-written route records can be mixed.
- Anything imported from `vue-router/experimental` (data loaders, the experimental router) can still break in minor releases, as 5.4 did for query values. Pin the minor version when you depend on it.
- Navigation guards should return a value (`false`, a route location, or nothing) instead of calling `next()`. See [router-gotchas](router-gotchas.md) for the other guard and lifecycle pitfalls.
- Data loaders are covered in the `vue-data` skill.
