#!/usr/bin/env node
/**
 * Remove static-exported locale pages that are outside the deployment's
 * language region. This runs after `next build` because Next requires every
 * dynamic route to return at least one static param, including CN-only routes
 * such as the technical articles and comparison pages.
 */
const fs = require('node:fs');
const path = require('node:path');

const outDir = path.join(__dirname, '..', 'out');
const locales = ['en', 'zh', 'zh-hant', 'ja', 'ar', 'vi', 'th', 'id', 'ms'];
const configuredRegion = process.env.NEXT_PUBLIC_LANGUAGE_REGION;
const region =
  configuredRegion === 'zh' || configuredRegion === 'international'
    ? configuredRegion
    : 'zh';
const allowedLocales = new Set(
  region === 'zh' ? ['zh'] : locales.filter((locale) => locale !== 'zh')
);

let removed = 0;

for (const locale of locales) {
  if (allowedLocales.has(locale)) continue;

  const localeDir = path.join(outDir, locale);
  if (fs.existsSync(localeDir)) {
    fs.rmSync(localeDir, { recursive: true, force: true });
    removed += 1;
  }

  const localeFile = path.join(outDir, `${locale}.html`);
  if (fs.existsSync(localeFile)) {
    fs.unlinkSync(localeFile);
    removed += 1;
  }
}

console.log(
  `[clean-locale-output] Kept ${[...allowedLocales].join(', ')} for ${region}; removed ${removed} locale outputs`
);
