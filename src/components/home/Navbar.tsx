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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border-b border-hairline-soft">
        <div className="px-[32px] py-[12px] flex items-center justify-between max-w-[min(100vw,1440px)] mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1" aria-label="FastGPT Home">
              <FastGPTLogo size={22} />
              <span className="text-[18px] font-semibold text-ink tracking-[-0.36px]" style={{ fontFamily: "'PingFang SC', sans-serif" }}>FastGPT</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-[14px] text-ink-sub">
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

          <div className="hidden md:flex items-center gap-4">
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

          <button
            className="md:hidden p-2 text-ink relative z-[60]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-white"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="h-full w-full pt-[52px] pb-10 px-8 flex flex-col text-[16px] text-ink-sub"
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
