# When and How to Split Components

## Decision Tree

```
Total lines > 200?
  → MUST split

Template has 3+ v-if branches representing different "modes"?
  → Extract Conditional: each branch → Humble component
  → Parent selects via <component :is="..."> or v-if

Template has v-for where each item > 20 lines?
  → Item Component: extract loop body

Template has 2-3 clearly distinct sections, each > 50 lines?
  → Hidden Components: extract each section

Script fetches 2+ independent data sources?
  → Extract Composable per data source
  → Controller orchestrates composables

Props ≥ 5 with 3+ handler functions?
  → Props drilling → use provide/inject

Same logic in 3+ components?
  → Extract Composable or shared utility
```

## When NOT to Split

- Static-markup-heavy 100-150 line component with minimal logic
- Splitting adds files without improving comprehension
- Simple parent-child with ≤ 3 props
- Only 1 occurrence of a pattern (never extract prematurely)

## Split Patterns

### Extract Conditional (v-if modes)

```vue
<!-- Before: one component with 3 modes -->
<template>
  <div v-if="mode === 'create'">... 60 lines ...</div>
  <div v-else-if="mode === 'edit'">... 60 lines ...</div>
  <div v-else>... 40 lines ...</div>
</template>

<!-- After: Controller selects, Humble renders -->
<template>
  <CreateForm v-if="mode === 'create'" :data="data" @submit="onSubmit" />
  <EditForm v-else-if="mode === 'edit'" :data="data" @save="onSave" />
  <ViewDisplay v-else :data="data" />
</template>
```

### Item Component (v-for extraction)

```vue
<!-- Before: heavy loop body -->
<div v-for="item in items" :key="item.id">
  ... 30+ lines per item ...
</div>

<!-- After: extracted item -->
<ItemCard v-for="item in items" :key="item.id" :item="item" @action="onAction" />
```

### Hidden Components (section extraction)

```vue
<!-- Before: 300-line template with 3 sections -->
<template>
  <div>
    <!-- Header section: 80 lines -->
    <!-- Content section: 120 lines -->
    <!-- Footer section: 60 lines -->
  </div>
</template>

<!-- After: each section is a Humble component -->
<template>
  <div>
    <PageHeader :title="title" :breadcrumbs="crumbs" />
    <ContentSection :data="data" @update="onUpdate" />
    <PageFooter :stats="stats" />
  </div>
</template>
```
