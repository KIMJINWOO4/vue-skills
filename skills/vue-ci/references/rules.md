# Rules

Generated from `src/rules` by `node scripts/gen-docs.mjs`.

| Group | Rule | Default | Catches |
|-------|------|---------|---------|
| **toolchain** | [`typescript7-with-vue-tsc`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/build-tooling/references/typescript-7.md) | error | vue-tsc running on TypeScript 7 |
|  | [`missing-required-peer`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/pinia-4.md) | warn | Required peer dependency not declared |
|  | [`end-of-life-framework`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/SKILL.md) | warn | Framework version past end of life |
|  | [`prerelease-core-dependency`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/versions.md) | info | Core package on a pre-release |
|  | [`vite8-legacy-options`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vite-8.md) | warn | Vite 7 option names in a Vite 8 config |
| **testing** | [`vitest-removed-config`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vitest-5.md) | error | Vitest config option that no longer exists |
|  | [`vitest-artifacts-not-ignored`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vitest-5.md) | info | .vitest output folder not in .gitignore |
|  | [`vitest-sequential-removed`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vitest-5.md) | error | .sequential test modifier |
|  | [`vitest-hoisted-not-top-level`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vitest-5.md) | error | vi.mock, vi.unmock or vi.hoisted below the top level |
| **vapor** | [`vapor-event-delegation-option`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/vue-36-vapor.md) | error | Removed Vapor eventDelegation compiler option |
|  | [`vapor-without-script-setup`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/vue-36-vapor.md) | error | Vapor component without script setup |
|  | [`vapor-unsupported-feature`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/vue-36-vapor.md) | warn | Feature that Vapor Mode does not support |
| **vue** | [`vueuse-templateref-removed`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vueuse-15.md) | error | templateRef imported from VueUse |
|  | [`vueuse-removed-timer-options`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vueuse-15.md) | error | VueUse timer option removed in v15 |
|  | [`router-guard-next-callback`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/router/router-navigation-guard-next-deprecated.md) | warn | Navigation guard using next() |
|  | [`pinia-store-destructure`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/pinia-gotchas/pinia-store-destructuring-breaks-reactivity.md) | warn | Pinia store destructured without storeToRefs |
| **nuxt** | [`ssr-module-level-state`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-debug/references/guides/state-ssr-cross-request-pollution.md) | warn | Module-level reactive state in a Nuxt composable |
|  | [`nuxt-fetch-in-setup`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/nuxt/references/docs/core-data-fetching.md) | warn | $fetch at the top level of script setup |
| **security** | [`public-env-secret`](https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-review/references/checklist.md) | error | Secret exposed through a public env variable |

## toolchain

Dependency versions and peers, TypeScript 7 with vue-tsc, Vite 8 option names. Select with `--rules toolchain` or `rules: toolchain`.

### typescript7-with-vue-tsc

Default severity: **error**.

**Why.** TypeScript 7.0 ships without the JavaScript compiler API that vue-tsc and the Vue language tools are built on, so type-checking .vue files fails.

**Fix.** Keep TypeScript 6 for Vue type-checking: "typescript": "npm:@typescript/typescript6@^6.0.2". Packages without .vue files can use TypeScript 7.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/build-tooling/references/typescript-7.md

### missing-required-peer

Default severity: **warn**.

**Why.** Pinia 4 made @vue/devtools-api a required peer, and Vitest 5 made vite one. npm and pnpm usually install peers on their own, Yarn does not, and an undeclared peer can drift to an incompatible version.

**Fix.** Add the peer package to the same package.json, next to the package that needs it.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/pinia-4.md

### end-of-life-framework

Default severity: **warn**.

**Why.** End-of-life versions no longer receive security fixes, and current libraries drop support for them.

**Fix.** Plan the upgrade with the vue-upgrade skill.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/SKILL.md

### prerelease-core-dependency

Default severity: **info**.

**Why.** Release candidates and nightlies can change behavior between builds. Vue 3.6, for example, changed Vapor event delegation between rc.1 and rc.2.

**Fix.** Pin an exact pre-release version while trying it, and keep production on the latest stable release.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/versions.md

### vite8-legacy-options

Default severity: **warn**.

**Why.** Vite 8 bundles with Rolldown and transforms with Oxc. Old option names are converted with a warning, some are now no-ops, and the object form of manualChunks was removed.

**Fix.** Rename build.rollupOptions to build.rolldownOptions and esbuild to oxc, drop build.commonjsOptions, and replace manualChunks objects with Rolldown codeSplitting.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vite-8.md

## testing

Vitest 4 and 5 removals in config and test files. Select with `--rules testing` or `rules: testing`.

### vitest-removed-config

Default severity: **error**.

**Why.** Vitest 4 removed poolOptions, minWorkers and workspace files. Vitest 5 renamed deps.optimizer.web to deps.optimizer.client. Removed options are ignored or rejected, so the run does not use the settings you expect.

