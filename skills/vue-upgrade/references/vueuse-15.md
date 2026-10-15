# VueUse 14 to 15

VueUse 15.0.0 was released on 2026-09-16. Source: [v15.0.0 release](https://github.com/vueuse/vueuse/releases/tag/v15.0.0).

## Breaking changes and what to do

| Change | Action |
|--------|--------|
| `templateRef` removed | Replace with Vue's `useTemplateRef('name')` (Vue 3.5+). |
| Node.js 20 dropped | Run tooling on Node 22 or newer. |
| Timer options removed in favor of `scheduler` | `interval` and `immediate` are gone from `useNow`, `useTimestamp`, `useCountdown` and `useElementByPoint`; `useMemory` also lost `immediateCallback`; `useTimeAgo` and `useTimeAgoIntl` lost `updateInterval`; `useVibrate` lost `interval`; `useWebSocket` lost `heartbeat.interval`. Move the timing into the `scheduler` option. The function pages on vueuse.org and [PR #5564](https://github.com/vueuse/vueuse/pull/5564) show the replacement for each. |
| `useThrottleFn` defaults `trailing` to `true` | The last call in a burst now runs. Pass `trailing: false` explicitly if the old behavior mattered (for example, to avoid a duplicate request). |
| `useEventSource` handles the SSE `message` type | Both `onmessage` and `addEventListener('message')` handlers now fire. Remove one of them if you registered both. |
| `useIDBKeyval` syncs across tabs | Writes in one tab now update other tabs. Check code that assumed tab-local state. |

## Search the codebase

```bash
rg "templateRef\(|interval:|immediate:|updateInterval|immediateCallback|useThrottleFn|useEventSource|useIDBKeyval" src
```

## New in 15

- `useTemporalNow`: reactive `Temporal.Now` values.
- `useLiveAnnouncer`: polite and assertive screen reader announcements. Useful for the `vue-a11y` skill's live region patterns.
- `useWebMCP`: expose tools to in-browser AI agents through the WebMCP API.

Peer dependency stays `vue ^3.5.0`. Function reference: [vueuse-guide](../../vue/references/vueuse-guide.md).
