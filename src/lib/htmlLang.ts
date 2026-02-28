/**
 * Inline script to synchronously set the HTML lang attribute based on the URL path.
 * This runs before React hydration, so search engines and browsers see the correct lang.
 * Must be used as a dangerouslySetInnerHTML script in the root layout <head>.
 *
 * Root / defaults to 'en'; /zh, /ja paths override accordingly.
 */
export const htmlLangScript = `
(function() {
  var path = window.location.pathname;
  var lang = 'zh';
  if (path.startsWith('/en')) lang = 'en';
  else if (path.startsWith('/ja')) lang = 'ja';
  document.documentElement.lang = lang;
})();
`.trim();
