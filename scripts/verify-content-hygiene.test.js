const assert = require('node:assert/strict');
const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const http = require('node:http');

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

test('source CLI fails closed for unparseable production structured copy', () => {
  withFixture({ 'src/locales/en.json': '{"copy":\n' }, (root) => {
    const result = runFixture(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Unable to parse structured source/);
  });
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
      'src/content/guides/zh/18-制造企业数字化运维与审单场景的落地选型指南-V1.0-星触达-20260811.md'
    ),
    'utf8'
  );
  const biopharma = fs.readFileSync(
    path.join(
      ROOT,
      'src/content/guides/en/19-EN-AI-Agent-Selection-and-Compliance-Best-P-V1.0-XstraStar-20260811.md'
    ),
    'utf8'
  );
  const biopharmaZh = fs.readFileSync(
    path.join(
      ROOT,
      'src/content/guides/zh/19-生物医药企业文档密集场景的AI选型与合规实践-V1.0-星触达-20260811.md'
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

test('live CLI bounds sitemap inventory before page scheduling and writes deterministic evidence', async () => {
  let requests = 0;
  let dirtyCitation = false;
  const server = http.createServer((request, response) => {
    requests += 1;
    const baseUrl = `http://${request.headers.host}`;
    if (request.url === '/sitemap.xml') {
      response.setHeader('content-type', 'application/xml');
      response.end(`<urlset><url><loc>${baseUrl}/clean</loc></url></urlset>`);
      return;
    }
    response.setHeader('content-type', 'text/html');
    response.end(
      dirtyCitation
        ? '<html><body><p>REFERENCE: Internal KB</p></body></html>'
        : '<html><body><p>REFERENCE: <a href="https://example.com/docs">Official docs</a></p></body></html>'
    );
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-content-hygiene-live-'));
  const report = path.join(root, 'report.json');
  const args = [
    '--mode',
    'live',
    '--base-url-cn',
    `http://127.0.0.1:${port}`,
    '--base-url-io',
    `http://127.0.0.1:${port}`,
    '--report',
    report,
    '--allow-http-for-tests',
    '--concurrency',
    '1',
    '--timeout-ms',
    '100',
    '--max-urls',
    '10',
    '--max-sitemap-depth',
    '0'
  ];
  try {
    const productionOnly = await runAsync([
      '--mode',
      'live',
      '--base-url-cn',
      'https://example.com',
      '--base-url-io',
      'https://iana.org',
      '--report',
      report,
      '--max-urls',
      '2'
    ]);
    assert.equal(productionOnly.status, 1);
    assert.match(productionOnly.stderr, /must be exactly https:\/\/fastgpt\.cn/);
    assert.equal(requests, 0);

    const belowRootBudget = await runAsync([...args, '--max-urls', '1']);
    assert.equal(belowRootBudget.status, 1);
    assert.match(belowRootBudget.stderr, /--max-urls must be at least 2/);
    assert.equal(requests, 0);

    const clean = await runAsync(args);
    assert.equal(clean.status, 0, clean.stderr);
    assert.match(clean.stdout, /1 live pages/);
    assert.equal(fs.existsSync(report), true);
    assert.equal(fs.existsSync(`${report}.txt`), true);
    assert.deepEqual(JSON.parse(fs.readFileSync(report, 'utf8')).totals, {
      sitemapDocuments: 1,
      pages: 1,
      checkedPages: 1,
      boundedInventory: 2
    });

    dirtyCitation = true;
    const dirty = await runAsync(args);
    assert.equal(dirty.status, 1);
    assert.match(dirty.stderr, /D-07 citation-policy/);

    requests = 0;
    const invalid = await runAsync([...args, '--max-urls', '10001']);
    assert.equal(invalid.status, 1);
    assert.match(invalid.stderr, /--max-urls must be from 1 to 10000/);
    assert.equal(requests, 0);

    const loopbackWithoutTestFlag = await runAsync(
      args.filter((argument) => argument !== '--allow-http-for-tests')
    );
    assert.equal(loopbackWithoutTestFlag.status, 1);
    assert.match(loopbackWithoutTestFlag.stderr, /must be exactly https:\/\/fastgpt\.cn/);
    assert.equal(requests, 0);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('live CLI fetches each canonical sitemap once when nested indexes point to the root', async () => {
  const counts = new Map();
  const createServer = () =>
    http.createServer((request, response) => {
      const baseUrl = `http://${request.headers.host}`;
      const key = `${baseUrl}${request.url}`;
      counts.set(key, (counts.get(key) || 0) + 1);
      response.setHeader(
        'content-type',
        request.url.endsWith('.xml') ? 'application/xml' : 'text/html'
      );
      if (request.url === '/sitemap.xml') {
        response.end(
          `<sitemapindex><sitemap><loc>${baseUrl}/sitemap-a.xml</loc></sitemap><sitemap><loc>${baseUrl}/sitemap-b.xml</loc></sitemap></sitemapindex>`
        );
        return;
      }
      if (request.url === '/sitemap-a.xml') {
        response.end(
          `<sitemapindex><sitemap><loc>${baseUrl}/sitemap.xml</loc></sitemap></sitemapindex>`
        );
        return;
      }
      if (request.url === '/sitemap-b.xml') {
        response.end(`<urlset><url><loc>${baseUrl}/clean</loc></url></urlset>`);
        return;
      }
      response.end('<html><body>Clean</body></html>');
    });
  const cnServer = createServer();
  const ioServer = createServer();
  await Promise.all([
    new Promise((resolve) => cnServer.listen(0, '127.0.0.1', resolve)),
    new Promise((resolve) => ioServer.listen(0, '127.0.0.1', resolve))
  ]);
  const cnBaseUrl = `http://127.0.0.1:${cnServer.address().port}`;
  const ioBaseUrl = `http://127.0.0.1:${ioServer.address().port}`;
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-content-hygiene-cycle-'));
  const report = path.join(root, 'report.json');
  try {
    const result = await runAsync([
      '--mode',
      'live',
      '--base-url-cn',
      cnBaseUrl,
      '--base-url-io',
      ioBaseUrl,
      '--report',
      report,
      '--allow-http-for-tests',
      '--max-urls',
      '10'
    ]);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(fs.readFileSync(report, 'utf8')).totals.sitemapDocuments, 6);
    for (const count of counts.values()) assert.equal(count, 1);
  } finally {
    await Promise.all([
      new Promise((resolve) => cnServer.close(resolve)),
      new Promise((resolve) => ioServer.close(resolve))
    ]);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('live CLI requires inventory from each host and never fetches pages after a sitemap budget violation', async () => {
  const counts = { cnPages: 0, ioPages: 0, budgetPages: 0 };
  const createServer = ({ empty = false, counter }) =>
    http.createServer((request, response) => {
      const baseUrl = `http://${request.headers.host}`;
      if (request.url === '/sitemap.xml') {
        response.setHeader('content-type', 'application/xml');
        response.end(
          empty ? '<urlset></urlset>' : `<urlset><url><loc>${baseUrl}/page</loc></url></urlset>`
        );
        return;
      }
      counts[counter] += 1;
      response.setHeader('content-type', 'text/html');
      response.end('<html><body>Clean</body></html>');
    });
  const cnServer = createServer({ counter: 'cnPages' });
  const ioServer = createServer({ empty: true, counter: 'ioPages' });
  await Promise.all([
    new Promise((resolve) => cnServer.listen(0, '127.0.0.1', resolve)),
    new Promise((resolve) => ioServer.listen(0, '127.0.0.1', resolve))
  ]);
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-content-hygiene-hosts-'));
  const report = path.join(root, 'report.json');
  const cnBaseUrl = `http://127.0.0.1:${cnServer.address().port}`;
  const ioBaseUrl = `http://127.0.0.1:${ioServer.address().port}`;
  try {
    const missingInventory = await runAsync([
      '--mode',
      'live',
      '--base-url-cn',
      cnBaseUrl,
      '--base-url-io',
      ioBaseUrl,
      '--report',
      report,
      '--allow-http-for-tests',
      '--max-urls',
      '10'
    ]);
    assert.equal(missingInventory.status, 1);
    const missingReport = JSON.parse(fs.readFileSync(report, 'utf8'));
    assert.equal(missingReport.inventory.length, 2);
    assert.equal(
      missingReport.inventory.find((entry) => entry.host === new URL(ioBaseUrl).host).pages,
      0
    );
    assert.match(fs.readFileSync(`${report}.txt`, 'utf8'), /inventory host=/);

    const budgetCn = createServer({ counter: 'budgetPages' });
    const budgetIo = createServer({ counter: 'budgetPages' });
    await Promise.all([
      new Promise((resolve) => budgetCn.listen(0, '127.0.0.1', resolve)),
      new Promise((resolve) => budgetIo.listen(0, '127.0.0.1', resolve))
    ]);
    try {
      const budgetResult = await runAsync([
        '--mode',
        'live',
        '--base-url-cn',
        `http://127.0.0.1:${budgetCn.address().port}`,
        '--base-url-io',
        `http://127.0.0.1:${budgetIo.address().port}`,
        '--report',
        report,
        '--allow-http-for-tests',
        '--max-urls',
        '3'
      ]);
      assert.equal(budgetResult.status, 1);
      assert.match(budgetResult.stderr, /D-08 sitemap-budget/);
      assert.equal(counts.budgetPages, 0);
      const budgetReport = JSON.parse(fs.readFileSync(report, 'utf8'));
      assert(budgetReport.totals.pages > 0);
      assert.equal(budgetReport.totals.checkedPages, 0);
      assert.equal(
        budgetReport.totals.boundedInventory,
        budgetReport.totals.sitemapDocuments + budgetReport.totals.pages
      );
      assert.match(fs.readFileSync(`${report}.txt`, 'utf8'), /checkedPages=0/);
    } finally {
      await Promise.all([
        new Promise((resolve) => budgetCn.close(resolve)),
        new Promise((resolve) => budgetIo.close(resolve))
      ]);
    }
  } finally {
    await Promise.all([
      new Promise((resolve) => cnServer.close(resolve)),
      new Promise((resolve) => ioServer.close(resolve))
    ]);
    fs.rmSync(root, { recursive: true, force: true });
  }
});
