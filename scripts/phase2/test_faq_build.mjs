#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { extractExportedObject } from './validate_w2_faq.mjs';

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT_DIR = path.resolve(process.env.FAQ_BUILD_OUT || path.join(REPO_ROOT, 'out'));
const baseline = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'artifacts/phase1/faq-source-baseline.json'), 'utf8'));
const english = extractExportedObject(path.join(REPO_ROOT, 'src/faq/en.ts'), 'faq');
const w2 = extractExportedObject(path.join(REPO_ROOT, 'src/faq/w2.ts'), 'faqW2Zh');
const { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } = JSON.parse(
  fs.readFileSync(path.join(REPO_ROOT, 'src/lib/faqMetadata.constants.json'), 'utf8')
);

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

function encodeId(id) {
  return encodeURIComponent(id);
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

function decodeFileId(filePath) {
  const relative = path.relative(OUT_DIR, filePath).split(path.sep);
  const tail = relative.at(-1) === 'index.html' ? relative.at(-2) : relative.at(-1)?.replace(/\.html$/, '');
  if (!tail) return '';
  try {
    return decodeURIComponent(tail);
  } catch {
    return tail;
  }
}

function findFaqFile(lang, id) {
  const files = listFiles(path.join(OUT_DIR, lang, 'faq')).filter((file) => file.endsWith('.html'));
  const exact = files.find((file) => decodeFileId(file) === id);
  if (exact) return { file: exact, caseCollision: false };
  const caseMatches = files.filter((file) => decodeFileId(file).toLowerCase() === id.toLowerCase());
  if (caseMatches.length > 0) return { file: caseMatches[0], caseCollision: true };
  return { file: null, caseCollision: false };
}

function resolveFaqFile(lang, id) {
  const result = findFaqFile(lang, id);
  if (result.file && !result.caseCollision) return result.file;
  if (result.caseCollision) {
    assert.fail(`Case-insensitive static output collision for ${lang}/${id}; exact file is missing`);
  }
  assert.fail(`Missing static HTML for /${lang}/faq/${id}`);
}

function getTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  assert(match, 'Missing title');
  return decodeHtmlEntities(match[1]);
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];
}

function getAttribute(tag, attribute) {
  return tag.match(new RegExp(`\\s${attribute}="([^"]*)"`, 'i'))?.[1];
}

function getMeta(html, attribute, value) {
  const tag = getTags(html, 'meta').find((candidate) => getAttribute(candidate, attribute) === value);
  assert(tag, `Missing meta ${attribute}="${value}"`);
  return decodeHtmlEntities(getAttribute(tag, 'content') || '');
}

function verifyW2Page(lang, source) {
  const route = `/${lang}/faq/${source.slug}`;
  const html = fs.readFileSync(resolveFaqFile(lang, source.slug), 'utf8');
  const title = getTitle(html);
  const description = getMeta(html, 'name', 'description');
  const titleBase = source.title.replace(/\s*(?:[-|｜]\s*)?FastGPT\s*$/i, '').trim();

  assert(title.includes(titleBase), `${route} title lost its source title`);
  assert(description.includes(source.description), `${route} description lost its source description`);
  assert(Array.from(title).length <= TITLE_MAX_LENGTH, `${route} title exceeds ${TITLE_MAX_LENGTH} characters`);
  assert(Array.from(description).length <= DESCRIPTION_MAX_LENGTH, `${route} description exceeds ${DESCRIPTION_MAX_LENGTH} characters`);
  for (const [attribute, value, expected] of [
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description]
  ]) {
    assert.equal(getMeta(html, attribute, value), expected, `${route} ${value} is out of parity`);
  }
  assert(getMeta(html, 'name', 'keywords').length > 0, `${route} is missing keywords`);
  const canonical = getTags(html, 'link').find((tag) => getAttribute(tag, 'rel') === 'canonical');
  assert.equal(getAttribute(canonical, 'href'), `https://fastgpt.cn${route}`, `${route} canonical is not the Chinese domain`);
  assert(html.includes('"@type":"FAQPage"'), `${route} is missing FAQPage JSON-LD`);
  assert(html.includes('"@type":"BreadcrumbList"'), `${route} is missing BreadcrumbList JSON-LD`);
}

function verifyExpectedSet(lang, ids) {
  const exactFiles = new Set();
  for (const id of ids) exactFiles.add(resolveFaqFile(lang, id));
  assert.equal(exactFiles.size, ids.length, `${lang} FAQ output must contain one exact file per runtime ID`);
}

function verifySitemap(lang, ids) {
  const sitemapPath = path.join(OUT_DIR, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), 'Missing sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const base = lang === 'zh' ? 'https://fastgpt.cn/zh/faq/' : 'https://fastgpt.io/en/faq/';
  for (const id of ids) {
    assert(sitemap.includes(`<loc>${base}${encodeId(id)}</loc>`), `Sitemap is missing ${lang}/${id}`);
  }
}

const w2Routes = baseline.rows.map((row) => row.values);
assert.equal(w2Routes.length, 60);
assert.equal(Object.keys(w2).length, 60);
const enIds = Object.keys(english);
const zhIds = [...enIds, ...Object.keys(w2)];
assert.equal(enIds.length, 1400);
assert.equal(zhIds.length, 1460);
assert.equal(new Set(zhIds).size, zhIds.length, 'Chinese runtime IDs must be unique');
verifyExpectedSet('en', enIds);
verifyExpectedSet('zh', zhIds);
verifySitemap('en', enIds);
verifySitemap('zh', zhIds);

for (const source of w2Routes) {
  verifyW2Page('zh', source);
  const englishResult = findFaqFile('en', source.slug);
  assert.equal(englishResult.file, null, `${source.slug} leaked into English routes`);
}

console.log(`FAQ build artifact tests passed: ${enIds.length} English routes, ${zhIds.length} Chinese routes, ${w2Routes.length} W2 pages`);
