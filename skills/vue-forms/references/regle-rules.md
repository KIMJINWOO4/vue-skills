<!-- Synced from victorgarciaesgi/regle@c2668d6:skills/regle-rules/SKILL.md by scripts/sync.mjs. Edit sources.json, not this file. -->

# Regle Rules

Validation rules for Regle. Rules come from `@regle/rules`, but you can also write your own with `createRule`, customize them with wrappers, and combine them with operators.

```ts
import { useRegle } from '@regle/core';
import { required, email, minLength } from '@regle/rules';

const { r$ } = useRegle(
  { email: '' },
  { email: { required, email, minLength: minLength(5) } }
);
```

## Key Concepts

- All rules are optional by default; add `required` to enforce a field.
- Built-in rules are imported from `@regle/rules`; some are factories that take parameters (e.g. `minLength(3)`).
- Custom rules use `createRule` for reusability, or an inline function for one-offs.
- Wrappers adapt an existing rule (message, params, async, tooltip) without rewriting it.
- Operators combine or conditionally apply rules.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Built-in Rules | All validation rules from `@regle/rules` | [rules-built-in](regle-rules/rules-built-in.md) |
| Custom Rules | Inline rules, `createRule`, reactive parameters, async rules, metadata | [rules-custom](regle-rules/rules-custom.md) |
| Rule Wrappers | `withMessage`, `withParams`, `withAsync`, `withTooltip`, chaining | [rules-wrappers](regle-rules/rules-wrappers.md) |
| Rule Operators | `and`, `or`, `xor`, `not`, `applyIf`, `assignIf`, `pipe` | [rules-operators](regle-rules/rules-operators.md) |

## Related skills

- **regle** — form setup with `useRegle`, validation properties, displaying errors, modifiers.
- **regle-typescript** — typing rules schemas with `inferRules` and `RegleComputedRules`.
