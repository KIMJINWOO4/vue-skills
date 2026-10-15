<!-- Synced from onmax/nuxt-skills@46aaca0:skills/nuxt-modules/SKILL.md by scripts/sync.mjs. Edit sources.json, not this file. -->

# Nuxt Module Development

Guide for creating Nuxt modules that extend framework functionality.

**Related skills:** `nuxt` (basics), `vue` (runtime patterns)

## Quick Start

```bash
npx nuxi init -t module my-module
cd my-module && npm install
npm run dev        # Start playground
npm run dev:build  # Build in watch mode
npm run test       # Run tests
```

## Available Guidance

- **[references/development.md](modules/development.md)** - Module anatomy, defineNuxtModule, Kit utilities, hooks
- **[references/testing-and-publishing.md](modules/testing-and-publishing.md)** - E2E testing, best practices, releasing, publishing
- **[references/ci-workflows.md](modules/ci-workflows.md)** - Copy-paste CI/CD workflow templates

## Loading Files

**Consider loading these reference files based on your task:**

- [ ] [references/development.md](modules/development.md) - if building module features, using defineNuxtModule, or working with Kit utilities
- [ ] [references/testing-and-publishing.md](modules/testing-and-publishing.md) - if writing E2E tests, publishing to npm, or following best practices
- [ ] [references/ci-workflows.md](modules/ci-workflows.md) - if setting up CI/CD workflows for your module

**DO NOT load all files at once.** Load only what's relevant to your current task.

## Module Types

| Type      | Location         | Use Case                         |
| --------- | ---------------- | -------------------------------- |
| Published | npm package      | `@nuxtjs/`, `nuxt-` distribution |
| Local     | `modules/` dir   | Project-specific extensions      |
| Inline    | `nuxt.config.ts` | Simple one-off hooks             |

## Project Structure

```
my-module/
├── src/
│   ├── module.ts           # Entry point
│   └── runtime/            # Injected into user's app
│       ├── components/
│       ├── composables/
│       ├── plugins/
│       └── server/
├── playground/             # Dev testing
└── test/fixtures/          # E2E tests
```

## Resources

- [Module Guide](https://nuxt.com/docs/guide/going-further/modules)
- [Nuxt Kit](https://nuxt.com/docs/api/kit)
- [Module Starter](https://github.com/nuxt/starter/tree/module)
