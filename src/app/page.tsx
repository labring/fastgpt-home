'use client';

import { useEffect } from 'react';
import { defaultLocale, localeNames } from '@/lib/i18n';

export default function RootPage() {
  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLang');
    const lang =
      storedLang && Object.keys(localeNames).includes(storedLang)
        ? storedLang
        : defaultLocale;
    window.location.replace(`/${lang}`);
  }, []);

  return null;
}
