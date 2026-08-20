const assert = require('node:assert/strict');
const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const ROOT = path.resolve(__dirname, '..');
const SCRIPT = path.join(ROOT, 'scripts/verify-content-hygiene.js');

function writeFixture(root, relativePath, content) {
  const destination = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, content);
}

function createFixture(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-content-hygiene-'));
  for (const [relativePath, content] of Object.entries(files))
    writeFixture(root, relativePath, content);
  return root;
}

function runFixture(root, args = []) {
  return spawnSync(process.execPath, [SCRIPT, '--mode', 'source', '--root', root, ...args], {
    cwd: ROOT,
    encoding: 'utf8'
  });
}

function withFixture(files, assertion) {
  const root = createFixture(files);
  try {
    assertion(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function runAsync(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [SCRIPT, ...args], { cwd: ROOT });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.once('error', reject);
    child.once('close', (status) => resolve({ status, stdout, stderr }));
  });
}

const hiddenMetadata = '<!--\ninternal KB: delivery schedule and sign-off\n-->\n\n';
const cleanGuide = `${hiddenMetadata}# Durable guide\n\nAcme reduced handling time by 42%, with a caveat for incomplete source data.\n\n## Sources\n\n- [Public source](https://example.com/research)\n`;

test('source CLI accepts publishable markdown and keeps a leading hidden comment outside inspection', () => {
  withFixture({ 'src/content/guides/en/durable-guide.md': cleanGuide }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Content hygiene passed: 1 source file/);
    assert.equal(result.stderr, '');
    assert.equal(
      fs.readFileSync(path.join(root, 'src/content/guides/en/durable-guide.md'), 'utf8'),
      cleanGuide
    );
  });
});

test('source CLI aggregates visible editorial findings with stable actionable locations', () => {
  withFixture(
    {
      'src/content/guides/zh/dirty.md':
        '# 标题\n\n事实来源: 客户 KB 7.4；核验日 2026-07-20\n\n签发: 客户确认\n',
      'content/competitors/en/dirty.md':
        '# Comparison\n\n> Delivery schedule: Week 4\n\nRevision log: client review complete\n',
      'content/competitors/crlf-dirty.md': '# Comparison\r\n\r\nFact Source: internal KB\r\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal(result.stdout, '');
      assert.match(
        result.stderr,
        /D-01 editorial-metadata \| markdown-body \| locale=zh \| path=src\/content\/guides\/zh\/dirty\.md \| source=dirty \| line=3/
      );
      assert.match(
        result.stderr,
        /D-01 editorial-metadata \| markdown-body \| locale=en \| path=content\/competitors\/en\/dirty\.md \| source=dirty \| line=3/
      );
      assert.match(
        result.stderr,
        /D-01 editorial-metadata \| markdown-body \| locale=en \| path=content\/competitors\/en\/dirty\.md \| source=dirty \| line=5/
      );
      assert.match(
        result.stderr,
        /D-01 editorial-metadata \| markdown-body \| locale=default \| path=content\/competitors\/crlf-dirty\.md \| source=crlf-dirty \| line=3/
      );
    }
  );
});

test('source CLI requires public HTTPS markdown citations in Sources and References blocks', () => {
  const cases = [
    ['plain internal reference', '## Sources\n\n- Internal KB 7.4\n', /D-07 citation-policy/],
    [
      'localhost URL',
      '## References\n\n- [Local](https://localhost/reference)\n',
      /D-07 citation-policy/
    ],
    [
      'private URL',
      '## Sources\n\n- [Private](https://10.1.2.3/reference)\n',
      /D-07 citation-policy/
    ],
    [
      'credentials URL',
      '## Sources\n\n- [Credentials](https://user:pass@example.com/reference)\n',
      /D-07 citation-policy/
    ],
    ['HTTP URL', '## Sources\n\n- [HTTP](http://example.com/reference)\n', /D-07 citation-policy/],
    [
      'mixed URL list',
      '## Sources\n\n- [Public](https://example.com/reference) and [Private](http://127.0.0.1/reference)\n',
      /D-07 citation-policy/
    ]
  ];

  for (const [name, body, expected] of cases) {
    withFixture({ 'content/competitors/dirty.md': `# Comparison\n\n${body}` }, (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1, name);
      assert.match(result.stderr, expected, name);
    });
  }
});

