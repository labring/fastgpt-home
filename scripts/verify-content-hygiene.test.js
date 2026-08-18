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
  for (const [relativePath, content] of Object.entries(files)) writeFixture(root, relativePath, content);
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
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.once('error', reject);
    child.once('close', (status) => resolve({ status, stdout, stderr }));
  });
}

const hiddenMetadata = '<!--\ninternal KB: delivery schedule and sign-off\n-->\n\n';
const cleanGuide = `${hiddenMetadata}# Durable guide\n\nAcme reduced handling time by 42%, with a caveat for incomplete source data.\n\n## Sources\n\n- [Public source](https://example.com/research)\n`;

test('source CLI accepts publishable markdown and keeps a leading hidden comment outside inspection', () => {
  withFixture(
    { 'src/content/guides/en/durable-guide.md': cleanGuide },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /Content hygiene passed: 1 source file/);
      assert.equal(result.stderr, '');
      assert.equal(
        fs.readFileSync(path.join(root, 'src/content/guides/en/durable-guide.md'), 'utf8'),
        cleanGuide,
      );
    },
  );
});

test('source CLI aggregates visible editorial findings with stable actionable locations', () => {
  withFixture(
    {
      'src/content/guides/zh/dirty.md': '# 标题\n\n事实来源: 客户 KB 7.4；核验日 2026-07-20\n\n签发: 客户确认\n',
      'content/competitors/en/dirty.md': '# Comparison\n\n> Delivery schedule: Week 4\n\nRevision log: client review complete\n',
      'content/competitors/crlf-dirty.md': '# Comparison\r\n\r\nFact Source: internal KB\r\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1);
      assert.equal(result.stdout, '');
      assert.match(result.stderr, /D-01 editorial-metadata \| markdown-body \| locale=zh \| path=src\/content\/guides\/zh\/dirty\.md \| source=dirty \| line=3/);
      assert.match(result.stderr, /D-01 editorial-metadata \| markdown-body \| locale=en \| path=content\/competitors\/en\/dirty\.md \| source=dirty \| line=3/);
      assert.match(result.stderr, /D-01 editorial-metadata \| markdown-body \| locale=en \| path=content\/competitors\/en\/dirty\.md \| source=dirty \| line=5/);
      assert.match(result.stderr, /D-01 editorial-metadata \| markdown-body \| locale=default \| path=content\/competitors\/crlf-dirty\.md \| source=crlf-dirty \| line=3/);
    },
  );
});

test('source CLI requires public HTTPS markdown citations in Sources and References blocks', () => {
  const cases = [
    ['plain internal reference', '## Sources\n\n- Internal KB 7.4\n', /D-07 citation-policy/],
    ['localhost URL', '## References\n\n- [Local](https://localhost/reference)\n', /D-07 citation-policy/],
    ['private URL', '## Sources\n\n- [Private](https://10.1.2.3/reference)\n', /D-07 citation-policy/],
    ['credentials URL', '## Sources\n\n- [Credentials](https://user:pass@example.com/reference)\n', /D-07 citation-policy/],
    ['HTTP URL', '## Sources\n\n- [HTTP](http://example.com/reference)\n', /D-07 citation-policy/],
    ['mixed URL list', '## Sources\n\n- [Public](https://example.com/reference) and [Private](http://127.0.0.1/reference)\n', /D-07 citation-policy/]
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
    withFixture({ 'content/competitors/citation.md': `# Comparison\n\n## Sources\n\n${entry}\n` }, (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 1, entry);
      assert.match(result.stderr, /D-07 citation-policy/, entry);
    });
  }

  withFixture(
    {
      'content/competitors/citation.md':
        '# Comparison\n\n## References\n\n> [Public source](https://example.com/research); [Second public source](https://www.iana.org/domains/reserved)\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
    },
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
    },
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
      assert.match(result.stderr, /D-01 editorial-metadata \| structured-copy \| locale=default \| path=src\/locales\/en\.json \| source=en \| line=1/);
    },
  );
});

