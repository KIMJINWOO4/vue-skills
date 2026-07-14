# Memory Leaks in Vue Apps

Vue cleans up its own reactivity graph on unmount. Leaks come from what *you* attach beyond the component's lifetime.

## The usual suspects

### 1. Global listeners / observers without cleanup

```ts
// ❌ leaks the handler (and everything it closes over) forever
onMounted(() => window.addEventListener('resize', onResize))

// ✅ symmetric cleanup
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))

// ✅✅ better: VueUse — auto-cleans on scope dispose
useEventListener(window, 'resize', onResize)
```

Same for `setInterval`, `IntersectionObserver`/`ResizeObserver`/`MutationObserver` (`.disconnect()`), WebSocket/SSE (`.close()`), BroadcastChannel, third-party SDK subscriptions.

### 2. Watchers/computed created outside the component scope

```ts
// ❌ watcher registered in a module-level function or after an await in setup —
// no active effect scope → never auto-stopped
export function trackThing(source) {
  watch(source, handler)          // leaks per call
}

// ✅ return/stop it, or bind to a scope
export function trackThing(source) {
  const stop = watch(source, handler)
  onScopeDispose(stop)            // works in components AND effectScope
}
```

Rules: composables register effects **synchronously** in `setup` (not after `await`); library-ish code uses `effectScope()` + `scope.stop()`; `tryOnScopeDispose` for optional-context composables.

### 3. Component instances held in shared state

```ts
// ❌ store/module holds refs to component instances or DOM
store.registeredEls.push(el)        // unmounted el stays reachable → detached DOM

// ✅ deregister on unmount, or hold weakly
const els = new WeakSet<Element>()
```

Pinia stores outlive components — anything a component pushes into a store must be removed on unmount, or stored via `WeakMap`/`WeakRef`.

### 4. `<KeepAlive>` without bounds

`<KeepAlive>` *intentionally* keeps instances alive. Unbounded + dynamic keys = unbounded memory.

- Always set `:max`, or `include` an explicit whitelist.
- A `<KeepAlive>` around `<router-view>` with per-param keys caches every visited detail page — usually wrong.

### 5. Vue Query/data caches

Query layers cap and GC by time (`gcTime`) — but infinite-key growth (a key containing a timestamp or unstable object) defeats it. Keys must be canonical and finite.

### 6. Closures in long-lived callbacks

A debounced/throttled handler stored globally closes over its component's scope. Create debounced functions **inside** setup (so they die with it) — `useDebounceFn` — not at module level capturing reactive state.

## Confirming a leak (workflow)

1. Heap snapshot → run the suspect flow 5-10× → force GC → snapshot → **Comparison** view.
2. Filter to `Detached` (detached DOM) and your component names.
3. Pick a leaked object → **Retainers** panel shows the exact reference chain keeping it alive — that chain names the offending listener/store/closure.
4. Fix, re-run the same flow, verify the delta is flat.

## Review checklist

- [ ] Every `addEventListener`/`setInterval`/observer has cleanup (or uses VueUse)
- [ ] No `watch`/`watchEffect` after `await` or in plain functions without scope handling
- [ ] Nothing pushes components/DOM/large payloads into stores without removal
- [ ] `<KeepAlive>` bounded
- [ ] Third-party widgets (`chart.destroy()`, `editor.dispose()`, `map.remove()`) disposed in `onUnmounted`
