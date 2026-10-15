---
name: vue-a11y
description: Accessibility for Vue 3 apps. Semantic templates, ARIA patterns for modal, tabs, menu and combobox, focus management with Teleport and route changes, live announcements, accessible form errors, and automated checks with axe. Use when building UI components, reviewing accessibility, WCAG compliance, keyboard navigation or screen reader support.
---

# Vue Accessibility

Target WCAG 2.2 AA. Order of preference: semantic HTML, then keyboard support, then focus management, then ARIA. A `<button>` beats a `<div role="button" tabindex="0">` with three handlers.

## Every component

1. Anything interactive is focusable and works with the keyboard. `<button>`, `<a href>` and `<input>` give you this for free.
2. Every input has a `<label>`. Every image has `alt` (`alt=""` when decorative).
3. Focus is visible. Never remove `outline` without a `:focus-visible` replacement.
4. Click targets are at least 24 by 24 CSS pixels. Color is never the only signal.
5. Changes announce themselves: errors, async results and route changes use a live region or move focus.

## Traps specific to Vue SPAs

| Trap | Fix |
|------|-----|
| Route changes are silent for screen readers | Announce the new page and move focus; see [focus-management](references/focus-management.md) |
| A Teleported modal lets focus escape behind it | Focus trap plus `inert` or `aria-modal`; see [focus-management](references/focus-management.md) |
| `v-if` swaps content without announcement | Live region, or focus the new content. VueUse 15 adds `useLiveAnnouncer` for polite and assertive messages |
| Hand-made dropdown, tab or menu widgets | Follow the ARIA pattern in [aria-components](references/aria-components.md), or use Reka UI primitives (`vue-ui` skill) |
| Validation errors shown only as red text | Wire `aria-describedby` and `aria-invalid`; see the `vue-forms` skill and [aria-components](references/aria-components.md) |

## References

| Topic | Path |
|-------|------|
| Modal, tabs, menu, combobox, disclosure and toast patterns in Vue | [aria-components](references/aria-components.md) |
| Teleport modals, focus traps, route announcements, skip links | [focus-management](references/focus-management.md) |
| vitest-axe, Playwright audits, eslint-plugin-vuejs-accessibility | [testing-a11y](references/testing-a11y.md) |
