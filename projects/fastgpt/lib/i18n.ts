import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const locales = ["", "en", "en-US", "zh", "zh-CN", "zh-TW", 'zh-HK', 'ja', "ar", "es"];
export const localeNames: any = {
  en: "EN English",
  zh: "ZH 中文",
  ja: "JP 日本語",
};
export const defaultLocale = "en";

// If you wish to automatically redirect users to a URL that matches their browser's language setting,
// you can use the `getLocale` to get the browser's language.
export function getLocale(headers: any): string {
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

const dictionaries: any = {
  en: () => import("@/locales/en.json").then((module) => module.default),
  zh: () => import("@/locales/zh.json").then((module) => module.default),
  ja: () => import("@/locales/ja.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (["zh-CN", "zh-TW", "zh-HK"].includes(locale)) {
    locale = "zh";
  }

  if (!Object.keys(dictionaries).includes(locale)) {
    locale = "en";
  }

  return dictionaries[locale]();
};
