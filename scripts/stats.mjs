#!/usr/bin/env node
// Measures what each skill costs at startup and how much it holds on demand.
//
//   node scripts/stats.mjs          print the table
//   node scripts/stats.mjs --write  also replace the block between the stats markers in README.md
//
// Startup cost is the frontmatter name + description, which agents load for every
// installed skill. Tokens are estimated as characters / 4.

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter } from './frontmatter.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const skillsDir = join(root, 'skills')
const tokens = text => Math.round(text.length / 4)

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function startupText(file) {
  const fm = parseFrontmatter(readFileSync(file, 'utf8'))
  return fm ? `${fm.data.name ?? ''} ${fm.data.description ?? ''}` : ''
}

const rows = readdirSync(skillsDir)
  .filter(name => existsSync(join(skillsDir, name, 'SKILL.md')))
  .map((name) => {
    const dir = join(skillsDir, name)
    const refs = walk(dir).filter(f => f.endsWith('.md') && !f.endsWith('SKILL.md'))
    const bytes = refs.reduce((sum, f) => sum + statSync(f).size, 0)
    return { name, startup: tokens(startupText(join(dir, 'SKILL.md'))), refs: refs.length, kb: Math.round(bytes / 1024) }
  })

// Upstream skills folded into this repo, measured from the sync cache when it exists.
const manifest = JSON.parse(readFileSync(join(root, 'sources.json'), 'utf8'))
const upstream = new Map()
for (const source of manifest.sources) {
  for (const copy of source.copy) {
    const file = copy.from.endsWith('SKILL.md') ? copy.from : `${copy.from}/SKILL.md`
    const path = join(root, '.cache', 'sources', source.id, file)
    if (existsSync(path))
      upstream.set(`${source.id}:${file}`, tokens(startupText(path)))
  }
}

const total = rows.reduce((acc, r) => ({ startup: acc.startup + r.startup, refs: acc.refs + r.refs, kb: acc.kb + r.kb }), { startup: 0, refs: 0, kb: 0 })
const lines = [
  '| Skill | Startup tokens | Reference files | Reference size |',
  '|-------|---------------:|----------------:|---------------:|',
  ...rows.map(r => `| \`${r.name}\` | ${r.startup} | ${r.refs} | ${r.kb} KB |`),
  `| **Total (${rows.length} skills)** | **${total.startup}** | **${total.refs}** | **${(total.kb / 1024).toFixed(1)} MB** |`,
]
if (upstream.size) {
  const upstreamTokens = [...upstream.values()].reduce((a, b) => a + b, 0)
  lines.push('', `Installing the ${upstream.size} upstream skills bundled here one by one would load ${upstream.size} descriptions, about ${upstreamTokens} tokens, at every session start. This repo loads ${rows.length} descriptions, about ${total.startup} tokens, and that already includes the hand-written workflow skills.`)
}
const table = lines.join('\n')
console.log(table)

if (process.argv.includes('--write')) {
  const readmePath = join(root, 'README.md')
  const readme = readFileSync(readmePath, 'utf8')
  const re = /(<!-- stats:start -->)[\s\S]*?(<!-- stats:end -->)/
  if (!re.test(readme))
    throw new Error('README.md has no <!-- stats:start --> / <!-- stats:end --> markers')
  writeFileSync(readmePath, readme.replace(re, `$1\n${table}\n$2`))
  console.log('\nREADME.md updated')
}
