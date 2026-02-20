# Turborepo Skill

Build system for JavaScript/TypeScript monorepos. Turborepo caches task outputs and runs tasks in parallel based on dependency graph.

## IMPORTANT: Package Tasks, Not Root Tasks

**DO NOT create Root Tasks. ALWAYS create package tasks.**

When creating tasks/scripts/pipelines, you MUST:

1. Add the script to each relevant package's `package.json`
2. Register the task in root `turbo.json`
3. Root `package.json` only delegates via `turbo run <task>`

## Secondary Rule: `turbo run` vs `turbo`

**Always use `turbo run` when the command is written into code.** The shorthand `turbo <tasks>` is ONLY for one-off terminal commands typed directly by humans or agents.

## Quick Decision Trees

- **Configure a task** → [configuration/tasks](turborepo/configuration/tasks.md)
- **Cache problems** → [caching/gotchas](turborepo/caching/gotchas.md)
- **Run only changed packages** → `turbo run build --affected`
- **Filter packages** → [filtering/RULE](turborepo/filtering/RULE.md)
- **Environment variables** → [environment/RULE](turborepo/environment/RULE.md)
- **CI setup** → [ci/github-actions](turborepo/ci/github-actions.md)
- **Watch mode** → [watch/RULE](turborepo/watch/RULE.md)
- **Create/structure a package** → [best-practices/packages](turborepo/best-practices/packages.md)
- **Enforce boundaries** → [boundaries/RULE](turborepo/boundaries/RULE.md)

## Critical Anti-Patterns

- Using `turbo` shorthand in code → Use `turbo run`
- Root scripts bypassing Turbo → Delegate with `turbo run`
- Chaining turbo tasks with `&&` → Let turbo orchestrate
- `prebuild` scripts that manually build deps → Use `dependsOn: ["^build"]`
- Overly broad `globalDependencies` → Use task-level `inputs`
- `--parallel` flag → Configure `dependsOn` correctly

## Reference Index

### Configuration
| File | Purpose |
|------|---------|
| [configuration/RULE](turborepo/configuration/RULE.md) | turbo.json overview, Package Configurations |
| [configuration/tasks](turborepo/configuration/tasks.md) | dependsOn, outputs, inputs, env, cache, persistent |
| [configuration/global-options](turborepo/configuration/global-options.md) | globalEnv, globalDependencies, cacheDir, daemon, envMode |

### Caching
| File | Purpose |
|------|---------|
| [caching/RULE](turborepo/caching/RULE.md) | How caching works, hash inputs |
| [caching/remote-cache](turborepo/caching/remote-cache.md) | Vercel Remote Cache, self-hosted, login/link |
| [caching/gotchas](turborepo/caching/gotchas.md) | Debugging cache misses, --summarize, --dry |

### Environment Variables
| File | Purpose |
|------|---------|
| [environment/RULE](turborepo/environment/RULE.md) | env, globalEnv, passThroughEnv |
| [environment/modes](turborepo/environment/modes.md) | Strict vs Loose mode, framework inference |

### Filtering
| File | Purpose |
|------|---------|
| [filtering/RULE](turborepo/filtering/RULE.md) | --filter syntax overview |
| [filtering/patterns](turborepo/filtering/patterns.md) | Common filter patterns |

### CI/CD
| File | Purpose |
|------|---------|
| [ci/RULE](turborepo/ci/RULE.md) | General CI principles |
| [ci/github-actions](turborepo/ci/github-actions.md) | Complete GitHub Actions setup |
| [ci/vercel](turborepo/ci/vercel.md) | Vercel deployment, turbo-ignore |

### CLI
| File | Purpose |
|------|---------|
| [cli/RULE](turborepo/cli/RULE.md) | turbo run basics |
| [cli/commands](turborepo/cli/commands.md) | turbo run flags, turbo-ignore, other commands |

### Best Practices
| File | Purpose |
|------|---------|
| [best-practices/RULE](turborepo/best-practices/RULE.md) | Monorepo best practices overview |
| [best-practices/structure](turborepo/best-practices/structure.md) | Repository structure, workspace config |
| [best-practices/packages](turborepo/best-practices/packages.md) | Creating internal packages, JIT vs Compiled |
| [best-practices/dependencies](turborepo/best-practices/dependencies.md) | Dependency management, installing, version sync |

### Watch Mode
| File | Purpose |
|------|---------|
| [watch/RULE](turborepo/watch/RULE.md) | turbo watch, interruptible tasks, dev workflows |

### Boundaries (Experimental)
| File | Purpose |
|------|---------|
| [boundaries/RULE](turborepo/boundaries/RULE.md) | Enforce package isolation, tag-based dependency rules |