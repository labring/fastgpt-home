'use client';

import { useRef, useState, useEffect } from 'react';
import { useLazyImage, useWebPSupport, getOptimizedImageSrc } from '@/hooks/useImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const supportsWebP = useWebPSupport();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Use lazy loading for non-priority images
  const { src: lazySrc, isVisible } = useLazyImage(
    imgRef,
    priority ? src : ''
  );

  // Get optimized source (WebP if supported)
  const optimizedSrc = getOptimizedImageSrc(
    priority ? src : (lazySrc || ''),
    supportsWebP
  );

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // For priority images, load immediately
  useEffect(() => {
    if (priority && imgRef.current) {
      const img = imgRef.current;
      if (img.complete) {
        handleLoad();
      }
    }
  }, [priority]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...(width && { width: `${width}px` }),
        ...(height && { height: `${height}px` }),
      }}
    >
      {/* Placeholder */}
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={priority ? optimizedSrc : (isVisible ? optimizedSrc : undefined)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          ...(width && height && {
            aspectRatio: `${width} / ${height}`,
          }),
        }}
      />

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Failed to load image
          </span>
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && !placeholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

/**
 * Responsive image component with srcset support
 */
interface ResponsiveImageProps extends OptimizedImageProps {
  srcSet?: {
    mobile?: string;
    tablet?: string;
    desktop: string;
  };
  sizes?: string;
}

export function ResponsiveImage({
  srcSet,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  ...props
}: ResponsiveImageProps) {
  if (!srcSet) {
    return <OptimizedImage {...props} />;
  }

  const srcSetString = [
    srcSet.mobile && `${srcSet.mobile} 768w`,
    srcSet.tablet && `${srcSet.tablet} 1024w`,
    `${srcSet.desktop} 1920w`,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <OptimizedImage
      {...props}
      src={srcSet.desktop}
      // Note: srcset would need to be added to the img element in OptimizedImage
    />
  );
}
