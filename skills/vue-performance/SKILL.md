---
name: vue-performance
description: Diagnose and fix Vue 3 performance problems. Profiling workflow (DevTools, render tracking), rendering optimization (shallowRef, v-memo, virtual lists, Vapor Mode), bundle size (code splitting, async components, Rolldown analysis), memory leak hunting. Use when a Vue app is slow, janky, large, or leaking memory — or when reviewing for performance.
---

# Vue Performance Skill

> Baseline 2026-07: Vue 3.5/3.6, Vite 8 (Rolldown). Rule zero: **measure before optimizing** — read [diagnose](references/diagnose.md) first, then jump to the matching fix reference.

## Triage Table

| Symptom | Likely area | Reference |
|---------|------------|-----------|
| Slow first load, big JS download | Bundle | [bundle](references/bundle.md) |
| Slow interaction / janky typing / laggy lists | Rendering | [rendering](references/rendering.md) |
| Tab slows down over time, crashes after long use | Memory leaks | [memory-leaks](references/memory-leaks.md) |
| "It feels slow" (unquantified) | Measure first | [diagnose](references/diagnose.md) |

## Quick wins checklist (apply before deep work)

1. `shallowRef` for large objects/arrays that are replaced, not mutated (API responses).
2. `v-for` with stable `:key`s; computed for filtered lists (never method calls in template).
3. Virtualize lists > ~200 rows (`useVirtualList` / `vue-virtual-scroller`).
4. Route-level code splitting (`() => import(...)`) — free with file-based routing.
5. Heavy below-the-fold widgets → `defineAsyncComponent` (+ Nuxt: lazy hydration).
6. Props stability: don't create fresh objects/arrays/closures inline in hot templates.
7. Watchers: never `deep: true` on large trees when a getter on the specific field works.
8. Vue 3.6+: flip profiler-identified hot components to Vapor Mode (see `vue` skill → vue-36-vapor).

## Anti-rules (do NOT)

- Do not sprinkle `v-memo` everywhere — it's for the rare proven-hot `v-for` case and adds its own comparison cost.
- Do not switch working code to `markRaw`/`shallowReactive` speculatively; each removes reactivity guarantees someone else relies on.
- Do not "optimize" without a before/after number from the profiler or bundle report.
