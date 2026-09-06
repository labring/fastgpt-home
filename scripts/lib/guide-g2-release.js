const fs = require('node:fs');
const path = require('node:path');

const {
  G1_GUIDE_SLUGS,
  G2_GUIDE_SLUGS,
  GUIDE_LOCALES,
  PUBLIC_SURFACES,
  identityDigest,
  identityProjection,
  parseDeliverySource
} = require('./guide-release');

const G2_GUIDE_SLUG = G2_GUIDE_SLUGS[0];
const PUBLIC_HOSTS = Object.freeze({ zh: 'https://fastgpt.cn', en: 'https://fastgpt.io' });
const SOURCE_IMAGE_DIRECTIVE = 'Text and accessible tables; no image is required for this release.';
const REQUIRED_PRODUCT_TERMS = Object.freeze({
  zh: [/公有云部署/, /混合部署/, /私有化部署/, /数据流/, /审计/, /运维/],
  en: [
    /SaaS-Hosted Deployment/,
    /Hybrid Deployment/,
    /On-Premises \(Self-Hosted\) Deployment/,
    /Data Flow Link/,
    /audit/i,
    /Operations Department/
  ]
});
const REQUIRED_COMPLIANCE_TERMS = Object.freeze({
  zh: [/合规/, /数据流转|出站策略/, /审查/, /私有化/],
  en: [/compliance/i, /data egress/i, /review/i, /On-Premises|private deployment/i]
});
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
  'finance-daily-report-automation',
  'migrate-saas-to-selfhost',
  'embed-ai-into-product'
]);

function fail(message) {
  throw new Error(`[verify-guide-g2-release] ${message}`);
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

function assertExact(actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} differs`);
}

function findEntry(entries, slug) {
  const entry = entries.find((candidate) => candidate.slug === slug);
  if (!entry) fail(`registry is missing ${slug}`);
  return entry;
}

function isIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

function verifyReferences(body, slug, locale) {
  const lines = (body.match(/^## References\n([\s\S]*)$/m)?.[1] || '')
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
}

function verifyReaderBody(body, slug, locale) {
  const internalWorkflowMetadata =
    /(?:internal\s+KB|client\s+KB|release\s+gate|owner\s+approval|product\s+sign[- ]off|legal(?:\/|\s+and\s+)compliance\s+(?:approval|sign[- ]off)|evidence\s+(?:digest|expiry)|发布批次|内部\s*KB|客户\s*KB|签发记录|审批记录|审批证据)\s*[:：]/iu;
  if (internalWorkflowMetadata.test(body)) {
    fail(`${slug}:${locale}: reader body exposes internal workflow metadata`);
  }
}

function verifyClaims(body, slug, locale) {
  for (const claim of [
    ...REQUIRED_PRODUCT_TERMS[locale],
    ...REQUIRED_COMPLIANCE_TERMS[locale]
  ]) {
    if (!claim.test(body))
      fail(`${slug}:${locale}: required product or compliance term is missing (${claim})`);
  }
}

function verifySource(rootDir, entry, locale) {
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
  if (snapshot.canonical !== expectedCanonical) fail(`${entry.slug}:${locale}: canonical drift`);
  const expectedHreflang =
    locale === 'zh'
      ? `zh-CN | zh-CN → https://fastgpt.cn/guide/${entry.slug} | en → https://fastgpt.io/guide/${entry.slug} | x-default → https://fastgpt.io/guide/${entry.slug}`
      : `en | zh-CN → https://fastgpt.cn/guide/${entry.slug} | en → https://fastgpt.io/guide/${entry.slug} | x-default → https://fastgpt.io/guide/${entry.slug}`;
  if (snapshot.hreflang !== expectedHreflang) fail(`${entry.slug}:${locale}: hreflang drift`);
  if (snapshot.sourceSchema !== 'Article + BreadcrumbList') {
    fail(`${entry.slug}:${locale}: schema contract drift`);
  }
  if (snapshot.sourceImageDirective !== SOURCE_IMAGE_DIRECTIVE) {
    fail(`${entry.slug}:${locale}: image policy drift`);
  }
  if (snapshot.assetPolicy.status !== 'source-exception') {
    fail(`${entry.slug}:${locale}: asset policy drift`);
  }
  if (!isIsoDate(snapshot.datePublished) || !isIsoDate(snapshot.dateModified)) {
    fail(`${entry.slug}:${locale}: invalid publication date`);
  }
  if (snapshot.dateModified < snapshot.datePublished) {
    fail(`${entry.slug}:${locale}: dateModified precedes datePublished`);
  }
  verifyReferences(document.body, entry.slug, locale);
  verifyReaderBody(document.body, entry.slug, locale);
  verifyClaims(document.body, entry.slug, locale);
}

