'use client';
import { defaultLocale, localeNames } from '@/lib/i18n';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const langConfig: Record<string, { flag: string; label: string }> = {
  zh: { flag: '🇨🇳', label: '中文' },
  en: { flag: '🇺🇸', label: 'English' },
  ja: { flag: '🇯🇵', label: '日本語' }
};

export const LangSwitcher = () => {
  const params = useParams<{ lang: string }>();
  const lang = params.lang;
  const pathname = usePathname();
  const langName = lang || defaultLocale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSwitchLanguage = (value: string) => {
    if (value === langName) return;
    localStorage.setItem('preferredLang', value);
    let routeWithoutLang = pathname;

    if (lang) {
      const currentLangPrefix = `/${lang}`;
      if (pathname.startsWith(currentLangPrefix)) {
        routeWithoutLang = pathname.slice(currentLangPrefix.length) || '/';
      }
    }
    const newPath = `/${value}${routeWithoutLang}`;
    window.location.href = newPath;
  };

  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLang');
    if (storedLang && storedLang !== lang && Object.keys(localeNames).includes(storedLang)) {
      let routeWithoutLang = pathname;

      if (lang) {
        const currentLangPrefix = `/${lang}`;
        if (pathname.startsWith(currentLangPrefix)) {
          routeWithoutLang = pathname.slice(currentLangPrefix.length) || '/';
        }
      }

      const newPath = `/${storedLang}${routeWithoutLang}`;
      window.location.href = newPath;
    }
  }, [lang, pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = langConfig[langName];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-1.5 rounded-md px-3 py-2 text-sm bg-white/20 hover:bg-white/10 border-none cursor-pointer"
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-1.5">
          <span className="text-base leading-none">{current?.flag}</span>
          <span className="text-sm">{current?.label}</span>
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        >
          <div className="p-1">
            {Object.keys(localeNames).map((key: string) => (
              <div
                role="option"
                aria-selected={key === langName}
                key={key}
                className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-3 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  handleSwitchLanguage(key);
                  setOpen(false);
                }}
              >
                <span className="flex items-center gap-2">
                  {key === langName && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  )}
                  <span className="text-base leading-none">{langConfig[key]?.flag}</span>
                  <span>{langConfig[key]?.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
