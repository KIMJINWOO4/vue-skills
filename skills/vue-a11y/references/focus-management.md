# Focus Management in Vue SPAs

Server-rendered pages get focus behavior free (full page load resets focus). SPAs must recreate it manually — this is where most Vue a11y failures live.

## Route changes

A silent route swap leaves screen reader users unaware anything happened and keyboard users focused on a removed element.

```ts
// router setup
router.afterEach(async (to, from) => {
  if (to.path === from.path) return
  await nextTick()
  // 1. move focus to the main content wrapper
  const main = document.getElementById('main-content')
  main?.focus()   // needs tabindex="-1" on the element
})
```

```vue
<!-- App.vue -->
<a href="#main-content" class="skip-link">Skip to content</a>
<main id="main-content" tabindex="-1">
  <router-view />
</main>
<!-- 2. announce the new page -->
<div aria-live="polite" class="sr-only">{{ announcement }}</div>
```

```ts
router.afterEach((to) => {
  announcement.value = `${to.meta.title ?? document.title} page`
  useTitle(to.meta.title)   // keep document.title in sync — it's what SRs read on load
})
```

- Focusing `<main tabindex="-1">` (not the first link) is the least surprising convention.
- The skip link must be the first focusable element and become visible on focus.
- `@vue-a11y/announcer` packages this pattern if you prefer a dependency.

## Modal focus trap (Teleport)

`<Teleport to="body">` moves the DOM but **not** focus. Requirements: trap inside, restore on close, inert background.

```vue
<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const open = defineModel<boolean>()
const panel = useTemplateRef('panel')
let opener: HTMLElement | null = null

const { activate, deactivate } = useFocusTrap(panel, {
  immediate: false,
  escapeDeactivates: true,
  onDeactivate: () => (open.value = false),
})

watch(open, async (isOpen) => {
  if (isOpen) {
    opener = document.activeElement as HTMLElement   // remember the trigger
    await nextTick()
    activate()                                        // focus moves into the dialog
  } else {
    deactivate()
    opener?.focus()                                   // restore focus — non-negotiable
  }
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" ref="panel" role="dialog" aria-modal="true" :aria-label="title">
      <slot />
    </div>
  </Teleport>
</template>
```

Plus: set `inert` on the app root while open so the background is unreachable for *all* users:

```ts
watchEffect(() => {
  document.getElementById('app')?.toggleAttribute('inert', open.value)
})
```

(Native `<dialog show-modal>` gives trap + top-layer + `Esc` for free — prefer it; see aria-components.)

## Focus after content changes

| Event | Focus goes to |
|-------|---------------|
| Item deleted from a list | next item, else previous, else list container |
| Inline edit saved | the element that replaced the editor |
| "Load more" | first newly loaded item |
| Async search results | stay in input; announce count via live region |
| Wizard step change | the step's heading (`tabindex="-1"`) |

```ts
// deleting an item
async function remove(id: string) {
  const idx = items.value.findIndex(i => i.id === id)
  items.value = items.value.filter(i => i.id !== id)
  await nextTick()
  itemRefs.value[Math.min(idx, items.value.length - 1)]?.focus()
}
```

## Rules of thumb

- Never focus something the user didn't cause — no focus-stealing on mount/poll updates.
- `nextTick()` before focusing anything conditionally rendered.
- Keep DOM order = visual order = tab order; don't fix layout with `tabindex="1+"` (positive tabindex is always a bug).
- Test by unplugging the mouse: every flow must complete with Tab/Shift-Tab/Enter/Esc/arrows alone.
