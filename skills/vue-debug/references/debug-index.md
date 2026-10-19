<!-- Synced from vuejs-ai/skills@b3c62de:skills/vue-debug-guides/SKILL.md by scripts/sync.mjs. Edit sources.json, not this file. -->

Vue 3 debugging and error handling for runtime issues, warnings, async failures, and hydration bugs.
For development best practices and common gotchas, use `vue-best-practices`.

### Reactivity
- Tracing unexpected re-renders and state updates → See [reactivity-debugging-hooks](guides/reactivity-debugging-hooks.md)
- Ref values not updating due to missing .value access → See [ref-value-access](guides/ref-value-access.md)
- State stops updating after destructuring reactive objects → See [reactive-destructuring](guides/reactive-destructuring.md)
- Refs inside arrays, Maps, or Sets not unwrapping → See [refs-in-collections-need-value](guides/refs-in-collections-need-value.md)
- Nested refs rendering as [object Object] in templates → See [template-ref-unwrapping-top-level](guides/template-ref-unwrapping-top-level.md)
- Reactive proxy identity comparisons always return false → See [reactivity-proxy-identity-hazard](guides/reactivity-proxy-identity-hazard.md)
- Third-party instances breaking when proxied → See [reactivity-markraw-for-non-reactive](guides/reactivity-markraw-for-non-reactive.md)
- Watchers only firing once per tick unexpectedly → See [reactivity-same-tick-batching](guides/reactivity-same-tick-batching.md)

### Computed
- Computed getter triggers mutations or requests unexpectedly → See [computed-no-side-effects](guides/computed-no-side-effects.md)
- Mutating computed values causes changes to disappear → See [computed-return-value-readonly](guides/computed-return-value-readonly.md)
- Computed value never updates after conditional logic → See [computed-conditional-dependencies](guides/computed-conditional-dependencies.md)
- Sorting or reversing arrays breaks original state → See [computed-array-mutation](guides/computed-array-mutation.md)
- Passing parameters to computed properties fails → See [computed-no-parameters](guides/computed-no-parameters.md)

### Watchers
- Async operations overwriting with stale data → See [watch-async-cleanup](guides/watch-async-cleanup.md)
- Creating watchers inside async callbacks → See [watch-async-creation-memory-leak](guides/watch-async-creation-memory-leak.md)
- Watcher never triggers for reactive object properties → See [watch-reactive-property-getter](guides/watch-reactive-property-getter.md)
- Async watchEffect misses dependencies after await → See [watcheffect-async-dependency-tracking](guides/watcheffect-async-dependency-tracking.md)
- DOM reads are stale inside watcher callbacks → See [watch-flush-timing](guides/watch-flush-timing.md)
- Deep watchers report identical old/new values → See [watch-deep-same-object-reference](guides/watch-deep-same-object-reference.md)
- watchEffect runs before template refs update → See [watcheffect-flush-post-for-refs](guides/watcheffect-flush-post-for-refs.md)

### Components
- Child component throws "component not found" error → See [local-components-not-in-descendants](guides/local-components-not-in-descendants.md)
- Click listener doesn't fire on custom component → See [click-events-on-components](guides/click-events-on-components.md)
- Parent can't access child ref data in script setup → See [component-ref-requires-defineexpose](guides/component-ref-requires-defineexpose.md)
- HTML template parsing breaks Vue component syntax → See [in-dom-template-parsing-caveats](guides/in-dom-template-parsing-caveats.md)
- Wrong component renders due to naming collisions → See [component-naming-conflicts](guides/component-naming-conflicts.md)
- Parent styles don't apply to multi-root component → See [multi-root-component-class-attrs](guides/multi-root-component-class-attrs.md)

### Props & Emits
- Variables referenced in defineProps cause errors → See [prop-defineprops-scope-limitation](guides/prop-defineprops-scope-limitation.md)
- Component emits undeclared event causing warnings → See [declare-emits-for-documentation](guides/declare-emits-for-documentation.md)
- defineEmits used inside function or conditional → See [defineEmits-must-be-top-level](guides/defineEmits-must-be-top-level.md)
- defineEmits has both type and runtime arguments → See [defineEmits-no-runtime-and-type-mixed](guides/defineEmits-no-runtime-and-type-mixed.md)
- Native event listeners not responding to clicks → See [native-event-collision-with-emits](guides/native-event-collision-with-emits.md)
- Component event fires twice when clicking → See [undeclared-emits-double-firing](guides/undeclared-emits-double-firing.md)

