const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { INDEXNOW_KEYS } = require('./lib/site-variant');
const { INDEXNOW_ENDPOINT, diffSitemaps, loadSitemap, main, postIndexNow } = require('./submit-indexnow');

test('INDEXNOW_KEYS defines distinct 32-hex keys for cn and io only', () => {
  assert.deepEqual(Object.keys(INDEXNOW_KEYS).sort(), ['cn', 'io']);
  assert.match(INDEXNOW_KEYS.cn, /^[a-f0-9]{32}$/);
  assert.match(INDEXNOW_KEYS.io, /^[a-f0-9]{32}$/);
  assert.notEqual(INDEXNOW_KEYS.cn, INDEXNOW_KEYS.io);
});

test('diffSitemaps detects added, modified, and removed URLs and ignores dropped mtime', () => {
  const before = {
    'https://fastgpt.cn/': null,
    'https://fastgpt.cn/guide/a': '2026-10-01',
    'https://fastgpt.cn/guide/b': '2026-10-01',
    'https://fastgpt.cn/troubleshoot/legacy': '2026-09-14T02:18:15.089Z',
    'https://fastgpt.cn/guide/old': '2026-09-01'
  };
  const after = {
    'https://fastgpt.cn/': null,
    'https://fastgpt.cn/guide/a': '2026-10-01',
    'https://fastgpt.cn/guide/b': '2026-11-24',
    'https://fastgpt.cn/troubleshoot/legacy': null,
    'https://fastgpt.cn/guide/new': '2026-11-24'
  };

  assert.deepEqual(diffSitemaps(before, after), {
    added: ['https://fastgpt.cn/guide/new'],
    modified: ['https://fastgpt.cn/guide/b'],
    removed: ['https://fastgpt.cn/guide/old']
  });
});

test('loadSitemap expands sitemapindex shards and filters out ineligible URLs', async () => {
  const xmlByUrl = {
    'https://fastgpt.cn/sitemap.xml':
      '<sitemapindex><sitemap><loc>https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-content-000.xml</loc></sitemap></sitemapindex>',
    'https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-content-000.xml': [
      '<urlset>',
      '  <url><loc>https://fastgpt.cn/industry</loc></url>',
      '  <url><loc>https://fastgpt.cn/guide/a</loc><lastmod>2026-11-20</lastmod></url>',
      '  <url><loc>https://fastgpt.cn/price?utm=1</loc></url>',
      '  <url><loc>https://fastgpt.io/guide/other</loc></url>',
      '</urlset>'
    ].join('\n')
  };

  const entries = await loadSitemap((url) => xmlByUrl[url], 'https://fastgpt.cn');
  assert.deepEqual(entries, {
    'https://fastgpt.cn/industry': null,
    'https://fastgpt.cn/guide/a': '2026-11-20'
  });
});

test('postIndexNow supports dry-run, retries 429 to 202, and stops on 403', async () => {
  const requests = [];
  let mode = 'retry';
  const fetchImpl = async (url, init) => {
    requests.push({ url, body: JSON.parse(init.body) });
    if (mode === 'retry') {
      return requests.length === 1 ? new Response('limit', { status: 429 }) : new Response('', { status: 202 });
    }
    return new Response('forbidden', { status: 403 });
  };
  const base = {
    host: 'fastgpt.cn',
    key: INDEXNOW_KEYS.cn,
    keyLocation: `https://fastgpt.cn/${INDEXNOW_KEYS.cn}.txt`,
    urls: ['https://fastgpt.cn/price'],
    fetchImpl,
    retries: 2,
    retryDelayMs: 0
  };

  assert.equal((await postIndexNow({ ...base, dryRun: true })).status, 'dry-run');
  assert.equal(requests.length, 0);

  const ok = await postIndexNow(base);
  assert.equal(ok.status, 'submitted');
  assert.equal(ok.httpStatus, 202);
  assert.equal(requests.length, 2);
  assert.equal(requests[0].url, INDEXNOW_ENDPOINT);
  assert.deepEqual(requests[0].body.urlList, ['https://fastgpt.cn/price']);

  mode = 'forbidden';
  requests.length = 0;
  const rejected = await postIndexNow(base);
  assert.equal(rejected.status, 'failed');
  assert.equal(rejected.httpStatus, 403);
  assert.equal(requests.length, 1);
});

test('main handles snapshot/diff prioritization, missing --before failure, and --urls validation', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-indexnow-'));
  try {
    const requested = [];
    const submitted = [];
    const fetchImpl = async (url, init) => {
      if (init.method === 'POST') {
        submitted.push(JSON.parse(init.body).urlList);
        return new Response('', { status: 200 });
      }
      requested.push(url);
      return new Response('<urlset><url><loc>https://fastgpt.cn/</loc></url></urlset>', { status: 200 });
    };

    const snapFile = path.join(tempDir, 'before.json');
    assert.equal(
      await main(['--snapshot', '--variant', 'cn', '--out', snapFile], { fetchImpl, stamp: 42, retryDelayMs: 0 }),
      0
    );
    assert.deepEqual(requested, ['https://fastgpt.cn/sitemap.xml?v=42']);

    const outDir = path.join(tempDir, 'out');
    fs.mkdirSync(outDir);
    fs.writeFileSync(
      path.join(outDir, 'sitemap.xml'),
      '<urlset><url><loc>https://fastgpt.cn/</loc></url><url><loc>https://fastgpt.cn/industry/a</loc></url><url><loc>https://fastgpt.cn/industry</loc></url></urlset>'
    );
    assert.equal(
      await main(['--diff', '--variant', 'cn', '--out-dir', outDir, '--before', snapFile], { fetchImpl, retryDelayMs: 0 }),
      0
    );
    assert.deepEqual(submitted, [['https://fastgpt.cn/industry', 'https://fastgpt.cn/industry/a']]);

    await assert.rejects(
      main(['--diff', '--variant', 'cn', '--out-dir', outDir, '--before', path.join(tempDir, 'missing.json')]),
      /ENOENT/
    );
    await assert.rejects(
      main(['--submit', '--variant', 'cn', '--urls', 'https://fastgpt.io/price']),
      /Invalid or out-of-scope/
    );
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
