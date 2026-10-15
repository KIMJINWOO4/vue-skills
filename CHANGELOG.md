# Changelog

## 2026-10-15

Versions re-checked against npm and release notes. Every synced file now traces to an upstream commit in `sources.json`.

### New skills

- `vue-debug`: the Vue team's 139 debugging guides plus a lookup table from console messages (`[Vue warn]`, Vue Router, Pinia) to cause, fix and guide.
- `vue-review`: a prioritized review checklist for Vue and Nuxt diffs with a `file:line` report format.
- `vue-upgrade`: upgrade guides for Vue 2 to 3, Vue 3.6, Pinia 4, VueUse 15, Vite 8, Vitest 5, Nuxt 4.6 and Nuxt 5 prep, pnpm 12, and a version table with Node and peer floors.
- `vue-ui`: Reka UI primitives (onmax/nuxt-skills) and the official Nuxt UI 4 skill.

### Updated content

- `vue`: switched to the Vue team's current structure (vuejs-ai v18): a workflow plus 22 core references, replacing the January snapshot of 180 single-rule files. Added Options API, JSX and adaptable composable references. Pinia docs now cover Pinia 4. VueUse references moved to v15.
- `vue-36-vapor`: rewritten for the 3.6 RC. Event delegation is opt-in since rc.2 (`.delegate`); rc.11 compile rules and warnings; unsupported features listed from the release notes.
- `router-v5`: changes in Router 5.1 to 5.4.
- `build-tooling`: Vite 8.3, Vitest 5, pnpm 12 (Rust rewrite), tsdown 0.23 docs from upstream. TypeScript 7 guide corrected: vue-tsc still needs TypeScript 6, use the `@typescript/typescript6` alias. Turborepo now points agents to the docs bundled in `node_modules/turbo/docs` first.
- `nuxt`: Nuxt 4.6 baseline, Nitro v3 references, Nuxt module authoring guide. The Nuxt docs stay pinned to the 4.x generation because the September upstream regeneration documents unreleased Nuxt 5.
- `vue-forms`: Regle core, rules and schema references from the official Regle repo.
- `design`: UnoCSS references, the current Anthropic frontend-design guidance, and an offline snapshot of the Web Interface Guidelines rules.
- `vue-data`, `vue-performance`, `vue-a11y`, `antfu`, `vitepress`, `find-skills`: refreshed.

### Repository

- `scripts/sync.mjs` and `sources.json`: reproducible sync from 12 upstream sources at pinned commits, with fixes for upstream links that point outside the copied folders.
- `scripts/validate.mjs`: frontmatter, size budgets, broken links and unreachable files. Runs in CI on every push and pull request.
- `scripts/stats.mjs`: measured startup token cost per skill, written into the README.
- Weekly GitHub Action that opens a pull request with upstream changes.
- Claude Code plugin marketplace manifest (`.claude-plugin/`).
- README rewritten; THIRD_PARTY_LICENSES lists every source.

## 2026-07-14

- Baseline moved to Vue 3.6 beta, Vue Router 5, Vite 8, Nuxt 4.
- Added `vue-data`, `vue-forms`, `vue-performance` and `vue-a11y`.

## 2026-07 (earlier)

- Added `vue-clean-components`.
- Consolidated upstream skills into domain skills with progressive disclosure.
