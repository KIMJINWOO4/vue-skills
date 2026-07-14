# Rendering Performance

## Reactivity: right-size it

```ts
// ✅ Large replaced-not-mutated data (API responses, table rows)
const rows = shallowRef<Row[]>([])
rows.value = await fetchRows()          // replacement triggers
rows.value[0].name = 'x'                // ❌ silently non-reactive — that's the deal

// ✅ Never-changing heavy objects inside reactive state (chart instances, editor instances, class instances)
state.chart = markRaw(new Chart(...))

// ✅ Derived data: computed, never a watcher writing another ref
const filtered = computed(() => rows.value.filter(r => r.active))
```

- `triggerRef(rows)` after an intentional in-place mutation of a `shallowRef`.
- Watchers on big trees: watch a **getter for the narrow field**, not the object with `deep: true`. `deep: <number>` (Vue 3.5+) caps traversal depth when you truly need partial depth.

## Props stability

A child re-renders when its props *change identity*. Inline literals defeat this:

```vue
<!-- ❌ new object every parent render -->
<Item v-for="i in items" :key="i.id" :style-cfg="{ color: 'red' }" :on-pick="() => pick(i)" />

<!-- ✅ hoisted/stable -->
<Item v-for="i in items" :key="i.id" :style-cfg="STYLE_CFG" @pick="pick" />
```

Same for `active-id` patterns: pass `:active="item.id === activeId"` (boolean flips for 2 rows) instead of `:active-id="activeId"` (all rows re-render).

## Lists

- `:key` must be stable identity (id), never index, never `Math.random()`.
- Filter/sort in a `computed`; method calls in templates run every render and break caching.
- **> ~200 rows → virtualize**: `useVirtualList` (VueUse) for simple fixed-size cases, `vue-virtual-scroller`/`@tanstack/vue-virtual` for dynamic heights.
- Avoid a component-per-cell in huge tables — component instances have overhead; plain elements inside the row component render faster (measure first; this trades maintainability).

## Targeted directives

```vue
<!-- render once, never update -->
<header v-once>{{ appTitle }}</header>

<!-- skip re-render unless listed values change (rare, proven-hot v-for only) -->
<Row v-for="row in rows" :key="row.id" v-memo="[row.id === selectedId]" :row="row" />
```

`v-show` vs `v-if`: toggle-often → `v-show` (keeps DOM); rarely-shown/expensive subtree → `v-if` (mounts lazily).

## Defer & split work

```ts
// Below-the-fold / heavy widgets: load on demand
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'))
```

- Pair with `<Suspense>` or a loading component option.
- Modal/dialog content: `v-if` on open, async component inside — pays neither bundle nor mount cost until first open.
- Expensive non-visual computation on interaction: wrap state writes in `requestAnimationFrame` / `scheduler.yield()` chunks so input stays responsive.
- `<KeepAlive :max="N">` caches expensive remounts (tabs) — bounded, or it becomes a memory problem.

## Vapor Mode (Vue 3.6+) as the big lever

When a component is *structurally* hot (large dashboards, editors, 60fps updates) and micro-optimizations plateau, compile it to Vapor:

```vue
<script setup lang="ts" vapor>
```

No VDOM diffing at all — see `vue` skill → `vue-36-vapor` for constraints/interop. Prefer this over heroic `v-memo` engineering once on 3.6.

## Animation

- Animate `transform`/`opacity` only (compositor); never `top/left/width/height` in lists.
- `<TransitionGroup>` with many items: FLIP move animations are O(n) layout reads — cap animated list sizes or disable `move` for bulk updates.
