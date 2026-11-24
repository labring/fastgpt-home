const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const yaml = require('js-yaml');
const indexnowConfig = require('../src/config/indexnow.json');
const {
  diffSitemapSnapshots,
  emitIndexNowKeyFile,
  fetchLiveSitemapSnapshot,
  filterAndPrioritizeUrls,
  getConfiguredIndexNowKeys,
  isEligibleIndexNowUrl,
  loadLocalSitemapEntries,
  mapGitChangedFilesToCoreUrls,
  parseSitemapXml,
  resolveIndexNowConfig,
  selectBackfillUrls,
  submitToIndexNow,
  verifyLiveKeyFile
} = require('./lib/indexnow');

const ROOT = path.resolve(__dirname, '..');

function withMockServer(handler) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const body = Buffer.concat(chunks).toString('utf8');
      try {
        await handler(req, res, body);
      } catch (error) {
        res.writeHead(500, { 'content-type': 'text/plain' });
        res.end(error.stack || error.message);
      }
    });
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({
        port,
        baseUrl: `http://127.0.0.1:${port}`,
        close: () =>
          new Promise((closeResolve, closeReject) =>
            server.close((error) => (error ? closeReject(error) : closeResolve()))
          )
      });
    });
  });
}

test('IndexNow config provides distinct 32-hex keys and disables preview', () => {
  assert.equal(indexnowConfig.endpoint, 'https://api.indexnow.org/indexnow');
  assert.equal(indexnowConfig.maxBatchSize, 10000);
  const cnKey = indexnowConfig.variants.cn.key;
  const ioKey = indexnowConfig.variants.io.key;
  assert.match(cnKey, /^[a-f0-9]{32}$/);
  assert.match(ioKey, /^[a-f0-9]{32}$/);
  assert.notEqual(cnKey, ioKey);
  assert.deepEqual(getConfiguredIndexNowKeys().sort(), [cnKey, ioKey].sort());

  const cn = resolveIndexNowConfig('cn', {});
  assert.equal(cn.host, 'fastgpt.cn');
  assert.equal(cn.key, cnKey);
  assert.equal(cn.keyFileName, `${cnKey}.txt`);
  assert.equal(cn.keyLocation, `https://fastgpt.cn/${cnKey}.txt`);

  const io = resolveIndexNowConfig('io', {});
  assert.equal(io.host, 'fastgpt.io');
  assert.equal(io.key, ioKey);
  assert.equal(io.keyLocation, `https://fastgpt.io/${ioKey}.txt`);

  assert.equal(resolveIndexNowConfig('preview', {}), null);
  assert.equal(resolveIndexNowConfig('unknown', {}), null);

  const rotated = resolveIndexNowConfig('cn', { CN_INDEXNOW_KEY: 'AbCdEf123456-rotated' });
  assert.equal(rotated.key, 'AbCdEf123456-rotated');
  assert.equal(rotated.keyLocation, 'https://fastgpt.cn/AbCdEf123456-rotated.txt');

  assert.throws(() => resolveIndexNowConfig('cn', { CN_INDEXNOW_KEY: 'bad' }), /Invalid IndexNow/);
  assert.throws(
    () => resolveIndexNowConfig('io', { IO_INDEXNOW_KEY: 'bad/key.txt' }),
    /Invalid IndexNow/
  );
});