### Templates
- Getting template compilation errors with statements → See [template-expressions-restrictions](guides/template-expressions-restrictions.md)
- "Cannot read property of undefined" runtime errors → See [v-if-null-check-order](guides/v-if-null-check-order.md)
- Dynamic directive arguments not working properly → See [dynamic-argument-constraints](guides/dynamic-argument-constraints.md)
- v-else elements rendering unconditionally always → See [v-else-must-follow-v-if](guides/v-else-must-follow-v-if.md)
- Mixing v-if with v-for causes precedence bugs and migration breakage → See [no-v-if-with-v-for](guides/no-v-if-with-v-for.md)
- Template function calls mutating state cause unpredictable re-render bugs → See [template-functions-no-side-effects](guides/template-functions-no-side-effects.md)
- Child components in loops showing undefined data → See [v-for-component-props](guides/v-for-component-props.md)
- Array order changing after sorting or reversing → See [v-for-computed-reverse-sort](guides/v-for-computed-reverse-sort.md)
- List items disappearing or swapping state unexpectedly → See [v-for-key-attribute](guides/v-for-key-attribute.md)
- Getting off-by-one errors with range iteration → See [v-for-range-starts-at-one](guides/v-for-range-starts-at-one.md)
- v-show or v-else not working on template elements → See [v-show-template-limitation](guides/v-show-template-limitation.md)

### Template Refs
- Ref becomes null when element is conditionally hidden → See [template-ref-null-with-v-if](guides/template-ref-null-with-v-if.md)
- Ref array indices don't match data array in loops → See [template-ref-v-for-order](guides/template-ref-v-for-order.md)
- Refactoring template ref names breaks silently in code → See [use-template-ref-vue35](guides/use-template-ref-vue35.md)

### Forms & v-model
- Initial form values not showing when using v-model → See [v-model-ignores-html-attributes](guides/v-model-ignores-html-attributes.md)
- Textarea content changes not updating the ref → See [textarea-no-interpolation](guides/textarea-no-interpolation.md)
- iOS users cannot select dropdown first option → See [select-initial-value-ios-bug](guides/select-initial-value-ios-bug.md)
- Parent and child components have different values → See [define-model-default-value-sync](guides/define-model-default-value-sync.md)
- Object property changes not syncing to parent → See [definemodel-object-mutation-no-emit](guides/definemodel-object-mutation-no-emit.md)
- Real-time search/validation broken for Chinese/Japanese input → See [v-model-ime-composition](guides/v-model-ime-composition.md)
- Number input returns empty string instead of zero → See [v-model-number-modifier-behavior](guides/v-model-number-modifier-behavior.md)
- Custom checkbox values not submitted in forms → See [checkbox-true-false-value-form-submission](guides/checkbox-true-false-value-form-submission.md)

### Events & Modifiers
- Chaining multiple event modifiers produces unexpected results → See [event-modifier-order-matters](guides/event-modifier-order-matters.md)
- Keyboard shortcuts don't fire with system modifier keys → See [keyup-modifier-timing](guides/keyup-modifier-timing.md)
- Keyboard shortcuts fire with unintended modifier combinations → See [exact-modifier-for-precise-shortcuts](guides/exact-modifier-for-precise-shortcuts.md)
- Combining passive and prevent modifiers breaks event behavior → See [no-passive-with-prevent](guides/no-passive-with-prevent.md)

### Lifecycle
- Memory leaks from unremoved event listeners → See [cleanup-side-effects](guides/cleanup-side-effects.md)
- DOM access fails before component mounts → See [lifecycle-dom-access-timing](guides/lifecycle-dom-access-timing.md)
- DOM reads return stale values after state changes → See [dom-update-timing-nexttick](guides/dom-update-timing-nexttick.md)
- SSR rendering differs from client hydration → See [lifecycle-ssr-awareness](guides/lifecycle-ssr-awareness.md)
- Lifecycle hooks registered asynchronously never run → See [lifecycle-hooks-synchronous-registration](guides/lifecycle-hooks-synchronous-registration.md)

### Slots
- Accessing child component data in slot content returns undefined values → See [slot-render-scope-parent-only](guides/slot-render-scope-parent-only.md)
- Mixing named and scoped slots together causes compilation errors → See [slot-named-scoped-explicit-default](guides/slot-named-scoped-explicit-default.md)
- Using v-slot on native HTML elements causes compilation errors → See [slot-v-slot-on-components-or-templates-only](guides/slot-v-slot-on-components-or-templates-only.md)
- Unexpected content placement from implicit default slot behavior → See [slot-implicit-default-content](guides/slot-implicit-default-content.md)
- Scoped slot props missing expected name property → See [slot-name-reserved-prop](guides/slot-name-reserved-prop.md)
- Wrapper components breaking child slot functionality → See [slot-forwarding-to-child-components](guides/slot-forwarding-to-child-components.md)

