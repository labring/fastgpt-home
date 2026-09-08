'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { getNavHref } from '@/lib/clientNavigation';
import { getLanguageTargets, prepareLanguageLink } from '@/lib/languageNavigation';
import { useStartUrl } from '@/components/home/hooks/useStartUrl';
import { LangSwitcher } from '@/components/header/LangSwitcher';
import LanguageRecommendation from '@/components/header/LanguageRecommendation';
import Image from 'next/image';
import { localeConfigs, normalizeLocale, type LocaleCode } from '@/lib/locales';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';
import { getLocaleHreflang } from '@/lib/siteRouting';
import { useContactUrl } from '@/components/home/hooks/useContactUrl';

interface NavLink {
  label: string;
  href: string;
}

type NavCta = { trial: string; consult: string };
type NavbarVariant = 'default' | 'comparison';

function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href);
}

function getNavLinkRybbitAttrs(link: NavLink) {
  if (link.href.includes('video.fastgpt.cn/videos')) {
    return rybbitClickAttrs(RYBBIT_EVENTS.learningCenterClick, 'home_nav_learning_center');
  }

  // 案例中心：customers 站（fastgpt.cn/customers，含站内相对路径 /customers）为唯一入口。
  if (link.href.includes('/customers')) {
    return rybbitClickAttrs(RYBBIT_EVENTS.caseCenterClick, 'home_nav_case_center');
  }

  return {};
}

