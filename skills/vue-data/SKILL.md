---
name: vue-data
description: Server state and data fetching in Vue 3. Pinia Colada queries and mutations, caching, invalidation, optimistic updates, Vue Router data loaders, race conditions, abort, SSR payloads, and choosing between fetch layers. Use when fetching API data, caching server responses, handling loading and error states, or wiring mutations in a Vue app.
---

# Vue Data Fetching

Versions checked on 2026-10-15: @pinia/colada 1.4.8 (stable, works with Pinia 4), Vue Router 5.4 data loaders (still experimental), @tanstack/vue-query 5. Nuxt apps start with `useFetch` and `useAsyncData` (`nuxt` skill).

## Core rule

Server state is not client state. API data does not belong in hand-written Pinia stores with `loading` and `error` flags. A query layer owns caching, deduplication, invalidation and the request lifecycle. Pinia stores keep state the client owns: session, preferences, drafts.

## Decision table

| Situation | Use |
|-----------|-----|
| Vue SPA fetching REST or GraphQL | Pinia Colada `useQuery` and `useMutation` |
| Data must be ready before the route renders | Data loaders (`defineColadaLoader`, `defineBasicLoader`) from `vue-router/experimental` |
| Nuxt app | `useFetch` or `useAsyncData` (SSR payload, Nitro aware) |
| Project already uses TanStack Query | Keep TanStack Vue Query |
| One-off call with no cache impact, such as a form submit | `$fetch` or `ofetch` in the event handler |
| Static lookup fetched once at startup | A composable with a module-level cache (not on SSR) |

## Checks before you finish

- Every query key includes every input the request depends on.
- Mutations invalidate or update the queries they affect.
- Loading, error and empty states each render something deliberate.
- Requests started by a watcher are cancelled or ignored when their inputs change.
- On SSR, nothing user-specific is cached at module level.

## References

| Topic | Path |
|-------|------|
| Pinia Colada: keys, invalidation, optimistic updates, SSR | [pinia-colada](references/pinia-colada.md) |
| Data loaders with Vue Router 5 | [data-loaders](references/data-loaders.md) |
| Race conditions, AbortSignal, error handling, layering | [patterns](references/patterns.md) |
