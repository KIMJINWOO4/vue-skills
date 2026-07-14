---
name: vue-forms
description: Forms and validation in Vue 3. v-model/defineModel patterns, custom form controls, schema validation with VeeValidate 4 + Zod, async validation, multi-step wizards, submission states, unsaved-changes guards, accessible error messaging. Use when building or reviewing forms, inputs, validation, or file uploads in Vue.
---

# Vue Forms Skill

> Baseline 2026-07: Vue 3.5+ (`defineModel`), VeeValidate 4.x + Zod 4 for schema-driven forms. FormKit and @tanstack/vue-form are valid alternatives — follow whatever the project already uses.

## Decision Table

| Form | Approach |
|------|----------|
| 1-3 fields, trivial rules (login, search) | Native `v-model` + a small validation composable — no library |
| Business forms, schema shared with API | **VeeValidate + Zod** (`toTypedSchema`) — one schema for client + server |
| Highly dynamic/config-driven forms | FormKit (schema rendering) or hand-rolled renderer over VeeValidate |
| Custom input components | `defineModel()` — never mutate props, never `watch`-sync manually |

## Core Rules

- Validate with the same schema on client **and** server; client validation is UX, not security.
- Errors show on `blur` or first submit — not on every keystroke while typing a fresh field ("reward early, punish late").
- Disable the submit button only while submitting — not while invalid (users need the click to reveal what's missing).
- Every error must be programmatically tied to its input (`aria-describedby`) — see `vue-a11y` skill for details.
- Guard unsaved changes with `onBeforeRouteLeave` + dirty state.

## Reference Map

| Topic | Description | Path |
|------|-------------|------|
| **Native patterns** | v-model, defineModel, custom controls, DIY validation composable | [native-form-patterns](references/native-form-patterns.md) |
| **VeeValidate + Zod** | Typed schemas, useForm/useField, field arrays, async rules | [vee-validate-zod](references/vee-validate-zod.md) |
| **Form UX patterns** | Multi-step wizards, submit states, dirty guards, file upload | [form-ux-patterns](references/form-ux-patterns.md) |
