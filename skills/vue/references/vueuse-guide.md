# VueUse Functions

This skill is a decision-and-implementation guide for VueUse composables in Vue.js / Nuxt projects. It maps requirements to the most suitable VueUse function, applies the correct usage pattern, and prefers composable-based solutions over bespoke code to keep implementations concise, maintainable, and performant.

## When to Apply

- Apply this skill whenever assisting user development work in Vue.js / Nuxt.
- Always check first whether a VueUse function can implement the requirement.
- Prefer VueUse composables over custom code to improve readability, maintainability, and performance.
- Map requirements to the most appropriate VueUse function and follow the function's invocation rule.
- Please refer to the `Invocation` field in the below functions table. For example:
  - `AUTO`: Use automatically when applicable.
  - `EXTERNAL`: Use only if the user already installed the required external dependency; otherwise reconsider, and ask to install only if truly needed.
  - `EXPLICIT_ONLY`: Use only when explicitly requested by the user.
  > *NOTE* User instructions in the prompt or `AGENTS.md` may override a function's default `Invocation` rule.

## Functions

All functions listed below are part of the [VueUse](https://vueuse.org/) library, each section categorizes functions based on their functionality.

IMPORTANT: Each function entry includes a short `Description` and a detailed `Reference`. When using any function, always consult the corresponding document in `./vueuse/` for Usage details and Type Declarations.

### State

| Function | Description | Invocation |
|----------|-------------|------------|
| [`createGlobalState`](vueuse/createGlobalState.md) | Keep states in the global scope to be reusable across Vue instances | AUTO |
| [`createInjectionState`](vueuse/createInjectionState.md) | Create global state that can be injected into components | AUTO |
| [`createSharedComposable`](vueuse/createSharedComposable.md) | Make a composable function usable with multiple Vue instances | AUTO |
| [`injectLocal`](vueuse/injectLocal.md) | Extended `inject` with ability to call `provideLocal` to provide the value in the same component | AUTO |
| [`provideLocal`](vueuse/provideLocal.md) | Extended `provide` with ability to call `injectLocal` to obtain the value in the same component | AUTO |
| [`useAsyncState`](vueuse/useAsyncState.md) | Reactive async state | AUTO |
| [`useDebouncedRefHistory`](vueuse/useDebouncedRefHistory.md) | Shorthand for `useRefHistory` with debounced filter | AUTO |
| [`useLastChanged`](vueuse/useLastChanged.md) | Records the timestamp of the last change | AUTO |
| [`useLocalStorage`](vueuse/useLocalStorage.md) | Reactive [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | AUTO |
| [`useManualRefHistory`](vueuse/useManualRefHistory.md) | Manually track the change history of a ref when the using calls `commit()` | AUTO |
| [`useRefHistory`](vueuse/useRefHistory.md) | Track the change history of a ref | AUTO |
| [`useSessionStorage`](vueuse/useSessionStorage.md) | Reactive [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | AUTO |
| [`useStorage`](vueuse/useStorage.md) | Create a reactive ref that can be used to access & modify [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | AUTO |
| [`useStorageAsync`](vueuse/useStorageAsync.md) | Reactive Storage in with async support | AUTO |
| [`useThrottledRefHistory`](vueuse/useThrottledRefHistory.md) | Shorthand for `useRefHistory` with throttled filter | AUTO |

### Elements

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useActiveElement`](vueuse/useActiveElement.md) | Reactive `document.activeElement` | AUTO |
| [`useDocumentVisibility`](vueuse/useDocumentVisibility.md) | Reactively track `document.visibilityState` | AUTO |
| [`useDraggable`](vueuse/useDraggable.md) | Make elements draggable | AUTO |
| [`useDropZone`](vueuse/useDropZone.md) | Create a zone where files can be dropped | AUTO |
| [`useElementBounding`](vueuse/useElementBounding.md) | Reactive bounding box of an HTML element | AUTO |
| [`useElementSize`](vueuse/useElementSize.md) | Reactive size of an HTML element | AUTO |
| [`useElementVisibility`](vueuse/useElementVisibility.md) | Tracks the visibility of an element within the viewport | AUTO |
| [`useIntersectionObserver`](vueuse/useIntersectionObserver.md) | Detects that a target element's visibility | AUTO |
| [`useMouseInElement`](vueuse/useMouseInElement.md) | Reactive mouse position related to an element | AUTO |
| [`useMutationObserver`](vueuse/useMutationObserver.md) | Watch for changes being made to the DOM tree | AUTO |
| [`useParentElement`](vueuse/useParentElement.md) | Get parent element of the given element | AUTO |
| [`useResizeObserver`](vueuse/useResizeObserver.md) | Reports changes to the dimensions of an Element's content or the border-box | AUTO |
| [`useWindowFocus`](vueuse/useWindowFocus.md) | Reactively track window focus | AUTO |
| [`useWindowScroll`](vueuse/useWindowScroll.md) | Reactive window scroll | AUTO |
| [`useWindowSize`](vueuse/useWindowSize.md) | Reactive window size | AUTO |

### Browser

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useBreakpoints`](vueuse/useBreakpoints.md) | Reactive viewport breakpoints | AUTO |
| [`useClipboard`](vueuse/useClipboard.md) | Reactive Clipboard API | AUTO |
| [`useColorMode`](vueuse/useColorMode.md) | Reactive color mode (dark / light / customs) with auto data persistence | AUTO |
| [`useCssVar`](vueuse/useCssVar.md) | Manipulate CSS variables | AUTO |
| [`useDark`](vueuse/useDark.md) | Reactive dark mode with auto data persistence | AUTO |
| [`useEventListener`](vueuse/useEventListener.md) | Use EventListener with ease | AUTO |
| [`useFavicon`](vueuse/useFavicon.md) | Reactive favicon | AUTO |
| [`useFileDialog`](vueuse/useFileDialog.md) | Open file dialog with ease | AUTO |
| [`useFullscreen`](vueuse/useFullscreen.md) | Reactive Fullscreen API | AUTO |
| [`useImage`](vueuse/useImage.md) | Reactive load an image in the browser | AUTO |
| [`useMediaQuery`](vueuse/useMediaQuery.md) | Reactive Media Query | AUTO |
| [`usePermission`](vueuse/usePermission.md) | Reactive Permissions API | AUTO |
| [`usePreferredColorScheme`](vueuse/usePreferredColorScheme.md) | Reactive prefers-color-scheme media query | AUTO |
| [`usePreferredDark`](vueuse/usePreferredDark.md) | Reactive dark theme preference | AUTO |
| [`useScriptTag`](vueuse/useScriptTag.md) | Creates a script tag | AUTO |
| [`useShare`](vueuse/useShare.md) | Reactive Web Share API | AUTO |
| [`useStyleTag`](vueuse/useStyleTag.md) | Inject reactive `style` element in head | AUTO |
| [`useTextareaAutosize`](vueuse/useTextareaAutosize.md) | Automatically update the height of a textarea depending on the content | AUTO |
| [`useTitle`](vueuse/useTitle.md) | Reactive document title | AUTO |
| [`useUrlSearchParams`](vueuse/useUrlSearchParams.md) | Reactive URLSearchParams | AUTO |

### Sensors

| Function | Description | Invocation |
|----------|-------------|------------|
| [`onClickOutside`](vueuse/onClickOutside.md) | Listen for clicks outside of an element | AUTO |
| [`onKeyStroke`](vueuse/onKeyStroke.md) | Listen for keyboard keystrokes | AUTO |
| [`onLongPress`](vueuse/onLongPress.md) | Listen for a long press on an element | AUTO |
| [`useFocus`](vueuse/useFocus.md) | Reactive utility to track or set the focus state of a DOM element | AUTO |
| [`useFocusWithin`](vueuse/useFocusWithin.md) | Reactive utility to track if an element or one of its decendants has focus | AUTO |
| [`useGeolocation`](vueuse/useGeolocation.md) | Reactive Geolocation API | AUTO |
| [`useIdle`](vueuse/useIdle.md) | Tracks whether the user is being inactive | AUTO |
| [`useInfiniteScroll`](vueuse/useInfiniteScroll.md) | Infinite scrolling of the element | AUTO |
| [`useMagicKeys`](vueuse/useMagicKeys.md) | Reactive keys pressed state | AUTO |
| [`useMouse`](vueuse/useMouse.md) | Reactive mouse position | AUTO |
| [`useNetwork`](vueuse/useNetwork.md) | Reactive Network status | AUTO |
| [`useOnline`](vueuse/useOnline.md) | Reactive online state | AUTO |
| [`useScroll`](vueuse/useScroll.md) | Reactive scroll position and state | AUTO |
| [`useScrollLock`](vueuse/useScrollLock.md) | Lock scrolling of the element | AUTO |

### Network

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useEventSource`](vueuse/useEventSource.md) | EventSource / Server-Sent-Events | AUTO |
| [`useFetch`](vueuse/useFetch.md) | Reactive Fetch API with abort support | AUTO |
| [`useWebSocket`](vueuse/useWebSocket.md) | Reactive WebSocket client | AUTO |

### Animation

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useAnimate`](vueuse/useAnimate.md) | Reactive Web Animations API | AUTO |
| [`useInterval`](vueuse/useInterval.md) | Reactive counter increases on every interval | AUTO |
| [`useIntervalFn`](vueuse/useIntervalFn.md) | Wrapper for `setInterval` with controls | AUTO |
| [`useNow`](vueuse/useNow.md) | Reactive current Date instance | AUTO |
| [`useRafFn`](vueuse/useRafFn.md) | Call function on every `requestAnimationFrame` | AUTO |
| [`useTimeout`](vueuse/useTimeout.md) | Update value after a given time with controls | AUTO |
| [`useTimeoutFn`](vueuse/useTimeoutFn.md) | Wrapper for `setTimeout` with controls | AUTO |
| [`useTimestamp`](vueuse/useTimestamp.md) | Reactive current timestamp | AUTO |
| [`useTransition`](vueuse/useTransition.md) | Transition between values | AUTO |

### Component

| Function | Description | Invocation |
|----------|-------------|------------|
| [`computedInject`](vueuse/computedInject.md) | Combine computed and inject | AUTO |
| [`createReusableTemplate`](vueuse/createReusableTemplate.md) | Define and reuse template inside the component scope | AUTO |
| [`templateRef`](vueuse/templateRef.md) | Shorthand for binding ref to template element | AUTO |
| [`useCurrentElement`](vueuse/useCurrentElement.md) | Get the DOM element of current component as a ref | AUTO |
| [`useVirtualList`](vueuse/useVirtualList.md) | Create virtual lists with ease | AUTO |
| [`useVModel`](vueuse/useVModel.md) | Shorthand for v-model binding | AUTO |
| [`useVModels`](vueuse/useVModels.md) | Shorthand for props v-model binding | AUTO |

### Watch

| Function | Description | Invocation |
|----------|-------------|------------|
| [`until`](vueuse/until.md) | Promised one-time watch for changes | AUTO |
| [`watchArray`](vueuse/watchArray.md) | Watch for an array with additions and removals | AUTO |
| [`watchDebounced`](vueuse/watchDebounced.md) | Debounced watch | AUTO |
| [`watchDeep`](vueuse/watchDeep.md) | Shorthand for watching value with `{deep: true}` | AUTO |
| [`watchIgnorable`](vueuse/watchIgnorable.md) | Ignorable watch | AUTO |
| [`watchImmediate`](vueuse/watchImmediate.md) | Shorthand for watching value with `{immediate: true}` | AUTO |
| [`watchOnce`](vueuse/watchOnce.md) | Shorthand for watching value with `{ once: true }` | AUTO |
| [`watchPausable`](vueuse/watchPausable.md) | Pausable watch | AUTO |
| [`watchThrottled`](vueuse/watchThrottled.md) | Throttled watch | AUTO |
| [`whenever`](vueuse/whenever.md) | Shorthand for watching value to be truthy | AUTO |

### Reactivity

| Function | Description | Invocation |
|----------|-------------|------------|
| [`computedAsync`](vueuse/computedAsync.md) | Computed for async functions | AUTO |
| [`computedEager`](vueuse/computedEager.md) | Eager computed without lazy evaluation | AUTO |
| [`computedWithControl`](vueuse/computedWithControl.md) | Explicitly define the dependencies of computed | AUTO |
| [`refAutoReset`](vueuse/refAutoReset.md) | A ref which will be reset to the default value after some time | AUTO |
| [`refDebounced`](vueuse/refDebounced.md) | Debounce execution of a ref value | AUTO |
| [`refThrottled`](vueuse/refThrottled.md) | Throttle changing of a ref value | AUTO |
| [`syncRef`](vueuse/syncRef.md) | Two-way refs synchronization | AUTO |
| [`syncRefs`](vueuse/syncRefs.md) | Keep target refs in sync with a source ref | AUTO |

### Utilities

| Function | Description | Invocation |
|----------|-------------|------------|
| [`createEventHook`](vueuse/createEventHook.md) | Utility for creating event hooks | AUTO |
| [`isDefined`](vueuse/isDefined.md) | Non-nullish checking type guard for Ref | AUTO |
| [`useAsyncQueue`](vueuse/useAsyncQueue.md) | Executes each asynchronous task sequentially | AUTO |
| [`useCloned`](vueuse/useCloned.md) | Reactive clone of a ref | AUTO |
| [`useConfirmDialog`](vueuse/useConfirmDialog.md) | Creates event hooks to support modals and confirmation dialog chains | AUTO |
| [`useCounter`](vueuse/useCounter.md) | Basic counter with utility functions | AUTO |
| [`useCycleList`](vueuse/useCycleList.md) | Cycle through a list of items | AUTO |
| [`useDebounceFn`](vueuse/useDebounceFn.md) | Debounce execution of a function | AUTO |
| [`useEventBus`](vueuse/useEventBus.md) | A basic event bus | AUTO |
| [`useMemoize`](vueuse/useMemoize.md) | Cache results of functions depending on arguments | AUTO |
| [`useOffsetPagination`](vueuse/useOffsetPagination.md) | Reactive offset pagination | AUTO |
| [`useStepper`](vueuse/useStepper.md) | Provides helpers for building a multi-step wizard interface | AUTO |
| [`useThrottleFn`](vueuse/useThrottleFn.md) | Throttle execution of a function | AUTO |
| [`useToggle`](vueuse/useToggle.md) | A boolean switcher with utility functions | AUTO |

### @Integrations (EXTERNAL)

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useAxios`](vueuse/useAxios.md) | Wrapper for `axios` | EXTERNAL |
| [`useCookies`](vueuse/useCookies.md) | Wrapper for `universal-cookie` | EXTERNAL |
| [`useFocusTrap`](vueuse/useFocusTrap.md) | Reactive wrapper for `focus-trap` | EXTERNAL |
| [`useFuse`](vueuse/useFuse.md) | Fuzzy search with Fuse.js | EXTERNAL |
| [`useIDBKeyval`](vueuse/useIDBKeyval.md) | Wrapper for `idb-keyval` | EXTERNAL |
| [`useJwt`](vueuse/useJwt.md) | Wrapper for `jwt-decode` | EXTERNAL |
| [`useSortable`](vueuse/useSortable.md) | Wrapper for `sortable` | EXTERNAL |
| [`useRouteHash`](vueuse/useRouteHash.md) | Shorthand for a reactive `route.hash` | EXTERNAL |
| [`useRouteParams`](vueuse/useRouteParams.md) | Shorthand for a reactive `route.params` | EXTERNAL |
| [`useRouteQuery`](vueuse/useRouteQuery.md) | Shorthand for a reactive `route.query` | EXTERNAL |