---
name: vue-ui
description: Build Vue interfaces with component libraries. Reka UI headless primitives (dialog, select, combobox, menu, tabs, popover, the asChild pattern, controlled and uncontrolled state) and Nuxt UI 4 styled components, theming, forms, overlays, data tables and app layouts. Use when choosing or using a Vue component library, building accessible primitives, or working in a project with reka-ui, @nuxt/ui or shadcn-vue.
---

# Vue UI Libraries

Versions checked on 2026-10-15: reka-ui 2.11, @nuxt/ui 4.11.

## Choose the layer

| Situation | Use |
|-----------|-----|
| The project already has a component library | Keep it. Read its docs and its generated theme before writing custom components. |
| Custom design system, full control over markup and styles | Reka UI primitives, styled with your own CSS or utility classes. [reka-ui-guide](references/reka-ui-guide.md) |
| Copy-in components you own and edit (shadcn style) | shadcn-vue, which is built on Reka UI. The Reka references apply to its internals. |
| Nuxt or Vite app that wants ready-made styled components, theming and layouts | Nuxt UI 4 (Reka UI + Tailwind CSS + Tailwind Variants; works outside Nuxt too). [nuxt-ui-guide](references/nuxt-ui-guide.md) |

Do not hand-build dialogs, menus, comboboxes, tooltips or date pickers when the project has a primitive library. Focus trapping, dismissal, typeahead and ARIA wiring are where hand-built widgets fail.

## Rules for any library

- Compose the library's parts (`Root`, `Trigger`, `Portal`, `Content`) instead of wrapping one opaque component with a pile of props.
- Use `v-model` for controlled state and `default*` props for uncontrolled state. Do not mix them on one component.
- Use `asChild` (Reka) to render your own element or router link without an extra wrapper.
- Keep overlays in a portal, and give every dialog a title (visually hidden if needed).
- Style through the library's theming layer or semantic tokens, not raw palette classes.
- Check keyboard behavior after styling: Tab order, Escape, arrow keys, and focus return on close. The `vue-a11y` skill has the patterns.

## References

| Library | Guide | Details |
|---------|-------|---------|
| Reka UI | [reka-ui-guide](references/reka-ui-guide.md) | [components index](references/reka-ui/components.md), one file per component in `reka-ui/components/` |
| Nuxt UI 4 | [nuxt-ui-guide](references/nuxt-ui-guide.md) | `nuxt-ui/`: component selection, design system, forms, layouts (dashboard, docs, chat, editor, landing), recipes (auth, data tables, navigation, overlays) |

For live API details, Nuxt UI publishes an MCP server (see its guide). Styling with UnoCSS and design direction live in the `design` skill.
