'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import FastGPTLogo from '@/components/home/FastGPTLogo';
import { LangSwitcher } from '@/components/header/LangSwitcher';
import { defaultLocale } from '@/lib/i18n';
import { getNavHref } from '@/lib/utils';
import { useStartUrl, CONSULT_URL } from '@/components/home/hooks/useStartUrl';

interface NavLink {
  label: string;
  href: string;
}

type NavCta = { trial: string; consult: string };

export default function Navbar({
  links = [],
  t
}: {
  links?: NavLink[];
  t: NavCta;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const params = useParams<{ lang: string }>();
  const lang = params?.lang || defaultLocale;
  const startUrl = useStartUrl();

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[10px] bg-white/5">
        <div className="max-w-[min(85vw,1300px)] h-[68px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2" aria-label="FastGPT Home">
              <FastGPTLogo size={22} />
              <span className="text-[18px] font-semibold text-ink tracking-[-0.36px]">FastGPT</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-[14px] text-ink-sub">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={getNavHref(link.href, lang)}
                  className="hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="home-lang">
              <LangSwitcher />
            </div>
            <a
              href={startUrl}
              rel="noopener noreferrer nofollow"
              aria-label={t.trial}
              className="px-5 py-2 rounded-full bg-white border border-hairline-soft text-[13px] font-medium text-ink hover:bg-light-bg transition-colors"
            >
              {t.trial}
            </a>
            <a
              href={CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={t.consult}
              className="px-5 py-2 rounded-full text-[13px] font-medium text-white bg-btn-dark hover:opacity-90 transition-opacity"
            >
              {t.consult}
            </a>
          </div>

          <button
            className="md:hidden p-2 text-ink relative z-[60]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay — rendered as a SIBLING of <nav>, not a descendant.
          A backdrop-filter on the nav creates a containing block for fixed
          descendants, which would scope a fixed overlay to the 68px nav bar
          instead of the full viewport. Keep it outside.

          Full-viewport (fixed inset-0, h = 100vh). Background is a translucent
          frosted white so empty space naturally shows the page behind through
          the blur. Inner container is height-100% flex-col with mt-auto pushing
          the CTA buttons to the bottom of the screen. */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-white/70 backdrop-blur-[18px] backdrop-saturate-150"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="h-full w-full pt-[68px] pb-10 px-6 flex flex-col text-[16px] text-ink-sub"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1 pt-6">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={getNavHref(link.href, lang)}
                  className="py-3 hover:text-ink transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-hairline-soft">
              <a
                href={startUrl}
                rel="noopener noreferrer nofollow"
                className="h-11 inline-flex items-center justify-center rounded-full bg-white border border-hairline-soft text-[14px] font-medium text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {t.trial}
              </a>
              <a
                href={CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="h-11 inline-flex items-center justify-center rounded-full text-[14px] font-medium text-white bg-btn-dark"
                onClick={() => setMobileOpen(false)}
              >
                {t.consult}
              </a>
              <div className="home-lang flex justify-center pt-1">
                <LangSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
