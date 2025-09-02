'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { defaultLocale, localeNames } from '@/lib/i18n';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const LangSwitcher = () => {
  const params = useParams<{ lang: string }>();
  const lang = params.lang;
  const pathname = usePathname();

  // const lang = (params.lang && params.lang[0]) || defaultLocale;
  // let langName = lang && lang[0] && lang[0] !== 'index' ? lang[0] : defaultLocale;
  const langName = lang || defaultLocale;
  const router = useRouter();

  const handleSwitchLanguage = (value: string) => {
    localStorage.setItem('preferredLang', value);
    let routeWithoutLang = pathname;

    if (lang) {
      const currentLangPrefix = `/${lang}`;
      if (pathname.startsWith(currentLangPrefix)) {
        routeWithoutLang = pathname.slice(currentLangPrefix.length) || '/';
      }
    }
    const newPath = `/${value}${routeWithoutLang}`;

    router.push(newPath);
  };

  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLang');
    if (storedLang && storedLang !== lang) {
      let routeWithoutLang = pathname;

      if (lang) {
        const currentLangPrefix = `/${lang}`;
        if (pathname.startsWith(currentLangPrefix)) {
          routeWithoutLang = pathname.slice(currentLangPrefix.length) || '/';
        }
      }

      const newPath = `/${storedLang}${routeWithoutLang}`;
      router.push(newPath);
    }
  }, [lang, pathname, router]);

  return (
    <Select value={langName} onValueChange={handleSwitchLanguage}>
      <SelectTrigger className="w-fit bg-white/20 hover:bg-white/10">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(localeNames).map((key: string) => {
          const name = localeNames[key];
          return (
            <SelectItem className="cursor-pointer" key={key} value={key}>
              {name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
