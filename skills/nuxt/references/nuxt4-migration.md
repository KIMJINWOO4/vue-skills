# Nuxt 4: Changes and Migration from Nuxt 3

> Nuxt 4.0 was released in July 2025; the current line is 4.6 (October 2026). Nuxt 3 reached end of life on 2026-07-31. Upgrade with `npx nuxt upgrade --dedupe`. Most Nuxt 3 code runs unchanged, and the codemod recipe (`npx codemod@latest nuxt/4/migration-recipe`) handles the mechanical parts. Changes in 4.5 and 4.6 are listed in the `vue-upgrade` skill.

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

- Per-context **project references**: separate tsconfigs for app, server, `shared/`, and node (config) code. Imports from the wrong context are now type errors.
- Generated types live under `.nuxt/`; run `nuxt prepare` after dependency changes in CI.

## 4. Other notable changes

- `compatibilityVersion: 4` is the default (the Nuxt 3 opt-in flag is gone).
- Route metadata is deduplicated; `definePageMeta` stays the single source.
- Faster CLI/dev: socket-based communication, v8 compile cache.
- 4.x additions: route-rule layouts, ISR payload extraction, `<NuxtTime>`, lazy hydration strategies for auto-imported components (`Lazy` prefix + `hydrate-on-visible` etc.).

## 5. Migration checklist (Nuxt 3 → 4)

1. `npx nuxt upgrade --dedupe`. Nuxt 4.0 needs Node 20.19+, and 4.6 needs Node `^22.22.3 || ^24.15.0 || >=26`.
2. Run the official codemod recipe; review its diff.
3. Move app code into `app/`, or defer it: the old layout is still supported.
4. Audit `useAsyncData`/`useFetch`: nested mutations relying on deep reactivity, `null` checks on `data`/`error`, duplicate keys.
5. Modules: upgrade all `@nuxt/*` and community modules to v4-compatible majors.
6. Re-run `nuxt typecheck`. Project references usually surface real cross-context imports.

## 6. Nuxt 5 outlook (not released yet)

- Planned for Q4 2026 on the Nuxt roadmap: Nitro v3 and h3 v2, server utilities imported from `nuxt/server`, typed and case-sensitive routing by default.
- Nuxt 4 keeps receiving support after Nuxt 5 ships, so there is no need to rush. Preparation steps are in the `vue-upgrade` skill.
