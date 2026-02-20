# Vue 3 Best Practices & Gotchas Index

Vue 3 best practices, common gotchas, and performance optimization.

### Reactivity
- Accessing ref() values without .value in scripts → See [ref-value-access](best-practices/ref-value-access.md)
- Destructuring reactive() objects, losing reactivity → See [reactive-destructuring](best-practices/reactive-destructuring.md)
- Choosing between ref() and reactive() for state → See [prefer-ref-over-reactive](best-practices/prefer-ref-over-reactive.md)
- Accessing refs inside arrays and collections → See [refs-in-collections-need-value](best-practices/refs-in-collections-need-value.md)
- Large objects or external library data overhead → See [shallow-ref-for-performance](best-practices/shallow-ref-for-performance.md)
- Using nested refs in template expressions → See [template-ref-unwrapping-top-level](best-practices/template-ref-unwrapping-top-level.md)
- Comparing reactive objects with === operator → See [reactivity-proxy-identity-hazard](best-practices/reactivity-proxy-identity-hazard.md)
- Library instances breaking in reactive state → See [reactivity-markraw-for-non-reactive](best-practices/reactivity-markraw-for-non-reactive.md)
- Expecting watchers to fire for each state change → See [reactivity-same-tick-batching](best-practices/reactivity-same-tick-batching.md)
- Integrating external state management libraries → See [reactivity-external-state-integration](best-practices/reactivity-external-state-integration.md)
- Deriving state with watchEffect instead of computed → See [reactivity-computed-over-watcheffect-mutations](best-practices/reactivity-computed-over-watcheffect-mutations.md)

### Computed
- Computed getter is making API calls or mutations → See [computed-no-side-effects](best-practices/computed-no-side-effects.md)
- Mutating computed values causes lost changes unexpectedly → See [computed-return-value-readonly](best-practices/computed-return-value-readonly.md)
- Computed property doesn't update when expected → See [computed-conditional-dependencies](best-practices/computed-conditional-dependencies.md)
- Sorting or reversing arrays destroys original data → See [computed-array-mutation](best-practices/computed-array-mutation.md)
- Expensive operations running too frequently every render → See [computed-vs-methods-caching](best-practices/computed-vs-methods-caching.md)
- Trying to pass arguments to computed properties → See [computed-no-parameters](best-practices/computed-no-parameters.md)
- Complex conditions bloating inline class bindings → See [computed-properties-for-class-logic](best-practices/computed-properties-for-class-logic.md)

### Watchers
- Need to watch a reactive object property → See [watch-reactive-property-getter](best-practices/watch-reactive-property-getter.md)
- Large nested data structures causing performance issues → See [watch-deep-performance](best-practices/watch-deep-performance.md)
- Dependencies accessed after await not tracking → See [watcheffect-async-dependency-tracking](best-practices/watcheffect-async-dependency-tracking.md)
- Need to access updated DOM in watchers → See [watch-flush-timing](best-practices/watch-flush-timing.md)
- Uncertain whether to use watch or watchEffect → See [watch-vs-watcheffect](best-practices/watch-vs-watcheffect.md)
- Duplicating initial calls and watch callbacks → See [watch-immediate-option](best-practices/watch-immediate-option.md)
- Can't compare old and new values correctly → See [watch-deep-same-object-reference](best-practices/watch-deep-same-object-reference.md)
- Template refs appearing null or stale → See [watcheffect-flush-post-for-refs](best-practices/watcheffect-flush-post-for-refs.md)

### Components
- Prop values being changed from a child component → See [props-are-read-only](best-practices/props-are-read-only.md)
- Grandparent can't listen to grandchild emitted events → See [component-events-dont-bubble](best-practices/component-events-dont-bubble.md)
- Distinguishing Vue components from native elements → See [component-naming-pascalcase](best-practices/component-naming-pascalcase.md)
- Recursive component needs to reference itself → See [self-referencing-component-name](best-practices/self-referencing-component-name.md)
- Bundle includes components that aren't used → See [prefer-local-component-registration](best-practices/prefer-local-component-registration.md)
- Tight coupling through component ref access → See [prefer-props-emit-over-component-refs](best-practices/prefer-props-emit-over-component-refs.md)

