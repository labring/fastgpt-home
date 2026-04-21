'use client';

import { useEffect, useRef } from 'react';
import createGlobe, { type COBEOptions } from 'cobe';

type Props = {
  className?: string;
  config?: Partial<COBEOptions>;
};

// Pixels of pointer movement per radian of rotation. Lower = more sensitive.
// 200 means roughly 200px of drag rotates the globe a full 360°.
const PIXELS_PER_RADIAN = 200;

// Tuned to approximate Framer's chunky halftone dotted globe:
// - mapBrightness high (dots near pure black)
// - diffuse moderate (even shading, no hard lighting)
// - mapSamples dense enough to show continent edges without moiré
const DEFAULT_CONFIG: Omit<COBEOptions, 'width' | 'height'> = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  mapBaseBrightness: 0,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  opacity: 1,
  markers: []
};

export default function GlobeCanvas({ className, config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);

  const setCursor = (grabbing: boolean) => {
    if (canvasRef.current) canvasRef.current.style.cursor = grabbing ? 'grabbing' : 'grab';
  };

  // Apply pointer delta directly to phi — no spring, no lag, 1:1 with mouse.
  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      phiRef.current += delta / PIXELS_PER_RADIAN;
      pointerInteracting.current = clientX;
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    const opts: COBEOptions = {
      ...DEFAULT_CONFIG,
      ...(config ?? {}),
      width: widthRef.current * 2,
      height: widthRef.current * 2
    };

    const globe = createGlobe(canvasRef.current!, opts);

    // Drive phi via rAF + globe.update. Only run while the canvas is actually
    // on screen — when it scrolls off, cancel the loop so cobe stops burning
    // GPU. Also pause when the browser tab is hidden.
    let raf = 0;
    let visible = true;
    const tick = () => {
      if (pointerInteracting.current === null) phiRef.current += 0.005;
      globe.update({
        phi: phiRef.current,
        width: widthRef.current * 2,
        height: widthRef.current * 2
      });
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    if (canvasRef.current) io.observe(canvasRef.current);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    start();

    const t = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    }, 0);

    return () => {
      clearTimeout(t);
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [config]);

  return (
    <div className={className} style={{ width: '100%', height: '100%', aspectRatio: '1 / 1' }}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          setCursor(true);
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          setCursor(false);
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          setCursor(false);
        }}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0,
          transition: 'opacity 500ms ease',
          contain: 'layout paint size',
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'pan-y'
        }}
      />
    </div>
  );
}
