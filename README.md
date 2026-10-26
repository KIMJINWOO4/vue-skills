# Vue Skills

Agent skills for Vue 3, Nuxt and the Vite toolchain. Works with Claude Code and any agent that reads `SKILL.md` folders.

**Last updated: October 15, 2026.** Every version number below matches npm and the release notes as of that date.

[![Validate](https://github.com/KIMJINWOO4/vue-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/KIMJINWOO4/vue-skills/actions/workflows/validate.yml)
![Updated](https://img.shields.io/badge/updated-2026--10--15-42b883)
![Skills](https://img.shields.io/badge/skills-17-35495e)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Why this collection

Good Vue skills already exist in about a dozen repositories, including Anthony Fu's generated docs, the Vue team's best practices, the VueUse function map, and official skills from Nuxt UI, tsdown and Regle. If you install them one by one, your agent sees 29 descriptions, and several of them cover the same topic (`vue`, `vue-best-practices`, `vue-debug-guides`, `pinia`, `vue-pinia-best-practices`). Each one was also written against a different set of versions.

This repository merges them into 17 skills that each answer a different kind of request. It also adds content you will not find upstream.

- Every synced file comes from an upstream commit recorded in [`sources.json`](sources.json). Running `node scripts/sync.mjs` rebuilds the same tree, and a weekly GitHub Action opens a pull request when an upstream repository changes.
- Version numbers come with the date they were checked and a link to the release notes. When an upstream doc describes a release that does not exist yet, or one that is already out of date, this README lists it in [What the October review found](#what-the-october-review-found).
- CI checks the frontmatter, the size of each `SKILL.md` and every relative link in about 800 reference files. The sync script fixes upstream links that would break after copying.
- The repository adds its own skills for debugging by console message, code review, version upgrades, data fetching, forms, performance, accessibility and component structure.

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
| [`vue-ci`](skills/vue-ci/SKILL.md) | Checking a project or setting up CI | Runs [vue-skills-ci](https://github.com/KIMJINWOO4/vue-skills-ci), fixes its findings, writes the GitHub Actions workflow |
| [`find-skills`](skills/find-skills/SKILL.md) | Finding other skills | skills CLI search |

## Install

The skills link to each other. For example, `vue-review` links to guides in `vue-debug`. Install the whole set so those links resolve.

### Claude Code plugin

```
/plugin marketplace add KIMJINWOO4/vue-skills
/plugin install vue-skills@vue-skills
```

### skills CLI

Works with Claude Code, Cursor, Codex, OpenCode and other agents.

```bash
npx skills add KIMJINWOO4/vue-skills --skill='*'
```

### As a project dependency

With [skills-npm](https://github.com/antfu/skills-npm), everyone on the team gets the same skills when they run `npm install`. Add the source to `package.json`:

```json
{
  "skills": ["KIMJINWOO4/vue-skills"]
}
```

Then run `npx skills-npm setup` once. To get the same content on every machine, pin a commit with `"KIMJINWOO4/vue-skills#<sha>"`.

### Manual copy

```bash
git clone https://github.com/KIMJINWOO4/vue-skills.git
cp -r vue-skills/skills/* your-project/.claude/skills/
```

## Run the rules in CI

The checks that can be automated live in a companion repository, [vue-skills-ci](https://github.com/KIMJINWOO4/vue-skills-ci): a reusable GitHub Actions workflow that installs, lints, type-checks, tests and builds a Vue or Nuxt project, plus 19 rules for the version and safety problems described in these skills. Every finding links back to the guide here that explains it.

```yaml
jobs:
  vue:
    uses: KIMJINWOO4/vue-skills-ci/.github/workflows/vue-ci.yml@v1
```

![Rule findings from vue-skills-ci on a GitHub Actions run](https://raw.githubusercontent.com/KIMJINWOO4/vue-skills-ci/main/docs/images/annotations.png)

The `vue-ci` skill lets an agent run the same checks and fix what they report.

## What the October review found

Older notes and some of the newest upstream docs would lead an agent to get these five things wrong.

1. `vue-tsc` does not work with TypeScript 7. TS 7.0 shipped in July 2026 without the JavaScript compiler API that Volar needs. Keep `"typescript": "npm:@typescript/typescript6@^6.0.2"` for Vue type-checking until vue-tsc supports TS 7.1. [Details](skills/build-tooling/references/typescript-7.md)
2. Vapor Mode no longer delegates events by default. Since Vue 3.6.0-rc.2 you opt in per listener with `@click.delegate`, and the `compilerOptions.eventDelegation` option is gone. [Details](skills/vue/references/vue-36-vapor.md)
3. The newest generated Nuxt docs describe Nuxt 5, which is not released. In September antfu/skills regenerated its Nuxt and VitePress skills from the main branches. This repository keeps those two at the previous generation, which documents Nuxt 4.x and VitePress 1.x, and treats Nuxt 5 as preparation work. [Details](sources.json)
4. Turborepo now ships its docs inside the npm package. `node_modules/turbo/docs` always matches the installed version, so `build-tooling` tells the agent to read it first and uses the offline copy only when the package is not installed.
5. VueUse 15 removed `templateRef`, and `useThrottleFn` now defaults `trailing` to `true`. Timer options such as `interval` moved to a `scheduler` option. [Details](skills/vue-upgrade/references/vueuse-15.md)

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

At the start of each session an agent loads the name and description of every installed skill. It reads `SKILL.md` and the references only when a task needs them. `node scripts/stats.mjs` produces the table below and estimates tokens as characters divided by 4.

<!-- stats:start -->
| Skill | Startup tokens | Reference files | Reference size |
|-------|---------------:|----------------:|---------------:|
| `antfu` | 62 | 5 | 20 KB |
| `build-tooling` | 87 | 113 | 571 KB |
| `design` | 93 | 29 | 91 KB |
| `find-skills` | 79 | 0 | 0 KB |
| `nuxt` | 95 | 38 | 206 KB |
| `vitepress` | 42 | 14 | 59 KB |
| `vue` | 91 | 351 | 1021 KB |
| `vue-a11y` | 89 | 3 | 12 KB |
| `vue-ci` | 110 | 1 | 12 KB |
| `vue-clean-components` | 86 | 7 | 15 KB |
| `vue-data` | 87 | 3 | 10 KB |
| `vue-debug` | 106 | 141 | 596 KB |
| `vue-forms` | 78 | 16 | 46 KB |
| `vue-performance` | 88 | 4 | 12 KB |
| `vue-review` | 98 | 1 | 6 KB |
| `vue-ui` | 105 | 69 | 273 KB |
| `vue-upgrade` | 90 | 9 | 21 KB |
| **Total (17 skills)** | **1486** | **804** | **2.9 MB** |

Installing the 30 upstream skills bundled here one by one would load 30 descriptions, about 1731 tokens, at every session start. This repo loads 17 descriptions, about 1486 tokens, and that already includes the hand-written workflow skills.
<!-- stats:end -->

## How it stays current

Two kinds of files live under `skills/`.

- Synced files. `sources.json` lists each upstream repository, the commit to copy from and where each file goes, and `scripts/sync.mjs` copies them. The sources are antfu/skills, vuejs-ai/skills, vueuse/skills, rolldown/tsdown, vercel/turborepo, nuxt/ui, onmax/nuxt-skills, Regle, Vercel's Web Interface Guidelines and find-skills, Anthropic's frontend-design, and the `vue-ci` skill from vue-skills-ci.
- Hand-written files. Most `SKILL.md` files, plus the references of `vue-review`, `vue-upgrade`, `vue-data`, `vue-forms`, `vue-performance`, `vue-a11y` and `vue-clean-components`.

`scripts/validate.mjs` runs in CI on every push and pull request. Every Monday, `.github/workflows/sync.yml` moves the synced sources to their latest commit and opens a pull request if anything changed. A source marked `"pin": true` stays at its commit, which is how the Nuxt and VitePress docs stay on released versions. The date at the top of this README is the last time the hand-written skills were reviewed against new releases.

See [CONTRIBUTING.md](CONTRIBUTING.md) to run the scripts or add a source, and [CHANGELOG.md](CHANGELOG.md) for what changed.

## Credits

This collection is built from the work of [Anthony Fu](https://github.com/antfu) ([antfu/skills](https://github.com/antfu/skills)), the [vuejs-ai](https://github.com/vuejs-ai/skills) maintainers, [SerKo](https://github.com/serkodev) and the [VueUse](https://github.com/vueuse/skills) team, [onmax](https://github.com/onmax/nuxt-skills), the [Nuxt UI](https://github.com/nuxt/ui), [tsdown](https://github.com/rolldown/tsdown), [Turborepo](https://github.com/vercel/turborepo) and [Regle](https://github.com/victorgarciaesgi/regle) teams, [Vercel Labs](https://github.com/vercel-labs) and [Anthropic](https://github.com/anthropics/skills). `vue-clean-components` builds on Michael Thiessen's Clean Components Toolkit and the toss.tech Core-Adapter pattern. ARIA patterns follow the [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/).

## License

MIT for this repository's own content. Synced content keeps its upstream license; see [THIRD_PARTY_LICENSES](THIRD_PARTY_LICENSES).
