/**
 * Inline script to synchronously set the HTML lang attribute based on the URL path.
 * This runs before React hydration, so search engines and browsers see the correct lang.
 * Must be used as a dangerouslySetInnerHTML script in the root layout <head>.
 *
 * Root / redirects to stored language preference or the build-time default locale.
 * /zh, /ja, /en paths are respected as-is.
 */

const buildDefaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

export const htmlLangScript = `
(function() {
  var path = window.location.pathname;
  var lang = '${buildDefaultLocale}';
  if (path.startsWith('/zh')) lang = 'zh';
  else if (path.startsWith('/ja')) lang = 'ja';
  else if (path.startsWith('/en')) lang = 'en';
  document.documentElement.lang = lang;

  if (path === '/') {
    var locales = ['en', 'zh', 'ja'];
    var stored = '';
    try { stored = localStorage.getItem('preferredLang') || ''; } catch(e) {}
    if (stored && locales.indexOf(stored) !== -1) {
      window.location.replace('/' + stored);
    }
  }
})();
`.trim();
