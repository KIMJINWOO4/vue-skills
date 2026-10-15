# Vue 2 to Vue 3

Vue 2 reached end of life on 2023-12-31. Target the current Vue 3.5 line, Vue Router 5 (or 4) and Pinia 4. The official guide is [v3-migration.vuejs.org](https://v3-migration.vuejs.org); this page is the working checklist.

## Plan

1. **Get Vue 2 to 2.7 first.** 2.7 backports the Composition API and `<script setup>`, so components can be modernized while still running on Vue 2.
2. **Replace dependencies that have no Vue 3 version.** Vuex becomes Pinia, Vue Router 3 becomes Router 4 or 5, and UI libraries move to their Vue 3 majors (Vuetify 3, Element Plus, PrimeVue, Quasar 2). This is usually the longest step.
3. **Switch the build to Vite** with `@vitejs/plugin-vue`. Vue CLI and webpack 4 setups do not support current tooling.
4. **Run the migration build** (`@vue/compat`) to get runtime warnings for every Vue 2 behavior still in use, fix them, then remove the compat build.
5. **Upgrade TypeScript and tests**: `vue-tsc` replaces `vue-template-compiler` based checks; Vitest and Vue Test Utils 2 replace Jest with VTU 1.

## Breaking changes to search for

| Vue 2 | Vue 3 | Search for |
|-------|-------|-----------|
| `new Vue({ ... })`, `Vue.use`, `Vue.component`, `Vue.prototype.$x` | `createApp(App).use(...).component(...)`; `app.config.globalProperties.$x`, or better provide/inject | `new Vue`, `Vue.prototype` |
| `v-model` uses `value` and `input`; `.sync` modifier | `v-model` uses `modelValue` and `update:modelValue`; multiple `v-model:name`; `.sync` removed | `.sync`, `model:` option, `$emit('input'` |
| `$listeners` | Merged into `$attrs`; `$attrs` now also contains `class` and `style` | `$listeners` |
| `.native` modifier | Removed; declare component events in `emits` | `.native` |
| Event bus: `$on`, `$off`, `$once` | Removed; use a tiny emitter (mitt) or, better, props, events, provide/inject or a store | `$on(`, `$off(`, `$once(` |
| Filters `{{ x \| currency }}` | Removed; use functions or computed | `filters:`, `\|` in templates |
| `Vue.set`, `Vue.delete`, `this.$set` | Not needed; Proxy-based reactivity tracks additions | `$set`, `Vue.set` |
| `v-if` and `v-for` on one element: `v-for` wins | `v-if` wins | elements with both |
| `key` on `<template v-for>` children | Put `key` on the `<template>` | `<template v-for` |
| Transition classes `v-enter`, `v-leave` | `v-enter-from`, `v-leave-from` | `-enter {`, `-leave {` in CSS |
| Async components as `() => import()` in `components` | `defineAsyncComponent(() => import())` | `() => import(` in components |
| Functional components with `functional: true` | Plain functions; stateful components are fast enough | `functional:` |
| `$children` | Removed; use template refs | `$children` |
| Custom directive hooks `bind`, `inserted`, `update`, `componentUpdated`, `unbind` | `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `unmounted` | `directive(`, `bind(` |
| Watching an array fires on mutation | Needs `deep: true` | `watch:` on arrays |
| `data` as an object on components, deep mixin merge of `data` | `data` must be a function; mixin `data` merges shallowly | `data: {` |
| `h` passed to `render(h)` | `import { h } from 'vue'` | `render(h` |
| `keyCode` modifiers `@keyup.13` | Use key names `@keyup.enter` | `@keyup.[0-9]` |
| `inline-template`, `propsData`, `$destroy` | Removed | those names |

## After the switch

- Move components to `<script setup lang="ts">` over time. The `vue` skill describes the target style.
- Replace mixins with composables.
- Replace Vuex modules with Pinia stores one module at a time; both can run side by side during the move.
- Check third-party code that touched `this.$el`, `$vnode` or private VNode fields.