test('source CLI requires every citation entry to contain only public HTTPS Markdown links', () => {
  const invalidEntries = [
    ' - [Public](https://example.com/reference) Internal KB 7.4',
    '- [Public](https://example.com/reference), [HTTP](http://example.com/reference)',
    '- [Public](https://example.com/reference); [Mapped loopback](https://[::ffff:127.0.0.1]/reference)',
    '- [Public](https://example.com/reference) and [Unspecified](https://0.0.0.0/reference)',
    '- [Loopback](https://127.0.0.1/reference)',
    '- [Private](https://10.0.0.1/reference)',
    '- [Link local](https://169.254.1.1/reference)',
    '- [Documentation](https://192.0.2.1/reference)',
    '- [Benchmark](https://198.18.0.1/reference)',
    '- [Reserved](https://240.0.0.1/reference)',
    '- [IPv6 unspecified](https://[::]/reference)',
    '- [IPv6 loopback](https://[::1]/reference)',
    '- [IPv6 unique local](https://[fd00::1]/reference)',
    '- [IPv6 link local](https://[fe80::1]/reference)',
    '- [Credentials](https://user:pass@example.com/reference)',
    '- [Localhost](https://subdomain.localhost/reference)'
  ];

  for (const entry of invalidEntries) {
    withFixture(
      { 'content/competitors/citation.md': `# Comparison\n\n## Sources\n\n${entry}\n` },
      (root) => {
        const result = runFixture(root);
        assert.equal(result.status, 1, entry);
        assert.match(result.stderr, /D-07 citation-policy/, entry);
      }
    );
  }

  withFixture(
    {
      'content/competitors/citation.md':
        '# Comparison\n\n## References\n\n> [Public source](https://example.com/research); [Second public source](https://www.iana.org/domains/reserved)\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI rejects future-dated editorial verification preambles', () => {
  withFixture(
    {
      'src/content/guides/en/future-date.md':
        '# Guide\n\nProduct capabilities and version boundaries are sourced from official public materials, verified as of 2027-01-01.\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /D-01 editorial-metadata/);
      assert.match(result.stderr, /line=3/);
    }
  );
});

test('source CLI rejects the shared editorial workflow labels in Markdown and structured copy', () => {
  withFixture(
    {
      'src/content/guides/en/editorial.md': [
        '# Guide',
        '',
        'Demand anchor: GSC demand data',
        'GSC provenance: Search Console export',
        'Case clearance: signed customer approval',
        'Publish target: fastgpt.io',
        'Verification workflow: release checklist',
        'Review cycle: quarterly',
        'Version plan: enterprise tier',
        ''
      ].join('\n'),
      'src/locales/en.json': '{"copy":"Demand anchor: Search Console export"}\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 8);
      assert.match(result.stderr, /structured-copy .*src\/locales\/en\.json/);
    }
  );
});

test('source CLI enforces citation grammar for labelled Markdown and structured copy', () => {
  const dirtyMarkdown = '# Guide\n\n> **Sources**: client KB\n';
  const cleanMarkdown =
    '# Guide\n\n**References**: [Official documentation](https://example.com/docs)\n';
  withFixture(
    {
      'src/content/guides/en/dirty.md': dirtyMarkdown,
      'src/locales/en.json': '{"References":"Internal KB"}\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2);
    }
  );
  withFixture(
    {
      'src/content/guides/en/clean.md': cleanMarkdown,
      'src/locales/en.json': '{"References":"[Official documentation](https://example.com/docs)"}\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI normalizes the full citation vocabulary and rich structured values', () => {
  const cleanEnglishCitation =
    JSON.stringify({
      copy: [
        '<p><strong>Sources:</strong> <a href="https://example.com/docs">Official docs</a>, ',
        '<a href="https://www.iana.org/domains/reserved">IANA registry</a></p>'
      ].join('')
    }) + '\n';
  const cleanChineseCitation = [
    '{"资料来源":"**资料来源：** [官方文档](https://example.com/docs)；',
    '[IANA 注册表](https://www.iana.org/domains/reserved)"}\n'
  ].join('');
  withFixture(
    {
      'src/content/guides/en/dirty.md': [
        '# Guide',
        '',
        '- **Source:** Internal KB',
        '> **references**: Internal KB',
        ''
      ].join('\n'),
      'src/content/guides/zh/dirty.md': '# 指南\n\n> **资料来源：** 内部 KB\n',
      'src/locales/en.json':
        JSON.stringify({
          copy: '<p><strong>Sources:</strong> Internal KB</p>',
          Schedule: 'weekly',
          version: '<p>Version-plan: enterprise</p>',
          update: '<p>Update-log: pending</p>',
          review: '<p>Review-cycle: monthly</p>',
          case: '<p>案例引用: approved</p>'
        }) + '\n',
      'src/locales/zh.json':
        JSON.stringify({
          参考资料: '<section><strong>资料来源：</strong> 内部 KB</section>'
        }) + '\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /D-07 citation-policy \| markdown-body .*dirty\.md/);
      assert.match(result.stderr, /D-07 citation-policy \| structured-copy .*zh\.json/);
      assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 5);
    }
  );
  withFixture(
    {
      'src/content/guides/zh/dirty.md': '# 指南\n\n> 来源：Internal KB\n',
      'src/locales/en.json':
        JSON.stringify({
          copy: [
            '<p><strong>Sources:</strong> ',
            '<a href="http://example.com/docs">Official docs</a></p>'
          ].join('')
        }) + '\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2);
    }
  );
  withFixture(
    {
      'src/locales/en.json': cleanEnglishCitation,
      'src/locales/zh.json': cleanChineseCitation
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI finds singular and later citation labels in structured source values', () => {
  const cleanJson =
    JSON.stringify({
      copy: 'Intro. Reference: <a href="https://example.com/docs">Official docs</a>'
    }) + '\n';
  const cleanTs =
    'export const copy = "Intro. Sources: <a href=\\"https://example.com/docs\\">Official docs</a>";\n';
  withFixture(
    {
      'src/locales/en.json': '{"copy":"Intro. REFERENCE: Internal KB"}\n',
      'src/faq/copy.ts': ['export const copy = `Intro', 'Sources: Internal KB`;', ''].join('\n'),
      'src/faq/copy.tsx': 'export const copy = <p>Intro. Sources: Internal KB</p>;\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3);
    }
  );
  withFixture(
    {
      'src/locales/en.json': cleanJson,
      'src/faq/copy.ts': cleanTs,
      'src/faq/copy.tsx':
        'export const copy = <p>Intro. Sources: <a href="https://example.com/docs">Official docs</a></p>;\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI applies Chinese citation labels and editorial fields anywhere in static copy', () => {
  const clean = 'resources: Internal KB\n';
  withFixture(
    {
      'src/content/guides/zh/dirty.md': '# 指南\n\n本文资料来源：内部 KB\n',
      'src/locales/zh.json': JSON.stringify({ copy: '本文资料来源：内部 KB' }) + '\n',
      'src/locales/en.json': JSON.stringify({ copy: 'Intro. Schedule: weekly' }) + '\n',
      'src/faq/fold.ts': [
        'export const dirty = "Sou" + "rces: Internal KB";',
        'export const template = `Sou${"rces: Internal KB"}`;',
        'export const clean = "Sources: " + \'<a href="https://example.com/docs">Official docs</a>\';',
        ''
      ].join('\n'),
      'src/faq/resources.ts': `export const copy = '${clean.trim()}';\n`
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 4);
      assert.match(result.stderr, /D-01 editorial-metadata/);
      assert.doesNotMatch(result.stderr, /resources\.ts/);
    }
  );
});

test('source CLI projects static JSX citation content without child duplicates', () => {
  withFixture(
    {
      'src/faq/dirty.tsx': [
        "export const english = <><span>{'Sources'}</span>: Internal KB</>;",
        "export const chinese = <section><strong>{'资料来源'}</strong>：内部 KB</section>;",
        'export const template = <p>{`Sou${"rces: Internal KB"}`}</p>;',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3);
    }
  );
  withFixture(
    {
      'src/faq/clean.tsx': [
        'export const clean = <section><span>Sources</span>: ',
        '<a href="https://example.com/docs">Official docs</a></section>;',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI fails closed for unparseable production structured copy', () => {
  withFixture({ 'src/locales/en.json': '{"copy":\n' }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Unable to parse structured source/);
  });
});

test('source CLI fails closed for dynamic policy keys and traverses dynamic expressions', () => {
  withFixture(
    {
      'src/faq/dynamic.tsx': [
        'const value = getValue();',
        'export const copy = { Sources: value, Schedule: value };',
        'export const branch = value ? "Sources: Internal KB" : "Clean";',
        'export const jsx = <a Sources={value} Schedule={value} href={value}>Sources: Internal KB</a>;',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /D-01 editorial-metadata/);
      assert((result.stderr.match(/D-07 citation-policy/g) || []).length >= 3);
    }
  );
});

test('source CLI keeps static fragments around dynamic expressions and JSX policy attributes', () => {
  const dirty = [
    'const dynamic = getValue();',
    'export const templateHead = `Sources: ${dynamic}`;',
    'export const templateTail = `Intro ${dynamic} Sources: Internal KB`;',
    "export const binary = dynamic + 'Sources: Internal KB';",
    "export const subtraction = dynamic - 'Sources: Internal KB';",
    "export const conditional = dynamic ? 'Clean' : 'Sources: Internal KB';",
    'export const jsxTemplate = <p>{`Sources: ${dynamic}`}</p>;',
    "export const jsxBinary = <p>{dynamic + 'Sources: Internal KB'}</p>;",
    "export const jsxConditional = <p>{dynamic ? 'Clean' : 'Sources: Internal KB'}</p>;",
    'export const attributes = <Copy Sources={dynamic} Schedule={dynamic}></Copy>;',
    ''
  ].join('\n');
  const clean = [
    'export const source = "Sources: " + \'<a href="https://example.com/docs">Official docs</a>\';',
    'export const jsx = <p>Sources: <a href={`https://example.com/docs`}>Official docs</a></p>;',
    ''
  ].join('\n');
  withFixture({ 'src/faq/dirty.tsx': dirty }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 9);
    assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 1);
  });
  withFixture({ 'src/faq/clean.tsx': clean }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 0, result.stderr);
  });
});

test('source CLI applies the full editorial vocabulary while preserving Chinese implementation plans', () => {
  withFixture(
    {
      'src/content/guides/en/editorial.md': [
        '# Guide',
        '',
        'Demand basis: internal research',
        'Fact sources: internal research',
        'Edition: preview',
        '计划：W4',
        '实施计划：reader rollout',
        ''
      ].join('\n'),
      'src/locales/en.json':
        '{"Demand basis":"opaque","copy":"Fact sources: opaque","计划":"W4","clean":"实施计划：reader rollout"}\n',
      'src/faq/editorial.ts': [
        'const dynamic = getValue();',
        'export const copy = "Edition: preview";',
        'export const metadata = { "Demand basis": dynamic, 计划安排: dynamic, copy: "实施计划：reader rollout" };',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 10);
      assert.match(result.stderr, /Demand basis/);
      assert.match(result.stderr, /Fact sources/);
      assert.match(result.stderr, /Edition/);
      assert.match(result.stderr, /计划/);
      assert.doesNotMatch(result.stderr, /实施计划/);
    }
  );
});

test('source CLI normalizes entities and preserves policy keys with exact source locations', () => {
  withFixture(
    {
      'content/competitors/entities.md': [
        '# Guide',
        '',
        'Sources&colon; Internal KB',
        'Demand&nbsp;basis: internal research',
        'Sources: [Localhost](https://localhost./guide)',
        ''
      ].join('\n'),
      'src/locales/en.json': [
        '{',
        '  "one": "Demand basis: internal",',
        '  "two": "Demand basis: internal",',
        '  "Sources": null,',
        '  "Schedule": 1,',
        '  "nested": { "Sources": ["Internal KB"] }',
        '}',
        ''
      ].join('\n'),
      'src/faq/policy.tsx': [
        'const Sources = getValue();',
        "export const computed = { ['Sources']: 'Internal KB' };",
        'export const shorthand = { Sources };',
        'export const nested = <div><Copy Sources={Sources} /></div>;',
        "export const spread = <Copy {...{ Schedule: 'W4' }} />;",
        'export const multiline = `',
        'Demand basis: internal',
        '`;',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /path=content\/competitors\/entities\.md .*line=3/);
      assert.match(result.stderr, /Demand&nbsp;basis/);
      assert.match(result.stderr, /localhost\./);
      assert.match(result.stderr, /path=src\/locales\/en\.json \| source=en \| line=2/);
      assert.match(result.stderr, /path=src\/locales\/en\.json \| source=en \| line=3/);
      assert.match(result.stderr, /path=src\/faq\/policy\.tsx \| source=policy \| line=7/);
      assert((result.stderr.match(/D-07 citation-policy/g) || []).length >= 5);
      assert((result.stderr.match(/D-01 editorial-metadata/g) || []).length >= 5);
    }
  );
  withFixture(
    {
      'content/competitors/clean.md':
        '# Guide\n\nSources: [Wikipedia Foo](https://en.wikipedia.org/wiki/Foo_(bar))\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI normalizes policy whitespace, lowercase JSON keys, and JSX expression branches', () => {
  withFixture(
    {
      'content/competitors/normalization.md': [
        '# Guide',
        '',
        'Sign&NewLine;off: pending',
        'Version&Tab;plan: internal',
        'Demand&#160;basis: internal',
        'Sources: [Local](https://localhost./guide)',
        ''
      ].join('\n'),
      'src/locales/en.json': [
        '{',
        '  "sources": ["Sources: Internal KB"],',
        '  "references": { "nested": true },',
        '  "schedule": false',
        '}',
        ''
      ].join('\n'),
      'src/faq/branches.tsx': [
        'const dynamic = getValue();',
        'export const conditional = dynamic ? <Copy Sources={dynamic} /> : <Copy {...{ Schedule: "W4" }} />;',
        'export const logical = dynamic && <Copy Sources={dynamic} />;',
        'export const multiline = `Sources: Internal KB',
        'Demand&#160;basis: internal`;',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /Sign&NewLine;off/);
      assert.match(result.stderr, /Version&Tab;plan/);
      assert.match(result.stderr, /Demand&#160;basis/);
      assert.match(result.stderr, /path=src\/locales\/en\.json \| source=en \| line=2/);
      assert.match(result.stderr, /path=src\/locales\/en\.json \| source=en \| line=3/);
      assert.match(result.stderr, /path=src\/faq\/branches\.tsx \| source=branches \| line=4/);
      assert.match(result.stderr, /path=src\/faq\/branches\.tsx \| source=branches \| line=5/);
      assert((result.stderr.match(/D-07 citation-policy/g) || []).length >= 5);
      assert((result.stderr.match(/D-01 editorial-metadata/g) || []).length >= 5);
    }
  );
});

test('source CLI scans public FAQ metadata records while excluding top-level provenance', () => {
  withFixture(
    {
      'src/faq/generated-en-metadata.json': [
        '{',
        '  "source": { "Sources": null },',
        '  "records": [{ "title": "Demand basis: internal", "description": "clean" }]',
        '}',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /D-01 editorial-metadata/);
      assert.doesNotMatch(result.stderr, /D-07 citation-policy/);
      assert.match(result.stderr, /line=3/);
    }
  );
});

test('source CLI keeps cross-line HTTPS citations intact and catches JSX expression branches', () => {
  withFixture(
    {
      'src/faq/expressions.tsx': [
        'const dynamic = getValue();',
        'export const clean = `Sources:',
        '[Public docs](https://example.com/docs)`;',
        'export const root = <>{<Copy Sources={dynamic} />}</>;',
        'export const nested = { ...{ ...{ Schedule: "W4" } } };',
        'export const crossLabel = `Demand',
        'basis: internal`;',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1);
      assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 2);
      assert.match(
        result.stderr,
        /path=src\/faq\/expressions\.tsx \| source=expressions \| line=6/
      );
      assert.doesNotMatch(result.stderr, /Public docs/);
    }
  );
});

test('source CLI rejects bare labelled URLs and accepts descriptive technical citations', () => {
  withFixture(
    {
      'src/content/guides/zh/dirty.md': '# 指南\n\n> 来源：https://doc.fastgpt.cn/zh-CN/guide\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /D-07 citation-policy/);
    }
  );
  withFixture(
    {
      'src/content/guides/zh/clean.md': [
        '# 指南',
        '',
        '> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide)',
        '> 来源：[FastGPT GitHub Issue #42](https://github.com/labring/FastGPT/issues/42)',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI excludes byte-zero YAML front matter across Markdown surfaces', () => {
  const frontMatter = [
    '---',
    'source: https://doc.fastgpt.cn/zh-CN/guide',
    '---',
    '<!-- internal metadata -->',
    ''
  ].join('\n');
  const citation = '> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide)\n';
  withFixture(
    {
      'src/content/tech-center/tutorial/metadata.md': `${frontMatter}${citation}`,
      'src/content/guides/zh/front-matter.md': `${frontMatter}${citation}`,
      'content/competitors/front-matter.md': `${frontMatter}${citation}`
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI enforces citation policy for source labels in reader bodies', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/reader-body.md': [
        '# Guide',
        '',
        'source: https://doc.fastgpt.cn/zh-CN/guide',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /D-07 citation-policy/);
    }
  );
});

test('source CLI scans structured FAQ and locale copy without treating syntax as published Markdown', () => {
  withFixture(
    {
      'src/faq/clean.ts': "export const answer = 'source delivery editor';\n",
      'src/locales/en.json': '{"answer":"Fact Source: internal KB"}\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.match(
        result.stderr,
        /D-01 editorial-metadata \| structured-copy \| locale=default \| path=src\/locales\/en\.json \| source=en \| line=1/
      );
    }
  );
});

test('source CLI accepts ordinary generic technical prose outside structured editorial metadata', () => {
  withFixture(
    {
      'src/content/guides/zh/ordinary.md':
        '# 技术说明\n\n更新记录、source、delivery 和 编辑 是团队日常术语。\n',
      'content/competitors/en/ordinary.md':
        '# Comparison\n\nThe source delivery editor validates technical content.\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /2 source files/);
    }
  );
});

test('source CLI validates its public argument protocol', () => {
  for (const argv of [[], ['--mode'], ['--mode', 'html'], ['--root'], ['--unknown']]) {
    const result = spawnSync(process.execPath, [SCRIPT, ...argv], { cwd: ROOT, encoding: 'utf8' });
    assert.equal(result.status, 1, argv.join(' '));
    assert.match(result.stderr, /Usage: verify-content-hygiene/);
  }
});

test('source CLI defaults to the repository root', () => {
  const result = spawnSync(process.execPath, [SCRIPT, '--mode', 'source'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Content hygiene passed: \d+ source files/);
});

test('the cleaned corpus keeps named cases, outcome metrics, and caveats', () => {
  const result = spawnSync(process.execPath, [SCRIPT, '--mode', 'source'], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr);

  const manufacturing = fs.readFileSync(
    path.join(
      ROOT,
      'src/content/guides/zh/manufacturing-itops-invoice-audit.zh.md'
    ),
    'utf8'
  );
  const biopharma = fs.readFileSync(
    path.join(
      ROOT,
      'src/content/guides/en/pharma-compliance-docs.en.md'
    ),
    'utf8'
  );
  const biopharmaZh = fs.readFileSync(
    path.join(
      ROOT,
      'src/content/guides/zh/pharma-compliance-docs.zh.md'
    ),
    'utf8'
  );
  assert.match(manufacturing, /延锋国际/);
  assert.match(manufacturing, /70%/);
  assert.match(manufacturing, /不构成对其他项目效果的承诺/);
  assert.match(biopharma, /Sinocare Biotech/);
  assert.match(biopharma, /about 20% of routine inquiries/);
  assert.match(biopharma, /3–5 minutes to under 30 seconds/);
  assert.match(biopharma, /90%/);
  assert.match(biopharmaZh, /约 20% 常规咨询/);
  assert.match(biopharmaZh, /OA 流程发起从 3–5 分钟缩短至 30 秒内/);
  assert.match(biopharmaZh, /人才报告生成效率提升 90%/);
});

test('HTML CLI recursively scans visible content separately from serialized payloads', () => {
  withFixture(
    {
      'index.html':
        '<html><body><h1>Home</h1><section><h2>Sources</h2><a href="https://example.com/research">Public source</a></section></body></html>',
      'guide/nested/index.html':
        '<html><body><script type="application/json">{"citation":"https://example.com/payload"}</script><p>Clean page</p></body></html>'
    },
    (root) => {
      const clean = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(clean.status, 0, clean.stderr);
      assert.match(clean.stdout, /Content hygiene passed: 2 HTML files/);

      fs.writeFileSync(
        path.join(root, 'guide/nested/index.html'),
        '<html><body><p>Fact Source: internal KB</p></body></html>'
      );
      const visible = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(visible.status, 1);
      assert.match(visible.stderr, /visible/);
      assert.match(visible.stderr, /editorial-metadata/);

      fs.writeFileSync(
        path.join(root, 'guide/nested/index.html'),
        '<html><body><script type="application/json">{"Fact Source":"internal KB"}</script></body></html>'
      );
      const dirty = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(dirty.status, 1);
      assert.match(dirty.stderr, /payload/);
      assert.match(dirty.stderr, /editorial-metadata/);
    }
  );
});

test('HTML CLI accepts published version labels and rejects adjacent editorial workflow fields', () => {
  withFixture(
    {
      'zh/price.html': '<html><body><h2>版本：</h2><p>企业版</p></body></html>',
      'zh/internal.html': '<html><body><p>版本：企业版</p><p>事实来源：内部 KB</p></body></html>'
    },
    (root) => {
      fs.rmSync(path.join(root, 'zh/internal.html'));
      const clean = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'cn'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(clean.status, 0, clean.stderr);

      writeFixture(
        root,
        'zh/internal.html',
        '<html><body><p>版本：企业版</p><p>事实来源：内部 KB</p></body></html>'
      );
      const dirty = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'cn'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(dirty.status, 1);
      assert.match(dirty.stderr, /事实来源/);
    }
  );
});

test('HTML CLI applies shared editorial labels and citation grammar to visible and payload projections', () => {
  withFixture(
    {
      'index.html':
        '<html><body><p>Demand anchor: Search Console</p><p><strong>Sources:</strong> Internal KB</p><script>{"Publish target":"fastgpt.io"}</script></body></html>'
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(result.status, 1);
      assert.match(result.stderr, /editorial-metadata \| visible/);
      assert.match(result.stderr, /editorial-metadata \| payload/);
      assert.match(result.stderr, /citation-policy/);
    }
  );
  withFixture(
    {
      'index.html':
        '<html><body><blockquote><strong>References:</strong> <a href="https://example.com/docs">Official documentation</a></blockquote><ul><li>Sources: <a href="https://example.com/research">Published research</a></li></ul></body></html>'
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('HTML CLI normalizes nested bilingual citation labels across visible containers', () => {
  withFixture(
    {
      'index.html': [
        '<html><body>',
        '<div><strong>Source:</strong> Internal KB</div>',
        '<section><strong>资料来源：</strong> 内部 KB</section>',
        '<aside><strong>参考资料</strong>：Internal KB</aside>',
        '<dl><dt><strong>References:</strong> Internal KB</dt>',
        '<dd><strong>来源：</strong> Internal KB</dd></dl>',
        '<p>Schedule: weekly</p><script>{"Update-log":"pending"}</script>',
        '</body></html>'
      ].join('')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 5);
      assert.match(result.stderr, /Schedule/);
      assert.match(result.stderr, /Update-log/);
    }
  );
  withFixture(
    {
      'index.html': [
        '<html><body><section><strong>资料来源：</strong> ',
        '<a href="https://example.com/docs">官方文档</a>；',
        '<a href="https://www.iana.org/domains/reserved">IANA 注册表</a></section>',
        '<aside><strong>Source:</strong> ',
        '<a href="https://example.com/research">Published research</a></aside></body></html>'
      ].join('')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('HTML CLI projects mixed-case nested citation labels and links', () => {
  const dirty = [
    '<html><body><DiV>Intro. <SpAn><StRoNg>REFERENCE:</StRoNg></SpAn> Internal KB</DiV>',
    '<SeCtIoN><div><DIV><strong>Sources:</strong> Internal KB</DIV></div></SeCtIoN>',
    '</body></html>'
  ].join('');
  const clean = [
    '<html><body><DiV>Intro. <SpAn><StRoNg>REFERENCE:</StRoNg></SpAn> ',
    '<A HREF="https://example.com/docs">Official docs</A></DiV>',
    '<SeCtIoN><div><DIV><strong>Sources:</strong> ',
    '<a href="https://www.iana.org/domains/reserved">IANA registry</a></DIV></div></SeCtIoN>',
    '</body></html>'
  ].join('');
  withFixture({ 'index.html': dirty }, (root) => {
    const result = spawnSync(
      process.execPath,
      [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
      {
        cwd: ROOT,
        encoding: 'utf8'
      }
    );
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2);
  });
  withFixture({ 'index.html': clean }, (root) => {
    const result = spawnSync(
      process.execPath,
      [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
      {
        cwd: ROOT,
        encoding: 'utf8'
      }
    );
    assert.equal(result.status, 0, result.stderr);
  });
});

test('HTML CLI strips citation comments and retains visible source offsets', () => {
  const dirty = [
    '<html>',
    '<body>',
    '<p>Clean</p>',
    '<div>',
    '<p>Sources<!-- -->: Internal KB</p>',
    '<p>本文资料来源：内部 KB</p>',
    '</div>',
    '</body>',
    '</html>'
  ].join('\n');
  const clean =
    '<html><body><p>Sources<!-- -->: <a href="https://example.com/docs">Official docs</a></p></body></html>';
  withFixture({ 'index.html': dirty }, (root) => {
    const result = spawnSync(
      process.execPath,
      [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
      { cwd: ROOT, encoding: 'utf8' }
    );
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2);
    assert.match(result.stderr, /line=5/);
  });
  withFixture({ 'index.html': clean }, (root) => {
    const result = spawnSync(
      process.execPath,
      [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
      { cwd: ROOT, encoding: 'utf8' }
    );
    assert.equal(result.status, 0, result.stderr);
  });
});

test('HTML CLI fails closed for a missing or empty output root', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-content-hygiene-html-'));
  try {
    for (const outputRoot of [path.join(root, 'missing'), root]) {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', outputRoot, '--variant', 'io'],
        {
          cwd: ROOT,
          encoding: 'utf8'
        }
      );
      assert.equal(result.status, 1);
      assert.match(result.stderr, /HTML root.*\.html files|HTML root does not exist/);
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('HTML CLI maps projected visible findings to raw source offsets', () => {
  const fixture = [
    '<html>',
    '<body>',
    '<!-- Sources: Internal KB --><p title="Schedule: weekly">Clean</p>',
    '<p>Sou<!-- SSR -->rces: Internal KB</p>',
    '<div data-note="Sources: Internal KB">Clean</div>',
    '<p>Schedule: weekly</p>',
    '</body>',
    '</html>'
  ].join('\n');
  withFixture({ 'index.html': fixture }, (root) => {
    const result = spawnSync(
      process.execPath,
      [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
      { cwd: ROOT, encoding: 'utf8' }
    );
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1);
    assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 1);
    assert.match(result.stderr, /line=4/);
    assert.match(result.stderr, /line=6/);
    assert.doesNotMatch(result.stderr, /line=3|line=5/);
  });
});

test('HTML CLI normalizes entity and cross-node policy labels with raw offsets', () => {
  withFixture(
    {
      'index.html': [
        '<html>',
        '<body>',
        '<p>Sources&colon; Internal KB</p>',
        '<span>Demand',
        '</span><span>basis: internal research</span>',
        '<script>',
        '{"copy":"Demand basis: internal research"}',
        '</script>',
        '</body>',
        '</html>'
      ].join('\n')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1);
      assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 2);
      assert.match(result.stderr, /visible .*line=3/);
      assert.match(result.stderr, /visible .*line=4/);
      assert.match(result.stderr, /payload .*line=7/);
    }
  );
});

test('source CLI joins inline paragraph whitespace while retaining Markdown block boundaries', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/inline.md': [
        '# Guide',
        '',
        'Sources',
        ': Internal KB',
        '',
        'Demand\u00adbasis: internal',
        '',
        'Sources\u00ad: Internal KB',
        ''
      ].join('\n'),
      'src/content/tech-center/tutorial/boundaries.md': [
        '# Guide',
        '',
        'Sources',
        '',
        ': Internal KB',
        '## Other',
        ': Internal KB',
        '- Sources',
        '- : Internal KB',
        '',
        'Sources',
        ': [Public documentation](https://example.com/docs)',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2, result.stderr);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        1,
        result.stderr
      );
      assert.match(result.stderr, /path=src\/content\/tech-center\/tutorial\/inline\.md.*line=3/);
      assert.match(result.stderr, /path=src\/content\/tech-center\/tutorial\/inline\.md.*line=6/);
      assert.match(result.stderr, /path=src\/content\/tech-center\/tutorial\/inline\.md.*line=8/);
      assert.doesNotMatch(result.stderr, /boundaries\.md/);
    }
  );
});

test('HTML CLI joins inline paragraph whitespace while retaining block boundaries', () => {
  withFixture(
    {
      'index.html': [
        '<html><body>',
        '<p><span>Sources</span>',
        '<span>: Internal KB</span></p>',
        '<p>Sources',
        ': Internal KB</p>',
        '<p>Demand\u00adbasis: internal</p>',
        '<p>Sources\u00ad: Internal KB</p>',
        '<p>Sources</p><p>: Internal KB</p>',
        '<h2>Other</h2><p>: Internal KB</p>',
        '<ul><li>Sources</li><li>: Internal KB</li></ul>',
        '<p>Sources',
        ': <a href="https://example.com/docs">Public documentation</a></p>',
        '</body></html>'
      ].join('\n')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3, result.stderr);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        1,
        result.stderr
      );
      assert.match(result.stderr, /visible .*line=2/);
      assert.match(result.stderr, /visible .*line=4/);
      assert.match(result.stderr, /visible .*line=6/);
      assert.match(result.stderr, /visible .*line=7/);
      assert.doesNotMatch(result.stderr, /line=8|line=9|line=10|line=11/);
    }
  );
});

test('source CLI projects CommonMark quote and list continuations with label offsets', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/blocks.md': [
        '# Guide',
        '',
        '> Sources',
        '> : Internal KB',
        '',
        '> Sources',
        '> : [Public documentation](https://example.com/docs)',
        '',
        '- Sources',
        '  : Internal KB',
        '',
        '- Sources',
        '  : [Public documentation](https://example.com/docs)',
        '',
        'Introductory text',
        'Sources: [Public documentation](https://example.com/docs)',
        'References',
        ': Internal KB',
        '',
        '<p>Sources</p>',
        '<p>: Internal KB</p>',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3, result.stderr);
      assert.match(result.stderr, /blocks\.md.*line=3/);
      assert.match(result.stderr, /blocks\.md.*line=9/);
      assert.match(result.stderr, /blocks\.md.*line=17/);
      assert.doesNotMatch(result.stderr, /blocks\.md.*line=20|blocks\.md.*line=21/);
    }
  );
});

test('source CLI respects CommonMark lazy boundaries and reader-visible Markdown text', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/commonmark.md': [
        '# Guide',
        '',
        '> Sources',
        ': Internal KB',
        '',
        '> Sources',
        ': [Public documentation](https://example.com/docs)',
        '',
        '> > Sources',
        '> >',
        '> > : Internal KB',
        '',
        '> Sources',
        '> ## Other',
        '> : Internal KB',
        '',
        '- Sources',
        ': Internal KB',
        '',
        '<p>Demand',
        'basis: internal</p>',
        '<p>Sources<br>',
        ': Internal KB</p>',
        '<p>Sources</p>',
        '<p>: Internal KB</p>',
        '**Demand**',
        '__basis__: internal',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3, result.stderr);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        1,
        result.stderr
      );
      assert.match(result.stderr, /commonmark\.md.*line=3/);
      assert.match(result.stderr, /commonmark\.md.*line=17/);
      assert.match(result.stderr, /commonmark\.md.*line=22/);
      assert.match(result.stderr, /commonmark\.md.*line=20/);
      assert.doesNotMatch(
        result.stderr,
        /commonmark\.md.*line=9|commonmark\.md.*line=13|commonmark\.md.*line=24/
      );
    }
  );
});

test('source CLI projects ATX heading text and retains citation section state', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/headings.md': [
        '# Guide',
        '',
        '## Demand basis: internal research',
        '## Sources: Internal KB',
        '## Sources',
        '- Internal KB',
        '## Other',
        '- Internal KB',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        1,
        result.stderr
      );
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2, result.stderr);
      assert.match(result.stderr, /headings\.md.*line=3/);
      assert.match(result.stderr, /headings\.md.*line=4/);
      assert.match(result.stderr, /headings\.md.*line=6/);
      assert.doesNotMatch(result.stderr, /headings\.md.*line=8/);
    }
  );
});

