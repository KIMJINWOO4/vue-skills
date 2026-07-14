# Vue Router 5 Data Loaders (experimental)

> Import from `vue-router/experimental`. Loaders tie data fetching to navigation: the router collects every loader used by the target route, runs them in parallel **during** navigation, and (by default) only completes navigation when data is ready. No flash of empty page, no manual `isLoading` choreography, data shared across components without prop drilling.

Requires the `vue-router/vite` plugin (file-based routing setup — see `vue` skill → router references).

## Basic loader

```vue
<!-- src/pages/users/[id].vue -->
<script lang="ts">
import { defineBasicLoader } from 'vue-router/experimental'
import { getUserById } from '@/api/users'

export const useUserData = defineBasicLoader(
  (to, { signal }) => getUserById(to.params.id, { signal }),
  { key: 'user-data' } // SSR serialization key
)
</script>

<script setup lang="ts">
const { data: user, isLoading, error, reload } = useUserData()
</script>
```

Notes:
- The loader lives in a **separate non-setup `<script>` block** and is exported — the plugin picks it up and attaches it to the route. It can also live in a separate file and be exported from the page component.
- Loaders receive the target route + `AbortSignal` (aborted when navigation is cancelled → automatic race-condition safety).
- Any component (not just the page) can call `useUserData()` to read the same data — one fetch per navigation.
- Throwing `NavigationResult` from a loader controls navigation (redirect on 404 etc.).

## Colada loader (cached)

`defineColadaLoader` combines loaders with Pinia Colada caching — navigation-aware *and* cached/deduplicated between navigations:

```vue
<script lang="ts">
import { defineColadaLoader } from 'vue-router/experimental/pinia-colada'
import { getUserById } from '@/api/users'

export const useUserData = defineColadaLoader({
  key: to => ['users', to.params.id],
  query: (to, { signal }) => getUserById(to.params.id, { signal }),
  staleTime: 10_000,   // instant back/forward within 10s, background refresh after
})
</script>

<script setup lang="ts">
const { data: user, status, error, isLoading, refresh, reload } = useUserData()
</script>
```

## Options that matter

| Option | Effect |
|--------|--------|
| `lazy: true` | Don't block navigation; component renders immediately, `data` fills in later (check `isLoading`). Good for secondary content. |
| `server: false` | Skip on SSR, run on client only. |
| `commit: 'after-load' \| 'immediate'` | When `data` ref updates: after all loaders settle (default, atomic) or as each resolves. |
| `errors` | Allow navigation to complete with expected errors exposed on `error` instead of aborting. |

## When to use loaders vs plain `useQuery`

- Page-level data that defines the route (detail pages, dashboards) → **loader** (blocks navigation, SSR-friendly, cancellable).
- Widget/secondary data, polling, user-triggered fetches → **`useQuery`** in the component.
- They compose: loaders for the critical path, queries for the rest.

⚠️ Experimental status: API shipped under `vue-router/experimental` precisely because minor releases may adjust it — pin `vue-router` minor versions and read release notes on upgrade.
