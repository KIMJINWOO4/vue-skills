# Shared Boilerplate Extraction

## Detection Signal

If these appear together in 3+ components:

```typescript
const { t } = useT();
const toast = useNuxtApp().$toast;
const { userData } = useAuthStore();
const payload = reactive({ QUERY_ID: '...', BINDV: { FAC_ID: userData.facId } });
const { refetch } = useGridRowQuery(payload, false, { forceRefresh: true });
```

→ Extract into a shared composable.

## Extraction Rules

| Repetitions | Action |
|-------------|--------|
| 1 | Never extract — premature abstraction |
| 2 | Tolerate unless pattern > 15 lines |
| 3+ | Extract composable or shared utility |

## Example: Widget Data Composable

```typescript
// composables/useWidgetData.ts
export function useWidgetData<T>(config: {
  queryId: string;
  defaultValue: T;
  transform: (rows: Record<string, any>[]) => T;
  errorMessage: string;
  bindVars?: Record<string, any>;
}) {
  const { t } = useT();
  const toast = useNuxtApp().$toast;
  const { userData } = useAuthStore();

  const data = ref<T>(config.defaultValue) as Ref<T>;
  const payload = reactive({
    QUERY_ID: config.queryId,
    BINDV: { FAC_ID: userData.facId, ...config.bindVars },
  });
  const { refetch } = useGridRowQuery(payload, false, { forceRefresh: true });

  const fetchData = async () => {
    try {
      const { data: list } = await refetch();
      data.value = config.transform(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(config.errorMessage, err);
      toast.error(t('MSG9999', config.errorMessage));
    }
  };

  onMounted(fetchData);
  return { data, fetchData };
}
```

## Usage (widget reduced from 93 to ~40 lines)

```vue
<script setup lang="ts">
const { data, fetchData } = useWidgetData<ProductionData>({
  queryId: 'GetProductionResult',
  defaultValue: { START_QTY_TODAY: 0, END_QTY_TODAY: 0, /* ... */ },
  transform: (rows) => rows[0] ?? { /* defaults */ },
  errorMessage: 'Production data fetch failed',
});

const mainValue = computed(() =>
  formatProductionValue(data.value.END_QTY_TODAY, data.value.START_QTY_TODAY)
);

defineExpose({ refetch: fetchData });
</script>
```
