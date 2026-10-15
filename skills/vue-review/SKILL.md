---
name: vue-review
description: Review Vue and Nuxt code changes. A prioritized checklist for pull requests and diffs touching .vue files, composables, Pinia stores, routes and Nuxt server code, covering correctness, reactivity, SSR safety, security, accessibility, performance and maintainability, with findings reported as file:line plus a fix. Use when asked to review, audit or check Vue code, a PR or a diff.
---

# Vue Code Review

## Process

1. **Scope.** Get the diff (`git diff <base>...HEAD`, or the PR). List the changed `.vue`, `.ts`, store, route and `server/` files. Read each changed component in full, not only the hunk, because template and script interact.
2. **Learn the project's conventions** before judging style: Vue and Nuxt majors, Options or Composition API, lint config, UI library, data layer. Do not flag a convention the codebase uses on purpose.
3. **Walk the checklist in priority order** ([checklist](references/checklist.md)). Stop to verify each suspected problem by reading the code path; drop anything you cannot point to.
4. **Report** using the format below. Lead with blockers. Skip praise and restating what the diff does.

## Priorities

| Priority | Area | Typical findings |
|----------|------|------------------|
| P0 blocker | Correctness and security | Lost reactivity, mutated props, `v-html` on user input, secrets in client bundles, SSR state shared between requests, missing `await` on navigation or data |
| P1 major | Runtime behavior | Hydration mismatches, effects without cleanup, watchers that should be computed, race conditions in fetches, broken keyboard access |
| P2 minor | Maintainability and performance | Oversized components, prop drilling, duplicated state, unkeyed or index-keyed lists that reorder, deep watchers on large data |
| P3 nit | Style | Naming, ordering of SFC blocks, comments. Report only if the project's lint does not already cover it |

## Report format

```
[P0] src/components/UserCard.vue:42
Destructuring `props` in setup loses reactivity; the card keeps showing the first user after navigation.
Fix: use `props.user` in the template, or `const { user } = toRefs(props)`.
```

One finding per block: priority, `file:line`, what goes wrong for the user, and the concrete fix. End with a one-line summary: counts per priority and whether the change is safe to merge.

## Out of scope

Pure formatting already handled by ESLint or Prettier, and rewrites to personal taste. For a deeper accessibility audit use `vue-a11y`; for measured performance work use `vue-performance`.
