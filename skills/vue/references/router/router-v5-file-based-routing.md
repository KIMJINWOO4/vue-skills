# Vue Router 5: File-Based Routing

Router 5 absorbed `unplugin-vue-router` into core. Routes are generated from `src/pages/**` at build time, with full TypeScript inference for route names and params.

## Setup

```ts
// vite.config.ts
import VueRouter from 'vue-router/vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    VueRouter({ /* options, e.g. routesFolder: 'src/pages' */ }),
    // ⚠️ Vue must come AFTER VueRouter()
    Vue(),
  ],
})
```

```ts
// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Update routes at runtime without a full reload
if (import.meta.hot) {
  handleHotUpdate(router)
}
```

## File → Route Conventions

| File | Route |
|------|-------|
| `src/pages/index.vue` | `/` |
| `src/pages/about.vue` | `/about` |
| `src/pages/users/[id].vue` | `/users/:id` |
| `src/pages/[...path].vue` | `/:path(.*)` (catch-all) |
| `src/pages/(group)/a.vue` | `/a` (group folder, no URL segment) |

## Typed Routes

Generated routes give you typed `useRoute`:

```ts
const route = useRoute('/users/[id]')
route.params.id // typed as string — no casting
```

Add per-route meta/config inside the SFC with `definePage`:

```vue
<script setup lang="ts">
definePage({
  meta: { requiresAuth: true },
  alias: ['/u/:id'],
})
</script>
```

## Extending generated routes

```ts
VueRouter({
  extendRoute(route) {
    if (route.name === '/admin') route.addToMeta({ requiresAdmin: true })
  },
})
```

## Gotchas

- Plugin ordering: `VueRouter()` before `Vue()` in the Vite plugins array, or SFC `definePage` blocks are not stripped.
- TypeScript: ensure `unplugin-vue-router/client` (v4 projects) or the generated `typed-router.d.ts` is included in `tsconfig`; with Router 5 the types are emitted automatically — add `./typed-router.d.ts` to `include` if inference is missing.
- Migrating from `unplugin-vue-router`: only import paths change (`unplugin-vue-router/vite` → `vue-router/vite`). Behavior is the same.
- Manual routes still work — file-based routing is opt-in; you can mix `routes` from `vue-router/auto-routes` with hand-written route records.
