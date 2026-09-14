#!/usr/bin/env node

/**
 * Verify the Bing Ads /ads/ landing surface against the static export.
 *
 * cn/preview builds must ship exactly the registered landing pages with the
 * contracted noindex/canonical policy, full lead-form field set, registry-faithful
 * copy, and no /ads/ entries in the sitemap. io builds must ship none of them.
 * The four-way consistency audit (keyword group ↔ ad title ↔ page H1 ↔ final URL)
 * reads the non-rendered ops registry, which no page module imports.
 */

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { resolveSiteVariant } = require('./lib/site-variant');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'out');
const adsDir = path.join(outDir, 'ads');
const variant = resolveSiteVariant();

const ADS_SUB_PATH = '/ads/';
const HTML_COMMENT_HIDDEN = /<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
const PLACEHOLDER_PATTERN = /需客户提供|占位|TODO/i;
const PLACEHOLDER_WHITELIST = ['客户 LOGO 墙：需客户提供可公开授权的 LOGO 素材后替换本区块'];

function fail(message) {
  console.error(`[verify-ads] ${message}`);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function loadRegistryModule(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const registryModule = { exports: {} };
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: relativePath
  }).outputText;
  vm.runInNewContext(`(function(require, module, exports){${output}\n})`, {}, {
    filename: relativePath
  })(require, registryModule, registryModule.exports);
  return registryModule.exports;
}

const EXPECTED_ADS_PAGE_COUNT = 8;

const registry = loadRegistryModule('src/content/ads/pages.ts');
const registeredPages = registry.adsLandingPages;
assert(
  Array.isArray(registeredPages) && registeredPages.length === EXPECTED_ADS_PAGE_COUNT,
  `ads registry must hold ${EXPECTED_ADS_PAGE_COUNT} pages`
);

const opsRegistry = JSON.parse(fs.readFileSync(path.join(root, 'src/content/ads/ad-ops.json'), 'utf8'));
const opsBySlug = new Map(opsRegistry.pages.map((entry) => [entry.slug, entry]));

const registryBySlug = new Map(registeredPages.map((page) => [page.slug, page]));
assert(
  registryBySlug.size === registeredPages.length && opsBySlug.size === opsRegistry.pages.length,
  'duplicate slug inside a registry'
);
for (const slug of registryBySlug.keys()) {
  assert(opsBySlug.has(slug), `ad-ops.json is missing the ops row for "${slug}"`);
}
for (const slug of opsBySlug.keys()) {
  assert(registryBySlug.has(slug), `ad-ops.json references unregistered slug "${slug}"`);
}

function listExportedAdsFiles() {
  if (!fs.existsSync(adsDir)) return [];
  return fs
    .readdirSync(adsDir, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(adsDir, entry.name);
      if (entry.isDirectory()) {
        return walkHtml(entryPath);
      }
      return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
    });
}

function walkHtml(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkHtml(entryPath);
      return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
    });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Four-way audit helper (词↔标题↔H1): the keyword group, ad title 1, and the page
// H1 are independently edited, so require a shared strand of at least 3
// characters between a keyword token and both copy surfaces instead of exact
// keyword containment.
function keywordTitleHeadlineAligned(keywordGroup, adTitle, h1) {
  const norm = (value) => value.toLowerCase().replace(/\s+/g, '');
  const titleText = norm(adTitle);
  const headlineText = norm(h1);
  return keywordGroup
    .split(/[、,]/)
    .map((keyword) => norm(keyword))
    .some(
      (keyword) =>
        keyword.length >= 3 &&
        Array.from({ length: titleText.length - 2 }, (_, i) => titleText.slice(i, i + 3)).some(
          (strand) => keyword.includes(strand) && headlineText.includes(strand)
        )
    );
}