### Props & Emits
- Boolean prop not parsing as expected → See [prop-boolean-casting-order](best-practices/prop-boolean-casting-order.md)
- Composable doesn't update when props change → See [prop-composable-reactivity-loss](best-practices/prop-composable-reactivity-loss.md)
- Destructured props not updating watchers → See [prop-destructured-watch-getter](best-practices/prop-destructured-watch-getter.md)
- Prop validation needs component instance data → See [prop-validation-before-instance](best-practices/prop-validation-before-instance.md)
- Event name inconsistency in templates and scripts → See [emit-kebab-case-in-templates](best-practices/emit-kebab-case-in-templates.md)
- Event payloads need validation during development → See [emit-validation-for-complex-payloads](best-practices/emit-validation-for-complex-payloads.md)

### Templates
- Rendering untrusted user content as HTML → See [v-html-xss-security](best-practices/v-html-xss-security.md)
- Filtering or conditionally hiding list items → See [no-v-if-with-v-for](best-practices/no-v-if-with-v-for.md)
- Functions in templates modifying data unexpectedly → See [template-functions-no-side-effects](best-practices/template-functions-no-side-effects.md)
- Performance issues with filtered or sorted lists → See [v-for-use-computed-for-filtering](best-practices/v-for-use-computed-for-filtering.md)
- Deciding between v-if and v-show for conditionals → See [v-if-vs-v-show-performance](best-practices/v-if-vs-v-show-performance.md)

### Forms & v-model
- Need to handle v-model modifiers in child → See [definemodel-hidden-modifier-props](best-practices/definemodel-hidden-modifier-props.md)
- Need to use updated value immediately after change → See [definemodel-value-next-tick](best-practices/definemodel-value-next-tick.md)
- Migrating Vue 2 components to Vue 3 → See [v-model-vue3-breaking-changes](best-practices/v-model-vue3-breaking-changes.md)

### Events & Modifiers
- Need to handle same event only one time → See [event-once-modifier-for-single-use](best-practices/event-once-modifier-for-single-use.md)
- Keyboard shortcuts fire with unintended modifier combinations → See [exact-modifier-for-precise-shortcuts](best-practices/exact-modifier-for-precise-shortcuts.md)
- Using left-handed mouse or non-standard input devices → See [mouse-button-modifiers-intent](best-practices/mouse-button-modifiers-intent.md)
- Preventing default browser action and scroll performance together → See [no-passive-with-prevent](best-practices/no-passive-with-prevent.md)

### Lifecycle
- Lifecycle hooks don't execute asynchronously → See [lifecycle-hooks-synchronous-registration](best-practices/lifecycle-hooks-synchronous-registration.md)
- Expensive operations slow performance drastically → See [updated-hook-performance](best-practices/updated-hook-performance.md)

### Slots
- Accessing child component data in slot content → See [slot-render-scope-parent-only](best-practices/slot-render-scope-parent-only.md)
- Mixing named and scoped slots together → See [slot-named-scoped-explicit-default](best-practices/slot-named-scoped-explicit-default.md)
- Using v-slot on native HTML elements → See [slot-v-slot-on-components-or-templates-only](best-practices/slot-v-slot-on-components-or-templates-only.md)
- Empty wrapper elements rendering unnecessarily → See [slot-conditional-rendering-with-slots](best-practices/slot-conditional-rendering-with-slots.md)
- Scoped slot props lack TypeScript type safety → See [slot-define-slots-for-typescript](best-practices/slot-define-slots-for-typescript.md)
- Rendering empty component slots without defaults → See [slot-fallback-content-default-values](best-practices/slot-fallback-content-default-values.md)
- Confused about which slot content goes where → See [slot-implicit-default-content](best-practices/slot-implicit-default-content.md)
- Expecting name property in scoped slot props → See [slot-name-reserved-prop](best-practices/slot-name-reserved-prop.md)
- Choosing between renderless components and composables → See [slot-renderless-components-vs-composables](best-practices/slot-renderless-components-vs-composables.md)

