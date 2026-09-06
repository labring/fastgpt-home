const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const G1_GUIDE_SLUGS = Object.freeze(['migrate-saas-to-selfhost', 'embed-ai-into-product']);
const G2_GUIDE_SLUGS = Object.freeze(['soe-policy-qa-deployment']);
const GUIDE_LOCALES = Object.freeze(['zh', 'en']);
const PUBLIC_HOSTS = Object.freeze({ zh: 'https://fastgpt.cn', en: 'https://fastgpt.io' });
const PUBLIC_SURFACES = Object.freeze([
  'registry',
  'owner-pages',
  'guide-hub',
  'sitemap',
  'structured-data',
  'internal-links',
  'release-record',
  'rollback'
]);
const G1_SOURCE_IMAGE_DIRECTIVE =
  'Text and accessible tables; no image is required for this release.';
const BASELINE_SLUGS = Object.freeze([
  'saas-platform-enterprise-gaps',
  'self-build-three-year-tco',
  'server-sizing-guide',
  'complex-doc-golden-set',
  'poc-30-day-design',
  'database-qa-integration-guide',
  'scheduled-report-automation',
  'support-bot-four-steps',
  'manufacturing-itops-invoice-audit',
  'pharma-compliance-docs',
  'education-retail-support-insight',
  'finance-research-retrieval',
  'finance-daily-report-automation'
]);

const CLAIMS = Object.freeze({
  'migrate-saas-to-selfhost': {
    zh: [/迁移/, /备份/, /回滚/, /自建/],
    en: [/migration/i, /backup/i, /rollback/i, /self-host/i]
  },
  'embed-ai-into-product': {
    zh: [/iframe/i, /API/i, /SDK/i, /鉴权|认证/, /安全/, /MCP/i],
    en: [/iframe/i, /API/i, /SDK/i, /authentication/i, /security/i, /MCP/i]
  }
});

function fail(message) {
  throw new Error(`[verify-guide-release] ${message}`);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function readJson(rootDir, relativePath) {
  const filePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(filePath)) fail(`missing ${relativePath}`);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`invalid JSON in ${relativePath}: ${error.message}`);
  }
}

function normalizeSource(source) {
  return source.replace(/\r\n?/g, '\n');
}

