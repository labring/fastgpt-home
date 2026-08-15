import siteRoutingManifest from '@/config/site-routing.json';

export type LocaleCode = keyof typeof siteRoutingManifest.locales;
export type LocaleDirection = 'ltr' | 'rtl';

export const localeConfigs = Object.entries(siteRoutingManifest.locales).map(([code, locale]) => ({
  ...locale,
  code: code as LocaleCode,
  dir: locale.dir as LocaleDirection
}));

export const supportedLocaleCodes = Object.keys(siteRoutingManifest.locales) as LocaleCode[];

export const localeNames = localeConfigs.reduce((acc, locale) => {
  acc[locale.code] = locale.name;
  return acc;
}, {} as Record<LocaleCode, string>);

export const localeMap = localeConfigs.reduce((acc, locale) => {
  acc[locale.code] = locale.ogLocale;
  return acc;
}, {} as Record<string, string>);

export const localeDirections = localeConfigs.reduce((acc, locale) => {
  acc[locale.code] = locale.dir;
  return acc;
}, {} as Record<LocaleCode, LocaleDirection>);

export function normalizeLocale(locale: string | undefined | null): LocaleCode {
  if (!locale) return 'en';

  const normalized = locale.toLowerCase().replace(/_/g, '-');
  if (
    normalized.startsWith('zh-hant') ||
    normalized.startsWith('zh-tw') ||
    normalized.startsWith('zh-hk') ||
    normalized.startsWith('zh-mo')
  ) {
    return 'zh-hant';
  }

  return (
    supportedLocaleCodes.find((code) => normalized === code || normalized.startsWith(`${code}-`)) ||
    'en'
  );
}

export function isSupportedLocale(locale: string | undefined | null): locale is LocaleCode {
  return !!locale && supportedLocaleCodes.includes(locale as LocaleCode);
}
