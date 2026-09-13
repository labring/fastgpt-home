'use client';

import { getSafeFreeUseUrl } from '@customers/lib/free-use-url';

interface FreeUseActionProps {
  href?: string | null;
  title: string;
  className?: string;
}

export function FreeUseCoverShade({ href }: Pick<FreeUseActionProps, 'href'>) {
  if (!getSafeFreeUseUrl(href)) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/32 via-black/10 to-transparent  " />
  );
}

export function FreeUseCardBadge({ href, title, className = '' }: FreeUseActionProps) {
  const freeUseUrl = getSafeFreeUseUrl(href);
  if (!freeUseUrl) {
    return null;
  }

  return (
    <a
      href={freeUseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/free absolute bottom-3 right-3 z-20 inline-flex h-8 w-8 max-w-[calc(100%-1.5rem)] items-center justify-center gap-0 overflow-hidden rounded-full border border-white/75 bg-brand-600 px-0 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(37,99,235,0.34)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_28px_rgba(37,99,235,0.42)] focus-visible:w-[6.25rem] focus-visible:-translate-y-0.5 focus-visible:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white        sm:group-hover:w-[6.25rem] ${className}`.trim()}
      aria-label={`体验案例 ${title}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover/free:bg-white/8 group-focus-visible/free:bg-white/8 " />
      <span className="pointer-events-none absolute inset-1 rounded-full bg-white/0 blur-md transition-opacity duration-300 group-hover/free:bg-white/20 group-hover/free:opacity-100 group-focus-visible/free:bg-white/20 group-focus-visible/free:opacity-100 " />
      <svg
        viewBox="0 0 24 24"
        className="relative z-10 h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover/free:scale-110 group-focus-visible/free:scale-110"
        aria-hidden
      >
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="M9.6 8.4l6 3.6-6 3.6z" fill="#2563EB" />
      </svg>
      <span className="relative z-10 ml-0 max-w-0 translate-x-1 whitespace-nowrap opacity-0 transition-[max-width,opacity,transform,margin] duration-300 group-hover:ml-1.5 group-hover:max-w-[4em] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible/free:ml-1.5 group-focus-visible/free:max-w-[4em] group-focus-visible/free:translate-x-0 group-focus-visible/free:opacity-100">
        体验案例
      </span>
    </a>
  );
}

export function FreeUseHeroButton({ href, title, className = '' }: FreeUseActionProps) {
  const freeUseUrl = getSafeFreeUseUrl(href);
  if (!freeUseUrl) {
    return null;
  }

  return (
    <a
      href={freeUseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-14 min-w-[9.25rem] items-center justify-center whitespace-nowrap rounded-xl border-2 border-brand-600 bg-white px-8 text-base font-bold text-brand-700 transition-colors hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-100        ${className}`.trim()}
      aria-label={`体验案例 ${title}`}
    >
      <span>体验案例</span>
    </a>
  );
}
