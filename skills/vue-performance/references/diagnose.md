# Diagnosing Vue Performance — Measure First

## 1. Quantify the complaint

| Complaint | Metric | Tool |
|-----------|--------|------|
| Slow first load | LCP, TTI, JS transfer size | Lighthouse, `vite build` report |
| Laggy interaction | INP, long tasks > 50ms | Chrome Performance panel |
| Slow list/typing | component render count & duration | Vue DevTools Profiler |
| Degrades over time | JS heap growth | Chrome Memory panel |

Record a number *before* changing anything. No number → no optimization.

## 2. Vue DevTools profiler

DevTools → **Timeline / Performance** → record while reproducing:
- **Component render** events show which components re-render and how often.
- Sort by count first, duration second — a 2ms component rendering 300× beats a 30ms one rendering once.

Enable render timings in dev:

```ts
// main.ts (dev only)
app.config.performance = true
```

→ `vue.<Component>.render/patch` marks appear in the Chrome Performance timeline.

## 3. Why is this component re-rendering?

Drop into the suspect component:

```ts
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTriggered((e) => {
  // e.target = the reactive object, e.key = property, e.type = 'set' | 'add' | ...
  console.log('re-render caused by', e.key, e)
})
onRenderTracked((e) => { /* every dependency the render touched */ })
```

Typical findings → fixes (see [rendering](rendering.md)):
- Triggered by a parent-created inline object prop → hoist/`computed` the prop.
- Triggered by an unrelated key on a big `reactive` store object → narrow what the template reads, or split the store.
- Tracked deps include a huge deep object → `shallowRef`.

## 4. Bundle analysis (Vite 8 / Rolldown)

```bash
npx vite build              # per-chunk sizes in output
npx vite-bundle-visualizer  # treemap (rollup-plugin-visualizer under the hood)
```

Look for: a vendor chunk > ~250kB gz, duplicated libraries (two date libs, two icon sets), full-library imports (`import _ from 'lodash'`), locale/data files pulled in by default (moment/dayjs locales, charting libs).

## 5. Memory snapshot workflow

1. Chrome Memory panel → heap snapshot.
2. Exercise the suspected flow (open/close the modal 10×, navigate back and forth).
3. Force GC, second snapshot → **Comparison** view.
4. Growing `VueComponent` / detached DOM entries = leak → [memory-leaks](memory-leaks.md).

## 6. Only then optimize

Match the finding to the fix reference, apply **one change**, re-measure, keep or revert. Batch changes hide regressions.
