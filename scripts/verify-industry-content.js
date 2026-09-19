#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES = ['zh', 'en'];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(file, message) {
  throw new Error(`Industry ${file}: ${message}`);
}

function parseFrontMatter(source, file) {
  const normalized = source.replace(/\r\n?/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n(?:\n)?/);
  if (!match) fail(file, 'expected byte-zero front matter');
  const metadata = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator <= 0) fail(file, `invalid front matter line: ${line}`);
    metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  const body = normalized.slice(match[0].length).trim();
  if (!body) fail(file, 'missing body');
  if (/<!--[\s\S]*?-->/.test(body)) fail(file, 'body contains an internal metadata comment');
  if (/^(?:slug|page_type|meta_title|meta_description|date_published|date_modified|(?:source|publication|delivery|review|batch)_[\w-]+|schedule|sign[- ]?off)\s*:/im.test(body)) {
    fail(file, 'body contains internal delivery metadata');
  }
  return { metadata, body };
}

function readIndustrySources(root = path.join(ROOT, 'src', 'content', 'industry')) {
  const articles = [];
  for (const locale of LOCALES) {
    const localeRoot = path.join(root, locale);
    if (!fs.existsSync(localeRoot)) continue;
    for (const filename of fs.readdirSync(localeRoot).filter((name) => name.endsWith('.md')).sort()) {
      const file = path.join(localeRoot, filename);
      const { metadata, body } = parseFrontMatter(fs.readFileSync(file, 'utf8'), file);
      for (const field of ['title', 'slug', 'page_type', 'meta_title', 'meta_description', 'date_modified']) {
        if (!metadata[field]) fail(file, `missing ${field}`);
      }
      const prefix = `/${locale}/industry/`;
      const slug = metadata.slug.startsWith(prefix)
        ? metadata.slug.slice(prefix.length)
        : metadata.slug.startsWith('/industry/')
          ? metadata.slug.slice('/industry/'.length)
          : '';
      if (!SLUG_PATTERN.test(slug)) fail(file, `invalid slug: ${metadata.slug}`);
      if (body.match(/^#\s+(.+)$/m)?.[1]?.trim() !== metadata.title) {
        fail(file, 'title must match the first H1');
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.date_modified)) {
        fail(file, `invalid date_modified: ${metadata.date_modified}`);
      }
      articles.push({ locale, slug, metadata, body, file });
    }
  }

  const identities = new Set();
  for (const article of articles) {
    const identity = `${article.locale}|${article.slug}`;
    if (identities.has(identity)) fail(article.file, `duplicate slug: ${article.slug}`);
    identities.add(identity);
  }
  return articles;
}

function verifyIndustryContent() {
  const articles = readIndustrySources();
  if (!articles.length) throw new Error('Industry fixture set is empty');
  const bilingualSlugs = new Set(articles.map((article) => article.slug));
  if (![...bilingualSlugs].some((slug) => articles.filter((article) => article.slug === slug).length > 1)) {
    throw new Error('Industry fixture set must cover a shared bilingual slug');
  }
  console.log(`Industry content verification passed (${articles.length} sources)`);
}

if (require.main === module) {
  try {
    verifyIndustryContent();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { parseFrontMatter, readIndustrySources, verifyIndustryContent };
