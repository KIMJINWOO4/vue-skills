---
name: vue-debug
description: Debug Vue 3 apps. Maps Vue, Vue Router and Pinia console warnings to causes and fixes, and covers reactivity that stops updating, watchers that do not fire, template refs that are null, events that fire twice, hydration mismatches, SSR state leaks, Suspense and KeepAlive surprises. Use when a Vue app throws, logs a [Vue warn], renders stale or wrong output, or behaves differently on the server and the client.
---

# Vue Debugging

## Process

1. **Get the exact message.** Copy the full console output, including the component trace under a `[Vue warn]`. Look it up in [warnings](references/warnings.md) first; it maps the common messages to a cause and a guide.
2. **Reproduce in the smallest place.** Narrow the bug to one component and one interaction before changing code. If it only happens after a refresh on an SSR page, treat it as a hydration problem.
3. **Find the symptom** in [debug-index](references/debug-index.md) when there is no message. It is grouped by area (reactivity, watchers, templates, slots, SSR and more) and phrased as symptoms, for example "watcher never triggers for reactive object properties".
4. **Fix the cause, not the warning.** Do not silence a warning with `inheritAttrs: false`, a `key` change or `nextTick` unless the guide says that is the fix.
5. **Confirm the fix.** Re-run the reproduction, check the console is clean, and add a test when the bug could come back (`vue` skill, testing guide).

## Tools that save time

- **Vue DevTools** (browser extension, or `vite-plugin-vue-devtools` in Vite): inspect component state, Pinia stores, router state and the timeline of events and mutations.
- **`onRenderTracked` / `onRenderTriggered`**, and the `onTrack` / `onTrigger` options on `computed` and `watch`, log which dependency caused an update. They run in development builds only. See [reactivity-debugging-hooks](references/guides/reactivity-debugging-hooks.md).
- **`app.config.errorHandler` and `app.config.warnHandler`** centralize reporting. `onErrorCaptured` stops errors at a component boundary.
- **Hydration mismatch details**: since Vue 3.4 the warning names the mismatched node and attribute. In production builds, set `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true` in the bundler `define` to keep those details.

## Common root causes, ranked by how often they show up

1. Reactivity lost through destructuring, or by replacing a `reactive()` object.
2. Reading the DOM before it updates (missing `await nextTick()`, wrong watcher `flush`).
3. Side effects inside `computed` or template function calls.
4. Undeclared emits or fallthrough attributes on multi-root components.
5. Browser-only APIs or random values during SSR, which cause hydration mismatches.
6. Module-level state shared across SSR requests.

Related: `vue-performance` for slowness and memory leaks, `nuxt` for Nuxt-specific SSR errors, `vue-a11y` for focus and screen reader bugs.