### Provide/Inject
- String keys collide in large applications → See [provide-inject-symbol-keys](best-practices/provide-inject-symbol-keys.md)
- State mutations scattered across components → See [provide-inject-mutations-in-provider](best-practices/provide-inject-mutations-in-provider.md)
- Passing props through many component layers → See [avoid-prop-drilling-use-provide-inject](best-practices/avoid-prop-drilling-use-provide-inject.md)

### Attrs
- Accessing hyphenated attributes in JavaScript code → See [attrs-hyphenated-property-access](best-practices/attrs-hyphenated-property-access.md)
- Watching fallthrough attributes for changes with watch() → See [attrs-not-reactive](best-practices/attrs-not-reactive.md)

### Composables
- Composable has unexpected side effects affecting external state → See [composable-avoid-hidden-side-effects](best-practices/composable-avoid-hidden-side-effects.md)
- Building complex logic from smaller focused composables → See [composable-composition-pattern](best-practices/composable-composition-pattern.md)
- Inconsistent composable names or destructuring loses reactivity → See [composable-naming-return-pattern](best-practices/composable-naming-return-pattern.md)
- Composable has many optional parameters or confusing argument order → See [composable-options-object-pattern](best-practices/composable-options-object-pattern.md)
- Need to prevent uncontrolled mutations of composable state → See [composable-readonly-state](best-practices/composable-readonly-state.md)
- Unsure whether logic belongs in composable or utility function → See [composable-vs-utility-functions](best-practices/composable-vs-utility-functions.md)

### Composition API
- Optimizing production bundle size and performance → See [composition-api-bundle-size-minification](best-practices/composition-api-bundle-size-minification.md)
- Composition API code becoming scattered and hard to maintain → See [composition-api-code-organization](best-practices/composition-api-code-organization.md)
- Fixing naming conflicts and unclear data origins in mixins → See [composition-api-mixins-replacement](best-practices/composition-api-mixins-replacement.md)
- Applying functional patterns incorrectly to Vue state → See [composition-api-not-functional-programming](best-practices/composition-api-not-functional-programming.md)
- Gradually migrating large Options API codebase → See [composition-api-options-api-coexistence](best-practices/composition-api-options-api-coexistence.md)
- Coming from React, over-engineering Vue patterns unnecessarily → See [composition-api-vs-react-hooks-differences](best-practices/composition-api-vs-react-hooks-differences.md)

### Directives
- Storing state across directive hooks → See [directive-arguments-read-only](best-practices/directive-arguments-read-only.md)
- Applying custom directives to Vue components → See [directive-avoid-on-components](best-practices/directive-avoid-on-components.md)
- Creating intervals or event listeners in directives → See [directive-cleanup-in-unmounted](best-practices/directive-cleanup-in-unmounted.md)
- Simplifying directives with identical behavior → See [directive-function-shorthand](best-practices/directive-function-shorthand.md)
- Using custom directives in script setup → See [directive-naming-v-prefix](best-practices/directive-naming-v-prefix.md)
- Choosing between custom and built-in directives → See [directive-prefer-declarative-templating](best-practices/directive-prefer-declarative-templating.md)
- Deciding between directives and components → See [directive-vs-component-decision](best-practices/directive-vs-component-decision.md)
- Migrating Vue 2 directives to Vue 3 → See [directive-vue2-migration-hooks](best-practices/directive-vue2-migration-hooks.md)

