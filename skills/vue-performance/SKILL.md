---
name: vue-performance
description: Diagnose and fix Vue 3 performance problems. Profiling with Vue DevTools and the browser, render tracking, shallowRef, v-memo, list virtualization, Vapor Mode, bundle size with code splitting and Rolldown analysis, and memory leaks. Use when a Vue app is slow, janky, too large or leaking memory, or when reviewing code for performance.
---

# Vue Performance

Versions checked on 2026-10-15: Vue 3.5 (3.6 RC with Vapor Mode), Vite 8.3 with Rolldown.

Measure before changing anything. Read [diagnose](references/diagnose.md) first, then go to the reference that matches the symptom.

## Triage

| Symptom | Area | Reference |
|---------|------|-----------|
| Slow first load, large JavaScript download | Bundle | [bundle](references/bundle.md) |
| Slow interactions, typing lag, janky lists | Rendering | [rendering](references/rendering.md) |
| Tab gets slower over time or crashes after long use | Memory | [memory-leaks](references/memory-leaks.md) |
| "It feels slow", no numbers yet | Measurement | [diagnose](references/diagnose.md) |

## Quick wins to check first

1. `shallowRef` for large objects and arrays that are replaced rather than mutated, such as API responses.
2. Stable `:key` values in `v-for`, and `computed` for filtered lists instead of method calls in the template.
3. Virtualize lists longer than about 200 rows (`useVirtualList`, `vue-virtual-scroller`).
4. Split code by route; file-based routing does it for free.
5. Load heavy below-the-fold widgets with `defineAsyncComponent`, and use lazy hydration in Nuxt.
6. Keep props stable in hot lists: no new objects, arrays or closures created inline per render.
7. Watch a getter on the field you need instead of `deep: true` on a large tree.
8. On Vue 3.6, move components the profiler flags as hot to Vapor Mode ([vue-36-vapor](../vue/references/vue-36-vapor.md)).

## Tools

- Vue DevTools: component render timings, timeline, Pinia state.
- Browser Performance panel for long tasks and layout work; Memory panel heap snapshots for leaks.
- Vite DevTools (experimental in Vite 8.3, `devtools: true` with `@vitejs/devtools`) for module graph and Rolldown bundle analysis.

## Do not

- Add `v-memo` everywhere. It is for a proven hot `v-for` and has its own comparison cost.
- Switch working code to `markRaw` or `shallowReactive` on a guess; both remove guarantees other code relies on.
- Call something an optimization without a before and after number.
