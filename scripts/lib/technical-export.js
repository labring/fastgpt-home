const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function resolveStaticHtml(outDir, route) {
  const relative = route.replace(/^\/+|\/+$/g, '');
  return [path.join(outDir, `${relative}.html`), path.join(outDir, relative, 'index.html')].find(
    (filePath) => fs.existsSync(filePath)
  );
}

function readSitemapUrls(outDir) {
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return [];
  return [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1]
  );
}

// Match the rendered Markdown link syntax, excluding metadata and code examples.
function bodyLinks(markdown) {
  const body = markdown
    .replace(/^(?:<!--[\s\S]*?-->|---[\s\S]*?\n---)/, '')
    .replace(/^```[^\n]*\n[\s\S]*?^```[^\n]*$/gm, '')
    .replace(/`[^`\n]+`/g, '');
  return [...body.matchAll(/(?<!!)\[[^\]]+\]\((\/(?!\/)[^)]+)\)/g)].map((match) => match[1]);
}

function routeFor(locale, route, variant) {
  return variant === 'preview' ? `/${locale}${route}` : route;
}

function visibleHtml(html) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
}

function verifyBodyLinks(html, body, variant, outDir) {
  const anchors = [...visibleHtml(html).matchAll(/<a\b[^>]*\shref="([^"]*)"[^>]*>/gi)].map(
    (match) => match[1].replaceAll('&amp;', '&')
  );
  for (const link of bodyLinks(body)) {
    if (/^\/(?:zh\/|en\/)?(contact|start)$/.test(link)) continue;
    const localized = link.match(/^\/(zh|en)(\/.*)$/);
    const expected = localized ? routeFor(localized[1], localized[2], variant) : link;
    assert(anchors.includes(expected), `Missing visible link ${expected}`);
    if (outDir) {
      const route = expected.split(/[?#]/)[0];
      assert(
        resolveStaticHtml(outDir, route) ||
          (fs.existsSync(path.join(outDir, route)) &&
            fs.statSync(path.join(outDir, route)).isFile()),
        `Unresolved internal link ${expected}`
      );
    }
  }
}

function verifyReturn(html, source, target, variant) {
  const tags = visibleHtml(html).match(/<a\b[^>]*\bdata-stage-return(?=[\s=>])[^>]*>/gi) || [];
  assert.equal(
    tags.length,
    target ? 1 : 0,
    `${source}: expected ${target ? 'one' : 'no'} designated stage return`
  );
  if (target) {
    const [, locale, route] = target.match(/^\/(zh|en)(\/.*)$/);
    assert.equal(
      tags[0].match(/\shref="([^"]*)"/i)?.[1],
      routeFor(locale, route, variant),
      `${source}: stage return destination`
    );
  }
}

module.exports = {
  bodyLinks,
  readSitemapUrls,
  resolveStaticHtml,
  routeFor,
  verifyBodyLinks,
  verifyReturn,
  visibleHtml
};
