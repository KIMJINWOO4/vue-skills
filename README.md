# Vue Skills

Agent skills for Vue 3, Nuxt and the Vite toolchain. Works with Claude Code and any agent that reads `SKILL.md` folders.

**Last updated: October 15, 2026.** Versions were checked against npm and the release notes on that date.

[![Validate](https://github.com/KIMJINWOO4/vue-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/KIMJINWOO4/vue-skills/actions/workflows/validate.yml)
![Updated](https://img.shields.io/badge/updated-2026--10--15-42b883)
![Skills](https://img.shields.io/badge/skills-16-35495e)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Why this collection

Good Vue skills already exist, spread over a dozen repositories: Anthony Fu's generated docs, the Vue team's best practices, the VueUse function map, official skills from Nuxt UI, tsdown and Regle. Installing them one by one gives an agent 29 descriptions to choose from, several covering the same ground (`vue`, `vue-best-practices`, `vue-debug-guides`, `pinia`, `vue-pinia-best-practices` and so on), and no shared baseline date.

This repository folds them into 16 skills, each with one clear trigger, and adds the parts nobody else covers:

- **Traceable.** Every synced file comes from an upstream commit recorded in [`sources.json`](sources.json). `node scripts/sync.mjs` reproduces the tree, and a weekly action opens a pull request when upstream moves.
- **Checked against releases.** Version claims carry the date they were checked and link the release notes. Where upstream docs run ahead of or behind the packages people actually install, this repo says so (see [What the October review found](#what-the-october-review-found)).
- **Validated.** CI checks frontmatter, size budgets and every relative link across about 800 reference files. Upstream links that break when copied are repaired during sync.
- **Gaps filled.** A console-message index for debugging, a code review checklist and upgrade guides are written for this repo, along with skills for data fetching, forms, performance, accessibility and component structure.

## Skills

| Skill | Use it for | Inside |
|-------|-----------|--------|
| [`vue`](skills/vue/SKILL.md) | Any `.vue` file or composable | Vue team workflow and core references, API reference, Vue 3.6 and Vapor Mode, Pinia 4, Router 5, testing, VueUse 15, Options API and JSX |
| [`vue-debug`](skills/vue-debug/SKILL.md) | Errors, `[Vue warn]` messages, stale UI, hydration mismatches | Console message lookup table, 139 debugging guides |
| [`vue-review`](skills/vue-review/SKILL.md) | Reviewing a PR or diff | Prioritized checklist (P0 to P3), `file:line` report format, Nuxt checks |
| [`vue-upgrade`](skills/vue-upgrade/SKILL.md) | Bumping versions | Vue 2 to 3, Vue 3.6, Pinia 4, VueUse 15, Vite 8, Vitest 5, Nuxt 4.6 and 5 prep, pnpm 12, version and Node floors |
| [`vue-data`](skills/vue-data/SKILL.md) | Fetching and caching API data | Pinia Colada, data loaders, race conditions, SSR |
| [`vue-forms`](skills/vue-forms/SKILL.md) | Forms and validation | `defineModel`, VeeValidate with Zod, Regle, form UX |
| [`vue-performance`](skills/vue-performance/SKILL.md) | Slow, large or leaking apps | Profiling workflow, rendering, bundle, memory |
| [`vue-a11y`](skills/vue-a11y/SKILL.md) | Accessibility | ARIA patterns, focus management, axe testing |
| [`vue-ui`](skills/vue-ui/SKILL.md) | Component libraries | Reka UI primitives, Nuxt UI 4 |
| [`vue-clean-components`](skills/vue-clean-components/SKILL.md) | Splitting and structuring components | Component levels, split rules, Core-Adapter, store boundaries |
| [`nuxt`](skills/nuxt/SKILL.md) | Nuxt apps and modules | Nuxt 4 docs, 3 to 4 migration, module authoring, Nitro v3 |
| [`build-tooling`](skills/build-tooling/SKILL.md) | Build, test and package config | Vite 8, Vitest 5, tsdown, pnpm 12, Turborepo, TypeScript 7 with vue-tsc |
| [`design`](skills/design/SKILL.md) | Visual design and UI review | Design direction, Web Interface Guidelines, UnoCSS |
| [`vitepress`](skills/vitepress/SKILL.md) | Documentation sites | VitePress 1.x |
| [`antfu`](skills/antfu/SKILL.md) | Anthony Fu's project conventions | ESLint config, pnpm catalogs, knip, publishing |
| [`find-skills`](skills/find-skills/SKILL.md) | Finding other skills | skills CLI search |

## Install

The skills link to each other (for example, `vue-review` points into `vue-debug`), so installing the whole set works best.

**Claude Code plugin**

```
/plugin marketplace add KIMJINWOO4/vue-skills
/plugin install vue-skills@vue-skills
```

**skills CLI** (Claude Code, Cursor, Codex, OpenCode and other agents)

```bash
npx skills add KIMJINWOO4/vue-skills --skill='*'
```

**As a project dependency** with [skills-npm](https://github.com/antfu/skills-npm), so the whole team gets the same skills on install. Add the source to `package.json`:

```json
{
  "skills": ["KIMJINWOO4/vue-skills"]
}
```

Then run `npx skills-npm setup` once. Pin a commit with `"KIMJINWOO4/vue-skills#<sha>"` if you want reproducible content.

**Manual copy**

```bash
git clone https://github.com/KIMJINWOO4/vue-skills.git
cp -r vue-skills/skills/* your-project/.claude/skills/
```

## What the October review found

Five things an agent would get wrong from older notes or from the latest upstream docs:

1. **TypeScript 7 breaks `vue-tsc`.** TS 7.0 (July 2026) ships without the JavaScript compiler API that Volar needs. Keep `"typescript": "npm:@typescript/typescript6@^6.0.2"` for Vue type-checking until vue-tsc supports TS 7.1. [Details](skills/build-tooling/references/typescript-7.md)
2. **Vapor Mode no longer delegates events by default.** Since Vue 3.6.0-rc.2, delegation is opt-in with `@click.delegate`, and `compilerOptions.eventDelegation` was removed. [Details](skills/vue/references/vue-36-vapor.md)
3. **The newest generated Nuxt docs describe Nuxt 5, which is not released.** antfu/skills regenerated its Nuxt and VitePress skills from main branches in September. This repo pins those two to the previous generation (Nuxt 4.x, VitePress 1.x) and covers Nuxt 5 as preparation work. [Details](sources.json)
4. **Turborepo moved its docs into the npm package.** `node_modules/turbo/docs` now matches the installed version exactly, so `build-tooling` reads it first and keeps the offline snapshot as a fallback.
5. **VueUse 15 removed `templateRef` and changed `useThrottleFn`.** `trailing` now defaults to `true`, and timer options moved to `scheduler`. [Details](skills/vue-upgrade/references/vueuse-15.md)

## Versions covered

| Package | Version | Notes |
|---------|---------|-------|
| vue | 3.5.44, 3.6.0-rc.11 | 3.6 adds Vapor Mode; no stable date yet |
| vue-router | 5.4 | File-based routing in core |
| pinia | 4.1 | `@vue/devtools-api` is now a required peer |
| @pinia/colada | 1.4 | Recommended data layer |
| @vueuse/core | 15.0 | Node 22+ |
| vite | 8.3 | Rolldown and Oxc |
| vitest | 5.0 | `clearMocks` on by default |
| nuxt | 4.6 | Nuxt 3 end of life 2026-07-31; Nuxt 5 planned for Q4 2026 |
| nitro | 3.0 beta | Nuxt 4 still uses nitropack 2 |
| typescript | 7.0 | Use TS 6 for vue-tsc |
| pnpm | 12.11 | Rust rewrite, same lockfile format |

The full table with Node and peer floors is in [`vue-upgrade/references/versions.md`](skills/vue-upgrade/references/versions.md).

## Startup cost

Agents load every installed skill's name and description at the start of each session, then read `SKILL.md` and references only when a task needs them. Measured with `node scripts/stats.mjs` (tokens estimated as characters divided by 4):

<!-- stats:start -->
| Skill | Startup tokens | Reference files | Reference size |
|-------|---------------:|----------------:|---------------:|
| `antfu` | 62 | 5 | 20 KB |
| `build-tooling` | 87 | 113 | 566 KB |
| `design` | 93 | 29 | 91 KB |
| `find-skills` | 79 | 0 | 0 KB |
| `nuxt` | 95 | 38 | 206 KB |
| `vitepress` | 42 | 14 | 59 KB |
| `vue` | 91 | 351 | 1013 KB |
| `vue-a11y` | 89 | 3 | 12 KB |
| `vue-clean-components` | 86 | 7 | 16 KB |
| `vue-data` | 87 | 3 | 10 KB |
| `vue-debug` | 106 | 141 | 596 KB |
| `vue-forms` | 78 | 16 | 46 KB |
| `vue-performance` | 88 | 4 | 12 KB |
| `vue-review` | 98 | 1 | 6 KB |
| `vue-ui` | 105 | 67 | 205 KB |
| `vue-upgrade` | 90 | 9 | 21 KB |
| **Total (16 skills)** | **1376** | **801** | **2.8 MB** |

Installing the 29 upstream skills bundled here one by one would load 29 descriptions, about 1621 tokens, at every session start. This repo loads 16 descriptions, about 1376 tokens, and that already includes the hand-written workflow skills.
<!-- stats:end -->

## How it stays current

```
sources.json  →  scripts/sync.mjs  →  skills/**     (upstream content, pinned by commit)
                                     + hand-written  (SKILL.md files, vue-review, vue-upgrade, ...)
scripts/validate.mjs  →  CI on every push and pull request
.github/workflows/sync.yml  →  weekly pull request when upstream changes
```

- Upstream content: antfu/skills, vuejs-ai/skills, vueuse/skills, rolldown/tsdown, vercel/turborepo, nuxt/ui, onmax/nuxt-skills, Regle, Vercel's Web Interface Guidelines and find-skills, and Anthropic's frontend-design. Each copy rule lives in `sources.json`.
- A source can be pinned with a reason (`"pin": true`) when its newest content documents unreleased versions.
- The date at the top of this README is the last full review of the hand-written skills.

See [CONTRIBUTING.md](CONTRIBUTING.md) to run the scripts or add a source, and [CHANGELOG.md](CHANGELOG.md) for what changed.

## Credits

This collection stands on the work of [Anthony Fu](https://github.com/antfu) ([antfu/skills](https://github.com/antfu/skills)), the [vuejs-ai](https://github.com/vuejs-ai/skills) maintainers, [SerKo](https://github.com/serkodev) and the [VueUse](https://github.com/vueuse/skills) team, [onmax](https://github.com/onmax/nuxt-skills), the [Nuxt UI](https://github.com/nuxt/ui), [tsdown](https://github.com/rolldown/tsdown), [Turborepo](https://github.com/vercel/turborepo) and [Regle](https://github.com/victorgarciaesgi/regle) teams, [Vercel Labs](https://github.com/vercel-labs) and [Anthropic](https://github.com/anthropics/skills). `vue-clean-components` builds on Michael Thiessen's Clean Components Toolkit and the toss.tech Core-Adapter pattern. ARIA patterns follow the [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/).

## License

MIT for this repository's own content. Synced content keeps its upstream license; see [THIRD_PARTY_LICENSES](THIRD_PARTY_LICENSES).
