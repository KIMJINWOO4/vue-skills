# Pinia 3 to 4

Pinia 4.0.0 was released on 2026-07-14, together with `@pinia/nuxt` 1.0.0 and `@pinia/testing` 2.0.0. The release notes call the breaking changes "only technically breaking". Source: [v4.0.0 release](https://github.com/vuejs/pinia/releases/tag/v4.0.0), [v4.1.0 release](https://github.com/vuejs/pinia/releases/tag/v4.1.0).

## Steps

1. Install the devtools API next to Pinia. It moved from a dependency to a required peer and jumped to v8:

   ```bash
   pnpm add pinia@^4 @vue/devtools-api@^8
   ```

2. Upgrade the companions in the same commit: `@pinia/nuxt@^1` (needs Nuxt 4.6 and `pinia ^4.1.0`) and `@pinia/testing@^2`.
3. Pinia 4 is ESM only. Remove any `require('pinia')`, and make sure Jest or other CommonJS test setups transform it, or move them to Vitest.
4. If the project type-checks with TypeScript older than 5.6, upgrade TypeScript first.
5. Run the app and the tests. Read new warnings carefully: Pinia 4 rewrote its errors and dev warnings, and they now explain the fix.

## What else changed

- `storeToRefs()` skips nullish values instead of failing, and reports invalid properties in development.
- Plugins that return wrong values get a diagnostic.
- `piniaSymbol` is exported.
- Setup stores keep runtime-added properties of refs across HMR.
- 4.1 adds `getStores()` to list the registered stores, and warns when a store is replaced while it is being disposed.

## What did not change

Store definitions, `defineStore`, setup stores, getters, actions, `storeToRefs`, `$patch`, `$subscribe` and plugins keep the same API. No code changes are needed in components.

## Related

- Store patterns: [pinia-guide](../../vue/references/pinia-guide.md)
- Common store bugs: [pinia-gotchas](../../vue/references/pinia-gotchas.md)
- Server state does not belong in Pinia: `vue-data` skill
