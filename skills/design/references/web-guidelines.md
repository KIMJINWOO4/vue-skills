# Web Interface Guidelines Review

Review UI code against the [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines).

## Steps

1. Get the rules. If network access is available, fetch the live version, because the guidelines change:

   ```
   https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
   ```

   Without network access, use the snapshot in [web-guidelines-rules](web-guidelines-rules.md). Its source commit is recorded in `sources.json` at the repository root.
2. Read the files the user named. If none were named, ask which files or folders to review.
3. Check every rule that applies to those files. The rules are written for JSX; translate them to Vue templates (`@click` for `onClick`, `:class` for `className`, `<RouterLink>` or `<NuxtLink>` for `<Link>`).
4. Report findings in the terse `file:line` format the rules describe. Skip rules that do not apply instead of listing them as passed.
