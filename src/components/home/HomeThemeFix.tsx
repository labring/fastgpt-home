'use client';

import { useEffect } from 'react';

// Forces light color-scheme + white html background on the homepage only.
// The static root shell starts dark so non-home pages retain their dark background.
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
