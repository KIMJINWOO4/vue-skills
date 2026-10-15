---
name: vue-ci
description: Run vue-skills-ci on a Vue or Nuxt project and fix what it reports (TypeScript 7 with vue-tsc, Pinia 4 and Vitest 5 peers, VueUse 15 and Vitest 5 removals, Vapor options, public env secrets, SSR module state), or add a ready-made GitHub Actions CI that installs, lints, type-checks, tests, builds and checks these rules. Use before a release or upgrade, when a vue-skills-ci check fails, or when asked to set up CI for a Vue project.
---

# vue-ci

vue-skills-ci turns the version and safety rules from the vue-skills collection into checks that run locally and in GitHub Actions. It has no dependencies and needs Node 20 or newer.

## Check a project

```bash
npx -y github:KIMJINWOO4/vue-skills-ci check            # readable report
npx -y github:KIMJINWOO4/vue-skills-ci check --format json
```

Exit code 1 means at least one error. `--fail-on warn` makes warnings fail too, `--fail-on never` only reports.

## Fix findings

1. Run the check with `--format json` and group the findings by `rule`.
2. Fix errors first, then warnings. Info findings are advice.
3. Each finding has `fix` (what to do) and `docs` (a vue-skills guide). If the vue-skills skills are installed, read the local copy: a docs URL ending in `skills/<path>` maps to the installed skill folder at the same path.
4. Re-run the check until it is clean, then run the project's own tests and build.
5. A finding that is intended: add `// vue-skills-ci-disable-next-line <rule-id>` above the line, or turn the rule off in `vue-skills-ci.config.json` (`{ "rules": { "<rule-id>": "off" } }`). Say why in a comment.

The rule list with explanations is in [rules](references/rules.md).

## Add CI to a project

Write the workflow file, then commit it:

```bash
npx -y github:KIMJINWOO4/vue-skills-ci init              # full CI: install, lint, type-check, test, build, rules
npx -y github:KIMJINWOO4/vue-skills-ci init --rules-only # only the rule check, for projects that already have CI
```

The full workflow calls the reusable workflow `KIMJINWOO4/vue-skills-ci/.github/workflows/vue-ci.yml@v1`. It detects pnpm, npm, Yarn or Bun from the lockfile and runs only the scripts that exist (`lint`, `typecheck` or `type-check`, `test:unit` or `test`, `build-only` or `build`). For a monorepo, set `working-directory` to the app folder.

## Existing projects with many findings

Record the current findings so CI fails only on new ones:

```bash
npx -y github:KIMJINWOO4/vue-skills-ci check --baseline .vue-skills-ci-baseline.json --update-baseline
```

Commit the file and pass `baseline: .vue-skills-ci-baseline.json` to the workflow or action. Remove entries as you fix them by running the same command again.
