# UnoCSS Semantic Tokens (antfu-design, condensed)

> Condensed from [antfu/skills → antfu-design](https://github.com/antfu/skills) (MIT, v2026.06). For the full system (design-read dials, bias correction, pattern vocabulary, redesign protocol) read the upstream skill.

Use when building interfaces with UnoCSS in any framework — dense devtools panels to landing pages.

## Core rules

- **Semantic shortcuts over raw utility chains** in markup: `bg-base`, `border-base`, `color-active`, `btn-action` — not `bg-white dark:bg-#111 ...` repeated everywhere.
- **Design light and dark together.** Every core token defines both themes at the token, so components never carry `dark:` variants.
- **Name z-index layers** (`z-top-nav`, `z-panel-content`, `z-drawer-content`). No raw `z-50` in templates.
- **Class-based utilities only** in generated code (`class="..."`) — avoid Attributify syntax.
- Keep icon/status class strings **literal** so UnoCSS can statically extract them (add `// @unocss-include` in .ts files that build class strings).
- `font-mono` + `tabular-nums` for technical values (paths, SHAs, counters, timestamps, percentages).
- Long paths/IDs: truncate visually, keep the full value in `title`.
- Borders for dense/structural surfaces; layered shadows for elevated ones.

## Starter shortcuts

```ts
// uno.config.ts
shortcuts: [
  {
    'color-base': 'color-neutral-800 dark:color-neutral-200',
    'bg-base': 'bg-white dark:bg-#111',
    'bg-secondary': 'bg-#eee dark:bg-#222',
    'border-base': 'border-#8882',

    'bg-active': 'bg-#8881',
    'color-active': 'color-primary-600 dark:color-primary-300',
    'border-active': 'border-primary-600/25 dark:border-primary-400/25',

    'btn-action': 'inline-flex items-center gap-2 rounded border border-base px2 py1 op75 hover:op100 hover:bg-active disabled:pointer-events-none disabled:op30!',
    'op-fade': 'op65 dark:op55',
    'op-mute': 'op30 dark:op25',

    'z-top-nav': 'z-60',
    'z-panel-content': 'z-70',
    'z-drawer-content': 'z-100',
  },
]
```

Token families to grow from here: `bg-*` (base/secondary/active/hover), `color-*` (base/active/fade/mute), `border-*` (base/active), status (`color-ok`/`color-warn`/`color-error` with matching bg/border at low alpha).

## Why this works

- Components read as *intent* (`border-active`) not implementation — retheming = editing one config.
- Dark mode can't drift: there is no component-level `dark:` to forget.
- Low-alpha hex like `#8882` (gray at 13% alpha) gives borders/hover states that work on both themes with a single value — a signature of the style.
