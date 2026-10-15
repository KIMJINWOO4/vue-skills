#!/usr/bin/env node
// Checks every skill against the Agent Skills format and this repo's own rules.
//
//   node scripts/validate.mjs           errors fail the run, warnings are printed
//   node scripts/validate.mjs --strict  warnings fail the run too
//
// Errors: bad frontmatter, SKILL.md over budget, broken links in hand-written files.
// Warnings: broken links inside synced upstream files, reference files no SKILL.md can reach.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter } from './frontmatter.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const skillsDir = join(root, 'skills')
const strict = process.argv.includes('--strict')

const MAX_DESCRIPTION = 1024
const MAX_SKILL_LINES = 500
const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const toPosix = p => p.split(sep).join('/')
const synced = JSON.parse(readFileSync(join(root, 'sources.json'), 'utf8'))
  .sources.flatMap(s => s.copy.map(c => c.to))
const isSynced = rel => synced.some(p => rel === p || rel.startsWith(`${p}/`))

const errors = []
const warnings = []

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

// Markdown link targets outside fenced code blocks, minus external URLs and anchors.
function localLinks(text) {
  const prose = text.replace(/^(```|~~~)[\s\S]*?^\1/gm, '').replace(/`[^`\n]*`/g, '')
  const targets = []
  for (const m of prose.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = m[1].split('#')[0]
    if (target && !/^[a-z]+:/i.test(target) && !/^[</]/.test(target))
      targets.push(decodeURIComponent(target))
  }
  return targets
}

const skills = readdirSync(skillsDir).filter(n => statSync(join(skillsDir, n)).isDirectory())

for (const skill of skills) {
  const dir = join(skillsDir, skill)
  const skillFile = join(dir, 'SKILL.md')
  if (!existsSync(skillFile)) {
    errors.push(`${skill}: missing SKILL.md`)
    continue
  }
  const text = readFileSync(skillFile, 'utf8')
  const fm = parseFrontmatter(text)
  if (!fm) {
    errors.push(`${skill}/SKILL.md: missing YAML frontmatter`)
    continue
  }
  const { name, description } = fm.data
  if (name !== skill)
    errors.push(`${skill}/SKILL.md: name "${name}" must match the folder name`)
  if (!NAME_RE.test(name ?? '') || name.length > 64)
    errors.push(`${skill}/SKILL.md: name must be lowercase kebab-case, 64 chars max`)
  if (!description)
    errors.push(`${skill}/SKILL.md: missing description`)
  else if (description.length > MAX_DESCRIPTION)
    errors.push(`${skill}/SKILL.md: description is ${description.length} chars (max ${MAX_DESCRIPTION})`)
  else if (/<[a-z][^>]*>/i.test(description))
    errors.push(`${skill}/SKILL.md: description must not contain XML or HTML tags`)
  const lines = fm.body.split('\n').length
  if (lines > MAX_SKILL_LINES)
    errors.push(`${skill}/SKILL.md: body is ${lines} lines (max ${MAX_SKILL_LINES}); move detail into references/`)

  // Walk the link graph from SKILL.md to find broken links and unreachable files.
  const files = walk(dir).filter(f => f.endsWith('.md'))
  const reachable = new Set([skillFile])
  const queue = [skillFile]
  while (queue.length) {
    const file = queue.shift()
    const rel = toPosix(relative(root, file))
    for (const target of localLinks(readFileSync(file, 'utf8'))) {
      const abs = resolve(dirname(file), target)
      if (!existsSync(abs)) {
        ;(isSynced(rel) ? warnings : errors).push(`${rel}: broken link -> ${target}`)
        continue
      }
      if (abs.endsWith('.md') && abs.startsWith(dir) && !reachable.has(abs)) {
        reachable.add(abs)
        queue.push(abs)
      }
    }
  }
  const orphans = files.filter(f => !reachable.has(f))
  if (orphans.length) {
    const sample = orphans.slice(0, 3).map(f => toPosix(relative(dir, f))).join(', ')
    warnings.push(`${skill}: ${orphans.length} reference file(s) not linked from SKILL.md (${sample}${orphans.length > 3 ? ', ...' : ''})`)
  }
}

for (const w of warnings) console.log(`warn   ${w}`)
for (const e of errors) console.log(`error  ${e}`)
console.log(`\n${skills.length} skills checked: ${errors.length} error(s), ${warnings.length} warning(s)`)
if (errors.length || (strict && warnings.length))
  process.exit(1)
