'use client';

import { useEffect } from 'react';

const rewrittenFaqLocales = ['ja', 'ar', 'vi', 'th', 'id', 'ms'];

function getRewrittenFaqLocale(pathname: string) {
  const match = pathname.match(/^\/([^/]+)\/faq(?:\/|$)/);
  if (!match) return null;
  return rewrittenFaqLocales.includes(match[1]) ? match[1] : null;
}

export default function FaqLocalePreserver() {
  useEffect(() => {
    const locale = getRewrittenFaqLocale(window.location.pathname);
    if (!locale) return;

    try {
      localStorage.setItem('preferredLang', locale);
    } catch {}

    const rewriteHref = (href: string | null) => {
      if (!href || !href.startsWith('/en/faq')) return href;
      return href.replace(/^\/en\/faq/, `/${locale}/faq`);
    };

    const syncLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="/en/faq"]').forEach((anchor) => {
        const nextHref = rewriteHref(anchor.getAttribute('href'));
        if (nextHref) anchor.setAttribute('href', nextHref);
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="/en/faq"]');
      if (!anchor) return;

      const nextHref = rewriteHref(anchor.getAttribute('href'));
      if (!nextHref) return;

      event.preventDefault();
      window.location.assign(nextHref);
    };

    syncLinks();
    document.addEventListener('click', handleClick, true);

    const observer = new MutationObserver(syncLinks);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href']
    });

    return () => {
      document.removeEventListener('click', handleClick, true);
      observer.disconnect();
    };
  }, []);

  return null;
}
