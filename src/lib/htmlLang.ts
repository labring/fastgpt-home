/**
 * Inline script to synchronously set the HTML lang attribute based on the URL path.
 * This runs before React hydration, so search engines and browsers see the correct lang.
 * Must be used as a dangerouslySetInnerHTML script in the root layout <head>.
 */
export const htmlLangScript = `
(function() {
  var path = window.location.pathname;
  var lang = 'en';
  if (path.startsWith('/zh')) lang = 'zh';
  else if (path.startsWith('/ja')) lang = 'ja';
  document.documentElement.lang = lang;
})();
`.trim();
