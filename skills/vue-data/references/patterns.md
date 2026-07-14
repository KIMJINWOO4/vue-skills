# Data Fetching Patterns & Pitfalls

## Layering rule

```
UI components        → call composables, render state
composables/queries  → useQuery / loaders / useMutation (server state)
api/ module          → typed functions over fetch/ofetch (one per endpoint)
Pinia stores         → client state only (session, prefs, cross-page UI)
```

Keep raw `fetch` calls out of components. One `api/` function per endpoint gives you a single place for base URL, auth headers, and response typing.

## Race conditions

The classic bug: user types "a", then "ab"; response for "a" arrives last and overwrites "ab" results.

- **Query layer solves this** — reactive keys mean the stale response is ignored. This alone justifies Pinia Colada over manual fetching.
- Manual composables must abort or guard:

```ts
let controller: AbortController | undefined

watch(searchTerm, async (term) => {
  controller?.abort()
  controller = new AbortController()
  try {
    results.value = await searchApi(term, { signal: controller.signal })
  } catch (e) {
    if (!(e instanceof DOMException && e.name === 'AbortError')) throw e
  }
})
```

- Always pass `signal` through to `fetch` — query layers and Data Loaders hand you one for free.

## Error handling

- Distinguish **expected** errors (404, validation) from **unexpected** (500, network). Expected → render inline state; unexpected → rethrow to a boundary (`onErrorCaptured` in a layout component) or global handler.
- `ofetch`/`$fetch` throws on non-2xx — don't check `response.ok` patterns and forget the throw path.
- Show stale data + toast on background-refresh failure; blank-page errors are only acceptable when there is no cached data.

## Loading UX

- Use `isPending` (no data yet) for skeletons; `asyncStatus === 'loading'` for subtle refresh indicators. Never blank out existing data during a refetch.
- Delay spinners ~150-200ms (`@pinia/colada-plugin-delay` or CSS animation-delay) to avoid flicker on fast responses.
- Pagination/filters: keep previous page's data visible while the next loads (placeholder data pattern).

## Common anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Pinia store with `data/loading/error` per endpoint | `useQuery` — delete the store |
| Fetch in `onMounted`, copy into `ref` | `useQuery` with a key; SSR-safe and cached |
| `watch(route.params.id, fetch)` + initial call | reactive query key `() => ['x', route.params.id]` |
| Storing derived server data in another ref | `computed` over `data` |
| Invalidate-everything after each mutation | targeted `invalidateQueries({ key })`, exact when possible |
| Two components fetching the same endpoint separately | same query key → shared cache entry |

## SSR notes (non-Nuxt)

- Every request needs its own Pinia + query cache instance (no module-level singletons — cross-request state pollution).
- Serialize the query cache into the HTML payload, hydrate before mount; loaders with `key` handle this automatically.
- On hydration mismatch of fetched data, prefer `staleTime` covering the hydration window over refetch-on-mount.