### Provide/Inject
- Calling provide after async operations fails silently → See [provide-inject-synchronous-setup](guides/provide-inject-synchronous-setup.md)
- Tracing where provided values come from → See [provide-inject-debugging-challenges](guides/provide-inject-debugging-challenges.md)
- Injected values not updating when provider changes → See [provide-inject-reactivity-not-automatic](guides/provide-inject-reactivity-not-automatic.md)
- Multiple components share same default object → See [provide-inject-default-value-factory](guides/provide-inject-default-value-factory.md)

### Attrs
- Both internal and fallthrough event handlers execute → See [attrs-event-listener-merging](guides/attrs-event-listener-merging.md)
- Explicit attributes overwritten by fallthrough values → See [fallthrough-attrs-overwrite-vue3](guides/fallthrough-attrs-overwrite-vue3.md)
- Attributes applying to wrong element in wrappers → See [inheritattrs-false-for-wrapper-components](guides/inheritattrs-false-for-wrapper-components.md)

### Composables
- Composable called outside setup context or asynchronously → See [composable-call-location-restrictions](guides/composable-call-location-restrictions.md)
- Composable reactive dependency not updating when input changes → See [composable-tovalue-inside-watcheffect](guides/composable-tovalue-inside-watcheffect.md)
- Composable mutates external state unexpectedly → See [composable-avoid-hidden-side-effects](guides/composable-avoid-hidden-side-effects.md)
- Destructuring composable returns breaks reactivity unexpectedly → See [composable-naming-return-pattern](guides/composable-naming-return-pattern.md)

### Composition API
- Lifecycle hooks failing silently after async operations → See [composition-api-script-setup-async-context](guides/composition-api-script-setup-async-context.md)
- Parent component refs unable to access exposed properties → See [define-expose-before-await](guides/define-expose-before-await.md)
- Functional-programming patterns break expected Vue reactivity behavior → See [composition-api-not-functional-programming](guides/composition-api-not-functional-programming.md)
- React Hook mental model causes incorrect Composition API usage → See [composition-api-vs-react-hooks-differences](guides/composition-api-vs-react-hooks-differences.md)

### Animation
- Animations fail to trigger when DOM nodes are reused → See [animation-key-for-rerender](guides/animation-key-for-rerender.md)
- TransitionGroup list updates feel laggy under load → See [animation-transitiongroup-performance](guides/animation-transitiongroup-performance.md)

### TypeScript
- Mutable prop defaults leak state between component instances → See [ts-withdefaults-mutable-factory-function](guides/ts-withdefaults-mutable-factory-function.md)
- reactive() generic typing causes ref unwrapping mismatches → See [ts-reactive-no-generic-argument](guides/ts-reactive-no-generic-argument.md)
- Template refs throw null access errors before mount or after v-if unmount → See [ts-template-ref-null-handling](guides/ts-template-ref-null-handling.md)
- Optional boolean props behave as false instead of undefined → See [ts-defineprops-boolean-default-false](guides/ts-defineprops-boolean-default-false.md)
- Imported defineProps types fail with unresolvable or complex type references → See [ts-defineprops-imported-types-limitations](guides/ts-defineprops-imported-types-limitations.md)
- Untyped DOM event handlers fail under strict TypeScript settings → See [ts-event-handler-explicit-typing](guides/ts-event-handler-explicit-typing.md)
- Dynamic component refs trigger reactive component warnings → See [ts-shallowref-for-dynamic-components](guides/ts-shallowref-for-dynamic-components.md)
- Union-typed template expressions fail type checks without narrowing → See [ts-template-type-casting](guides/ts-template-type-casting.md)

### Async Components
- Route components misconfigured with defineAsyncComponent lazy loading → See [async-component-vue-router](guides/async-component-vue-router.md)
- Network failures or timeouts loading components → See [async-component-error-handling](guides/async-component-error-handling.md)
- Template refs undefined after component reactivation → See [async-component-keepalive-ref-issue](guides/async-component-keepalive-ref-issue.md)

### Render Functions
- Render function output stays static after state changes → See [rendering-render-function-return-from-setup](guides/rendering-render-function-return-from-setup.md)
- Reused vnode instances render incorrectly → See [render-function-vnodes-must-be-unique](guides/render-function-vnodes-must-be-unique.md)
- String component names render as HTML elements → See [rendering-resolve-component-for-string-names](guides/rendering-resolve-component-for-string-names.md)
- Accessing vnode internals breaks on Vue updates → See [render-function-avoid-internal-vnode-properties](guides/render-function-avoid-internal-vnode-properties.md)
- Vue 2 render function patterns crash in Vue 3 → See [rendering-render-function-h-import-vue3](guides/rendering-render-function-h-import-vue3.md)
- Slot content not rendering from h() → See [rendering-render-function-slots-as-functions](guides/rendering-render-function-slots-as-functions.md)

### KeepAlive
- Child components mount twice with nested Vue Router routes → See [keepalive-router-nested-double-mount](guides/keepalive-router-nested-double-mount.md)
- Memory grows when combining KeepAlive with Transition animations → See [keepalive-transition-memory-leak](guides/keepalive-transition-memory-leak.md)

