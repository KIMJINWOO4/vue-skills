# TypeScript 7 — Native Compiler

> As of 2026-07, `typescript@latest` is 7.x — the Go-based native port of the compiler (project "Corsa", previously previewed as `tsgo` / `@typescript/native-preview`). TypeScript 6.x is the final JS-based line and serves as the migration bridge.

## What changed

| | TS 5.x / 6.x (JS) | TS 7 (native) |
|--|--|--|
| Compiler | Node.js implementation | Go binary, parallelized |
| Type-check speed | baseline | ~10x faster on large projects |
| Editor/LSP | tsserver | native language server (LSP-based) |
| Memory | baseline | roughly half |

Type-checking *behavior* is intentionally identical — same errors, same inference. The version jump signals the infrastructure change, not new language semantics.

## Migration

```bash
pnpm add -D typescript@latest   # 7.x — tsc is now the native binary
```

- `tsc`, `tsc --noEmit`, `tsc -b` work as before for typical projects.
- **API consumers beware**: the old JS compiler API (`import ts from 'typescript'`) is not available in 7 — tools that programmatically drive the compiler (custom transformers, some older plugins) need the compatibility path or must stay on 6.x.
- Some rarely-used flags/features were dropped; 6.x deprecation warnings tell you exactly what to fix before jumping to 7.
- Editors: VS Code uses the native language server automatically with TS 7 workspaces.

## Practical guidance

- New projects: TS 7. Nothing to configure; enjoy the speed.
- Existing apps: upgrade to latest 6.x first, clear deprecations, then move to 7.
- Vue: Volar/vue-tsc track TS 7 — upgrade `vue-tsc` in lockstep with `typescript`. If `vue-tsc` lags, pin both to the last known-good pair.
- Monorepos benefit most: project references + native parallelism make `tsc -b` dramatically faster.
