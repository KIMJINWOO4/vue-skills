# Nuxt 4 — Changes & Migration from Nuxt 3

> Nuxt 4.0 released 2025-07; current line 4.4.x. Nuxt 3 EOL: 2026-07-31. Upgrade: `npx nuxt upgrade --dedupe`. Most Nuxt 3 code runs unchanged — the codemods (`npx codemod@latest nuxt/4/migration-recipe`) handle the mechanical parts.

## 1. New directory structure (`app/`)

Application code moves into `app/`; server & config stay at the root. This separates client/app context from Nitro server context (faster file-watching, better IDE type context).

```
my-app/
├── app/
│   ├── components/
│   ├── composables/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   ├── plugins/
│   ├── utils/
│   ├── app.vue
│   ├── app.config.ts
│   └── error.vue
├── public/
├── server/          # stays at root (Nitro)
├── shared/          # NEW: code shared between app and server (auto-imported)
├── content/
└── nuxt.config.ts
```

- Old structure keeps working: if Nuxt detects `pages/` etc. at root with no `app/`, it uses v3 layout. Migrate when convenient.
- `shared/` folder: utilities/types importable from both `app/` and `server/` (`#shared` alias).

## 2. Data fetching changes

- `useAsyncData` / `useFetch` return **shallow refs** by default → mutating `data.value.nested.prop` no longer triggers effects. Opt back with `deep: true` per call, or globally `experimental.defaults.useAsyncData.deep = true`.
- Multiple calls with the **same key share** state and options must not conflict.
- `data` and `error` default to `undefined` (was `null`).
- Cleaner reactive keys: pass a function/computed as key and the call refetches on change.

```ts
const { data } = await useFetch(() => `/api/users/${route.params.id}`)
```

## 3. TypeScript

- Per-context **project references**: separate tsconfigs for app, server, `shared/`, and node (config) code — wrong-context imports are now type errors.
- Generated types live under `.nuxt/`; run `nuxt prepare` after dependency changes in CI.

## 4. Other notable changes

- `compatibilityVersion: 4` is the default (the Nuxt 3 opt-in flag is gone).
- Route metadata is deduplicated; `definePageMeta` stays the single source.
- Faster CLI/dev: socket-based communication, v8 compile cache.
- 4.x additions: route-rule layouts, ISR payload extraction, `<NuxtTime>`, lazy hydration strategies for auto-imported components (`Lazy` prefix + `hydrate-on-visible` etc.).

## 5. Migration checklist (Nuxt 3 → 4)

1. `npx nuxt upgrade --dedupe` (Node 20.19+ required).
2. Run the official codemod recipe; review its diff.
3. Move app code into `app/` (or defer — supported but not default).
4. Audit `useAsyncData`/`useFetch`: nested mutations relying on deep reactivity, `null` checks on `data`/`error`, duplicate keys.
5. Modules: upgrade all `@nuxt/*` and community modules to v4-compatible majors.
6. Re-run `nuxt typecheck` — project references usually surface real cross-context imports.

## 6. Nuxt 5 outlook (not yet released)

- Nitro v3, flattened `srcDir` handling and further unbundling.
- Nuxt 4 will be supported ≥ 6 months after Nuxt 5 ships — no need to rush; do move off Nuxt 3 now.
