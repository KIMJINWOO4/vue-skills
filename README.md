# Vue Skills

A curated, consolidated collection of AI agent skills for the Vue.js / frontend ecosystem — restructured using **Progressive Disclosure** to minimize context window overhead.

Compatible with any AI coding agent that supports the `SKILL.md` convention (Claude Code, etc.).

> **Baseline: July 2026** — Vue 3.5/3.6 (Vapor Mode), Vue Router 5, Pinia 3 + Pinia Colada, VueUse 14, Vite 8 (Rolldown), Vitest 4, Nuxt 4, pnpm 11, TypeScript 7.

## What's Inside

**12 skills, ~640 reference files** — 8 consolidated/updated ecosystem skills plus 4 hand-written workflow skills covering the things every Vue app needs: data fetching, forms, performance, and accessibility.

| Skill | Covers | References |
|---|---|---|
| **vue/** | Vue 3 core, 3.6 Vapor Mode, best practices (180+ gotchas), Pinia, Router 5, testing, VueUse (v14) | 482 |
| **build-tooling/** | Vite 8 (Rolldown), Vitest 4, tsdown, pnpm 11, Turborepo, TypeScript 7 native compiler | 97 |
| **nuxt/** | Nuxt 4 (app/ directory, data-fetching defaults), migration from Nuxt 3 | 19 |
| **vue-data/** ✨ | Server state: Pinia Colada, Router Data Loaders, race conditions, caching patterns | 3 |
| **vue-forms/** ✨ | v-model/defineModel, VeeValidate + Zod, wizards, submit states, uploads | 3 |
| **vue-performance/** ✨ | Profiling workflow, rendering, bundle size, memory leaks | 4 |
| **vue-a11y/** ✨ | ARIA component patterns, focus management, a11y testing | 3 |
| **vue-clean-components/** | Component level hierarchy, Core-Adapter, split decision rules | 7 |
| **design/** | Frontend aesthetics, Web Interface Guidelines, UnoCSS semantic tokens (antfu-design) | 3 |
| **vitepress/** | VitePress 1.6 (2.0-alpha notes) | 14 |
| **antfu/** | Anthony Fu stack conventions | 5 |
| **find-skills/** | Skill discovery | 0 |

✨ = new in the 2026-07 update.

## What's New (2026-07)

- **Vue 3.6 / Vapor Mode** reference: `<script setup vapor>`, `createVaporApp`, interop plugin, alien-signals reactivity, adoption strategy.
- **Vue Router 5**: file-based routing in core (`vue-router/vite`, `vue-router/auto-routes`), typed routes, Data Loaders.
- **Vite 8**: Rolldown as the only bundler, `advancedChunks`, migration notes. **TypeScript 7** native compiler guide.
- **Nuxt 4** baseline (Nuxt 3 EOL 2026-07-31): `app/` directory, shallow data refs, upgrade checklist.
- **4 new workflow skills** (`vue-data`, `vue-forms`, `vue-performance`, `vue-a11y`) — the common tasks that previously had no home.
- Pinia guide now routes server state to **Pinia Colada** instead of hand-rolled loading/error stores.

## The Problem: Skill Explosion

The agent loads every skill's `name` and `description` into the system prompt at startup. If you install skills individually from [antfu/skills](https://github.com/antfu/skills) and other sources, you end up with 17+ separate skills — 17+ descriptions permanently occupying your context window:

```
.claude/skills/
├── vue/                        # ─┐
├── vue-best-practices/         #  │  These 6 are all "Vue development"
├── vue-router-best-practices/  #  │  but each consumes a description slot
├── vue-testing-best-practices/ #  │
├── vueuse-functions/           #  │
├── pinia/                      # ─┘
├── vite/                       # ─┐
├── vitest/                     #  │  These 5 are all "build tooling"
├── tsdown/                     #  │
├── pnpm/                       #  │
├── turborepo/                  # ─┘
└── ...
```

This is the **Class Explosion anti-pattern** applied to skills.

## The Solution: Progressive Disclosure

**SKILL.md provides the entry point only; detailed knowledge is delegated to `references/`.**

1. **Layer 1 — SKILL.md (always loaded):** A thin description that tells the agent *when* to activate and *where* to look. This is the only thing that costs context at startup.

2. **Layer 2 — references/ (loaded on demand):** Guide files (`*-guide.md`) serve as intermediate indexes. Individual reference files contain the deep knowledge. The agent reads these only when the task requires it.

```
User: "Add a Pinia store for user auth"

Agent reads: vue/SKILL.md               → sees "Pinia" → references/pinia-guide.md
Agent reads: references/pinia-guide.md  → sees store patterns → pinia/core-stores.md
Agent reads: pinia/core-stores.md       → has the exact knowledge needed
```

Consolidation happens **by domain**: six Vue-ecosystem skills became one `vue/` skill; five build tools became one `build-tooling/`. The new workflow skills (`vue-data`, `vue-forms`, …) stay separate because they activate in genuinely different situations — the unit of consolidation is the *trigger context*, not the file count.

## Directory Structure

```
skills/
├── vue/                     # Vue 3 ecosystem (6 skills merged)
│   ├── SKILL.md
│   └── references/
│       ├── vue-36-vapor.md          # Vue 3.6 + Vapor Mode
│       ├── script-setup-macros.md
│       ├── best-practices-index.md  → best-practices/ (180+ gotchas)
│       ├── pinia-guide.md           → pinia/
│       ├── router-guide.md          → router/ (incl. Router 5 file-based routing)
│       ├── testing-guide.md         → testing/
│       └── vueuse-guide.md          → vueuse/ (264 composables)
│
├── build-tooling/           # Vite 8 · Vitest 4 · tsdown · pnpm 11 · Turborepo · TS 7
├── nuxt/                    # Nuxt 4 (+ migration from 3)
├── vue-data/                # Pinia Colada · Data Loaders · fetching patterns
├── vue-forms/               # defineModel · VeeValidate+Zod · form UX
├── vue-performance/         # diagnose → rendering / bundle / memory-leaks
├── vue-a11y/                # ARIA patterns · focus management · axe testing
├── vue-clean-components/    # component structure rules
├── design/                  # aesthetics · web guidelines · UnoCSS tokens
├── vitepress/
├── antfu/
└── find-skills/
```

## Installation

An AI coding agent that supports the `.claude/skills/` convention (e.g., [Claude Code](https://docs.anthropic.com/en/docs/claude-code)) discovers skills placed in your project's `.claude/skills/` directory automatically.

```bash
git clone https://github.com/KIMJINWOO4/vue-skills.git

# All skills
cp -r vue-skills/skills/ your-project/.claude/skills/

# Or cherry-pick
cp -r vue-skills/skills/vue/ your-project/.claude/skills/vue/
cp -r vue-skills/skills/vue-data/ your-project/.claude/skills/vue-data/
```

Verify by asking your agent: *"What skills do you have available?"*

## Usage

Skills activate **automatically** based on your prompts — the agent matches your request against each skill's `description`.

| You say... | Skill | The agent reads |
|---|---|---|
| "Create a Pinia store for auth" | `vue` | `pinia-guide.md` → `pinia/core-stores.md` |
| "Make this dashboard component faster" | `vue-performance` | `diagnose.md` → `rendering.md` |
| "Fetch and cache the products list" | `vue-data` | `pinia-colada.md` |
| "Build a signup form with validation" | `vue-forms` | `vee-validate-zod.md` |
| "Make this modal accessible" | `vue-a11y` | `focus-management.md`, `aria-components.md` |
| "Try Vapor Mode on this component" | `vue` | `vue-36-vapor.md` |
| "Migrate this app to Nuxt 4" | `nuxt` | `nuxt4-migration.md` |
| "Configure Vite for SSR" | `build-tooling` | `vite-guide.md` → `vite/build-and-ssr.md` |
| "Split this 500-line component" | `vue-clean-components` | `split-decision-tree.md` |
| "Set up Turborepo caching" | `build-tooling` | `turborepo-guide.md` → `turborepo/caching/` |

## Customization

Extend any skill by adding files under its `references/` and pointing to them from the skill's guide/index file:

```
.claude/skills/vue/references/
├── ...existing files...
└── my-team-conventions.md
```

**Key rules for a SKILL.md:**
- Keep it thin (~30-40 lines) — this is always loaded into context
- YAML frontmatter with `name` and `description`; the `description` lists the keywords that trigger activation
- Use a reference table pointing at guide files, and put deep content in `references/`

## Version Matrix (2026-07)

| Package | Version | Notes |
|---|---|---|
| vue | 3.5.x stable · 3.6 beta | Vapor Mode feature-complete in 3.6 |
| vue-router | 5.x | file-based routing in core, no breaking changes from v4 |
| pinia / @pinia/colada | 3.x / 1.x | Colada = recommended server-state layer |
| @vueuse/core | 14.x | |
| vite | 8.x | Rolldown default bundler |
| vitest | 4.x (5 beta) | |
| nuxt | 4.4.x | Nuxt 3 EOL 2026-07-31 |
| pnpm | 11.x | |
| typescript | 7.x | native (Go) compiler |

## Credits

- Original skill content sourced from [antfu/skills](https://github.com/antfu/skills) by [Anthony Fu](https://github.com/antfu) (incl. antfu-design UnoCSS tokens)
- Vue best practices skills from [vuejs-ai](https://github.com/vuejs-ai)
- VueUse skill by [SerKo](https://github.com/serkodev)
- Turborepo skill from official Turborepo documentation
- Web design guidelines from [Vercel Labs](https://github.com/vercel-labs)
- Clean-components rules based on Michael Thiessen's Clean Components Toolkit + toss.tech Core-Adapter pattern
- ARIA patterns based on the [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- `vue-data` / `vue-forms` / `vue-performance` / `vue-a11y` written for this repo against 2026-07 ecosystem versions

## License

MIT — see [LICENSE](LICENSE) and [THIRD_PARTY_LICENSES](THIRD_PARTY_LICENSES).
