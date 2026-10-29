const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
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

function assertNoGzipFiles(fixture) {
  assert.equal(
    fs.readdirSync(fixture.stateDirectory).some((file) => file.endsWith('.gz')),
    false
  );
  assert.equal(fs.existsSync(path.join(fixture.outputDirectory, 'sitemap.xml.gz')), false);
  assert.equal(
    fs
      .readdirSync(path.join(fixture.outputDirectory, 'sitemap-shards', 'fastgpt.io'))
      .some((file) => file.endsWith('.gz')),
    false
  );
}

function shardRecords(fixture, result) {
  return result.shards.flatMap(
    (shard) => parseUrlset(readShard(fixture, shard.file), SITE).entries
  );
}

test('persists deterministic XML shards and combines non-industry routes', (t) => {
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
    makeUrl(`${SITE}/faq/example`),
    makeUrl(`${SITE}/industry`),
    makeUrl(`${SITE}/industry/finance-a`)
  ]);

  const first = runSplit(fixture, source);
  assert.equal(first.entryCount, 5);
  assert.deepEqual(
    first.shards.map(({ bucket, urls }) => [bucket, urls]),
    [
      ['content', 4],
      ['industry', 1]
    ]
  );
  assert.match(first.shards[0].file, /^sitemap-content-000-[a-f0-9]{8}\.xml$/);

  const firstShard = readShard(fixture, first.shards[0].file);
  assert.match(firstShard, /<url\b[^>]*><loc>/);
  assert.match(firstShard, /<lastmod>2026-10-28<\/lastmod>/);
  assert.match(firstShard, /image:image/);
  assert.deepEqual(
    parseSitemapIndex(fs.readFileSync(path.join(fixture.outputDirectory, 'sitemap.xml')), SITE),
    first.shards.map((shard) => `${SITE}/sitemap-shards/fastgpt.io/${shard.file}`)
  );

  const firstIndex = fs.readFileSync(path.join(fixture.outputDirectory, 'sitemap.xml'));
  const second = runSplit(fixture, source);
  assert.deepEqual(second.shards, first.shards);
  assert.deepEqual(fs.readFileSync(path.join(fixture.outputDirectory, 'sitemap.xml')), firstIndex);
  assertNoGzipFiles(fixture);
});

test('industry additions fill the current tail and preserve full shards', (t) => {
  const fixture = createFixture(t);
  const firstSource = makeUrlset([
    makeUrl(`${SITE}/industry`),
    makeUrl(`${SITE}/industry/finance-a`, '<lastmod>2026-10-25</lastmod>'),
    makeUrl(`${SITE}/industry/finance-b`, '<lastmod>2026-10-26</lastmod>'),
    makeUrl(`${SITE}/industry/finance-c`, '<lastmod>2026-10-27</lastmod>')
  ]);
  const first = runSplit(fixture, firstSource, { maxIndustryUrlsPerShard: 2 });
  const firstIndustry = first.shards.filter((shard) => shard.bucket === 'industry');
  const sealedFile = firstIndustry[0].file;
  const openFile = firstIndustry[1].file;
  const sealedBytes = fs.readFileSync(path.join(fixture.stateDirectory, sealedFile));

  const nextSource = makeUrlset([
    makeUrl(`${SITE}/industry`),
    makeUrl(`${SITE}/industry/finance-a`, '<lastmod>2026-10-25</lastmod>'),
    makeUrl(`${SITE}/industry/finance-b`, '<lastmod>2026-10-26</lastmod>'),
    makeUrl(`${SITE}/industry/finance-c`, '<lastmod>2026-10-27</lastmod>'),
    makeUrl(`${SITE}/industry/finance-d`, '<lastmod>2026-10-28</lastmod>')
  ]);
  const next = runSplit(fixture, nextSource, { maxIndustryUrlsPerShard: 2 });
  const nextIndustry = next.shards.filter((shard) => shard.bucket === 'industry');

  assert.deepEqual(
    nextIndustry.map(({ urls }) => urls),
    [2, 2]
  );
  assert.equal(nextIndustry[0].file, sealedFile);
  assert.notEqual(nextIndustry[1].file, openFile);
  assert.deepEqual(fs.readFileSync(path.join(fixture.stateDirectory, sealedFile)), sealedBytes);
  assert.equal(fs.existsSync(path.join(fixture.stateDirectory, openFile)), true);
  assert.equal(
    fs.existsSync(path.join(fixture.outputDirectory, 'sitemap-shards/fastgpt.io', openFile)),
    true
  );

  const finalSource = makeUrlset([
    makeUrl(`${SITE}/industry`),
    makeUrl(`${SITE}/industry/finance-a`, '<lastmod>2026-10-25</lastmod>'),
    makeUrl(`${SITE}/industry/finance-b`, '<lastmod>2026-10-26</lastmod>'),
    makeUrl(`${SITE}/industry/finance-c`, '<lastmod>2026-10-27</lastmod>'),
    makeUrl(`${SITE}/industry/finance-d`, '<lastmod>2026-10-28</lastmod>'),
    makeUrl(`${SITE}/industry/finance-e`, '<lastmod>2026-10-29</lastmod>')
  ]);
  const final = runSplit(fixture, finalSource, { maxIndustryUrlsPerShard: 2 });
  const finalIndustry = final.shards.filter((shard) => shard.bucket === 'industry');
  assert.deepEqual(
    finalIndustry.map(({ sequence, urls }) => [sequence, urls]),
    [
      [0, 2],
      [1, 2],
      [2, 1]
    ]
  );
  assert.equal(finalIndustry[0].file, sealedFile);
  assert.equal(shardRecords(fixture, final).length, 6);
  assertNoGzipFiles(fixture);
});

