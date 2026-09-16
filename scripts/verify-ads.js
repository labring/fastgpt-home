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
const zhDictionary = JSON.parse(fs.readFileSync(path.join(root, 'src/locales/zh.json'), 'utf8'));
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
  // The header/footer are the homepage components verbatim (ADR 0013
  // amendment); their zh dictionary copy must render on every ads page.
  for (const navLink of zhDictionary.links) {
    assert(
      html.includes(navLink.label),
      `${label}: homepage navbar link "${navLink.label}" missing`
    );
  }
  assert(
    html.includes(zhDictionary.Home.navCta.consult),
    `${label}: homepage navbar consult CTA missing`
  );
  assert(
    html.includes(zhDictionary.Home.footer.tagline),
    `${label}: homepage footer tagline missing`
  );
  assert(
    html.includes(
      zhDictionary.Home.footer.copyright.replace('{year}', String(new Date().getFullYear()))
    ),
    `${label}: homepage footer copyright missing`
  );

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
  // No SEO alternate <link> tags; the homepage navbar's language-switch
  // anchors carry a hreflang attribute and are required chrome (ADR 0013
  // amendment), so the check must stay scoped to <link> elements.
  assert(!/<link\b[^>]*hreflang=/i.test(raw), `${label}: hreflang link must not be emitted`);
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
      // The reading rows carry a decorative arrow inside the anchor, so the
      // label is the anchor's own leading text rather than its last child.
      new RegExp(`href="${escapeRegExp(link.url)}"[^>]*>${escapeRegExp(link.label)}`).test(html),
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

  // Per-page comparison table: a real <table> whose cells and provenance line
  // all come from the registry, so a paid visitor can read the source inline.
  if (page.comparisonTable) {
    const table = page.comparisonTable;
    assert(/<table\b/.test(html), `${label}: comparison table element missing`);
    assert(
      /<th\b[^>]*scope="col"[^>]*>对比项/.test(html),
      `${label}: comparison table header row missing`
    );
    for (const row of table.rows) {
      assert(
        new RegExp(`<th\\b[^>]*scope="row"[^>]*>${escapeRegExp(row.dimension)}`).test(html),
        `${label}: comparison table row header "${row.dimension}" missing`
      );
      for (const cell of [row.dify, row.fastgpt]) {
        assert(
          html.includes(cell),
          `${label}: comparison table cell for "${row.dimension}" missing`
        );
      }
    }
    assert(
      html.includes(table.sourceNote) &&
        new RegExp(
          `href="${escapeRegExp(table.sourceUrl)}"[^>]*>${escapeRegExp(table.sourceLabel)}`
        ).test(html),
      `${label}: comparison table source line missing`
    );
    assert(
      table.sourceUrl.startsWith('https://'),
      `${label}: comparison table source must be a public HTTPS URL (${table.sourceUrl})`
    );
  }

  // Capability band: pages carrying their own `why` render that copy and its
  // Dify-side verdicts; the remaining pages keep the shared three cards.
  assert(html.includes('平台能力'), `${label}: capability band badge missing`);
  if (page.why) {
    assert(
      html.includes(page.why.title) && html.includes(page.why.subtitle),
      `${label}: capability band override title/subtitle missing`
    );
    assert(page.why.cards.length === 3, `${label}: capability band must render 3 cards`);
    for (const card of page.why.cards) {
      assert(
        html.includes(card.title) && html.includes(card.body),
        `${label}: capability card "${card.title}" missing`
      );
      if (card.verdict) {
        assert(
          new RegExp(
            `${escapeRegExp(card.title)}[\\s\\S]*?Dify 侧[\\s\\S]*?${escapeRegExp(card.verdict)}`
          ).test(html),
          `${label}: capability card "${card.title}" verdict line missing`
        );
      }
    }
  } else {
    assert(
      html.includes('知识库维护看得见'),
      `${label}: shared capability cards missing`
    );
  }

  // Published-cases band: pages carrying their own `cases` render published
  // customer cases whose cards link at the /customers detail pages; the
  // remaining pages keep the shared three cards.
  assert(
    html.includes(page.cases?.badge ?? '客户案例'),
    `${label}: published-cases band badge missing`
  );
  if (page.cases) {
    assert(
      html.includes(page.cases.subtitle),
      `${label}: published-cases override badge/subtitle missing`
    );
    assert(page.cases.cards.length === 3, `${label}: published cases must render 3 cards`);
    for (const card of page.cases.cards) {
      assert(
        html.includes(card.title) && html.includes(card.metrics) && (!card.org || html.includes(card.org)),
        `${label}: published case card "${card.title}" missing`
      );
      assert(
        new RegExp(`<a\\b[^>]*href="${escapeRegExp(card.url)}"`).test(html),
        `${label}: published case card "${card.title}" must link to ${card.url}`
      );
      assert(
        card.url.startsWith('https://'),
        `${label}: published case link must be a public HTTPS URL (${card.url})`
      );
    }
  } else {
    assert(html.includes('研发知识助手'), `${label}: shared case cards missing`);
  }

  const visibleText = decodeHtml(raw.replace(HTML_COMMENT_HIDDEN, ' ').replace(/<[^>]*>/g, ' '));
  const remainingPlaceholder = visibleText.search(PLACEHOLDER_PATTERN);
  assert(
    remainingPlaceholder === -1,
    `${label}: reader-facing placeholder copy: "${visibleText
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
