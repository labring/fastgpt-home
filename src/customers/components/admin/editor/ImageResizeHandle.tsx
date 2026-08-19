'use client';

import { useEffect, useRef, useState } from 'react';

const SNAP_POINTS = [25, 33, 50, 66, 75, 100];

function snapToNearest(value: number, points: number[]): number {
  let best = points[0];
  let bestDist = Math.abs(value - best);
  for (let i = 1; i < points.length; i++) {
    const dist = Math.abs(value - points[i]);
    if (dist < bestDist) {
      best = points[i];
      bestDist = dist;
    }
  }
  return best;
}

interface ImageResizeHandleProps {
  src: string;
  alt: string;
  /** 当前已持久化的宽度百分比，如 "50%"，undefined 表示全宽 */
  currentWidth?: string;
  /** 对应 textarea 中的行起始位置，用于双向定位 */
  dataLineStart?: number;
  onResize: (widthPercent: string) => void;
  onClick?: () => void;
  className?: string;
}

export default function ImageResizeHandle({ src, alt, currentWidth, dataLineStart, onResize, onClick, className = '' }: ImageResizeHandleProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPct, setDragPct] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const containerWidthRef = useRef(700);

  const appliedWidth = dragPct ? `${dragPct}%` : currentWidth;

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected((prev) => !prev);
    onClick?.();
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const parentWidth = container.parentElement?.clientWidth ?? 700;
    containerWidthRef.current = parentWidth;

    startXRef.current = e.clientX;
    startWidthRef.current = img.getBoundingClientRect().width;

    const startPct = Math.round((startWidthRef.current / parentWidth) * 100);
    setIsDragging(true);
    setDragPct(Math.max(10, Math.min(100, startPct)));
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const parentWidth = containerWidthRef.current;
      const newWidth = startWidthRef.current + (e.clientX - startXRef.current);
      const pct = Math.round((newWidth / parentWidth) * 100);
      setDragPct(Math.max(10, Math.min(100, pct)));
    };

    const handleMouseUp = (_e: MouseEvent) => {
      const parentWidth = containerWidthRef.current;
      const deltaX = _e.clientX - startXRef.current;
      const rawPct = ((startWidthRef.current + deltaX) / parentWidth) * 100;
      const clampedPct = Math.max(10, Math.min(100, rawPct));

      setIsDragging(false);
      setDragPct(null);
      setIsSelected(false);

      if (Math.abs(deltaX) < 3) return;

      const snappedPct = snapToNearest(clampedPct, SNAP_POINTS);
      if (Math.abs(snappedPct - (startWidthRef.current / parentWidth) * 100) > 1) {
        onResize(`${snappedPct}%`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onResize]);

  useEffect(() => {
    if (!isSelected || isDragging) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSelected(false);
    };

    const timer = setTimeout(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsSelected(false);
        }
      };
      window.addEventListener('click', handleClickOutside, { once: true });
    }, 0);

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, isDragging]);

  return (
    <span
      ref={containerRef}
      data-line-start={dataLineStart}
      className={`relative inline-block align-top ${appliedWidth ? 'mx-auto' : 'w-full'} ${className}`}
      style={appliedWidth ? { width: appliedWidth } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onClick={handleImageClick}
        className={`w-full h-auto object-contain cursor-pointer rounded-2xl transition-shadow ${
          isSelected
            ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-950 rounded-2xl'
            : ''
        }`}
      />

      {/* 飞书风格右下角拖拽手柄 */}
      {isSelected && !isDragging && (
        <span
          onMouseDown={handleResizeStart}
          className="absolute -right-1 -bottom-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900 shadow-md cursor-nwse-resize flex items-center justify-center z-10"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="white" className="opacity-90">
            <path d="M6 0v2H4v2H2v2H0v2h8V0H6z" />
          </svg>
        </span>
      )}

      {/* 拖拽中百分比指示角标 */}
      {isDragging && dragPct && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap z-20">
          {dragPct}%
        </span>
      )}
    </span>
  );
}
