# Component Level Hierarchy

Every Vue component belongs to exactly one level. Annotate files:

```vue
<!-- @level L2-Controller -->
```

## Levels

| Level | Name | Role | Max Lines | Store | Composable | Children |
|-------|------|------|-----------|-------|------------|----------|
| L0 | **Page** | Route entry, layout arrangement | < 100 | Read-only | OK | L1 |
| L1 | **Feature** | Feature orchestrator, provide() host | < 200 | Full CRUD | OK | L2, L3 |
| L2 | **Controller** | Connects composables to humble components | < 150 | via inject | OK | L3, L4 |
| L3 | **Humble** | Pure presentation (props + emit only) | < 100 | **Forbidden** | **Forbidden** | L4 |
| L4 | **Atomic** | Design tokens (button, card shell) | < 50 | **Forbidden** | **Forbidden** | None |

## Assignment Decision Tree

```
Maps to a route?                          → L0 Page
Represents an independent feature unit?   → L1 Feature
Fetches data or wires composable output?  → L2 Controller
Renders only from props, no fetch/store?  → L3 Humble
Single UI primitive (card, badge, icon)?  → L4 Atomic
```

## Violations and Fixes

| Violation | Fix |
|-----------|-----|
| L3 Humble calls `useSomeStore()` | Move store access to parent Controller |
| L0 Page > 150 lines | Extract a Feature component |
| L2 Controller template > 100 lines | Extract Humble components |
| L4 Atomic has > 5 props | Split into specialized or use slots |

## Directory Convention

```
features/my-feature/
  ├── core/                  # Pure TypeScript (no Vue APIs)
  ├── composables/           # Thin adapters (Vue lifecycle wrappers)
  ├── components/
  │   ├── ui/                # L4 Atomic
  │   └── sections/          # L3 Humble
  ├── store/                 # Pinia store (business state only)
  ├── types.ts
  ├── constants.ts
  └── MyFeature.vue          # L1 Feature or L2 Controller
```
