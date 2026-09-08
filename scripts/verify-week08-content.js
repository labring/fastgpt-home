#!/usr/bin/env node
/** Verify the Week08 publication contract against authored content, exports, or production HTTP. */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { resolveStaticHtml } = require('./lib/technical-export');
const { resolveSiteVariant } = require('./lib/site-variant');
const publication = require('../src/content/week08/publication.json');
const reference = require('../src/content/week08/reference-snapshot.json');
const corrections = require('../src/content/week08/publication-corrections.json');
const returns = require('../src/content/tech-center/stage-returns.json');
const guides = require('../src/content/guides/registry.json').entries;
const technical = require('../src/components/tech-center/entries.json');
const ROOT = path.resolve(__dirname, '..');
const hosts = { zh: 'https://fastgpt.cn', en: 'https://fastgpt.io' };
const key = (page) => `/${page.locale}${page.route}`;
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const digest = (value) => crypto.createHash('sha256').update(value).digest('hex');
function document(page) {
  const slug = page.route.split('/').at(-1);
  return read(
    page.family === 'guide'
      ? `src/content/guides/${page.locale}/${slug}.${page.locale}.md`
      : `src/content/tech-center${key(page)}.md`
  );
}
function verifySource() {
  assert.equal(publication.pages.length, 38, 'Week08 page cardinality');
  assert.equal(new Set(publication.pages.map(key)).size, 38, 'Duplicate Week08 identity');
  assert.equal(publication.pages.filter((page) => page.family === 'guide').length, 20);
  assert.equal(publication.pages.filter((page) => page.route.startsWith('/guide/')).length, 32);
  const owners = new Set(
    guides.flatMap((entry) => ['zh', 'en'].map((locale) => `/${locale}/guide/${entry.slug}`))
  );
  for (const entry of technical) {
    assert(!owners.has(entry.slug), `Duplicate content owner: ${entry.slug}`);
    owners.add(entry.slug);
  }
  const technicalKeys = new Set(technical.map((entry) => entry.slug));
  for (const locale of ['zh', 'en']) {
    assert.equal(publication.pages.filter((page) => page.locale === locale).length, 19);
    const search = JSON.parse(
      read(`public/tech-center/search-index${locale === 'en' ? '.en' : ''}.json`)
    );
    for (const page of publication.pages.filter((page) => page.locale === locale)) {
      assert(owners.has(key(page)), `Unpublished incoming page: ${key(page)}`);
      assert.equal(
        technicalKeys.has(key(page)),
        page.family === 'technical',
        `Wrong content index: ${key(page)}`
      );
      if (page.family === 'technical')
        assert(
          search.some((entry) => entry.publicPath === page.route && entry.locale === locale),
          `Missing search entry: ${key(page)}`
        );
      const text = document(page);
      const body = text.replace(/^(?:<!--[\s\S]*?-->|---[\s\S]*?\n---)/, '');
      assert(
        !/核验日|Verified 2026|no list in this round|本轮未建清单/.test(body),
        `Internal publication text: ${key(page)}`
      );
      for (const link of body.matchAll(/\]\((\/[^)]+)\)/g)) {
        const target = link[1].split('#')[0];
        assert(
          owners.has(target) || /^\/(zh|en)\/(tech-center|contact|start|price)$/.test(target),
          `${key(page)}: unresolved internal link ${target}`
        );
      }
      if (page.route.startsWith('/reference/')) {
        assert(
          body.includes(`https://github.com/labring/FastGPT/`),
          `Missing public citation: ${key(page)}`
        );
        assert(body.includes(reference.commit), `Unversioned citation: ${key(page)}`);
        if (page.route.includes('env-variables'))
          assert.equal([...body.matchAll(/^\| `[A-Z][A-Z0-9_]+` \|/gm)].length, 137);
        if (page.route.includes('error-codes')) {
          const moduleBodies = [
            ...body.matchAll(/^## (\w+) (?:module|模块)[^\n]*\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)
          ];
          assert.equal(moduleBodies.length, 15, 'Error module count');
          assert.equal(
            moduleBodies.reduce(
              (count, match) => count + [...match[2].matchAll(/^\| `?\d+`? \|/gm)].length,
              0
            ),
            124,
            'Error code count'
          );
        }
        if (page.route.includes('workflow-nodes')) {
          const rows = body
            .split('\n')
            .filter((line) => /^\| `\w+` \|/.test(line) && line.split('|').length === 8);
          assert.equal(rows.length, 34, 'Node table row count');
          for (const node of reference.nodes) {
            const row = rows.find((row) => row.startsWith(`| \`${node.type}\` |`));
            assert(
              row?.includes(`| ${node.inputs} / ${node.required} | ${node.outputs} |`),
              `Node parameter drift: ${node.type}`
            );
          }
        }
      }
    }
    for (const [stage, expected] of Object.entries(publication.stages[locale])) {
      const target = `/${locale}/guide/${stage}`;
      assert(technicalKeys.has(target), `Unresolved stage target: ${target}`);
      const sources = Object.keys(returns).filter((source) => returns[source] === target);
      assert.equal(sources.length, expected, `${target}: return count`);
      const body = document({ locale, route: `/guide/${stage}`, family: 'technical' });
      assert(
        body.includes(`](/${locale}/guide/deployment-issue-landscape)`),
        `${target}: missing landscape link`
      );
      for (const source of sources) {
        assert(technicalKeys.has(source), `Unresolved return source: ${source}`);
        assert(source.startsWith(`/${locale}/`), `Cross-locale return source: ${source}`);
        assert(body.includes(`](${source})`), `${target}: missing article link ${source}`);
        const baseline = publication.preserved[source];
        assert(baseline, `Missing preservation evidence: ${source}`);
        assert.equal(
          digest(fs.readFileSync(path.join(ROOT, baseline.file))),
          baseline.sha256,
          `Existing content changed: ${source}`
        );
      }
    }
  }
  assert.equal(Object.keys(returns).length, 797);
  for (const correction of corrections) {
    const body = document({
      locale: correction.locale,
      route: `/guide/${correction.slug}`,
      family: 'guide'
    });
    for (const { after } of correction.replacements)
      assert(
        body.includes(after),
        `${correction.locale}/${correction.slug}: corrected operational guidance drift`
      );
    for (const source of correction.sources)
      assert(body.includes(`](${source})`), `${correction.slug}: missing correction evidence`);
  }
  return {
    pages: 38,
    returns: 797,
    locales: { zh: 19, en: 19 },
    reference: { variables: 137, codes: 124, modules: 15, nodes: 34 }
  };
}
function visibleHtml(html) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
}
function attrs(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [
      match[1].toLowerCase(),
      match[2].replace(/&amp;/g, '&')
    ])
  );
}
function anchors(html) {
  return [...visibleHtml(html).matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({
    ...attrs(match[1]),
    text: match[2].replace(/<[^>]+>/g, '')
  }));
}
function routeFor(locale, route, variant) {
  return variant === 'preview' ? `/${locale}${route}` : route;
}
function verifyPage(html, page, variant) {
  const canonical = hosts[page.locale] + page.route;
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attrs(match[0]));
  assert.deepEqual(
    links.filter((link) => link.rel === 'canonical').map((link) => link.href),
    [canonical],
    `${canonical}: canonical`
  );
  assert.equal((visibleHtml(html).match(/<h1\b/g) || []).length, 1, `${canonical}: H1 count`);
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => attrs(match[0]));
  assert(
    meta.some((tag) => tag.name === 'description' && tag.content.length >= 30),
    `${canonical}: description`
  );
  assert(
    meta.some((tag) => tag.property === 'og:url' && tag.content === canonical),
    `${canonical}: social URL`
  );
  assert(
    meta.some(
      (tag) =>
        tag.name === 'robots' &&
        tag.content === (variant === 'preview' ? 'noindex, nofollow' : 'index, follow')
    ),
    `${canonical}: robots`
  );
  const counterparts = publication.pages.filter((candidate) => candidate.route === page.route);
  const expected = Object.fromEntries(
    counterparts.map((candidate) => [
      candidate.locale === 'zh' ? 'zh-CN' : 'en',
      hosts[candidate.locale] + page.route
    ])
  );
  if (counterparts.some((candidate) => candidate.locale === 'en'))
    expected['x-default'] = hosts.en + page.route;
  assert.deepEqual(
    Object.fromEntries(
      links
        .filter((link) => link.rel === 'alternate' && link.hreflang)
        .map((link) => [link.hreflang, link.href])
    ),
    expected,
    `${canonical}: published alternates`
  );
  const schemas = [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)
  ].flatMap((match) => {
    const node = JSON.parse(match[1]);
    return node['@graph'] || [node];
  });
  const article = schemas.find((node) => ['Article', 'TechArticle'].includes(node['@type']));
  assert(
    article &&
      article.mainEntityOfPage?.['@id'] === canonical &&
      (article.url === undefined || article.url === canonical) &&
      article.datePublished === publication.date &&
      article.dateModified === publication.date,
    `${canonical}: article schema and dates`
  );
  assert(
    schemas.some((node) => node['@type'] === 'BreadcrumbList'),
    `${canonical}: breadcrumbs`
  );
  if (page.family === 'guide')
    assert(
      html.includes(`dateTime="${publication.date}"`) ||
        html.includes(`datetime="${publication.date}"`),
      `${canonical}: modified date`
    );
  for (const link of anchors(html).filter((link) => link.href?.startsWith('#')))
    assert(
      html.includes(`id="${link.href.slice(1)}"`),
      `${canonical}: unresolved heading ${link.href}`
    );
  const body = document(page).replace(/^(?:<!--[\s\S]*?-->|---[\s\S]*?\n---)/, '');
  for (const match of body.matchAll(/\]\(\/(zh|en)(\/[^)]+)\)/g)) {
    if (/^\/(contact|start)$/.test(match[2])) continue;
    const expected = routeFor(match[1], match[2], variant);
    assert(
      anchors(html).some((link) => link.href === expected),
      `${canonical}: missing visible link ${expected}`
    );
  }
}
function verifyReturn(html, source, target, variant) {
  const [locale, ...segments] = target.slice(1).split('/');
  const expected = routeFor(locale, '/' + segments.join('/'), variant);
  const tags = [...visibleHtml(html).matchAll(/<a\b[^>]*data-stage-return[^>]*>/g)];
  assert.equal(tags.length, 1, `${source}: expected one designated stage return`);
  assert.equal(attrs(tags[0][0]).href, expected, `${source}: stage return destination`);
}
function verifyExport(variant, outDir = path.join(ROOT, 'out')) {
  const load = (route) => {
    const file = resolveStaticHtml(outDir, route);
    assert(file, `Missing export: ${route}`);
    return fs.readFileSync(file, 'utf8');
  };
  const locales = variant === 'preview' ? ['zh', 'en'] : [variant === 'cn' ? 'zh' : 'en'];
  const sitemap =
    variant === 'preview' ? '' : fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8');
  for (const page of publication.pages.filter((page) => locales.includes(page.locale))) {
    verifyPage(load(routeFor(page.locale, page.route, variant)), page, variant);
    const index = routeFor(
      page.locale,
      page.family === 'guide' ? '/guide' : '/tech-center',
      variant
    );
    assert(
      anchors(load(index)).some((link) => link.href === routeFor(page.locale, page.route, variant)),
      `${key(page)}: index discovery`
    );
    if (variant !== 'preview')
      assert.equal(
        sitemap.split(`<loc>${hosts[page.locale]}${page.route}</loc>`).length - 1,
        1,
        `${key(page)}: sitemap membership`
      );
  }
  for (const [source, target] of Object.entries(returns)) {
    const locale = source.split('/')[1];
    if (!locales.includes(locale)) continue;
    verifyReturn(
      load(routeFor(locale, source.replace(/^\/(zh|en)/, ''), variant)),
      source,
      target,
      variant
    );
  }
  return {
    variant,
    pages: locales.length * 19,
    returns: variant === 'preview' ? 797 : variant === 'cn' ? 447 : 350
  };
}
async function verifyLive(variant) {
  assert(['cn', 'io'].includes(variant), 'Live verification requires cn or io');
  const locale = variant === 'cn' ? 'zh' : 'en';
  const origin = hosts[locale];
  const checks = publication.pages
    .filter((page) => page.locale === locale)
    .map((page) => ({ route: page.route, check: (html) => verifyPage(html, page, variant) }));
  for (const [source, target] of Object.entries(returns).filter(([source]) =>
    source.startsWith(`/${locale}/`)
  ))
    checks.push({
      route: source.replace(/^\/(zh|en)/, ''),
      check: (html) => verifyReturn(html, source, target, variant)
    });
  for (const family of ['guide', 'technical'])
    checks.push({
      route: family === 'guide' ? '/guide' : '/tech-center',
      check: (html) => {
        for (const page of publication.pages.filter(
          (page) => page.locale === locale && page.family === family
        ))
          assert(
            anchors(html).some((link) => link.href === page.route),
            `${page.route}: production index discovery`
          );
      }
    });
  const failures = [];
  let index = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (index < checks.length) {
        const item = checks[index++];
        try {
          const response = await fetch(origin + item.route, {
            redirect: 'manual',
            signal: AbortSignal.timeout(30000)
          });
          assert.equal(response.status, 200, `HTTP ${response.status}`);
          item.check(await response.text());
        } catch (error) {
          failures.push({ route: item.route, error: error.message });
        }
      }
    })
  );
  const result = { variant, checkedAt: new Date().toISOString(), checked: checks.length, failures };
  fs.mkdirSync(path.join(ROOT, '.release-artifacts'), { recursive: true });
  fs.writeFileSync(
    path.join(ROOT, `.release-artifacts/week08-live-${variant}.json`),
    JSON.stringify(result, null, 2) + '\n'
  );
  assert.equal(
    failures.length,
    0,
    `Week08 ${variant}: ${failures.length} failed live checks; see release artifact`
  );
  return result;
}
async function main(argv = process.argv.slice(2)) {
  let result;
  if (argv.length === 0) result = verifySource();
  else if (argv[0] === '--export' && argv.length === 1) result = verifyExport(resolveSiteVariant());
  else if (argv[0] === '--live' && argv.length === 2) result = await verifyLive(argv[1]);
  else throw new Error('Usage: node scripts/verify-week08-content.js [--export | --live cn|io]');
  console.log(`[verify-week08-content] ${JSON.stringify(result)}`);
}
if (require.main === module)
  main().catch((error) => {
    console.error(`[verify-week08-content] ${error.message}`);
    process.exitCode = 1;
  });
module.exports = { verifySource, verifyExport, verifyPage, verifyReturn };
