# tsdown - The Elegant Library Bundler

Blazing-fast bundler for TypeScript/JavaScript libraries powered by Rolldown and Oxc.

## When to Use

- Building TypeScript/JavaScript libraries for npm
- Generating TypeScript declaration files (.d.ts)
- Bundling for multiple formats (ESM, CJS, IIFE, UMD)
- Optimizing bundles with tree shaking and minification
- Migrating from tsup with minimal changes
- Building React, Vue, Solid, or Svelte component libraries

## Quick Start

```bash
pnpm add -D tsdown
npx tsdown
npx tsdown --config tsdown.config.ts
npx tsdown --watch
npx tsdown-migrate
```

## Basic Configuration

```ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
})
```

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Getting Started | Installation, first bundle, CLI basics | [guide-getting-started](tsdown/guide-getting-started.md) |
| Configuration File | Config file formats, multiple configs, workspace | [option-config-file](tsdown/option-config-file.md) |
| CLI Reference | All CLI commands and options | [reference-cli](tsdown/reference-cli.md) |
| Migrate from tsup | Migration guide and compatibility notes | [guide-migrate-from-tsup](tsdown/guide-migrate-from-tsup.md) |
| Plugins | Rolldown, Rollup, Unplugin support | [advanced-plugins](tsdown/advanced-plugins.md) |
| Hooks | Lifecycle hooks for custom logic | [advanced-hooks](tsdown/advanced-hooks.md) |
| Programmatic API | Build from Node.js scripts | [advanced-programmatic](tsdown/advanced-programmatic.md) |
| Rolldown Options | Pass options directly to Rolldown | [advanced-rolldown-options](tsdown/advanced-rolldown-options.md) |
| CI Environment | CI detection, `'ci-only'` / `'local-only'` values | [advanced-ci](tsdown/advanced-ci.md) |

## Build Options

| Option | Usage | Reference |
|--------|-------|-----------|
| Entry points | `entry: ['src/*.ts', '!**/*.test.ts']` | [option-entry](tsdown/option-entry.md) |
| Output formats | `format: ['esm', 'cjs', 'iife', 'umd']` | [option-output-format](tsdown/option-output-format.md) |
| Output directory | `outDir: 'dist'`, `outExtensions` | [option-output-directory](tsdown/option-output-directory.md) |
| Type declarations | `dts: true`, `dts: { sourcemap, compilerOptions, vue }` | [option-dts](tsdown/option-dts.md) |
| Target environment | `target: 'es2020'`, `target: 'esnext'` | [option-target](tsdown/option-target.md) |
| Platform | `platform: 'node'`, `platform: 'browser'` | [option-platform](tsdown/option-platform.md) |
| Tree shaking | `treeshake: true`, custom options | [option-tree-shaking](tsdown/option-tree-shaking.md) |
| Minification | `minify: true`, `minify: 'dce-only'` | [option-minification](tsdown/option-minification.md) |
| Source maps | `sourcemap: true`, `'inline'`, `'hidden'` | [option-sourcemap](tsdown/option-sourcemap.md) |
| Watch mode | `watch: true`, watch options | [option-watch-mode](tsdown/option-watch-mode.md) |
| Cleaning | `clean: true`, clean patterns | [option-cleaning](tsdown/option-cleaning.md) |

## Dependency Handling

| Feature | Usage | Reference |
|---------|-------|-----------|
| External deps | `external: ['react', /^@myorg\//]` | [option-dependencies](tsdown/option-dependencies.md) |
| Inline deps | `noExternal: ['dep-to-bundle']` | [option-dependencies](tsdown/option-dependencies.md) |
| Auto external | Automatic peer/dependency externalization | [option-dependencies](tsdown/option-dependencies.md) |

## Output Enhancement

| Feature | Usage | Reference |
|---------|-------|-----------|
| Shims | `shims: true` - Add ESM/CJS compatibility | [option-shims](tsdown/option-shims.md) |
| Package exports | `exports: true` - Auto-generate exports field | [option-package-exports](tsdown/option-package-exports.md) |
| Package validation | `publint: true`, `attw: true` - Validate package | [option-lint](tsdown/option-lint.md) |
| Unbundle mode | `unbundle: true` - Preserve directory structure | [option-unbundle](tsdown/option-unbundle.md) |

## Framework & Runtime Support

| Framework | Guide | Reference |
|-----------|-------|-----------|
| React | JSX transform, Fast Refresh | [recipe-react](tsdown/recipe-react.md) |
| Vue | SFC support, JSX | [recipe-vue](tsdown/recipe-vue.md) |
| WASM | WebAssembly modules via `rolldown-plugin-wasm` | [recipe-wasm](tsdown/recipe-wasm.md) |