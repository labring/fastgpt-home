const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const registry = JSON.parse(
  fs.readFileSync(path.join(root, 'src/content/guides/registry.json'), 'utf8')
);
const policy = JSON.parse(
  fs.readFileSync(path.join(root, 'src/content/guides/policy.json'), 'utf8')
);
const locales = policy.locales;
const publicationGroups = new Set(policy.publicationGroups);
const assetStatuses = new Set(policy.assetStatuses);
const schemaTypes = new Set(policy.schemaTypes);
const englishMetaLimits = { title: [50, 60], description: [140, 160] };

function fail(slug, message) {
  throw new Error(`${slug}: ${message}`);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function isGuideIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

function parseArgs(argv = process.argv.slice(2)) {
  if (!argv.length) return {};
  if (argv.length !== 2 || !['--slug', '--locale'].includes(argv[0]) || !argv[1]) {
    throw new Error(
      'Usage: node scripts/verify-guide-content.js [--slug <slug> | --locale <zh|en>]'
    );
  }
  if (argv[0] === '--locale' && !locales.includes(argv[1])) fail(argv[1], 'invalid locale');
  return argv[0] === '--slug' ? { slug: argv[1] } : { locale: argv[1] };
}

function parseDeliverySource(source, expected) {
  const normalized = source.replace(/\r\n?/g, '\n');
  const match = normalized.match(/^(<!--[\s\S]*?-->)([\s\S]*)$/);
  if (!match || !match[2].startsWith('\n\n#'))
    fail(expected.slug, 'invalid leading delivery comment');
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
    sourceSha256: sha256(normalized),
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
    'bodySha256',
    'sourceSha256'
  ]) {
    const required = key === 'slug' ? expected.slug : expected[key];
    if (actual[key] !== required) {
      const field =
        key === 'bodySha256'
          ? 'body differs from registry'
          : key === 'sourceSha256'
          ? 'source differs from registry'
          : `metadata ${key} differs from registry`;
      fail(expected.slug, field);
    }
  }
  if (
    actual.sourceInternalLinkLabels?.join('\u0000') !==
    expected.sourceInternalLinkLabels.join('\u0000')
  ) {
    fail(expected.slug, 'source internal-link labels differ from registry');
  }
  return { body, metadata: actual };
}

function isKnownOwnedTarget(target, entries = registry.entries, rootDir = root) {
  let url;
  try {
    url = new URL(target);
  } catch {
    return false;
  }
  if (!['fastgpt.cn', 'fastgpt.io'].includes(url.hostname) || url.search || url.hash) return false;
  const segments = url.pathname.split('/').filter(Boolean);
  const guideIndex = segments.indexOf('guide');
  if (guideIndex >= 0 && segments.length === guideIndex + 2) {
    return entries.some((entry) => entry.slug === segments[guideIndex + 1]);
  }
  const localPath = `/${segments
    .filter((segment) => !locales.includes(segment))
    .join('/')}`.replace(/\/$/, '');
  if (['', '/', '/faq', '/price', '/compare'].includes(localPath || '/')) return true;
  if (segments.includes('compare')) {
    const slug = segments.at(-1);
    return fs.existsSync(path.join(rootDir, 'content/competitors', `${slug}.md`));
  }
  const entryPath = path.join(rootDir, 'src/components/tech-center/entries.json');
  if (fs.existsSync(entryPath)) {
    const knownTechnicalPaths = JSON.parse(fs.readFileSync(entryPath, 'utf8')).map(
      (entry) => entry.slug
    );
    if (knownTechnicalPaths.includes(url.pathname)) return true;
  }
  return fs.existsSync(path.join(rootDir, 'src/app', ...segments, 'page.tsx'));
}

