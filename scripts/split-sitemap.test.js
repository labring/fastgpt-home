const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { buildSitemapShards, splitSitemapFile } = require('./split-sitemap');

const makeUrlset = (locs) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs.join(
    '\n'
  )}\n</urlset>`;

test('splits URL blocks, preserves lastmod, and emits an absolute sitemap index', () => {
  const urls = [
    '<url><loc>https://fastgpt.cn/</loc><lastmod>2026-10-28</lastmod></url>',
    '<url><loc>https://fastgpt.cn/blog</loc></url>',
    '<url><loc>https://fastgpt.cn/faq/example</loc></url>'
  ];
  const result = buildSitemapShards(makeUrlset(urls), 2);

  assert.equal(result.entryCount, 3);
  assert.equal(result.shards.length, 2);
  assert.match(result.index, /<sitemapindex xmlns=/);
  assert.match(result.index, /https:\/\/fastgpt\.cn\/sitemap-1\.xml/);
  assert.deepEqual(
    result.shards.flatMap((shard) => [...shard.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])),
    ['https://fastgpt.cn/', 'https://fastgpt.cn/blog', 'https://fastgpt.cn/faq/example']
  );
  assert.match(result.shards[0], /<lastmod>2026-10-28<\/lastmod>/);
  assert.doesNotMatch(result.shards[1], /<lastmod>/);
  assert.ok(result.shards.every((shard) => Buffer.byteLength(shard) <= 50 * 1024 * 1024));
});

test('rejects duplicate and cross-origin URLs', () => {
  const duplicate = makeUrlset([
    '<url><loc>https://fastgpt.cn/</loc></url>',
    '<url><loc>https://fastgpt.cn/</loc></url>'
  ]);
  const foreign = makeUrlset([
    '<url><loc>https://fastgpt.cn/</loc></url>',
    '<url><loc>https://fastgpt.io/</loc></url>'
  ]);

  assert.throws(() => buildSitemapShards(duplicate), /Duplicate sitemap loc/);
  assert.throws(() => buildSitemapShards(foreign), /another origin/);
});

test('writes the index and removes stale shard files', () => {
  const outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'sitemap-shards-'));
  try {
    fs.writeFileSync(
      path.join(outputDirectory, 'sitemap.xml'),
      makeUrlset(['<url><loc>https://fastgpt.cn/</loc></url>'])
    );
    fs.writeFileSync(path.join(outputDirectory, 'sitemap-1.xml'), 'stale');

    splitSitemapFile(outputDirectory);

    assert.match(
      fs.readFileSync(path.join(outputDirectory, 'sitemap.xml'), 'utf8'),
      /<sitemapindex/
    );
    assert.match(fs.readFileSync(path.join(outputDirectory, 'sitemap-0.xml'), 'utf8'), /<urlset/);
    assert.equal(fs.existsSync(path.join(outputDirectory, 'sitemap-1.xml')), false);
  } finally {
    fs.rmSync(outputDirectory, { recursive: true, force: true });
  }
});
