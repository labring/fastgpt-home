#!/usr/bin/env node

/**
 * Verify the canonical FAQ SEO graph from committed source data and optional static HTML.
 *
 * Source mode is host-independent. HTML mode expects a case-sensitive static export and
 * accepts --out-dir <dir> --variant io|cn so the two owner-site builds can be checked separately.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'src/faq/generated-en-route-registry.json');
const EN_SOURCE = path.join(ROOT, 'src/faq/en.ts');
const ZH_SOURCES = [
  path.join(ROOT, 'src/faq/zh.ts'),
  path.join(ROOT, 'src/faq/w2.ts'),
  path.join(ROOT, 'src/faq/w3.ts')
];
const IO_BASE_URL = stripTrailingSlash(process.env.NEXT_PUBLIC_IO_HOME_URL || 'https://fastgpt.io');
const CN_BASE_URL = stripTrailingSlash(process.env.NEXT_PUBLIC_CN_HOME_URL || 'https://fastgpt.cn');
const EXPECTED_ENGLISH_COUNT = 1400;
const SAFE_PRESERVED_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SAFE_REPAIRED_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FAQ_LOCALES = ['en', 'zh'];

function fail(message) {
  throw new Error(`[verify-faq-seo-graph] ${message}`);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`Unable to read ${path.relative(ROOT, filePath)}: ${error.message}`);
  }
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, '');
}

function unwrapExpression(expression) {
  let current = expression;
  while (
    current &&
    (ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isTypeAssertionExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

function propertyKey(property) {
  const { name } = property;
  if (name && (ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isIdentifier(name))) {
    return name.text;
  }
  return undefined;
}

function stringProperty(objectLiteral, propertyName) {
  const property = objectLiteral.properties.find(
    (candidate) => ts.isPropertyAssignment(candidate) && propertyKey(candidate) === propertyName
  );
  if (!property) return undefined;
  const value = unwrapExpression(property.initializer);
  return value && ts.isStringLiteralLike(value) ? value.text : undefined;
}

function readFaqRecords(sourcePath) {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const sourceFile = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true);
  const records = new Map();

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const contentId = propertyKey(property);
        const value = unwrapExpression(property.initializer);
        if (!contentId || !value || !ts.isObjectLiteralExpression(value)) continue;
        const question = stringProperty(value, 'Question');
        const answers = stringProperty(value, 'Answers');
        const category = stringProperty(value, 'Category');
        if (!question || !answers || !category) continue;
        if (records.has(contentId)) fail(`Duplicate ${path.basename(sourcePath)} contentId: ${contentId}`);
        records.set(contentId, { contentId, Question: question, Answers: answers, Category: category });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  if (!records.size) fail(`No FAQ records found in ${path.relative(ROOT, sourcePath)}`);
  return records;
}

function loadSourceCatalogs() {
  const english = readFaqRecords(EN_SOURCE);
  const chinese = new Map();
  for (const sourcePath of ZH_SOURCES) {
    if (!fs.existsSync(sourcePath)) continue;
    for (const [contentId, record] of readFaqRecords(sourcePath)) {
      if (chinese.has(contentId)) fail(`Duplicate Chinese FAQ contentId: ${contentId}`);
      chinese.set(contentId, record);
    }
  }
  return { english, chinese };
}

function loadRegistry() {
  const registry = readJson(REGISTRY_PATH);
  assert(Array.isArray(registry.records), 'Route registry records must be an array');
  assert.equal(registry.records.length, EXPECTED_ENGLISH_COUNT, `Expected ${EXPECTED_ENGLISH_COUNT} route records`);

  const byContentId = new Map();
  const byCanonicalSlug = new Map();
  for (const record of registry.records) {
    assert(record.contentId, 'Registry record is missing contentId');
    assert(!byContentId.has(record.contentId), `Duplicate route contentId: ${record.contentId}`);
    assert(!byCanonicalSlug.has(record.canonicalSlug), `Duplicate canonical slug: ${record.canonicalSlug}`);
    assert(['preserved', 'repaired'].includes(record.routeStatus), `Invalid routeStatus for ${record.contentId}`);
    assert(SAFE_PRESERVED_SLUG.test(record.canonicalSlug), `Unsafe canonical slug for ${record.contentId}`);
    if (record.routeStatus === 'preserved') {
      assert.equal(record.sourceSlug.toLowerCase(), record.canonicalSlug, `Preserved slug was not normalized for ${record.contentId}`);
      assert.equal(record.collisionDisposition, 'none', `Preserved collision for ${record.contentId}`);
    } else {
      assert(SAFE_REPAIRED_SLUG.test(record.canonicalSlug), `Repaired slug is not lowercase for ${record.contentId}`);
    }
    byContentId.set(record.contentId, record);
    byCanonicalSlug.set(record.canonicalSlug, record);
  }

  const collisionLedger = new Set();
  for (const entry of registry.collisionLedger || []) {
    assert(!collisionLedger.has(entry.sourceSlug), `Duplicate collision ledger slug: ${entry.sourceSlug}`);
    assert.equal(entry.disposition, 'no-redirect', `Collision ledger disposition changed: ${entry.sourceSlug}`);
    collisionLedger.add(entry.sourceSlug);
  }

  return { registry, byContentId, byCanonicalSlug, collisionLedger };
}

function routeUrl(locale, routeKey) {
  const baseUrl = locale === 'zh' ? CN_BASE_URL : IO_BASE_URL;
  return `${baseUrl}/faq/${encodeURIComponent(routeKey)}`;
}

function normalizeAnswer(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function assertSourceWiring() {
  const sourceChecks = [
    ['src/faq/index.ts', ['resolveFaqContentId', 'getFaqRouteKey', 'getFaqIds(']],
    ['src/lib/seo.ts', ['getFaqRouteKey', 'getFaqAlternates', "languages['x-default']"]],
    ['src/lib/localizedRoutes.ts', ['resolveFaqContentId', 'getFaqRouteKey', 'Unknown FAQ route identity']],
    ['src/app/[lang]/faq/[id]/page.tsx', ['resolveFaqContentId', 'FAQJsonLd', 'getFaqAlternates', 'dynamicParams = false']],
    ['src/app/sitemap.ts', ['getFaqIds(', 'seenUrls', 'getOwnedFaqUrl']],
    ['src/app/faq/[id]/page.tsx', ['getFaqIds(defaultLocale)', 'dynamicParams = false']]
  ];
  for (const [relativePath, required] of sourceChecks) {
    const source = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
    for (const token of required) assert(source.includes(token), `${relativePath} is missing registry wiring: ${token}`);
  }
  const detailSource = fs.readFileSync(path.join(ROOT, 'src/app/[lang]/faq/[id]/page.tsx'), 'utf8');
  assert(!detailSource.includes('getEnglishFaqCanonicalSlug'), 'Detail route bypasses the identity adapter');
  assert(!detailSource.includes('getOwnedFaqUrl(langName, faqId)'), 'Detail breadcrumb uses an unresolved route key');
}

function expectedAlternateMap(locale, contentId, byContentId, chinese) {
  const map = {};
  const currentRoute = locale === 'zh' ? (chinese.has(contentId) ? contentId : undefined) : byContentId.get(contentId)?.canonicalSlug;
  assert(currentRoute, `Missing ${locale} route key for ${contentId}`);
  map[locale === 'zh' ? 'zh-CN' : 'en'] = routeUrl(locale, currentRoute);

  if (byContentId.has(contentId) && chinese.has(contentId)) {
    if (locale === 'zh') map.en = routeUrl('en', byContentId.get(contentId).canonicalSlug);
    else map['zh-CN'] = routeUrl('zh', contentId);
    map['x-default'] = routeUrl('en', byContentId.get(contentId).canonicalSlug);
  }
  return map;
}

function verifySourceGraph() {
  const { english, chinese } = loadSourceCatalogs();
  const { registry, byContentId, byCanonicalSlug, collisionLedger } = loadRegistry();
  assert.equal(english.size, EXPECTED_ENGLISH_COUNT, `Expected ${EXPECTED_ENGLISH_COUNT} English source records`);
  assert.equal(byContentId.size, EXPECTED_ENGLISH_COUNT, 'English registry identity cardinality mismatch');
  assert.equal(byCanonicalSlug.size, EXPECTED_ENGLISH_COUNT, 'English canonical slug cardinality mismatch');

  for (const record of registry.records) {
    assert(english.has(record.contentId), `Registry contentId missing from English source: ${record.contentId}`);
    if (record.routeStatus === 'repaired') {
      assert(record.canonicalSlug === record.canonicalSlug.toLowerCase(), `Repaired slug is mixed-case: ${record.contentId}`);
    }
    if (record.collisionDisposition === 'no-redirect') {
      assert(record.routeStatus === 'repaired', `Collision record was preserved: ${record.contentId}`);
    }
  }

  const preserved = registry.records.find((record) => record.routeStatus === 'preserved');
  assert(preserved, 'No preserved lowercase fixture is available');

  const bilingual = registry.records.find((record) => chinese.has(record.contentId));
  assert(bilingual, 'No bilingual fixture is available');
  const missingCounterpart = registry.records.find((record) => !chinese.has(record.contentId));

  assertSourceWiring();
  const enBilingual = expectedAlternateMap('en', bilingual.contentId, byContentId, chinese);
  const zhBilingual = expectedAlternateMap('zh', bilingual.contentId, byContentId, chinese);
  assert(enBilingual['zh-CN'].startsWith(`${CN_BASE_URL}/faq/`), `Bilingual English alternate has wrong owner: ${bilingual.contentId}`);
  assert(zhBilingual.en.startsWith(`${IO_BASE_URL}/faq/`), `Bilingual Chinese alternate has wrong owner: ${bilingual.contentId}`);
  assert.equal(enBilingual['x-default'], enBilingual.en, `x-default drift for ${bilingual.contentId}`);
  assert.equal(zhBilingual['x-default'], zhBilingual.en, `Chinese x-default drift for ${bilingual.contentId}`);

  console.log(
    `[verify-faq-seo-graph] source checks passed (SEO-01/02/03, ${registry.records.length} English identities, ${chinese.size} Chinese routes; preserved fixture=${preserved.canonicalSlug}, bilingual=${bilingual.contentId}${missingCounterpart ? `, missing-counterpart=${missingCounterpart.contentId}` : ', missing-counterpart=none'})`
  );
  return { english, chinese, registry, byContentId, byCanonicalSlug };
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 16)))
    .replace(/&#([0-9]+);/g, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 10)))
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function stripHtml(value) {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];
}

function getAttribute(tag, attribute) {
  return tag.match(new RegExp(`\\s${attribute}=["']([^"']*)["']`, 'i'))?.[1];
}

function getAlternateLinks(html) {
  return Object.fromEntries(
    getTags(html, 'link')
      .filter((tag) => getAttribute(tag, 'rel')?.toLowerCase() === 'alternate')
      .map((tag) => [getAttribute(tag, 'hreflang'), decodeHtmlEntities(getAttribute(tag, 'href') || '')])
      .filter(([language, href]) => language && href)
  );
}

function getCanonical(html) {
  const tag = getTags(html, 'link').find((candidate) => getAttribute(candidate, 'rel')?.toLowerCase() === 'canonical');
  assert(tag, 'Missing canonical link');
  return decodeHtmlEntities(getAttribute(tag, 'href') || '');
}

function extractFaqJsonLd(html) {
  const questions = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(decodeHtmlEntities(match[1].trim()));
      const visit = (value) => {
        if (!value || typeof value !== 'object') return;
        if (value['@type'] === 'Question' && typeof value.name === 'string') {
          questions.push({ name: value.name, answer: value.acceptedAnswer?.text });
        }
        for (const child of Object.values(value)) visit(child);
      };
      visit(parsed);
    } catch {
      // Next may emit non-JSON framework script blocks; FAQ JSON-LD remains checked below.
    }
  }
  return questions;
}

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function htmlRouteFiles(outDir) {
  const faqRoot = path.join(outDir, 'faq');
  return walkFiles(faqRoot).filter((filePath) => path.basename(filePath) !== 'index.html');
}

function routeKeyFromHtmlPath(filePath, outDir) {
  const relative = path.relative(path.join(outDir, 'faq'), filePath).split(path.sep).join('/');
  const route = relative.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  assert(route && !route.includes('/'), `FAQ HTML path is not a one-segment canonical route: ${relative}`);
  try {
    return decodeURIComponent(route);
  } catch {
    fail(`Malformed encoded FAQ HTML route: ${relative}`);
  }
}

function expectedHtmlRouteMap(variant, identity) {
  const locale = variant === 'cn' ? 'zh' : 'en';
  const map = new Map();
  for (const record of identity.registry.records) {
    const routeKey = locale === 'zh' ? (identity.chinese.has(record.contentId) ? record.contentId : undefined) : record.canonicalSlug;
    if (routeKey) map.set(routeKey, { record, locale, authored: identity[locale === 'zh' ? 'chinese' : 'english'].get(record.contentId) });
  }
  if (locale === 'zh') {
    for (const [contentId, authored] of identity.chinese) {
      if (!map.has(contentId)) map.set(contentId, { record: { contentId }, locale, authored });
    }
  }
  return map;
}

function parseSitemapUrls(outDir) {
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), `Missing sitemap.xml in ${outDir}`);
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtmlEntities(match[1].trim()));
}

function verifyHtmlGraph(outDir, variant, identity) {
  assert(['io', 'cn'].includes(variant), `HTML variant must be io or cn: ${variant}`);
  const expected = expectedHtmlRouteMap(variant, identity);
  const files = htmlRouteFiles(outDir);
  assert(files.length > 0, `No FAQ detail HTML files found under ${path.join(outDir, 'faq')}`);
  const seenRoutes = new Set();
  const foldedPaths = new Map();
  const baseUrl = variant === 'cn' ? CN_BASE_URL : IO_BASE_URL;

  for (const filePath of files) {
    const routeKey = routeKeyFromHtmlPath(filePath, outDir);
    assert(!seenRoutes.has(routeKey), `Duplicate FAQ HTML route: ${routeKey}`);
    seenRoutes.add(routeKey);
    const folded = filePath.toLowerCase();
    const previous = foldedPaths.get(folded);
    if (previous && previous !== filePath) {
      const previousRealPath = fs.realpathSync.native(previous);
      const currentRealPath = fs.realpathSync.native(filePath);
      if (previousRealPath === currentRealPath) {
        fail(`Case-insensitive export collision: ${previous} and ${filePath}; use a case-sensitive export host`);
      }
    }
    foldedPaths.set(folded, filePath);

    const expectedRoute = expected.get(routeKey);
    assert(expectedRoute, `Unknown or legacy FAQ HTML route: ${routeKey}`);
    const html = fs.readFileSync(filePath, 'utf8');
    const expectedCanonical = routeUrl(expectedRoute.locale, routeKey);
    assert.equal(new URL(getCanonical(html)).href, new URL(expectedCanonical).href, `${routeKey} canonical mismatch`);

    const alternates = getAlternateLinks(html);
    const expectedAlternates = expectedAlternateMap(expectedRoute.locale, expectedRoute.record.contentId, identity.byContentId, identity.chinese);
    assert.deepEqual(Object.keys(alternates).sort(), Object.keys(expectedAlternates).sort(), `${routeKey} alternate set mismatch`);
    for (const [language, url] of Object.entries(expectedAlternates)) {
      assert.equal(new URL(alternates[language]).href, new URL(url).href, `${routeKey} ${language} alternate mismatch`);
    }

    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripHtml(match[1]));
    assert.equal(headings.length, 1, `${routeKey} must contain one H1`);
    assert.equal(headings[0], expectedRoute.authored.Question, `${routeKey} H1 identity drift`);
    const questions = extractFaqJsonLd(html);
    const faqQuestion = questions.find((question) => question.name === expectedRoute.authored.Question);
    assert(faqQuestion, `${routeKey} FAQ JSON-LD question identity drift`);
    assert.equal(normalizeAnswer(faqQuestion.answer || ''), normalizeAnswer(expectedRoute.authored.Answers), `${routeKey} FAQ JSON-LD answer drift`);
  }

  assert.equal(seenRoutes.size, expected.size, `FAQ HTML route cardinality mismatch for ${variant}: expected ${expected.size}, found ${seenRoutes.size}`);
  const sitemapUrls = parseSitemapUrls(outDir);
  const sitemapSet = new Set(sitemapUrls);
  assert.equal(sitemapSet.size, sitemapUrls.length, 'Sitemap contains duplicate exact URLs');
  const faqSitemapUrls = sitemapUrls.filter((url) => {
    try {
      const parsed = new URL(url);
      return parsed.pathname.startsWith('/faq/') && parsed.pathname.split('/').filter(Boolean).length === 2;
    } catch {
      return false;
    }
  });
  const expectedSitemap = new Set([...expected.keys()].map((routeKey) => routeUrl(expected.get(routeKey).locale, routeKey)));
  assert.deepEqual(new Set(faqSitemapUrls), expectedSitemap, `Sitemap FAQ URL set mismatch for ${variant}`);
  for (const url of faqSitemapUrls) {
    const parsed = new URL(url);
    assert.equal(parsed.origin, baseUrl, `Sitemap FAQ URL has wrong owner host: ${url}`);
    assert(!parsed.pathname.startsWith('/en/faq/') && !parsed.pathname.startsWith('/zh/faq/'), `Sitemap contains prefixed alias: ${url}`);
  }

  console.log(`[verify-faq-seo-graph] HTML checks passed (${variant}, ${seenRoutes.size} FAQ pages, ${faqSitemapUrls.length} sitemap FAQ URLs; case-sensitive filesystem required)`);
}

function parseArgs(argv) {
  const args = { html: false, outDir: path.join(ROOT, 'out'), variant: process.env.NEXT_PUBLIC_SITE_VARIANT === 'cn' ? 'cn' : 'io' };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--html') args.html = true;
    else if (token === '--out-dir') args.outDir = path.resolve(ROOT, argv[++index]);
    else if (token === '--variant') args.variant = argv[++index];
    else fail(`Unknown argument: ${token}`);
  }
  if (!args.html && (argv.includes('--out-dir') || argv.includes('--variant'))) {
    fail('--out-dir and --variant require --html');
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const identity = verifySourceGraph();
  if (args.html) verifyHtmlGraph(args.outDir, args.variant, identity);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
