# TypeScript 7 and Vue Projects

TypeScript 7.0 went GA on 2026-07-08. It is the Go port of the compiler (previously previewed as `tsgo` and `@typescript/native-preview`): much faster type-checking and a native language server, with the same type-checking behavior as TypeScript 6. Source: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).

## The catch for Vue

TypeScript 7.0 does not ship the JavaScript compiler API that Volar is built on. As of 2026-10-15, `vue-tsc`, the Vue language server and the tsserver plugin **still require TypeScript 6**. The TypeScript team names Vue, MDX, Astro and Svelte as workflows that cannot move yet, and recommends keeping TypeScript 6 available through an npm alias. Sources: [vuejs/language-tools#5381](https://github.com/vuejs/language-tools/issues/5381), [discussion #6121](https://github.com/vuejs/language-tools/discussions/6121).

Running `vue-tsc` 3.3.x against `typescript@7` fails with an exports error about `./lib/tsc`. That error means "TypeScript 7 is installed where vue-tsc expects 6", not a broken install.

## Recommended setup for a Vue project today

```json
{
  "devDependencies": {
    "typescript": "npm:@typescript/typescript6@^6.0.2",
    "vue-tsc": "^3.3.13"
  },
  "scripts": {
    "typecheck": "vue-tsc --noEmit"
  }
}
```

The alias keeps the `typescript` package name that `vue-tsc` and editors resolve, while pinning the version to 6.

Optional speedup for large repos: also install the native compiler for `.ts`-only packages (libraries, server code, scripts) and run it next to `vue-tsc`. Keep `vue-tsc` as the check that covers `.vue` files.

## What is coming

- Real TypeScript 7 support in Vue tooling waits for the API planned for TypeScript 7.1. The Vue language tools team is building on `typescript-native-bridge` and expects roughly 2 to 3 times faster checks, not the 10 times seen in plain TypeScript projects.
- Community projects (golar, vue-tsgo) experiment with native checking of Vue files. Treat them as experiments.
- Check `vue-tsc` release notes before removing the TypeScript 6 alias.

## Non-Vue packages in the same monorepo

Packages without `.vue` files can move to TypeScript 7 now:

1. Upgrade to the latest 6.x and clear its deprecation warnings.
2. Install `typescript@^7` in that package and run `tsc -b`. Project references with native parallelism give the largest gains in monorepos.
3. Tools that import the compiler API (`import ts from 'typescript'`, custom transformers, some lint rules) need the TypeScript 6 package until they support 7.