function verifyGuideRegistry(entries = registry.entries, options = {}) {
  if (!Array.isArray(entries)) throw new Error('registry: expected entries');
  const rootDir = options.rootDir || root;
  const slugs = new Set();
  for (const entry of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug || '')) fail('registry', 'invalid slug');
    if (slugs.has(entry.slug)) fail(entry.slug, 'duplicate slug');
    slugs.add(entry.slug);
    if (Object.keys(entry).sort().join(',') !== 'en,group,slug,zh') {
      fail(entry.slug, 'exact zh/en locale pair and group required');
    }
    if (!publicationGroups.has(entry.group)) fail(entry.slug, 'invalid publication group');
    for (const locale of locales) {
      const snapshot = entry[locale];
      if (
        !snapshot ||
        snapshot.sourceName !== `${entry.slug}.${locale}.md` ||
        snapshot.sourceName !== path.basename(snapshot.sourceName) ||
        /[\\/]|\.\./.test(snapshot.sourceName)
      ) {
        fail(entry.slug, `${locale}: sourceName must be ${entry.slug}.${locale}.md`);
      }
      if (
        !Array.isArray(snapshot.schemaTokens) ||
        snapshot.schemaTokens.length < 2 ||
        snapshot.schemaTokens.some((token) => !schemaTypes.has(token))
      ) {
        fail(entry.slug, `${locale}: invalid schema token`);
      }
      if (
        !Array.isArray(snapshot.sourceInternalLinkLabels) ||
        !Array.isArray(snapshot.configuredInternalLinks)
      ) {
        fail(entry.slug, `${locale}: invalid link directives`);
      }
      if (!isGuideIsoDate(snapshot.datePublished)) {
        fail(entry.slug, `${locale}: invalid datePublished`);
      }
      if (
        !isGuideIsoDate(snapshot.dateModified) ||
        snapshot.dateModified < snapshot.datePublished
      ) {
        fail(entry.slug, `${locale}: invalid dateModified`);
      }
      if (locale === 'en') {
        const [titleMin, titleMax] = englishMetaLimits.title;
        if (
          typeof snapshot.metaTitle !== 'string' ||
          snapshot.metaTitle.length < titleMin ||
          snapshot.metaTitle.length > titleMax
        ) {
          fail(entry.slug, 'en: invalid meta title');
        }
        const [descriptionMin, descriptionMax] = englishMetaLimits.description;
        if (
          typeof snapshot.metaDescription !== 'string' ||
          snapshot.metaDescription.length < descriptionMin ||
          snapshot.metaDescription.length > descriptionMax ||
          !/[.!?]$/.test(snapshot.metaDescription)
        ) {
          fail(entry.slug, 'en: invalid meta description');
        }
      }
      if (!assetStatuses.has(snapshot.assetPolicy?.status)) {
        fail(entry.slug, `${locale}: asset policy differs from source contract`);
      }
      if (snapshot.assetPolicy?.status === 'required') {
        const asset = snapshot.assetPolicy;
        if (
          typeof asset.path !== 'string' ||
          !asset.path.startsWith('/') ||
          asset.path.includes('..') ||
          !asset.alt?.trim() ||
          !Number.isInteger(asset.width) ||
          !Number.isInteger(asset.height) ||
          asset.width <= 0 ||
          asset.height <= 0 ||
          !fs.existsSync(path.join(rootDir, 'public', asset.path))
        ) {
          fail(
            entry.slug,
            `${locale}: required asset is missing, invalid, or lacks positive dimensions`
          );
        }
      }
      for (const mapping of snapshot.configuredInternalLinks) {
        if (!snapshot.sourceInternalLinkLabels.includes(mapping.label)) {
          fail(entry.slug, `${locale}:${mapping.label}: missing source label`);
        }
        if (!isKnownOwnedTarget(mapping.target, entries, rootDir)) {
          fail(entry.slug, `${locale}:${mapping.label}: invalid owned target`);
        }
      }
    }
  }
  if (slugs.size !== policy.entryCount) {
    throw new Error(`registry: expected ${policy.entryCount} entries`);
  }
  return entries;
}

function verifyGuideContent(options = {}, context = {}) {
  const rootDir = context.rootDir || root;
  const entries = verifyGuideRegistry(context.entries || registry.entries, { rootDir });
  const selected = options.slug ? entries.filter((entry) => entry.slug === options.slug) : entries;
  if (options.slug && selected.length !== 1) fail(options.slug, 'unknown slug');
  for (const entry of selected) {
    for (const locale of options.locale ? [options.locale] : locales) {
      const snapshot = entry[locale];
      const sourcePath = path.resolve(rootDir, 'src/content/guides', locale, snapshot.sourceName);
      const localeRoot = path.resolve(rootDir, 'src/content/guides', locale);
      if (!sourcePath.startsWith(`${localeRoot}${path.sep}`))
        fail(entry.slug, `${locale}: source escapes locale root`);
      if (!fs.existsSync(sourcePath)) fail(entry.slug, `${locale}: source file is not imported`);
      parseDeliverySource(fs.readFileSync(sourcePath, 'utf8'), { ...snapshot, slug: entry.slug });
    }
  }
  return selected;
}

function main() {
  const options = parseArgs();
  const selected = verifyGuideContent(options);
  const documents = selected.length * (options.locale ? 1 : locales.length);
  console.log(
    `Guide content verified: ${selected.length} slug${
      selected.length === 1 ? '' : 's'
    }, ${documents} document${documents === 1 ? '' : 's'}`
  );
}

if (require.main === module) main();

module.exports = { parseArgs, parseDeliverySource, verifyGuideRegistry, verifyGuideContent, main };
