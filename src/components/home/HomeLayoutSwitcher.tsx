'use client';

import type { ComponentProps, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/home/Navbar';

interface HomeLayoutSwitcherProps {
  links: ComponentProps<typeof Navbar>['links'];
  navCta: ComponentProps<typeof Navbar>['t'];
  children: ReactNode;
}

export default function HomeLayoutSwitcher({ links, navCta, children }: HomeLayoutSwitcherProps) {
  const pathname = usePathname() || '/';
  const isHome = /^\/([a-z]{2,3}(?:-[A-Za-z]{2,4})?)?$/.test(pathname);
  const isTechArticle =
    /\/(?:api|dataset|deploy|integration|node|troubleshoot|tutorial|reference|model|glossary)\/[^/]+$/.test(
      pathname
    );
  const isSelfContained =
    /\/(?:blog|faq|price|tech-center|compare|contact|guide|industry)(?:\/|$)/.test(pathname) ||
    isTechArticle;

  if (isHome || isSelfContained) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar links={links} t={navCta} />
      <main className="flex flex-col items-center mt-12 sm:mt-14 lg:mt-20">
        <div className="mx-4 sm:mx-6 md:mx-12 xl:mx-[60px] 2xl:max-w-7xl 2xl:mx-auto flex flex-col items-center margin-top-40">
          {children}
        </div>
      </main>
    </>
  );
}
