<!-- Synced from victorgarciaesgi/regle@c2668d6:skills/regle-schemas/SKILL.md by scripts/sync.mjs. Edit sources.json, not this file. -->

# Regle Schemas

Regle can drive validation from a schema library instead of `@regle/rules`. Install `@regle/schemas` and use `useRegleSchema` with a Zod, Valibot, or ArkType schema (or any Standard Schema compliant validator).

```ts
import { useRegleSchema } from '@regle/schemas';
import { z } from 'zod';

const { r$ } = useRegleSchema(
  { email: '' },
  z.object({ email: z.string().email() })
);
```

## Key Concepts

- `useRegleSchema(state, schema)` replaces `useRegle`; the `r$` object behaves the same.
- Works with any Standard Schema library; Zod, Valibot, and ArkType are first-class.
- `useRules` / `refineRules` let you mix schema validation with native Regle rules.
- `InferInput` infers the state type from the schema.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Schema Libraries | `useRegleSchema` with Zod, Valibot, ArkType | [schemas-libraries](regle-schemas/schemas-libraries.md) |
| Standard Schema | Standard Schema spec, `useRules`, `refineRules`, `InferInput` | [schemas-standard-schema](regle-schemas/schemas-standard-schema.md) |

## Related skills

- **regle** — form setup with `useRegle`, validation properties, displaying errors.
- **regle-rules** — native rules when not using a schema library.
- **regle-typescript** — type-safe output and typing props.
