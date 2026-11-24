const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const indexnowKeys = require('../src/config/indexnow.json');
const {
  INDEXNOW_ENDPOINT,
  diffSitemaps,
  fetchLiveSitemap,
  isEligibleUrl,
  main,
  postIndexNow,
  prioritizeAndCap,
  selectSubmitUrls
} = require('./submit-indexnow');

test('src/config/indexnow.json defines distinct 32-hex keys for cn and io only', () => {
  assert.deepEqual(Object.keys(indexnowKeys).sort(), ['cn', 'io']);
  assert.match(indexnowKeys.cn, /^[a-f0-9]{32}$/);
  assert.match(indexnowKeys.io, /^[a-f0-9]{32}$/);
  assert.notEqual(indexnowKeys.cn, indexnowKeys.io);
});

test('diffSitemaps detects added, modified, and removed URLs while ignoring unchanged', () => {
  const before = {
    'https://fastgpt.cn/': null,
    'https://fastgpt.cn/guide/a': '2026-10-01',
    'https://fastgpt.cn/guide/b': '2026-10-01',
    'https://fastgpt.cn/guide/old': '2026-09-01'
  };
  const after = {
    'https://fastgpt.cn/': null,
    'https://fastgpt.cn/guide/a': '2026-10-01',
    'https://fastgpt.cn/guide/b': '2026-11-24',
    'https://fastgpt.cn/guide/new': '2026-11-24'
  };

  assert.deepEqual(diffSitemaps(before, after), {
    added: ['https://fastgpt.cn/guide/new'],
    modified: ['https://fastgpt.cn/guide/b'],
    removed: ['https://fastgpt.cn/guide/old']
  });
});

test('prioritizeAndCap keeps /industry hub in content ahead of industry pages and enforces limit', () => {
  assert.equal(isEligibleUrl('https://fastgpt.cn/industry', 'fastgpt.cn'), true);
  assert.equal(isEligibleUrl('https://fastgpt.cn/ads/bing', 'fastgpt.cn'), false);
  assert.equal(isEligibleUrl('https://fastgpt.io/guide/a', 'fastgpt.cn'), false);
  assert.equal(isEligibleUrl('http://fastgpt.cn/price', 'fastgpt.cn'), false);
  assert.equal(isEligibleUrl('https://fastgpt.cn/price?utm=1', 'fastgpt.cn'), false);

  const result = prioritizeAndCap(
    [
      'https://fastgpt.cn/industry/mfg-d002-c012-f002',
      'https://fastgpt.cn/industry',
      'https://fastgpt.cn/guide/new',
      'https://fastgpt.cn/ads/excluded',
      'https://fastgpt.cn/industry'
    ],
    'fastgpt.cn',
    2
  );

  assert.equal(result.total, 3);
  assert.equal(result.truncated, 1);
  assert.deepEqual(result.urls, [
    'https://fastgpt.cn/industry',
    'https://fastgpt.cn/guide/new'
  ]);
});

