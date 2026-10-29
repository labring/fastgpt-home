#!/usr/bin/env node

/** Verify the candidate-to-identity authority and its static metadata projection. */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  ADDITIONS_PATH,
  AUTHORITY_PATH,
  BASELINE_PATH,
  EXPECTED_ADDITION_COUNT,
  EXPECTED_BASELINE_COUNT,
  EXPECTED_CANDIDATE_COUNT,
  EXPECTED_FALLBACK_AFTER,
  EXPECTED_FALLBACK_BEFORE,
  EXPECTED_IDENTITY_COUNT,
  loadCommitted,
  stableJson
} = require('./generate-faq-metadata-authority');
const {
  loadRouteIdentity,
  normalizeFaqMetadataPolicy,
  readEnglishFaq
} = require('./generate-faq-metadata');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');
const IO_BASE_URL = 'https://fastgpt.io';
const CN_BASE_URL = 'https://fastgpt.cn';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];
}

function getAttribute(tag, attribute) {
  return tag.match(new RegExp(`\\s${attribute}=["']([^"']*)["']`, 'i'))?.[1];
}

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/&#([0-9]+);/g, (_, value) => String.fromCodePoint(Number.parseInt(value, 10)))
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function resolveHtml(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  const candidates = [
    path.join(OUT_DIR, `${relativeRoute}.html`),
    path.join(OUT_DIR, relativeRoute, 'index.html')
  ];
  const htmlPath = candidates.find((candidate) => fs.existsSync(candidate));
  assert(htmlPath, `Missing static HTML for ${route}`);
  return fs.readFileSync(htmlPath, 'utf8');
}

function getCanonical(html) {
  const tag = getTags(html, 'link').find(
    (candidate) => getAttribute(candidate, 'rel')?.toLowerCase() === 'canonical'
  );
  assert(tag, 'Missing canonical link');
  return decodeHtml(getAttribute(tag, 'href') || '');
}

function getAlternates(html) {
  return Object.fromEntries(
    getTags(html, 'link')
      .filter((tag) => getAttribute(tag, 'rel')?.toLowerCase() === 'alternate')
      .map((tag) => [getAttribute(tag, 'hreflang'), decodeHtml(getAttribute(tag, 'href') || '')])
      .filter(([language, href]) => language && href)
  );
}

function getMeta(html, name) {
  const tag = getTags(html, 'meta').find((candidate) => getAttribute(candidate, 'name') === name);
  assert(tag, `Missing meta name="${name}"`);
  return decodeHtml(getAttribute(tag, 'content') || '');
}

function getTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  assert(match, 'Missing title');
  return decodeHtml(match[1]);
}

function verifySourceContract() {
  const authority = loadCommitted();
  const baseline = readJson(BASELINE_PATH);
  const additionsArtifact = readJson(ADDITIONS_PATH);
  const additions = additionsArtifact.records;
  const faqRecords = readEnglishFaq();
  const routeIdentity = loadRouteIdentity();
  const finalRecords = [...baseline.records, ...additions];
  const finalIds = new Set(finalRecords.map((record) => record.contentId));
  const routeIds = new Set(routeIdentity.byContentId.keys());

  assert.equal(authority.counts.candidates, EXPECTED_CANDIDATE_COUNT);
  assert.equal(authority.counts.identities, EXPECTED_IDENTITY_COUNT);
  assert.equal(authority.counts.baseline, EXPECTED_BASELINE_COUNT);
  assert.equal(authority.counts.additions, EXPECTED_ADDITION_COUNT);
  assert.equal(authority.counts.fallback.before, EXPECTED_FALLBACK_BEFORE);
  assert.equal(authority.counts.fallback.after, EXPECTED_FALLBACK_AFTER);
  assert.equal(
    authority.counts.fallback.delta,
    EXPECTED_FALLBACK_AFTER - EXPECTED_FALLBACK_BEFORE
  );
  assert.equal(baseline.records.length, EXPECTED_BASELINE_COUNT);
  assert.equal(additions.length, EXPECTED_ADDITION_COUNT);
  assert.equal(finalIds.size, EXPECTED_BASELINE_COUNT + EXPECTED_ADDITION_COUNT);
  assert.equal(finalIds.size, EXPECTED_IDENTITY_COUNT);
  assert.equal(faqRecords.length - finalIds.size, EXPECTED_FALLBACK_AFTER);
  assert.deepEqual(
    new Set(authority.records.map((record) => record.contentId).filter(Boolean)),
    routeIds
  );
  assert.equal(additionsArtifact.source.authority, path.basename(AUTHORITY_PATH));
  assert.deepEqual(authority.additions, additions);

  const noPage = authority.records.find((record) => record.disposition === 'no-page');
  assert(noPage, 'Missing no-page disposition');
  assert.equal(noPage.contentId, null);
  assert.equal(noPage.canonicalSlug, null);
  const duplicateLosers = authority.records.filter(
    (record) => record.disposition === 'duplicate-loser'
  );
  assert.equal(duplicateLosers.length, 6);
  for (const loser of duplicateLosers) {
    assert.equal(loser.contentId, null);
    assert.equal(loser.canonicalSlug, null);
    assert(loser.mergedInto && routeIds.has(loser.mergedInto));
  }
  const semanticRemap = authority.records.find((record) => record.disposition === 'semantic-remap');
  assert(semanticRemap, 'Missing semantic remap disposition');
  assert.equal(semanticRemap.contentId, 'how-ai-platforms-improve-corporate-training');
  assert.equal(semanticRemap.canonicalSlug, 'how-ai-platforms-improve-corporate-training');
  assert.equal(
    new Set(authority.records.map((record) => record.contentId).filter(Boolean)).size,
    EXPECTED_IDENTITY_COUNT
  );

  const source = fs.readFileSync(path.join(ROOT, 'src/faq/index.ts'), 'utf8');
  assert(
    source.includes('./generated-en-metadata-additions.json'),
    'FAQ source does not load metadata additions'
  );
  assert(
    source.includes('approvedEnglishFaqMetadataRecords'),
    'FAQ source does not merge metadata authority records'
  );
  return { authority, additions, finalRecords, routeIdentity };
}

