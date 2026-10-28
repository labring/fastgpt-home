const fs = require('node:fs');
const path = require('node:path');

const SITEMAP_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>';
const URL_LIMIT = 5000;
const BYTE_LIMIT = 50 * 1024 * 1024;

function buildUrlset(urlBlocks) {
  return [
    XML_DECLARATION,
    `<urlset xmlns="${SITEMAP_NAMESPACE}">`,
    ...urlBlocks,
    '</urlset>',
    ''
  ].join('\n');
}

function buildSitemapShards(xml, limit = URL_LIMIT) {
  if (!Number.isInteger(limit) || limit < 1 || limit > 50000) {
    throw new Error('Sitemap shard limit must be an integer between 1 and 50000');
  }
  if (!/<urlset\b[^>]*>/.test(xml) || !/<\/urlset>/.test(xml) || /<sitemapindex\b/.test(xml)) {
    throw new Error('Expected a complete sitemap urlset');
  }

  // Next emits one url block per entry; retain each block so lastmod stays source-derived.
  const urlBlocks = xml.match(/<url\b[^>]*>[\s\S]*?<\/url>/g) || [];
  if (!urlBlocks.length || urlBlocks.length !== (xml.match(/<url\b/g) || []).length) {
    throw new Error('Sitemap contains no URLs or has an incomplete url block');
  }

  let siteOrigin;
  const seen = new Set();
  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([\s\S]*?)<\/loc>/)?.[1]?.trim();
    if (!loc) throw new Error('Sitemap URL is missing a loc');

    let url;
    try {
      url = new URL(loc.replace(/&amp;/g, '&'));
    } catch {
      throw new Error(`Invalid sitemap loc: ${loc}`);
    }
    if (url.protocol !== 'https:') throw new Error(`Sitemap loc must use HTTPS: ${loc}`);
    if (!siteOrigin) siteOrigin = url.origin;
    if (url.origin !== siteOrigin) throw new Error(`Sitemap loc uses another origin: ${loc}`);
    if (seen.has(url.href)) throw new Error(`Duplicate sitemap loc: ${loc}`);
    seen.add(url.href);
  }

  const emptyShardBytes = Buffer.byteLength(buildUrlset([]));
  const shards = [];
  let current = [];
  let currentBytes = emptyShardBytes;

  for (const block of urlBlocks) {
    const blockBytes = Buffer.byteLength(block);
    const nextBytes = currentBytes + (current.length ? 1 : 0) + blockBytes;
    if (current.length && (current.length >= limit || nextBytes > BYTE_LIMIT)) {
      shards.push(buildUrlset(current));
      current = [];
      currentBytes = emptyShardBytes;
    }

    const shardBytes = currentBytes + (current.length ? 1 : 0) + blockBytes;
    if (shardBytes > BYTE_LIMIT)
      throw new Error(`A single sitemap URL exceeds ${BYTE_LIMIT} bytes`);
    current.push(block);
    currentBytes = shardBytes;
  }
  if (current.length) shards.push(buildUrlset(current));

  const index = [
    XML_DECLARATION,
    `<sitemapindex xmlns="${SITEMAP_NAMESPACE}">`,
    ...shards.map(
      (_, i) => `  <sitemap>\n    <loc>${siteOrigin}/sitemap-${i}.xml</loc>\n  </sitemap>`
    ),
    '</sitemapindex>',
    ''
  ].join('\n');

  return { entryCount: urlBlocks.length, index, shards };
}

function splitSitemapFile(outputDirectory) {
  const sitemapPath = path.join(outputDirectory, 'sitemap.xml');
  const result = buildSitemapShards(fs.readFileSync(sitemapPath, 'utf8'));
  const currentFiles = new Set(result.shards.map((_, i) => `sitemap-${i}.xml`));

  result.shards.forEach((shard, i) => {
    fs.writeFileSync(path.join(outputDirectory, `sitemap-${i}.xml`), shard, 'utf8');
  });
  for (const file of fs.readdirSync(outputDirectory)) {
    if (/^sitemap-\d+\.xml$/.test(file) && !currentFiles.has(file)) {
      fs.unlinkSync(path.join(outputDirectory, file));
    }
  }
  fs.writeFileSync(sitemapPath, result.index, 'utf8');
  console.log(`[split-sitemap] ${result.entryCount} URLs -> ${result.shards.length} shards`);
}

if (require.main === module) {
  try {
    splitSitemapFile(path.join(process.cwd(), 'out'));
  } catch (error) {
    console.error(`[split-sitemap] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { buildSitemapShards, splitSitemapFile };
