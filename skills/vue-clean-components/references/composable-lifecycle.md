# Composable = Lifecycle Cohesion Unit

> A composable groups **related lifecycle code** together.
> Like React custom hooks group related useState + useEffect + cleanup,
> a Vue composable groups related ref + watch + onMounted + onUnmounted.

## What Makes a Composable

A composable MUST involve Vue lifecycle APIs (ref, watch, onMounted, onUnmounted, etc.).
If it doesn't use any, it's a **plain function** — drop the `use` prefix.

```typescript
// ✅ Composable: groups timer setup + cleanup
function useAutoRefresh(callback: () => void, ms = 60000) {
  let timer: ReturnType<typeof setInterval> | null = null;
  const start = () => { timer = setInterval(callback, ms); };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  onUnmounted(stop);
  return { start, stop };
}

// ✅ Plain function: no lifecycle
function getWidgetComponent(id: string): Component | null {
  return widgetRegistry.get(id) ?? null;
}
```

## One Composable = One Lifecycle Concern

Each composable handles ONE concern. Setup and cleanup for that concern stay together.

```typescript
// ✅ Pointer events: setup + cleanup in one unit
function usePointerEvents(handlers: PointerHandlers) {
  const attach = () => {
    document.addEventListener('pointermove', handlers.onMove);
    document.addEventListener('pointerup', handlers.onUp);
  };
  const detach = () => {
    document.removeEventListener('pointermove', handlers.onMove);
    document.removeEventListener('pointerup', handlers.onUp);
  };
  onUnmounted(detach);
  return { attach, detach };
}

// ✅ RAF scheduling: setup + cleanup in one unit
function useRafScheduler() {
  let rafId: number | null = null;
  const schedule = (fn: () => void) => {
    if (rafId === null) rafId = requestAnimationFrame(() => { fn(); rafId = null; });
  };
  const cancel = () => { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } };
  onUnmounted(cancel);
  return { schedule, cancel };
}

// ✅ Compose small composables into larger ones
function useWidgetDrag() {
  const { attach, detach } = usePointerEvents({ onMove, onUp });
  const { schedule } = useRafScheduler();
  // orchestration logic only
  return { dragState, onPointerDown };
}
```

## Composable Checklist

1. **Uses Vue lifecycle APIs?** No → make it a plain function
2. **All related setup + cleanup grouped?** If scattered → split by concern
3. **onUnmounted cleans up every resource?** Verify
4. **State created per-call (ref inside), not module-level?** Verify
5. **Dependencies explicit in watch/watchEffect?** If hidden → make explicit

## Module-level State Warning

```typescript
// ❌ Module-level: all callers share same reference
const formData = reactive({ name: '' });
export function useForm() {
  return { formData };
}

// ✅ Per-call: each caller gets own instance
export function useForm() {
  const formData = reactive({ name: '' });
  return { formData };
}
```

Exception: singleton stores (Pinia) are intentionally module-level.