### Transitions
- Wrapping multiple elements or components in transitions → See [transition-single-element-slot](best-practices/transition-single-element-slot.md)
- Transitioning between same element types without animation → See [transition-key-for-same-element](best-practices/transition-key-for-same-element.md)
- Using JavaScript animations without calling done callback → See [transition-js-hooks-done-callback](best-practices/transition-js-hooks-done-callback.md)
- Animating lists with TransitionGroup without unique keys → See [transition-group-key-requirement](best-practices/transition-group-key-requirement.md)
- Performance problems with janky list animations → See [transition-animate-transform-opacity](best-practices/transition-animate-transform-opacity.md)
- Move animations failing on inline list elements → See [transition-group-flip-inline-elements](best-practices/transition-group-flip-inline-elements.md)
- List items jumping instead of smoothly animating → See [transition-group-move-animation-position-absolute](best-practices/transition-group-move-animation-position-absolute.md)
- Vue 2 to Vue 3 transition layout breaks unexpectedly → See [transition-group-no-default-wrapper-vue3](best-practices/transition-group-no-default-wrapper-vue3.md)
- Trying to sequence list animations with mode prop → See [transition-group-no-mode-prop](best-practices/transition-group-no-mode-prop.md)
- Creating cascading delays for list item animations → See [transition-group-staggered-animations](best-practices/transition-group-staggered-animations.md)
- Overlapping elements or layout jumping during transitions → See [transition-mode-out-in](best-practices/transition-mode-out-in.md)
- Nested transition animations cutting off prematurely → See [transition-nested-duration](best-practices/transition-nested-duration.md)
- Reusable transition components with scoped styles breaking → See [transition-reusable-scoped-style](best-practices/transition-reusable-scoped-style.md)
- RouterView transitions unexpectedly animating on page load → See [transition-router-view-appear](best-practices/transition-router-view-appear.md)
- Mixing CSS transitions and animations causing timing issues → See [transition-type-when-mixed](best-practices/transition-type-when-mixed.md)
- Component cleanup not firing during fast transition replacements → See [transition-unmount-hook-timing](best-practices/transition-unmount-hook-timing.md)

### Animation
- Need to animate elements staying in DOM → See [animation-class-based-technique](best-practices/animation-class-based-technique.md)
- Animations not triggering on content changes → See [animation-key-for-rerender](best-practices/animation-key-for-rerender.md)
- Building interactive animations with user input → See [animation-state-driven-technique](best-practices/animation-state-driven-technique.md)
- Animating list changes causing noticeable lag → See [animation-transitiongroup-performance](best-practices/animation-transitiongroup-performance.md)

### KeepAlive
- Using KeepAlive without proper cache limits or cleanup → See [keepalive-memory-management](best-practices/keepalive-memory-management.md)
- KeepAlive include/exclude props not matching → See [keepalive-component-name-requirement](best-practices/keepalive-component-name-requirement.md)
- Need to programmatically remove component from cache → See [keepalive-no-cache-removal-vue3](best-practices/keepalive-no-cache-removal-vue3.md)
- Users see stale cached content → See [keepalive-router-fresh-vs-cached](best-practices/keepalive-router-fresh-vs-cached.md)
- Child components mount twice with nested routes → See [keepalive-router-nested-double-mount](best-practices/keepalive-router-nested-double-mount.md)
- Memory grows with KeepAlive + Transition → See [keepalive-transition-memory-leak](best-practices/keepalive-transition-memory-leak.md)
- Dynamic component state resets → See [dynamic-components-with-keepalive](best-practices/dynamic-components-with-keepalive.md)

### Async Components
- Setting up Vue Router route component loading → See [async-component-vue-router](best-practices/async-component-vue-router.md)
- Async component options ignored by parent Suspense → See [async-component-suspense-control](best-practices/async-component-suspense-control.md)
- Improving Time to Interactive with SSR apps → See [async-component-hydration-strategies](best-practices/async-component-hydration-strategies.md)
- Loading spinner flashing on fast networks → See [async-component-loading-delay](best-practices/async-component-loading-delay.md)

