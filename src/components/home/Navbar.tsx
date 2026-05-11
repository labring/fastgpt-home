'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { defaultLocale, localeNames } from '@/lib/i18n';
import { getNavHref } from '@/lib/utils';
import { navigateTo, rememberPreferredLanguage } from '@/lib/clientNavigation';
import { useStartUrl, CONSULT_URL } from '@/components/home/hooks/useStartUrl';
import { LangSwitcher } from '@/components/header/LangSwitcher';
import Image from 'next/image';
import { localeConfigs } from '@/lib/locales';

interface NavLink {
  label: string;
  href: string;
}

type NavCta = { trial: string; consult: string };

function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href);
}

export default function Navbar({ links = [], t }: { links?: NavLink[]; t: NavCta }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(true);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [langSheetOpen, setLangSheetOpen] = useState(false);
  const params = useParams<{ lang: string }>();
  const lang = params?.lang || defaultLocale;
  const startUrl = useStartUrl();
  const pathname = usePathname();

  const handleSwitchLanguage = (value: string) => {
    if (value === lang) return;
    rememberPreferredLanguage(value);
    let routeWithoutLang = pathname;
    if (params?.lang) {
      const currentLangPrefix = `/${params.lang}`;
      if (pathname.startsWith(currentLangPrefix)) {
        routeWithoutLang = pathname.slice(currentLangPrefix.length) || '/';
      }
    }
    navigateTo(`/${value}${routeWithoutLang}`);
  };

  const langConfig = localeConfigs.reduce(
    (acc, locale) => {
      acc[locale.code] = { flag: locale.flag, label: locale.name };
      return acc;
    },
    {} as Record<string, { flag: string; label: string }>
  );

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          hideNavbar ? '-translate-y-full' : 'translate-y-0'
        }`}
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
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={getNavHref(link.href, lang)}
                  target={isExternalHref(link.href) ? '_blank' : undefined}
                  rel={isExternalHref(link.href) ? 'noopener noreferrer nofollow' : undefined}
                  className="hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="home-lang">
              <LangSwitcher iconOnly />
            </div>
            <a
              href={startUrl}
              rel="noopener noreferrer nofollow"
              aria-label={t.trial}
              className="px-4 py-1.5 rounded-full bg-white border border-hairline-soft text-[12px] font-medium text-ink hover:bg-gray-50 transition-colors"
            >
              {t.trial}
            </a>
            <a
              href={CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={t.consult}
              className="px-4 py-1.5 rounded-full text-[12px] font-medium text-white bg-btn-dark hover:opacity-90 transition-opacity"
            >
              {t.consult}
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <a
              href={CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={t.consult}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium text-white bg-btn-dark transition-opacity duration-300 ${
                showMobileCta && !mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {t.consult}
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
        <div className="md:hidden fixed inset-0 z-40 bg-white" onClick={() => setMobileOpen(false)}>
          <div
            className="h-full w-full pt-[58px] pb-10 px-8 flex flex-col text-[16px] text-ink-sub"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1 pt-6">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={getNavHref(link.href, lang)}
                  target={isExternalHref(link.href) ? '_blank' : undefined}
                  rel={isExternalHref(link.href) ? 'noopener noreferrer nofollow' : undefined}
                  className="py-3 hover:text-ink transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
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
            </nav>

            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-hairline-soft">
              <a
                href={startUrl}
                rel="noopener noreferrer nofollow"
                className="h-10 inline-flex items-center justify-center rounded-full bg-white border border-hairline-soft text-[13px] font-medium text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {t.trial}
              </a>
              <a
                href={CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="h-10 inline-flex items-center justify-center rounded-full text-[13px] font-medium text-white bg-btn-dark"
                onClick={() => setMobileOpen(false)}
              >
                {t.consult}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile language bottom sheet */}
      {langSheetOpen && (
        <div className="md:hidden fixed inset-0 z-[70]" onClick={() => setLangSheetOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <div className="flex flex-col gap-1">
              {Object.keys(localeNames).map((key) => (
                <button
                  key={key}
                  className="flex items-center justify-between py-3 px-4 rounded-lg text-[16px] text-ink-sub hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    handleSwitchLanguage(key);
                    setLangSheetOpen(false);
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{langConfig[key]?.flag}</span>
                    <span>{langConfig[key]?.label}</span>
                  </span>
                  {key === lang && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
