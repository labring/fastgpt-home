/**
 * Inline script to synchronously set the HTML lang attribute based on the URL path.
 * This runs before React hydration, so search engines and browsers see the correct lang.
 * Must be used as a dangerouslySetInnerHTML script in the root layout <head>.
 *
 * Root / redirects to stored language preference or the build-time default locale.
 * Supported locale paths are respected as-is.
 */

import { localeDirections, normalizeLocale, supportedLocaleCodes } from '@/lib/locales';

const buildDefaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
const normalizedBuildDefaultLocale = normalizeLocale(buildDefaultLocale);
const localesJson = JSON.stringify(supportedLocaleCodes);
const directionsJson = JSON.stringify(localeDirections);

export const htmlLangScript = `
(function() {
  var path = window.location.pathname;
  var locales = ${localesJson};
  var directions = ${directionsJson};
  var defaultLocale = '${normalizedBuildDefaultLocale}';
  function normalize(locale) {
    if (!locale) return '';
    locale = String(locale).toLowerCase().replace(/_/g, '-');
    if (
      locale.indexOf('zh-hant') === 0 ||
      locale.indexOf('zh-tw') === 0 ||
      locale.indexOf('zh-hk') === 0 ||
      locale.indexOf('zh-mo') === 0
    ) {
      return 'zh-hant';
    }
    for (var i = 0; i < locales.length; i++) {
      if (locale.indexOf(locales[i]) === 0) return locales[i];
    }
    return '';
  }

  var lang = defaultLocale;
  for (var p = 0; p < locales.length; p++) {
    var code = locales[p];
    if (path === '/' + code || path.indexOf('/' + code + '/') === 0) {
      lang = code;
      break;
    }
  }
  document.documentElement.lang = lang;
  document.documentElement.dir = directions[lang] || 'ltr';

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
