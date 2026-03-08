// Performance optimization utilities

/**
 * Lazy load component with dynamic import
 * @example
 * const LazyComponent = lazyLoad(() => import('./HeavyComponent'))
 */
export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = React.lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={fallback || <div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  // Preload critical fonts
  const fonts = [
    '/fonts/inter-var.woff2',
    // Add other critical fonts
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = font;
    document.head.appendChild(link);
  });
}

/**
 * Defer non-critical scripts
 */
export function deferNonCriticalScripts() {
  if (typeof window === 'undefined') return;

  // Defer analytics scripts
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach(script => {
    script.setAttribute('defer', '');
  });
}

/**
 * Optimize images with intersection observer
 */
export function setupLazyImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) img.src = src;
        if (srcset) img.srcset = srcset;

        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * Measure and report Web Vitals
 */
export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}

/**
 * Optimize third-party scripts loading
 */
export function optimizeThirdPartyScripts() {
  if (typeof window === 'undefined') return;

  // Delay loading of non-critical third-party scripts
  const delay = 3000; // 3 seconds after page load

  setTimeout(() => {
    // Load analytics scripts
    const scripts = [
      // Add third-party script URLs here
    ];

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });
  }, delay);
}

/**
 * Prefetch links on hover
 */
export function setupLinkPrefetch() {
  if (typeof window === 'undefined') return;

  const prefetchedLinks = new Set<string>();

  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');

    if (link && link.href && !prefetchedLinks.has(link.href)) {
      const url = new URL(link.href);
      
      // Only prefetch same-origin links
      if (url.origin === window.location.origin) {
        const linkElement = document.createElement('link');
        linkElement.rel = 'prefetch';
        linkElement.href = link.href;
        document.head.appendChild(linkElement);
        
        prefetchedLinks.add(link.href);
      }
    }
  });
}

import React from 'react';