test('emitIndexNowKeyFile isolates active variant key files and strips preview', () => {
  const tempOut = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-indexnow-emit-'));
  try {
    const cnConfig = resolveIndexNowConfig('cn', {});
    const ioConfig = resolveIndexNowConfig('io', {});

    const cnEmit = emitIndexNowKeyFile(tempOut, 'cn', {});
    assert.deepEqual(cnEmit, { written: true, keyFileName: cnConfig.keyFileName, key: cnConfig.key });
    assert.equal(fs.readFileSync(path.join(tempOut, cnConfig.keyFileName), 'utf8'), cnConfig.key);
    assert.equal(fs.existsSync(path.join(tempOut, ioConfig.keyFileName)), false);

    const ioEmit = emitIndexNowKeyFile(tempOut, 'io', {});
    assert.deepEqual(ioEmit, { written: true, keyFileName: ioConfig.keyFileName, key: ioConfig.key });
    assert.equal(fs.readFileSync(path.join(tempOut, ioConfig.keyFileName), 'utf8'), ioConfig.key);
    assert.equal(fs.existsSync(path.join(tempOut, cnConfig.keyFileName)), false);

    const previewEmit = emitIndexNowKeyFile(tempOut, 'preview', {});
    assert.deepEqual(previewEmit, { written: false, keyFileName: null, key: null });
    assert.equal(fs.existsSync(path.join(tempOut, cnConfig.keyFileName)), false);
    assert.equal(fs.existsSync(path.join(tempOut, ioConfig.keyFileName)), false);
  } finally {
    fs.rmSync(tempOut, { recursive: true, force: true });
  }
});

