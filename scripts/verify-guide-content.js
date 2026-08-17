const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const registry = JSON.parse(
  fs.readFileSync(path.join(root, 'src/content/guides/registry.json'), 'utf8')
);
const locales = ['zh', 'en'];
const schemaTypes = new Set(['Article', 'BreadcrumbList', 'HowTo']);

function fail(slug, message) {
  throw new Error(`${slug}: ${message}`);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function parseArgs(argv = process.argv.slice(2)) {
  if (!argv.length) return {};
  if (argv.length !== 2 || !['--slug', '--locale'].includes(argv[0]) || !argv[1]) {
    throw new Error('Usage: node scripts/verify-guide-content.js [--slug <slug> | --locale <zh|en>]');
  }
  if (argv[0] === '--locale' && !locales.includes(argv[1])) fail(argv[1], 'invalid locale');
  return argv[0] === '--slug' ? { slug: argv[1] } : { locale: argv[1] };
}

function parseDeliverySource(source, expected) {
  const normalized = source.replace(/\r\n?/g, '\n');
  const match = normalized.match(/^(<!--[\s\S]*?-->)([\s\S]*)$/);
  if (!match || !match[2].startsWith('\n\n#')) fail(expected.slug, 'invalid leading delivery comment');
  const metadata = {};
  for (const line of match[1].slice(4, -3).split('\n')) {
    const separator = line.indexOf(':');
    if (separator > 0) metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  const body = match[2];
  const actual = {
    slug: metadata.slug,
    canonical: metadata.canonical,
    hreflang: metadata.hreflang,
    metaTitle: metadata['Meta title'],
    metaDescription: metadata['Meta description'],
    keywords: metadata.keywords,
    sourceSchema: metadata['结构化数据'],
    sourceImageDirective: metadata['配图需求'],
    sourceInternalLinkLabels: metadata['内链']?.split(' / '),
    h1: body.match(/^\n\n# (.+)$/m)?.[1],
    sourceSha256: sha256(source),
    bodySha256: sha256(body)
  };
  for (const key of [
    'slug',
    'canonical',
    'hreflang',
    'metaTitle',
    'metaDescription',
    'keywords',
    'sourceSchema',
    'sourceImageDirective',
    'h1',
    'sourceSha256',
    'bodySha256'
  ]) {
    const required = key === 'slug' ? expected.slug : expected[key];
    if (actual[key] !== required) fail(expected.slug, `${key} differs from registry`);
  }
  if (actual.sourceInternalLinkLabels?.join('\u0000') !== expected.sourceInternalLinkLabels.join('\u0000')) {
    fail(expected.slug, 'source internal-link labels differ from registry');
  }
  return { body, metadata: actual };
}

function verifyGuideRegistry(entries = registry.entries) {
  if (!Array.isArray(entries) || entries.length !== 8) throw new Error('registry: expected eight entries');
  const slugs = new Set();
  for (const entry of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug || '')) fail('registry', 'invalid slug');
    if (slugs.has(entry.slug)) fail(entry.slug, 'duplicate slug');
    slugs.add(entry.slug);
    if (Object.keys(entry).sort().join(',') !== 'en,slug,zh') fail(entry.slug, 'exact zh/en locale pair required');
    for (const locale of locales) {
      const snapshot = entry[locale];
      if (!snapshot || snapshot.sourceName !== path.basename(snapshot.sourceName) || /[\\/]|\.\./.test(snapshot.sourceName)) {
        fail(entry.slug, `${locale}: unsafe source filename`);
      }
      if (!Array.isArray(snapshot.schemaTokens) || snapshot.schemaTokens.some((token) => !schemaTypes.has(token))) {
        fail(entry.slug, `${locale}: invalid schema token`);
      }
      if (!snapshot.schemaTokens.includes('Article') || !snapshot.schemaTokens.includes('BreadcrumbList')) {
        fail(entry.slug, `${locale}: required schema tokens missing`);
      }
      if (!Array.isArray(snapshot.sourceInternalLinkLabels) || !Array.isArray(snapshot.configuredInternalLinks)) {
        fail(entry.slug, `${locale}: invalid link directives`);
      }
    }
  }
  return entries;
}

function verifyGuideContent(options = {}) {
  const entries = verifyGuideRegistry();
  const selected = options.slug ? entries.filter((entry) => entry.slug === options.slug) : entries;
  if (options.slug && selected.length !== 1) fail(options.slug, 'unknown slug');
  for (const entry of selected) {
    for (const locale of options.locale ? [options.locale] : locales) {
      const snapshot = entry[locale];
      const sourcePath = path.resolve(root, 'src/content/guides', locale, snapshot.sourceName);
      const localeRoot = path.resolve(root, 'src/content/guides', locale);
      if (!sourcePath.startsWith(`${localeRoot}${path.sep}`)) fail(entry.slug, `${locale}: source escapes locale root`);
      if (!fs.existsSync(sourcePath)) fail(entry.slug, `${locale}: source file is not imported`);
      parseDeliverySource(fs.readFileSync(sourcePath, 'utf8'), { ...snapshot, slug: entry.slug });
    }
  }
  return selected;
}

function main() {
  const selected = verifyGuideContent(parseArgs());
  console.log(`Guide content verified: ${selected.length} slug${selected.length === 1 ? '' : 's'}`);
}

if (require.main === module) main();

module.exports = { parseArgs, parseDeliverySource, verifyGuideRegistry, verifyGuideContent, main };
