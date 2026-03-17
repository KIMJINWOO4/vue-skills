# Store Responsibility Boundary

## Belongs in Store

- Business state shared across multiple components
  - `activeWidgets`, `layout`, `currentTemplateId`
- Business actions (state mutations)
  - `addWidget()`, `removeWidget()`, `applyTemplate()`
- Computed getters (derived state)
  - `isWidgetActive(id)`, `getLayoutForBreakpoint()`

## Does NOT Belong in Store

| What | Where Instead |
|------|---------------|
| UI-only state (`isSettingsPanelOpen`, `hoveredWidgetId`) | Local ref in owning component |
| Persistence logic (`loadFromStorage`, `saveToStorage`) | Separate composable (e.g., `useDashboardStorage`) |
| Temporary calculation (`buildTempLayout`, `getCompactedY`) | Separate composable (e.g., `useTempWidget`) |
| API calls (`fetchWidgetData`) | Separate composable or service |
| Transient drag state (`isDraggingFromPanel`) | Composable that manages drag lifecycle |

## Store Size Rule

- Store > 300 lines → split by responsibility domain
- Each sub-store handles one bounded context

## Store Review Checklist

1. **Persisted to localStorage/server?** → YES: keep in store, extract persistence logic to composable
2. **Accessed by 2+ different features?** → YES: keep in store
3. **Disappears when component unmounts?** → YES: move to local ref
4. **Pure calculation?** → YES: move to util function or Core layer
5. **Store > 300 lines?** → Split needed