test('source CLI follows CommonMark emphasis, escaping, and code span semantics', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/dirty-delimiters.md': [
        '# Guide',
        '',
        '***Demand**',
        'basis: internal*',
        '**Sources**: Internal KB',
        '`Sources: Internal KB`',
        '*Demand',
        'basis: internal',
        '\\*Demand',
        'basis: internal',
        '`Reference: Internal KB',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        3,
        result.stderr
      );
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3, result.stderr);
      assert.match(result.stderr, /dirty-delimiters\.md.*line=3/);
      assert.match(result.stderr, /dirty-delimiters\.md.*line=5/);
      assert.match(result.stderr, /dirty-delimiters\.md.*line=6/);
      assert.match(result.stderr, /dirty-delimiters\.md.*line=7/);
      assert.match(result.stderr, /dirty-delimiters\.md.*line=9/);
      assert.match(result.stderr, /dirty-delimiters\.md.*line=11/);
    }
  );

  withFixture(
    {
      'src/content/tech-center/tutorial/clean-delimiters.md': [
        '# Guide',
        '',
        'Demand**',
        'basis**: internal',
        '',
        'Demand_',
        'basis_: internal',
        '',
        '*Demand**\u200Bbasis: internal*',
        '',
        '`<p>Sources</p><p>: Internal KB</p>`',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );

  const implementation = fs.readFileSync(SCRIPT, 'utf8');
  assert.doesNotMatch(implementation, /indexOf\(delimiter/);
  assert.match(implementation, /function violatesRuleOfThree\(/);
});

test('source CLI keeps CommonMark type-1 HTML blocks open through blank lines', () => {
  const blocks = ['pre', 'script', 'style', 'textarea']
    .map((tag) => `<${tag}>\nDemand\n\nbasis: internal\n</${tag}>`)
    .join('\n\n');
  withFixture(
    { 'src/content/tech-center/tutorial/type-1-blocks.md': `# Guide\n\n${blocks}\n` },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        4,
        result.stderr
      );
      for (const line of [4, 10, 16, 22]) {
        assert.match(result.stderr, new RegExp(`type-1-blocks\\.md.*line=${line}`));
      }
    }
  );
  withFixture(
    {
      'src/content/tech-center/tutorial/type-1-boundary.md':
        '# Guide\n\n<pre>Sources\n</pre>\n: Internal KB\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI terminates special HTML blocks with their CommonMark delimiters', () => {
  const dirty = [
    '# Guide',
    '',
    '<!--',
    'Demand',
    '',
    'basis: internal',
    '-->',
    '<?Demand',
    '',
    'basis: internal?>',
    '<!DOCTYPE',
    'Demand',
    '',
    'basis: internal',
    '>',
    '<![CDATA[',
    'Sources',
    '',
    ': Internal KB',
    ']]>',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/special-blocks.md': dirty }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 3, result.stderr);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
  });
  const clean = [
    '# Guide',
    '',
    '<!-- Sources -->',
    ': Internal KB',
    '<?Sources?>',
    ': Internal KB',
    '<!DOCTYPE Sources>',
    ': Internal KB',
    '<![CDATA[Sources]]>',
    ': Internal KB',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/special-boundaries.md': clean }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 0, result.stderr);
  });
});

test('source CLI scopes citation headings to contiguous logical containers', () => {
  const body = [
    '# Guide',
    '',
    '## Other',
    '> Internal KB',
    '- Internal KB',
    'Root copy after containers.',
    '',
    '> ## Sources:',
    '> Internal KB',
    '',
    'Root copy after quote.',
    '',
    '- ## Sources:',
    '  Internal KB',
    '- Internal KB',
    '',
    '## Sources',
    '### Notes',
    'Internal KB',
    '## Other',
    'Internal KB',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/containers.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3, result.stderr);
    assert.match(result.stderr, /containers\.md.*line=9/);
    assert.match(result.stderr, /containers\.md.*line=14/);
    assert.match(result.stderr, /containers\.md.*line=19/);
    assert.doesNotMatch(
      result.stderr,
      /containers\.md.*line=4|line=5|line=6|line=11|line=15|line=21/
    );
  });
});