function verifyStaticHtml(variant, context) {
  if (variant === 'cn') return 'skipped-cn';
  for (const addition of context.additions) {
    const route = `/faq/${addition.sourceSlug}`;
    const html = resolveHtml(route);
    const expected = normalizeFaqMetadataPolicy(addition);
    assert.equal(getTitle(html), expected.title, `Addition title mismatch: ${addition.contentId}`);
    assert.equal(
      getMeta(html, 'description'),
      expected.description,
      `Addition description mismatch: ${addition.contentId}`
    );
    assert.equal(
      getMeta(html, 'keywords'),
      addition.keywords.replaceAll(', ', ','),
      `Addition keywords mismatch: ${addition.contentId}`
    );
    assert.equal(
      getCanonical(html),
      `${IO_BASE_URL}${route}`,
      `Addition canonical identity mismatch: ${addition.contentId}`
    );
    assert.deepEqual(
      getAlternates(html),
      {
        en: `${IO_BASE_URL}${route}`,
        'zh-CN': `${CN_BASE_URL}${route}`,
        'x-default': `${IO_BASE_URL}${route}`
      },
      `Addition alternate identity mismatch: ${addition.contentId}`
    );
    for (const href of [...html.matchAll(/\bhref=["']([^"']+)["']/gi)].map((match) =>
      decodeHtml(match[1])
    )) {
      if (!href.startsWith('/faq/')) continue;
      const target = href.replace(/\/$/, '').split('?')[0];
      assert(
        context.routeIdentity.bySourceSlug.has(target.slice('/faq/'.length)),
        `Internal FAQ link has unknown identity: ${href}`
      );
    }
  }
  return 'passed';
}

function parseArgs(argv, env = process.env) {
  const options = { html: false, variant: undefined };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--html') options.html = true;
    else if (token === '--variant') options.variant = argv[++index];
    else throw new Error(`Unknown argument: ${token}`);
  }
  if (options.html && !options.variant) options.variant = env.NEXT_PUBLIC_SITE_VARIANT;
  if (options.html && !['io', 'cn'].includes(options.variant))
    throw new Error('--html requires --variant io|cn');
  if (options.variant && !['io', 'cn'].includes(options.variant))
    throw new Error('--variant requires io or cn');
  return options;
}

function main(argv = process.argv.slice(2), env = process.env) {
  const options = parseArgs(argv, env);
  const context = verifySourceContract();
  const staticHtml = options.html ? verifyStaticHtml(options.variant, context) : 'skipped';
  const { authority } = context;
  console.log(
    `[verify-faq-metadata-authority] passed candidates=${authority.counts.candidates} identities=${authority.counts.identities} baseline=${authority.counts.baseline} additions=${authority.counts.additions} fallbackBefore=${authority.counts.fallback.before} fallback=${authority.counts.fallback.after} delta=${authority.counts.fallback.delta} staticHtml=${staticHtml}`
  );
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`[verify-faq-metadata-authority] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { main, parseArgs, verifySourceContract, verifyStaticHtml };
