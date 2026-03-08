import { useEffect, useState } from 'react';

/**
 * Hook for progressive image loading
 * Loads a low-quality placeholder first, then the full image
 */
export function useProgressiveImage(src: string, placeholderSrc?: string) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };
  }, [src]);

  return { src: imgSrc, isLoading };
}

/**
 * Hook for lazy loading images with Intersection Observer
 */
export function useLazyImage(ref: React.RefObject<HTMLImageElement>, src: string) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setImageSrc(src);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, src]);

  return { src: imageSrc, isVisible };
}

/**
 * Hook for responsive images
 * Returns appropriate image source based on viewport width
 */
export function useResponsiveImage(sources: {
  mobile?: string;
  tablet?: string;
  desktop: string;
}) {
  const [imageSrc, setImageSrc] = useState(sources.desktop);

  useEffect(() => {
    const updateImageSrc = () => {
      const width = window.innerWidth;

      if (width < 768 && sources.mobile) {
        setImageSrc(sources.mobile);
      } else if (width < 1024 && sources.tablet) {
        setImageSrc(sources.tablet);
      } else {
        setImageSrc(sources.desktop);
      }
    };

    updateImageSrc();
    window.addEventListener('resize', updateImageSrc);

    return () => {
      window.removeEventListener('resize', updateImageSrc);
    };
  }, [sources]);

  return imageSrc;
}

/**
 * Hook for WebP support detection
 */
export function useWebPSupport() {
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      if (canvas.getContext && canvas.getContext('2d')) {
        // Check if browser supports WebP
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      return false;
    };

    setSupportsWebP(checkWebPSupport());
  }, []);

  return supportsWebP;
}

/**
 * Get optimized image source with WebP fallback
 */
export function getOptimizedImageSrc(src: string, supportsWebP: boolean | null): string {
  if (supportsWebP === null) return src;

  if (supportsWebP && !src.endsWith('.webp')) {
    // Try to use WebP version
    const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
    return webpSrc;
  }

  return src;
}

/**
 * Hook for image preloading
 */
export function useImagePreload(sources: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    sources.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(src));
      };
    });
  }, [sources]);

  return loadedImages;
}