test('source CLI resolves citation state through ordered container ancestors', () => {
  const body = [
    '# Guide',
    '',
    '## Sources',
    '- ## Other',
    '  Internal KB',
    '- Internal KB',
    '> > Internal KB',
    '## Other',
    '- ## Sources',
    '  - Internal KB',
    'Root copy after child Sources.',
    '> ## Sources',
    '> > ## Other',
    '> > Internal KB',
    '> [Public documentation](https://example.com/docs)',
    '> > Internal KB',
    'Root copy after quote Sources.',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/ancestors.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 4, result.stderr);
    for (const line of [6, 7, 10, 16]) {
      assert.match(result.stderr, new RegExp(`ancestors\\.md.*line=${line}`));
    }
    assert.doesNotMatch(result.stderr, /ancestors\.md.*line=5|line=11|line=14|line=15|line=17/);
  });
});

test('source CLI preserves loose and nested list-item citation scope', () => {
  const body = [
    '# Guide',
    '',
    '- ## Sources',
    '',
    '  Internal KB',
    '- Internal KB',
    '- ## Sources',
    '',
    '  ## Other',
    '',
    '  Internal KB',
    '- ## Sources',
    '',
    '  - Internal KB',
    '> - ## Sources',
    '>',
    '>   Internal KB',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/loose-lists.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3, result.stderr);
    for (const line of [5, 14, 17]) {
      assert.match(result.stderr, new RegExp(`loose-lists\\.md.*line=${line}`));
    }
    assert.doesNotMatch(result.stderr, /loose-lists\.md.*line=6|line=11/);
  });
});

