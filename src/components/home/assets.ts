import { normalizeLocale } from '@/lib/locales';

const CDN = 'https://static.step1.dev/tixzae/assets';
const LOCAL = '/images/home';
const HERO_LOCAL = '/images/hero';
const SOLUTIONS_LOCAL = `${LOCAL}/solutions/sol-zh:en`;
const CASES_LOCAL = `${LOCAL}/cases/cases-i18n`;

/**
 * 根据构建目标域名和当前语言选择首页 Hero 主图。
 * 中文（含繁体）统一使用中文图，其它语言统一使用英文图。
 */
export function getHeroDashboardAsset(locale: string) {
  const normalizedLocale = normalizeLocale(locale);
  const language = normalizedLocale === 'zh' || normalizedLocale === 'zh-hant' ? 'zh' : 'en';
  const domain = (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io').includes('.cn') ? 'cn' : 'io';

  return `${HERO_LOCAL}/kv-border-stroke-bold-${domain}-${language}.png`;
}

/**
 * 根据当前语言选择行业方案图片。
 * 简体中文和繁体中文统一使用中文图，其它语言统一使用英文图。
 */
export function getSolutionsAssets(locale: string) {
  const normalizedLocale = normalizeLocale(locale);
  const language = normalizedLocale === 'zh' || normalizedLocale === 'zh-hant' ? 'zh' : 'en';

  return {
    sales: `${SOLUTIONS_LOCAL}/sol1-${language}.png`,
    service: `${SOLUTIONS_LOCAL}/sol2-${language}.png`,
    hr: `${SOLUTIONS_LOCAL}/sol3-${language}.png`,
    finance: `${SOLUTIONS_LOCAL}/sol4-${language}.png`
  };
}

/**
 * 根据当前语言选择客户案例图片。
 * 简体中文和繁体中文统一使用中文图，其它语言统一使用英文图。
 */
export function getCasesAssets(locale: string) {
  const normalizedLocale = normalizeLocale(locale);
  const language = normalizedLocale === 'zh' || normalizedLocale === 'zh-hant' ? 'zh' : 'en';

  return {
    cetc: `${CASES_LOCAL}/case1-${language}.png`,
    cms: `${CASES_LOCAL}/case2-${language}.png`,
    snow: `${CASES_LOCAL}/case3-${language}.png`,
    zhaozhao: `${CASES_LOCAL}/case4-${language}.png`
  };
}

export const assets = {
  trustLogos: [
    `${LOCAL}/trust/logo1.png`,
    `${LOCAL}/trust/logo2.png`,
    `${LOCAL}/trust/logo3.png`,
    `${LOCAL}/trust/logo4.png`,
    `${LOCAL}/trust/logo5.svg`,
    `${LOCAL}/trust/logo6.png`
  ],
  features: {
    blocks: `${LOCAL}/product/feature-new/producthighlights-Image1.jpg`,
    kb: `${LOCAL}/product/feature-new/producthighlights-Image2.jpg`,
    lifecycle: `${LOCAL}/product/feature-new/producthighlights-Image3.jpg`,
    production: `${LOCAL}/product/feature-new/producthighlights-Image4.jpg`,
    partner: `${LOCAL}/product/feature-new/producthighlights-Image5.jpg`
  },
  cases: {
    cetc: `${LOCAL}/cases/cases-new/案例2.webp`,
    cms: `${LOCAL}/cases/cases-new/案例3.webp`,
    snow: `${LOCAL}/cases/cases-new/案例4.webp`,
    zhaozhao: `${LOCAL}/cases/cases-new/案例5.webp`
  },
  brandWall: `${LOCAL}/brands/brand-wall.png`,
  qr: {
    wechat: `${CDN}/0768b69c8927.avif`,
    feishu: `${CDN}/bbac2150ad97.avif`,
    group: `${CDN}/03578929bf2a.avif`
  }
};
