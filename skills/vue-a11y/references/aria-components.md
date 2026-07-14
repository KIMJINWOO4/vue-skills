# ARIA Component Patterns in Vue

> Source patterns: WAI-ARIA Authoring Practices Guide (APG). Before hand-rolling, check whether a headless library already ships the pattern: **Reka UI** (radix-vue's successor), Headless UI Vue, or Vuetify/PrimeVue if already in the project. Hand-roll only simple patterns.

## Disclosure (show/hide) — the simple one

```vue
<script setup lang="ts">
const open = ref(false)
const panelId = useId()
</script>

<template>
  <button :aria-expanded="open" :aria-controls="panelId" @click="open = !open">
    Details
  </button>
  <div v-show="open" :id="panelId">…</div>
</template>
```

That's the whole pattern. Accordions are disclosures in a list — no `role` gymnastics needed.

## Modal dialog

Prefer native `<dialog>` — focus trapping, `Esc`, and top-layer come free:

```vue
<script setup lang="ts">
const dialog = useTemplateRef('dialog')
const open = defineModel<boolean>({ default: false })

watchEffect(() => {
  if (open.value) dialog.value?.showModal()
  else dialog.value?.close()
})
</script>

<template>
  <dialog ref="dialog" :aria-label="title" @close="open = false" @cancel="open = false">
    <slot />
    <button @click="open = false">Close</button>
  </dialog>
</template>
```

Hand-rolled (Teleport) version requirements — see [focus-management](focus-management.md) for the trap:
`role="dialog"` + `aria-modal="true"` + `aria-labelledby` → trap focus → `Esc` closes → on close, focus returns to the trigger → background gets `inert`.

## Tabs

```vue
<template>
  <div role="tablist" :aria-label="label">
    <button
      v-for="(tab, i) in tabs" :key="tab.id"
      role="tab"
      :id="`tab-${tab.id}`"
      :aria-selected="i === active"
      :aria-controls="`panel-${tab.id}`"
      :tabindex="i === active ? 0 : -1"
      @click="active = i"
      @keydown.left.prevent="move(-1)"
      @keydown.right.prevent="move(1)"
    >{{ tab.label }}</button>
  </div>
  <div
    v-for="(tab, i) in tabs" :key="tab.id"
    role="tabpanel"
    :id="`panel-${tab.id}`"
    :aria-labelledby="`tab-${tab.id}`"
    v-show="i === active"
    tabindex="0"
  ><slot :name="tab.id" /></div>
</template>

<script setup lang="ts">
const props = defineProps<{ tabs: { id: string, label: string }[], label: string }>()
const active = ref(0)
function move(dir: number) {
  active.value = (active.value + dir + props.tabs.length) % props.tabs.length
  nextTick(() => document.getElementById(`tab-${props.tabs[active.value].id}`)?.focus())
}
</script>
```

Key ideas: **roving tabindex** (one tab stop for the whole tablist, arrows move within), selection follows focus.

## Menu (dropdown of actions)

Only use `role="menu"` for *action menus* (like a right-click menu). Navigation lists are `<nav><ul>`; select-one-value widgets are listbox/combobox — `menu` misused is worse than nothing.

Requirements: trigger `aria-haspopup="menu"` + `aria-expanded`; arrow keys move `role="menuitem"`s (roving tabindex); `Esc` closes and refocuses trigger; open focuses first item; click-outside closes (`onClickOutside` from VueUse).

## Combobox (autocomplete)

The hardest pattern — **strongly prefer Reka UI / Headless UI `Combobox`**. If hand-rolling:

```
input  role="combobox" aria-expanded aria-controls="LIST_ID"
       aria-activedescendant="OPTION_ID"   ← focus stays in the input
list   role="listbox"  → children role="option" aria-selected
↓/↑ move active option, Enter selects, Esc closes
+ aria-live region announcing "N results available"
```

## Toasts / async announcements

```vue
<!-- rendered once, app-level, ALWAYS in the DOM (SRs miss freshly-inserted live regions) -->
<div aria-live="polite" class="sr-only">{{ message }}</div>
```

- `polite` for results/status; `assertive` only for errors requiring immediate attention.
- Toasts with actions must also be reachable by keyboard and not auto-dismiss faster than they can be read (WCAG 2.2.1) — or provide a notifications center.

## Form errors (with or without a form library)

```vue
<input
  :aria-invalid="!!error"
  :aria-describedby="error ? errorId : hintId"
>
<p v-if="error" :id="errorId">{{ error }}</p>
```

On failed submit: move focus to the first invalid field, or to an error summary (`role="alert"`) that links to each field.
