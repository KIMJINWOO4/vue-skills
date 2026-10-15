# Current Versions and Floors

Checked on 2026-10-15 against the npm registry (`latest` and pre-release tags) and the release notes linked in each guide.

| Package | Stable (`latest`) | Pre-release | Floors and peers worth knowing |
|---------|-------------------|-------------|--------------------------------|
| vue | 3.5.44 | 3.6.0-rc.11 (`rc`) | 3.6 is not stable yet; no date announced |
| vue-router | 5.4.0 | | Accepts Pinia 4 since 5.2 |
| pinia | 4.1.0 | | ESM only. Peer `vue ^3.5.11`, required peer `@vue/devtools-api ^8.2.1`, optional `typescript >=5.6` |
| @pinia/nuxt | 1.0.3 | | Needs `pinia ^4.1.0` and `@nuxt/kit ^4.6.0` |
| @pinia/colada | 1.4.8 | | |
| @vueuse/core | 15.0.0 | | Node 22+. Peer `vue ^3.5.0` |
| vite | 8.3.4 | | Rolldown is the only bundler |
| vitest | 5.0.4 | | Node `^22.12.0 \|\| ^24 \|\| >=26`. `vite >=6.4` is a required peer |
| nuxt | 4.6.1 | Nuxt 5 nightly (`nuxt-nightly@5x`) | 4.6 needs Node `^22.22.3 \|\| ^24.15.0 \|\| >=26`. Nuxt 3 reached end of life on 2026-07-31 |
| nitro | 3.0.260903-beta | | v3 is still beta; Nuxt 4 runs on `nitropack` 2.x |
| vitepress | 1.6.4 | 2.0.0-alpha.20 (`next`) | |
| typescript | 7.0.2 | 7.1 dev builds | vue-tsc still needs the TypeScript 6 JS API |
| vue-tsc | 3.3.13 | | Run it against TS 6 (see the TypeScript 7 guide) |
| pnpm | 12.11.2 | 12.13.0 (`next-12`) | Rust rewrite, same lockfile format as 11 |
| unocss | 66.11.0 | | |
| reka-ui | 2.11.0 | | |
| @nuxt/ui | 4.11.3 | | |
| vee-validate / zod | 4.15.1 / 4.6.7 | | |
| @playwright/test | 1.64.1 | | |

## Node.js

Node 22 is the practical floor for a current Vue toolchain: VueUse 15, Vitest 5, Nuxt 4.6, tsdown and skills-npm all require it. Node 24 LTS is the safe default for new projects.

## How to refresh this table

```bash
nlx fast-npm-meta version vue vue-router pinia vite vitest nuxt typescript pnpm
npm view vue dist-tags
```
