/**
 * Inline script to synchronously set the HTML lang attribute based on the URL path.
 * This runs before React hydration, so search engines and browsers see the correct lang.
 * Must be used as a dangerouslySetInnerHTML script in the root layout <head>.
 *
 * Root / redirects to stored language preference or the build-time default locale.
 * /zh, /ja, /en paths are respected as-is.
 */

const buildDefaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
const normalizedBuildDefaultLocale = (() => {
  if (buildDefaultLocale.startsWith('zh')) return 'zh';
  if (buildDefaultLocale.startsWith('ja')) return 'ja';
  return 'en';
})();

export const htmlLangScript = `
(function() {
  var path = window.location.pathname;
  var locales = ['en', 'zh', 'ja'];
  var defaultLocale = '${normalizedBuildDefaultLocale}';
  function normalize(locale) {
    if (!locale) return '';
    locale = String(locale).toLowerCase();
    if (locale.indexOf('zh') === 0) return 'zh';
    if (locale.indexOf('ja') === 0) return 'ja';
    if (locale.indexOf('en') === 0) return 'en';
    return '';
  }

  var lang = defaultLocale;
  if (/^\\/zh(?:\\/|$)/.test(path)) lang = 'zh';
  else if (/^\\/ja(?:\\/|$)/.test(path)) lang = 'ja';
  else if (/^\\/en(?:\\/|$)/.test(path)) lang = 'en';
  document.documentElement.lang = lang;

  if (path === '/') {
    var stored = '';
    try { stored = localStorage.getItem('preferredLang') || ''; } catch(e) {}
    var browser = '';
    try {
      var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
      for (var i = 0; i < languages.length; i++) {
        browser = normalize(languages[i]);
        if (locales.indexOf(browser) !== -1) break;
      }
    } catch(e) {}

    var target = normalize(stored) || browser || defaultLocale;
    if (locales.indexOf(target) !== -1) {
      window.location.replace('/' + target);
    }
  }
})();
`.trim();
