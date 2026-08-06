const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const sharp = require('sharp');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const baseUrl = (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io').replace(/\/$/, '');
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
const domain = baseUrl.includes('.cn') ? 'cn' : 'io';
const maxHeroBytes = 300 * 1024;
const maxSolutionBytes = 250 * 1024;
const maxInitialJavaScriptGzipBytes = 260 * 1024;
const englishTitle = 'FastGPT - Enterprise AI Agent Builder & Open Source RAG';
const chineseDescription =
  'FastGPT 是开源的企业级 AI 智能体构建平台，提供可视化工作流、企业知识库、RAG 检索、模型接入与应用编排能力，帮助团队快速构建、发布和管理安全可控的生产级 AI 应用，支持云服务与私有化部署，已服务全球 50 万+ 用户。';
const chineseFaqDescription =
  '企业日益重视 RAG（检索增强生成）解决方案，因为它能将大语言模型连接到实时、可信的企业知识库，显著提升回答的准确性、可靠性和领域适配能力，同时强化数据安全与治理，并以更低成本持续更新业务知识，帮助企业构建可追溯、可维护的智能问答与知识服务。';
const faqId = 'Why-are-enterprises-paying-more';

function resolveHtml(route) {
  const relativeRoute = route.replace(/^\/|\/$/g, '');
  const candidates = relativeRoute
    ? [path.join(outDir, `${relativeRoute}.html`), path.join(outDir, relativeRoute, 'index.html')]
    : [path.join(outDir, 'index.html')];
  const htmlPath = candidates.find((candidate) => fs.existsSync(candidate));

  assert(htmlPath, `Missing static HTML for ${route}`);
  return fs.readFileSync(htmlPath, 'utf8');
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\s+[^>]*>`, 'g')) || [];
}

function getAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`\\s${attribute}="([^"]*)"`, 'i'));
  return match?.[1];
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, codePoint) =>
      String.fromCodePoint(Number.parseInt(codePoint, 16))
    )
    .replace(/&#([0-9]+);/g, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 10)))
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function findTag(html, tagName, attribute, value) {
  return getTags(html, tagName).find((tag) => getAttribute(tag, attribute) === value);
}

function getMetaContent(html, attribute, value) {
  const tag = findTag(html, 'meta', attribute, value);
  assert(tag, `Missing meta ${attribute}="${value}"`);
  return getAttribute(tag, 'content');
}

function verifyCanonical(html, expectedUrl) {
  const tag = findTag(html, 'link', 'rel', 'canonical');
  const actualUrl = getAttribute(tag || '', 'href');

  assert(tag, `Missing canonical for ${expectedUrl}`);
  assert(actualUrl, `Canonical is missing an href for ${expectedUrl}`);
  assert.equal(
    new URL(actualUrl).href,
    new URL(expectedUrl).href,
    `Unexpected canonical for ${expectedUrl}`
  );
}

function verifyRobots(html, route) {
  const robots = getMetaContent(html, 'name', 'robots');
  assert.equal(robots, 'index, follow', `${route} must explicitly allow indexing and following`);
}

function verifyDescriptionLength(description, label) {
  assert(
    description.length >= 100 && description.length <= 160,
    `${label} must contain 100-160 characters, received ${description.length}`
  );
}

function verifyRootMetadata() {
  const rootHtml = resolveHtml('/');
  const localizedHtml = resolveHtml(`/${defaultLocale}`);
  const expectedRootTitle =
    defaultLocale === 'zh' ? 'FastGPT - 企业级 AI 智能体构建平台 | 开源 RAG 系统' : englishTitle;
  const expectedSocialTitle =
    defaultLocale === 'zh'
      ? 'FastGPT - 企业级 AI 智能体构建平台'
      : 'FastGPT - Enterprise AI Agent Builder';
  const expectedOgLocale = defaultLocale === 'zh' ? 'zh_CN' : 'en_US';
  const titleMatch = rootHtml.match(/<title>([^<]+)<\/title>/);

  assert(titleMatch, 'Root page is missing a title');
  assert.equal(
    decodeHtmlEntities(titleMatch[1]),
    expectedRootTitle,
    'Root page title is incorrect'
  );
  verifyCanonical(rootHtml, `${baseUrl}/`);
  verifyCanonical(localizedHtml, `${baseUrl}/${defaultLocale}`);
  verifyCanonical(resolveHtml('/en'), `${baseUrl}/en`);
  verifyCanonical(resolveHtml('/zh'), `${baseUrl}/zh`);
  verifyCanonical(resolveHtml('/faq'), `${baseUrl}/faq`);
  verifyCanonical(resolveHtml(`/faq/${faqId}`), `${baseUrl}/faq/${faqId}`);
  verifyCanonical(resolveHtml(`/${defaultLocale}/faq`), `${baseUrl}/faq`);
  verifyCanonical(resolveHtml(`/${defaultLocale}/faq/${faqId}`), `${baseUrl}/faq/${faqId}`);

  for (const [route, html] of [
    ['/', rootHtml],
    [`/${defaultLocale}`, localizedHtml],
    ['/faq', resolveHtml('/faq')],
    ['/en/faq', resolveHtml('/en/faq')],
    ['/zh/faq', resolveHtml('/zh/faq')]
  ]) {
    verifyRobots(html, route);
  }

  assert(
    getTags(rootHtml, 'link').some(
      (tag) =>
        getAttribute(tag, 'rel') === 'alternate' &&
        getAttribute(tag, 'hreflang') === 'x-default' &&
        getAttribute(tag, 'href') === `${baseUrl}/en`
    ),
    'Root page is missing the x-default alternate'
  );
  assert.equal(getMetaContent(rootHtml, 'property', 'og:title'), expectedSocialTitle);
  assert.equal(getMetaContent(rootHtml, 'property', 'og:locale'), expectedOgLocale);
  assert.equal(getMetaContent(rootHtml, 'property', 'og:image'), `${baseUrl}/opengraph-image.png`);
  assert.equal(getMetaContent(rootHtml, 'name', 'twitter:title'), expectedSocialTitle);
  assert.equal(getMetaContent(rootHtml, 'name', 'twitter:image'), `${baseUrl}/twitter-image.png`);
  assert(rootHtml.includes('"@type":"Organization"'), 'Root page is missing Organization JSON-LD');
  assert(rootHtml.includes('"@type":"FAQPage"'), 'Root page is missing FAQPage JSON-LD');
  assert(
    !rootHtml.includes("window.location.replace('/' + target"),
    'Root page must remain on the canonical root URL'
  );

  if (defaultLocale === 'zh') {
    const description = getMetaContent(rootHtml, 'name', 'description');
    assert.equal(description, chineseDescription, 'Chinese root description is incorrect');
    verifyDescriptionLength(description, 'Chinese root description');
  }

  return rootHtml;
}

function verifyTargetCopy() {
  const englishHtml = resolveHtml('/en');
  const englishTitleMatch = englishHtml.match(/<title>([^<]+)<\/title>/);
  const faqHtml = resolveHtml(defaultLocale === 'zh' ? `/faq/${faqId}` : `/zh/faq/${faqId}`);
  const faqDescription = getMetaContent(faqHtml, 'name', 'description');

  assert(englishTitleMatch, 'English homepage is missing a title');
  assert.equal(
    decodeHtmlEntities(englishTitleMatch[1]),
    englishTitle,
    'English homepage title is incorrect'
  );
  assert.equal(englishTitle.length, 55, 'English homepage title must contain 55 characters');
  assert.equal(faqDescription, chineseFaqDescription, 'Chinese FAQ description is incorrect');
  verifyDescriptionLength(faqDescription, 'Chinese FAQ description');
}

async function verifyHeroAssets(rootHtml) {
  const heroVariants = [
    ['io', 'en'],
    ['io', 'zh'],
    ['cn', 'en'],
    ['cn', 'zh']
  ];

  for (const [assetDomain, language] of heroVariants) {
    const basename = `kv-border-stroke-bold-${assetDomain}-${language}`;
    const sourcePath = path.join(rootDir, 'public', 'images', 'hero', `${basename}.webp`);
    const exportedPath = path.join(outDir, 'images', 'hero', `${basename}.webp`);
    const oldPngPath = path.join(rootDir, 'public', 'images', 'hero', `${basename}.png`);
    const metadata = await sharp(sourcePath).metadata();
    const sourceSize = fs.statSync(sourcePath).size;

    assert.equal(metadata.width, 3600, `${basename}.webp width must be 3600`);
    assert.equal(metadata.height, 1944, `${basename}.webp height must be 1944`);
    assert(sourceSize < maxHeroBytes, `${basename}.webp exceeds the 300 KiB budget`);
    assert(fs.existsSync(exportedPath), `Missing exported ${basename}.webp`);
    assert.equal(
      fs.statSync(exportedPath).size,
      sourceSize,
      `Exported ${basename}.webp must match the source asset`
    );
    assert(!fs.existsSync(oldPngPath), `Superseded ${basename}.png still exists`);
  }

  const expectedAsset = `/images/hero/kv-border-stroke-bold-${domain}-${
    defaultLocale === 'zh' || defaultLocale === 'zh-hant' ? 'zh' : 'en'
  }.webp`;
  assert(
    rootHtml.includes(expectedAsset) || rootHtml.includes(encodeURIComponent(expectedAsset)),
    `Root page must request ${expectedAsset}`
  );
  assert(
    !getTags(rootHtml, 'link').some(
      (tag) =>
        getAttribute(tag, 'rel') === 'preload' &&
        getAttribute(tag, 'as') === 'image' &&
        (getAttribute(tag, 'href') || '').includes('kv-border-stroke-bold')
    ),
    'Hero image must not compete with critical text and styles from the document head'
  );
  assert(
    !rootHtml.includes(`kv-border-stroke-bold-${domain}-en.png`) &&
      !rootHtml.includes(`kv-border-stroke-bold-${domain}-zh.png`),
    'Root page references a superseded Hero PNG'
  );
}

async function verifySolutionAssets(rootHtml) {
  const assetsDir = path.join('images', 'home', 'solutions', 'sol-i18n');

  for (const language of ['en', 'zh']) {
    for (const index of [1, 2, 3, 4]) {
      const basename = `sol${index}-${language}`;
      const sourcePath = path.join(rootDir, 'public', assetsDir, `${basename}.webp`);
      const exportedPath = path.join(outDir, assetsDir, `${basename}.webp`);
      const oldPngPath = path.join(rootDir, 'public', assetsDir, `${basename}.png`);
      const metadata = await sharp(sourcePath).metadata();
      const sourceSize = fs.statSync(sourcePath).size;

      assert.equal(metadata.width, 3708, `${basename}.webp width must be 3708`);
      assert.equal(metadata.height, 2784, `${basename}.webp height must be 2784`);
      assert(sourceSize < maxSolutionBytes, `${basename}.webp exceeds the 250 KiB budget`);
      assert(fs.existsSync(exportedPath), `Missing exported ${basename}.webp`);
      assert.equal(
        fs.statSync(exportedPath).size,
        sourceSize,
        `Exported ${basename}.webp must match the source asset`
      );
      assert(!fs.existsSync(oldPngPath), `Superseded ${basename}.png still exists`);
    }
  }

  const language = defaultLocale === 'zh' || defaultLocale === 'zh-hant' ? 'zh' : 'en';
  for (const index of [1, 2, 3, 4]) {
    const expectedAsset = `/images/home/solutions/sol-i18n/sol${index}-${language}.webp`;
    assert(
      rootHtml.includes(expectedAsset) || rootHtml.includes(encodeURIComponent(expectedAsset)),
      `Root page must reference ${expectedAsset}`
    );

    const expectedCaseAsset = `/images/home/cases/cases-i18n/case${index}-${language}.png`;
    assert(
      rootHtml.includes(expectedCaseAsset) ||
        rootHtml.includes(encodeURIComponent(expectedCaseAsset)),
      `Root page must reference ${expectedCaseAsset}`
    );
  }
}

function verifyInitialJavaScript(rootHtml) {
  const scriptSources = new Set(
    getTags(rootHtml, 'script')
      .map((tag) => getAttribute(tag, 'src'))
      .filter((source) => source?.includes('/_next/') && source.includes('.js'))
  );
  let gzipBytes = 0;

  for (const source of scriptSources) {
    const pathname = new URL(source, baseUrl).pathname;
    const scriptPath = path.join(outDir, pathname.replace(/^\//, ''));

    assert(fs.existsSync(scriptPath), `Missing initial JavaScript asset ${pathname}`);
    const script = fs.readFileSync(scriptPath);
    gzipBytes += zlib.gzipSync(script, { level: 9 }).length;
  }

  assert(scriptSources.size > 0, 'Root page has no initial JavaScript assets');
  assert(
    gzipBytes <= maxInitialJavaScriptGzipBytes,
    `Initial JavaScript is ${(gzipBytes / 1024).toFixed(1)} KiB gzip, budget is 260 KiB`
  );

  const externalScriptPreloads = getTags(rootHtml, 'link').filter((tag) => {
    const href = getAttribute(tag, 'href') || '';
    return getAttribute(tag, 'rel') === 'preload' && /^https?:\/\//.test(href);
  });
  assert.equal(externalScriptPreloads.length, 0, 'Analytics scripts must load after page idle');
  const externalScripts = getTags(rootHtml, 'script').filter((tag) =>
    /^https?:\/\//.test(getAttribute(tag, 'src') || '')
  );
  assert.equal(
    externalScripts.length,
    0,
    'Analytics scripts must not render into the initial HTML'
  );

  return gzipBytes;
}

async function main() {
  const rootHtml = verifyRootMetadata();
  verifyTargetCopy();
  await verifyHeroAssets(rootHtml);
  await verifySolutionAssets(rootHtml);
  const initialJavaScriptGzipBytes = verifyInitialJavaScript(rootHtml);

  console.log(
    `P1 verification passed for ${baseUrl}: ${(initialJavaScriptGzipBytes / 1024).toFixed(
      1
    )} KiB initial JavaScript gzip`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
