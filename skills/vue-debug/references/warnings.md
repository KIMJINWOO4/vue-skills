# Console Messages: Cause and Fix

Search this page for the start of the message. Wording shifts a little between Vue versions, so match on the distinctive part. Each row links to the guide with the full explanation.

## Components, props and emits

| Message starts with | Usual cause | Fix | Guide |
|---------------------|-------------|-----|-------|
| `Failed to resolve component: X` | Component not imported or registered, or a native custom element | Import it in `<script setup>`. For web components, set `compilerOptions.isCustomElement`. For string names, use `resolveComponent` or a component map. | [local-components-not-in-descendants](guides/local-components-not-in-descendants.md), [rendering-resolve-component-for-string-names](guides/rendering-resolve-component-for-string-names.md) |
| `Missing required prop: "x"` | Parent does not pass the prop, often a casing mismatch | Pass it, or make it optional with a default. In `v-for`, pass item data as props explicitly. | [v-for-component-props](guides/v-for-component-props.md) |
| `Invalid prop: type check failed for prop "x"` | Wrong type, for example a string from an attribute where a number is expected | Bind with `:x="1"` instead of `x="1"`, or fix the declared type. Boolean props have their own casting rules. | [ts-defineprops-boolean-default-false](guides/ts-defineprops-boolean-default-false.md) |
| `Extraneous non-props attributes (...) were passed to component but could not be automatically inherited` | The component has several root nodes, a fragment or a Teleport root | Bind `v-bind="$attrs"` on the intended element, or declare the attribute as a prop. | [multi-root-component-class-attrs](guides/multi-root-component-class-attrs.md), [inheritattrs-false-for-wrapper-components](guides/inheritattrs-false-for-wrapper-components.md) |
| `Component emitted event "x" but it is neither declared in the emits option nor as an "onX" prop` | Undeclared emit | Declare it with `defineEmits`. Undeclared native event names can fire twice. | [declare-emits-for-documentation](guides/declare-emits-for-documentation.md), [undeclared-emits-double-firing](guides/undeclared-emits-double-firing.md) |
| `defineEmits() is a compiler-hint helper that is only usable inside <script setup>` (or the same for `defineProps`) | Macro called inside a function, or a mix of type and runtime arguments | Call the macro once at the top level of `<script setup>`. | [defineEmits-must-be-top-level](guides/defineEmits-must-be-top-level.md), [defineEmits-no-runtime-and-type-mixed](guides/defineEmits-no-runtime-and-type-mixed.md) |
| `Property "x" was accessed during render but is not defined on instance` | Template uses a name the script does not expose | Declare or import it in `<script setup>`; check spelling and `v-for` scope. | [template-expressions-restrictions](guides/template-expressions-restrictions.md) |
| `Runtime directive used on component with non-element root node` | A custom directive on a component whose root is a fragment or text | Apply the directive to an element inside the component. | [directives](../../vue/references/core/directives.md) |

## Reactivity and lifecycle

| Message starts with | Usual cause | Fix | Guide |
|---------------------|-------------|-----|-------|
| `Maximum recursive updates exceeded` | An effect writes to state it also reads: a watcher, a computed with side effects, or a template function that mutates | Move the write out of the effect, or derive the value with `computed`. | [computed-no-side-effects](guides/computed-no-side-effects.md), [template-functions-no-side-effects](guides/template-functions-no-side-effects.md) |
| `Write operation failed: computed value is readonly` | Assigning to a computed without a setter | Add a `get`/`set` pair, or write to the source state. | [computed-return-value-readonly](guides/computed-return-value-readonly.md) |
| `Set operation on key "x" failed: target is readonly` | Mutating a prop, `readonly()` state or a store getter | Emit an event or use `defineModel`; mutate the owner's state. | [definemodel-object-mutation-no-emit](guides/definemodel-object-mutation-no-emit.md) |
| `onMounted is called when there is no active component instance` (or any `onX` hook) | Hook registered after an `await` or outside `setup` | Register hooks synchronously at the top of `setup`. | [lifecycle-hooks-synchronous-registration](guides/lifecycle-hooks-synchronous-registration.md), [composition-api-script-setup-async-context](guides/composition-api-script-setup-async-context.md) |
| `inject() can only be used inside setup() or functional components` | Composable that calls `inject` used from an event handler, a timer or module scope | Call the composable during `setup`, keep the returned value. | [composable-call-location-restrictions](guides/composable-call-location-restrictions.md), [provide-inject-synchronous-setup](guides/provide-inject-synchronous-setup.md) |
| `injection "x" not found` | No ancestor provides the key, or the key is a different `Symbol` instance | Provide it higher in the tree, give `inject` a default, share one exported key. | [provide-inject-debugging-challenges](guides/provide-inject-debugging-challenges.md), [provide-inject-default-value-factory](guides/provide-inject-default-value-factory.md) |
| `Vue received a Component that was made a reactive object` | A component definition stored in `ref()` or `reactive()` | Use `shallowRef` or `markRaw` for component values. | [ts-shallowref-for-dynamic-components](guides/ts-shallowref-for-dynamic-components.md), [reactivity-markraw-for-non-reactive](guides/reactivity-markraw-for-non-reactive.md) |
| `Invalid watch source` | Watching a plain value, such as `props.x` or a destructured field | Watch a getter: `watch(() => props.x, ...)`. | [watch-reactive-property-getter](guides/watch-reactive-property-getter.md) |
| No message, UI does not update | Lost reactivity | Check destructuring, `.value`, refs inside collections. | [reactive-destructuring](guides/reactive-destructuring.md), [ref-value-access](guides/ref-value-access.md), [refs-in-collections-need-value](guides/refs-in-collections-need-value.md) |

