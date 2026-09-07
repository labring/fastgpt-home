'use client';

import { useEffect, useRef } from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { localeConfigs, type LocaleCode } from '@/lib/locales';
import { getLocaleHreflang } from '@/lib/siteRouting';
import { prepareLanguageLink, type LanguageTarget } from '@/lib/languageNavigation';

export const LangSwitcher = ({
  iconOnly = false,
  locale,
  targets
}: {
  iconOnly?: boolean;
  locale: LocaleCode;
  targets: LanguageTarget[];
}) => {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) ref.current.open = false;
    };
    document.addEventListener('mousedown', closeOutside);
    return () => document.removeEventListener('mousedown', closeOutside);
  }, []);

  if (targets.length < 2) return null;
  const current = localeConfigs.find((config) => config.code === locale);

  return (
    <details
      ref={ref}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && ref.current?.open) {
          ref.current.open = false;
          ref.current.querySelector('summary')?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
    >
      <summary
        aria-label="Switch language"
        className={`flex cursor-pointer list-none items-center gap-1.5 rounded-md text-ink-sub hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden ${
          iconOnly ? 'p-1.5' : 'h-10 px-3 py-2 text-sm'
        }`}
      >
        {iconOnly ? (
          <Languages size={18} aria-hidden="true" />
        ) : (
          <>
            <span>
              {current?.flag} {current?.name}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
          </>
        )}
      </summary>
      <nav
        aria-label="Available languages"
        data-language-menu
        className="absolute right-0 top-full z-50 mt-1 min-w-[11rem] rounded-md border border-hairline-soft bg-white p-1 text-ink shadow-md"
      >
        {targets.map((target) => {
          const config = localeConfigs.find((candidate) => candidate.code === target.locale)!;
          return (
            <a
              key={target.locale}
              href={target.href}
              hrefLang={getLocaleHreflang(target.locale)}
              lang={config.htmlLang}
              data-language-switch={target.locale}
              aria-current={target.locale === locale ? 'page' : undefined}
              className="flex min-h-11 items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
              onClick={(event) => {
                prepareLanguageLink(event.currentTarget, target);
                if (ref.current) ref.current.open = false;
              }}
              onAuxClick={(event) => prepareLanguageLink(event.currentTarget, target)}
              onContextMenu={(event) => prepareLanguageLink(event.currentTarget, target)}
            >
              <span aria-hidden="true">{config.flag}</span>
              <span>{config.name}</span>
              {target.locale === locale && <Check className="ml-auto h-4 w-4" aria-hidden="true" />}
            </a>
          );
        })}
      </nav>
    </details>
  );
};
