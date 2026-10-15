// Minimal YAML frontmatter reader: top-level "key: value" pairs only, which is all SKILL.md needs.
export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!match)
    return null
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-z][\w-]*):\s*(.*)$/i)
    if (kv)
      data[kv[1]] = kv[2].replace(/^(['"])(.*)\1$/, '$2')
  }
  return { data, body: text.slice(match[0].length) }
}
