---
name: vue
description: Unified Vue 3 ecosystem guide. Composition API, Vue 3.6 Vapor Mode, Pinia state management, Vue Router 5, VueUse composables, testing. Use when working with Vue SFCs, .vue files, defineProps/defineEmits/defineModel, watchers, Transition/Teleport/Suspense/KeepAlive, state management, or routing. MUST be used for Vue.js tasks.
---

# Vue Ecosystem Skill

> Baseline: Vue 3.5 stable / Vue 3.6 (Vapor Mode) · Vue Router 5 · Pinia 3 · VueUse 14 — as of 2026-07.
> Always use Composition API + `<script setup lang="ts">`.

## Core Principles

- TypeScript first: `<script setup lang="ts">`
- Prefer `shallowRef` over `ref` for large or performance-critical state
- Composition API only — avoid Options API in new code
- Avoid Reactive Props Destructure unless the whole team understands its compile-time semantics
- For new perf-critical components, consider Vapor Mode (`<script setup vapor>`) — see the 3.6 reference

## Reference Map

Read the reference for the topic you are working on to load detailed knowledge.

| Area | Description | Path |
|------|-------------|------|
| **Vue Core** | Script Setup macros, reactivity, lifecycle | [script-setup-macros](references/script-setup-macros.md), [core-new-apis](references/core-new-apis.md) |
| **Vue 3.6 / Vapor** | Vapor Mode, alien-signals reactivity, interop, migration readiness | [vue-36-vapor](references/vue-36-vapor.md) |
| **Built-in Components** | Transition, Teleport, Suspense, KeepAlive | [advanced-patterns](references/advanced-patterns.md) |
| **Best Practices** | Vue 3 gotchas, performance, TS patterns (180+ guides) | [best-practices-index](references/best-practices-index.md) → `best-practices/` |
| **Pinia** | State management, stores, plugins, SSR | [pinia-guide](references/pinia-guide.md) → `pinia/` |
| **Router** | Vue Router 5, file-based routing, navigation guards | [router-guide](references/router-guide.md) → `router/` |
| **Testing** | Vitest + Vue Test Utils, E2E | [testing-guide](references/testing-guide.md) → `testing/` |
| **VueUse** | 200+ composable function map (v14) | [vueuse-guide](references/vueuse-guide.md) → `vueuse/` |

Related skills: `vue-data` (server-state & data fetching), `vue-forms` (forms & validation), `vue-performance` (profiling & optimization), `vue-a11y` (accessibility).
