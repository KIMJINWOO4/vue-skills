---
name: build-tooling
description: Unified frontend build tooling guide. Vite 8 (Rolldown bundler / dev server), Vitest 4 (testing), tsdown (library bundling), pnpm 11 (package management), Turborepo (monorepos), TypeScript 7 native compiler. Use when working with vite.config.ts, vitest, tsdown.config.ts, pnpm-workspace.yaml, turbo.json, or tsconfig.
---

# Build Tooling Skill

> Baseline as of 2026-07: Vite 8 (Rolldown default) · Vitest 4 (v5 in beta) · pnpm 11 · tsdown 0.22 · Turborepo 2.10 · TypeScript 7 (native compiler).

## Reference Map

Read the reference for the tool you are working on to load detailed knowledge.

| Tool | Description | Entry point |
|------|-------------|-------------|
| **Vite** | Build config, plugin API, SSR, Rolldown migration | [vite-guide](references/vite-guide.md) → `vite/` |
| **Vitest** | Unit testing, mocking, coverage, test filtering | [vitest-guide](references/vitest-guide.md) → `vitest/` |
| **tsdown** | TS/JS library bundling, DTS generation, tsup migration | [tsdown-guide](references/tsdown-guide.md) → `tsdown/` |
| **pnpm** | Package management, workspaces, catalogs, patches | [pnpm-guide](references/pnpm-guide.md) → `pnpm/` |
| **Turborepo** | Monorepo build system, tasks, caching, CI | [turborepo-guide](references/turborepo-guide.md) → `turborepo/` |
| **TypeScript 7** | Native (Go) compiler, migration from TS 5.x, perf notes | [typescript-7](references/typescript-7.md) |

## 2026 defaults for new projects

- Vite 8: Rolldown is the only bundler — no opt-in, no esbuild/Rollup split. Most Rollup plugins work unchanged.
- Vitest 4 stable; Vitest 5 (beta) tracks Vite 8 — prefer 4.x until 5 stabilizes.
- pnpm 11 with workspace catalogs for version consistency.
- Libraries: tsdown (Rolldown-based) instead of tsup.
- Type-checking: TypeScript 7 (`tsgo`) — ~10x faster; keep 5.x/6.x only if a toolchain dependency requires the JS API.