test('rebuilds content independently when blog or FAQ entries change', (t) => {
  const fixture = createFixture(t);
  const firstSource = makeUrlset([
    makeUrl(`${SITE}/blog/a`, '<lastmod>2026-10-26</lastmod>'),
    makeUrl(`${SITE}/faq/a`),
    makeUrl(`${SITE}/industry`),
    makeUrl(`${SITE}/industry/article-a`, '<lastmod>2026-10-27</lastmod>')
  ]);
  const first = runSplit(fixture, firstSource);
  const firstContent = first.shards.find((shard) => shard.bucket === 'content');
  const firstIndustry = first.shards.find((shard) => shard.bucket === 'industry');
  const industryBytes = fs.readFileSync(path.join(fixture.stateDirectory, firstIndustry.file));

  const nextSource = makeUrlset([
    makeUrl(`${SITE}/blog/b`, '<lastmod>2026-10-28</lastmod>'),
    makeUrl(`${SITE}/faq/a`),
    makeUrl(`${SITE}/industry`),
    makeUrl(`${SITE}/industry/article-a`, '<lastmod>2026-10-27</lastmod>')
  ]);
  const next = runSplit(fixture, nextSource);
  const nextContent = next.shards.find((shard) => shard.bucket === 'content');
  const nextIndustry = next.shards.find((shard) => shard.bucket === 'industry');

  assert.equal(next.entryCount, first.entryCount);
  assert.notEqual(nextContent.file, firstContent.file);
  assert.equal(nextIndustry.file, firstIndustry.file);
  assert.deepEqual(
    fs.readFileSync(path.join(fixture.stateDirectory, firstIndustry.file)),
    industryBytes
  );
  assert.deepEqual(
    shardRecords(fixture, next)
      .map((entry) => entry.loc)
      .sort(),
    [`${SITE}/blog/b`, `${SITE}/faq/a`, `${SITE}/industry`, `${SITE}/industry/article-a`].sort()
  );
  assert.match(readShard(fixture, nextContent.file), /<lastmod>2026-10-28<\/lastmod>/);
});

