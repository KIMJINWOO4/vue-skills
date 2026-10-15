---
name: vue-forms
description: Forms and validation in Vue 3. v-model and defineModel, custom inputs, schema validation with VeeValidate and Zod or with Regle, async rules, multi-step wizards, submit states, unsaved-changes guards and accessible errors. Use when building or reviewing forms, inputs, validation or file uploads in Vue.
---

# Vue Forms

Versions checked on 2026-10-15: Vue 3.5 (`defineModel`), vee-validate 4.15 with zod 4.6, @regle/core 1.29. FormKit and @tanstack/vue-form are also fine; follow what the project already uses.

## Decision table

| Form | Approach |
|------|----------|
| One to three fields with trivial rules (login, search) | Native `v-model` plus a small validation composable |
| Business forms with a schema shared with the API | VeeValidate with Zod (`toTypedSchema`), one schema for client and server |
| Type-safe, model-based validation without a form wrapper | Regle (`useRegle`, the `r$` object, built-in rules, Standard Schema support) |
| Config-driven forms | FormKit, or a renderer on top of VeeValidate or Regle |
| A custom input component | `defineModel()`; never mutate props or sync with a watcher |

## Rules

- Validate on the server with the same schema. Client validation is for the user, not for security.
- Show errors on blur or after the first submit, not on every keystroke of a fresh field.
- Disable the submit button only while submitting, not while invalid; the click is how users find what is missing.
- Tie every error to its input with `aria-describedby` and set `aria-invalid`. The `vue-a11y` skill has details.
- Guard unsaved changes with `onBeforeRouteLeave` and a dirty flag.

## References

| Topic | Path |
|-------|------|
| `v-model`, `defineModel`, custom controls, a small validation composable | [native-form-patterns](references/native-form-patterns.md) |
| VeeValidate with Zod: typed schemas, `useForm`, `useField`, field arrays, async rules | [vee-validate-zod](references/vee-validate-zod.md) |
| Regle core: `useRegle`, validation properties, errors, modifiers | [regle-guide](references/regle-guide.md) |
| Regle rules: built-ins, custom rules, operators, wrappers | [regle-rules](references/regle-rules.md) |
| Regle with Zod, Valibot or ArkType through Standard Schema | [regle-schemas](references/regle-schemas.md) |
| Wizards, submit states, dirty guards, file uploads | [form-ux-patterns](references/form-ux-patterns.md) |
