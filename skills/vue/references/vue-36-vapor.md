# Vue 3.6 — Vapor Mode & the New Reactivity Engine

> Status as of 2026-07: Vue 3.6 is in late beta (`3.6.0-beta.x`, `npm i vue@beta`). Vapor Mode is feature-complete. Latest stable release line is 3.5.x. Check `npm view vue dist-tags` before pinning.

## What's in 3.6

| Change | Impact |
|--------|--------|
| **Vapor Mode** | Opt-in compilation strategy that skips the Virtual DOM entirely — components compile to direct, imperative DOM operations. Solid.js/Svelte 5-class update performance, ~2x faster mount, significantly lower memory. |
| **alien-signals reactivity** | `@vue/reactivity` rewritten on the alien-signals algorithm: faster dependency tracking, more aggressive batching, fewer allocations. No API changes — everything gets faster for free. |
| **Smaller baseline bundle** | A pure-Vapor app can drop the VDOM runtime, cutting the framework baseline dramatically. |

## Opting into Vapor

Vapor is per-component. Add the `vapor` attribute to `<script setup>`:

```vue
<script setup lang="ts" vapor>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

### Pure-Vapor app (no VDOM runtime at all)

```ts
import { createVaporApp } from 'vue'
import App from './App.vue'

createVaporApp(App).mount('#app')
```

### Mixed apps — interop plugin

A VDOM app can render Vapor components (and vice versa) with the interop plugin:

```ts
import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'

createApp(App).use(vaporInteropPlugin).mount('#app')
```

### Non-SFC Vapor components

```ts
import { defineVaporComponent } from 'vue'

export default defineVaporComponent({
  // Composition API only
  setup() { /* ... */ },
})
```

## Constraints & Gotchas

- **Composition API + `<script setup>` only.** Options API does not work in Vapor components.
- No `app.config.globalProperties`, no `getCurrentInstance()`-based hacks that touch VNode internals.
- Libraries that manipulate VNodes / use render-function tricks (some UI kits, `h()`-heavy HOCs) won't work inside Vapor components until they ship Vapor support.
- Teleport/Transition/KeepAlive support landed late — verify the specific built-in you rely on against the current beta changelog.
- Same template syntax, same reactivity APIs — component *logic* is unchanged. Migration is usually just adding `vapor`.

## When to use Vapor

- Large lists, dashboards, editors, high-frequency updates → strong wins.
- Content/CRUD pages already fast under VDOM → little benefit; don't churn working code.
- Component libraries: wait until your dependencies advertise Vapor compatibility.

## Adoption strategy

1. Stay on 3.5.x for production until 3.6 stable lands; the alien-signals gains arrive automatically on upgrade.
2. Identify hot components (profiler, `vue-performance` skill) and flip those to `vapor` first via `vaporInteropPlugin`.
3. Only consider `createVaporApp` for greenfield apps with Vapor-compatible dependencies.