test('source CLI accepts ordinary generic technical prose outside structured editorial metadata', () => {
  withFixture(
    {
      'src/content/guides/zh/ordinary.md': '# 技术说明\n\n更新记录、source、delivery 和 编辑 是团队日常术语。\n',
      'content/competitors/en/ordinary.md': '# Comparison\n\nThe source delivery editor validates technical content.\n'
    },
    (root) => {
      const result = runFixture(root);
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /2 source files/);
    },
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
    path.join(ROOT, 'src/content/guides/zh/18-制造企业数字化运维与审单场景的落地选型指南-V1.0-星触达-20260811.md'),
    'utf8',
  );
  const biopharma = fs.readFileSync(
    path.join(ROOT, 'src/content/guides/en/19-EN-AI-Agent-Selection-and-Compliance-Best-P-V1.0-XstraStar-20260811.md'),
    'utf8',
  );
  assert.match(manufacturing, /延锋国际/);
  assert.match(manufacturing, /70%/);
  assert.match(manufacturing, /不构成对其他项目效果的承诺/);
  assert.match(biopharma, /Sinocare Biotech/);
});

test('HTML CLI recursively scans visible content separately from serialized payloads', () => {
  withFixture(
    {
      'index.html': '<html><body><h1>Home</h1><section><h2>Sources</h2><a href="https://example.com/research">Public source</a></section></body></html>',
      'guide/nested/index.html': '<html><body><script type="application/json">{"citation":"https://example.com/payload"}</script><p>Clean page</p></body></html>'
    },
    (root) => {
      const clean = spawnSync(process.execPath, [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'], {
        cwd: ROOT,
        encoding: 'utf8'
      });
      assert.equal(clean.status, 0, clean.stderr);
      assert.match(clean.stdout, /Content hygiene passed: 2 HTML files/);

      fs.writeFileSync(
        path.join(root, 'guide/nested/index.html'),
        '<html><body><p>Fact Source: internal KB</p></body></html>',
      );
      const visible = spawnSync(process.execPath, [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'], {
        cwd: ROOT,
        encoding: 'utf8'
      });
      assert.equal(visible.status, 1);
      assert.match(visible.stderr, /visible/);
      assert.match(visible.stderr, /editorial-metadata/);

      fs.writeFileSync(
        path.join(root, 'guide/nested/index.html'),
        '<html><body><script type="application/json">{"Fact Source":"internal KB"}</script></body></html>',
      );
      const dirty = spawnSync(process.execPath, [SCRIPT, '--mode', 'html', '--root', root, '--variant', 'io'], {
        cwd: ROOT,
        encoding: 'utf8'
      });
      assert.equal(dirty.status, 1);
      assert.match(dirty.stderr, /payload/);
      assert.match(dirty.stderr, /editorial-metadata/);
    },
  );
});

test('live CLI bounds sitemap inventory before page scheduling and writes deterministic evidence', async () => {
  let requests = 0;
  const server = http.createServer((request, response) => {
    requests += 1;
    const baseUrl = `http://${request.headers.host}`;
    if (request.url === '/sitemap.xml') {
      response.setHeader('content-type', 'application/xml');
      response.end(`<urlset><url><loc>${baseUrl}/clean</loc></url></urlset>`);
      return;
    }
    response.setHeader('content-type', 'text/html');
    response.end('<html><body><h1>Clean</h1></body></html>');
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-content-hygiene-live-'));
  const report = path.join(root, 'report.json');
  const args = [
    '--mode', 'live',
    '--base-url-cn', `http://127.0.0.1:${port}`,
    '--base-url-io', `http://127.0.0.1:${port}`,
    '--report', report,
    '--allow-http-for-tests',
    '--concurrency', '1',
    '--timeout-ms', '100',
    '--max-urls', '10',
    '--max-sitemap-depth', '0'
  ];
  try {
    const clean = await runAsync(args);
    assert.equal(clean.status, 0, clean.stderr);
    assert.match(clean.stdout, /1 live pages/);
    assert.equal(fs.existsSync(report), true);
    assert.equal(fs.existsSync(`${report}.txt`), true);
    assert.deepEqual(JSON.parse(fs.readFileSync(report, 'utf8')).totals, {
      sitemapDocuments: 1,
      pages: 1,
      boundedInventory: 2
    });

    requests = 0;
    const invalid = await runAsync([...args, '--max-urls', '10001']);
    assert.equal(invalid.status, 1);
    assert.match(invalid.stderr, /--max-urls must be from 1 to 10000/);
    assert.equal(requests, 0);

    const loopbackWithoutTestFlag = await runAsync(args.filter((argument) => argument !== '--allow-http-for-tests'));
    assert.equal(loopbackWithoutTestFlag.status, 1);
    assert.match(loopbackWithoutTestFlag.stderr, /requires --allow-http-for-tests/);
    assert.equal(requests, 0);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(root, { recursive: true, force: true });
  }
});
