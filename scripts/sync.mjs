#!/usr/bin/env node
// Copies upstream skill content into this repo, as declared in sources.json.
//
//   node scripts/sync.mjs              re-sync every source at its pinned commit
//   node scripts/sync.mjs --update     move unpinned sources to their branch head, then sync
//   node scripts/sync.mjs vuejs-ai     limit the run to the given source ids
//
// Every path listed under "copy" is owned by this script ("exclude" drops files by name). Hand-written files must
// live outside those paths, otherwise the next sync deletes them.

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = join(root, 'sources.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const cacheDir = join(root, '.cache', 'sources')

const args = process.argv.slice(2)
const update = args.includes('--update')
const only = new Set(args.filter(a => !a.startsWith('--')))

// Upstream bookkeeping files that never belong in a skill folder.
const IGNORED_NAMES = new Set(['GENERATION.md', 'SYNC.md', '.DS_Store'])
const IGNORED_DIRS = new Set(['agents', 'evals', 'scripts'])

function git(cwd, ...gitArgs) {
  return execFileSync('git', ['-c', 'core.autocrlf=false', ...gitArgs], {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
}

function isFilePath(path) {
  return /\.[a-z]+$/i.test(path)
}

function checkout(source) {
  const dir = join(cacheDir, source.id)
  if (!existsSync(join(dir, '.git'))) {
    mkdirSync(dir, { recursive: true })
    git(dir, 'init', '-q')
    git(dir, 'remote', 'add', 'origin', source.repo)
  }
  // Sparse checkout keeps large monorepos (nuxt/ui, anthropics/skills) cheap to fetch.
  const patterns = [...new Set(source.copy.map(c => `/${c.from}${isFilePath(c.from) ? '' : '/'}`))]
  git(dir, 'config', 'core.sparseCheckout', 'true')
  writeFileSync(join(dir, '.git', 'info', 'sparse-checkout'), `${patterns.join('\n')}\n`)

  const ref = update && !source.pin ? source.branch : source.commit
  git(dir, 'fetch', '-q', '--depth', '1', '--filter=blob:none', 'origin', ref)
  git(dir, 'checkout', '-q', '--force', 'FETCH_HEAD')
  return { dir, commit: git(dir, 'rev-parse', 'HEAD') }
}

function stripFrontmatter(text) {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
}

function rewriteLinks(text, links = {}) {
  let out = text
  for (const [from, to] of Object.entries(links)) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    out = out.replace(new RegExp(`\\]\\((?:\\./)?${escaped}`, 'g'), `](${to}`)
  }
  return out
}

// Repairs upstream links that point outside the copied tree, e.g. VueUse's "../useFoo/index.md".
function applyReplacements(text, replace = []) {
  return replace.reduce((out, [pattern, replacement]) => out.replace(new RegExp(pattern, 'g'), replacement), text)
}

function renderFile(text, copy, source, commit) {
  let body = copy.body ? stripFrontmatter(text) : text
  body = applyReplacements(rewriteLinks(body, copy.links), copy.replace)
  body = body.replace(/\r\n/g, '\n').replace(/^\n+/, '')
  if (!copy.body)
    return body
  const origin = `${source.repo.replace('https://github.com/', '')}@${commit.slice(0, 7)}`
  return `<!-- Synced from ${origin}:${copy.from} by scripts/sync.mjs. Edit sources.json, not this file. -->\n\n${body}`
}

function markdownFiles(dir) {
  return readdirSync(dir, { recursive: true })
    .map(name => join(dir, name))
    .filter(path => path.endsWith('.md'))
}

function copyDir(src, dest, { replace, exclude = [] }) {
  rmSync(dest, { recursive: true, force: true })
  cpSync(src, dest, {
    recursive: true,
    filter: (path) => {
      const name = basename(path)
      if (IGNORED_NAMES.has(name) || exclude.includes(name))
        return false
      return !(statSync(path).isDirectory() && IGNORED_DIRS.has(name))
    },
  })
  for (const file of markdownFiles(dest)) {
    const text = readFileSync(file, 'utf8')
    const fixed = applyReplacements(text, replace).replace(/\r\n/g, '\n')
    if (fixed !== text)
      writeFileSync(file, fixed)
  }
}

let changed = false
for (const source of manifest.sources) {
  if (only.size && !only.has(source.id))
    continue
  process.stdout.write(`${source.id.padEnd(22)} `)
  const { dir, commit } = checkout(source)
  for (const copy of source.copy) {
    const src = join(dir, copy.from)
    const dest = join(root, copy.to)
    if (!existsSync(src))
      throw new Error(`${source.id}: "${copy.from}" does not exist at ${commit}`)
    if (statSync(src).isDirectory()) {
      copyDir(src, dest, copy)
    }
    else {
      mkdirSync(dirname(dest), { recursive: true })
      writeFileSync(dest, renderFile(readFileSync(src, 'utf8'), copy, source, commit))
    }
  }
  if (commit !== source.commit) {
    console.log(`${source.commit.slice(0, 7)} -> ${commit.slice(0, 7)}`)
    source.commit = commit
    changed = true
  }
  else {
    console.log(`${commit.slice(0, 7)} (unchanged)`)
  }
}

if (changed) {
  manifest.synced = new Date().toISOString().slice(0, 10)
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
}
