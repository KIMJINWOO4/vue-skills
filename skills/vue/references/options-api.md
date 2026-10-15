<!-- Synced from vuejs-ai/skills@c9d355f:skills/vue-options-api-best-practices/SKILL.md by scripts/sync.mjs. Edit sources.json, not this file. -->

Vue.js Options API best practices, TypeScript integration, and common gotchas.

### TypeScript
- Need to enable TypeScript type inference for component properties → See [ts-options-api-use-definecomponent](options-api/ts-options-api-use-definecomponent.md)
- Enabling type safety for Options API this context → See [ts-strict-mode-options-api](options-api/ts-strict-mode-options-api.md)
- Using old TypeScript versions with prop validators → See [ts-options-api-arrow-functions-validators](options-api/ts-options-api-arrow-functions-validators.md)
- Event handler parameters need proper type safety → See [ts-options-api-type-event-handlers](options-api/ts-options-api-type-event-handlers.md)
- Need to type object or array props with interfaces → See [ts-options-api-proptype-complex-types](options-api/ts-options-api-proptype-complex-types.md)
- Injected properties missing TypeScript types completely → See [ts-options-api-provide-inject-limitations](options-api/ts-options-api-provide-inject-limitations.md)
- Complex computed properties lack clear type documentation → See [ts-options-api-computed-return-types](options-api/ts-options-api-computed-return-types.md)

### Methods & Lifecycle
- Methods aren't binding to component instance context → See [no-arrow-functions-in-methods](options-api/no-arrow-functions-in-methods.md)
- Lifecycle hooks losing access to component data → See [no-arrow-functions-in-lifecycle-hooks](options-api/no-arrow-functions-in-lifecycle-hooks.md)
- Debounced functions sharing state across component instances → See [stateful-methods-lifecycle](options-api/stateful-methods-lifecycle.md)