function verifyExportedAdsPage(page, htmlPath) {
  const raw = fs.readFileSync(htmlPath, 'utf8');
  const html = decodeHtml(raw);
  const slug = page.slug;
  const label = `/ads/${slug}`;

  const robotsMatch =
    raw.match(/<meta\b[^>]*name="robots"[^>]*content="([^"]*)"[^>]*>/i) ||
    raw.match(/<meta\b[^>]*content="([^"]*)"[^>]*name="robots"[^>]*>/i);
  assert(robotsMatch, `${label}: robots meta missing`);
  const robotsContent = robotsMatch[1].replace(/\s/g, '');
  // Preview builds patch every robots meta to noindex,nofollow (walk-through
  // sites); production cn builds keep the contracted noindex,follow.
  const robotsOk =
    variant === 'preview'
      ? robotsContent === 'noindex,nofollow'
      : robotsContent === 'noindex,follow';
  assert(robotsOk, `${label}: robots meta must be noindex (found "${robotsContent}")`);

  const canonicalMatch =
    raw.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i) ||
    raw.match(/<link\b[^>]*href="([^"]*)"[^>]*rel="canonical"[^>]*>/i);
  assert(canonicalMatch, `${label}: canonical link missing`);
  assert(
    canonicalMatch[1] === `https://fastgpt.cn/ads/${slug}`,
    `${label}: canonical must point at https://fastgpt.cn/ads/${slug} (found ${canonicalMatch[1]})`
  );

  assert(!/<meta\b[^>]*property="og:/i.test(raw), `${label}: OpenGraph meta must not be emitted`);
  assert(!/<meta\b[^>]*name="twitter:/i.test(raw), `${label}: Twitter meta must not be emitted`);
  assert(!/hreflang=/i.test(raw), `${label}: hreflang must not be emitted`);
  assert(
    /<html\b[^>]*lang="zh-CN"/i.test(raw),
    `${label}: exported <html> must be lang="zh-CN"`
  );

  assert(
    html.includes(`<title>${page.h1} · FastGPT</title>`),
    `${label}: <title> must equal "H1 · FastGPT"`
  );
  assert(
    new RegExp(`name="description"\\s+content="${escapeRegExp(page.subtitle)}"`).test(raw),
    `${label}: meta description must equal the registry subtitle`
  );

  assert(
    new RegExp(`<h1[^>]*>${escapeRegExp(page.h1)}</h1>`).test(html),
    `${label}: <h1> must equal the registry H1`
  );

  for (const name of ['name', 'phone', 'company']) {
    assert(
      new RegExp(`<input\\b[^>]*name="${name}"`).test(html),
      `${label}: visible field input[name=${name}] missing`
    );
  }
  assert(
    /<select\b[^>]*name="consultationTopic"/.test(html),
    `${label}: visible field select[name=consultationTopic] missing`
  );

  for (const field of [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'source_page_path',
    'visitor_id',
    'consent_at',
    'consent_version'
  ]) {
    assert(
      new RegExp(`<input\\b[^>]*type="hidden"[^>]*name="${field}"`).test(html) ||
        new RegExp(`<input\\b[^>]*name="${field}"[^>]*type="hidden"`).test(html),
      `${label}: hidden attribution field input[name=${field}] missing`
    );
  }

  assert(
    /<input\b[^>]*type="checkbox"[^>]*name="consent"/.test(html),
    `${label}: privacy consent checkbox missing`
  );

  for (const link of page.readingLinks) {
    assert(
      html.includes(`href="${link.url}"`),
      `${label}: reading link ${link.url} missing`
    );
    assert(
      html.includes(`>${link.label}</a>`),
      `${label}: reading link label "${link.label}" missing`
    );
  }

  assert(
    html.includes(page.form.title) && html.includes(page.form.button),
    `${label}: form title/button copy from the registry missing`
  );
  assert(
    html.includes(page.trustLine) && html.includes(page.updatedAt),
    `${label}: trust line / updatedAt copy from the registry missing`
  );

  const visibleText = decodeHtml(raw.replace(HTML_COMMENT_HIDDEN, ' ').replace(/<[^>]*>/g, ' '));
  let placeholderScan = visibleText;
  PLACEHOLDER_WHITELIST.forEach((allowed) => {
    placeholderScan = placeholderScan.split(allowed).join(' ');
  });
  const remainingPlaceholder = placeholderScan.search(PLACEHOLDER_PATTERN);
  assert(
    remainingPlaceholder === -1,
    `${label}: placeholder copy outside the LOGO-wall whitelist: "${placeholderScan
      .slice(Math.max(0, remainingPlaceholder - 30), remainingPlaceholder + 60)
      .trim()}"`
  );
}

function verifySitemap() {
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return;
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  assert(
    !sitemap.includes(ADS_SUB_PATH),
    'sitemap.xml must not contain /ads/ entries'
  );
}

// ── Variant-specific export checks ──
if (variant === 'io') {
  assert(
    !fs.existsSync(adsDir),
    'io build must not output any /ads/ pages, found out/ads/'
  );
  verifySitemap();
  console.log('ADS verification passed: io build ships no /ads/ surface');
  process.exit(0);
}

const exported = listExportedAdsFiles();
const exportedSlugs = exported
  .map((filePath) => path.relative(adsDir, filePath).split(path.sep).join('/').replace(/\.html$/, ''))
  .sort();
const expectedSlugs = registeredPages.map((page) => page.slug).sort();

assert(
  JSON.stringify(exportedSlugs) === JSON.stringify(expectedSlugs),
  `cn/preview build must export exactly the ${EXPECTED_ADS_PAGE_COUNT} registered /ads/ pages; found: ${exportedSlugs.join(', ') || 'none'}`
);

for (const page of registeredPages) {
  verifyExportedAdsPage(page, path.join(adsDir, `${page.slug}.html`));
}

// ── Four-way consistency audit: 词 ↔ 广告标题 ↔ H1 ↔ 最终地址 ──
for (const page of registeredPages) {
  const ops = opsBySlug.get(page.slug);
  assert(
    ops.keywordGroup === page.keywordGroup,
    `/ads/${page.slug}: keyword group differs between pages.ts and ad-ops.json`
  );
  assert(
    Array.isArray(ops.adTitles) && ops.adTitles.length === 3 && ops.adTitles.every((t) => t.trim()),
    `/ads/${page.slug}: ad-ops.json must carry 3 ad titles`
  );
  assert(
    keywordTitleHeadlineAligned(page.keywordGroup, ops.adTitles[0], page.h1),
    `/ads/${page.slug}: keyword, ad title 1, and H1 must share a visible topic strand (词↔标题↔H1)`
  );
  assert(
    Array.isArray(ops.descriptions) && ops.descriptions.length === 2 && ops.descriptions.every((d) => d.trim()),
    `/ads/${page.slug}: ad-ops.json must carry 2 descriptions`
  );
  assert(typeof ops.spendCny === 'number', `/ads/${page.slug}: spendCny must be numeric`);

  const expectedFinalUrl = opsRegistry.finalUrlTemplate.replaceAll('{slug}', page.slug);
  assert(
    ops.finalUrl === expectedFinalUrl,
    `/ads/${page.slug}: final URL must follow the campaign template (${ops.finalUrl})`
  );
  assert(
    ops.displayUrl === `fastgpt.cn/ads/${page.slug}`,
    `/ads/${page.slug}: display URL must match the landing path`
  );
}

verifySitemap();

console.log(`ADS verification passed: ${registeredPages.length} /ads/ pages verified for the ${variant} build`);
