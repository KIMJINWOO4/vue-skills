<!-- Synced from victorgarciaesgi/regle@c2668d6:skills/regle/SKILL.md by scripts/sync.mjs. Edit sources.json, not this file. -->

# Regle

Regle is a type-safe, model-based, headless form validation library for Vue 3. It provides full TypeScript inference, reactive validation, and works with any UI framework or design system.


## MCP Server

Regle provides an MCP server that can be used to get documentation and autocomplete for Regle. If it's available, use it to get up-to-date information on the API.

```json
{
  "mcpServers": {
    "regle": {
      "command": "npx",
      "args": ["@regle/mcp-server"]
    }
  }
}

## Installation

```sh
# Core + built-in rules
pnpm add @regle/core @regle/rules

# Optional: schema support (Zod, Valibot, ArkType)
pnpm add @regle/schemas
```

Requires Vue 3.3+ and TypeScript 5.1+.

## Quick Start

```ts
import { useRegle } from '@regle/core';
import { required, email, minLength } from '@regle/rules';

const { r$ } = useRegle(
  { name: '', email: '' },
  {
    name: { required, minLength: minLength(3) },
    email: { required, email },
  }
);
```

```vue
<template>
  <input v-model="r$.$value.name" placeholder="Name" />
  <ul v-if="r$.$errors.name.length">
    <li v-for="error of r$.$errors.name" :key="error">{{ error }}</li>
  </ul>

  <button @click="r$.$validate()">Submit</button>
</template>
```

## Key Concepts

- **State**: first argument -- raw object, `reactive`, `ref`, or single value
- **Rules**: second argument -- mirrors the data structure, each field gets a rules object
- **`r$`**: returned reactive object with values, errors, dirty state, and validation methods
- All rules are optional by default; add `required` to enforce a field

## Core

| Topic | Description | Reference |
|-------|-------------|-----------|
| useRegle | State definition, rules declaration, dynamic rules, `r$` object | [core-use-regle](regle/core-use-regle.md) |
| Validation Properties | `$invalid`, `$dirty`, `$error`, `$errors`, `$pending`, `$validate`, `$touch`, `$reset` | [core-validation-properties](regle/core-validation-properties.md) |
| Displaying Errors | Showing errors, custom messages, `getErrors`, `flatErrors` | [core-displaying-errors](regle/core-displaying-errors.md) |
| Modifiers | `autoDirty`, `lazy`, `silent`, `rewardEarly`, `disabled`, `validationGroups`, per-field modifiers | [core-modifiers](regle/core-modifiers.md) |

## Related skills

- **regle-rules** — built-in rules, custom rules (`createRule`), rule wrappers (`withMessage`, `withParams`, `withAsync`), and rule operators (`and`, `or`, `applyIf`, `assignIf`).
- **regle-advanced** — collections, async, server errors, reset, scoped validation, variants, global config.
- **regle-schemas** — Zod, Valibot, ArkType, and Standard Schema integration.
- **regle-typescript** — type-safe output, typing rules schemas and component props.
