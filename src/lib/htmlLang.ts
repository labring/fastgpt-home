/**
 * Inline script to synchronously set the HTML lang attribute based on the URL path.
 * This runs before React hydration, so search engines and browsers see the correct lang.
 * Must be used as a dangerouslySetInnerHTML script in the root layout <head>.
 *
 * Root / keeps the build-time default locale and remains on the canonical root URL.
 * Sections outside the locale prefixes keep their manifest locale.
 * Supported locale paths are respected as-is.
 */

import siteRoutingManifest from '@/config/site-routing.json';
import { localeDirections, localeHtmlLangs, supportedLocaleCodes } from '@/lib/locales';
import { getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';

const normalizedBuildDefaultLocale = getDefaultLocaleForSiteVariant();
const localesJson = JSON.stringify(supportedLocaleCodes);
const directionsJson = JSON.stringify(localeDirections);
const htmlLangsJson = JSON.stringify(localeHtmlLangs);
const rootSectionLocalesJson = JSON.stringify(siteRoutingManifest.rootSectionLocales);

export const htmlLangScript = `
(function() {
  var path = window.location.pathname;
  var locales = ${localesJson};
  var directions = ${directionsJson};
  var htmlLangs = ${htmlLangsJson};
  var defaultLocale = '${normalizedBuildDefaultLocale}';
  var rootSectionLocales = ${rootSectionLocalesJson};
  var localeCode = rootSectionLocales[path.split('/')[1]] || defaultLocale;
  for (var p = 0; p < locales.length; p++) {
    var code = locales[p];
    if (path === '/' + code || path.indexOf('/' + code + '/') === 0) {
      localeCode = code;
      break;
    }
  }
  document.documentElement.lang = htmlLangs[localeCode] || localeCode;
  document.documentElement.dir = directions[localeCode] || 'ltr';

})();
`.trim();