export default function Navbar({
  links = [],
  t,
  locale,
  variant = 'default',
  publishedLocales,
  reviewLocalePaths = false,
  languageSwitchPaths,
  consultHref,
  consultationTrigger = true,
  onConsultClick
}: {
  links?: NavLink[];
  t: NavCta;
  locale?: string;
  variant?: NavbarVariant;
  publishedLocales?: readonly LocaleCode[];
  reviewLocalePaths?: boolean;
  languageSwitchPaths?: Partial<Record<LocaleCode, string>>;
  consultHref?: string;
  consultationTrigger?: boolean;
  onConsultClick?: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(true);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [langSheetOpen, setLangSheetOpen] = useState(false);
  const params = useParams<{ lang: string }>();
  const lang = normalizeLocale(locale || params?.lang || defaultLocale);
  const [recommendationHeight, setRecommendationHeight] = useState(0);
  const languageDialog = useRef<HTMLDialogElement>(null);
  const defaultContactUrl = useContactUrl(lang);
  const contactUrl = consultHref || defaultContactUrl;
  const desktopStartUrl = useStartUrl();
  const mobileStartUrl = useStartUrl();
  const pathname = usePathname();
  const resolvedLinks = links.filter((link) => link.href !== '/tech-center');
  const languageTargets = useMemo(
    () =>
      getLanguageTargets({
        pathname,
        routeLocale: params?.lang,
        publishedLocales,
        reviewLocalePaths,
        languageSwitchPaths
      }),
    [pathname, params?.lang, publishedLocales, reviewLocalePaths, languageSwitchPaths]
  );
  const hasLanguageSwitcher = languageTargets.length > 1;

  useEffect(() => {
    const dialog = languageDialog.current;
    if (langSheetOpen && dialog && !dialog.open) dialog.showModal();
    if (!langSheetOpen && dialog?.open) dialog.close();
  }, [langSheetOpen]);

  const langConfig = localeConfigs.reduce((acc, locale) => {
    acc[locale.code] = { flag: locale.flag, label: locale.name };
    return acc;
  }, {} as Record<string, { flag: string; label: string }>);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Mobile: hide CTA when hero buttons are visible (homepage only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    if (!mq.matches) return;

    let obs: IntersectionObserver | null = null;
    const tryObserve = () => {
      const heroBtns = document.querySelector('[data-hero-cta]');
      if (!heroBtns) return false;
      obs = new IntersectionObserver(([entry]) => setShowMobileCta(!entry.isIntersecting), {
        threshold: 0
      });
      obs.observe(heroBtns);
      return true;
    };

    // Only poll on pages that have hero CTA (homepage); other pages keep CTA visible
    if (!tryObserve()) {
      // No hero CTA on this page — stop polling, CTA stays visible
      return;
    }

    return () => {
      obs?.disconnect();
    };
  }, []);

  // Mobile: hide navbar when CTA section is visible on screen
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    if (!mq.matches) return;

    let obs: IntersectionObserver | null = null;
    let timer: ReturnType<typeof setInterval> | null = null;

    const tryObserve = () => {
      const ctaSection = document.querySelector('[data-cta-section]');
      if (!ctaSection) return false;
      obs = new IntersectionObserver(([entry]) => setHideNavbar(entry.isIntersecting), {
        threshold: 0
      });
      obs.observe(ctaSection);
      return true;
    };

    if (!tryObserve()) {
      timer = setInterval(() => {
        if (tryObserve() && timer) {
          clearInterval(timer);
          timer = null;
        }
      }, 200);
    }

    return () => {
      obs?.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <>
      <LanguageRecommendation
        currentLocale={lang}
        targets={languageTargets}
        onHeightChange={setRecommendationHeight}
      />
      <div aria-hidden="true" style={{ height: recommendationHeight }} />
      <nav
        style={{ top: recommendationHeight }}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          hideNavbar ? '-translate-y-full' : 'translate-y-0'
        } ${variant === 'comparison' ? 'comparison-navbar' : ''}`}
      >
        {/* Blur background — separate layer so backdrop-filter doesn't affect content rendering */}
        <div className="absolute inset-0 backdrop-blur-[10px] bg-[rgba(255,255,255,0.05)] border-b border-hairline-soft" />
        <div className="relative h-[64px] md:h-auto px-[16px] md:px-[32px] py-0 md:py-[16px] flex items-center justify-between w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1" aria-label="FastGPT Home">
              <Image src="/logo-nav.svg" width={22} height={22} alt="FastGPT" draggable={false} />
              <span
                className="text-[18px] font-semibold text-ink tracking-[-0.36px]"
                style={{ fontFamily: "'PingFang SC', sans-serif" }}
              >
                FastGPT
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-[14px] text-ink-sub">
              {resolvedLinks.map((link) => {
                const href = getNavHref(link.href, lang);
                const current =
                  !isExternalHref(link.href) &&
                  (pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)));

                return (
                  <Link
                    key={link.label}
                    href={href}
                    target={isExternalHref(link.href) ? '_blank' : undefined}
                    rel={isExternalHref(link.href) ? 'noopener noreferrer nofollow' : undefined}
                    aria-current={current ? 'page' : undefined}
                    {...getNavLinkRybbitAttrs(link)}
                    className="hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {hasLanguageSwitcher && (
              <div className="home-lang">
                <LangSwitcher iconOnly locale={lang} targets={languageTargets} />
              </div>
            )}
            <a
              href={contactUrl}
              data-consultation-trigger={consultationTrigger || undefined}
              onClick={onConsultClick}
              {...rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, 'home_nav_consult')}
              aria-label={t.consult}
              className="px-4 py-1.5 rounded-full text-[12px] font-medium text-white bg-btn-dark hover:opacity-90 transition-opacity"
            >
              {t.consult}
            </a>
            <a
              href={desktopStartUrl}
              rel="noopener noreferrer nofollow"
              {...rybbitClickAttrs(RYBBIT_EVENTS.cloudServiceClick, 'home_nav_trial')}
              aria-label={t.trial}
              className="px-4 py-1.5 rounded-full bg-white border border-hairline-soft text-[12px] font-medium text-ink hover:bg-gray-50 transition-colors"
            >
              {t.trial}
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <a
              href={mobileStartUrl}
              rel="noopener noreferrer nofollow"
              {...rybbitClickAttrs(RYBBIT_EVENTS.cloudServiceClick, 'home_nav_mobile_trial')}
              aria-label={t.trial}
              className={`px-4 py-1.5 rounded-full bg-white border border-hairline-soft text-[12px] font-medium text-ink hover:bg-gray-50 transition-opacity duration-300 ${
                showMobileCta && !mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {t.trial}
            </a>
            <button
              className="p-2 text-ink relative z-[60]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <line x1="5" y1="5" x2="17" y2="17" />
                  <line x1="17" y1="5" x2="5" y2="17" />
                </svg>
              ) : (
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16.5C12 15.9477 12.4477 15.5 13 15.5H31C31.5523 15.5 32 15.9477 32 16.5V16.5C32 17.0523 31.5523 17.5 31 17.5H13C12.4477 17.5 12 17.0523 12 16.5V16.5Z"
                    fill="#999999"
                  />
                  <path
                    d="M12 27.5C12 26.9477 12.4477 26.5 13 26.5H31C31.5523 26.5 32 26.9477 32 27.5V27.5C32 28.0523 31.5523 28.5 31 28.5H13C12.4477 28.5 12 28.0523 12 27.5V27.5Z"
                    fill="#999999"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className={`md:hidden fixed inset-0 z-40 bg-white ${
            variant === 'comparison' ? 'comparison-mobile-menu' : ''
          }`}
          style={{ top: recommendationHeight }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="h-full w-full pt-[58px] pb-10 px-8 flex flex-col text-[16px] text-ink-sub"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1 pt-6">
              {resolvedLinks.map((link) => {
                const href = getNavHref(link.href, lang);
                const current =
                  !isExternalHref(link.href) &&
                  (pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)));

                return (
                  <Link
                    key={link.label}
                    href={href}
                    target={isExternalHref(link.href) ? '_blank' : undefined}
                    rel={isExternalHref(link.href) ? 'noopener noreferrer nofollow' : undefined}
                    aria-current={current ? 'page' : undefined}
                    {...getNavLinkRybbitAttrs(link)}
                    className="py-3 hover:text-ink transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {hasLanguageSwitcher && (
                <button
                  className="py-3 text-left flex items-center justify-between hover:text-ink transition-colors"
                  onClick={() => setLangSheetOpen(true)}
                >
                  <span>
                    {langConfig[lang]?.flag} {langConfig[lang]?.label}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
            </nav>

            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-hairline-soft">
              <a
                href={contactUrl}
                data-consultation-trigger={consultationTrigger || undefined}
                {...rybbitClickAttrs(
                  RYBBIT_EVENTS.businessConsultClick,
                  'home_nav_mobile_menu_consult'
                )}
                className="h-10 inline-flex items-center justify-center rounded-full text-[13px] font-medium text-white bg-btn-dark"
                onClick={() => {
                  setMobileOpen(false);
                  onConsultClick?.();
                }}
              >
                {t.consult}
              </a>
              <a
                href={mobileStartUrl}
                rel="noopener noreferrer nofollow"
                {...rybbitClickAttrs(RYBBIT_EVENTS.cloudServiceClick, 'home_nav_mobile_trial')}
                className="h-10 inline-flex items-center justify-center rounded-full bg-white border border-hairline-soft text-[13px] font-medium text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {t.trial}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Native dialog provides focus containment, Escape, and focus restoration. */}
      {hasLanguageSwitcher && (
        <dialog
          ref={languageDialog}
          aria-label="Switch language"
          onCancel={() => setLangSheetOpen(false)}
          onClose={() => setLangSheetOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setLangSheetOpen(false);
          }}
          className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto rounded-t-2xl border-0 bg-white p-0 text-ink backdrop:bg-black/30"
        >
          <div className={`p-6 ${variant === 'comparison' ? 'comparison-language-sheet' : ''}`}>
            <button
              type="button"
              aria-label="Close language menu"
              className="mb-2 ml-auto block h-11 w-11 rounded-lg text-xl hover:bg-slate-100"
              onClick={() => setLangSheetOpen(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
            <nav aria-label="Available languages" className="flex flex-col gap-1">
              {languageTargets.map((target) => (
                <a
                  key={target.locale}
                  href={target.href}
                  hrefLang={getLocaleHreflang(target.locale)}
                  lang={getLocaleHreflang(target.locale)}
                  data-language-switch={target.locale}
                  aria-current={target.locale === lang ? 'page' : undefined}
                  className="flex min-h-11 items-center justify-between rounded-lg px-4 py-3 text-[16px] text-ink-sub hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                  onClick={(event) => {
                    prepareLanguageLink(event.currentTarget, target);
                    setLangSheetOpen(false);
                    setMobileOpen(false);
                  }}
                  onAuxClick={(event) => prepareLanguageLink(event.currentTarget, target)}
                  onContextMenu={(event) => prepareLanguageLink(event.currentTarget, target)}
                >
                  <span>
                    {langConfig[target.locale]?.flag} {langConfig[target.locale]?.label}
                  </span>
                  {target.locale === lang && <span aria-hidden="true">✓</span>}
                </a>
              ))}
            </nav>
          </div>
        </dialog>
      )}
    </>
  );
}
