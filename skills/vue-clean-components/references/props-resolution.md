# Props Drilling Resolution

## Decision Tree

```
Handler/state passed through 2+ component levels?
│
├─ NO → Keep props/emit (1-level pass is normal Vue)
│
└─ YES →
    ├─ Shared business state?
    │   → Store: children access directly via useSomeStore()
    │   Example: activeWidgets, layout, currentTemplate
    │
    ├─ Feature-internal coordination state?
    │   → provide/inject with Symbol key + TypeScript type
    │   Example: dragState, expandedWidget, searchFilter
    │
    └─ Handler functions as props?
        → provide/inject action object
        Example: { onDrag, onToggle, onSelect }
```

## provide/inject Rules

```typescript
// injection-keys.ts (always a separate file)
import type { InjectionKey, Ref } from 'vue';

export const DRAG_STATE_KEY: InjectionKey<Ref<DragState>> = Symbol('dragState');
export const WIDGET_ACTIONS_KEY: InjectionKey<WidgetActions> = Symbol('widgetActions');
```

```typescript
// Provider (Controller/Feature level)
provide(DRAG_STATE_KEY, dragState);

// Consumer (Humble level) — always validate
const dragState = inject(DRAG_STATE_KEY);
if (!dragState) throw new Error('DRAG_STATE_KEY must be provided by parent');
```

## Preserve Whole Object

When 3+ related props describe the same entity's state, pass as one object:

```typescript
// ❌ 5 separate boolean props
<CardItem
  :is-active="store.isActive(id)"
  :is-dragging="drag.isDragging && drag.widgetId === id"
  :is-expanded="expanded === id"
  :is-highlighted="store.hoveredId === id"
/>

// ✅ One state object
<CardItem :widget="widget" :state="getWidgetState(widget.id)" />

function getWidgetState(id: string): WidgetItemState {
  return {
    isActive: store.isActive(id),
    isDragging: drag.isDragging && drag.widgetId === id,
    isExpanded: expanded.value === id,
    isHighlighted: store.hoveredId === id,
  };
}
```

## Props Count Guide

| Count | Action |
|-------|--------|
| 1-3 | Fine |
| 4-5 | Consider Preserve Whole Object |
| 6+ | Must use provide/inject or split component |
| 3+ handlers | Must provide/inject action object |
