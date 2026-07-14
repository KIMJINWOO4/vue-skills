# VeeValidate 4 + Zod

> `pnpm add vee-validate zod @vee-validate/zod`. One Zod schema drives types, client validation, and (reused server-side) API validation.

## Composition API pattern (recommended)

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
  plan: z.enum(['free', 'pro']).default('free'),
})

const { handleSubmit, errors, isSubmitting, defineField, resetForm, meta } = useForm({
  validationSchema: toTypedSchema(schema),
})

// defineField returns [model, props] — props wires blur/change validation triggers
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  // values is fully typed as z.infer<typeof schema> and parsed (defaults applied)
  await api.register(values)
  resetForm()
})
</script>

<template>
  <form novalidate @submit="onSubmit">
    <input v-model="email" v-bind="emailProps" type="email">
    <span>{{ errors.email }}</span>

    <input v-model="password" v-bind="passwordProps" type="password">
    <span>{{ errors.password }}</span>

    <button type="submit" :disabled="isSubmitting">Register</button>
  </form>
</template>
```

Key points:
- `toTypedSchema` gives full input/output type inference — submitted `values` are the *parsed* output (coercions & defaults applied).
- Default validation triggers are sane (validate on change after first blur/submit); don't fight them.
- `meta.dirty` for unsaved-changes guards; `meta.valid` if you need it (avoid disabling submit on invalid).

## Custom inputs: `useField` inside the component

For a form-library-aware `BaseInput`, use `useField` keyed by a `name` prop — it auto-registers with the surrounding `useForm`:

```vue
<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{ name: string, label: string }>()
const { value, errorMessage, handleBlur } = useField<string>(() => props.name)
</script>

<template>
  <label>{{ label }}
    <input v-model="value" @blur="handleBlur">
  </label>
  <span v-if="errorMessage">{{ errorMessage }}</span>
</template>
```

Then forms are just `<BaseInput name="email" label="Email" />` — no v-model plumbing.

## Cross-field & async rules

```ts
const schema = z.object({
  password: z.string().min(8),
  confirm: z.string(),
  username: z.string().min(3),
}).refine(d => d.password === d.confirm, {
  message: 'Passwords must match',
  path: ['confirm'],           // attach error to the confirm field
})
```

Async uniqueness checks: keep them **out** of the schema (they'd run on every validation pass). Validate on blur explicitly, or check server-side on submit and map the error back:

```ts
const onSubmit = handleSubmit(async (values, { setFieldError }) => {
  const res = await api.register(values)
  if (res.error?.field) setFieldError(res.error.field, res.error.message)
})
```

## Field arrays

```ts
const { fields, push, remove } = useFieldArray<Item>('items')
```

```vue
<div v-for="(field, idx) in fields" :key="field.key">
  <BaseInput :name="`items[${idx}].name`" label="Name" />
  <button type="button" @click="remove(idx)">×</button>
</div>
<button type="button" @click="push({ name: '' })">Add</button>
```

Use `field.key` as `:key` — never the index.

## Gotchas

- Zod 4: import from `'zod'` (v4 is the default export path now); `@vee-validate/zod` supports it — keep both current.
- `handleSubmit` swallows rejections into `isSubmitting`; put user-facing failure handling inside the callback, not `.catch` outside.
- Don't mix `<Form>/<Field>` component API and `useForm` composition API in the same form; pick one (composition API preferred).
- `resetForm({ values })` to reset to *new* defaults after a successful save, or `meta.dirty` stays true.
