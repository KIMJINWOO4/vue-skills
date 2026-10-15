<!-- Synced from vueuse/skills@004812b:skills/vueuse-functions/SKILL.md by scripts/sync.mjs. Edit sources.json, not this file. -->

# VueUse Functions

This skill is a decision-and-implementation guide for VueUse composables in Vue.js / Nuxt projects. It maps requirements to the most suitable VueUse function, applies the correct usage pattern, and prefers composable-based solutions over bespoke code to keep implementations concise, maintainable, and performant.

## When to Apply

- Apply this skill whenever assisting user development work in Vue.js / Nuxt.
- Always check first whether a VueUse function can implement the requirement.
- Prefer VueUse composables over custom code to improve readability, maintainability, and performance.
- Map requirements to the most appropriate VueUse function and follow the function’s invocation rule.
- Please refer to the `Invocation` field in the below functions table. For example:
  - `AUTO`: Use automatically when applicable.
  - `EXTERNAL`: Use only if the user already installed the required external dependency; otherwise reconsider, and ask to install only if truly needed.
  - `EXPLICIT_ONLY`: Use only when explicitly requested by the user.
  > *NOTE* User instructions in the prompt or `AGENTS.md` may override a function’s default `Invocation` rule.

## Functions

All functions listed below are part of the [VueUse](https://vueuse.org/) library, each section categorizes functions based on their functionality.

IMPORTANT: Each function entry includes a short `Description` and a detailed `Reference`. When using any function, always consult the corresponding document in `./references` for Usage details and Type Declarations.

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
| [`useManualRefHistory`](vueuse/useManualRefHistory.md) | Manually track the change history of a ref when the user calls `commit()` | AUTO |
| [`useRefHistory`](vueuse/useRefHistory.md) | Track the change history of a ref | AUTO |
| [`useSessionStorage`](vueuse/useSessionStorage.md) | Reactive [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | AUTO |
| [`useStorage`](vueuse/useStorage.md) | Create a reactive ref that can be used to access & modify [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | AUTO |
| [`useStorageAsync`](vueuse/useStorageAsync.md) | Reactive Storage with async support | AUTO |
| [`useThrottledRefHistory`](vueuse/useThrottledRefHistory.md) | Shorthand for `useRefHistory` with throttled filter | AUTO |

### Elements

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useActiveElement`](vueuse/useActiveElement.md) | Reactive `document.activeElement` | AUTO |
| [`useDocumentVisibility`](vueuse/useDocumentVisibility.md) | Reactively track [`document.visibilityState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState) | AUTO |
| [`useDraggable`](vueuse/useDraggable.md) | Make elements draggable | AUTO |
| [`useDropZone`](vueuse/useDropZone.md) | Create a zone where files can be dropped | AUTO |
| [`useElementBounding`](vueuse/useElementBounding.md) | Reactive [bounding box](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of an HTML element | AUTO |
| [`useElementOverflow`](vueuse/useElementOverflow.md) | Reactive element's overflow state | AUTO |
| [`useElementSize`](vueuse/useElementSize.md) | Reactive size of an HTML element | AUTO |
| [`useElementVisibility`](vueuse/useElementVisibility.md) | Tracks the visibility of an element within the viewport | AUTO |
| [`useIntersectionObserver`](vueuse/useIntersectionObserver.md) | Detects changes to a target element's visibility | AUTO |
| [`useMouseInElement`](vueuse/useMouseInElement.md) | Reactive mouse position related to an element | AUTO |
| [`useMutationObserver`](vueuse/useMutationObserver.md) | Watch for changes being made to the DOM tree | AUTO |
| [`useParentElement`](vueuse/useParentElement.md) | Get parent element of the given element | AUTO |
| [`useResizeObserver`](vueuse/useResizeObserver.md) | Reports changes to the dimensions of an Element's content or the border-box | AUTO |
| [`useWindowFocus`](vueuse/useWindowFocus.md) | Reactively track window focus with `window.onfocus` and `window.onblur` events | AUTO |
| [`useWindowScroll`](vueuse/useWindowScroll.md) | Reactive window scroll | AUTO |
| [`useWindowSize`](vueuse/useWindowSize.md) | Reactive window size | AUTO |

### Browser

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useBluetooth`](vueuse/useBluetooth.md) | Reactive [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) | AUTO |
| [`useBreakpoints`](vueuse/useBreakpoints.md) | Reactive viewport breakpoints | AUTO |
| [`useBroadcastChannel`](vueuse/useBroadcastChannel.md) | Reactive [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) | AUTO |
| [`useBrowserLocation`](vueuse/useBrowserLocation.md) | Reactive browser location | AUTO |
| [`useClipboard`](vueuse/useClipboard.md) | Reactive [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) | AUTO |
| [`useClipboardItems`](vueuse/useClipboardItems.md) | Reactive [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) | AUTO |
| [`useColorMode`](vueuse/useColorMode.md) | Reactive color mode (dark / light / customs) with auto data persistence | AUTO |
| [`useCssSupports`](vueuse/useCssSupports.md) | SSR compatible and reactive [`CSS.supports`](https://developer.mozilla.org/docs/Web/API/CSS/supports_static) | AUTO |
| [`useCssVar`](vueuse/useCssVar.md) | Manipulate CSS variables | AUTO |
| [`useDark`](vueuse/useDark.md) | Reactive dark mode with auto data persistence | AUTO |
| [`useEventListener`](vueuse/useEventListener.md) | Use EventListener with ease | AUTO |
| [`useEyeDropper`](vueuse/useEyeDropper.md) | Reactive [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API) | AUTO |
| [`useFavicon`](vueuse/useFavicon.md) | Reactive favicon | AUTO |
| [`useFileDialog`](vueuse/useFileDialog.md) | Open file dialog with ease | AUTO |
| [`useFileSystemAccess`](vueuse/useFileSystemAccess.md) | Create and read and write local files with [FileSystemAccessAPI](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) | AUTO |
| [`useFullscreen`](vueuse/useFullscreen.md) | Reactive [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) | AUTO |
| [`useGamepad`](vueuse/useGamepad.md) | Provides reactive bindings for the [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) | AUTO |
| [`useImage`](vueuse/useImage.md) | Reactive load an image in the browser | AUTO |
| [`useLiveAnnouncer`](vueuse/useLiveAnnouncer.md) | Accessible way to announce messages to screen reader users (ARIA live regions) | AUTO |
| [`useMediaControls`](vueuse/useMediaControls.md) | Reactive media controls for both `audio` and `video` elements | AUTO |
| [`useMediaQuery`](vueuse/useMediaQuery.md) | Reactive [Media Query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries) | AUTO |
| [`useMemory`](vueuse/useMemory.md) | Reactive Memory Info | AUTO |
| [`useObjectUrl`](vueuse/useObjectUrl.md) | Reactive URL representing an object | AUTO |
| [`usePerformanceObserver`](vueuse/usePerformanceObserver.md) | Observe performance metrics | AUTO |
| [`usePermission`](vueuse/usePermission.md) | Reactive [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) | AUTO |
| [`usePreferredColorScheme`](vueuse/usePreferredColorScheme.md) | Reactive [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query | AUTO |
| [`usePreferredContrast`](vueuse/usePreferredContrast.md) | Reactive [prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) media query | AUTO |
| [`usePreferredDark`](vueuse/usePreferredDark.md) | Reactive dark theme preference | AUTO |
| [`usePreferredLanguages`](vueuse/usePreferredLanguages.md) | Reactive [Navigator Languages](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/languages) | AUTO |
| [`usePreferredReducedMotion`](vueuse/usePreferredReducedMotion.md) | Reactive [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query | AUTO |
| [`usePreferredReducedTransparency`](vueuse/usePreferredReducedTransparency.md) | Reactive [prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency) media query | AUTO |
| [`useScreenOrientation`](vueuse/useScreenOrientation.md) | Reactive [Screen Orientation API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Orientation_API) | AUTO |
| [`useScreenSafeArea`](vueuse/useScreenSafeArea.md) | Reactive `env(safe-area-inset-*)` | AUTO |
| [`useScriptTag`](vueuse/useScriptTag.md) | Creates a script tag | AUTO |
| [`useShare`](vueuse/useShare.md) | Reactive [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) | AUTO |
| [`useSSRWidth`](vueuse/useSSRWidth.md) | Used to set a global viewport width which will be used when rendering SSR components that rely on the viewport width like [`useMediaQuery`](vueuse/useMediaQuery.md) or [`useBreakpoints`](vueuse/useBreakpoints.md) | AUTO |
| [`useStyleTag`](vueuse/useStyleTag.md) | Inject reactive `style` element in head | AUTO |
| [`useTextareaAutosize`](vueuse/useTextareaAutosize.md) | Automatically update the height of a textarea depending on the content | AUTO |
| [`useTextDirection`](vueuse/useTextDirection.md) | Reactive [dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) of the element's text | AUTO |
| [`useTitle`](vueuse/useTitle.md) | Reactive document title | AUTO |
| [`useUrlSearchParams`](vueuse/useUrlSearchParams.md) | Reactive [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) | AUTO |
| [`useVibrate`](vueuse/useVibrate.md) | Reactive [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API) | AUTO |
| [`useWakeLock`](vueuse/useWakeLock.md) | Reactive [Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API) | AUTO |
| [`useWebMCP`](vueuse/useWebMCP.md) | Register a [WebMCP](https://github.com/webmachinelearning/webmcp) tool and tie its lifecycle to the current Vue scope | AUTO |
| [`useWebNotification`](vueuse/useWebNotification.md) | Reactive [Notification](https://developer.mozilla.org/en-US/docs/Web/API/notification) | AUTO |
| [`useWebWorker`](vueuse/useWebWorker.md) | Simple [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) registration and communication | AUTO |
| [`useWebWorkerFn`](vueuse/useWebWorkerFn.md) | Run expensive functions without blocking the UI | AUTO |

### Sensors

| Function | Description | Invocation |
|----------|-------------|------------|
| [`onClickOutside`](vueuse/onClickOutside.md) | Listen for clicks outside of an element | AUTO |
| [`onElementRemoval`](vueuse/onElementRemoval.md) | Fires when the element or any element containing it is removed from the DOM | AUTO |
| [`onKeyStroke`](vueuse/onKeyStroke.md) | Listen for keyboard keystrokes | AUTO |
| [`onLongPress`](vueuse/onLongPress.md) | Listen for a long press on an element | AUTO |
| [`onStartTyping`](vueuse/onStartTyping.md) | Fires when users start typing on non-editable elements | AUTO |
| [`useBattery`](vueuse/useBattery.md) | Reactive [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API) | AUTO |
| [`useDeviceMotion`](vueuse/useDeviceMotion.md) | Reactive [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent) | AUTO |
| [`useDeviceOrientation`](vueuse/useDeviceOrientation.md) | Reactive [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent) | AUTO |
| [`useDevicePixelRatio`](vueuse/useDevicePixelRatio.md) | Reactively track [`window.devicePixelRatio`](https://developer.mozilla.org/docs/Web/API/Window/devicePixelRatio) | AUTO |
| [`useDevicesList`](vueuse/useDevicesList.md) | Reactive [enumerateDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices) listing available input/output devices | AUTO |
| [`useDisplayMedia`](vueuse/useDisplayMedia.md) | Reactive [`mediaDevices.getDisplayMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) streaming | AUTO |
| [`useElementByPoint`](vueuse/useElementByPoint.md) | Reactive element by point | AUTO |
| [`useElementHover`](vueuse/useElementHover.md) | Reactive element's hover state | AUTO |
| [`useFocus`](vueuse/useFocus.md) | Reactive utility to track or set the focus state of a DOM element | AUTO |
| [`useFocusWithin`](vueuse/useFocusWithin.md) | Reactive utility to track if an element or one of its descendants has focus | AUTO |
| [`useFps`](vueuse/useFps.md) | Reactive FPS (frames per second) | AUTO |
| [`useGeolocation`](vueuse/useGeolocation.md) | Reactive [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) | AUTO |
| [`useIdle`](vueuse/useIdle.md) | Tracks whether the user is being inactive | AUTO |
| [`useInfiniteScroll`](vueuse/useInfiniteScroll.md) | Infinite scrolling of the element | AUTO |
| [`useKeyModifier`](vueuse/useKeyModifier.md) | Reactive [Modifier State](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState) | AUTO |
| [`useMagicKeys`](vueuse/useMagicKeys.md) | Reactive keys pressed state | AUTO |
| [`useMouse`](vueuse/useMouse.md) | Reactive mouse position | AUTO |
| [`useMousePressed`](vueuse/useMousePressed.md) | Reactive mouse pressing state | AUTO |
| [`useNavigatorLanguage`](vueuse/useNavigatorLanguage.md) | Reactive [navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language) | AUTO |
| [`useNetwork`](vueuse/useNetwork.md) | Reactive [Network status](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) | AUTO |
| [`useOnline`](vueuse/useOnline.md) | Reactive online state | AUTO |
| [`usePageLeave`](vueuse/usePageLeave.md) | Reactive state to show whether the mouse leaves the page | AUTO |
| [`useParallax`](vueuse/useParallax.md) | Create parallax effect easily | AUTO |
| [`usePointer`](vueuse/usePointer.md) | Reactive [pointer state](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) | AUTO |
| [`usePointerLock`](vueuse/usePointerLock.md) | Reactive [pointer lock](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) | AUTO |
| [`usePointerSwipe`](vueuse/usePointerSwipe.md) | Reactive swipe detection based on [PointerEvents](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) | AUTO |
| [`useScroll`](vueuse/useScroll.md) | Reactive scroll position and state | AUTO |
| [`useScrollLock`](vueuse/useScrollLock.md) | Lock scrolling of the element | AUTO |
| [`useSpeechRecognition`](vueuse/useSpeechRecognition.md) | Reactive [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) | AUTO |
| [`useSpeechSynthesis`](vueuse/useSpeechSynthesis.md) | Reactive [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) | AUTO |
| [`useSwipe`](vueuse/useSwipe.md) | Reactive swipe detection based on [`TouchEvents`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) | AUTO |
| [`useTextSelection`](vueuse/useTextSelection.md) | Reactively track user text selection based on [`Window.getSelection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection) | AUTO |
| [`useUserMedia`](vueuse/useUserMedia.md) | Reactive [`mediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) streaming | AUTO |

### Network

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useEventSource`](vueuse/useEventSource.md) | An [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) or [Server-Sent-Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) instance opens a persistent connection to an HTTP server | AUTO |
| [`useFetch`](vueuse/useFetch.md) | Reactive [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides the ability to abort requests | AUTO |
| [`useWebSocket`](vueuse/useWebSocket.md) | Reactive [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) client | AUTO |

### Animation

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useAnimate`](vueuse/useAnimate.md) | Reactive [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) | AUTO |
| [`useInterval`](vueuse/useInterval.md) | Reactive counter that increases on every interval | AUTO |
| [`useIntervalFn`](vueuse/useIntervalFn.md) | Wrapper for `setInterval` with controls | AUTO |
| [`useNow`](vueuse/useNow.md) | Reactive current Date instance | AUTO |
| [`useRafFn`](vueuse/useRafFn.md) | Call function on every `requestAnimationFrame` | AUTO |
| [`useTimeout`](vueuse/useTimeout.md) | Reactive value that becomes `true` after a given time | AUTO |
| [`useTimeoutFn`](vueuse/useTimeoutFn.md) | Wrapper for `setTimeout` with controls | AUTO |
| [`useTimestamp`](vueuse/useTimestamp.md) | Reactive current timestamp | AUTO |
| [`useTransition`](vueuse/useTransition.md) | Transition between values | AUTO |

### Component

| Function | Description | Invocation |
|----------|-------------|------------|
| [`computedInject`](vueuse/computedInject.md) | Combine `computed` and `inject` | AUTO |
| [`createReusableTemplate`](vueuse/createReusableTemplate.md) | Define and reuse template inside the component scope | AUTO |
| [`createTemplatePromise`](vueuse/createTemplatePromise.md) | Template as Promise | AUTO |
| [`tryOnBeforeMount`](vueuse/tryOnBeforeMount.md) | Safe `onBeforeMount` | AUTO |
| [`tryOnBeforeUnmount`](vueuse/tryOnBeforeUnmount.md) | Safe `onBeforeUnmount` | AUTO |
| [`tryOnMounted`](vueuse/tryOnMounted.md) | Safe `onMounted` | AUTO |
| [`tryOnScopeDispose`](vueuse/tryOnScopeDispose.md) | Safe `onScopeDispose` | AUTO |
| [`tryOnUnmounted`](vueuse/tryOnUnmounted.md) | Safe `onUnmounted` | AUTO |
| [`unrefElement`](vueuse/unrefElement.md) | Retrieves the underlying DOM element from a Vue ref or component instance | AUTO |
| [`useCurrentElement`](vueuse/useCurrentElement.md) | Get the DOM element of current component as a ref | AUTO |
| [`useMounted`](vueuse/useMounted.md) | Mounted state in ref | AUTO |
| [`useTemplateRefsList`](vueuse/useTemplateRefsList.md) | Shorthand for binding refs to template elements and components inside `v-for` | AUTO |
| [`useVirtualList`](vueuse/useVirtualList.md) | Create virtual lists with ease | AUTO |
| [`useVModel`](vueuse/useVModel.md) | Shorthand for v-model binding | AUTO |
| [`useVModels`](vueuse/useVModels.md) | Shorthand for props v-model binding | AUTO |

### Watch

| Function | Description | Invocation |
|----------|-------------|------------|
| [`until`](vueuse/until.md) | Promised one-time watch for changes | AUTO |
| [`watchArray`](vueuse/watchArray.md) | Watch for an array with additions and removals | AUTO |
| [`watchAtMost`](vueuse/watchAtMost.md) | `watch` with the number of times triggered | AUTO |
| [`watchDebounced`](vueuse/watchDebounced.md) | Debounced watch | AUTO |
| [`watchDeep`](vueuse/watchDeep.md) | Shorthand for watching value with `{deep: true}` | AUTO |
| [`watchIgnorable`](vueuse/watchIgnorable.md) | Ignorable watch | AUTO |
| [`watchImmediate`](vueuse/watchImmediate.md) | Shorthand for watching value with `{immediate: true}` | AUTO |
| [`watchOnce`](vueuse/watchOnce.md) | Shorthand for watching value with `{ once: true }` | AUTO |
| [`watchPausable`](vueuse/watchPausable.md) | Pausable watch | AUTO |
| [`watchThrottled`](vueuse/watchThrottled.md) | Throttled watch | AUTO |
| [`watchTriggerable`](vueuse/watchTriggerable.md) | Watch that can be triggered manually | AUTO |
| [`watchWithFilter`](vueuse/watchWithFilter.md) | `watch` with additional EventFilter control | AUTO |
| [`whenever`](vueuse/whenever.md) | Shorthand for watching value to be truthy | AUTO |

### Reactivity

| Function | Description | Invocation |
|----------|-------------|------------|
| [`computedAsync`](vueuse/computedAsync.md) | Computed for async functions | AUTO |
| [`computedEager`](vueuse/computedEager.md) | Eager computed without lazy evaluation | AUTO |
| [`computedWithControl`](vueuse/computedWithControl.md) | Explicitly define the dependencies of computed | AUTO |
| [`createRef`](vueuse/createRef.md) | Returns a `deepRef` or `shallowRef` depending on the `deep` param | AUTO |
| [`extendRef`](vueuse/extendRef.md) | Add extra attributes to Ref | AUTO |
| [`reactify`](vueuse/reactify.md) | Converts plain functions into reactive functions | AUTO |
| [`reactifyObject`](vueuse/reactifyObject.md) | Apply `reactify` to an object | AUTO |
| [`reactiveComputed`](vueuse/reactiveComputed.md) | Computed reactive object | AUTO |
| [`reactiveOmit`](vueuse/reactiveOmit.md) | Reactively omit fields from a reactive object | AUTO |
| [`reactivePick`](vueuse/reactivePick.md) | Reactively pick fields from a reactive object | AUTO |
| [`refAutoReset`](vueuse/refAutoReset.md) | A ref which will be reset to the default value after some time | AUTO |
| [`refDebounced`](vueuse/refDebounced.md) | Debounce execution of a ref value | AUTO |
| [`refDefault`](vueuse/refDefault.md) | Apply default value to a ref | AUTO |
| [`refManualReset`](vueuse/refManualReset.md) | Create a ref with manual reset functionality | AUTO |
| [`refThrottled`](vueuse/refThrottled.md) | Throttle changing of a ref value | AUTO |
| [`refWithControl`](vueuse/refWithControl.md) | Fine-grained controls over ref and its reactivity | AUTO |
| [`syncRef`](vueuse/syncRef.md) | Two-way refs synchronization | AUTO |
| [`syncRefs`](vueuse/syncRefs.md) | Keep target refs in sync with a source ref | AUTO |
| [`toReactive`](vueuse/toReactive.md) | Converts ref to reactive | AUTO |
| [`toRef`](vueuse/toRef.md) | Normalize value/ref/getter to `ref` or `computed` | EXPLICIT_ONLY |
| [`toRefs`](vueuse/toRefs.md) | Extended [`toRefs`](https://vuejs.org/api/reactivity-utilities.html#torefs) that also accepts refs of an object | AUTO |

### Array

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useArrayDifference`](vueuse/useArrayDifference.md) | Reactive get array difference of two arrays | AUTO |
| [`useArrayEvery`](vueuse/useArrayEvery.md) | Reactive `Array.every` | AUTO |
| [`useArrayFilter`](vueuse/useArrayFilter.md) | Reactive `Array.filter` | AUTO |
| [`useArrayFind`](vueuse/useArrayFind.md) | Reactive `Array.find` | AUTO |
| [`useArrayFindIndex`](vueuse/useArrayFindIndex.md) | Reactive `Array.findIndex` | AUTO |
| [`useArrayFindLast`](vueuse/useArrayFindLast.md) | Reactive `Array.findLast` | AUTO |
| [`useArrayIncludes`](vueuse/useArrayIncludes.md) | Reactive `Array.includes` | AUTO |
| [`useArrayJoin`](vueuse/useArrayJoin.md) | Reactive `Array.join` | AUTO |
| [`useArrayMap`](vueuse/useArrayMap.md) | Reactive `Array.map` | AUTO |
| [`useArrayReduce`](vueuse/useArrayReduce.md) | Reactive `Array.reduce` | AUTO |
| [`useArraySome`](vueuse/useArraySome.md) | Reactive `Array.some` | AUTO |
| [`useArrayUnique`](vueuse/useArrayUnique.md) | Reactive unique array | AUTO |
| [`useSorted`](vueuse/useSorted.md) | Reactive sort array | AUTO |

### Time

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useCountdown`](vueuse/useCountdown.md) | Reactive countdown timer in seconds | AUTO |
| [`useDateFormat`](vueuse/useDateFormat.md) | Get the formatted date according to the string of tokens passed in | AUTO |
| [`useTemporalNow`](vueuse/useTemporalNow.md) | Reactive [Temporal API](https://tc39.es/proposal-temporal/docs/) with timezone conversion and calendar system support | AUTO |
| [`useTimeAgo`](vueuse/useTimeAgo.md) | Reactive time ago | AUTO |
| [`useTimeAgoIntl`](vueuse/useTimeAgoIntl.md) | Reactive time ago with i18n supported | AUTO |

### Utilities

| Function | Description | Invocation |
|----------|-------------|------------|
| [`createDisposableDirective`](vueuse/createDisposableDirective.md) | Utility for authoring disposable directives | AUTO |
| [`createEventHook`](vueuse/createEventHook.md) | Utility for creating event hooks | AUTO |
| [`createUnrefFn`](vueuse/createUnrefFn.md) | Make a plain function accepting ref and raw values as arguments | AUTO |
| [`get`](vueuse/get.md) | Shorthand for accessing `ref.value` | EXPLICIT_ONLY |
| [`isDefined`](vueuse/isDefined.md) | Non-nullish checking type guard for Ref | AUTO |
| [`makeDestructurable`](vueuse/makeDestructurable.md) | Make isomorphic destructurable for object and array at the same time | AUTO |
| [`set`](vueuse/set.md) | Shorthand for `ref.value = x` | EXPLICIT_ONLY |
| [`useAsyncQueue`](vueuse/useAsyncQueue.md) | Executes each asynchronous task sequentially and passes the current task result to the next task | AUTO |
| [`useBase64`](vueuse/useBase64.md) | Reactive base64 transforming | AUTO |
| [`useCached`](vueuse/useCached.md) | Cache a ref with a custom comparator | AUTO |
| [`useCloned`](vueuse/useCloned.md) | Reactive clone of a ref | AUTO |
| [`useConfirmDialog`](vueuse/useConfirmDialog.md) | Creates event hooks to support modals and confirmation dialog chains | AUTO |
| [`useCounter`](vueuse/useCounter.md) | Basic counter with utility functions | AUTO |
| [`useCycleList`](vueuse/useCycleList.md) | Cycle through a list of items | AUTO |
| [`useDebounceFn`](vueuse/useDebounceFn.md) | Debounce execution of a function | AUTO |
| [`useEventBus`](vueuse/useEventBus.md) | A basic event bus | AUTO |
| [`useMemoize`](vueuse/useMemoize.md) | Cache results of functions depending on arguments and keep it reactive | AUTO |
| [`useOffsetPagination`](vueuse/useOffsetPagination.md) | Reactive offset pagination | AUTO |
| [`usePrevious`](vueuse/usePrevious.md) | Holds the previous value of a ref | AUTO |
| [`useStepper`](vueuse/useStepper.md) | Provides helpers for building a multi-step wizard interface | AUTO |
| [`useSupported`](vueuse/useSupported.md) | SSR compatibility `isSupported` | AUTO |
| [`useThrottleFn`](vueuse/useThrottleFn.md) | Throttle execution of a function | AUTO |
| [`useTimeoutPoll`](vueuse/useTimeoutPoll.md) | Use timeout to poll something | AUTO |
| [`useToggle`](vueuse/useToggle.md) | A boolean switcher with utility functions | AUTO |
| [`useToNumber`](vueuse/useToNumber.md) | Reactively convert a string ref to number | AUTO |
| [`useToString`](vueuse/useToString.md) | Reactively convert a ref to string | AUTO |

### @Electron

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useIpcRenderer`](vueuse/useIpcRenderer.md) | Provides [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer) and all of its APIs with Vue reactivity | EXTERNAL |
| [`useIpcRendererInvoke`](vueuse/useIpcRendererInvoke.md) | Reactive [ipcRenderer.invoke API](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) result | EXTERNAL |
| [`useIpcRendererOn`](vueuse/useIpcRendererOn.md) | Use [ipcRenderer.on](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener) with ease and [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener) automatically on unmounted | EXTERNAL |
| [`useZoomFactor`](vueuse/useZoomFactor.md) | Reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom factor | EXTERNAL |
| [`useZoomLevel`](vueuse/useZoomLevel.md) | Reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom level | EXTERNAL |

### @Firebase

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useAuth`](vueuse/useAuth.md) | Reactive [Firebase Auth](https://firebase.google.com/docs/auth) binding | EXTERNAL |
| [`useFirestore`](vueuse/useFirestore.md) | Reactive [Firestore](https://firebase.google.com/docs/firestore) binding | EXTERNAL |
| [`useRTDB`](vueuse/useRTDB.md) | Reactive [Firebase Realtime Database](https://firebase.google.com/docs/database) binding | EXTERNAL |

### @Head

| Function | Description | Invocation |
|----------|-------------|------------|
| [`createHead`](https://github.com/vueuse/head#api) | Create the head manager instance. | EXTERNAL |
| [`useHead`](https://github.com/vueuse/head#api) | Update head meta tags reactively. | EXTERNAL |

### @Integrations

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useAsyncValidator`](vueuse/useAsyncValidator.md) | Wrapper for [`async-validator`](https://github.com/yiminghe/async-validator) | EXTERNAL |
| [`useAxios`](vueuse/useAxios.md) | Wrapper for [`axios`](https://github.com/axios/axios) | EXTERNAL |
| [`useChangeCase`](vueuse/useChangeCase.md) | Reactive wrapper for [`change-case`](https://github.com/blakeembrey/change-case) | EXTERNAL |
| [`useCookies`](vueuse/useCookies.md) | Wrapper for [`universal-cookie`](https://www.npmjs.com/package/universal-cookie) | EXTERNAL |
| [`useDrauu`](vueuse/useDrauu.md) | Reactive instance for [drauu](https://github.com/antfu/drauu) | EXTERNAL |
| [`useFocusTrap`](vueuse/useFocusTrap.md) | Reactive wrapper for [`focus-trap`](https://github.com/focus-trap/focus-trap) | EXTERNAL |
| [`useFuse`](vueuse/useFuse.md) | Easily implement fuzzy search using a composable with [Fuse.js](https://github.com/krisk/fuse) | EXTERNAL |
| [`useIDBKeyval`](vueuse/useIDBKeyval.md) | Wrapper for [`idb-keyval`](https://www.npmjs.com/package/idb-keyval) | EXTERNAL |
| [`useJwt`](vueuse/useJwt.md) | Wrapper for [`jwt-decode`](https://github.com/auth0/jwt-decode) | EXTERNAL |
| [`useNProgress`](vueuse/useNProgress.md) | Reactive wrapper for [`nprogress`](https://github.com/rstacruz/nprogress) | EXTERNAL |
| [`useQRCode`](vueuse/useQRCode.md) | Wrapper for [`qrcode`](https://github.com/soldair/node-qrcode) | EXTERNAL |
| [`useSortable`](vueuse/useSortable.md) | Wrapper for [`sortable`](https://github.com/SortableJS/Sortable) | EXTERNAL |

### @Math

| Function | Description | Invocation |
|----------|-------------|------------|
| [`createGenericProjection`](vueuse/createGenericProjection.md) | Generic version of `createProjection` | EXTERNAL |
| [`createProjection`](vueuse/createProjection.md) | Reactive numeric projection from one domain to another | EXTERNAL |
| [`logicAnd`](vueuse/logicAnd.md) | `AND` condition for refs | EXTERNAL |
| [`logicNot`](vueuse/logicNot.md) | `NOT` condition for ref | EXTERNAL |
| [`logicOr`](vueuse/logicOr.md) | `OR` conditions for refs | EXTERNAL |
| [`useAbs`](vueuse/useAbs.md) | Reactive `Math.abs` | EXTERNAL |
| [`useAverage`](vueuse/useAverage.md) | Get the average of an array reactively | EXTERNAL |
| [`useCeil`](vueuse/useCeil.md) | Reactive `Math.ceil` | EXTERNAL |
| [`useClamp`](vueuse/useClamp.md) | Reactively clamp a value between two other values | EXTERNAL |
| [`useFloor`](vueuse/useFloor.md) | Reactive `Math.floor` | EXTERNAL |
| [`useMath`](vueuse/useMath.md) | Reactive `Math` methods | EXTERNAL |
| [`useMax`](vueuse/useMax.md) | Reactive `Math.max` | EXTERNAL |
| [`useMin`](vueuse/useMin.md) | Reactive `Math.min` | EXTERNAL |
| [`usePrecision`](vueuse/usePrecision.md) | Reactively set the precision of a number | EXTERNAL |
| [`useProjection`](vueuse/useProjection.md) | Reactive numeric projection from one domain to another | EXTERNAL |
| [`useRound`](vueuse/useRound.md) | Reactive `Math.round` | EXTERNAL |
| [`useSum`](vueuse/useSum.md) | Get the sum of an array reactively | EXTERNAL |
| [`useTrunc`](vueuse/useTrunc.md) | Reactive `Math.trunc` | EXTERNAL |

### @Motion

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useElementStyle`](https://motion.vueuse.org/api/use-element-style) | Sync a reactive object to a target element CSS styling | EXTERNAL |
| [`useElementTransform`](https://motion.vueuse.org/api/use-element-transform) | Sync a reactive object to a target element CSS transform. | EXTERNAL |
| [`useMotion`](https://motion.vueuse.org/api/use-motion) | Putting your components in motion. | EXTERNAL |
| [`useMotionProperties`](https://motion.vueuse.org/api/use-motion-properties) | Access Motion Properties for a target element. | EXTERNAL |
| [`useMotionVariants`](https://motion.vueuse.org/api/use-motion-variants) | Handle the Variants state and selection. | EXTERNAL |
| [`useSpring`](https://motion.vueuse.org/api/use-spring) | Spring animations. | EXTERNAL |

### @Router

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useRouteHash`](vueuse/useRouteHash.md) | Shorthand for a reactive `route.hash` | EXTERNAL |
| [`useRouteParams`](vueuse/useRouteParams.md) | Shorthand for a reactive `route.params` | EXTERNAL |
| [`useRouteQuery`](vueuse/useRouteQuery.md) | Shorthand for a reactive `route.query` | EXTERNAL |

### @RxJS

| Function | Description | Invocation |
|----------|-------------|------------|
| [`from`](vueuse/from.md) | Wrappers around RxJS's [`from()`](https://rxjs.dev/api/index/function/from) and [`fromEvent()`](https://rxjs.dev/api/index/function/fromEvent) to allow them to accept `ref`s | EXTERNAL |
| [`toObserver`](vueuse/toObserver.md) | Sugar function to convert a `ref` into an RxJS [Observer](https://rxjs.dev/guide/observer) | EXTERNAL |
| [`useExtractedObservable`](vueuse/useExtractedObservable.md) | Use an RxJS [`Observable`](https://rxjs.dev/guide/observable) as extracted from one or more composables | EXTERNAL |
| [`useObservable`](vueuse/useObservable.md) | Use an RxJS [`Observable`](https://rxjs.dev/guide/observable) | EXTERNAL |
| [`useSubject`](vueuse/useSubject.md) | Bind an RxJS [`Subject`](https://rxjs.dev/guide/subject) to a `ref` and propagate value changes both ways | EXTERNAL |
| [`useSubscription`](vueuse/useSubscription.md) | Use an RxJS [`Subscription`](https://rxjs.dev/guide/subscription) without worrying about unsubscribing from it or creating memory leaks | EXTERNAL |
| [`watchExtractedObservable`](vueuse/watchExtractedObservable.md) | Watch the values of an RxJS [`Observable`](https://rxjs.dev/guide/observable) as extracted from one or more composables | EXTERNAL |

### @SchemaOrg

| Function | Description | Invocation |
|----------|-------------|------------|
| [`createSchemaOrg`](https://vue-schema-org.netlify.app/api/core/create-schema-org.html) | Create the schema.org manager instance. | EXTERNAL |
| [`useSchemaOrg`](https://vue-schema-org.netlify.app/api/core/use-schema-org.html) | Update schema.org reactively. | EXTERNAL |

### @Sound

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useSound`](https://github.com/vueuse/sound#examples) | Play sound effects reactively. | EXTERNAL |


