'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { rememberPreferredLanguage } from '@/lib/clientNavigation';
import { localeDirections, localeHtmlLangs, localeNames, type LocaleCode } from '@/lib/locales';
import { getLocaleOwner } from '@/lib/siteRouting';
import {
  consumeLanguageChoice,
  dismissLanguageRecommendation,
  getRecommendedLanguage,
  prepareLanguageLink,
  type LanguageTarget
} from '@/lib/languageNavigation';

const copy: Record<
  LocaleCode,
  { message: string; language: string; continue: string; close: string }
> = {
  en: {
    message: 'Choose your preferred language to view this page.',
    language: 'Language',
    continue: 'Continue',
    close: 'Close language recommendation'
  },
  zh: {
    message: '选择您偏好的语言，查看此页面的对应版本。',
    language: '语言',
    continue: '继续',
    close: '关闭语言推荐'
  },
  'zh-hant': {
    message: '選擇您偏好的語言，查看此頁面的對應版本。',
    language: '語言',
    continue: '繼續',
    close: '關閉語言推薦'
  },
  ja: {
    message: 'ご希望の言語でこのページをご覧いただけます。',
    language: '言語',
    continue: '続ける',
    close: '言語の案内を閉じる'
  },
  ar: {
    message: 'اختر لغتك المفضلة لعرض هذه الصفحة.',
    language: 'اللغة',
    continue: 'متابعة',
    close: 'إغلاق اقتراح اللغة'
  },
  vi: {
    message: 'Chọn ngôn ngữ bạn muốn dùng để xem trang này.',
    language: 'Ngôn ngữ',
    continue: 'Tiếp tục',
    close: 'Đóng gợi ý ngôn ngữ'
  },
  th: {
    message: 'เลือกภาษาที่คุณต้องการเพื่อดูหน้านี้',
    language: 'ภาษา',
    continue: 'ดำเนินการต่อ',
    close: 'ปิดคำแนะนำภาษา'
  },
  id: {
    message: 'Pilih bahasa yang Anda inginkan untuk melihat halaman ini.',
    language: 'Bahasa',
    continue: 'Lanjutkan',
    close: 'Tutup saran bahasa'
  },
  ms: {
    message: 'Pilih bahasa pilihan anda untuk melihat halaman ini.',
    language: 'Bahasa',
    continue: 'Teruskan',
    close: 'Tutup cadangan bahasa'
  }
};

export default function LanguageRecommendation({
  currentLocale,
  targets,
  onHeightChange
}: {
  currentLocale: LocaleCode;
  targets: LanguageTarget[];
  onHeightChange: (height: number) => void;
}) {
  const [selected, setSelected] = useState<LocaleCode>();
  const ref = useRef<HTMLElement>(null);
  const target = targets.find((candidate) => candidate.locale === selected);

  useEffect(() => {
    const chosen = consumeLanguageChoice(currentLocale);
    // Static export can read visitor preferences only after browser hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(
      chosen ? undefined : getRecommendedLanguage(currentLocale, targets, navigator.languages)
    );
  }, [currentLocale, targets]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      onHeightChange(0);
      return;
    }
    const measure = () => onHeightChange(Math.ceil(element.getBoundingClientRect().height));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [target, onHeightChange]);

  if (!selected || !target) return null;
  const t = copy[selected];
  const isChinaRecommendation =
    getLocaleOwner(currentLocale) === 'io' && getLocaleOwner(selected) === 'cn';
  const dismiss = () => {
    dismissLanguageRecommendation();
    setSelected(undefined);
  };

  return (
    <aside
      ref={ref}
      data-language-recommendation
      aria-label={t.language}
      lang={localeHtmlLangs[selected]}
      dir={localeDirections[selected]}
      className="fixed inset-x-0 top-0 z-[60] border-b border-hairline-soft bg-slate-100 text-ink"
      style={{ colorScheme: 'light' }}
    >
      <div
        className={`mx-auto flex max-w-[1440px] items-center gap-2 px-4 py-2 md:gap-4 md:px-8 md:py-3 ${
          isChinaRecommendation ? 'flex-wrap lg:flex-nowrap' : ''
        }`}
      >
        <p
          className={`text-sm ${
            isChinaRecommendation ? 'w-full lg:w-auto lg:flex-1' : 'hidden flex-1 lg:block'
          }`}
        >
          {isChinaRecommendation
            ? '中国区云服务（cloud.fastgpt.cn）与国际区云服务（cloud.fastgpt.io）的账号独立。前往中国站后，请使用中国区账号登录。'
            : t.message}
        </p>
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value as LocaleCode)}
          aria-label={t.language}
          className="h-11 min-w-0 flex-1 rounded-lg border border-hairline-soft bg-white px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:max-w-[280px]"
        >
          {targets.map(({ locale }) => (
            <option key={locale} value={locale} lang={localeHtmlLangs[locale]}>
              {localeNames[locale]}
            </option>
          ))}
        </select>
        <a
          href={target.href}
          hrefLang={localeHtmlLangs[selected]}
          onClick={(event) => {
            if (selected === currentLocale) {
              event.preventDefault();
              rememberPreferredLanguage(selected);
              dismiss();
            } else {
              prepareLanguageLink(event.currentTarget, target);
            }
          }}
          onAuxClick={(event) => prepareLanguageLink(event.currentTarget, target)}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-btn-dark px-4 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {isChinaRecommendation ? '前往中国站' : t.continue}
        </a>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t.close}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
