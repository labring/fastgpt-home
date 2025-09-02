'use client';
import PhMoonFill from '@/components/icons/moon';
import PhSunBold from '@/components/icons/sun';
import { siteConfig } from '@/config/site';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const HeaderLinks = () => {
  const links = siteConfig.headerLinks;
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  return (
    <div className="flex items-start gap-4 md:flex-row flex-col w-full">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener norefferer nofollow"
          className={` flex items-center justify-center gap-4 hover:bg-white/10 p-1 rounded-md`}
        >
          {link.icon && React.createElement(link.icon, { className: 'text-2xl' })}
          <div className="md:hidden font-medium">{link.name}</div>
        </Link>
      ))}
    </div>
  );
};
export default HeaderLinks;
