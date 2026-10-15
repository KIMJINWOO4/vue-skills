# Contributing

## Two kinds of files

**Synced files** come from upstream repositories. Every path listed under `copy` in `sources.json` is overwritten by the next sync, so do not edit them here. To change one, fix it upstream, or adjust the mapping (`links`, `replace`, `exclude`) in `sources.json`.

**Hand-written files** are everything else: most `SKILL.md` files and the references of `vue-review`, `vue-upgrade`, `vue-data`, `vue-forms`, `vue-performance`, `vue-a11y` and `vue-clean-components`. Edit these directly.

## Commands

Node 22 or newer, no dependencies to install.

```bash
node scripts/sync.mjs            # re-sync every source at its pinned commit
node scripts/sync.mjs --update   # move unpinned sources to their branch head
node scripts/sync.mjs vuejs-ai   # one source only
node scripts/validate.mjs        # frontmatter, size budgets, links
node scripts/stats.mjs --write   # refresh the startup cost table in README.md
```

Run `validate` before opening a pull request. CI runs it too.

## Writing a skill

- `name` matches the folder, lowercase kebab-case.
- `description` says what the skill covers and when to use it, in plain words an agent can match against a request. No angle brackets.
- Keep `SKILL.md` short: the workflow, the rules that prevent the most mistakes, and a table that points into `references/`. Detail belongs in references.
- State versions with the date you checked them, and link the release notes you relied on.
- Plain English. Short sentences. No em dashes.

## Adding an upstream source

1. Add an entry to `sources.json` with `repo`, `branch`, the full `commit` SHA, `license` and the `copy` mappings.
2. Run `node scripts/sync.mjs <id>` and `node scripts/validate.mjs`.
3. Link the new guide from the right `SKILL.md`.
4. Add the license and copyright line to `THIRD_PARTY_LICENSES`.
