const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const typescript = require('typescript');

const parserSource = fs.readFileSync(path.join(__dirname, '../src/lib/markdownParser.ts'), 'utf8');
const parserDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-markdown-parser-'));
const parserPath = path.join(parserDirectory, 'markdownParser.cjs');
fs.writeFileSync(
  parserPath,
  typescript.transpileModule(parserSource, {
    compilerOptions: {
      module: typescript.ModuleKind.CommonJS,
      target: typescript.ScriptTarget.ES2020
    }
  }).outputText
);
const { getMarkdownHeadings, parseMarkdown } = require(parserPath);

test.after(() => fs.rmSync(parserDirectory, { recursive: true, force: true }));

const markdown = [
  '# Guide',
  '',
  '## Steps',
  '- **Primary** [link](https://example.com) with `code`',
  '  - Nested item',
  '    1. Nested ordered item',
  '- Second item',
  '',
  '1. Ordered one',
  '2. Ordered two',
  '',
  '| Name | Value |',
  '| --- | --- |',
  '| FastGPT | `ready` |',
  '',
  '> **Note:** review the source.',
  '',
  '```mermaid',
  'flowchart LR',
  'A --> B',
  '```'
].join('\n');

test('parses guide Markdown blocks and nested lists', () => {
  const blocks = parseMarkdown(markdown, 'Guide');
  const lists = blocks.filter((block) => block.type === 'list');
  const unordered = lists[0];
  const ordered = lists[1];

  assert.equal(unordered.type, 'list');
  assert.equal(unordered.ordered, false);
  assert.equal(unordered.items.length, 2);
  assert.equal(unordered.items[0].text, '**Primary** [link](https://example.com) with `code`');
  assert.equal(unordered.items[0].children[0].ordered, false);
  assert.equal(unordered.items[0].children[0].items[0].children[0].ordered, true);
  assert.equal(ordered.type, 'list');
  assert.equal(ordered.ordered, true);
  assert.equal(ordered.items.length, 2);
});

test('keeps tables, blockquotes, fenced code, and heading anchors', () => {
  const blocks = parseMarkdown(markdown, 'Guide');

  assert.equal(
    blocks.some((block) => block.type === 'table'),
    true
  );
  assert.equal(
    blocks.some((block) => block.type === 'blockquote'),
    true
  );
  assert.deepEqual(
    blocks.find((block) => block.type === 'code'),
    { type: 'code', language: 'mermaid', value: 'flowchart LR\nA --> B' }
  );
  assert.deepEqual(getMarkdownHeadings(parseMarkdown(markdown, 'Guide'), 'guide-section'), [
    { level: 2, text: 'Steps', id: 'guide-section-steps' }
  ]);
});

test('normalizes inline Markdown in heading labels and anchors', () => {
  const formatted = [
    '# Guide',
    '',
    "## What This Solution *Doesn't* Do",
    '## Use \x60API\x60 [docs](https://example.com)'
  ].join('\n');

  assert.deepEqual(getMarkdownHeadings(parseMarkdown(formatted, 'Guide'), 'guide-section'), [
    {
      level: 2,
      text: "What This Solution Doesn't Do",
      id: 'guide-section-what-this-solution-doesn-t-do'
    },
    { level: 2, text: 'Use API docs', id: 'guide-section-use-api-docs' }
  ]);
});
