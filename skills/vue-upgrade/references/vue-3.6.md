# Vue 3.5 to 3.6

Vue 3.6 is a release candidate (3.6.0-rc.11 on 2026-10-10). The stable line is 3.5.x and no 3.6 release date has been announced. Upgrade production apps only when the user asks for the RC or after 3.6 is stable.

What 3.6 brings and how Vapor Mode works: [vue-36-vapor](../../vue/references/vue-36-vapor.md).

## Trying the RC in an existing app

1. Install the RC and the matching compiler packages together:

   ```bash
   pnpm add vue@rc
   pnpm add -D @vitejs/plugin-vue@latest vue-tsc@latest
   ```

   Make sure every `@vue/*` package resolves to the same RC version (`pnpm why @vue/runtime-core`). Mixed versions cause confusing runtime errors.
2. Run the app with no other changes. The reactivity engine rewrite should be invisible to correct code; failures usually point to code that relied on undocumented timing. Run the full test suite.
3. Only then convert components to Vapor, one region of the app at a time, behind `vaporInteropPlugin`.

## RC-period changes that affect early adopters

- **rc.2**: Vapor event delegation became opt-in through `.delegate`, and `compilerOptions.eventDelegation` was removed. Remove that option from Vite or Nuxt config.
- **rc.11**: a Vapor SFC with only a plain `<script>` (no `<script setup>`) is a compile error. New warnings when `v-memo` or `@vue:*` element hooks are ignored in Vapor components, and when a template reads global properties.

## Nuxt

Nuxt 4.6 supports Vapor interop with `vue: { vapor: true }` in `nuxt.config.ts`, which requires `vue@^3.6.0-rc.2`.

## Rolling back

Pin `vue@3.5.44` (or the latest 3.5 patch), remove `vapor` attributes and `vaporInteropPlugin`, reinstall, and rebuild. Code that does not use Vapor or other 3.6-only APIs runs on 3.5.
