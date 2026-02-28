/**
 * Inline script to synchronously set the HTML lang attribute based on the URL path.
 * This runs before React hydration, so search engines and browsers see the correct lang.
 * Must be used as a dangerouslySetInnerHTML script in the root layout <head>.
 *
 * Default lang is determined at build time via NEXT_PUBLIC_HOME_URL:
 *   - *.cn  → default 'zh' (domestic)
 *   - other → default 'en' (international)
 */
const isCnDomain = (process.env.NEXT_PUBLIC_HOME_URL || '').includes('.cn');
const defaultLang = isCnDomain ? 'zh' : 'en';

export const htmlLangScript = `
(function() {
  var path = window.location.pathname;
  var lang = '${defaultLang}';
  if (path.startsWith('/en')) lang = 'en';
  else if (path.startsWith('/zh')) lang = 'zh';
  else if (path.startsWith('/ja')) lang = 'ja';
  document.documentElement.lang = lang;
})();
`.trim();
