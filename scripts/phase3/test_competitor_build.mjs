import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { expectedSlugs } from './validate_competitor_manifest.mjs';
import { validateManifest } from './validate_competitor_manifest.mjs';

const root = process.cwd();
const buildOut = process.env.COMPARE_BUILD_OUT || 'out';
const outRoot = path.isAbsolute(buildOut) ? buildOut : path.join(root, buildOut);
const manifestPath = path.join(root, 'artifacts/phase3/competitor-pages-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const cssPath = path.join(root, 'src/styles/globals.css');
const css = fs.readFileSync(cssPath, 'utf8');
const forbiddenCompetitors = ['Coze', '腾讯元器', '阿里百炼', 'n8n', 'HiAgent'];
const knownLocales = new Set(['en', 'zh', 'zh-hant', 'ja', 'ar', 'vi', 'th', 'id', 'ms']);
const expectedTitles = {
  'dify-vs-fastgpt': 'Dify 与 FastGPT：四种项目的选型分野',
  'self-build-vs-platform': '自研或直接跑开源与用平台怎么选：四组必算成本',
  'ragflow-vs-fastgpt': 'RAGFlow 与 FastGPT：复杂文档与完整链路',
  'maxkb-vs-fastgpt': 'MaxKB 与 FastGPT：采购可预测性与细粒度'
};
const requiredSupportPhrases = {
  'dify-vs-fastgpt': ['原厂支持', '责任矩阵', '故障分级', '恢复目标', '升级回滚责任方'],
  'self-build-vs-platform': ['原厂支持', '覆盖时段与首次响应目标', '安全补丁与版本升级', '故障定位与恢复责任', '首次部署与调试', '支持渠道'],
  'ragflow-vs-fastgpt': ['原厂支持', '责任矩阵', '故障分级', '恢复目标', '升级回滚责任方'],
  'maxkb-vs-fastgpt': ['原厂支持档位', '责任矩阵', '故障分级', '恢复目标', '升级回滚责任方', '次年起的维保是否维持同档服务时间']
};
const pricePattern = /(?:¥|￥|\$)\s*\d|\d+(?:\.\d+)?\s*(?:元|万元|美元|人民币)/i;
const absolutePatterns = [/准确率更高/, /性能更好/, /性能更高/, /更安全/, /更可靠/];
const buildDefaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

function expectedInternalLinkTarget(link) {
  if (link.locale === buildDefaultLocale && link.target.startsWith(`/${link.locale}/`)) {
    return link.target.slice(link.locale.length + 1) || '/';
  }
  return link.target;
}

function resolveHtml(slug) {
  const candidates = [
    path.join(outRoot, 'compare', slug, 'index.html'),
    path.join(outRoot, 'compare', `${slug}.html`)
  ].filter((file) => fs.existsSync(file));
  assert.equal(candidates.length, 1, `Expected exactly one static HTML file for ${slug}`);
  return candidates[0];
}

function textFromHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:amp|lt|gt|quot|#39);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function attr(html, name, value) {
  const pattern = new RegExp(`<[^>]+${name}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i');
  return pattern.test(html);
}

function metaContent(html, key, value) {
  return new RegExp(`<meta[^>]+${key}=["']${value}["'][^>]*content=["'][^"']+["']`, 'i').test(html)
    || new RegExp(`<meta[^>]+content=["'][^"']+["'][^>]+${key}=["']${value}["']`, 'i').test(html);
}

function jsonLdValues(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => {
      try { return JSON.parse(match[1]); } catch { return null; }
    })
    .filter(Boolean);
}

function parseSitemap() {
  const files = [path.join(outRoot, 'sitemap.xml'), path.join(outRoot, 'sitemap-0.xml')].filter((file) => fs.existsSync(file));
  return files.flatMap((file) => [...fs.readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
}

function auditPage(page) {
  const file = resolveHtml(page.slug);
  const html = fs.readFileSync(file, 'utf8');
  const text = textFromHtml(html);
  const errors = [];
  const exemptions = [];
  const canonical = `https://fastgpt.cn/compare/${page.slug}`;
  const expectedTitle = expectedTitles[page.slug];
  if (!html.includes(`<title>${expectedTitle}</title>`)) errors.push('metadata:title');
  if (!metaContent(html, 'name', 'description')) errors.push('metadata:description');
  if (!metaContent(html, 'name', 'keywords')) errors.push('metadata:keywords');
  if (!attr(html, 'property', 'og:type')) errors.push('social:og:type');
  if (!html.includes('content="article"') && !html.includes("content='article'")) errors.push('social:og:type-value');
  if (!metaContent(html, 'name', 'twitter:card')) errors.push('social:twitter');
  if (!html.includes(canonical)) errors.push('seo:canonical');
  const expectedRobots = page.status === 'published' ? 'index, follow' : 'noindex, nofollow';
  if (!html.toLowerCase().includes(expectedRobots)) errors.push('seo:robots');
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push('content:h1-count');
  if ((html.match(/<h2\b/gi) || []).length !== 5) errors.push('content:h2-count');
  if (!html.includes('comparison-hero-copy') || !html.includes('comparison-hero-side')) errors.push('layout:split-hero');
  if (!html.includes('comparison-toc') || (html.match(/id="comparison-section-/g) || []).length !== 5) errors.push('layout:section-navigation');
  if (!html.includes('comparison-table-caption') || !html.includes('comparison-cta')) errors.push('layout:comparison-utility-panels');
  if ((html.match(/data-label=/gi) || []).length < 3) errors.push('responsive:data-label');
  if (!html.includes('comparison-table-capability') || !html.includes('comparison-table-poc') || !html.includes('comparison-table-tco')) errors.push('content:table-kinds');
  if (!html.includes('事实来源') || !html.includes('核验日期') || !html.includes('版本与套餐') || !html.includes('更新记录')) errors.push('content:source-footer');
  for (const phrase of requiredSupportPhrases[page.slug] || []) {
    if (!text.includes(phrase)) errors.push(`content:support-dimension:${phrase}`);
  }
  for (const link of page.internalLinks || []) {
    const target = expectedInternalLinkTarget(link);
    if (!html.includes(`href="${target}"`) && !html.includes(`href='${target}'`)) errors.push(`link:${target}`);
  }
  if (!html.includes(page.asset.path)) errors.push('asset:page-image');
  if (page.status === 'preview' && !text.includes('预览页面')) errors.push('state:preview-marker');
  for (const forbidden of forbiddenCompetitors) if (text.includes(forbidden)) errors.push(`content:out-of-scope:${forbidden}`);
  if (pricePattern.test(text)) errors.push('content:price-value');
  for (const pattern of absolutePatterns) {
    if (pattern.test(text)) {
      const match = text.match(new RegExp(`.{0,24}${pattern.source}.{0,24}`));
      const context = match?.[0] || '';
      if (/不主张|不写|不声明|不等于|不得/.test(context)) exemptions.push({ pattern: pattern.source, context });
      else errors.push(`content:unsupported-claim:${pattern.source}`);
    }
  }
  const schemas = jsonLdValues(html);
  const article = schemas.find((schema) => schema['@type'] === 'Article');
  const breadcrumb = schemas.find((schema) => schema['@type'] === 'BreadcrumbList');
  if (!article) errors.push('schema:Article');
  if (!breadcrumb) errors.push('schema:BreadcrumbList');
  if (schemas.some((schema) => schema['@type'] === 'FAQPage')) errors.push('schema:FAQPage-forbidden');
  if (article && (!article.headline || !article.description || !article.image || !article.inLanguage || !article.author || !article.publisher || !article.mainEntityOfPage || !article.dateModified)) errors.push('schema:Article-fields');
  if (breadcrumb && breadcrumb.itemListElement?.length !== 2) errors.push('schema:breadcrumb-depth');
  return { slug: page.slug, file: path.relative(root, file), status: page.status, passed: errors.length === 0, errors, exemptions };
}

const pages = manifest.pages.filter((page) => expectedSlugs.includes(page.slug));
assert.equal(pages.length, expectedSlugs.length, 'Manifest page count must be four');
const results = pages.map(auditPage);
for (const compareRoot of [path.join(outRoot, 'compare'), path.join(outRoot, 'zh', 'compare')]) {
  assert(fs.existsSync(compareRoot), `Missing static comparison route root: ${path.relative(outRoot, compareRoot)}`);
  const actualDirs = fs.readdirSync(compareRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert.deepEqual(actualDirs, [...expectedSlugs].sort(), 'Static comparison output contains an unexpected route set');
}
const localeDirs = fs.existsSync(outRoot) ? fs.readdirSync(outRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name) : [];
for (const locale of localeDirs.filter((value) => knownLocales.has(value) && value !== 'zh')) {
  assert.equal(fs.existsSync(path.join(outRoot, locale, 'compare')), false, `Unexpected ${locale} comparison route`);
}
const sitemap = parseSitemap();
const publishedUrls = pages.filter((page) => page.status === 'published').map((page) => `https://fastgpt.cn/compare/${page.slug}`);
const comparisonSitemap = sitemap.filter((url) => url.includes('/compare/') && !url.includes('/zh/compare/'));
assert.deepEqual(comparisonSitemap.sort(), publishedUrls.sort(), 'Sitemap must contain published comparison URLs only');
assert.ok(
  css.includes('.comparison-table-row') && css.includes('data-label') && css.includes('.comparison-toc'),
  'Responsive comparison CSS contract is missing'
);

const failures = results.flatMap((result) => result.errors.map((reason) => ({ slug: result.slug, gate: 'build', reason, evidencePath: result.file })));
const report = {
  id: 'competitor-pages-build-report',
  generatedOn: new Date().toISOString(),
  buildOut: path.relative(root, outRoot),
  passed: failures.length === 0,
  expectedPageCount: expectedSlugs.length,
  actualPageCount: results.length,
  pages: results,
  comparisonSitemap,
  blockingFailures: failures
};
fs.writeFileSync(path.join(root, 'artifacts/phase3/competitor-pages-build-report.json'), `${JSON.stringify(report, null, 2)}\n`);

for (const page of manifest.pages) {
  const result = results.find((item) => item.slug === page.slug);
  if (result) page.gates.contentAudit = result.passed ? 'passed' : 'failed';
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
validateManifest({ write: true });

if (failures.length) {
  console.error(`Phase 3 build audit failed with ${failures.length} blocking failures.`);
  for (const failure of failures) console.error(`${failure.slug}: ${failure.reason}`);
  process.exitCode = 1;
} else {
  console.log(`Phase 3 build audit passed: ${results.length} comparison pages, ${comparisonSitemap.length} published sitemap entries.`);
}
