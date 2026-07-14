# Bundle Size (Vite 8 / Rolldown)

## Route-level splitting — the 80% win

```ts
// every route component = dynamic import = its own chunk
{ path: '/admin', component: () => import('@/pages/AdminDashboard.vue') }
```

File-based routing (Router 5 / Nuxt) does this automatically. Verify no route accidentally uses a static import — one static import in the route table pulls the page into the entry chunk.

## Import hygiene

```ts
// ❌ whole library                          // ✅ what tree-shaking can prove unused
import _ from 'lodash'                        import { debounce } from 'lodash-es'
import * as XLSX from 'xlsx'                  const XLSX = await import('xlsx') // in the handler
import dayjs from 'dayjs' + all locales      import 'dayjs/locale/ko' // only needed locales
```

- Icon kits: import individual icons (`unplugin-icons`), never the full set component.
- Heavy libs used in one interaction (xlsx export, pdf, editors, charts): **dynamic import inside the event handler** — the chunk loads on first click.
- Check `package.json` `sideEffects` awareness: libraries without ESM builds don't tree-shake; prefer `-es`/modern equivalents (lodash-es, date-fns).

## Component-level splitting

```ts
const HeavyEditor = defineAsyncComponent(() => import('./HeavyEditor.vue'))
```

Best targets: modals, drawers, tabs beyond the first, admin-only panels, below-the-fold sections. Nuxt: `Lazy` prefix + lazy hydration (`hydrate-on-visible`) also skips *hydration* cost.

## Chunking strategy (Rolldown)

Vite 8 chunking is generally good by default. Intervene only with data:

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {   // Rolldown accepts Rollup-shaped options
      output: {
        advancedChunks: {   // Rolldown-native replacement for manualChunks
          groups: [
            { name: 'vendor-vue', test: /node_modules\/(vue|vue-router|pinia)/ },
            { name: 'vendor-charts', test: /node_modules\/echarts/ },
          ],
        },
      },
    },
  },
})
```

- Goal: stable long-cached vendor chunks vs churning app chunks — not "many small chunks" (HTTP overhead + waterfall).
- `build.reportCompressedSize: true` and budget alerts in CI (`vite build` output, or size-limit) prevent regressions.

## Assets & CSS

- Images dominate many "JS bundle" complaints — check the network tab first. Use responsive `srcset`/AVIF (Nuxt: `<NuxtImg>`).
- Purge unused CSS via the framework (UnoCSS/Tailwind JIT are already minimal); watch out for imported component-library themes (full CSS imports).
- Fonts: `font-display: swap`, subset, self-host, preload only the one above-the-fold weight.

## Verify

```bash
npx vite build                   # chunk table
npx vite-bundle-visualizer       # treemap — find the surprises
```

Budget rule of thumb (gzipped): entry ≤ 100kB JS for content apps, ≤ 200kB for heavy SPAs; each route chunk ≤ 100kB. Exceeding budget = find what to defer, not raise the budget.
