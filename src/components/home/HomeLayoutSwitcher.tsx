'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/home/Navbar';

interface HomeLayoutSwitcherProps {
  dict: {
    links: { label: string; href: string }[];
    Home: any;
  };
  children: ReactNode;
}

export default function HomeLayoutSwitcher({ dict, children }: HomeLayoutSwitcherProps) {
  const pathname = usePathname() || '/';
  const t = dict.Home;
  const isHome = /^\/([a-z]{2,3}(?:-[A-Za-z]{2,4})?)?$/.test(pathname);
  const isSelfContained = /\/faq|\/price/.test(pathname);

  if (isHome || isSelfContained) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar links={dict.links} t={t.navCta} />
      <main className="flex flex-col items-center mt-12 sm:mt-14 lg:mt-20">
        <div className="mx-4 sm:mx-6 md:mx-12 xl:mx-[60px] 2xl:max-w-7xl 2xl:mx-auto flex flex-col items-center margin-top-40">
          {children}
        </div>
      </main>
    </>
  );
}