test('sitemap XML parsing and local shard loading filter foreign origins and non-HTML paths', () => {
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-content-000.xml</loc></sitemap>
  <sitemap><loc>https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-industry-000.xml</loc></sitemap>
  <sitemap><loc>https://evil.example/sitemap-foreign.xml</loc></sitemap>
</sitemapindex>`;
  const parsedIndex = parseSitemapXml(indexXml, 'https://fastgpt.cn');
  assert.equal(parsedIndex.kind, 'index');
  assert.deepEqual(parsedIndex.shards, [
    'https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-content-000.xml',
    'https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-industry-000.xml'
  ]);

  const tempOut = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-indexnow-local-'));
  try {
    fs.mkdirSync(path.join(tempOut, 'sitemap-shards/fastgpt.cn'), { recursive: true });
    fs.writeFileSync(path.join(tempOut, 'sitemap.xml'), indexXml);
    fs.writeFileSync(
      path.join(tempOut, 'sitemap-shards/fastgpt.cn/sitemap-content-000.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://fastgpt.cn/</loc></url>
  <url><loc>https://fastgpt.cn/guide/a</loc><lastmod>2026-11-10</lastmod></url>
  <url><loc>https://fastgpt.cn/ads/bing-ad</loc><lastmod>2026-11-10</lastmod></url>
  <url><loc>https://doc.fastgpt.cn/guide/cli.md</loc></url>
  <url><loc>https://fastgpt.io/guide/a</loc></url>
</urlset>`
    );
    fs.writeFileSync(
      path.join(tempOut, 'sitemap-shards/fastgpt.cn/sitemap-industry-000.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://fastgpt.cn/industry/mfg-d002-c012-f002</loc><lastmod>2026-10-14</lastmod></url>
</urlset>`
    );

    const loaded = loadLocalSitemapEntries(tempOut, 'https://fastgpt.cn');
    assert.equal(loaded.shardCount, 2);
    assert.deepEqual([...loaded.entries.keys()].sort(), [
      'https://fastgpt.cn/',
      'https://fastgpt.cn/guide/a',
      'https://fastgpt.cn/industry/mfg-d002-c012-f002'
    ]);
    assert.equal(loaded.entries.get('https://fastgpt.cn/guide/a').bucket, 'content');
    assert.equal(
      loaded.entries.get('https://fastgpt.cn/industry/mfg-d002-c012-f002').bucket,
      'industry'
    );
  } finally {
    fs.rmSync(tempOut, { recursive: true, force: true });
  }

  assert.equal(isEligibleIndexNowUrl('https://fastgpt.cn/faq/test', 'fastgpt.cn'), true);
  assert.equal(isEligibleIndexNowUrl('https://fastgpt.cn/ads/test', 'fastgpt.cn'), false);
  assert.equal(isEligibleIndexNowUrl('https://fastgpt.cn/llms.txt', 'fastgpt.cn'), false);
  assert.equal(isEligibleIndexNowUrl('https://fastgpt.cn/guide/a.md', 'fastgpt.cn'), false);
  assert.equal(isEligibleIndexNowUrl('https://fastgpt.cn/price?utm=1', 'fastgpt.cn'), false);
  assert.equal(isEligibleIndexNowUrl('http://fastgpt.cn/price', 'fastgpt.cn'), false);
});

test('diffSitemapSnapshots detects added, modified, removed, and unchanged URLs', () => {
  const before = {
    'https://fastgpt.cn/': { lastmod: null, bucket: 'content' },
    'https://fastgpt.cn/guide/unchanged': { lastmod: '2026-10-01', bucket: 'content' },
    'https://fastgpt.cn/guide/updated': { lastmod: '2026-10-01', bucket: 'content' },
    'https://fastgpt.cn/guide/deleted': { lastmod: '2026-09-01', bucket: 'content' }
  };
  const after = {
    'https://fastgpt.cn/': { lastmod: null, bucket: 'content' },
    'https://fastgpt.cn/guide/unchanged': { lastmod: '2026-10-01', bucket: 'content' },
    'https://fastgpt.cn/guide/updated': { lastmod: '2026-11-20', bucket: 'content' },
    'https://fastgpt.cn/guide/new': { lastmod: '2026-11-24', bucket: 'content' }
  };

  assert.deepEqual(diffSitemapSnapshots(before, after), {
    added: ['https://fastgpt.cn/guide/new'],
    modified: ['https://fastgpt.cn/guide/updated'],
    removed: ['https://fastgpt.cn/guide/deleted']
  });
});

test('mapGitChangedFilesToCoreUrls respects Site Variant locale ownership', () => {
  const cnAfter = new Map([
    ['https://fastgpt.cn/', { lastmod: null, bucket: 'content' }],
    ['https://fastgpt.cn/price', { lastmod: null, bucket: 'content' }],
    ['https://fastgpt.cn/contact', { lastmod: null, bucket: 'content' }],
    ['https://fastgpt.cn/faq', { lastmod: null, bucket: 'content' }],
    ['https://fastgpt.cn/videos', { lastmod: null, bucket: 'content' }],
    ['https://fastgpt.cn/wiki', { lastmod: '2026-09-21', bucket: 'content' }]
  ]);

  const cnUrls = mapGitChangedFilesToCoreUrls(
    [
      'src/locales/zh.json',
      'src/locales/ja.json',
      'src/components/contact/ContactForm.tsx',
      'src/app/videos/page.tsx',
      'src/content/wiki/intro.md'
    ],
    'cn',
    'https://fastgpt.cn',
    cnAfter
  );
  assert.deepEqual(cnUrls.sort(), [
    'https://fastgpt.cn/',
    'https://fastgpt.cn/contact',
    'https://fastgpt.cn/price',
    'https://fastgpt.cn/videos',
    'https://fastgpt.cn/wiki'
  ]);

  const ioAfter = new Map([
    ['https://fastgpt.io/', { lastmod: null, bucket: 'content' }],
    ['https://fastgpt.io/ja', { lastmod: null, bucket: 'content' }],
    ['https://fastgpt.io/ja/price', { lastmod: null, bucket: 'content' }],
    ['https://fastgpt.io/contact', { lastmod: null, bucket: 'content' }],
    ['https://fastgpt.io/zh-hant/contact', { lastmod: null, bucket: 'content' }]
  ]);

  const ioUrls = mapGitChangedFilesToCoreUrls(
    [
      'src/locales/ja.json',
      'src/locales/zh.json',
      'src/components/contact/ContactForm.tsx',
      'src/app/videos/page.tsx'
    ],
    'io',
    'https://fastgpt.io',
    ioAfter
  );
  assert.deepEqual(ioUrls.sort(), [
    'https://fastgpt.io/contact',
    'https://fastgpt.io/ja',
    'https://fastgpt.io/ja/price',
    'https://fastgpt.io/zh-hant/contact'
  ]);
});

test('filterAndPrioritizeUrls puts content before newest industry and enforces maxUrls cap', () => {
  const afterEntries = {
    'https://fastgpt.cn/guide/new': { lastmod: '2026-11-20', bucket: 'content' },
    'https://fastgpt.cn/industry/old': { lastmod: '2026-10-01', bucket: 'industry' },
    'https://fastgpt.cn/industry/new': { lastmod: '2026-11-18', bucket: 'industry' },
    'https://fastgpt.cn/price': { lastmod: null, bucket: 'content' }
  };

  const result = filterAndPrioritizeUrls({
    added: [
      'https://fastgpt.cn/industry/old',
      'https://fastgpt.cn/guide/new',
      'https://fastgpt.cn/industry/new',
      'https://fastgpt.cn/ads/ignored',
      'https://doc.fastgpt.cn/guide/cli.md',
      'https://fastgpt.cn/guide/new'
    ],
    gitCoreUrls: ['https://fastgpt.cn/price'],
    afterEntries,
    host: 'fastgpt.cn',
    maxUrls: 3
  });

  assert.equal(result.totalCandidates, 4);
  assert.equal(result.truncatedCount, 1);
  assert.deepEqual(result.urls, [
    'https://fastgpt.cn/guide/new',
    'https://fastgpt.cn/price',
    'https://fastgpt.cn/industry/new'
  ]);
});

test('selectBackfillUrls supports recent, content, urls, and all modes', () => {
  const afterEntries = {
    'https://fastgpt.cn/': { lastmod: null, bucket: 'content' },
    'https://fastgpt.cn/guide/new': { lastmod: '2026-11-18', bucket: 'content' },
    'https://fastgpt.cn/guide/old': { lastmod: '2026-08-01', bucket: 'content' },
    'https://fastgpt.cn/industry/mfg-d002-c012-f002': { lastmod: '2026-10-14', bucket: 'industry' }
  };

  const recent = selectBackfillUrls({
    mode: 'recent',
    afterEntries,
    host: 'fastgpt.cn',
    sinceDays: 45,
    now: new Date('2026-11-24T00:00:00Z')
  });
  assert.deepEqual(recent.urls, [
    'https://fastgpt.cn/guide/new',
    'https://fastgpt.cn/industry/mfg-d002-c012-f002'
  ]);
  assert.equal(recent.cutoffDate, '2026-10-10');

  const sinceDate = selectBackfillUrls({
    mode: 'recent',
    afterEntries,
    host: 'fastgpt.cn',
    sinceDate: '2026-11-01'
  });
  assert.deepEqual(sinceDate.urls, ['https://fastgpt.cn/guide/new']);

  const content = selectBackfillUrls({
    mode: 'content',
    afterEntries,
    host: 'fastgpt.cn'
  });
  assert.deepEqual(content.urls, [
    'https://fastgpt.cn/',
    'https://fastgpt.cn/guide/new',
    'https://fastgpt.cn/guide/old'
  ]);

  const all = selectBackfillUrls({
    mode: 'all',
    afterEntries,
    host: 'fastgpt.cn'
  });
  assert.equal(all.urls.length, 4);
  assert.equal(all.urls[3], 'https://fastgpt.cn/industry/mfg-d002-c012-f002');

  const explicit = selectBackfillUrls({
    mode: 'urls',
    host: 'fastgpt.cn',
    explicitUrls: 'https://fastgpt.cn/industry/mfg-d002-c012-f002\nhttps://fastgpt.cn/guide/new'
  });
  assert.deepEqual(explicit.urls, [
    'https://fastgpt.cn/industry/mfg-d002-c012-f002',
    'https://fastgpt.cn/guide/new'
  ]);

  assert.throws(
    () =>
      selectBackfillUrls({
        mode: 'urls',
        host: 'fastgpt.cn',
        explicitUrls: 'https://fastgpt.io/guide/new'
      }),
    /Invalid or out-of-scope/
  );
});

test('verifyLiveKeyFile handles 200 match, transient 503 retry, mismatch, and 404', async () => {
  let attemptCount = 0;
  let mode = 'retry-ok';
  const expectedKey = indexnowConfig.variants.cn.key;
  const server = await withMockServer((req, res) => {
    attemptCount += 1;
    if (mode === 'retry-ok') {
      if (attemptCount === 1) {
        res.writeHead(503, { 'content-type': 'text/plain' });
        res.end('starting');
        return;
      }
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(expectedKey);
      return;
    }
    if (mode === 'mismatch') {
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end('wrong-key');
      return;
    }
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('not found');
  });

  try {
    const config = {
      ...resolveIndexNowConfig('cn', {}),
      keyLocation: `${server.baseUrl}/${expectedKey}.txt`
    };
    const ok = await verifyLiveKeyFile(config, { retries: 2, delayMs: 10 });
    assert.deepEqual(ok, { ok: true, attempts: 2, status: 200 });

    mode = 'mismatch';
    const mismatch = await verifyLiveKeyFile(config, { retries: 1, delayMs: 10 });
    assert.equal(mismatch.ok, false);
    assert.match(mismatch.error, /Unexpected key file response/);

    mode = 'not-found';
    const missing = await verifyLiveKeyFile(config, { retries: 1, delayMs: 10 });
    assert.equal(missing.ok, false);
    assert.equal(missing.status, 404);
  } finally {
    await server.close();
  }
});

test('submitToIndexNow chunks batches, retries 429 Retry-After, and skips non-retryable 403', async () => {
  const requests = [];
  let scenario = 'ok-with-429';
  let firstBatchCalls = 0;

  const server = await withMockServer((req, res, body) => {
    const parsed = JSON.parse(body);
    requests.push(parsed);
    if (scenario === 'ok-with-429') {
      if (requests.length === 1) {
        firstBatchCalls += 1;
        res.writeHead(429, { 'retry-after': '1', 'content-type': 'application/json' });
        res.end('{"message":"rate limited"}');
        return;
      }
      res.writeHead(requests.length === 2 ? 200 : 202);
      res.end();
      return;
    }
    res.writeHead(403, { 'content-type': 'text/plain' });
    res.end('forbidden key');
  });

  try {
    const config = {
      ...resolveIndexNowConfig('cn', {}),
      endpoint: `${server.baseUrl}/indexnow`
    };
    const urls = [
      'https://fastgpt.cn/a',
      'https://fastgpt.cn/b',
      'https://fastgpt.cn/c'
    ];

    const dry = await submitToIndexNow({ config, urls, dryRun: true, chunkSize: 2 });
    assert.equal(dry.outcome, 'dry-run');
    assert.equal(dry.counts.planned, 3);
    assert.equal(dry.counts.submitted, 0);
    assert.equal(requests.length, 0);

    const submitted = await submitToIndexNow({
      config,
      urls,
      chunkSize: 2,
      maxRetries: 2,
      baseDelayMs: 10,
      batchDelayMs: 10,
      maxRetryAfterMs: 25
    });
    assert.equal(firstBatchCalls, 1);
    assert.equal(submitted.outcome, 'submitted');
    assert.equal(submitted.counts.submitted, 3);
    assert.equal(submitted.batches.length, 2);
    assert.equal(submitted.batches[0].attempts, 2);
    assert.equal(submitted.batches[0].status, 200);
    assert.equal(submitted.batches[1].status, 202);
    assert.equal(requests[1].host, 'fastgpt.cn');
    assert.equal(requests[1].key, config.key);
    assert.equal(requests[1].keyLocation, config.keyLocation);

    scenario = 'forbidden';
    requests.length = 0;
    const rejected = await submitToIndexNow({
      config,
      urls: ['https://fastgpt.cn/a'],
      maxRetries: 3,
      baseDelayMs: 10,
      batchDelayMs: 10
    });
    assert.equal(rejected.outcome, 'failed');
    assert.equal(rejected.batches[0].status, 403);
    assert.equal(rejected.batches[0].attempts, 1);
    assert.equal(requests.length, 1);
  } finally {
    await server.close();
  }
});

test('CLI executes --snapshot-live, --mode diff, and --mode recent end-to-end against mock HTTP', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-indexnow-cli-'));
  const cnKey = indexnowConfig.variants.cn.key;
  const postedBatches = [];
  let failPost = false;

  const server = await withMockServer((req, res, body) => {
    if (req.url === '/sitemap.xml') {
      res.writeHead(200, { 'content-type': 'application/xml' });
      res.end(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-content-000.xml</loc></sitemap>
</sitemapindex>`);
      return;
    }
    if (req.url === '/sitemap-shards/fastgpt.cn/sitemap-content-000.xml') {
      res.writeHead(200, { 'content-type': 'application/xml' });
      res.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://fastgpt.cn/</loc></url>
  <url><loc>https://fastgpt.cn/guide/existing</loc><lastmod>2026-10-01</lastmod></url>
</urlset>`);
      return;
    }
    if (req.url === `/${cnKey}.txt`) {
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(cnKey);
      return;
    }
    if (req.url === '/indexnow' && req.method === 'POST') {
      if (failPost) {
        res.writeHead(500, { 'content-type': 'text/plain' });
        res.end('server error');
        return;
      }
      postedBatches.push(JSON.parse(body));
      res.writeHead(200);
      res.end();
      return;
    }
    res.writeHead(404);
    res.end();
  });

  try {
    const preloadPath = path.join(tempDir, 'fetch-mock.cjs');
    fs.writeFileSync(
      preloadPath,
      `
const origFetch = globalThis.fetch;
globalThis.fetch = (input, init) => {
  const rawUrl = typeof input === 'string' ? input : input.url;
  const parsed = new URL(rawUrl);
  if (parsed.hostname === 'fastgpt.cn' || parsed.hostname === 'api.indexnow.org') {
    const rewritten = 'http://127.0.0.1:${server.port}' + parsed.pathname + parsed.search;
    return origFetch(rewritten, init);
  }
  return origFetch(input, init);
};
`
    );

    const runCli = (args) =>
      new Promise((resolve, reject) => {
        const child = spawn(
          process.execPath,
          ['--require', preloadPath, 'scripts/submit-indexnow.js', ...args],
          {
            cwd: ROOT,
            env: { ...process.env, NODE_OPTIONS: '' },
            stdio: ['ignore', 'pipe', 'pipe']
          }
        );
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

    const snapshotPath = path.join(tempDir, 'before.json');
    const snapResult = await runCli([
      '--snapshot-live',
      '--variant',
      'cn',
      '--out',
      snapshotPath
    ]);
    assert.equal(snapResult.status, 0, snapResult.stderr);
    const snapJson = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
    assert.equal(snapJson.ok, true);
    assert.equal(Object.keys(snapJson.urls).length, 2);

    const outDir = path.join(tempDir, 'out');
    fs.mkdirSync(path.join(outDir, 'sitemap-shards/fastgpt.cn'), { recursive: true });
    fs.writeFileSync(
      path.join(outDir, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-content-000.xml</loc></sitemap>
  <sitemap><loc>https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-industry-000.xml</loc></sitemap>
</sitemapindex>`
    );
    fs.writeFileSync(
      path.join(outDir, 'sitemap-shards/fastgpt.cn/sitemap-content-000.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://fastgpt.cn/</loc></url>
  <url><loc>https://fastgpt.cn/guide/existing</loc><lastmod>2026-11-22</lastmod></url>
</urlset>`
    );
    fs.writeFileSync(
      path.join(outDir, 'sitemap-shards/fastgpt.cn/sitemap-industry-000.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://fastgpt.cn/industry/mfg-d002-c012-f002</loc><lastmod>2026-10-14</lastmod></url>
</urlset>`
    );

    const diffReceiptPath = path.join(tempDir, 'diff-receipt.json');
    const diffResult = await runCli([
      '--mode',
      'diff',
      '--variant',
      'cn',
      '--out-dir',
      outDir,
      '--before-snapshot',
      snapshotPath,
      '--receipt-out',
      diffReceiptPath
    ]);
    assert.equal(diffResult.status, 0, diffResult.stderr);
    const diffReceipt = JSON.parse(fs.readFileSync(diffReceiptPath, 'utf8'));
    assert.equal(diffReceipt.outcome, 'submitted');
    assert.equal(diffReceipt.keyVerified, true);
    assert.equal(diffReceipt.counts.submitted, 2);
    assert.deepEqual(postedBatches[0].urlList, [
      'https://fastgpt.cn/guide/existing',
      'https://fastgpt.cn/industry/mfg-d002-c012-f002'
    ]);

    const recentReceiptPath = path.join(tempDir, 'recent-receipt.json');
    const recentResult = await runCli([
      '--mode',
      'recent',
      '--variant',
      'cn',
      '--out-dir',
      outDir,
      '--since-date',
      '2026-10-14',
      '--dry-run',
      '--receipt-out',
      recentReceiptPath
    ]);
    assert.equal(recentResult.status, 0, recentResult.stderr);
    const recentReceipt = JSON.parse(fs.readFileSync(recentReceiptPath, 'utf8'));
    assert.equal(recentReceipt.outcome, 'dry-run');
    assert.equal(recentReceipt.counts.planned, 2);

    failPost = true;
    const strictFail = await runCli([
      '--mode',
      'urls',
      '--variant',
      'cn',
      '--urls',
      'https://fastgpt.cn/industry/mfg-d002-c012-f002'
    ]);
    assert.equal(strictFail.status, 1);

    const softFail = await runCli([
      '--mode',
      'urls',
      '--variant',
      'cn',
      '--urls',
      'https://fastgpt.cn/industry/mfg-d002-c012-f002',
      '--soft-fail'
    ]);
    assert.equal(softFail.status, 0);
    assert.match(softFail.stderr, /::warning::/);
  } finally {
    await server.close();
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('fetchLiveSitemapSnapshot returns structured failure on HTTP error without throwing', async () => {
  const result = await fetchLiveSitemapSnapshot('https://fastgpt.cn', {
    retries: 0,
    fetchImpl: async () => new Response('unavailable', { status: 503 })
  });
  assert.equal(result.ok, false);
  assert.match(result.error, /HTTP 503/);
});

test('GitHub Actions workflows wire IndexNow snapshot, post-deploy diff, and manual backfill', () => {
  const cnWorkflow = yaml.load(
    fs.readFileSync(path.join(ROOT, '.github/workflows/fastgpt-home-image.yml'), 'utf8')
  );
  const cnSteps = cnWorkflow.jobs['build-fastgpt-landingpage-images'].steps;
  const cnNames = cnSteps.map((step) => step.name);
  assert(
    cnNames.indexOf('Snapshot live CN sitemap before rollout') <
      cnNames.indexOf('Deploy image and verify rollout')
  );
  assert(
    cnNames.indexOf('Deploy image and verify rollout') <
      cnNames.indexOf('Submit changed CN URLs to IndexNow')
  );
  assert(
    cnNames.indexOf('Submit changed CN URLs to IndexNow') <
      cnNames.indexOf('Upload CN IndexNow submission receipt')
  );

  const ioWorkflow = yaml.load(
    fs.readFileSync(path.join(ROOT, '.github/workflows/international-worker-release.yml'), 'utf8')
  );
  const ioSteps = ioWorkflow.jobs.deploy.steps;
  const ioNames = ioSteps.map((step) => step.name);
  assert(
    ioNames.indexOf('Snapshot live IO sitemap before deploy') <
      ioNames.indexOf('Deploy verified Worker and Static Assets to fastgpt.io')
  );
  assert(
    ioNames.indexOf('Record Worker deployment identity and rollback evidence') <
      ioNames.indexOf('Submit changed IO URLs to IndexNow')
  );
  assert(
    ioNames.indexOf('Submit changed IO URLs to IndexNow') <
      ioNames.indexOf('Retain the verified release unit and deployment evidence')
  );

  const backfill = yaml.load(
    fs.readFileSync(path.join(ROOT, '.github/workflows/indexnow-backfill.yml'), 'utf8')
  );
  const dispatchInputs = backfill.on.workflow_dispatch.inputs;
  assert.deepEqual(dispatchInputs.variant.options, ['cn', 'io', 'both']);
  assert.deepEqual(dispatchInputs.mode.options, ['recent', 'content', 'urls', 'all']);
  assert.equal(dispatchInputs.dry_run.default, true);
});
