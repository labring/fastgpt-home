const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { gunzipSync } = require('node:zlib');
const test = require('node:test');

const { parseSitemapIndex, parseUrlset, splitSitemapFile } = require('./split-sitemap');

const SITEMAP_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const IMAGE_NAMESPACE = 'http://www.google.com/schemas/sitemap-image/1.1';
const SITE = 'https://fastgpt.io';

function makeUrlset(entries, rootAttributes = '') {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="${SITEMAP_NAMESPACE}" xmlns:image="${IMAGE_NAMESPACE}"${rootAttributes}>`,
    ...entries,
    '</urlset>',
    ''
  ].join('\n');
}

function makeUrl(loc, metadata = '') {
  return `<url><loc>${loc}</loc>${metadata}</url>`;
}

function createFixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sitemap-shards-'));
  const outputDirectory = path.join(root, 'out');
  const stateDirectory = path.join(root, 'state');
  fs.mkdirSync(outputDirectory, { recursive: true });
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return { outputDirectory, stateDirectory };
}

function writeSource(outputDirectory, xml) {
  fs.writeFileSync(path.join(outputDirectory, 'sitemap.xml'), xml);
}

function runSplit(fixture, xml, options = {}) {
  writeSource(fixture.outputDirectory, xml);
  return splitSitemapFile(fixture.outputDirectory, {
    variant: 'io',
    site: SITE,
    stateDirectory: fixture.stateDirectory,
    ...options
  });
}

function readShard(fixture, file) {
  return fs.readFileSync(path.join(fixture.stateDirectory, file), 'utf8');
}

function shardRecords(fixture, result) {
  return result.shards.flatMap(
    (shard) => parseUrlset(readShard(fixture, shard.file), SITE).entries
  );
}

test('persists deterministic 8-character shards and preserves XML metadata', (t) => {
  const fixture = createFixture(t);
  const source = makeUrlset([
    [
      '<url>',
      `  <loc>${SITE}/</loc>`,
      '  <lastmod>2026-10-28</lastmod>',
      '  <image:image><image:loc>https://fastgpt.io/logo.png</image:loc></image:image>',
      '</url>'
    ].join('\n'),
    makeUrl(`${SITE}/blog`, '<lastmod>2026-10-28T08:00:00+08:00</lastmod>'),
    makeUrl(`${SITE}/faq/example`)
  ]);

  const first = runSplit(fixture, source, { maxUrlsPerShard: 2 });
  assert.equal(first.entryCount, 3);
  assert.deepEqual(
    first.shards.map(({ urls }) => urls),
    [2, 1]
  );
  assert.match(first.shards[0].file, /^sitemap-core-000-[a-f0-9]{8}\.xml$/);
  assert.ok(
    first.shards.every((shard) =>
      fs.existsSync(path.join(fixture.stateDirectory, `${shard.file}.gz`))
    )
  );

  const firstShard = readShard(fixture, first.shards[0].file);
  assert.match(firstShard, /<url\b[^>]*><loc>/);
  assert.match(firstShard, /<lastmod>2026-10-28<\/lastmod>/);
  assert.match(firstShard, /image:image/);
  assert.deepEqual(
    gunzipSync(fs.readFileSync(path.join(fixture.stateDirectory, `${first.shards[0].file}.gz`))),
    Buffer.from(firstShard)
  );
  assert.deepEqual(
    parseSitemapIndex(fs.readFileSync(path.join(fixture.outputDirectory, 'sitemap.xml')), SITE),
    first.shards.map((shard) => `${SITE}/sitemap-shards/fastgpt.io/${shard.file}`)
  );

  const firstIndex = fs.readFileSync(path.join(fixture.outputDirectory, 'sitemap.xml'));
  const firstGzip = fs.readFileSync(path.join(fixture.outputDirectory, 'sitemap.xml.gz'));
  const second = runSplit(fixture, source, { maxUrlsPerShard: 2 });
  assert.deepEqual(second.shards, first.shards);
  assert.deepEqual(fs.readFileSync(path.join(fixture.outputDirectory, 'sitemap.xml')), firstIndex);
  assert.deepEqual(
    fs.readFileSync(path.join(fixture.outputDirectory, 'sitemap.xml.gz')),
    firstGzip
  );
});

test('new industry articles use delta shards while all old references stay stable', (t) => {
  const fixture = createFixture(t);
  const firstSource = makeUrlset([
    makeUrl(`${SITE}/industry`),
    makeUrl(`${SITE}/industry/finance-a`, '<lastmod>2026-10-25</lastmod>'),
    makeUrl(`${SITE}/industry/finance-b`, '<lastmod>2026-10-26</lastmod>')
  ]);
  const first = runSplit(fixture, firstSource, { maxUrlsPerShard: 2 });
  const oldArticleShard = first.shards.find((shard) => shard.bucket === 'industry-finance');
  const oldArticleBytes = fs.readFileSync(path.join(fixture.stateDirectory, oldArticleShard.file));

  const nextSource = makeUrlset([
    makeUrl(`${SITE}/industry`),
    makeUrl(`${SITE}/industry/finance-a`, '<lastmod>2026-10-25</lastmod>'),
    makeUrl(`${SITE}/industry/finance-b`, '<lastmod>2026-10-26</lastmod>'),
    makeUrl(`${SITE}/industry/finance-c`, '<lastmod>2026-10-28</lastmod>')
  ]);
  const next = runSplit(fixture, nextSource, { maxUrlsPerShard: 2 });
  const nextArticleShards = next.shards.filter((shard) => shard.bucket === 'industry-finance');

  assert.ok(nextArticleShards.some((shard) => shard.file === oldArticleShard.file));
  assert.deepEqual(
    next.shards.slice(0, first.shards.length).map((shard) => shard.file),
    first.shards.map((shard) => shard.file)
  );
  assert.deepEqual(
    fs.readFileSync(path.join(fixture.stateDirectory, oldArticleShard.file)),
    oldArticleBytes
  );
  assert.equal(nextArticleShards.length, 2);
  assert.equal(shardRecords(fixture, next).length, 4);
  assert.deepEqual(
    shardRecords(fixture, next)
      .map((entry) => entry.loc)
      .sort(),
    [
      `${SITE}/industry`,
      `${SITE}/industry/finance-a`,
      `${SITE}/industry/finance-b`,
      `${SITE}/industry/finance-c`
    ].sort()
  );
});

test('replaces only changed shards and checks URLs plus metadata when counts match', (t) => {
  const fixture = createFixture(t);
  const firstSource = makeUrlset([
    makeUrl(`${SITE}/faq/a`, '<lastmod>2026-10-26</lastmod>'),
    makeUrl(`${SITE}/faq/b`),
    makeUrl(`${SITE}/faq/c`),
    makeUrl(`${SITE}/faq/d`)
  ]);
  const first = runSplit(fixture, firstSource, { maxUrlsPerShard: 2 });
  const unchanged = first.shards[1];
  const changed = first.shards[0];

  const nextSource = makeUrlset([
    makeUrl(`${SITE}/faq/a`, '<lastmod>2026-10-28</lastmod>'),
    makeUrl(`${SITE}/faq/c`),
    makeUrl(`${SITE}/faq/d`),
    makeUrl(`${SITE}/faq/e`)
  ]);
  const next = runSplit(fixture, nextSource, { maxUrlsPerShard: 2 });
  const nextLocs = shardRecords(fixture, next)
    .map((entry) => entry.loc)
    .sort();

  assert.equal(next.entryCount, first.entryCount);
  assert.notEqual(next.shards[0].file, changed.file);
  assert.ok(next.shards.some((shard) => shard.file === unchanged.file));
  assert.equal(fs.existsSync(path.join(fixture.stateDirectory, changed.file)), true);
  assert.deepEqual(
    nextLocs,
    [`${SITE}/faq/a`, `${SITE}/faq/c`, `${SITE}/faq/d`, `${SITE}/faq/e`].sort()
  );
  assert.match(readShard(fixture, next.shards[0].file), /<lastmod>2026-10-28<\/lastmod>/);
});

test('enforces 5,000 URLs and 10 MiB per shard', (t) => {
  const fixture = createFixture(t);
  const entries = Array.from({ length: 5001 }, (_, index) => makeUrl(`${SITE}/faq/${index}`));
  const result = runSplit(fixture, makeUrlset(entries));

  assert.deepEqual(
    result.shards.map(({ urls }) => urls),
    [5000, 1]
  );
  assert.ok(
    result.shards.every(
      (shard) => fs.statSync(path.join(fixture.stateDirectory, shard.file)).size <= 10 * 1024 * 1024
    )
  );

  const tooLarge = makeUrlset([makeUrl(`${SITE}/faq/${'a'.repeat(1200)}`)]);
  assert.throws(
    () => runSplit(createFixture(t), tooLarge, { maxShardBytes: 1024 }),
    /shard budget/
  );
});

test('rejects malformed, empty, duplicate, cross-origin, HTTP, and invalid metadata', () => {
  assert.throws(() => parseUrlset('<urlset><url>', SITE), /XML parse failed/);
  assert.throws(() => parseUrlset(makeUrlset([]), SITE), /empty/);
  assert.throws(
    () => parseUrlset(makeUrlset([makeUrl(`${SITE}/a`), makeUrl(`${SITE}/a`)]), SITE),
    /Duplicate sitemap loc/
  );
  assert.throws(() => parseUrlset(makeUrlset([makeUrl('http://fastgpt.io/a')]), SITE), /HTTPS/);
  assert.throws(
    () => parseUrlset(makeUrlset([makeUrl('https://fastgpt.cn/a')]), SITE),
    /another origin/
  );
  assert.throws(
    () => parseUrlset(makeUrlset([makeUrl(`${SITE}/a#section`)]), SITE),
    /Invalid sitemap loc/
  );
  assert.throws(
    () => parseUrlset(makeUrlset([makeUrl(`${SITE}/a`, '<lastmod>2026-02-30</lastmod>')]), SITE),
    /calendar date/
  );
  assert.throws(
    () =>
      parseUrlset(
        makeUrlset([makeUrl(`${SITE}/a`, '<lastmod>2026-10-28T08:00:00</lastmod>')]),
        SITE
      ),
    /W3C lastmod/
  );
  assert.throws(
    () => parseUrlset(makeUrlset([makeUrl(`${SITE}/a`)], ' version="1"'), SITE),
    /explicit adapter/
  );
  assert.throws(
    () =>
      parseUrlset(
        `<!DOCTYPE urlset [<!ENTITY x "x">]>${makeUrlset([makeUrl(`${SITE}/&x;`)])}`,
        SITE
      ),
    /DTD or entity/
  );
});

test('preview removes mixed-origin sitemap output without parsing it', (t) => {
  const fixture = createFixture(t);
  writeSource(
    fixture.outputDirectory,
    makeUrlset([makeUrl('https://fastgpt.io/'), makeUrl('https://fastgpt.cn/')])
  );
  fs.writeFileSync(path.join(fixture.outputDirectory, 'sitemap-0.xml'), 'old shard');
  const previewShardDirectory = path.join(fixture.outputDirectory, 'sitemap-shards', 'fastgpt.io');
  fs.mkdirSync(previewShardDirectory, { recursive: true });
  fs.writeFileSync(path.join(previewShardDirectory, 'stale.xml'), 'stale');

  const result = splitSitemapFile(fixture.outputDirectory, {
    variant: 'preview',
    stateDirectory: fixture.stateDirectory
  });

  assert.equal(result.skipped, true);
  assert.equal(fs.existsSync(path.join(fixture.outputDirectory, 'sitemap.xml')), false);
  assert.equal(fs.existsSync(path.join(fixture.outputDirectory, 'sitemap-0.xml')), false);
  assert.equal(fs.existsSync(previewShardDirectory), false);
  assert.equal(fs.existsSync(fixture.stateDirectory), false);
});
