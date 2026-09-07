import { getDefaultLocalePath, rememberPreferredLanguage } from '@/lib/clientNavigation';
import {
  isSupportedLocale,
  normalizeLocale,
  supportedLocaleCodes,
  type LocaleCode
} from '@/lib/locales';
import { isPreviewSite, getOwnedLocaleUrl, getReviewLocalePath } from '@/lib/siteRouting';

export type LanguageTarget = { locale: LocaleCode; href: string };
export type LanguageSwitchPaths = Partial<Record<LocaleCode, string>>;

const choiceParameter = '__fg_lang';
const dismissalKey = 'languageRecommendationDismissed';

/** Resolve page-owned translations once for every language control. */
export function getLanguageTargets({
  pathname,
  routeLocale,
  publishedLocales = supportedLocaleCodes,
  reviewLocalePaths = false,
  languageSwitchPaths
}: {
  pathname: string;
  routeLocale?: string;
  publishedLocales?: readonly LocaleCode[];
  reviewLocalePaths?: boolean;
  languageSwitchPaths?: LanguageSwitchPaths;
}): LanguageTarget[] {
  const prefix = routeLocale ? `/${routeLocale}` : '';
  const path =
    prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))
      ? pathname.slice(prefix.length) || '/'
      : pathname;

  return publishedLocales.map((locale) => ({
    locale,
    href:
      languageSwitchPaths?.[locale] ||
      (isPreviewSite
        ? reviewLocalePaths
          ? getReviewLocalePath(locale, path)
          : getDefaultLocalePath(locale, path)
        : getOwnedLocaleUrl(locale, path))
  }));
}

/** Match supported browser languages without treating an unknown language as English. */
export function matchLanguage(value: string): LocaleCode | undefined {
  const normalized = value.trim().toLowerCase().replace(/_/g, '-');
  const base = normalized.split('-')[0];
  return isSupportedLocale(base) ? normalizeLocale(normalized) : undefined;
}

export function readPreferredLanguage(): LocaleCode | undefined {
  try {
    const value = localStorage.getItem('preferredLang');
    const locale = value ? matchLanguage(value) : undefined;
    if (locale) return locale;
  } catch {
    // Cookies and browser languages remain usable when localStorage is blocked.
  }
  try {
    const value = document.cookie
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith('NEXT_LOCALE='))
      ?.slice('NEXT_LOCALE='.length);
    return value ? matchLanguage(decodeURIComponent(value)) : undefined;
  } catch {
    return undefined;
  }
}

export function isLanguageRecommendationDismissed() {
  try {
    return sessionStorage.getItem(dismissalKey) === '1';
  } catch {
    return false;
  }
}

export function dismissLanguageRecommendation() {
  try {
    sessionStorage.setItem(dismissalKey, '1');
  } catch {
    // Component state still closes the current recommendation.
  }
}

export function getRecommendedLanguage(
  currentLocale: LocaleCode,
  targets: readonly LanguageTarget[],
  browserLanguages: readonly string[]
): LocaleCode | undefined {
  if (isLanguageRecommendationDismissed()) return undefined;
  const preferred = readPreferredLanguage() || browserLanguages.map(matchLanguage).find(Boolean);
  return preferred !== currentLocale && targets.some((target) => target.locale === preferred)
    ? preferred
    : undefined;
}

/** Add a choice marker only during user navigation; canonical links stay clean. */
export function getLanguageSwitchHref(target: LanguageTarget, currentHref: string) {
  const current = new URL(currentHref);
  const destination = new URL(target.href, current);
  destination.search = current.search;
  destination.hash = current.hash;
  destination.searchParams.delete(choiceParameter);
  if (destination.origin !== current.origin) {
    destination.searchParams.set(choiceParameter, target.locale);
  }
  return destination.href;
}

export function prepareLanguageLink(anchor: HTMLAnchorElement, target: LanguageTarget) {
  anchor.href = getLanguageSwitchHref(target, window.location.href);
  rememberPreferredLanguage(target.locale);
}

/** Transfer an explicit choice between the two origins without redirecting a visitor. */
export function consumeLanguageChoice(currentLocale: LocaleCode) {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(choiceParameter)) return false;
  const values = url.searchParams.getAll(choiceParameter);
  const accepted =
    values.length === 1 && isSupportedLocale(values[0]) && values[0] === currentLocale;
  if (accepted) {
    rememberPreferredLanguage(currentLocale);
  }
  url.searchParams.delete(choiceParameter);
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  return accepted;
}