## Templates and lists

| Message starts with | Usual cause | Fix | Guide |
|---------------------|-------------|-----|-------|
| `Duplicate keys found during update` | Non-unique `:key`, often an index or a field that repeats | Key by a stable unique id. | [v-for-key-attribute](guides/v-for-key-attribute.md) |
| `v-if/v-else-if/v-else` compile errors | `v-else` not directly after `v-if` | Keep the branches as adjacent siblings. | [v-else-must-follow-v-if](guides/v-else-must-follow-v-if.md) |
| Template ref is `null` | Element is inside a `v-if` that is false, or read before mount | Read after `onMounted`, guard for `null`, or use `v-show`. | [template-ref-null-with-v-if](guides/template-ref-null-with-v-if.md), [use-template-ref-vue35](guides/use-template-ref-vue35.md) |
| `Template ref "x" used on a non-ref value` | `ref="x"` points at a name that is not a ref | Declare `const x = useTemplateRef('x')`. | [use-template-ref-vue35](guides/use-template-ref-vue35.md) |

## Built-in components

| Message starts with | Usual cause | Fix | Guide |
|---------------------|-------------|-----|-------|
| `Failed to locate Teleport target with selector "#x"` | Target element does not exist when the Teleport mounts | Render the target first, or use `defer` (Vue 3.5+). | [teleport-target-must-exist](guides/teleport-target-must-exist.md) |
| `Component inside <Transition> renders non-element root node that cannot be animated` | Transition child is a fragment, a text node or a multi-root component | Give the child a single element root. With `<RouterView>`, wrap the slot component in one element. | [component-transition](../../vue/references/core/component-transition.md) |
| `<Suspense> is an experimental feature` | Informational | Expected while Suspense stays experimental. Handle errors yourself; Suspense does not. | [suspense-no-builtin-error-handling](guides/suspense-no-builtin-error-handling.md) |
| `KeepAlive` caches the wrong views, or mounts twice | `include` names do not match component names, or nested router views | Match `include` to component `name`; read the nested KeepAlive guide. | [keepalive-router-nested-double-mount](guides/keepalive-router-nested-double-mount.md) |

## SSR and hydration

| Message starts with | Usual cause | Fix | Guide |
|---------------------|-------------|-----|-------|
| `Hydration node mismatch`, `Hydration text content mismatch`, `Hydration class mismatch`, `Hydration completed but contains mismatches` | Server and client render different output: `Date.now()`, `Math.random()`, `window` checks, locale formatting, invalid HTML nesting | Render the same output on both sides; move browser-only output to `onMounted` or `<ClientOnly>`. Fix invalid nesting such as `<div>` inside `<p>`. | [ssr-hydration-mismatch-causes](guides/ssr-hydration-mismatch-causes.md), [ssr-platform-specific-apis](guides/ssr-platform-specific-apis.md) |
| Data from one user shows up for another | Module-level state on the server | Create state per request (Pinia, `useState` in Nuxt), never in module scope. | [state-ssr-cross-request-pollution](guides/state-ssr-cross-request-pollution.md) |

## Vue Router

| Message starts with | Usual cause | Fix | Guide |
|---------------------|-------------|-----|-------|
| `[Vue Router warn]: No match found for location with path` | Missing route or a typo in the path | Add the route or a catch-all route. | [router-use-vue-router-for-production](../../vue/references/router/router-use-vue-router-for-production.md) |
| `Detected a possibly infinite redirection in a navigation guard` | A guard redirects to a route that triggers the same guard | Check the target before redirecting. | [router-navigation-guard-infinite-loop](../../vue/references/router/router-navigation-guard-infinite-loop.md) |
| `The "next" callback was called more than once` | Mixing `next()` with returns, or several `next()` paths | Return values from the guard instead of calling `next()`. | [router-navigation-guard-next-deprecated](../../vue/references/router/router-navigation-guard-next-deprecated.md) |
| Page data stays stale when only params change | The component is reused, so setup does not run again | Watch `route.params` or use `onBeforeRouteUpdate`. | [router-param-change-no-lifecycle](../../vue/references/router/router-param-change-no-lifecycle.md) |

## Pinia

| Message starts with | Usual cause | Fix | Guide |
|---------------------|-------------|-----|-------|
| `getActivePinia()` was called but there was no active Pinia | Store used before `app.use(pinia)`, at module scope, or in a test without Pinia | Call `useStore()` inside setup, guards or actions; in tests use `createTestingPinia` or `setActivePinia`. | [pinia-no-active-pinia-error](../../vue/references/pinia-gotchas/pinia-no-active-pinia-error.md) |
| Store state not updating in the component | Destructured the store | Use `storeToRefs(store)` for state and getters; actions can be destructured. | [pinia-store-destructuring-breaks-reactivity](../../vue/references/pinia-gotchas/pinia-store-destructuring-breaks-reactivity.md) |
| Pinia 4 install error about `@vue/devtools-api` | Pinia 4 made it a required peer dependency | Install `@vue/devtools-api` next to `pinia`. | See the `vue-upgrade` skill |
