# Nuxt Upgrades

Status on 2026-10-15: Nuxt 4.6.1 is current. Nuxt 3 reached end of life on 2026-07-31 (last release 3.21.11). Nuxt 5 is planned for Q4 2026 on the [roadmap](https://nuxt.com/docs/4.x/community/roadmap) and is available only as nightly builds (`nuxt-nightly@5x`).

## Nuxt 3 to 4

Follow [nuxt4-migration](../../nuxt/references/nuxt4-migration.md): `app/` directory, shallow data refs from `useAsyncData` and `useFetch`, `undefined` defaults, TypeScript project references, and the codemod recipe. Then continue below to reach 4.6.

## Nuxt 4.x to 4.6

Run `npx nuxt upgrade --dedupe`. Node `^22.22.3 || ^24.15.0 || >=26` is required from 4.6.

**4.5** (2026-07-18, [post](https://nuxt.com/blog/v4-5))

- Vite 8. Rspack 2 through Rsbuild for projects on Rspack.
- Stable `NUXT_E####` error codes; search the code to find the docs page for an error.
- `useLayout()`, and named views with `name@view.vue` page files.
- unhead v3 with stricter `useHead` types. Fix type errors in head calls after upgrading.
- `experimental.ssrStreaming`.

**4.6** (2026-10-05, [post](https://nuxt.com/blog/v4-6))

- `nuxt/server` import surface for server utilities. Auto-imported h3 helpers still work, but mixing auto-imports with `nuxt/server` imports in one project raises `NUXT_E8012`; pick one style.
- `runtimeConfig.appSecret` (`NUXT_APP_SECRET`) and `useSession` from `nuxt/server`.
- Typed `$fetch` rebuilt on fetchdts behind `experimental.routeTypedFetch`.
- Vapor interop: `vue: { vapor: true }` with `vue@^3.6.0-rc.2`.
- Nuxt CLI v4: `nuxt init` is gone; scaffold with `npm create nuxt@latest`.
- `@pinia/nuxt` 1.0.3 requires Nuxt 4.6 and Pinia 4.1.

## Getting ready for Nuxt 5

Nuxt 5 moves server code to Nitro v3 and h3 v2 (Web-standard `Request` and `Response`), stops auto-importing server utilities, and turns several experimental flags on by default. Prepare on 4.6 now:

1. Set `future: { compatibilityVersion: 5 }` in `nuxt.config.ts` on a branch. On 4.6 this also enables `typedPages`, `routeTypedFetch`, case-sensitive routing and `navigateToEarlyReturn`.
2. Import server helpers explicitly from `nuxt/server` instead of relying on auto-imports.
3. Fix route names and paths that differ only by case.
4. Read the Nitro v3 notes in [nitro-guide](../../nuxt/references/nitro-guide.md): `nitropack` becomes `nitro`, `eventHandler` becomes `defineHandler`, `createError` becomes `HTTPError`, `useStorage` becomes `useKV`, and cache `swr` defaults to `false`.

Do not move production apps to `nuxt-nightly`. Nuxt 4 will keep receiving support after Nuxt 5 ships.
