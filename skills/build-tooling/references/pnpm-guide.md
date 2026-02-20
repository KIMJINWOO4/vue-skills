pnpm is a fast, disk space efficient package manager. It uses a content-addressable store to deduplicate packages across all projects on a machine, saving significant disk space. pnpm enforces strict dependency resolution by default, preventing phantom dependencies. Configuration should preferably be placed in `pnpm-workspace.yaml` for pnpm-specific settings.

**Important:** When working with pnpm projects, agents should check for `pnpm-workspace.yaml` and `.npmrc` files to understand workspace structure and configuration. Always use `--frozen-lockfile` in CI environments.

> The skill is based on pnpm 10.x, generated at 2026-01-28.

## Core

| Topic | Description | Reference |
|-------|-------------|-----------|
| CLI Commands | Install, add, remove, update, run, exec, dlx, and workspace commands | [core-cli](pnpm/core-cli.md) |
| Configuration | pnpm-workspace.yaml, .npmrc settings, and package.json fields | [core-config](pnpm/core-config.md) |
| Workspaces | Monorepo support with filtering, workspace protocol, and shared lockfile | [core-workspaces](pnpm/core-workspaces.md) |
| Store | Content-addressable storage, hard links, and disk efficiency | [core-store](pnpm/core-store.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Catalogs | Centralized dependency version management for workspaces | [features-catalogs](pnpm/features-catalogs.md) |
| Overrides | Force specific versions of dependencies including transitive | [features-overrides](pnpm/features-overrides.md) |
| Patches | Modify third-party packages with custom fixes | [features-patches](pnpm/features-patches.md) |
| Aliases | Install packages under custom names using npm: protocol | [features-aliases](pnpm/features-aliases.md) |
| Hooks | Customize resolution with .pnpmfile.cjs hooks | [features-hooks](pnpm/features-hooks.md) |
| Peer Dependencies | Auto-install, strict mode, and dependency rules | [features-peer-deps](pnpm/features-peer-deps.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| CI/CD Setup | GitHub Actions, GitLab CI, Docker, and caching strategies | [best-practices-ci](pnpm/best-practices-ci.md) |
| Migration | Migrating from npm/Yarn, handling phantom deps, monorepo migration | [best-practices-migration](pnpm/best-practices-migration.md) |
| Performance | Install optimizations, store caching, workspace parallelization | [best-practices-performance](pnpm/best-practices-performance.md) |