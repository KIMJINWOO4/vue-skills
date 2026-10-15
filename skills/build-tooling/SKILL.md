---
name: build-tooling
description: Frontend build and test tooling for Vue projects. Vite 8 with Rolldown, Vitest 5, tsdown for libraries, pnpm 12 workspaces and catalogs, Turborepo, and TypeScript 7 with vue-tsc. Use when editing vite.config.ts, vitest.config.ts, tsdown.config.ts, pnpm-workspace.yaml, turbo.json or tsconfig, or when builds, tests or installs fail.
---

# Build Tooling

Versions checked on 2026-10-15: Vite 8.3, Vitest 5.0, tsdown 0.23, pnpm 12.11, Turborepo 2.11, TypeScript 7.0 (Vue type-checking stays on TypeScript 6, see below).

## Reference map

| Tool | Start here |
|------|-----------|
| Vite: config, features, plugin API, SSR, environment API, Rolldown migration | [vite-guide](references/vite-guide.md) |
| Vitest: config, test API, mocking, coverage, projects, browser mode | [vitest-guide](references/vitest-guide.md) |
| tsdown: library bundling, declarations, exports, migrating from tsup | [tsdown-guide](references/tsdown-guide.md) |
| pnpm: CLI, `pnpm-workspace.yaml` settings, catalogs, overrides, patches, supply-chain settings | [pnpm-guide](references/pnpm-guide.md) |
| Turborepo: tasks, caching, filtering, CI | [turborepo-guide](references/turborepo-guide.md) |
| TypeScript 7 and vue-tsc | [typescript-7](references/typescript-7.md) |

## Defaults for a new Vue project

- Vite 8. Rolldown is the only bundler and Oxc replaces esbuild; most Rollup plugins work unchanged.
- Vitest 5 with Node 22.12 or newer. Remember `clearMocks` is on by default.
- pnpm 12 with settings in `pnpm-workspace.yaml` (camelCase keys); `.npmrc` holds only registry and auth settings. Use catalogs for shared versions.
- Libraries build with tsdown, not tsup.
- Type-check `.vue` files with `vue-tsc` on TypeScript 6 through the `@typescript/typescript6` alias. TypeScript 7 is fine for packages without `.vue` files.

## Version-matched docs first

When the installed package ships its own docs, prefer them over these references because they match the exact version. Turborepo does this: read `node_modules/turbo/docs/README.md` first (resolve the path with `node -p "require.resolve('turbo/package.json')"` in pnpm workspaces). The Turborepo references here are the last offline snapshot, kept for machines without the package installed.

Upgrade steps for each tool are in the `vue-upgrade` skill.
