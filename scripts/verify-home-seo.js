#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const requiredPaths = [
  '/price',
  '/customers',
  '/wiki',
  '/videos',
  '/troubleshoot',
  '/blog',
  '/industry'
];

async function readHomeHtml() {
  if (process.env.HOME_HTML) return fs.readFileSync(process.env.HOME_HTML, 'utf8');
  if (process.env.HOME_URL) {
    const response = await fetch(process.env.HOME_URL);
    assert(response.ok, `home request failed: ${response.status}`);
    return response.text();
  }
  return null;
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
}

function verifyHtml(html) {
  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  assert.equal(h1Count, 1, 'home must render exactly one H1');

  const anchors = [...html.matchAll(/<a\b[^>]*>/gi)];
  const hrefs = anchors.map(([tag]) => attribute(tag, 'href')).filter(Boolean);
  const paths = new Set(
    hrefs
      .filter((href) => href.startsWith('/') && !href.startsWith('//'))
      .map((href) => new URL(href, 'https://fastgpt.local').pathname)
  );
  assert(paths.size >= 30, `home has ${paths.size} unique local links, expected at least 30`);

  for (const href of requiredPaths) assert(paths.has(href), `home is missing ${href}`);
  assert(hrefs.some((href) => /^https:\/\/doc\.fastgpt\.(cn|io)\//.test(href)), 'docs host');

  console.log(`Home HTML verification passed: ${paths.size} unique local links, ${h1Count} H1`);
}

async function main() {
  const html = await readHomeHtml();
  if (!html) {
    const hero = fs.readFileSync(path.join(root, 'src/components/home/Hero.tsx'), 'utf8');
    assert.equal((hero.match(/<h1\b/g) || []).length, 1, 'home source has multiple H1 elements');
    console.log('HOME_HTML/HOME_URL not set; source H1 check passed');
    return;
  }
  verifyHtml(html);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
