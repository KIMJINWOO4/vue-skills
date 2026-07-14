# Vue Router

> Baseline: Vue Router 5 (2026). v5 has effectively **no breaking changes** from v4 — upgrade is a version bump. v6 will be ESM-only and remove deprecated APIs.

## What's new in Router 5

- **File-based routing in core** — `unplugin-vue-router` was merged into the core package. See [router-v5-file-based-routing](router/router-v5-file-based-routing.md).
- **Data Loaders** (experimental) — route-bound data fetching via `vue-router/experimental`. Covered in depth in the `vue-data` skill.
- Only breaking note: the IIFE build no longer bundles `@vue/devtools-api`.
- Migrating from `unplugin-vue-router`: change `unplugin-vue-router/vite` → `vue-router/vite` and `unplugin-vue-router/data-loaders/*` → `vue-router/experimental`.

## Navigation Guards

- Navigating between same route with different params → See [router-beforeenter-no-param-trigger](router/router-beforeenter-no-param-trigger.md)
- Accessing component instance in beforeRouteEnter guard → See [router-beforerouteenter-no-this](router/router-beforerouteenter-no-this.md)
- Navigation guard making API calls without awaiting → See [router-guard-async-await-pattern](router/router-guard-async-await-pattern.md)
- Users trapped in infinite redirect loops → See [router-navigation-guard-infinite-loop](router/router-navigation-guard-infinite-loop.md)
- Navigation guard using deprecated next() function → See [router-navigation-guard-next-deprecated](router/router-navigation-guard-next-deprecated.md)

## Route Lifecycle

- Stale data when navigating between same route → See [router-param-change-no-lifecycle](router/router-param-change-no-lifecycle.md)
- Event listeners persisting after component unmounts → See [router-simple-routing-cleanup](router/router-simple-routing-cleanup.md)

## Setup

- Building production single-page application → See [router-use-vue-router-for-production](router/router-use-vue-router-for-production.md)
- File-based routing setup (Router 5) → See [router-v5-file-based-routing](router/router-v5-file-based-routing.md)