test('fetchLiveSitemap appends cache-buster query and parses index + shards via split-sitemap', async () => {
  const requested = [];
  const fetchImpl = async (url) => {
    requested.push(url);
    if (url.includes('/sitemap.xml')) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-content-000.xml</loc></sitemap>
  <sitemap><loc>https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-industry-000.xml</loc></sitemap>
</sitemapindex>`,
        { status: 200 }
      );
    }
    if (url.includes('sitemap-content-000.xml')) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://fastgpt.cn/industry</loc></url>
  <url><loc>https://fastgpt.cn/guide/a</loc><lastmod>2026-11-20</lastmod></url>
</urlset>`,
        { status: 200 }
      );
    }
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://fastgpt.cn/industry/mfg-d002-c012-f002</loc><lastmod>2026-10-14</lastmod></url>
</urlset>`,
      { status: 200 }
    );
  };

  const entries = await fetchLiveSitemap('https://fastgpt.cn', {
    fetchImpl,
    stamp: 12345,
    retryDelayMs: 0
  });

  assert.deepEqual(requested, [
    'https://fastgpt.cn/sitemap.xml?v=12345',
    'https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-content-000.xml?v=12345',
    'https://fastgpt.cn/sitemap-shards/fastgpt.cn/sitemap-industry-000.xml?v=12345'
  ]);
  assert.deepEqual(entries, {
    'https://fastgpt.cn/industry': null,
    'https://fastgpt.cn/guide/a': '2026-11-20',
    'https://fastgpt.cn/industry/mfg-d002-c012-f002': '2026-10-14'
  });
});

test('selectSubmitUrls supports --since and --urls and rejects foreign hosts', () => {
  const entries = {
    'https://fastgpt.cn/': null,
    'https://fastgpt.cn/guide/new': '2026-11-18',
    'https://fastgpt.cn/industry/mfg-d002-c012-f002': '2026-10-14',
    'https://fastgpt.cn/guide/old': '2026-09-01'
  };

  assert.deepEqual(
    selectSubmitUrls({ since: '2026-10-14', entries, host: 'fastgpt.cn' }).urls,
    [
      'https://fastgpt.cn/guide/new',
      'https://fastgpt.cn/industry/mfg-d002-c012-f002'
    ]
  );
  assert.deepEqual(
    selectSubmitUrls({
      urls: 'https://fastgpt.cn/industry/mfg-d002-c012-f002,https://fastgpt.cn/guide/new',
      host: 'fastgpt.cn'
    }).urls,
    [
      'https://fastgpt.cn/guide/new',
      'https://fastgpt.cn/industry/mfg-d002-c012-f002'
    ]
  );
  assert.throws(
    () => selectSubmitUrls({ urls: 'https://fastgpt.io/guide/new', host: 'fastgpt.cn' }),
    /Invalid or out-of-scope/
  );
});

test('postIndexNow submits expected payload, retries 429/500, and stops on 403', async () => {
  const requests = [];
  let behavior = 'retry-then-202';
  const fetchImpl = async (url, init) => {
    requests.push({ url, body: JSON.parse(init.body) });
    if (behavior === 'retry-then-202') {
      if (requests.length === 1) return new Response('rate limit', { status: 429 });
      return new Response('', { status: 202 });
    }
    return new Response('forbidden', { status: 403 });
  };

  const dry = await postIndexNow({
    host: 'fastgpt.cn',
    key: indexnowKeys.cn,
    keyLocation: `https://fastgpt.cn/${indexnowKeys.cn}.txt`,
    urls: ['https://fastgpt.cn/price'],
    dryRun: true,
    fetchImpl
  });
  assert.equal(dry.status, 'dry-run');
  assert.equal(requests.length, 0);

  const ok = await postIndexNow({
    host: 'fastgpt.cn',
    key: indexnowKeys.cn,
    keyLocation: `https://fastgpt.cn/${indexnowKeys.cn}.txt`,
    urls: ['https://fastgpt.cn/price'],
    fetchImpl,
    retries: 2,
    retryDelayMs: 0
  });
  assert.equal(ok.status, 'submitted');
  assert.equal(ok.submitted, 1);
  assert.deepEqual(ok.statuses, [202]);
  assert.equal(requests.length, 2);
  assert.equal(requests[0].url, INDEXNOW_ENDPOINT);
  assert.deepEqual(requests[0].body, {
    host: 'fastgpt.cn',
    key: indexnowKeys.cn,
    keyLocation: `https://fastgpt.cn/${indexnowKeys.cn}.txt`,
    urlList: ['https://fastgpt.cn/price']
  });

  behavior = 'forbidden';
  requests.length = 0;
  const rejected = await postIndexNow({
    host: 'fastgpt.cn',
    key: indexnowKeys.cn,
    keyLocation: `https://fastgpt.cn/${indexnowKeys.cn}.txt`,
    urls: ['https://fastgpt.cn/price'],
    fetchImpl,
    retries: 2,
    retryDelayMs: 0
  });
  assert.equal(rejected.status, 'failed');
  assert.equal(rejected.statuses[0], 403);
  assert.equal(requests.length, 1);
});

test('main handles --diff missing snapshot and --soft-fail vs strict exit codes', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-indexnow-main-'));
  try {
    const missingSnapCode = await main([
      '--diff',
      '--variant',
      'cn',
      '--out-dir',
      tempDir,
      '--before',
      path.join(tempDir, 'missing.json')
    ]);
    assert.equal(missingSnapCode, 0);

    const strictFail = await main(
      ['--submit', '--variant', 'cn', '--urls', 'https://fastgpt.cn/price'],
      { fetchImpl: async () => new Response('err', { status: 500 }), retries: 1, retryDelayMs: 0 }
    );
    assert.equal(strictFail, 1);

    const softFail = await main(
      ['--submit', '--variant', 'cn', '--urls', 'https://fastgpt.cn/price', '--soft-fail'],
      { fetchImpl: async () => new Response('err', { status: 500 }), retries: 1, retryDelayMs: 0 }
    );
    assert.equal(softFail, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
