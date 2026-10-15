<!-- Synced from antfu/skills@feb0f3a:skills/unocss/SKILL.md by scripts/sync.mjs. Edit sources.json, not this file. -->

UnoCSS is an instant atomic CSS engine designed to be flexible and extensible. The core is un-opinionated - all CSS utilities are provided via presets. It's a superset of Tailwind CSS, so you can reuse your Tailwind knowledge for basic syntax usage.

**Important:** Before writing UnoCSS code, agents should check for `uno.config.*` or `unocss.config.*` files in the project root to understand what presets, rules, and shortcuts are available. If the project setup is unclear, avoid using attributify mode and other advanced features - stick to basic `class` usage.

> The skill is based on UnoCSS v66.10.5, generated at 2026-09-25.

## Core

| Topic | Description | Reference |
|-------|-------------|-----------|
| Configuration | Config file setup and all configuration options | [core-config](unocss/core-config.md) |
| Rules | Static and dynamic rules for generating CSS utilities | [core-rules](unocss/core-rules.md) |
| Shortcuts | Combine multiple rules into single shorthands | [core-shortcuts](unocss/core-shortcuts.md) |
| Theme | Theming system for colors, breakpoints, and design tokens | [core-theme](unocss/core-theme.md) |
| Variants | Apply variations like hover:, dark:, responsive to rules | [core-variants](unocss/core-variants.md) |
| Extracting | How UnoCSS extracts utilities from source code | [core-extracting](unocss/core-extracting.md) |
| Safelist & Blocklist | Force include or exclude specific utilities | [core-safelist](unocss/core-safelist.md) |
| Layers & Preflights | CSS layer ordering and raw CSS injection | [core-layers](unocss/core-layers.md) |
| Processors | Transform generated CSS layers (incl. Lightning CSS) | [core-processors](unocss/core-processors.md) |

## Presets

### Main Presets

| Topic | Description | Reference |
|-------|-------------|-----------|
| Preset Wind3 | Tailwind CSS v3 / Windi CSS compatible preset (most common) | [preset-wind3](unocss/preset-wind3.md) |
| Preset Wind4 | Tailwind CSS v4 compatible preset with modern CSS features | [preset-wind4](unocss/preset-wind4.md) |
| Preset Mini | Minimal preset with essential utilities for custom builds | [preset-mini](unocss/preset-mini.md) |

### Feature Presets

| Topic | Description | Reference |
|-------|-------------|-----------|
| Preset Icons | Pure CSS icons using Iconify with any icon set | [preset-icons](unocss/preset-icons.md) |
| Preset Attributify | Group utilities in HTML attributes instead of class | [preset-attributify](unocss/preset-attributify.md) |
| Preset Typography | Prose classes for typographic defaults | [preset-typography](unocss/preset-typography.md) |
| Preset Web Fonts | Easy Google Fonts and other web fonts integration | [preset-web-fonts](unocss/preset-web-fonts.md) |
| Preset Tagify | Use utilities as HTML tag names | [preset-tagify](unocss/preset-tagify.md) |
| Preset Rem to Px | Convert rem units to px for utilities | [preset-rem-to-px](unocss/preset-rem-to-px.md) |

## Transformers

| Topic | Description | Reference |
|-------|-------------|-----------|
| Variant Group | Shorthand for grouping utilities with common prefixes | [transformer-variant-group](unocss/transformer-variant-group.md) |
| Directives | CSS directives: @apply, @screen, theme(), icon() | [transformer-directives](unocss/transformer-directives.md) |
| Compile Class | Compile multiple classes into one hashed class | [transformer-compile-class](unocss/transformer-compile-class.md) |
| Attributify JSX | Support valueless attributify in JSX/TSX | [transformer-attributify-jsx](unocss/transformer-attributify-jsx.md) |

## Integrations

| Topic | Description | Reference |
|-------|-------------|-----------|
| Vite Integration | Setting up UnoCSS with Vite and framework-specific tips | [integrations-vite](unocss/integrations-vite.md) |
| Nuxt Integration | UnoCSS module for Nuxt applications | [integrations-nuxt](unocss/integrations-nuxt.md) |
