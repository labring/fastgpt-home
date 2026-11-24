const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { INDEXNOW_ENDPOINT, INDEXNOW_KEY, collectIndexNowUrls, submitIndexNow } = require('./submit-indexnow');

const ROOT = path.resolve(__dirname, '..');

test('committed key file matches INDEXNOW_KEY', () => {
  assert.match(INDEXNOW_KEY, /^[0-9a-f]{32}$/);
  assert.equal(fs.readFileSync(path.join(ROOT, 'public', `${INDEXNOW_KEY}.txt`), 'utf8').trim(), INDEXNOW_KEY);
});

test('collectIndexNowUrls reads recent sitemap entries and falls back to hubs', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'indexnow-sitemap-'));
  try {
    fs.writeFileSync(
      path.join(tempDir, 'sitemap-content-000.xml'),
      `<urlset><url><loc>https://fastgpt.cn/a</loc><lastmod>2026-11-24T00:00:00Z</lastmod></url><url><loc>https://fastgpt.cn/old</loc><lastmod>2026-10-01T00:00:00Z</lastmod></url><url><loc>https://other.example/x</loc><lastmod>2026-11-24T00:00:00Z</lastmod></url></urlset>`
    );
    const recent = collectIndexNowUrls({
      repoRoot: ROOT,
      variant: 'cn',
      sitemapDir: tempDir,
      recentDays: 2,
      nowMs: Date.parse('2026-11-24T12:00:00Z')
    });
    assert.equal(recent.mode, 'recent-lastmod');
    assert.deepEqual(recent.urls, ['https://fastgpt.cn/a']);

    const fallback = collectIndexNowUrls({
      repoRoot: ROOT,
      variant: 'io',
      sitemapDir: path.join(tempDir, 'missing')
    });
    assert.equal(fallback.mode, 'hub-fallback');
    assert(fallback.urls.includes('https://fastgpt.io/'));
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('submitIndexNow batches >10k URLs and validates responses', async () => {
  const requests = [];
  const urls = Array.from({ length: 10_002 }, (_, i) => `https://fastgpt.io/p-${i}`);
  const result = await submitIndexNow({
    host: 'fastgpt.io',
    urls,
    fetchImpl: async (url, init) => {
      requests.push({ url, body: JSON.parse(init.body) });
      return { status: 202 };
    }
  });
  assert.equal(requests.length, 2);
  assert.equal(requests[0].url, INDEXNOW_ENDPOINT);
  assert.equal(requests[0].body.urlList.length, 10_000);
  assert.equal(requests[1].body.urlList.length, 2);
  assert.equal(result.urlsSubmitted, 10_002);

  await assert.rejects(
    () => submitIndexNow({ host: 'fastgpt.io', urls: ['https://fastgpt.io/'], fetchImpl: async () => ({ status: 403 }) }),
    /HTTP 403/
  );
});

test('CLI --dry-run works for cn and io variants', () => {
  for (const variant of ['cn', 'io']) {
    const res = spawnSync(process.execPath, ['scripts/submit-indexnow.js', '--variant', variant, '--dry-run'], {
      cwd: ROOT,
      encoding: 'utf8'
    });
    assert.equal(res.status, 0, res.stderr);
    const parsed = JSON.parse(res.stdout);
    assert.equal(parsed.dryRun, true);
    assert(parsed.count > 0);
  }
});
