export const localeConfigs = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr', ogLocale: 'en_US', htmlLang: 'en-US' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳', dir: 'ltr', ogLocale: 'zh_CN', htmlLang: 'zh-CN' },
  {
    code: 'zh-hant',
    name: '繁體中文',
    flag: '🇨🇳',
    dir: 'ltr',
    ogLocale: 'zh_Hant',
    htmlLang: 'zh-Hant'
  },
  { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr', ogLocale: 'ja_JP', htmlLang: 'ja-JP' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl', ogLocale: 'ar_SA', htmlLang: 'ar-SA' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr', ogLocale: 'vi_VN', htmlLang: 'vi-VN' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭', dir: 'ltr', ogLocale: 'th_TH', htmlLang: 'th-TH' },
  {
    code: 'id',
    name: 'Bahasa Indonesia',
    flag: '🇮🇩',
    dir: 'ltr',
    ogLocale: 'id_ID',
    htmlLang: 'id-ID'
  },
  {
    code: 'ms',
    name: 'Bahasa Melayu',
    flag: '🇲🇾',
    dir: 'ltr',
    ogLocale: 'ms_MY',
    htmlLang: 'ms-MY'
  }
] as const;

export type LocaleCode = (typeof localeConfigs)[number]['code'];
export type LocaleDirection = (typeof localeConfigs)[number]['dir'];

export const supportedLocaleCodes = localeConfigs.map((locale) => locale.code);

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
  if (normalized.startsWith('zh')) return 'zh';
  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('ja')) return 'ja';
  if (normalized.startsWith('ar')) return 'ar';
  if (normalized.startsWith('vi')) return 'vi';
  if (normalized.startsWith('th')) return 'th';
  if (normalized.startsWith('id')) return 'id';
  if (normalized.startsWith('ms')) return 'ms';

  return 'en';
}

export function isSupportedLocale(locale: string | undefined | null): locale is LocaleCode {
  return !!locale && supportedLocaleCodes.includes(locale as LocaleCode);
}
