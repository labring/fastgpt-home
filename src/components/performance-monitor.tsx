'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface WebVitalsMetric {
  name: 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  debug?: boolean;
  onMetric?: (metric: WebVitalsMetric) => void;
}

export function PerformanceMonitor({
  enabled = true,
  debug = false,
  onMetric,
}: PerformanceMonitorProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Import web-vitals dynamically
    import('web-vitals').then(({ onCLS, onFCP, onFID, onLCP, onTTFB, onINP }) => {
      const handleMetric = (metric: WebVitalsMetric) => {
        if (debug) {
          console.log(`[Web Vitals] ${metric.name}:`, {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
          });
        }

        // Send to analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          });
        }

        // Custom callback
        onMetric?.(metric);
      };

      // Register all Core Web Vitals
      onCLS(handleMetric);
      onFCP(handleMetric);
      onFID(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
      onINP(handleMetric);
    });
  }, [enabled, debug, onMetric]);

  // Track page views
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: pathname,
      });
    }

    if (debug) {
      console.log('[Performance Monitor] Page view:', pathname);
    }
  }, [pathname, enabled, debug]);

  return null;
}

/**
 * Performance metrics display (for development)
 */
export function PerformanceMetrics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const displayMetrics = () => {
      if (!performance || !performance.getEntriesByType) return;

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      console.group('📊 Performance Metrics');
      
      if (navigation) {
        console.log('DNS Lookup:', `${Math.round(navigation.domainLookupEnd - navigation.domainLookupStart)}ms`);
        console.log('TCP Connection:', `${Math.round(navigation.connectEnd - navigation.connectStart)}ms`);
        console.log('Request Time:', `${Math.round(navigation.responseStart - navigation.requestStart)}ms`);
        console.log('Response Time:', `${Math.round(navigation.responseEnd - navigation.responseStart)}ms`);
        console.log('DOM Processing:', `${Math.round(navigation.domComplete - navigation.domLoading)}ms`);
        console.log('Load Complete:', `${Math.round(navigation.loadEventEnd - navigation.fetchStart)}ms`);
      }

      paint.forEach(entry => {
        console.log(`${entry.name}:`, `${Math.round(entry.startTime)}ms`);
      });

      console.groupEnd();
    };

    // Display metrics after page load
    if (document.readyState === 'complete') {
      displayMetrics();
    } else {
      window.addEventListener('load', displayMetrics);
      return () => window.removeEventListener('load', displayMetrics);
    }
  }, []);

  return null;
}

/**
 * Resource timing monitor
 */
export function ResourceTimingMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        
        // Log slow resources (>1s)
        if (resource.duration > 1000) {
          console.warn('⚠️ Slow resource:', {
            name: resource.name,
            duration: `${Math.round(resource.duration)}ms`,
            size: resource.transferSize ? `${Math.round(resource.transferSize / 1024)}KB` : 'cached',
            type: resource.initiatorType,
          });
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return null;
}

/**
 * Long task monitor
 */
export function LongTaskMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('⚠️ Long task detected:', {
            duration: `${Math.round(entry.duration)}ms`,
            startTime: `${Math.round(entry.startTime)}ms`,
          });
        }
      });

      observer.observe({ entryTypes: ['longtask'] });

      return () => observer.disconnect();
    } catch (e) {
      // longtask may not be supported
    }
  }, []);

  return null;
}