test('source CLI limits lazy continuation to active paragraph children', () => {
  const body = [
    '# Guide',
    '',
    '> ## Sources',
    'Root copy after quote heading.',
    '',
    '- ## Sources',
    'Root copy after list heading.',
    '',
    '> <div>Sources</div>',
    ': Internal KB after quote HTML.',
    '',
    '- <div>Sources</div>',
    ': Internal KB after list HTML.',
    '',
    '> Sources',
    ': Internal KB',
    '',
    '- Sources',
    ': Internal KB',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/lazy-children.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2, result.stderr);
    assert.match(result.stderr, /lazy-children\.md.*line=15/);
    assert.match(result.stderr, /lazy-children\.md.*line=18/);
    assert.doesNotMatch(result.stderr, /lazy-children\.md.*line=3|line=6|line=9|line=12/);
  });
});

test('source CLI follows the deepest paragraph for nested lazy continuation', () => {
  const body = [
    '# Guide',
    '',
    '> > Sources',
    ': Internal KB',
    '',
    '- - Sources',
    ': Internal KB',
    '',
    '> > ## Sources',
    'Root copy after nested quote heading.',
    '',
    '- - ## Sources',
    'Root copy after nested list heading.',
    '',
    '> > <div>Sources</div>',
    ': Internal KB after nested quote HTML.',
    '',
    '- - <div>Sources</div>',
    ': Internal KB after nested list HTML.',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/nested-lazy.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2, result.stderr);
    assert.match(result.stderr, /nested-lazy\.md.*line=3/);
    assert.match(result.stderr, /nested-lazy\.md.*line=6/);
    assert.doesNotMatch(result.stderr, /nested-lazy\.md.*line=9|line=12|line=15|line=18/);
  });
});

