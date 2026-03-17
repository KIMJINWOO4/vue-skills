# Core-Adapter Pattern (Thin Composables)

> Business logic in **pure TypeScript** (Core).
> Vue reactivity wraps it in a **thin Composable** (Adapter).
> Source: toss.tech "Framework Agnostic Library" + Michael Thiessen "Thin Composables"

## Architecture

```
Component (View)
  ↕ props + emit
Controller
  ↕ return { ... }
Composable = Adapter (thin)        ← Vue reactivity wrapper, 5-30 lines
  ↕ import
Core = Pure TypeScript             ← Business logic, no Vue APIs, unit-testable
```

## Core Layer Rules

NEVER use in Core:
- `ref()`, `reactive()`, `computed()`, `watch()`
- `onMounted()`, `onUnmounted()`
- `useRoute()`, `inject()`, `provide()`
- Any import from `vue` or `nuxt`

Core contains:
- Pure input → output functions
- Classes with methods
- Type definitions and interfaces
- Constants and enums

## Adapter Layer Rules

Composable (Adapter) ONLY does:
- Import Core functions
- Wrap results in `ref` / `computed`
- Connect Vue lifecycle to Core (e.g., `onMounted(() => core.init())`)
- Handle UI-side effects (toast, loading state)
- Target: **5-30 lines**

## Example

### Core (pure TypeScript)

```typescript
// core/chartDataProcessor.ts
export function processChartData(
  rawData: RawChartData[],
  valueKey: string,
  isPercentage: boolean
): ProcessedChartData {
  // Pure transformation, no Vue dependencies
  const grouped = groupBy(rawData, 'DEPT_NAME');
  return Object.entries(grouped).map(([dept, rows]) => ({
    dept,
    value: isPercentage
      ? rows.reduce((sum, r) => sum + r[valueKey], 0) / rows.length
      : rows.reduce((sum, r) => sum + r[valueKey], 0),
  }));
}

export function createChartSeries(
  data: ProcessedChartData[],
  type: 'bar' | 'line'
): ChartSeries[] {
  return data.map(d => ({ name: d.dept, data: [d.value], type }));
}
```

### Adapter (thin composable)

```typescript
// composables/useChartTabData.ts
export function useChartTabData(queryId: string) {
  const rawData = ref<RawChartData[]>([]);
  const { refetch } = useGridRowQuery(/* payload */);

  const processed = computed(() =>
    processChartData(rawData.value, 'VALUE', true)
  );

  const fetchData = async () => {
    const { data } = await refetch();
    rawData.value = Array.isArray(data) ? data : [];
  };

  onMounted(fetchData);
  return { processed, fetchData };
}
```

### Controller (component)

```vue
<!-- ChartTabWidget.vue (L2 Controller, ~40 lines) -->
<template>
  <ChartTabContent :chart-data="processed" :options="chartOptions" />
</template>
<script setup lang="ts">
const { processed, fetchData } = useChartTabData('GetChartData');
const chartOptions = useChartOptions(processed);
defineExpose({ refetch: fetchData });
</script>
```

## When to Apply

- Function has 10+ lines of pure logic (no Vue APIs) → extract to Core
- Same calculation used in multiple composables → must be Core
- Logic needs unit testing without Vue test utils → must be Core
- Simple ref wrapping or one-liner computed → keep in composable
