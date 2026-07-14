# Testing Accessibility in Vue

Automated tools catch ~30-40% of WCAG issues (missing labels, contrast, ARIA misuse). The rest needs keyboard walks and screen reader passes. Layer all three.

## 1. Lint layer — catch at write time

```bash
pnpm add -D eslint-plugin-vuejs-accessibility
```

```ts
// eslint.config.ts (flat config)
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'

export default [
  ...pluginVueA11y.configs['flat/recommended'],
  // project-specific tuning:
  { rules: { 'vuejs-accessibility/label-has-for': ['error', { required: { some: ['nesting', 'id'] } }] } },
]
```

Catches: missing `alt`, unlabeled inputs, `click` without key handler on non-interactive elements, bad ARIA attributes, `autofocus`, positive `tabindex`.

## 2. Unit/component layer — axe on rendered output

```bash
pnpm add -D vitest-axe
```

```ts
// vitest setup file
import * as matchers from 'vitest-axe/matchers'
import { expect } from 'vitest'
expect.extend(matchers)
```

```ts
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'

it('LoginForm has no axe violations', async () => {
  const { container } = render(LoginForm)
  expect(await axe(container)).toHaveNoViolations()
})

it('error state is announced', async () => {
  const { getByLabelText, getByRole } = render(LoginForm)
  await fireEvent.blur(getByLabelText('Email'))
  const input = getByLabelText('Email')
  expect(input).toHaveAttribute('aria-invalid', 'true')
  // the error text must be linked, not just nearby
  const errId = input.getAttribute('aria-describedby')
  expect(document.getElementById(errId!)).toHaveTextContent(/required/i)
})
```

- Requires a DOM environment (`environment: 'jsdom'` or Vitest browser mode; browser mode gives real rendering → more accurate axe results, including color contrast).
- Test **states**, not just initial render: open the modal, trigger the error, expand the menu — that's where violations hide.
- Testing Library's role-based queries (`getByRole('button', { name: 'Save' })`) are themselves an a11y assertion — if the query fails, the accessible name is broken.

## 3. E2E layer — full-page audits + keyboard walks

```bash
pnpm add -D @axe-core/playwright
```

```ts
import AxeBuilder from '@axe-core/playwright'

test('checkout page is accessible', async ({ page }) => {
  await page.goto('/checkout')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
    .analyze()
  expect(results.violations).toEqual([])
})

test('modal is keyboard-operable', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')                    // skip link first?
  await expect(page.locator('.skip-link')).toBeFocused()
  await page.getByRole('button', { name: 'Settings' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')                  // Esc closes…
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: 'Settings' })).toBeFocused() // …and restores focus
})
```

Run axe once per *page state* (per route + with key overlays open), not just per route.

## 4. Manual pass (release checklist)

- [ ] Unplug the mouse: complete every critical flow with keyboard only
- [ ] Focus visible at every stop; no traps outside modals; order matches visual order
- [ ] Screen reader smoke test (NVDA on Windows / VoiceOver on macOS): page title announced on navigation, form errors announced, dynamic updates (toasts, results) announced
- [ ] 200% browser zoom: no lost content or horizontal scroll
- [ ] `prefers-reduced-motion`: animations reduced/removed (`useReducedMotion` / CSS media query)

## CI wiring

Lint + vitest-axe run per PR; Playwright axe suite per merge. Treat new violations as build failures — a11y regressions are far cheaper to block than to retrofit.