### Transitions
- JavaScript transition hooks hang without done callback → See [transition-js-hooks-done-callback](guides/transition-js-hooks-done-callback.md)
- Move animations fail on inline list elements → See [transition-group-flip-inline-elements](guides/transition-group-flip-inline-elements.md)
- List items jump instead of smoothly animating → See [transition-group-move-animation-position-absolute](guides/transition-group-move-animation-position-absolute.md)
- Vue 2 to Vue 3 TransitionGroup wrapper changes break layout → See [transition-group-no-default-wrapper-vue3](guides/transition-group-no-default-wrapper-vue3.md)
- Nested transitions cut off before finishing → See [transition-nested-duration](guides/transition-nested-duration.md)
- Scoped styles stop working in reusable transition wrappers → See [transition-reusable-scoped-style](guides/transition-reusable-scoped-style.md)
- RouterView transitions animate unexpectedly on first render → See [transition-router-view-appear](guides/transition-router-view-appear.md)
- Mixing CSS transitions and animations causes timing issues → See [transition-type-when-mixed](guides/transition-type-when-mixed.md)
- Cleanup hooks missed during rapid transition swaps → See [transition-unmount-hook-timing](guides/transition-unmount-hook-timing.md)

### Teleport
- Teleport target element not found in DOM → See [teleport-target-must-exist](guides/teleport-target-must-exist.md)
- Teleported content breaks SSR hydration → See [teleport-ssr-hydration](guides/teleport-ssr-hydration.md)
- Scoped styles not applying to teleported content → See [teleport-scoped-styles-limitation](guides/teleport-scoped-styles-limitation.md)

### Suspense
- Need to handle async errors from Suspense components → See [suspense-no-builtin-error-handling](guides/suspense-no-builtin-error-handling.md)
- Using Suspense with server-side rendering → See [suspense-ssr-hydration-issues](guides/suspense-ssr-hydration-issues.md)
- Async component loading/error UI ignored under Suspense → See [async-component-suspense-control](guides/async-component-suspense-control.md)

### SSR
- HTML differs between server and client renders → See [ssr-hydration-mismatch-causes](guides/ssr-hydration-mismatch-causes.md)
- User state leaks between requests from shared singleton stores → See [state-ssr-cross-request-pollution](guides/state-ssr-cross-request-pollution.md)
- Browser-only APIs crash server rendering in universal code paths → See [ssr-platform-specific-apis](guides/ssr-platform-specific-apis.md)

### Performance
- List children re-render unnecessarily because parent passes unstable props → See [perf-props-stability-update-optimization](guides/perf-props-stability-update-optimization.md)
- Computed objects retrigger effects despite equivalent values → See [perf-computed-object-stability](guides/perf-computed-object-stability.md)

### SFC (Single File Components)
- Trying to use named exports from component script blocks → See [sfc-named-exports-forbidden](guides/sfc-named-exports-forbidden.md)
- Variables not updating in template after changes → See [sfc-script-setup-reactivity](guides/sfc-script-setup-reactivity.md)
- Scoped styles not applying to child component elements → See [sfc-scoped-css-child-component-styling](guides/sfc-scoped-css-child-component-styling.md)
- Scoped styles not applying to dynamic v-html content → See [sfc-scoped-css-dynamic-content](guides/sfc-scoped-css-dynamic-content.md)
- Scoped styles not applying to slot content → See [sfc-scoped-css-slot-content](guides/sfc-scoped-css-slot-content.md)
- Tailwind classes missing when built dynamically → See [tailwind-dynamic-class-generation](guides/tailwind-dynamic-class-generation.md)
- Recursive components not rendering due to name conflicts → See [self-referencing-component-name](guides/self-referencing-component-name.md)

### Plugins
- Debugging why global properties cause naming conflicts → See [plugin-global-properties-sparingly](guides/plugin-global-properties-sparingly.md)
- Plugin not working or inject returns undefined → See [plugin-install-before-mount](guides/plugin-install-before-mount.md)
- Plugin global properties are unavailable in setup-based components → See [plugin-prefer-provide-inject-over-global-properties](guides/plugin-prefer-provide-inject-over-global-properties.md)
- Plugin type augmentation mistakes break ComponentCustomProperties typing → See [plugin-typescript-type-augmentation](guides/plugin-typescript-type-augmentation.md)

### App Configuration
- App configuration methods not working after mount call → See [configure-app-before-mount](guides/configure-app-before-mount.md)
- Chaining app config off mount() fails because mount returns component instance → See [mount-return-value](guides/mount-return-value.md)
- require.context-based component auto-registration fails in Vite → See [dynamic-component-registration-vite](guides/dynamic-component-registration-vite.md)
