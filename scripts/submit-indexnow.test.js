const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  buildIndexNowBatches,
  collectChangedSitemapUrls,
  parseSitemapUrls,
  submitIndexNow,
  verifyLocalKeyFile
} = require('./lib/indexnow');

const ROOT = path.resolve(__dirname, '..');

test('committed IndexNow key file matches INDEXNOW_KEY and 32-char hex format', () => {
  assert.match(INDEXNOW_KEY, /^[0-9a-f]{32}$/);
  const check = verifyLocalKeyFile(ROOT, INDEXNOW_KEY);
  assert.equal(check.ok, true, check.reason);
  assert.equal(
    fs.readFileSync(path.join(ROOT, 'public', `${INDEXNOW_KEY}.txt`), 'utf8').trim(),
    INDEXNOW_KEY
  );
});

test('parseSitemapUrls extracts loc and optional lastmod', () => {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '<url><loc>https://fastgpt.cn/</loc></url>',
    '<url><loc>https://fastgpt.cn/guide/a&amp;b</loc><lastmod>2026-11-24T00:00:00Z</lastmod></url>',
    '</urlset>'
  ].join('\n');

  assert.deepEqual(parseSitemapUrls(xml), [
    { loc: 'https://fastgpt.cn/', lastmod: '' },
    { loc: 'https://fastgpt.cn/guide/a&b', lastmod: '2026-11-24T00:00:00Z' }
  ]);
});

test('collectChangedSitemapUrls diffs git commits and falls back to recent lastmod or core hubs', () => {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'indexnow-git-'));
  try {
    const runGit = (...args) =>
      execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

    runGit('init');
    runGit('config', 'user.email', 'test@example.com');
    runGit('config', 'user.name', 'Tester');

    const shardDir = path.join(repo, 'sitemaps', 'fastgpt.cn');
    fs.mkdirSync(shardDir, { recursive: true });
    fs.writeFileSync(
      path.join(shardDir, 'sitemap-content-000.xml'),
      `<urlset><url><loc>https://fastgpt.cn/</loc></url><url><loc>https://fastgpt.cn/a</loc><lastmod>2026-11-01T00:00:00Z</lastmod></url></urlset>`
    );
    runGit('add', '.');
    runGit('commit', '-m', 'initial');

    fs.writeFileSync(
      path.join(shardDir, 'sitemap-content-000.xml'),
      `<urlset><url><loc>https://fastgpt.cn/</loc></url><url><loc>https://fastgpt.cn/a</loc><lastmod>2026-11-24T00:00:00Z</lastmod></url><url><loc>https://fastgpt.cn/b</loc><lastmod>2026-11-24T00:00:00Z</lastmod></url><url><loc>https://other.example/x</loc></url></urlset>`
    );
    runGit('add', '.');
    runGit('commit', '-m', 'update');

    const diff = collectChangedSitemapUrls({
      repoRoot: repo,
      variant: 'cn',
      baseRef: 'HEAD~1'
    });
    assert.equal(diff.mode, 'git-diff');
    assert.deepEqual(diff.urls, ['https://fastgpt.cn/a', 'https://fastgpt.cn/b']);

    // No git baseRef: recent-lastmod picks URLs inside window
    const recent = collectChangedSitemapUrls({
      repoRoot: repo,
      variant: 'cn',
      baseRef: '0'.repeat(40),
      recentDays: 2,
      nowMs: Date.parse('2026-11-24T12:00:00Z')
    });
    assert.equal(recent.mode, 'recent-lastmod');
    assert.deepEqual(recent.urls, ['https://fastgpt.cn/a', 'https://fastgpt.cn/b']);

    // No recent lastmod and matching git diff: falls back to core hubs
    const hub = collectChangedSitemapUrls({
      repoRoot: repo,
      variant: 'cn',
      baseRef: 'HEAD'
    });
    assert.equal(hub.mode, 'hub-fallback');
    assert(hub.urls.includes('https://fastgpt.cn/'));
    assert(hub.urls.includes('https://fastgpt.cn/customers'));
  } finally {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

test('buildIndexNowBatches chunks at 10,000 URLs and filters foreign origins', () => {
  const urls = Array.from({ length: 10_005 }, (_, i) => `https://fastgpt.io/page-${i}`);
  urls.push('https://fastgpt.cn/foreign');
  const batches = buildIndexNowBatches(urls, 'fastgpt.io');
  assert.equal(batches.length, 2);
  assert.equal(batches[0].urlList.length, 10_000);
  assert.equal(batches[1].urlList.length, 5);
  assert.equal(batches[0].keyLocation, `https://fastgpt.io/${INDEXNOW_KEY}.txt`);
});

test('submitIndexNow verifies live key file, sends IndexNow payload, and handles HTTP errors', async () => {
  const calls = [];
  const mockFetch = async (url, init) => {
    calls.push({ url, init });
    if (init?.method === 'GET') {
      return { ok: true, status: 200, text: async () => `${INDEXNOW_KEY}\n` };
    }
    return { ok: true, status: 202, text: async () => '' };
  };

  const result = await submitIndexNow({
    host: 'fastgpt.cn',
    urls: ['https://fastgpt.cn/', 'https://fastgpt.cn/tech-center'],
    fetchImpl: mockFetch
  });

  assert.equal(result.status, 'submitted');
  assert.equal(result.batchesSubmitted, 1);
  assert.equal(result.urlsSubmitted, 2);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, `https://fastgpt.cn/${INDEXNOW_KEY}.txt`);
  assert.equal(calls[1].url, INDEXNOW_ENDPOINT);
  assert.deepEqual(JSON.parse(calls[1].init.body), {
    host: 'fastgpt.cn',
    key: INDEXNOW_KEY,
    keyLocation: `https://fastgpt.cn/${INDEXNOW_KEY}.txt`,
    urlList: ['https://fastgpt.cn/', 'https://fastgpt.cn/tech-center']
  });

  await assert.rejects(
    () =>
      submitIndexNow({
        host: 'fastgpt.cn',
        urls: ['https://fastgpt.cn/'],
        fetchImpl: async () => ({ ok: false, status: 404, text: async () => '' })
      }),
    /key file check failed/
  );

  const skipped = await submitIndexNow({
    host: 'fastgpt.cn',
    urls: ['https://fastgpt.cn/'],
    allowUnverifiedKey: true,
    fetchImpl: async () => ({ ok: false, status: 404, text: async () => '' })
  });
  assert.equal(skipped.status, 'skipped-unverified-key');

  await assert.rejects(
    () =>
      submitIndexNow({
        host: 'fastgpt.cn',
        urls: ['https://fastgpt.cn/'],
        skipKeyCheck: true,
        fetchImpl: async () => ({ ok: false, status: 422, text: async () => 'Invalid URL' })
      }),
    /HTTP 422 Invalid URL/
  );
});

test('CLI --dry-run succeeds for both cn and io variants', () => {
  for (const variant of ['cn', 'io']) {
    const res = spawnSync(process.execPath, ['scripts/submit-indexnow.js', '--variant', variant, '--dry-run'], {
      cwd: ROOT,
      encoding: 'utf8'
    });
    assert.equal(res.status, 0, res.stderr);
    const parsed = JSON.parse(res.stdout);
    assert.equal(parsed.dryRun, true);
    assert.equal(parsed.localKeyFile, 'verified');
    assert(parsed.totalUrls > 0);
  }
});
