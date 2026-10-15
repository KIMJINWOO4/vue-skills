# Vue Review Checklist

Each item names what to look for, why it matters, and where the detailed explanation lives. Paths are relative to this file and point into the other skills of this collection.

## P0: correctness and security

- [ ] **Props mutated in the child**, including nested fields of object props and `defineModel` objects changed in place. The parent's state drifts or the update is never emitted. [definemodel-object-mutation-no-emit](../../vue-debug/references/guides/definemodel-object-mutation-no-emit.md)
- [ ] **Reactivity lost by destructuring** `props`, `reactive()` objects or stores. [reactive-destructuring](../../vue-debug/references/guides/reactive-destructuring.md), [pinia-store-destructuring-breaks-reactivity](../../vue/references/pinia-gotchas/pinia-store-destructuring-breaks-reactivity.md)
- [ ] **`v-html` with data a user can influence.** XSS. Sanitize (DOMPurify) or render as text. [sfc](../../vue/references/core/sfc.md)
- [ ] **Secrets in client code**: API keys in `import.meta.env.VITE_*`, Nuxt `runtimeConfig.public`, or committed `.env` files. Anything bundled for the browser is public.
- [ ] **SSR state shared between requests**: module-level `ref`/`reactive`, singletons, or stores created outside the app. One user's data leaks to another. [state-ssr-cross-request-pollution](../../vue-debug/references/guides/state-ssr-cross-request-pollution.md)
- [ ] **Missing `await`** on `router.push` before reading the new route, on `useFetch`/`useAsyncData` in Nuxt pages, on form submits that navigate.
- [ ] **Lifecycle hooks or `inject` after an `await`** in setup. The hook never registers. [lifecycle-hooks-synchronous-registration](../../vue-debug/references/guides/lifecycle-hooks-synchronous-registration.md)
- [ ] **Nuxt server routes that trust input**: no validation of body, params or query; no auth check; errors that leak stack traces.

## P1: runtime behavior

- [ ] **`watch` used to derive state** that `computed` should produce; watchers that write to what they read. [reactivity](../../vue/references/core/reactivity.md)
- [ ] **Side effects without cleanup**: listeners, timers, observers, subscriptions without `onUnmounted`, `onWatcherCleanup` or `onScopeDispose`. [cleanup-side-effects](../../vue-debug/references/guides/cleanup-side-effects.md)
- [ ] **Fetch race conditions**: a slower old request overwrites newer data. Use a query layer or abort in `onWatcherCleanup`. [watch-async-cleanup](../../vue-debug/references/guides/watch-async-cleanup.md), `vue-data` skill
- [ ] **Hydration risks**: `Date.now()`, random ids, `window`, `localStorage` or locale formatting in render on SSR pages. Use `useId()`, `onMounted`, or `<ClientOnly>`. [ssr-hydration-mismatch-causes](../../vue-debug/references/guides/ssr-hydration-mismatch-causes.md)
- [ ] **Template refs read before mount or inside a false `v-if`.** [template-ref-null-with-v-if](../../vue-debug/references/guides/template-ref-null-with-v-if.md)
- [ ] **Undeclared emits** on components that pass events through; native event names fire twice. [undeclared-emits-double-firing](../../vue-debug/references/guides/undeclared-emits-double-firing.md)
- [ ] **Route param changes ignored** because the component is reused. [router-param-change-no-lifecycle](../../vue/references/router/router-param-change-no-lifecycle.md)
- [ ] **Keyboard and screen reader access**: clickable `div`s, icon buttons without a label, modals without focus management, form inputs without labels. `vue-a11y` skill.
- [ ] **Error and empty states**: what renders when the request fails or returns nothing.

## P2: maintainability and performance

- [ ] **Component doing several jobs**: data orchestration plus large markup, or three and more independent sections. Split by responsibility. `vue-clean-components` skill, [workflow](../../vue/references/workflow.md)
- [ ] **Server data copied into Pinia** with hand-rolled `loading` and `error` flags. Use Pinia Colada or the framework's fetch layer. `vue-data` skill
- [ ] **Prop drilling** through three or more levels. Consider provide/inject with a typed `InjectionKey`. [component-data-flow](../../vue/references/core/component-data-flow.md)
- [ ] **Keys**: `:key="index"` on lists that reorder, filter or contain inputs. [v-for-key-attribute](../../vue-debug/references/guides/v-for-key-attribute.md)
- [ ] **`v-if` with `v-for` on the same element.** [no-v-if-with-v-for](../../vue-debug/references/guides/no-v-if-with-v-for.md)
- [ ] **Deep reactivity on large data**: big arrays in `ref` that are replaced wholesale, `deep: true` watchers on large objects. Use `shallowRef`. [reactivity](../../vue/references/core/reactivity.md)
- [ ] **Unstable props in long lists** (new objects or inline functions per render) that defeat update skipping. [perf-props-stability-update-optimization](../../vue-debug/references/guides/perf-props-stability-update-optimization.md)
- [ ] **Heavy components loaded eagerly** that are rarely shown. `defineAsyncComponent` or route-level splitting. [component-async](../../vue/references/core/component-async.md)
- [ ] **Composables** that hide side effects at call time, or take plain values where callers pass refs. [adaptable-composables](../../vue/references/adaptable-composables.md)
- [ ] **TypeScript holes**: `any` on props or emits, untyped `inject`, `as` casts that hide nulls. [ts-template-ref-null-handling](../../vue-debug/references/guides/ts-template-ref-null-handling.md)
- [ ] **Tests** for new logic in composables and stores, and behavior tests for components. [testing-guide](../../vue/references/testing-guide.md)

## P3: style (only if lint does not cover it)

- [ ] SFC block order consistent with the project (`<script setup>`, `<template>`, `<style>` is the Vue team default).
- [ ] Component names in PascalCase and multi-word.
- [ ] Event names in camelCase in `defineEmits`, kebab-case in templates.
- [ ] Comments explain why, not what.

## Nuxt-specific

- [ ] `useFetch`/`useAsyncData` keys are unique and stable; options for the same key do not conflict.
- [ ] `data` mutations account for shallow refs in Nuxt 4.
- [ ] Server utilities come from one import style: auto-imports or `nuxt/server`, not both (`NUXT_E8012` in 4.6).
- [ ] `useState` instead of module-level refs for shared SSR state.
- [ ] Route rules and caching do not cache per-user responses.