### Render Functions
- Render function from setup doesn't update reactively → See [rendering-render-function-return-from-setup](best-practices/rendering-render-function-return-from-setup.md)
- Same vnode appearing multiple times in tree → See [render-function-vnodes-must-be-unique](best-practices/render-function-vnodes-must-be-unique.md)
- Rendering lists in render functions without keys → See [render-function-v-for-keys-required](best-practices/render-function-v-for-keys-required.md)
- Implementing .stop, .prevent in render functions → See [render-function-event-modifiers](best-practices/render-function-event-modifiers.md)
- Two-way binding on components in render functions → See [render-function-v-model-implementation](best-practices/render-function-v-model-implementation.md)
- Using string names for components → See [rendering-resolve-component-for-string-names](best-practices/rendering-resolve-component-for-string-names.md)
- Accessing vnode internals → See [render-function-avoid-internal-vnode-properties](best-practices/render-function-avoid-internal-vnode-properties.md)
- Creating simple stateless presentational components → See [render-function-functional-components](best-practices/render-function-functional-components.md)
- Applying custom directives in render functions → See [render-function-custom-directives](best-practices/render-function-custom-directives.md)
- Excessive rerenders from watchers → See [rendering-excessive-rerenders-watch-vs-computed](best-practices/rendering-excessive-rerenders-watch-vs-computed.md)
- Choosing render functions over templates → See [rendering-prefer-templates-over-render-functions](best-practices/rendering-prefer-templates-over-render-functions.md)
- Migrating Vue 2 render functions to Vue 3 → See [rendering-render-function-h-import-vue3](best-practices/rendering-render-function-h-import-vue3.md)
- Passing slot content to h() incorrectly → See [rendering-render-function-slots-as-functions](best-practices/rendering-render-function-slots-as-functions.md)
- Understanding Vue's vdom optimization blocks → See [rendering-understand-vdom-block-structure](best-practices/rendering-understand-vdom-block-structure.md)

### Teleport
- Modal breaks with parent CSS transforms → See [teleport-css-positioning-issues](best-practices/teleport-css-positioning-issues.md)
- Content needs different layout on mobile → See [teleport-disabled-for-responsive](best-practices/teleport-disabled-for-responsive.md)
- Unsure if props/events work through teleport → See [teleport-logical-hierarchy-preserved](best-practices/teleport-logical-hierarchy-preserved.md)
- Multiple modals targeting same container → See [teleport-multiple-to-same-target](best-practices/teleport-multiple-to-same-target.md)
- Scoped styles not applying to teleported content → See [teleport-scoped-styles-limitation](best-practices/teleport-scoped-styles-limitation.md)

### Suspense
- Want to track Suspense loading states → See [suspense-events-for-state-tracking](best-practices/suspense-events-for-state-tracking.md)
- Planning Suspense usage in production → See [suspense-experimental-api-stability](best-practices/suspense-experimental-api-stability.md)
- Fallback not showing when content changes → See [suspense-fallback-not-immediate-on-revert](best-practices/suspense-fallback-not-immediate-on-revert.md)
- Nesting Suspense components → See [suspense-nested-suspensible-prop](best-practices/suspense-nested-suspensible-prop.md)
- Combining Suspense with Router, Transition, KeepAlive → See [suspense-nesting-order-with-router](best-practices/suspense-nesting-order-with-router.md)
- Nested async component not showing loading → See [suspense-revert-only-on-root-change](best-practices/suspense-revert-only-on-root-change.md)
- Multiple async components in single Suspense → See [suspense-single-child-requirement](best-practices/suspense-single-child-requirement.md)

### TypeScript
- Declaring props with TypeScript → See [ts-defineprops-type-based-declaration](best-practices/ts-defineprops-type-based-declaration.md)
- Providing default values to mutable prop types → See [ts-withdefaults-mutable-factory-function](best-practices/ts-withdefaults-mutable-factory-function.md)
- Typing reactive state with ref unwrapping → See [ts-reactive-no-generic-argument](best-practices/ts-reactive-no-generic-argument.md)
- Accessing DOM elements after component mounts → See [ts-template-ref-null-handling](best-practices/ts-template-ref-null-handling.md)
- Typing refs to child Vue components → See [ts-component-ref-typeof-instancetype](best-practices/ts-component-ref-typeof-instancetype.md)
- Using custom directives with TypeScript → See [ts-custom-directive-type-augmentation](best-practices/ts-custom-directive-type-augmentation.md)
- Declaring component events with type safety → See [ts-defineemits-type-based-syntax](best-practices/ts-defineemits-type-based-syntax.md)
- Handling optional boolean props → See [ts-defineprops-boolean-default-false](best-practices/ts-defineprops-boolean-default-false.md)
- Using imported types in defineProps → See [ts-defineprops-imported-types-limitations](best-practices/ts-defineprops-imported-types-limitations.md)
- Handling DOM events with strict TypeScript → See [ts-event-handler-explicit-typing](best-practices/ts-event-handler-explicit-typing.md)
- Sharing data between components with type safety → See [ts-provide-inject-injection-key](best-practices/ts-provide-inject-injection-key.md)
- Storing Vue components in reactive state → See [ts-shallowref-for-dynamic-components](best-practices/ts-shallowref-for-dynamic-components.md)
- Working with union types in Vue templates → See [ts-template-type-casting](best-practices/ts-template-type-casting.md)

