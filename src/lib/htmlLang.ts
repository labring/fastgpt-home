/**
 * Inline script to synchronously set the HTML lang attribute based on the URL path.
 * This runs before React hydration, so search engines and browsers see the correct lang.
 * Must be used as a dangerouslySetInnerHTML script in the root layout <head>.
 *
 * Root / keeps the build-time default locale and remains on the canonical root URL.
 * Supported locale paths are respected as-is.
 */

import { localeDirections, normalizeLocale, supportedLocaleCodes } from '@/lib/locales';
import { getDefaultLocaleForLanguageRegion } from '@/lib/siteRouting';

const normalizedBuildDefaultLocale = getDefaultLocaleForLanguageRegion();
const localesJson = JSON.stringify(supportedLocaleCodes);
const directionsJson = JSON.stringify(localeDirections);

export const htmlLangScript = `
(function() {
  var path = window.location.pathname;
  var locales = ${localesJson};
  var directions = ${directionsJson};
  var defaultLocale = '${normalizedBuildDefaultLocale}';
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

})();
`.trim();
