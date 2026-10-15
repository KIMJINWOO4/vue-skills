# Vue 3.6 and Vapor Mode

Status on 2026-10-15: the stable line is 3.5.x (`latest` is 3.5.44). Vue 3.6 is a release candidate (`rc` tag, 3.6.0-rc.11 from 2026-10-10). No stable date has been announced. Run `npm view vue dist-tags` before pinning anything.

Sources: the [3.6 changelog](https://github.com/vuejs/core/blob/minor/CHANGELOG.md) and the [rc.1 release notes](https://github.com/vuejs/core/releases/tag/v3.6.0-rc.1).

## What 3.6 changes

| Change | What it means for app code |
|--------|----------------------------|
| Vapor Mode | Opt-in compile mode that skips the virtual DOM. Components compile to direct DOM operations. Benchmarks put it alongside Solid and Svelte 5. |
| Reactivity rewrite | `@vue/reactivity` now uses the alien-signals algorithm. The API is unchanged; apps get faster dependency tracking on upgrade without code changes. |
| Smaller baseline | An app made only of Vapor components can leave the VDOM runtime out of the bundle. |

The Vue team calls Vapor "feature-complete in Vue 3.6 RC" and currently recommends it for two cases: a performance-sensitive part of an existing app, or a small new app built entirely in Vapor.

## Opting in

Vapor works for `<script setup>` SFCs and template-only SFCs. Any of these forms enables it:

```vue
<script setup lang="ts" vapor>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">
    {{ count }}
  </button>
</template>
```

```vue
<!-- shorthand for <script setup vapor> -->
<script vapor>
// ...
</script>

<!-- template-only component -->
<template vapor>
  <!-- ... -->
</template>
```

Since rc.11 the SFC compiler rejects a Vapor component whose script is a plain `<script>` without `<script setup>`.

### Whole app in Vapor

```ts
import { createVaporApp } from 'vue'
import App from './App.vue'

createVaporApp(App).mount('#app')
```

### Vapor components inside an existing VDOM app

```ts
import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'

createApp(App).use(vaporInteropPlugin).mount('#app')
```

Interop covers props, events and slots, with rough edges left in deep mixing. The Vue team's advice: give each rendering mode its own region of the app instead of nesting them back and forth. Components written with render functions or JSX stay VDOM components and need the interop plugin inside a Vapor app.

Nuxt 4.6 exposes the same interop through `vue: { vapor: true }` in `nuxt.config.ts`, which needs `vue@^3.6.0-rc.2`.

## Not available in Vapor components

- Options API
- `app.config.globalProperties`
- `getCurrentInstance()` (returns `null`)
- `@vue:mounted` and other per-element `@vue:*` lifecycle events (rc.11 warns when they are ignored)
- `v-memo` (rc.11 warns when it is ignored)
- `$el`, `$props`, `$attrs`, `$slots` and `$refs` on component template refs
- `<Suspense>` in a Vapor-only app. Vapor components can render inside a VDOM `<Suspense>`.

## Behavior that differs from VDOM

**Event delegation is opt-in (since rc.2).** Listeners attach to the element, as in VDOM mode. Add the Vapor-only `.delegate` modifier to delegate a static event to `document`:

```vue
<button @click.delegate="onClick" />
```

A delegated handler does not run if an ancestor calls `stopPropagation()`. The `compilerOptions.eventDelegation` option from rc.1 was removed; delete it from configs. Notes written before rc.2 that say "Vapor delegates events by default" are out of date.

**Calling a slot runs it.** `slots.default?.()` renders the slot, registers effects and claims SSR DOM during hydration. Do not call a slot to check whether it has content; render `<slot />` in the template.

**Custom directives use a function interface.** A Vapor directive receives the element and a reactive getter, and may return a cleanup function:

```ts
const vText = (el: Element, value?: () => unknown) => {
  watchEffect(() => {
    el.textContent = String(value?.())
  })
  return () => { /* cleanup */ }
}
```

Libraries that build VNodes by hand, use `h()`-heavy higher-order components or read the component proxy will not work inside Vapor components until they ship Vapor support.

## When Vapor pays off

- Large lists, dashboards, editors and other screens with frequent fine-grained updates.
- Little benefit for forms and content pages that are already fast. Do not rewrite working code for it.
- Component libraries: wait until each dependency states Vapor support.

## Adoption plan

1. Keep production on 3.5.x until 3.6 is stable. The reactivity gains arrive with the upgrade itself.
2. Profile first (`vue-performance` skill). Convert the hot components to `vapor` behind `vaporInteropPlugin`.
3. Use `createVaporApp` only for new apps whose dependencies all support Vapor.
4. In a mixed app, keep Vapor and VDOM in separate regions of the tree.