**Fix.** Move pool settings to top-level maxWorkers and isolate, move workspace entries to test.projects, and rename optimizer.web to optimizer.client.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vitest-5.md

### vitest-artifacts-not-ignored

Default severity: **info**.

**Why.** Vitest 5 writes reporter output, blob reports and attachments to a .vitest folder in the project root.

**Fix.** Add .vitest to .gitignore.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vitest-5.md

### vitest-sequential-removed

Default severity: **error**.

**Why.** Vitest 5 removed test.sequential and describe.sequential.

**Fix.** Pass { concurrent: false } as the test or suite options instead.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vitest-5.md

### vitest-hoisted-not-top-level

Default severity: **error**.

**Why.** Vitest hoists these calls to the top of the file. Since Vitest 5 a call nested in a block throws instead of warning.

**Fix.** Move the call to the top level of the test file, or use vi.doMock for a mock that depends on runtime values.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vitest-5.md

## vapor

Vue 3.6 Vapor Mode options and unsupported features. Select with `--rules vapor` or `rules: vapor`.

### vapor-event-delegation-option

Default severity: **error**.

**Why.** Vue 3.6.0-rc.2 made Vapor event delegation opt-in per listener and removed compilerOptions.eventDelegation.

**Fix.** Delete the option. Add the .delegate modifier (for example @click.delegate) to listeners that should delegate to document.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/vue-36-vapor.md

### vapor-without-script-setup

Default severity: **error**.

**Why.** Vapor Mode supports script setup and template-only components, not the Options API. Since Vue 3.6.0-rc.11 a Vapor SFC whose script is a plain script block fails to compile.

**Fix.** Move the component to <script setup vapor>, or remove the vapor marker.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/vue-36-vapor.md

### vapor-unsupported-feature

Default severity: **warn**.

**Why.** Vapor Mode supports a subset of Vue. v-memo, @vue:* element hooks, getCurrentInstance(), globalProperties and the $el family on component refs do not work inside Vapor components.

**Fix.** Rewrite the part without the feature, or keep this component in VDOM mode behind vaporInteropPlugin.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/vue-36-vapor.md

## vue

VueUse 15 removals, Vue Router next(), Pinia destructuring. Select with `--rules vue` or `rules: vue`.

### vueuse-templateref-removed

Default severity: **error**.

**Why.** VueUse 15 removed templateRef. Vue 3.5 provides the same thing as useTemplateRef.

**Fix.** Replace templateRef('name') with useTemplateRef('name') imported from vue.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vueuse-15.md

### vueuse-removed-timer-options

Default severity: **error**.

**Why.** VueUse 15 removed interval, immediate, updateInterval and immediateCallback from its timer-based functions in favor of a scheduler option. The old keys are ignored.

**Fix.** Move the timing into the scheduler option described on the function's page.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-upgrade/references/vueuse-15.md

### router-guard-next-callback

Default severity: **warn**.

**Why.** Vue Router guards can return false, a route location or nothing. The next() callback is deprecated, and calling it twice or not at all is a common source of stuck or doubled navigations.

**Fix.** Drop the next parameter and return the result instead: return false, return '/login', or return nothing to continue.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/router/router-navigation-guard-next-deprecated.md

### pinia-store-destructure

Default severity: **warn**.

**Why.** Destructuring a store copies the current values of state and getters, so the component stops updating. Actions are plain functions and are safe to destructure.

**Fix.** Use const { a, b } = storeToRefs(store) for state and getters, and destructure actions from the store itself.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue/references/pinia-gotchas/pinia-store-destructuring-breaks-reactivity.md

## nuxt

SSR state shared between requests, $fetch in setup. Select with `--rules nuxt` or `rules: nuxt`.

### ssr-module-level-state

Default severity: **warn**.

**Why.** On the server a module is loaded once and shared by every request. A ref created at module level leaks one user's data into another user's page.

**Fix.** Use useState(key, init) for shared state, or create the ref inside the composable function.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-debug/references/guides/state-ssr-cross-request-pollution.md

### nuxt-fetch-in-setup

Default severity: **warn**.

**Why.** Top-level $fetch in a Nuxt component runs during server rendering and again during hydration, and the result is not added to the payload.

**Fix.** Use useFetch or useAsyncData in setup. Keep $fetch for event handlers.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/nuxt/references/docs/core-data-fetching.md

## security

Secrets exposed to the browser. Select with `--rules security` or `rules: security`.

### public-env-secret

Default severity: **error**.

**Why.** Variables prefixed with VITE_ and NUXT_PUBLIC_, and everything under Nuxt runtimeConfig.public, are bundled into client JavaScript. Anyone who loads the page can read them.

**Fix.** Keep the value on the server: a server route, Nuxt private runtimeConfig, or a backend that signs requests. Rotate the secret if it was ever deployed.

Guide: https://github.com/KIMJINWOO4/vue-skills/blob/main/skills/vue-review/references/checklist.md
