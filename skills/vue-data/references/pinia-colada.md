# Pinia Colada — The Data Fetching Layer for Vue

> `@pinia/colada` 1.x. Built on Pinia (requires it), tree-shakable core, official devtools support, and the layer `vue-router` Data Loaders integrate with.

## Setup

```ts
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

app.use(createPinia())
app.use(PiniaColada, {
  // global defaults for all queries (optional)
  queryOptions: { staleTime: 5_000 },
})
```

## Queries

```vue
<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { useRoute } from 'vue-router'

const route = useRoute()

const {
  data: contact,     // Ref<Contact | undefined>
  status,            // 'pending' | 'error' | 'success'  (data status)
  asyncStatus,       // 'idle' | 'loading'               (call status)
  isPending,         // no data yet (first load)
  error,
  refresh,           // fetch only if stale
  refetch,           // always fetch
} = useQuery({
  key: () => ['contacts', route.params.id],   // reactive key → auto refetch on change
  query: ({ signal }) => fetch(`/api/contacts/${route.params.id}`, { signal }).then(r => r.json()),
  staleTime: 10_000,   // serve cache without refetch for 10s
})
</script>

<template>
  <p v-if="isPending">Loading…</p>
  <p v-else-if="error">{{ error.message }}</p>
  <ContactCard v-else :contact="contact!" />
</template>
```

Key rules:
- **Key = identity.** Everything the query function depends on must appear in the key (like a `computed`'s dependencies). Use a function/getter for reactive keys.
- Two components using the same key share one cache entry and one in-flight request (dedup).
- `isPending` (no data at all) vs `asyncStatus === 'loading'` (any fetch in flight, incl. background refresh) — pick the right one for spinners.

### Reusable query options

```ts
// queries/contacts.ts
import { defineQueryOptions } from '@pinia/colada'

export const contactQuery = defineQueryOptions((id: string) => ({
  key: ['contacts', id],
  query: () => getContactById(id),
}))

// component: spread + override
useQuery(() => ({ ...contactQuery(route.params.id as string), enabled: isVisible.value }))
```

For queries with extra shared logic (derived refs, multiple consumers), `defineQuery(() => { ... })` creates a shareable composable.

## Mutations & invalidation

```ts
import { useMutation, useQueryCache } from '@pinia/colada'

const queryCache = useQueryCache()

const { mutate: updateContact, isLoading, error } = useMutation({
  mutation: (patch: ContactPatch) => patchContact(patch),
  async onSettled(_data, _err, { id }) {
    await queryCache.invalidateQueries({ key: ['contacts', id], exact: true })
  },
})
```

Invalidation options: `{ key }` (prefix match, includes children), `{ key, exact: true }`, `{ predicate: (entry) => ... }`, or no arg = all active queries.

### Optimistic updates

```ts
const { mutate: toggleTodo } = useMutation({
  mutation: (todo: Todo) => patchTodo(todo.id, { done: !todo.done }),
  onMutate(todo) {
    const key = ['todos']
    const previous = queryCache.getQueryData<Todo[]>(key)
    queryCache.setQueryData(key, previous?.map(t =>
      t.id === todo.id ? { ...t, done: !t.done } : t))
    queryCache.cancelQueries({ key })       // don't let an in-flight fetch clobber it
    return { previous }                      // context for rollback
  },
  onError(_err, _todo, { previous }) {
    queryCache.setQueryData(['todos'], previous)   // rollback
  },
  onSettled: () => queryCache.invalidateQueries({ key: ['todos'] }),
})
```

## SSR

Colada serializes its cache for hydration; in SSR apps install it server-side and dehydrate/hydrate the query cache alongside Pinia state (`serialize`/`hydrate` on the query cache; Nuxt users: `@pinia/colada-nuxt` module does this automatically).

## Plugins

Official plugins cover retries (`@pinia/colada-plugin-retry`), auto-refetch, delayed loading flags. Register via `PiniaColada` options: `plugins: [PiniaColadaRetry()]`.

## vs TanStack Vue Query

- Colada: Vue-first ergonomics, smaller core, Pinia devtools, Data Loaders integration — default choice.
- TanStack: infinite queries, broader ecosystem parity with React, more third-party adapters. Choose it if you need those or share conventions with a React codebase; don't migrate a working TanStack setup.
