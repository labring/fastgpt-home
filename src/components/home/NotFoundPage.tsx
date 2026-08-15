import Link from 'next/link';
import { ArrowUpRight, Home, Search } from 'lucide-react';
import FastGPTLogo from '@/components/home/FastGPTLogo';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';
import id from '@/locales/id.json';
import ja from '@/locales/ja.json';
import ms from '@/locales/ms.json';
import th from '@/locales/th.json';
import vi from '@/locales/vi.json';
import zhHant from '@/locales/zh-hant.json';
import zh from '@/locales/zh.json';
import { defaultLocale } from '@/lib/i18n';
import { localeNames, supportedLocaleCodes, type LocaleCode } from '@/lib/locales';
import { getOwnedLocaleUrl, getPublishedLocaleCodes, isPreviewSite } from '@/lib/siteRouting';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';
import {
  comparisonPublishedLocaleCodes,
  contactPublishedLocaleCodes,
  faqPublishedLocaleCodes,
  techPublishedLocaleCodes
} from '@/lib/publishedLocales';
import CloudEntryLink from '@/components/home/CloudEntryLink';

const dictionaries = { en, 'zh-hant': zhHant, zh, ja, ar, vi, th, id, ms };
const languages = getPublishedLocaleCodes();
const fallbackLocale = languages.includes(defaultLocale) ? defaultLocale : languages[0];
const recoveryGroups = [
  { sections: ['faq'], label: 'FAQ', path: '/faq', locales: faqPublishedLocaleCodes },
  {
    sections: ['contact'],
    label: 'Contact',
    path: '/contact',
    locales: contactPublishedLocaleCodes
  },
  {
    sections: ['compare'],
    label: 'Compare',
    path: '/compare',
    locales: comparisonPublishedLocaleCodes
  },
  {
    sections: [
      'tech-center',
      'api',
      'dataset',
      'deploy',
      'integration',
      'node',
      'troubleshoot',
      'tutorial'
    ],
    label: 'Tech Center',
    path: '/tech-center',
    locales: techPublishedLocaleCodes
  }
] as const;
const recoveryPayload = recoveryGroups.map((group) => ({
  sections: group.sections,
  links: group.locales.map((locale) => ({
    href: isPreviewSite
      ? getDefaultLocalePath(locale, group.path)
      : getOwnedLocaleUrl(locale, group.path),
    label: `${localeNames[locale]} · ${group.label}`
  }))
}));
const recoveryScript = `
  (() => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (${JSON.stringify(supportedLocaleCodes)}.includes(segments[0])) segments.shift();
    const section = segments[0];
    if (!section) return;
    const group = ${JSON.stringify(recoveryPayload)}.find(({ sections }) =>
      sections.includes(section)
    );
    if (!group) return;
    document.querySelectorAll('[data-not-found-recovery]').forEach((container) => {
      group.links.forEach(({ href, label }) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        link.className =
          'inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#d4d4d4] bg-white px-6 text-[15px] font-medium text-[#020617] transition-colors hover:bg-[#f7f8fa] sm:w-auto';
        container.append(link);
      });
      container.style.display = 'contents';
    });
  })();
`;
const localeVisibilityCss = `
  html${languages
    .filter((lang) => lang !== fallbackLocale)
    .map((lang) => `:not(:lang(${lang}))`)
    .join('')} .not-found-locale-${fallbackLocale},
  ${languages.map((lang) => `html:lang(${lang}) .not-found-locale-${lang}`).join(',\n  ')} {
    display: flex;
  }
`;

function getDocsUrl(lang: LocaleCode) {
  return lang === 'zh'
    ? 'https://doc.fastgpt.cn/docs/introduction'
    : 'https://doc.fastgpt.io/docs/introduction';
}

function getStartUrl(lang: LocaleCode) {
  const isChinaLocale = lang === 'zh';
  const cloudUrl =
    process.env.NEXT_PUBLIC_USER_URL ||
    (isChinaLocale ? 'https://cloud.fastgpt.cn' : 'https://cloud.fastgpt.io');

  return cloudUrl;
}

function NotFoundContent({ lang }: { lang: LocaleCode }) {
  const t = dictionaries[lang].NotFound;
  const docsUrl = getDocsUrl(lang);
  const startUrl = getStartUrl(lang);

  return (
    <div
      className={`not-found-locale not-found-locale-${lang} mx-auto hidden min-h-[100svh] w-full max-w-[1280px] flex-col px-4 py-6 md:px-8`}
    >
      <header className="flex items-center justify-between">
        <Link
          href={getDefaultLocalePath(lang)}
          className="flex items-center gap-2"
          aria-label="FastGPT"
        >
          <FastGPTLogo size={24} />
          <span
            style={{
              color: '#020617',
              fontSize: 18,
              fontWeight: 600,
              lineHeight: '26px'
            }}
          >
            FastGPT
          </span>
        </Link>
        <CloudEntryLink
          source="not_found_start"
          targetUrl={startUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[#d4d4d4] bg-white px-4 text-[14px] font-medium text-[#020617] transition-colors hover:bg-[#f7f8fa]"
        >
          {t.start}
          <ArrowUpRight className="h-4 w-4" />
        </CloudEntryLink>
      </header>

      <main className="flex flex-1 items-center justify-center py-16">
        <section className="relative w-full max-w-[860px] text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[min(82vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(50,109,255,0.14) 0%, rgba(50,109,255,0.06) 42%, rgba(255,255,255,0) 72%)'
            }}
          />

          <div className="relative flex flex-col items-center">
            <span
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white/70 px-3 py-1.5 text-[12px] leading-[18px] text-[#475569]"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              <Search className="h-3.5 w-3.5" />
              {t.eyebrow}
            </span>

            <p
              aria-hidden="true"
              className="select-none text-[112px] font-semibold leading-none text-[#326dff]/10 sm:text-[168px] md:text-[220px]"
              style={{ letterSpacing: 0 }}
            >
              404
            </p>

            <h1
              className="mt-[-28px] text-[34px] font-semibold leading-[42px] text-[#020617] sm:text-[52px] sm:leading-[64px]"
              style={{ letterSpacing: 0 }}
            >
              {t.title}
            </h1>
            <p
              className="mt-5 max-w-[620px] text-[15px] leading-[24px] text-[#475569] sm:text-[18px] sm:leading-[30px]"
              style={{ letterSpacing: 0 }}
            >
              {t.desc}
            </p>

            <div className="mt-9 flex w-full flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              <Link
                href={getDefaultLocalePath(lang)}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#020617] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#172033] sm:w-auto"
              >
                <Home className="h-4 w-4" />
                {t.home}
              </Link>
              <span data-not-found-recovery style={{ display: 'none' }} />
            </div>

            <Link
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-1 text-[15px] font-medium text-[#3370ff] transition-colors hover:text-[#1f56d8]"
            >
              {t.docs}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <div className="home min-h-[100svh] overflow-hidden bg-white text-ink">
      <HomeThemeFix />
      <style
        dangerouslySetInnerHTML={{
          __html: localeVisibilityCss
        }}
      />
      {languages.map((lang) => (
        <NotFoundContent key={lang} lang={lang} />
      ))}
      <script dangerouslySetInnerHTML={{ __html: recoveryScript }} />
    </div>
  );
}
