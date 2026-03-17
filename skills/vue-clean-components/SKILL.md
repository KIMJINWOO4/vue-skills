---
name: vue-clean-components
description: Rules for structuring Vue 3 components so humans can read and maintain them. Component level hierarchy (Page/Feature/Controller/Humble/Atomic), composable lifecycle cohesion, Core-Adapter separation, props drilling resolution, and store responsibility boundaries. Use when writing, splitting, or refactoring Vue components.
license: MIT
---

# Vue Clean Components

Rules for writing Vue 3 components that are **easy for humans to read and maintain**.
Based on Michael Thiessen's Clean Components Toolkit + toss.tech Core-Adapter pattern.

## When to Use

- Writing or refactoring Vue components
- A component exceeds 150 lines
- Props exceed 5 or include 3+ handler functions
- A composable exceeds 200 lines or mixes unrelated lifecycle concerns
- A store mixes UI state with business state
- User requests "component split", "refactor", or "readability improvement"

## Quick Reference

| Working on... | Load file |
|---------------|-----------|
| Deciding component level | [references/component-levels.md](references/component-levels.md) |
| When/how to split | [references/split-decision-tree.md](references/split-decision-tree.md) |
| Composable structure | [references/composable-lifecycle.md](references/composable-lifecycle.md) |
| Core-Adapter separation | [references/core-adapter.md](references/core-adapter.md) |
| Props drilling fix | [references/props-resolution.md](references/props-resolution.md) |
| Store boundaries | [references/store-boundary.md](references/store-boundary.md) |
| Boilerplate extraction | [references/boilerplate-extraction.md](references/boilerplate-extraction.md) |

## Key Principles

1. **Every component has a level** (L0-Page → L4-Atomic) with strict responsibility boundaries
2. **Composable = lifecycle cohesion unit** — group related ref + watch + cleanup together, like React hooks
3. **Core-Adapter separation** — business logic in pure TypeScript, Vue reactivity in thin composables
4. **No props drilling beyond 1 level** — use provide/inject or store
5. **Store holds only shared business state** — UI-only state stays in components
6. **Extract boilerplate at 3+ repetitions** — never prematurely

## Pattern Sources

| Rule | Source |
|------|--------|
| Level Hierarchy | Controller + Humble Components (Thiessen) |
| Split Decision | Long Components + Hidden Components (Thiessen) |
| Core-Adapter | Thin Composables (Thiessen) + Framework Agnostic (toss.tech) |
| Lifecycle Cohesion | React Custom Hooks principle |
| Props Resolution | Props Down Events Up + Preserve Whole Object (Thiessen) |
| Store Boundary | Data Store + Lightweight State Management (Thiessen) |
| Conditional Split | Extract Conditional + Strategy (Thiessen) |
| Loop Split | List Component + Item Component (Thiessen) |

_Token efficiency: Main skill ~400 tokens, each reference ~600-1000 tokens_
