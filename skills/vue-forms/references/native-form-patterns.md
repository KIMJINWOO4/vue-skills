# Native Form Patterns (no library)

## v-model essentials

```vue
<input v-model="name">                  <!-- string -->
<input v-model.trim="name">             <!-- trim on change -->
<input v-model.number="age" type="number">  <!-- cast to number -->
<input v-model.lazy="bio">              <!-- sync on change, not input -->
<input v-model="agreed" type="checkbox">    <!-- boolean -->
<input v-model="picked" type="radio" value="a">
<select v-model="selected" multiple>    <!-- array -->
```

- `v-model.number` yields `''` when the field is cleared — normalize before submitting.
- Checkbox groups bind an array; radio groups bind the `value` of the checked input.

## Custom form controls with `defineModel`

```vue
<!-- BaseInput.vue -->
<script setup lang="ts">
const model = defineModel<string>({ required: true })

defineProps<{
  label: string
  error?: string
}>()

const id = useId()   // Vue 3.5+ stable SSR-safe id
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
    >
    <p v-if="error" :id="`${id}-error`" class="error">{{ error }}</p>
  </div>
</template>
```

- `defineModel` replaces the `modelValue` prop + `update:modelValue` emit boilerplate; it is writable locally and syncs to the parent.
- Named models: `defineModel<string>('firstName')` → `v-model:first-name`.
- Modifiers: `const [model, modifiers] = defineModel({ set(v) { return modifiers.trim ? v.trim() : v } })`.
- **Never** copy a prop into a local ref and watch-sync both directions — that's the bug `defineModel` exists to prevent.

## A minimal validation composable

For small forms, this is all you need — resist the library reflex:

```ts
// useValidation.ts
import { computed, reactive } from 'vue'

type Rule<T> = (value: T) => string | true

export function useValidation<T extends Record<string, unknown>>(
  form: T,
  rules: { [K in keyof T]?: Rule<T[K]>[] },
) {
  const touched = reactive<Partial<Record<keyof T, boolean>>>({})

  const errors = computed(() => {
    const out = {} as Partial<Record<keyof T, string>>
    for (const key in rules) {
      for (const rule of rules[key] ?? []) {
        const result = rule(form[key])
        if (result !== true) { out[key] = result; break }
      }
    }
    return out
  })

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  function touch(key: keyof T) { touched[key] = true }
  function touchAll() { for (const key in rules) touched[key] = true }

  /** show error only after blur or submit attempt */
  function errorFor(key: keyof T) {
    return touched[key] ? errors.value[key] : undefined
  }

  return { errors, isValid, touch, touchAll, errorFor }
}
```

```vue
<script setup lang="ts">
const form = reactive({ email: '', password: '' })

const { isValid, touch, touchAll, errorFor } = useValidation(form, {
  email: [v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Invalid email'],
  password: [v => v.length >= 8 || 'Min 8 characters'],
})

async function onSubmit() {
  touchAll()
  if (!isValid.value) return
  await login(form)
}
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <BaseInput v-model="form.email" label="Email" :error="errorFor('email')" @blur="touch('email')" />
    <BaseInput v-model="form.password" label="Password" :error="errorFor('password')" @blur="touch('password')" />
    <button type="submit">Sign in</button>
  </form>
</template>
```

Notes:
- `@submit.prevent` on the `<form>`, `type="submit"` on the button — Enter-to-submit works for free.
- `novalidate` disables inconsistent native browser bubbles while keeping semantic validation attributes available.
- Outgrowing this (cross-field rules, async rules, arrays)? Move to VeeValidate + Zod, don't grow the composable into a framework.
