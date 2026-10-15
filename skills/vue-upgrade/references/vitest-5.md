# Vitest 4 to 5

Vitest 5.0 was released on 2026-09-03. Sources: [announcement](https://vitest.dev/blog/vitest-5.html), [migration guide](https://vitest.dev/guide/migration), [release notes](https://github.com/vitest-dev/vitest/releases/tag/v5.0.0).

## Before upgrading

- Node `^22.12.0 || ^24 || >=26`.
- `vite >=6.4` must be installed; it is now a required peer (Yarn users add it explicitly).
- If you still use `workspace` or `poolOptions` from Vitest 3, do the Vitest 4 migration first.

## Changes that make tests fail

| Change | What to do |
|--------|-----------|
| `clearMocks` defaults to `true` | Mock call history is cleared before every test. Tests that counted calls across tests break; set `clearMocks: false` or fix the test. |
| Unawaited async assertions fail | `expect(p).resolves`, `.rejects` and `toMatchFileSnapshot` must be awaited. |
| `vi.mock`, `vi.unmock`, `vi.hoisted` outside the top level throw | Move them to module top level. |
| `-t` matches the `>`-joined full name | Use `-t "math > adds"`, not the space-joined Jest form. |
| Browser mode locators are strict | `getByText('Item')` no longer matches `Item 1`. `toHaveTextContent` is strict; use `toMatchTextContent` for partial matches. |

## Config changes

| Change | What to do |
|--------|-----------|
| Config is not looked up in parent directories | Pass `--config` when running from a subfolder. |
| Inline projects extend the root config by default | Remove duplicated plugins and aliases from projects, or set `extends: false`. Nested projects are supported. |
| `sequential` removed (`test.sequential`, `describe.sequential`, the option) | Use `{ concurrent: false }`. |
| Reporter output lives in `.vitest/` | Add `.vitest/` to `.gitignore`; update CI artifact paths. |
| `deps.optimizer.web` renamed | Use `deps.optimizer.client`. |
| webdriverio provider moved | Install it from `vitest-community/vitest-webdriverio`. |
| `browser.api` deprecated | Use the top-level `api` option. |

## Worth adopting after the upgrade

- `vi.when(spy).calledWith(...)` for per-argument behavior.
- Fake timers also fake `Temporal` when it exists.
- `bench` as a test-context fixture.
- `fsModuleCache` (stable) for faster reruns.
- Browser mode trace view (`browser.traceView: true`).
- `vitest doctor` suggests config speedups; `--repeats <n>` helps find flaky tests.

Full reference: [vitest-guide](../../build-tooling/references/vitest-guide.md). Vue component testing: [testing-guide](../../vue/references/testing-guide.md).
