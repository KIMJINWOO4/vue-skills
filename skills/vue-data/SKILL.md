---
name: vue-data
description: Server-state and data fetching for Vue 3. Pinia Colada (useQuery/useMutation, caching, invalidation, optimistic updates), Vue Router Data Loaders, choosing between fetch layers, race conditions, SSR concerns. Use when fetching API data, caching server responses, handling loading/error states, or wiring mutations in Vue apps.
---

# Vue Data Fetching Skill

> Baseline 2026-07: Pinia Colada 1.x (stable, the recommended data layer for Vue), Vue Router 5 Data Loaders (experimental), TanStack Vue Query 5 as the heavyweight alternative. Nuxt apps: use built-in `useFetch`/`useAsyncData` first (see `nuxt` skill).

## Core Rule

**Server state ≠ client state.** Do not put API data in hand-rolled Pinia stores with `loading/error` flags — use a query layer (Pinia Colada) that owns caching, deduplication, invalidation, and request lifecycle. Keep Pinia stores for genuinely client-owned state (auth session, UI preferences, drafts).

## Decision Table

| Situation | Use |
|-----------|-----|
| Vue SPA fetching REST/GraphQL | **Pinia Colada** (`useQuery` / `useMutation`) |
| Data must be ready before route renders | **Data Loaders** (`defineColadaLoader` / `defineBasicLoader`) |
| Nuxt app | `useFetch` / `useAsyncData` (Nitro-aware, SSR payload) |
| Already on TanStack Query (React parity, infinite queries) | TanStack Vue Query — fine, don't churn |
| One-shot fire-and-forget call (form submit w/o cache impact) | plain `$fetch`/`ofetch` in an event handler |
| Truly static lookup fetched once at startup | composable + module-level cache is acceptable |

## Reference Map

| Topic | Description | Path |
|-------|-------------|------|
| **Pinia Colada** | useQuery, useMutation, keys, invalidation, optimistic updates, SSR | [pinia-colada](references/pinia-colada.md) |
| **Data Loaders** | Route-bound loading with Vue Router 5 experimental loaders | [data-loaders](references/data-loaders.md) |
| **Patterns & Pitfalls** | Race conditions, AbortSignal, error handling, layering rules | [patterns](references/patterns.md) |
