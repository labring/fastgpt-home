'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/header/Header';

interface HomeLayoutSwitcherProps {
  dict: {
    links: { label: string; href: string }[];
    CTAButton: any;
  };
  children: ReactNode;
}

// Match `/` and any locale code (`/en`, `/zh-CN`, `/zh-TW`, etc.) — the homepage
// routes. Everything else gets the legacy dark Header + centered main wrapper.
const HOMEPAGE_RE = /^\/([a-z]{2,3}(?:-[A-Za-z]{2,4})?)?$/;

export default function HomeLayoutSwitcher({ dict, children }: HomeLayoutSwitcherProps) {
  const pathname = usePathname() || '/';
  const isHome = HOMEPAGE_RE.test(pathname);

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header dict={dict} CTALocale={dict.CTAButton} />
      <main className="flex flex-col items-center mt-12 sm:mt-14 lg:mt-20">
        <div className="mx-4 sm:mx-6 md:mx-12 xl:mx-[60px] 2xl:max-w-7xl 2xl:mx-auto flex flex-col items-center margin-top-40">
          {children}
        </div>
      </main>
    </>
  );
}