function verifyManifest(rootDir, manifest, registry) {
  if (
    manifest.schemaVersion !== 1 ||
    manifest.issue !== 256 ||
    manifest.batch !== 'week06' ||
    manifest.wave !== 'g2' ||
    manifest.group !== 'G2' ||
    manifest.status !== 'source-verified'
  ) {
    fail('G2 manifest header differs');
  }
  assertExact(manifest.publicSurfaces, PUBLIC_SURFACES, 'G2 manifest public surfaces');
  if (
    manifest.writeStrategy !== 'atomic-with-rollback' ||
    manifest.postWriteVerification !== 'required'
  ) {
    fail('G2 manifest write policy differs');
  }
  assertExact(manifest.baseline.slugs, BASELINE_SLUGS, 'G2 baseline identity set');
  if (manifest.baseline.registryEntryCount !== BASELINE_SLUGS.length) {
    fail('G2 baseline registry count differs');
  }
  if (manifest.baseline.publishedEntryCount !== BASELINE_SLUGS.length) {
    fail('G2 baseline published count differs');
  }
  if (identityDigest(registry.entries, BASELINE_SLUGS) !== manifest.baseline.identitySetSha256) {
    fail('G2 baseline identity digest differs');
  }
  const entry = findEntry(registry.entries, G2_GUIDE_SLUG);
  assertExact(manifest.identitySet, [identityProjection(entry)], 'G2 identity projection');
  if (manifest.sourceSetSha256 !== identityDigest(registry.entries, [G2_GUIDE_SLUG])) {
    fail('G2 source-set digest differs');
  }
  if (
    manifest.result?.registryEntryCount !== registry.entries.length ||
    manifest.result?.publishedEntryCount !== registry.entries.length ||
    manifest.result?.g2IdentityCount !== 1 ||
    manifest.result?.sourceDocumentCount !== 2
  ) {
    fail('G2 result counts differ');
  }
  assertExact(manifest.result.ownerPages, { cn: 1, io: 1 }, 'G2 owner-page count');
  for (const locale of GUIDE_LOCALES) verifySource(rootDir, entry, locale);
  return {
    status: manifest.status,
    g2Slugs: [G2_GUIDE_SLUG],
    g1Slugs: [...G1_GUIDE_SLUGS],
    registryEntryCount: registry.entries.length,
    baselinePublishedEntryCount: BASELINE_SLUGS.length,
    publishedEntryCount: registry.entries.length,
    g2IdentityCount: 1,
    ownerPages: { cn: 1, io: 1 },
    sourceDocumentCount: 2,
    sourceSetSha256: manifest.sourceSetSha256
  };
}

function verifyRollback(manifest, rollback) {
  if (rollback.schemaVersion !== 1 || rollback.batch !== 'week06' || rollback.wave !== 'g2') {
    fail('G2 rollback header differs');
  }
  if (
    rollback.status !== 'ready' ||
    rollback.rollbackAction !==
      'Restore the prior G1 Guide projection before serving the G2 replacement export.'
  ) {
    fail('G2 rollback state differs');
  }
  assertExact(rollback.publicSurfaces, manifest.publicSurfaces, 'G2 rollback public surfaces');
  assertExact(rollback.waveIdentitySet, [G2_GUIDE_SLUG], 'G2 rollback identity set');
  assertExact(rollback.removeSlugs, [G2_GUIDE_SLUG], 'G2 rollback remove set');
  assertExact(rollback.keepG1Slugs, G1_GUIDE_SLUGS, 'G2 rollback G1 isolation');
  if (
    rollback.baselinePublishedEntryCount !== manifest.baseline.publishedEntryCount ||
    rollback.resultingPublishedEntryCount !== manifest.result.publishedEntryCount ||
    rollback.priorCompleteState?.identitySetSha256 !== manifest.baseline.identitySetSha256
  ) {
    fail('G2 rollback baseline differs from release manifest');
  }
}

function verifyGuideG2Release({ rootDir = process.cwd() } = {}) {
  const safeRoot = path.resolve(rootDir);
  const registry = readJson(safeRoot, 'src/content/guides/registry.json');
  const policy = readJson(safeRoot, 'src/content/guides/policy.json');
  const manifest = readJson(safeRoot, 'src/content/guides/g2-release-manifest.json');
  const rollback = readJson(safeRoot, 'src/content/guides/g2-rollback.json');
  if (!Array.isArray(registry.entries) || policy.entryCount !== registry.entries.length) {
    fail('Guide policy entryCount differs from registry');
  }
  const result = verifyManifest(safeRoot, manifest, registry);
  verifyRollback(manifest, rollback);
  return result;
}

module.exports = {
  BASELINE_SLUGS,
  G2_GUIDE_SLUG,
  REQUIRED_COMPLIANCE_TERMS,
  REQUIRED_PRODUCT_TERMS,
  verifyGuideG2Release
};
