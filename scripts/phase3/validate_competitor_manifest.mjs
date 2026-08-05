import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const manifestPath = path.join(root, 'artifacts/phase3/competitor-pages-manifest.json');
const failuresPath = path.join(root, 'artifacts/phase3/competitor-pages-failures.json');
const expectedSlugs = [
  'dify-vs-fastgpt',
  'self-build-vs-platform',
  'ragflow-vs-fastgpt',
  'maxkb-vs-fastgpt'
];
const allowedEvidence = new Set(['official-public', 'not-publicly-listed', 'poc-required', 'contract-required']);
const allowedStatuses = new Set(['preview', 'published']);
const knownLocalTargets = new Set([
  '/zh/price',
  '/zh/faq/private-deployment-data-boundary',
  '/zh/faq/open-source-vs-commercial-edition',
  '/zh/faq/poc-design-checklist'
]);

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function addFailure(failures, slug, gate, reason, evidencePath) {
  failures.push({ slug, gate, reason, evidencePath });
}

function addDays(dateValue, days) {
  const date = new Date(`${dateValue}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function checkHash(relativePath, expected) {
  const absolute = path.join(root, relativePath);
  if (!fs.existsSync(absolute)) return { ok: false, reason: `Missing source file: ${relativePath}` };
  const actual = crypto.createHash('sha256').update(fs.readFileSync(absolute)).digest('hex');
  return actual === expected
    ? { ok: true }
    : { ok: false, reason: `Source hash drift: expected ${expected}, got ${actual}` };
}

function validateManifest({ write = true } = {}) {
  const manifest = readJson(manifestPath);
  const failures = [];
  const waivedFailures = [];
  const directPublish = manifest.publicationOverride?.mode === 'direct-publish';
  const pages = Array.isArray(manifest.pages) ? manifest.pages : [];
  const actualSlugs = pages.map((page) => page.slug);
  if (pages.length !== expectedSlugs.length || [...actualSlugs].sort().join(',') !== [...expectedSlugs].sort().join(',')) {
    addFailure(failures, '*', 'exact-set', 'Manifest must contain exactly the four assigned comparison slugs.', 'artifacts/phase3/competitor-pages-manifest.json#pages');
  }

  for (const page of pages) {
    const pagePath = `artifacts/phase3/competitor-pages-manifest.json#pages[${pages.indexOf(page)}]`;
    const pageFailures = [];
    const pageWaivedFailures = [];
    if (!expectedSlugs.includes(page.slug)) pageFailures.push(['exact-set', 'Unregistered comparison slug.']);
    if (!allowedStatuses.has(page.status)) pageFailures.push(['status', `Invalid page status: ${page.status}`]);
    if (page.lang !== 'zh') pageFailures.push(['locale', 'Comparison pages are Chinese-only.']);
    if (page.sourceHash && page.sourcePath) {
      const hash = checkHash(page.sourcePath, page.sourceHash);
      if (!hash.ok) pageFailures.push(['source', hash.reason]);
    }
    if (!page.dates?.sourceVerifiedOn || !page.dates?.dateModified || !page.dates?.nextReviewOn) {
      pageFailures.push(['dates', 'Source verification, modification, and review dates are required.']);
    } else if (page.dates.nextReviewOn !== addDays(page.dates.dateModified, manifest.reviewPolicy?.nextReviewDays || 90)) {
      pageFailures.push(['dates', 'nextReviewOn must equal dateModified plus the configured review interval.']);
    }
    if (!page.sourceRefs?.length) pageFailures.push(['evidence', 'At least one source reference is required.']);
    for (const source of page.sourceRefs || []) {
      if (!source.id || !source.title || !source.section || !source.verifiedOn || !source.version || !allowedEvidence.has(source.evidenceStatus)) {
        pageFailures.push(['evidence', `Incomplete or invalid source reference: ${source.id || 'unknown'}`]);
      }
    }
    if (!page.asset?.path || !page.asset.alt || !page.asset.width || !page.asset.height) {
      pageFailures.push(['asset', 'Asset path, alt, and fixed dimensions are required.']);
    } else if (!fs.existsSync(path.join(root, 'public', page.asset.path.replace(/^\//, '')))) {
      pageFailures.push(['asset', `Missing page asset: ${page.asset.path}`]);
    }
    if (!Array.isArray(page.internalLinks) || page.internalLinks.length !== 3) {
      pageFailures.push(['links', 'Exactly three internal links are required.']);
    } else {
      for (const link of page.internalLinks) {
        if (!link.label || !link.target || link.target.startsWith('#') || link.target.includes('TODO') || !link.verified) {
          pageFailures.push(['links', `Unverified or placeholder link: ${link.target || 'empty'}`]);
        } else if (!link.external && !knownLocalTargets.has(link.target)) {
          pageFailures.push(['links', `Unknown local link target: ${link.target}`]);
        }
      }
    }
    const requiredRoles = ['product', 'sales', 'legal'];
    for (const role of requiredRoles) {
      const signoff = (page.signoffs || []).find((item) => item.role === role);
      if (!signoff || signoff.status !== 'approved' || !signoff.signer || !signoff.timestamp || !signoff.evidenceRef) {
        const failure = ['signoffs', `${role} signoff is pending or incomplete.`];
        (directPublish ? pageWaivedFailures : pageFailures).push(failure);
      }
    }
    if (page.gates?.contentAudit !== 'passed') pageFailures.push(['content-audit', 'Content audit has not passed.']);
    if (page.gates?.source !== 'passed') pageFailures.push(['source', 'Source gate has not passed.']);
    if (page.gates?.asset !== 'passed') pageFailures.push(['asset', 'Asset gate has not passed.']);
    if (page.gates?.links !== 'passed') pageFailures.push(['links', 'Link gate has not passed.']);
    const pageFailureRows = pageFailures.map(([gate, reason]) => ({ gate, reason, evidencePath: pagePath }));
    const pageWaivedRows = pageWaivedFailures.map(([gate, reason]) => ({
      slug: page.slug,
      gate,
      reason,
      evidencePath: pagePath,
      waived: true,
    }));
    for (const row of pageFailureRows) addFailure(failures, page.slug, row.gate, row.reason, row.evidencePath);
    waivedFailures.push(...pageWaivedRows);
    page.failures = pageFailureRows.map((row) => `${row.gate}:${row.reason}`);
    page.waivedFailures = pageWaivedRows.map((row) => `${row.gate}:${row.reason}`);
    page.status = pageFailureRows.length === 0 ? 'published' : 'preview';
  }

  manifest.generatedOn = new Date().toISOString().slice(0, 10);
  const report = {
    id: 'competitor-pages-failures',
    generatedOn: manifest.generatedOn,
    directPublish,
    failures,
    waivedFailures,
  };
  if (write) {
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    fs.writeFileSync(failuresPath, `${JSON.stringify(report, null, 2)}\n`);
  }
  return { manifest, failures, waivedFailures, report };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateManifest();
  const pageCount = result.manifest.pages?.length || 0;
  console.log(`Phase 3 manifest: ${pageCount} pages, ${result.failures.length} blocking failures, ${result.waivedFailures.length} waived failures, ${result.manifest.pages.filter((page) => page.status === 'published').length} published.`);
  if (result.failures.length) process.exitCode = 1;
}

export { validateManifest, expectedSlugs };
