'use client';

import { useEffect } from 'react';

// Forces light color-scheme + white html background on the homepage only.
// Needed because the root ThemeProvider uses forcedTheme="dark", which HeroUI
// translates into a black `html` background via the `.dark` class.
export default function HomeThemeFix() {
  useEffect(() => {
    const html = document.documentElement;
    const prevClass = html.className;
    const prevStyle = html.getAttribute('style') || '';

    html.classList.remove('dark');
    html.style.colorScheme = 'light';
    html.style.background = '#ffffff';

    return () => {
      html.className = prevClass;
      if (prevStyle) {
        html.setAttribute('style', prevStyle);
      } else {
        html.removeAttribute('style');
      }
    };
  }, []);
  return null;
}
