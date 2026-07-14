---
name: vue-a11y
description: Accessibility (a11y) for Vue 3 apps. Semantic templates, ARIA component patterns (modal, tabs, menu, combobox), focus management with Teleport and router navigation, accessible forms and errors, automated testing with axe. Use when building UI components, reviewing for accessibility, WCAG compliance, keyboard navigation, or screen reader support.
---

# Vue Accessibility Skill

> Target: WCAG 2.2 AA. Priority order: semantic HTML > keyboard support > focus management > ARIA. ARIA is the last resort, not the first tool — `<button>` beats `<div role="button" tabindex="0">` plus three handlers.

## Non-negotiables for every component

1. Interactive = focusable + keyboard-operable (`<button>`, `<a href>`, `<input>` give this free).
2. Every input has a `<label>`; every image an `alt` (empty `alt=""` for decorative).
3. Visible focus indicator — never `outline: none` without a replacement (`:focus-visible`).
4. Click targets ≥ 24×24px; color is never the only signal.
5. State changes announce themselves: errors, async results, route changes (live regions / focus moves).

## SPA-specific traps (Vue)

| Trap | Fix |
|------|-----|
| Route change is silent to screen readers | Announce + move focus — [focus-management](references/focus-management.md) |
| Modal via Teleport, focus escapes behind it | Focus trap + `inert`/`aria-modal` — [focus-management](references/focus-management.md) |
| `v-if` swaps content without announcement | `aria-live` region or focus the new content |
| Custom `<div>` dropdown/tab/menu widgets | Use the ARIA pattern — [aria-components](references/aria-components.md) |
| Validation errors only shown as red text | `aria-describedby` + `aria-invalid` wiring — see `vue-forms` skill + [aria-components](references/aria-components.md) |

## Reference Map

| Topic | Description | Path |
|------|-------------|------|
| **ARIA components** | Modal, tabs, menu, combobox, disclosure, toast patterns in Vue | [aria-components](references/aria-components.md) |
| **Focus management** | Teleport modals, focus traps, route announcements, skip links | [focus-management](references/focus-management.md) |
| **Testing** | vitest-axe, Playwright audits, eslint-plugin-vuejs-accessibility | [testing-a11y](references/testing-a11y.md) |
