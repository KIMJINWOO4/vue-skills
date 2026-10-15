# Vite 7 to 8, and the 8.x minors

Vite 8 replaced esbuild and Rollup with Rolldown (bundler) and Oxc (transformer). Most Rollup plugins and configs keep working because Vite converts the old options. The full list of option renames and breaking changes is in [rolldown-migration](../../build-tooling/references/vite/rolldown-migration.md); this page is the checklist.

## Steps from Vite 7

1. Optional low-risk first step: on Vite 7, alias `"vite": "npm:rolldown-vite@^7"`, run the build and tests, then remove the alias and install `vite@^8`.
2. Rename config keys. Vite auto-converts most of them, but warnings stay until you do:
   - `build.rollupOptions` becomes `build.rolldownOptions`.
   - `esbuild` options become `oxc` options (JSX settings included).
3. Replace removed options:
   - `output.manualChunks` object form is gone and the function form is deprecated. Use Rolldown's `codeSplitting`.
   - `build.commonjsOptions` does nothing now.
   - `resolve.alias[].customResolver` is deprecated; write a small `resolveId` plugin with `enforce: 'pre'`.
   - `import.meta.hot.accept(url)` takes a module id, not a URL.
4. Upgrade framework plugins together: `@vitejs/plugin-vue` 6.x, `vite-plugin-vue-devtools` 8.x, and Vitest 5 (which accepts Vite 6.4 to 8).
5. Compare the production bundle before and after (`vite build` output sizes, or the Rolldown analysis in Vite DevTools).

## What 8.1 to 8.3 added

| Release | Date | Additions |
|---------|------|-----------|
| 8.1 | 2026-06-23 | Experimental bundled dev mode (`experimental.bundledDev: true` or `--experimental-bundle`), experimental chunk import map, direct `.wasm` ESM imports, `caseSensitive` option for `import.meta.glob`, `html.additionalAssetSources`. WebSocket options moved from `server.hmr` to `server.ws` (old keys still synced). |
| 8.2 | 2026-07-30 | New `input` option; bundled dev mode uses client-side HMR. |
| 8.3 | 2026-09-10 | Vite DevTools in the dev server (`devtools: true`, needs `@vitejs/devtools`), Rolldown watch options in `server.watch`, `closeServer` and `closePreviewServer` plugin hooks, warning on named imports from JSON. A top-level `tsconfig` option exists but the docs advise against relying on it. |

Bundled dev mode and Vite DevTools are experimental. Use them to investigate slow dev startup on large apps, not as defaults.

Sources: [Vite 8.1 announcement](https://vite.dev/blog/announcing-vite8-1), [Vite changelog](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md). Configuration reference: [vite-guide](../../build-tooling/references/vite-guide.md).