function parseDeliverySource(source, expected, slug, locale) {
  const normalized = normalizeSource(source);
  const match = normalized.match(/^(<!--[\s\S]*?-->)([\s\S]*)$/);
  if (!match || !match[2].startsWith('\n\n#'))
    fail(`${slug}:${locale}: invalid delivery comment boundary`);
  const fields = {};
  for (const line of match[1].slice(4, -3).split('\n')) {
    const separator = line.indexOf(':');
    if (separator > 0) fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  const body = match[2];
  const values = {
    slug: fields.slug,
    locale: fields.locale,
    canonical: fields.canonical,
    hreflang: fields.hreflang,
    metaTitle: fields['Meta title'],
    metaDescription: fields['Meta description'],
    keywords: fields.keywords,
    sourceSchema: fields['结构化数据'],
    sourceImageDirective: fields['配图需求'],
    sourceInternalLinkLabels: fields['内链']?.split(' / '),
    h1: body.match(/^\n\n# (.+)$/m)?.[1],
    sourceSha256: sha256(normalized),
    bodySha256: sha256(body)
  };
  for (const field of [
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
    const required = field === 'slug' ? slug : expected[field];
    if (values[field] !== required) fail(`${slug}:${locale}: ${field} differs from registry`);
  }
  if (values.locale !== locale) fail(`${slug}:${locale}: locale differs from registry`);
  if (
    values.sourceInternalLinkLabels?.join('\u0000') !==
    expected.sourceInternalLinkLabels.join('\u0000')
  ) {
    fail(`${slug}:${locale}: source internal-link labels differ from registry`);
  }
  return { body, metadata: values };
}

function identityProjection(entry) {
  return {
    slug: entry.slug,
    group: entry.group,
    locales: [...GUIDE_LOCALES],
    ownerPages: { cn: entry.zh.canonical, io: entry.en.canonical },
    localesData: Object.fromEntries(
      GUIDE_LOCALES.map((locale) => {
        const snapshot = entry[locale];
        return [
          locale,
          {
            sourceName: snapshot.sourceName,
            sourceSha256: snapshot.sourceSha256,
            bodySha256: snapshot.bodySha256,
            canonical: snapshot.canonical,
            hreflang: snapshot.hreflang,
            dateModified: snapshot.dateModified,
            schemaTokens: snapshot.schemaTokens,
            sourceImageDirective: snapshot.sourceImageDirective,
            assetStatus: snapshot.assetPolicy.status,
            configuredInternalLinks: snapshot.configuredInternalLinks
          }
        ];
      })
    )
  };
}

function identityDigest(entries, slugs) {
  return sha256(JSON.stringify(slugs.map((slug) => identityProjection(findEntry(entries, slug)))));
}

function findEntry(entries, slug) {
  const entry = entries.find((candidate) => candidate.slug === slug);
  if (!entry) fail(`registry is missing ${slug}`);
  return entry;
}

function assertExact(actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} differs`);
}

function verifyReferences(body, slug, locale) {
  const referenceBlock = body.match(/^## References\n([\s\S]*)$/m)?.[1] || '';
  const lines = referenceBlock
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 3) fail(`${slug}:${locale}: at least three public references are required`);
  for (const line of lines) {
    const match = line.match(/^- \[([^\]]{3,})\]\((https:\/\/[^)]+)\)$/);
    if (!match) fail(`${slug}:${locale}: reference must be a descriptive HTTPS citation`);
    const url = new URL(match[2]);
    if (url.username || url.password || url.search || url.hash) {
      fail(`${slug}:${locale}: reference URL contains credentials, query, or fragment`);
    }
  }
  return lines.length;
}

function verifyReaderHygiene(body, slug, locale) {
  const editorial =
    /(?:internal\s+KB|client\s+KB|GSC\s+provenance|demand\s+basis|fact\s+sources?|source\s+of\s+facts|case\s+clearance|publish\s+target|verification\s+workflow|review\s+cycle|verification\s+date|verified\s+on|delivery\s+schedule|sign[- ]off|revision\s+log|review\s+status|version(?:s)?\s+and\s+(?:plans|tiers)|version\s+and\s+package|version[- ]plan|update[- ](?:record|log)|addendum)\s*[:：]/i;
  const chineseEditorial =
    /(?:内部\s*KB|客户\s*KB|需求依据|需求锚点|GSC\s*来源|案例授权|案例清理|发布落点|核验流程|验证流程|复核周期|核验日期?|验证日期|排期|签发|修订记录|更新记录|版本与(?:套餐|档位)|计划(?:安排)?|审核(?:状态)?|交付(?:排期)?)\s*[:：]/u;
  if (editorial.test(body) || chineseEditorial.test(body)) {
    fail(`${slug}:${locale}: reader body exposes editorial workflow metadata`);
  }
}

function verifyClaims(body, slug, locale) {
  for (const claim of CLAIMS[slug][locale]) {
    if (!claim.test(body)) fail(`${slug}:${locale}: required content claim is missing (${claim})`);
  }
}

function verifyConfiguredLinks(entries, entry, locale) {
  const snapshot = entry[locale];
  if (snapshot.configuredInternalLinks.length !== snapshot.sourceInternalLinkLabels.length) {
    fail(`${entry.slug}:${locale}: configured links and source labels must have the same count`);
  }
  for (const link of snapshot.configuredInternalLinks) {
    if (!snapshot.sourceInternalLinkLabels.includes(link.label)) {
      fail(`${entry.slug}:${locale}: configured link label is absent from source metadata`);
    }
    const url = new URL(link.target);
    const expectedHost = new URL(PUBLIC_HOSTS[locale]).hostname;
    if (
      url.hostname !== expectedHost ||
      url.pathname !== `/guide/${url.pathname.split('/').at(-1)}`
    ) {
      fail(`${entry.slug}:${locale}: configured link is outside the owner Guide surface`);
    }
    const targetSlug = url.pathname.split('/').at(-1);
    findEntry(entries, targetSlug);
  }
}

function verifySource(rootDir, entries, entry, locale) {
  const snapshot = entry[locale];
  const sourcePath = path.join(rootDir, 'src/content/guides', locale, snapshot.sourceName);
  if (!fs.existsSync(sourcePath)) fail(`${entry.slug}:${locale}: source file is missing`);
  const document = parseDeliverySource(
    fs.readFileSync(sourcePath, 'utf8'),
    snapshot,
    entry.slug,
    locale
  );
  const expectedCanonical = `${PUBLIC_HOSTS[locale]}/guide/${entry.slug}`;
  if (snapshot.canonical !== expectedCanonical)
    fail(`${entry.slug}:${locale}: canonical owner drift`);
  const expectedHreflang =
    locale === 'zh'
      ? `zh-CN | zh-CN → https://fastgpt.cn/guide/${entry.slug} | en → https://fastgpt.io/guide/${entry.slug} | x-default → https://fastgpt.io/guide/${entry.slug}`
      : `en | zh-CN → https://fastgpt.cn/guide/${entry.slug} | en → https://fastgpt.io/guide/${entry.slug} | x-default → https://fastgpt.io/guide/${entry.slug}`;
  if (snapshot.hreflang !== expectedHreflang) fail(`${entry.slug}:${locale}: hreflang drift`);
  if (snapshot.assetPolicy.status !== 'source-exception')
    fail(`${entry.slug}:${locale}: asset policy drift`);
  if (snapshot.sourceImageDirective !== G1_SOURCE_IMAGE_DIRECTIVE) {
    fail(`${entry.slug}:${locale}: image policy directive drift`);
  }
  verifyReferences(document.body, entry.slug, locale);
  verifyReaderHygiene(document.body, entry.slug, locale);
  verifyClaims(document.body, entry.slug, locale);
  verifyConfiguredLinks(entries, entry, locale);
  return document;
}

function verifyManifest(rootDir, manifest, registry) {
  if (manifest.schemaVersion !== 1 || manifest.issue !== 255 || manifest.batch !== 'week06') {
    fail('G1 manifest header differs');
  }
  if (manifest.wave !== 'g1' || manifest.group !== 'G1' || manifest.status !== 'source-verified') {
    fail('G1 manifest release state differs');
  }
  assertExact(manifest.publicSurfaces, PUBLIC_SURFACES, 'G1 manifest public surfaces');
  if (
    manifest.writeStrategy !== 'atomic-with-rollback' ||
    manifest.postWriteVerification !== 'required'
  ) {
    fail('G1 manifest write policy differs');
  }
  if (registry.entries.length !== manifest.result?.registryEntryCount) {
    fail('Guide registry count differs from G1 release result');
  }
  if (
    registry.entries.length !==
    manifest.baseline?.registryEntryCount + G1_GUIDE_SLUGS.length + G2_GUIDE_SLUGS.length
  ) {
    fail('Guide registry delta does not isolate the two G1 identities and one G2 identity');
  }
  assertExact(manifest.baseline.slugs, BASELINE_SLUGS, 'G1 baseline identity set');
  if (manifest.baseline.publishedEntryCount !== BASELINE_SLUGS.length)
    fail('G1 baseline count differs');
  if (identityDigest(registry.entries, BASELINE_SLUGS) !== manifest.baseline.identitySetSha256) {
    fail('G1 baseline identity digest differs');
  }
  const targetEntries = G1_GUIDE_SLUGS.map((slug) => findEntry(registry.entries, slug));
  assertExact(
    manifest.identitySet.map((identity) => identity.slug),
    G1_GUIDE_SLUGS,
    'G1 identity order'
  );
  assertExact(
    manifest.identitySet,
    targetEntries.map(identityProjection),
    'G1 identity projection'
  );
  if (manifest.sourceSetSha256 !== identityDigest(registry.entries, G1_GUIDE_SLUGS)) {
    fail('G1 source-set digest differs');
  }
  if (manifest.result.g1IdentityCount !== G1_GUIDE_SLUGS.length) fail('G1 identity count differs');
  if (manifest.result.publishedEntryCount !== registry.entries.length - G2_GUIDE_SLUGS.length) {
    fail('G1 published projection count differs');
  }
  if (manifest.result.sourceDocumentCount !== G1_GUIDE_SLUGS.length * GUIDE_LOCALES.length) {
    fail('G1 source document count differs');
  }
  assertExact(manifest.result.ownerPages, { cn: 2, io: 2 }, 'G1 owner-page count');
  for (const slug of G1_GUIDE_SLUGS) {
    for (const locale of GUIDE_LOCALES)
      verifySource(rootDir, registry.entries, findEntry(registry.entries, slug), locale);
  }
  return {
    status: manifest.status,
    g1Slugs: [...G1_GUIDE_SLUGS],
    g2ExcludedSlugs: [...G2_GUIDE_SLUGS],
    registryEntryCount: registry.entries.length,
    baselinePublishedEntryCount: BASELINE_SLUGS.length,
    publishedEntryCount: registry.entries.length - G2_GUIDE_SLUGS.length,
    g1IdentityCount: G1_GUIDE_SLUGS.length,
    ownerPages: { cn: 2, io: 2 },
    sourceDocumentCount: G1_GUIDE_SLUGS.length * GUIDE_LOCALES.length,
    sourceSetSha256: manifest.sourceSetSha256
  };
}

function verifyRollback(manifest, rollback) {
  if (rollback.schemaVersion !== 1 || rollback.batch !== 'week06' || rollback.wave !== 'g1') {
    fail('G1 rollback header differs');
  }
  if (
    rollback.status !== 'ready' ||
    rollback.rollbackAction !==
      'Restore the prior complete Guide projection before serving a replacement export.'
  ) {
    fail('G1 rollback state differs');
  }
  assertExact(rollback.publicSurfaces, manifest.publicSurfaces, 'G1 rollback public surfaces');
  assertExact(rollback.waveIdentitySet, G1_GUIDE_SLUGS, 'G1 rollback identity set');
  assertExact(rollback.removeSlugs, G1_GUIDE_SLUGS, 'G1 rollback remove set');
  assertExact(rollback.keepG2Slugs, G2_GUIDE_SLUGS, 'G1 rollback G2 isolation');
  if (
    rollback.baselinePublishedEntryCount !== manifest.baseline.publishedEntryCount ||
    rollback.resultingPublishedEntryCount !== manifest.result.publishedEntryCount ||
    rollback.priorCompleteState?.identitySetSha256 !== manifest.baseline.identitySetSha256
  ) {
    fail('G1 rollback baseline differs from release manifest');
  }
  return true;
}

function verifyGuideG1Release({ rootDir = process.cwd() } = {}) {
  const safeRoot = path.resolve(rootDir);
  const registry = readJson(safeRoot, 'src/content/guides/registry.json');
  const policy = readJson(safeRoot, 'src/content/guides/policy.json');
  const manifest = readJson(safeRoot, 'src/content/guides/g1-release-manifest.json');
  const rollback = readJson(safeRoot, 'src/content/guides/g1-rollback.json');
  if (policy.entryCount !== registry.entries?.length)
    fail('Guide policy entryCount differs from registry');
  if (!Array.isArray(registry.entries)) fail('Guide registry entries are missing');
  const result = verifyManifest(safeRoot, manifest, registry);
  verifyRollback(manifest, rollback);
  return result;
}

module.exports = {
  BASELINE_SLUGS,
  G1_GUIDE_SLUGS,
  G2_GUIDE_SLUGS,
  GUIDE_LOCALES,
  PUBLIC_SURFACES,
  identityProjection,
  identityDigest,
  parseDeliverySource,
  verifyGuideG1Release
};
