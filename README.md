# Skills Package

A curated, consolidated collection of [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skills for the Vue.js / frontend ecosystem — restructured using **Progressive Disclosure** to minimize context window overhead.

## The Problem: Skill Explosion

Claude loads every skill's `name` and `description` into the system prompt at startup. If you install skills individually from [antfu/skills](https://github.com/antfu/skills) and other sources, you end up with **17 separate skills** — 17 descriptions permanently occupying your context window:

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
├── frontend-design/            # ─┐  These 2 are both "design"
├── web-design-guidelines/      # ─┘
├── nuxt/
├── vitepress/
├── antfu/
└── find-skills/
```

This is the **Class Explosion anti-pattern** applied to skills. It's like writing:

```ts
class NamingValidator { ... }
class TypeValidator { ... }
class ComplexityValidator { ... }
class SecurityValidator { ... }
// ... 15 more classes, each doing one small thing
```

## The Solution: Progressive Disclosure

Recall the **Law of Demeter**: *"Don't talk to strangers."* An object should only know about its immediate collaborators.

Applied to skill design: **SKILL.md provides the entry point only; detailed knowledge is delegated to `references/`.**

```
.claude/skills/
└── code-review/
    ├── SKILL.md              # "Review my code" → only this is loaded
    ├── references/           # loaded on demand
    │   ├── naming-rules.md   # "What are the naming conventions?" → loaded then
    │   ├── security-checklist.md
    │   └── performance-guide.md
    └── scripts/
        └── lint-check.sh
```

The agent reads `SKILL.md` first (thin entry point), then drills into specific `references/` files only when the task requires that knowledge. This keeps the context window lean while preserving access to deep expertise.

## Architecture: 17 → 7 Skills (60% Reduction)

| Consolidated Skill | Original Skills (count) | Reference Files |
|---|---|---|
| **vue/** | vue, vue-best-practices, vue-router-best-practices, vue-testing-best-practices, vueuse-functions, pinia (6) | 482 |
| **build-tooling/** | vite, vitest, tsdown, pnpm, turborepo (5) | 97 |
| **design/** | frontend-design, web-design-guidelines (2) | 3 |
| **nuxt/** | nuxt (kept as-is) | 20 |
| **vitepress/** | vitepress (kept as-is) | 16 |
| **antfu/** | antfu (kept as-is) | 6 |
| **find-skills/** | find-skills (kept as-is) | 1 |

**Total: 625 reference files across 7 skills.**

## Directory Structure

```
skills/
├── vue/                              # Vue 3 ecosystem (merged 6 skills)
│   ├── SKILL.md                      # Thin entry point
│   └── references/
│       ├── script-setup-macros.md    # Vue core APIs
│       ├── core-new-apis.md
│       ├── advanced-patterns.md
│       ├── best-practices-index.md   # Index → best-practices/*.md
│       ├── best-practices/           # 180 gotcha guides
│       ├── pinia-guide.md            # Index → pinia/*.md
│       ├── pinia/                    # 9 store management guides
│       ├── router-guide.md           # Index → router/*.md
│       ├── router/                   # 8 navigation pattern guides
│       ├── testing-guide.md          # Index → testing/*.md
│       ├── testing/                  # 11 testing guides
│       ├── vueuse-guide.md           # Index → vueuse/*.md
│       └── vueuse/                   # 264 composable function guides
│
├── build-tooling/                    # Build tools (merged 5 skills)
│   ├── SKILL.md                      # Thin entry point
│   └── references/
│       ├── vite-guide.md → vite/
│       ├── vitest-guide.md → vitest/
│       ├── tsdown-guide.md → tsdown/
│       ├── pnpm-guide.md → pnpm/
│       └── turborepo-guide.md → turborepo/
│
├── design/                           # Frontend design (merged 2 skills)
│   ├── SKILL.md                      # Thin entry point
│   └── references/
│       ├── frontend-aesthetics.md
│       └── web-guidelines.md
│
├── nuxt/                             # Nuxt framework (kept as-is)
│   ├── SKILL.md
│   └── references/
│
├── vitepress/                        # VitePress (kept as-is)
│   ├── SKILL.md
│   └── references/
│
├── antfu/                            # Anthony Fu conventions (kept as-is)
│   ├── SKILL.md
│   └── references/
│
└── find-skills/                      # Skill discovery (kept as-is)
    └── SKILL.md
```

## How It Works

### Two-Layer Loading

1. **Layer 1 — SKILL.md (always loaded):** A thin description that tells the agent *when* to activate and *where* to look. This is the only thing that costs context at startup.

2. **Layer 2 — references/ (loaded on demand):** Guide files (`*-guide.md`) serve as intermediate indexes. Individual reference files contain the deep knowledge. The agent reads these only when the task requires it.

```
User: "Add a Pinia store for user auth"

Agent reads: vue/SKILL.md           → sees "Pinia" → references/pinia-guide.md
Agent reads: references/pinia-guide.md  → sees store patterns → pinia/core-stores.md
Agent reads: pinia/core-stores.md       → has the exact knowledge needed
```

### Why Not Just One Giant Skill?

A single monolithic skill would require loading everything into context every time. The guide-file pattern gives the agent a **table of contents** to navigate selectively — like the difference between reading an entire textbook versus checking the index first.

## Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and configured
- A project directory where you want to use Claude Code

Claude Code automatically discovers skills placed in your project's `.claude/skills/` directory. Each subdirectory with a `SKILL.md` file becomes an available skill.

## Installation

Copy the `skills/` directory into your project's `.claude/skills/`:

```bash
# Clone this repo
git clone https://github.com/KIMJINWOO4/skills_package.git

# Copy all skills to your project
cp -r skills_package/skills/ your-project/.claude/skills/
```

Or cherry-pick individual skills:

```bash
# Just Vue ecosystem
cp -r skills_package/skills/vue/ your-project/.claude/skills/vue/

# Just build tooling
cp -r skills_package/skills/build-tooling/ your-project/.claude/skills/build-tooling/

# Just design guidelines
cp -r skills_package/skills/design/ your-project/.claude/skills/design/
```

### Verify Installation

After copying, your project structure should look like:

```
your-project/
├── .claude/
│   └── skills/
│       ├── vue/
│       │   ├── SKILL.md
│       │   └── references/
│       ├── build-tooling/
│       │   ├── SKILL.md
│       │   └── references/
│       ├── design/
│       │   ├── SKILL.md
│       │   └── references/
│       └── ...
├── src/
└── package.json
```

Run `claude` in your project directory. The skills will appear in the system prompt automatically. You can verify by asking Claude: *"What skills do you have available?"*

## Usage

### How Skills Activate

Skills activate **automatically** based on your prompts. You don't need to invoke them manually. Claude matches your request against each skill's `description` field in `SKILL.md` and loads the relevant skill.

| You say... | Skill activated | What happens |
|---|---|---|
| "Create a Pinia store for auth" | `vue` | Reads `SKILL.md` → `pinia-guide.md` → `pinia/core-stores.md` |
| "Configure Vite for SSR" | `build-tooling` | Reads `SKILL.md` → `vite-guide.md` → `vite/ssr.md` |
| "Set up Vitest for my project" | `build-tooling` | Reads `SKILL.md` → `vitest-guide.md` → `vitest/configuration.md` |
| "Add a route guard" | `vue` | Reads `SKILL.md` → `router-guide.md` → `router/navigation-guards.md` |
| "Review my UI for accessibility" | `design` | Reads `SKILL.md` → `web-guidelines.md` → fetches latest rules |
| "Use VueUse's useStorage" | `vue` | Reads `SKILL.md` → `vueuse-guide.md` → `vueuse/use-storage.md` |
| "Set up Turborepo caching" | `build-tooling` | Reads `SKILL.md` → `turborepo-guide.md` → `turborepo/caching/RULE.md` |
| "Build a landing page" | `design` | Reads `SKILL.md` → `frontend-aesthetics.md` |

### Slash Command Usage

Some skills (like `vue`, `build-tooling`, `design`) also register as slash commands. You can invoke them explicitly in the Claude Code CLI:

```
/vue          # Activate Vue ecosystem skill
/build-tooling # Activate build tooling skill
/design       # Activate design skill
```

### Example Workflows

**1. Adding a Vue component with best practices:**
```
You: "Create a user profile component with proper TypeScript types"

Claude reads:
  → vue/SKILL.md (entry point, sees Composition API rules)
  → references/script-setup-macros.md (defineProps, defineEmits patterns)
  → references/best-practices/... (relevant gotcha guides)
```

**2. Setting up a monorepo build pipeline:**
```
You: "Configure Turborepo with pnpm workspaces for our monorepo"

Claude reads:
  → build-tooling/SKILL.md (entry point)
  → references/turborepo-guide.md (task config, anti-patterns)
  → references/pnpm-guide.md (workspace setup)
  → turborepo/configuration/tasks.md (detailed task config)
  → pnpm/core-workspaces.md (workspace protocol)
```

**3. Testing Vue components:**
```
You: "Write tests for my LoginForm component"

Claude reads:
  → vue/SKILL.md (entry point)
  → references/testing-guide.md (Vitest + Vue Test Utils overview)
  → testing/component-testing.md (specific patterns)
```

## Customization

### Adding Your Own References

You can extend any skill by adding files to its `references/` directory:

```
.claude/skills/vue/references/
├── ...existing files...
└── my-custom-patterns.md    # Your team's conventions
```

Then update the guide file (e.g., `SKILL.md` or the relevant `*-guide.md`) to reference your new file so the agent knows it exists.

### Creating a New Consolidated Skill

Follow the same pattern:

```
.claude/skills/my-skill/
├── SKILL.md                 # Thin entry point with name + description
└── references/
    ├── topic-a-guide.md     # Intermediate index
    ├── topic-a/             # Detailed references
    │   ├── subtopic-1.md
    │   └── subtopic-2.md
    └── topic-b-guide.md
```

**Key rules for SKILL.md:**
- Keep it under ~30 lines — this is always loaded into context
- Include a YAML frontmatter with `name` and `description`
- The `description` should list keywords that trigger activation
- Use a reference table pointing to guide files

## Credits

- Original skill content sourced from [antfu/skills](https://github.com/antfu/skills) by [Anthony Fu](https://github.com/antfu)
- Vue best practices skills from [vuejs-ai](https://github.com/vuejs-ai)
- VueUse skill by [SerKo](https://github.com/serkodev)
- Turborepo skill from official Turborepo documentation
- Frontend design skill from Claude example skills
- Web design guidelines from [Vercel Labs](https://github.com/vercel-labs)

## License

MIT
