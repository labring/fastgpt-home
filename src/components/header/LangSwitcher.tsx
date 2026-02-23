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
import { Globe } from 'lucide-react';

const langFlags: Record<string, string> = {
  zh: '🇨🇳',
  en: '🇺🇸',
  ja: '🇯🇵'
};

const langLabels: Record<string, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語'
};

export const LangSwitcher = () => {
  const params = useParams<{ lang: string }>();
  const lang = params.lang;
  const pathname = usePathname();
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
      <SelectTrigger className="w-fit gap-1.5 bg-white/20 hover:bg-white/10 border-none">
        <Globe className="h-4 w-4 shrink-0" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(localeNames).map((key: string) => (
          <SelectItem className="cursor-pointer" key={key} value={key}>
            <span className="flex items-center gap-2">
              <span>{langFlags[key]}</span>
              <span>{langLabels[key]}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
