---
name: design
description: Visual design and UI quality for web frontends. Design direction, typography, color and layout that avoid generic generated looks, UI review against the Vercel Web Interface Guidelines, UnoCSS configuration, presets and semantic tokens. Use when building or restyling pages, dashboards and components, when reviewing UI quality, or when working with uno.config.ts.
---

# Frontend Design

## Reference map

| Task | Start here |
|------|-----------|
| New page or component, or a redesign: pick a direction, type, color, layout and copy | [frontend-aesthetics](references/frontend-aesthetics.md) |
| Review UI code for interaction, accessibility, forms, motion and content rules | [web-guidelines](references/web-guidelines.md) |
| UnoCSS: config, presets (wind4, icons, web fonts, typography), shortcuts, variants, transformers | [unocss-guide](references/unocss-guide.md) |
| A token system with light and dark parity in UnoCSS | [unocss-semantic-tokens](references/unocss-semantic-tokens.md) |

## Rules

- Follow the project's existing design system and component library first. Introduce new tokens only when none fit.
- Style with semantic tokens (`bg-base`, `text-muted`), not raw palette values, so dark mode cannot drift.
- Check focus states, contrast and reduced motion before calling a UI finished. The `vue-a11y` skill covers the details.
- Words in the UI are part of the design: sentence case, plain verbs, buttons that say what they do.

Related: `vue-ui` for Reka UI and Nuxt UI components.
