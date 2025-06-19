"use client";
import HeaderLinks from "@/components/header/HeaderLinks";
import { LangSwitcher } from "@/components/header/LangSwitcher";
import { siteConfig } from "@/config/site";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useParams } from 'next/navigation';
import { defaultLocale } from "@/lib/i18n";
import { getNavHref } from "@/lib/utils";

type Dict = {
  links: {
    label: string;
    href: string;
  }[];
};

const Header = ({
  dict,
}: {
  dict: Dict;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams<{ lang: string }>();
  const lang = params?.lang || defaultLocale;

  return (
    <header className="relative py-2 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 flex justify-between">
      <nav className="z-50 flex justify-between w-full">
        <LogoFC dict={dict} lang={lang} />
        <div className="hidden md:flex items-center gap-x-4">
          <HeaderLinks />
          {/* <ThemedButton /> */}
          <LangSwitcher />
        </div>
      </nav>

      <div className="md:hidden">
        <button
          aria-label="Open Menu"
          title="Open Menu"
          className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon />
        </button>
        {isMenuOpen && (
          <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-overlay/50">
            <div className="p-5 bg-background rounded shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <LogoFC dict={dict} lang={lang} />
                <div>
                  <button
                    aria-label="Close Menu"
                    title="Close Menu"
                    className="tracking-wide transition-colors duration-200 font-norma"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CgClose />
                  </button>
                </div>
              </div>
              <nav>
                <ul className="space-y-4">
                  {dict?.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={getNavHref(link.href, lang)}
                        aria-label={link.label}
                        title={link.label}
                        className="font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400 hover:bg-white/10 p-1 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-4 border-t-1 flex flex-col gap-6 pt-4 border-white/10">
                <HeaderLinks />
                {/* <ThemedButton /> */}
                <LangSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

const LogoFC = ({ dict, lang }: { dict: Dict, lang: string }) => (
  <div className="flex items-center md:gap-x-12">
    <Link
      href="/"
      aria-label="FastGPT"
      title="FastGPT"
      className="flex items-center space-x-3 font-bold "
    >
      <Image
        alt={siteConfig.name}
        src="/logo.svg"
        className="w-[30px] h-[30px] bg-[#E9E9E9] p-1 rounded-md dark:bg-opacity-20"
        width={32}
        height={32}
      />
      <span className="text-white hidden md:block">
        FastGPT
      </span>
    </Link>

    <ul className="hidden items-center gap-5 md:flex">
      {dict?.links.map((link) => (
        <li key={link.label} className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded-md">
          <Link
            href={getNavHref(link.href, lang)}
            aria-label={link.label}
            title={link.label}
            className="tracking-wide transition-colors duration-200 font-norma"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