test('source CLI resolves list indentation with four-column tab stops', () => {
  const body = [
    '# Guide',
    '',
    '- ## Sources',
    '\tInternal KB',
    '',
    '-\t## Sources',
    '\tInternal KB',
    '',
    '-\t## Sources',
    '   Internal KB',
    '',
    '-\t## Sources',
    '\t-\tInternal KB',
    '',
    '-\t## Sources',
    '   - Internal KB',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/tab-lists.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3, result.stderr);
    for (const line of [4, 7, 13]) {
      assert.match(result.stderr, new RegExp(`tab-lists\\.md.*line=${line}`));
    }
    assert.doesNotMatch(result.stderr, /tab-lists\.md.*line=10|line=16/);
  });
});

test('source CLI preserves original columns through nested list stripping', () => {
  const body = [
    '# Guide',
    '',
    '- Parent',
    ' \t- \t## Sources',
    '  \tInternal KB',
    '',
    '- Parent',
    ' \t- \t## Sources',
    '  \t\tInternal KB',
    '',
    '- Parent',
    '    -   ## Sources',
    '    Internal KB',
    '',
    '- Parent',
    '    -   ## Sources',
    '        Internal KB',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/base-columns.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2, result.stderr);
    assert.match(result.stderr, /base-columns\.md.*line=9/);
    assert.match(result.stderr, /base-columns\.md.*line=17/);
    assert.doesNotMatch(result.stderr, /base-columns\.md.*line=5|line=13/);
  });
});

test('source CLI recognizes tab-indented ATX headings inside list items', () => {
  const dirty = ['# Guide', '', '- Parent', '  \t## Sources', '  \tInternal KB', ''].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/tab-heading.md': dirty }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
    assert.match(result.stderr, /tab-heading\.md.*line=5/);
  });

  const clean = [
    '# Guide',
    '',
    '- Parent',
    '  \t## Sources',
    '  \t[Public documentation](https://example.com/docs)',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/tab-heading.md': clean }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 0, result.stderr);
  });
});

test('source CLI recognizes tab-indented raw HTML blocks inside list items', () => {
  const dirty = [
    '# Guide',
    '',
    '- Parent',
    '  \t<h2>Sources</h2>',
    '  \t<p>Internal KB</p>',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/tab-html.md': dirty }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
    assert.match(result.stderr, /tab-html\.md.*line=5/);
  });

  const clean = [
    '# Guide',
    '',
    '- Parent',
    '  \t<h2>Sources</h2>',
    '  \t<p><a href="https://example.com/docs">Public documentation</a></p>',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/tab-html.md': clean }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 0, result.stderr);
  });
});

test('source CLI scopes headings beneath empty list markers', () => {
  for (const [marker, indentation] of [
    ['-', '  '],
    ['+', '  '],
    ['*', '  '],
    ['1.', '   ']
  ]) {
    const dirty = [
      '# Guide',
      '',
      marker,
      `${indentation}## Sources`,
      `${indentation}Internal KB`,
      ''
    ].join('\n');
    withFixture({ 'src/content/tech-center/tutorial/empty-list.md': dirty }, (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
      assert.match(result.stderr, /empty-list\.md.*line=5/);
    });

    const clean = ['# Guide', '', marker, `${indentation}## Sources`, '', 'Internal KB', ''].join(
      '\n'
    );
    withFixture({ 'src/content/tech-center/tutorial/empty-list.md': clean }, (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    });
  }
});

test('source CLI type-terminates raw HTML blocks inside block quotes', () => {
  const body = [
    '# Guide',
    '',
    '> <pre>',
    '> Demand',
    '>',
    '> basis: internal',
    '> </pre>',
    '> <?Demand',
    '>',
    '> basis: internal?>',
    '> <!DOCTYPE',
    '> Demand',
    '>',
    '> basis: internal',
    '> >',
    '> <![CDATA[',
    '> Sources',
    '>',
    '> : Internal KB',
    '> ]]>',
    '> <div>Demand',
    '> basis: internal</div>',
    '> <!-- Fact sources: internal -->',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/quoted-html.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 5, result.stderr);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2, result.stderr);
    for (const line of [4, 8, 12, 17, 21, 23]) {
      assert.match(result.stderr, new RegExp(`quoted-html\\.md.*line=${line}`));
    }
  });
});

