---
name: vue
description: Vue 3 application code. Composition API with script setup and TypeScript, reactivity, components, props, emits, defineModel, slots, composables, Transition, Teleport, Suspense, KeepAlive, Pinia stores, Vue Router 5, VueUse, component testing, and Vue 3.6 Vapor Mode. Use for any work on .vue files or Vue composables, including Options API and JSX codebases.
---

# Vue

Versions checked on 2026-10-15: Vue 3.5.44 stable and 3.6.0-rc.11 (Vapor Mode), Pinia 4.1, Vue Router 5.4, VueUse 15.0, Vitest 5.0.

## Workflow

1. **Check the stack first.** Read `package.json` for the majors of vue, pinia, vue-router and @vueuse/core, and match the style the project already uses. New code defaults to the Composition API with `<script setup lang="ts">`. Options API projects follow [options-api](references/options-api.md); JSX projects follow [jsx](references/jsx.md).
2. **Load the four core references** before the first edit and apply them for the whole task: [reactivity](references/core/reactivity.md), [sfc](references/core/sfc.md), [component-data-flow](references/core/component-data-flow.md), [composables](references/core/composables.md).
3. **Map components before building a feature** with more than one part. Write one sentence of responsibility per component, plus its props and emits. Route views compose children; they do not hold feature logic.
4. **Add optional features only when the requirement calls for them**: slots, KeepAlive, Teleport, Suspense, transitions, directives, render functions, plugins. [workflow](references/workflow.md) has the full decision list and the final self-check.
5. **Optimize after it works.** Performance work starts from a measurement; see the `vue-performance` skill.

## Rules that prevent most Vue bugs

- Derive values with `computed`. Use `watch` only for side effects, and clean up with `onWatcherCleanup`.
- Keep source state small. Use `shallowRef` for large data that is replaced wholesale and for third-party instances.
- Props are read-only. Two-way bindings go through `defineModel`; events are typed with `defineEmits`.
- Destructuring `reactive()` or a store breaks reactivity. Use `toRefs()` or `storeToRefs()`.
- Use `useTemplateRef('name')` for template refs. VueUse 15 removed `templateRef`.
- Composables that accept inputs take `MaybeRefOrGetter` and read them with `toValue()` inside effects. See [adaptable-composables](references/adaptable-composables.md).
- API data belongs in a query layer (`vue-data` skill), not in Pinia stores with hand-rolled `loading` flags.

## Reference map

| Topic | Start here |
|-------|-----------|
| Core concepts, curated by the Vue team | [workflow](references/workflow.md), then `core/` |
| API surface: macros, reactivity, lifecycle, built-ins | [api-guide](references/api-guide.md) |
| Vue 3.6 RC and Vapor Mode | [vue-36-vapor](references/vue-36-vapor.md) |
| Pinia 4 | [pinia-guide](references/pinia-guide.md), pitfalls in [pinia-gotchas](references/pinia-gotchas.md) |
| Vue Router 5 | [router-v5](references/router-v5.md), pitfalls in [router-gotchas](references/router-gotchas.md) |
| Testing with Vitest, Vue Test Utils and Playwright | [testing-guide](references/testing-guide.md) |
| VueUse 15, about 270 functions | [vueuse-guide](references/vueuse-guide.md) |
| Options API and JSX codebases | [options-api](references/options-api.md), [jsx](references/jsx.md) |

Related skills: `vue-debug` for errors and console warnings, `vue-review` for reviewing a diff, `vue-upgrade` for version bumps, plus `vue-data`, `vue-forms`, `vue-performance`, `vue-a11y`, `vue-ui` and `vue-clean-components`.