test('content exceeds industry batch size while industry splits at 5,000 URLs', (t) => {
  const fixture = createFixture(t);
  const content = Array.from({ length: 5001 }, (_, index) => makeUrl(`${SITE}/faq/${index}`));
  const industry = Array.from({ length: 5001 }, (_, index) =>
    makeUrl(`${SITE}/industry/article-${index}`)
  );
  const result = runSplit(fixture, makeUrlset([...content, ...industry]));
  assert.deepEqual(
    result.shards.map(({ bucket, urls }) => [bucket, urls]),
    [
      ['content', 5001],
      ['industry', 5000],
      ['industry', 1]
    ]
  );
  assert.ok(
    result.shards.every(
      (shard) =>
        fs.statSync(path.join(fixture.stateDirectory, shard.file)).size <=
        (shard.bucket === 'industry' ? 10 : 50) * 1024 * 1024
    )
  );

  const tooLarge = makeUrlset([makeUrl(`${SITE}/industry/${'a'.repeat(1200)}`)]);
  assert.throws(
    () => runSplit(createFixture(t), tooLarge, { maxIndustryShardBytes: 1024 }),
    /shard budget/
  );
});

test('rebuilds schema 1 snapshots and removes legacy gzip files', (t) => {
  const fixture = createFixture(t);
  fs.mkdirSync(fixture.stateDirectory, { recursive: true });
  const oldXml = Buffer.from(makeUrlset([makeUrl(`${SITE}/faq/old`)]));
  const digest = crypto.createHash('sha256').update(oldXml).digest('hex');
  const oldFile = `sitemap-core-000-${digest.slice(0, 8)}.xml`;
  fs.writeFileSync(path.join(fixture.stateDirectory, oldFile), oldXml);
  fs.writeFileSync(path.join(fixture.stateDirectory, `${oldFile}.gz`), 'legacy gzip');
  fs.writeFileSync(path.join(fixture.stateDirectory, 'sitemap.xml.gz'), 'legacy gzip index');
  fs.writeFileSync(
    path.join(fixture.stateDirectory, 'manifest.json'),
    JSON.stringify({ schema: 1, site: SITE, shards: [] })
  );
  fs.writeFileSync(path.join(fixture.outputDirectory, 'sitemap.xml.gz'), 'legacy gzip index');

  const result = runSplit(
    fixture,
    makeUrlset([makeUrl(`${SITE}/faq/new`), makeUrl(`${SITE}/industry/article`)]),
    { maxIndustryUrlsPerShard: 2 }
  );
  const manifest = JSON.parse(fs.readFileSync(path.join(fixture.stateDirectory, 'manifest.json')));

  assert.equal(manifest.schema, 2);
  assert.equal(fs.existsSync(path.join(fixture.stateDirectory, oldFile)), false);
  assert.equal(result.entryCount, 2);
  assertNoGzipFiles(fixture);
});

test('preserves schema 1 snapshot when exporting new shards fails', (t) => {
  const fixture = createFixture(t);
  fs.mkdirSync(fixture.stateDirectory, { recursive: true });
  const oldXml = Buffer.from(makeUrlset([makeUrl(`${SITE}/faq/old`)]));
  const digest = crypto.createHash('sha256').update(oldXml).digest('hex');
  const oldFile = `sitemap-core-000-${digest.slice(0, 8)}.xml`;
  fs.writeFileSync(path.join(fixture.stateDirectory, oldFile), oldXml);
  fs.writeFileSync(path.join(fixture.stateDirectory, `${oldFile}.gz`), 'legacy gzip');
  fs.writeFileSync(
    path.join(fixture.stateDirectory, 'manifest.json'),
    JSON.stringify({ schema: 1, site: SITE, shards: [] })
  );
  fs.writeFileSync(path.join(fixture.outputDirectory, 'sitemap-shards'), 'blocked output');

  assert.throws(
    () => runSplit(fixture, makeUrlset([makeUrl(`${SITE}/faq/new`)])),
    /ENOTDIR|not a directory/i
  );
  assert.equal(
    JSON.parse(fs.readFileSync(path.join(fixture.stateDirectory, 'manifest.json'))).schema,
    1
  );
  assert.equal(fs.existsSync(path.join(fixture.stateDirectory, oldFile)), true);
  assert.equal(fs.existsSync(path.join(fixture.stateDirectory, `${oldFile}.gz`)), true);
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
