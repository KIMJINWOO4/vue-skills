---
name: vue-upgrade
description: Upgrade Vue projects across major versions. Breaking changes and step-by-step migration for Vue 2 to 3, Vue 3.6 and Vapor, Pinia 4, Vue Router 5, VueUse 15, Vite 8, Vitest 5, Nuxt 4.x and Nuxt 5 prep, pnpm 12 and TypeScript 7 with vue-tsc. Use when bumping dependencies, reading a changelog, fixing errors after an upgrade, or planning a migration.
---

# Vue Upgrades

Versions and floors were checked against npm and release notes on 2026-10-15. Start with [versions](references/versions.md) to see what is current and what each package needs.

## Process

1. **Inventory.** Read `package.json` and the lockfile. Write down the current and target major for each package. `nlx fast-npm-meta version <pkg>` or `npm view <pkg> dist-tags` shows what is published.
2. **Check the floors.** Node, Vue and TypeScript minimums block upgrades more often than API changes do. The table in [versions](references/versions.md) lists them.
3. **One major at a time.** Upgrade a single package (plus its companion packages), run the checks, commit, then move on. Suggested order: package manager, Node, TypeScript, Vite, Vitest, Vue, Router and Pinia, VueUse, then Nuxt.
4. **Read the guide for that package** below, and apply the breaking changes before fixing anything else.
5. **Verify.** Type-check, run unit and end-to-end tests, build for production, and click through the main flows. A clean `npm install` is not proof.

## Guides

| Upgrade | Guide |
|---------|-------|
| Vue 2 to Vue 3 | [vue-2-to-3](references/vue-2-to-3.md) |
| Vue 3.5 to 3.6 RC, Vapor Mode | [vue-3.6](references/vue-3.6.md) |
| Pinia 3 to 4 | [pinia-4](references/pinia-4.md) |
| Vue Router 4 to 5, unplugin-vue-router to core | [router-v5](../vue/references/router-v5.md) in the `vue` skill |
| VueUse 14 to 15 | [vueuse-15](references/vueuse-15.md) |
| Vite 7 to 8, 8.x minors | [vite-8](references/vite-8.md) |
| Vitest 4 to 5 | [vitest-5](references/vitest-5.md) |
| Nuxt 3 to 4, 4.5 and 4.6, getting ready for 5 | [nuxt](references/nuxt.md) |
| pnpm 11 to 12 | [pnpm-12](references/pnpm-12.md) |
| TypeScript 6 to 7, and why Vue projects keep TS 6 for vue-tsc | [typescript-7](../build-tooling/references/typescript-7.md) in the `build-tooling` skill |

## Rules

- Do not upgrade to a pre-release (`rc`, `beta`, `nightly`) unless the user asks for it.
- Codemods first, hand edits second. Use the official migration tooling where it exists (`npx nuxt upgrade`, `@vue/compat`), and review its diff.
- Keep the lockfile change in the same commit as the `package.json` change.
- If a peer dependency warning appears, resolve it. Pinia 4 and Vitest 5 both turned optional packages into required peers.
