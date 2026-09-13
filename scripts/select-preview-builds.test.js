const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const script = path.resolve(__dirname, 'select-preview-builds.js');

test('Preview selection uses the entire PR, both rename endpoints, and a conservative fallback', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'preview-selection-'));
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  const write = (file, body = 'content') => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), body);
  };
  const commit = () => {
    git('add', '.');
    git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'Test');
    return git('rev-parse', 'HEAD');
  };
  try {
    git('init', '-q');
    write('src/content/guides/en/old.md');
    write('scripts/old.js');
    const base = commit();
    const select = (
      name = 'pull_request',
      event = { pull_request: { base: { sha: base }, head: { sha: git('rev-parse', 'HEAD') } } }
    ) => {
      const eventPath = path.join(root, '.git/event.json');
      fs.writeFileSync(eventPath, JSON.stringify(event));
      const result = spawnSync(process.execPath, [script], {
        cwd: root,
        encoding: 'utf8',
        env: {
          ...process.env,
          GITHUB_EVENT_NAME: name,
          GITHUB_EVENT_PATH: eventPath,
          GITHUB_OUTPUT: ''
        }
      });
      assert.equal(result.status, 0, result.stderr);
      return JSON.parse(result.stdout);
    };
    const scenarios = [
      ['addition', () => write('src/content/tech-center/en/api/new.md'), 1],
      ['deletion', () => fs.unlinkSync(path.join(root, 'src/content/guides/en/old.md')), 1],
      [
        'content rename',
        () => git('mv', 'src/content/guides/en/old.md', 'src/content/guides/en/new.md'),
        1
      ],
      [
        'code renamed into content',
        () => git('mv', 'scripts/old.js', 'src/content/guides/en/new.md'),
        2
      ],
      [
        'content renamed into code',
        () => git('mv', 'src/content/guides/en/old.md', 'scripts/new.js'),
        2
      ],
      ['code-bearing FAQ', () => write('src/faq/en.ts'), 2],
      ['unknown collection', () => write('notes/new.md'), 2],
      ['body modification', () => write('src/content/guides/en/old.md', 'Changed body'), 1],
      ['Guide registry', () => write('src/content/guides/registry.json', '[]'), 1],
      ['technical registry', () => write('src/components/tech-center/entries.json', '[]'), 1],
      ['competitor article', () => write('content/competitors/new.md'), 1],
      [
        'space and tab filename rename',
        () => git('mv', 'src/content/guides/en/old.md', 'src/content/guides/en/space é\ttab.md'),
        1
      ],
      [
        'newline filename fallback',
        () =>
          git('mv', 'src/content/guides/en/old.md', 'src/content/guides/en/space é\ttab\nline.md'),
        2
      ],
      [
        'file type change',
        () => {
          fs.unlinkSync(path.join(root, 'src/content/guides/en/old.md'));
          fs.symlinkSync(
            '../../../scripts/old.js',
            path.join(root, 'src/content/guides/en/old.md')
          );
        },
        2
      ],
      [
        'mixed files in one commit',
        () => {
          write('src/content/guides/en/new.md');
          write('scripts/new.js');
        },
        2
      ],
      [
        'component and content across commits',
        () => {
          write('src/components/new.tsx');
          commit();
          write('src/content/guides/en/new.md');
        },
        2
      ]
    ];
    for (const [label, edit, expected] of scenarios) {
      git('reset', '--hard', base);
      edit();
      const head = commit();
      const result = select();
      assert.equal(result.buildCount, expected, label);
      assert.equal(result.revision, head);
      assert.equal(result.baseRevision, base);
      assert.equal(result.headRevision, head);
      assert.equal(result.deployCrmMode, 'disabled');
      assert.equal(
        result.reason,
        label === 'file type change'
          ? 'unknown-inputs'
          : expected === 1
          ? 'published-content-only'
          : 'mixed-or-code-changes',
        label
      );
    }
    assert.equal(select('workflow_dispatch').buildCount, 2);
    assert.equal(select('pull_request', {}).buildCount, 2);
    assert.equal(
      select('pull_request', {
        pull_request: { base: { sha: 'f'.repeat(40) }, head: { sha: base } }
      }).buildCount,
      2
    );
    git('reset', '--hard', base);
    assert.equal(select().buildCount, 2);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