### SSR
- User data leaking between server requests → See [state-ssr-cross-request-pollution](best-practices/state-ssr-cross-request-pollution.md)
- Code runs on both server and browser → See [ssr-platform-specific-apis](best-practices/ssr-platform-specific-apis.md)
- Custom directives not displaying on server → See [ssr-custom-directive-getssrprops](best-practices/ssr-custom-directive-getssrprops.md)

### Performance
- Many list items re-rendering unnecessarily → See [perf-props-stability-update-optimization](best-practices/perf-props-stability-update-optimization.md)
- Rendering hundreds of items causing DOM issues → See [perf-virtualize-large-lists](best-practices/perf-virtualize-large-lists.md)
- Static content re-evaluated on every update → See [perf-v-once-v-memo-directives](best-practices/perf-v-once-v-memo-directives.md)
- List performance degrading from nested components → See [perf-avoid-component-abstraction-in-lists](best-practices/perf-avoid-component-abstraction-in-lists.md)
- Computed properties returning objects triggering effects → See [perf-computed-object-stability](best-practices/perf-computed-object-stability.md)
- Page load suffering from client-side JS delay → See [perf-ssr-ssg-for-page-load](best-practices/perf-ssr-ssg-for-page-load.md)

### SFC (Single File Components)
- Starting a Vue project with a build setup → See [sfc-recommended-for-build-projects](best-practices/sfc-recommended-for-build-projects.md)
- Styling child component elements with scoped CSS → See [sfc-scoped-css-child-component-styling](best-practices/sfc-scoped-css-child-component-styling.md)
- Styling content added dynamically with v-html → See [sfc-scoped-css-dynamic-content](best-practices/sfc-scoped-css-dynamic-content.md)
- Optimizing scoped CSS selector performance → See [sfc-scoped-css-performance](best-practices/sfc-scoped-css-performance.md)
- Styling content passed through component slots → See [sfc-scoped-css-slot-content](best-practices/sfc-scoped-css-slot-content.md)
- Organizing component template, logic, and styles → See [sfc-separation-of-concerns-colocate](best-practices/sfc-separation-of-concerns-colocate.md)
- Binding inline styles with property names → See [style-binding-camelcase](best-practices/style-binding-camelcase.md)
- Building Tailwind classes with string concatenation → See [tailwind-dynamic-class-generation](best-practices/tailwind-dynamic-class-generation.md)

### Plugins
- Global properties not available in setup function → See [plugin-prefer-provide-inject-over-global-properties](best-practices/plugin-prefer-provide-inject-over-global-properties.md)
- Creating a new Vue plugin from scratch → See [plugin-structure-install-method](best-practices/plugin-structure-install-method.md)
- Preventing collisions between multiple plugins → See [plugin-symbol-injection-keys](best-practices/plugin-symbol-injection-keys.md)
- Global properties missing TypeScript autocomplete → See [plugin-typescript-type-augmentation](best-practices/plugin-typescript-type-augmentation.md)

### App Configuration
- Need to chain app configuration methods after mount → See [mount-return-value](best-practices/mount-return-value.md)
- Vue only controlling specific page sections → See [multiple-app-instances](best-practices/multiple-app-instances.md)
- Migrating dynamic component registration to Vite → See [dynamic-component-registration-vite](best-practices/dynamic-component-registration-vite.md)