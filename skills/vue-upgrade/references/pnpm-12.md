# pnpm 11 to 12

pnpm 12.0.0 was released on 2026-08-26. It is a rewrite in Rust that keeps pnpm 11's commands, settings and lockfile format, so most projects only change the version. As of 2026-10-15, `npm view pnpm dist-tags` shows `latest` at 12.11.2. Sources: [release post](https://pnpm.io/blog/releases/12.0), [v12.0.0 notes](https://github.com/pnpm/pnpm/releases/tag/v12.0.0).

If the project is still on pnpm 10, run the 10 to 11 codemod first (`pnpx codemod run pnpm-v10-to-v11`); it moves settings from `.npmrc` and `package.json#pnpm` into `pnpm-workspace.yaml`. Details: [pnpm best-practices-migration](../../build-tooling/references/pnpm/best-practices-migration.md).

## Steps

1. Pin the new version: `"packageManager": "pnpm@12.11.2"` in `package.json` (Corepack or pnpm's own version switching picks it up).
2. Search CI scripts for removed flags:
   - `pnpm install --resolution-only` now errors. Use `pnpm peers check`.
   - `--frozen-lockfile false` is gone. Use `--no-frozen-lockfile`.
3. Run `pnpm install` once and commit the lockfile. Expect a one-time diff if the graph has cycles (they are now ordered deterministically) or if git dependencies were recorded as SSH URLs.
4. Fix new warnings: unknown keys in `pnpm-workspace.yaml` now warn, and fail with `ERR_PNPM_UNRECOGNIZED_WORKSPACE_SETTINGS` when the project pins its pnpm version.

## Behavior changes

| Change | Impact |
|--------|--------|
| Git dependencies on GitHub, GitLab and Bitbucket resolve to HTTPS | The lockfile never stores SSH URLs. For private repos over SSH, use `git config --global url."git@github.com:".insteadOf https://github.com/`. Run `pnpm update <pkg>` to re-resolve an old `git@` entry. |
| `pnpm add -g yarn` installs Yarn itself | Naming a package manager installs the tool. `yarn@npm:yarn@1.22.22` still installs the npm package. |
| Global `node`, `deno` and `bun` follow the project's pinned version | `globalShims` runs the pinned runtime without a shell hook. |
| `packageImportMethod: auto` tries hardlinks first on Linux | Set `clone` or `clone-or-copy` if you patch files inside `node_modules`. |
| `engineStrict` is stricter | Fails on incompatible engines even under an `optionalDependencies` subtree. |
| pnpmfile `filterLog` hook deprecated | Plan to remove it. |

Configuration reference: [pnpm-guide](../../build-tooling/references/pnpm-guide.md).