test('source and HTML CLIs accept colon citation headings and empty ATX resets', () => {
  const markdown = ['# Guide', '', '## Sources:', 'Internal KB', '##', 'Internal KB', ''].join(
    '\n'
  );
  withFixture({ 'src/content/tech-center/tutorial/colon-heading.md': markdown }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
    assert.match(result.stderr, /colon-heading\.md.*line=4/);
    assert.doesNotMatch(result.stderr, /colon-heading\.md.*line=6/);
  });
  withFixture(
    { 'index.html': '<html><body><h2>资料来源：</h2><p>内部 KB</p></body></html>' },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'cn'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
    }
  );
});

test('source CLI scans every non-leading Markdown HTML comment with raw offsets', () => {
  const body = [
    '<!-- Demand basis: hidden delivery metadata -->',
    '# Guide',
    '',
    '<!-- clean comment -->',
    '<!--',
    'Demand',
    '',
    'basis: internal',
    'Sources: Internal KB',
    '-->',
    '<!-- Fact sources: internal -->',
    '<div><!-- Case clearance: nested --></div>',
    'Reader <!-- Demand basis: inline --> copy',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/comments.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 4, result.stderr);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2, result.stderr);
    assert.match(result.stderr, /comments\.md.*line=6/);
    assert.match(result.stderr, /comments\.md.*line=9/);
    assert.match(result.stderr, /comments\.md.*line=11/);
    assert.match(result.stderr, /comments\.md.*line=12/);
    assert.match(result.stderr, /comments\.md.*line=13/);
    assert.doesNotMatch(result.stderr, /hidden delivery metadata/);
  });
  withFixture(
    {
      'src/content/tech-center/tutorial/comment-citation.md':
        '# Guide\n\n<!-- Sources: [Official docs](https://example.com/docs) -->\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source CLI strips container markers from later multiline Markdown comments', () => {
  const body = [
    '<!-- Demand basis: hidden delivery metadata -->',
    '# Guide',
    '',
    '> <!--',
    '> Demand',
    '> basis: internal',
    '> -->',
    '> - <!--',
    '>   Fact',
    '>   sources: internal',
    '>   -->',
    ''
  ].join('\n');
  withFixture({ 'src/content/tech-center/tutorial/container-comments.md': body }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 2, result.stderr);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
    assert.match(result.stderr, /container-comments\.md.*line=5/);
    assert.match(result.stderr, /container-comments\.md.*line=9/);
    assert.doesNotMatch(result.stderr, /hidden delivery metadata/);
  });
  withFixture(
    {
      'src/content/tech-center/tutorial/comment-state.md':
        '# Guide\n\n## Sources\n<!-- ## Other -->\nInternal KB\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 2, result.stderr);
      assert.match(result.stderr, /comment-state\.md.*line=4/);
      assert.match(result.stderr, /comment-state\.md.*line=5/);
    }
  );
});

test('source CLI treats the complete CommonMark type-6 tag set as block boundaries', () => {
  const blockTags = [
    'address',
    'article',
    'aside',
    'base',
    'basefont',
    'blockquote',
    'body',
    'caption',
    'center',
    'col',
    'colgroup',
    'dd',
    'details',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'iframe',
    'legend',
    'li',
    'link',
    'main',
    'menu',
    'menuitem',
    'nav',
    'noframes',
    'ol',
    'optgroup',
    'option',
    'p',
    'param',
    'search',
    'section',
    'summary',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'title',
    'tr',
    'track',
    'ul'
  ];
  const body = blockTags
    .flatMap((tag) => [`<${tag}>Sources</${tag}>`, `<${tag}>: Internal KB</${tag}>`])
    .join('\n');
  withFixture(
    { 'src/content/tech-center/tutorial/type-6-blocks.md': `# Guide\n\n${body}\n` },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('source and HTML CLIs validate entries after raw HTML citation headings', () => {
  const dirty = '<h2>Sources</h2>\n<p>Internal KB</p>\n';
  const clean =
    '<h2>References</h2>\n<p>\n<a href="https://example.com/docs">Official docs</a>\n</p>\n';
  withFixture({ 'src/content/tech-center/tutorial/raw-heading.md': dirty }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
    assert.match(result.stderr, /raw-heading\.md.*line=2/);
  });
  withFixture({ 'src/content/tech-center/tutorial/raw-heading.md': clean }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 0, result.stderr);
  });
  withFixture({ 'index.html': `<html><body>${dirty}</body></html>` }, (root) => {
    const result = spawnSync(
      process.execPath,
      [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
      { cwd: ROOT, encoding: 'utf8' }
    );
    assert.equal(result.status, 1);
    assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
  });
  withFixture({ 'index.html': `<html><body>${clean}</body></html>` }, (root) => {
    const result = spawnSync(
      process.execPath,
      [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
      { cwd: ROOT, encoding: 'utf8' }
    );
    assert.equal(result.status, 0, result.stderr);
  });
});

test('source CLI preserves quote depth, raw HTML blocks, paired delimiters, and UTF-16 offsets', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/final-blocks.md': [
        '# Guide',
        '',
        '> Sources',
        '>> : Internal KB',
        '',
        '> > Sources',
        '> : Internal KB',
        '',
        '> Sources',
        ': Internal KB',
        '',
        '<div>Demand',
        'basis: internal</div><section>Sources</section><section>: Internal KB</section>',
        '<p>😀😀😀😀😀😀😀😀😀😀Demand',
        'basis: internal</p>',
        '*Demand',
        'basis: clean',
        '**Demand**',
        '__basis__: internal',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        3,
        result.stderr
      );
      assert.match(result.stderr, /final-blocks\.md.*line=9/);
      assert.match(result.stderr, /final-blocks\.md.*line=12/);
      assert.match(result.stderr, /final-blocks\.md.*line=14/);
      assert.match(result.stderr, /final-blocks\.md.*line=16/);
      assert.doesNotMatch(result.stderr, /final-blocks\.md.*line=3|final-blocks\.md.*line=5/);
    }
  );
});

test('source CLI streams nested HTML blocks and preserves literal Markdown delimiters', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/streaming.md': [
        '# Guide',
        '',
        '<div><div>Reader</div>Sources',
        ': Internal KB</div><details>Sources</details><summary>: Internal KB</summary><hr><p>Sources</p><p>: Internal KB</p>',
        '<p>Sources',
        ': [Public documentation](https://example.com/docs)</p>',
        '\\*Demand',
        'basis: clean',
        '__Sources__',
        ': Internal KB',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
      assert.match(result.stderr, /streaming\.md.*line=3/);
      assert.doesNotMatch(result.stderr, /streaming\.md.*line=4/);
      assert.doesNotMatch(result.stderr, /streaming\.md.*line=5/);
    }
  );
});

test('source CLI deduplicates logical policy labels by original source range', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/ranges.md': [
        '# Guide',
        '',
        '<div>Demand basis: internal</div>',
        '<div>Sources: Internal KB</div>',
        'Demand basis: internal',
        'Sources: Internal KB',
        'Demand',
        'basis: internal',
        'Sources',
        ': Internal KB',
        '<div>Sources: [Public documentation](https://example.com/docs)</div>',
        '<div>Demand basis: a</div><div>Demand basis: b</div>',
        ''
      ].join('\n')
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        5,
        result.stderr
      );
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 3, result.stderr);
      assert.match(result.stderr, /ranges\.md.*line=3/);
      assert.match(result.stderr, /ranges\.md.*line=4/);
      assert.match(result.stderr, /ranges\.md.*line=7/);
      assert.match(result.stderr, /ranges\.md.*line=9/);
      assert.doesNotMatch(result.stderr, /Public documentation/);
    }
  );
});

test('source CLI reports each logical policy label once at its original range', () => {
  withFixture(
    {
      'src/content/tech-center/tutorial/same-editorial.md':
        '# Guide\n\n<div>Demand basis: internal</div>\n',
      'src/content/tech-center/tutorial/same-citation.md':
        '# Guide\n\n<div>Sources: Internal KB</div>\n',
      'src/content/tech-center/tutorial/plain.md': '# Guide\n\nDemand basis: internal\n',
      'src/content/tech-center/tutorial/cross-line.md': '# Guide\n\nDemand\nbasis: internal\n',
      'src/content/tech-center/tutorial/valid-anchor.md':
        '# Guide\n\n<div>Sources: [Public documentation](https://example.com/docs)</div>\n',
      'src/content/tech-center/tutorial/multiple.md':
        '# Guide\n\n<div>Demand basis: a</div><div>Demand basis: b</div>\n'
    },
    (root) => {
      const result = runFixture(root);
      const count = (rule, relativePath) =>
        result.stderr
          .split('\n')
          .filter((line) => line.includes(rule) && line.includes(relativePath)).length;

      assert.equal(result.status, 1);
      assert.equal(count('D-01 editorial-metadata', 'same-editorial.md'), 1, result.stderr);
      assert.equal(count('D-07 citation-policy', 'same-citation.md'), 1, result.stderr);
      assert.equal(count('D-01 editorial-metadata', 'plain.md'), 1, result.stderr);
      assert.equal(count('D-01 editorial-metadata', 'cross-line.md'), 1, result.stderr);
      assert.equal(count('D-07 citation-policy', 'valid-anchor.md'), 0, result.stderr);
      assert.equal(count('D-01 editorial-metadata', 'multiple.md'), 2, result.stderr);
    }
  );
});

test('HTML CLI projects br tags as inline whitespace without crossing block boundaries', () => {
  withFixture(
    {
      'index.html': [
        '<html><body>',
        '<p>Sources<br>: Internal KB</p>',
        '<p>Demand<br/>basis: internal</p>',
        '<p>Sources</p><p>: Internal KB</p>',
        '</body></html>'
      ].join('\n')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1, result.stderr);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        1,
        result.stderr
      );
      assert.match(result.stderr, /visible .*line=2/);
      assert.match(result.stderr, /visible .*line=3/);
      assert.doesNotMatch(result.stderr, /line=4/);
    }
  );
});

test('HTML CLI applies expanded editorial labels to visible and serialized content', () => {
  withFixture(
    {
      'index.html': [
        '<html><body>',
        '<p>Demand basis: internal research</p><p>Fact sources: internal research</p>',
        '<p>Edition: preview</p><p>计划：W4</p><p>实施计划：reader rollout</p>',
        '<script>{"Demand basis":"internal","Fact sources":"internal","Edition":"preview","计划":"W4","clean":"实施计划：reader rollout"}</script>',
        '</body></html>'
      ].join('\n')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 8);
      assert.match(result.stderr, /editorial-metadata \| visible/);
      assert.match(result.stderr, /editorial-metadata \| payload/);
      assert.doesNotMatch(result.stderr, /实施计划/);
    }
  );
});

test('HTML CLI accepts multi-megabyte plain projections with compact metadata', () => {
  withFixture(
    { 'index.html': `<html><body>${'x'.repeat(2 * 1024 * 1024)}</body></html>` },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 0, result.stderr);
    }
  );
});

test('HTML CLI compacts ordinary hub whitespace into linear offset runs', () => {
  const hubCopy = 'FAQ question answer route detail '.repeat(25_000);
  withFixture({ 'index.html': `<html><body><main>${hubCopy}</main></body></html>` }, (root) => {
    const result = spawnSync(
      process.execPath,
      [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
      { cwd: ROOT, encoding: 'utf8' }
    );
    assert.equal(result.status, 0, result.stderr);
  });
});

test('HTML CLI reports entity-dense projection run limits without exhausting memory', () => {
  withFixture({ 'index.html': `<html><body>${'&amp;'.repeat(50_001)}</body></html>` }, (root) => {
    const result = spawnSync(
      process.execPath,
      [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
      { cwd: ROOT, encoding: 'utf8' }
    );
    assert.equal(result.status, 1);
    assert.match(result.stderr, /HTML projection exceeds 50000 offset runs/);
  });
});

test('HTML CLI keeps category entities and near-cap normalization within a practical bound', () => {
  const startedAt = Date.now();
  withFixture(
    {
      'index.html': `<html><body>${'&nbsp;x'.repeat(24_999)}</body></html>`
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8', timeout: 5000 }
      );
      assert.equal(result.status, 0, result.stderr);
    }
  );
  assert(Date.now() - startedAt < 5000);
});

test('HTML CLI preserves payload source lines through normalization', () => {
  withFixture(
    {
      'index.html': [
        '<html><body>',
        '<span>Sign',
        '</span><span>&NewLine;off: pending</span>',
        '<script>"a":1',
        'Demand&#160;basis: internal</script>',
        '</body></html>'
      ].join('\n')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 1);
      assert.match(result.stderr, /visible .*line=2/);
      assert.match(result.stderr, /payload .*line=5/);
    }
  );
});

test('HTML CLI preserves literal script comparisons and decodes policy entity categories', () => {
  withFixture(
    {
      'index.html': [
        '<html><body>',
        '<p>Sources&NewLine;: Internal KB</p>',
        '<p>Version&dash;plan: internal</p>',
        '<script>if (a < b) {}',
        'Demand basis: internal</script>',
        '</body></html>'
      ].join('\n')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 1);
      assert.match(result.stderr, /D-07 citation-policy/);
      assert.match(result.stderr, /visible .*line=2/);
      assert.match(result.stderr, /visible .*line=3/);
      assert.match(result.stderr, /payload .*line=5/);
    }
  );
});

test('HTML CLI classifies optional policy entities and inspects real script bodies', () => {
  withFixture(
    {
      'index.html': [
        '<html><body>',
        '<p>Version&hyphen;plan: internal</p>',
        '<p>Update&mdash;log: internal</p>',
        '<p>Sign&horbar;off: internal</p>',
        '<p>Demand&#32basis: internal</p>',
        '<p>Demand&#160;basis: internal</p>',
        '<p>Demand&nbspbasis: internal</p>',
        '<script>if (a < b) {}',
        '<span title=Schedule>Demand basis: internal</span>',
        '</script>',
        '</body></html>'
      ].join('\n')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 1);
      assert.equal((result.stderr.match(/D-01 editorial-metadata/g) || []).length, 8);
      assert.match(result.stderr, /visible .*line=2/);
      assert.match(result.stderr, /visible .*line=7/);
      assert.match(result.stderr, /payload .*line=9/);
    }
  );
});

test('HTML CLI follows WHATWG entities and tokenizes escaped script or template payloads', () => {
  withFixture(
    {
      'index.html': [
        '<html><body>',
        '<p>Version&emsp13;plan: internal</p>',
        '<p>Update&emsp14;log: internal</p>',
        '<p>Sign&#150off: pending</p>',
        '<p>Sign&shyoff: pending</p>',
        '<p>Sign&shy;off: pending</p>',
        '<p>Sources&colon; Internal KB</p>',
        '<p>Sources&Colon; Internal KB</p>',
        '<p>Sources&ratio; Internal KB</p>',
        '<p>Sign&nbhy;off: clean</p>',
        '<p>Sign&figdash;off: clean</p>',
        '<p>Demand&enspbasis: clean</p>',
        '<p>Demand&HilbertSpacebasis: clean</p>',
        '<p>Demand&vdashbasis: clean</p>',
        '<script>{"copy":"Demand\\u0020basis: internal","signoff":"Sign\\u{20}off: pending","hex":"Demand\\x20basis: internal","newline":"Sign\\noff: pending","vertical":"Version\\vplan: internal","form":"Demand\\fbasis: internal","return":"Demand\\rbasis: internal","backspace":"Demand\\bbasis: clean","literal":"Demand\\\\u0020basis: clean","upper":"Demand\\U0020basis: clean","upperHex":"Demand\\X20basis: clean","nul":"Demand\\0basis: clean","surrogate":"Demand\\uD83D\\uDE00basis: clean"}</script>',
        '<template>{"schedule":"\\u8ba1\\u5212\\uff1aW4","tab":"Demand\\tbasis: internal"}</template>',
        '</body></html>'
      ].join('\n')
    },
    (root) => {
      const result = spawnSync(
        process.execPath,
        [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'],
        { cwd: ROOT, encoding: 'utf8' }
      );
      assert.equal(result.status, 1);
      assert.equal(
        (result.stderr.match(/D-01 editorial-metadata/g) || []).length,
        15,
        result.stderr
      );
      assert.equal((result.stderr.match(/D-07 citation-policy/g) || []).length, 1);
      assert.match(result.stderr, /visible .*line=2/);
      assert.match(result.stderr, /visible .*line=6/);
      assert.match(result.stderr, /payload .*line=15/);
      assert.match(result.stderr, /payload .*line=16/);
      assert.doesNotMatch(
        result.stderr,
        /Colon;|ratio;|nbhy;|figdash;|enspbasis|HilbertSpacebasis|vdashbasis|U0020|X20/
      );
    }
  );
});
