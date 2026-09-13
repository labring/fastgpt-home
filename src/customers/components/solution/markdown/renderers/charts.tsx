'use client';

import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { normalizeMermaidSource } from '../utils';

const ReactECharts = lazy(() => import('echarts-for-react'));

const loadMermaid = () =>
  import('mermaid').then((m) => {
    m.default.initialize({
      startOnLoad: false,
      suppressErrorRendering: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#e0e7ff',
        primaryTextColor: '#1e1b4b',
        primaryBorderColor: '#818cf8',
        lineColor: '#6366f1',
        secondaryColor: '#f3f4f6',
        tertiaryColor: '#fff'
      },
      securityLevel: 'strict'
    });
    m.default.setParseErrorHandler(() => undefined);
    return m.default;
  });

export function parseEChartsOptions(optionsStr: string) {
  const source = optionsStr.trim();
  if (!source) return null;

  try {
    const options = JSON.parse(source) as unknown;
    return options && typeof options === 'object' && !Array.isArray(options) ? options : null;
  } catch {
    return null;
  }
}

export const MermaidChart = ({ chart }: { chart: string }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [scale, setScale] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const normalizedChart = normalizeMermaidSource(chart);

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      try {
        if (!chartRef.current || !normalizedChart) return;
        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
        const mermaid = await loadMermaid();
        const parseResult = await mermaid.parse(normalizedChart, {
          suppressErrors: true
        });

        if (!parseResult) {
          if (isMounted) {
            setSvg('');
            setError(true);
          }
          return;
        }

        const { svg: svgCode } = await mermaid.render(id, normalizedChart);
        const cleanSvg = svgCode.replace(/<script[\s\S]*?<\/script>/gi, '');
        if (isMounted) {
          setSvg(cleanSvg);
          setError(false);
        }
      } catch {
        if (isMounted) {
          console.warn('Mermaid rendering skipped due to invalid syntax.');
          setSvg('');
          setError(true);
        }
      }
    };
    renderChart();
    return () => {
      isMounted = false;
    };
  }, [normalizedChart]);

  useEffect(() => {
    if (!isFullscreen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  if (error) {
    return (
      <div className="p-4 bg-slate-50 text-slate-500 rounded-xl my-4 text-sm border border-slate-200">
        Mermaid 图表语法有误，已跳过预览。
      </div>
    );
  }

  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)));
  const zoomIn = () => setScale((s) => Math.min(2.5, +(s + 0.25).toFixed(2)));
  const containerWidth = `${scale * 100}%`;

  return (
    <>
      <div className="my-0! w-full relative">
        <div className="max-h-[450px] overflow-auto">
          <div
            ref={chartRef}
            className="cursor-zoom-in mx-auto [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:my-0!"
            style={{
              width: containerWidth,
              transition: 'width 0.2s ease-out'
            }}
            onClick={() => setIsFullscreen(true)}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>

        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-0.5 bg-white/90  backdrop-blur rounded-lg shadow-md border border-slate-200  p-0.5">
          <button
            type="button"
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="w-7 h-7 flex items-center justify-center rounded text-sm font-medium text-slate-600  hover:bg-slate-100  disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="缩小"
          >
            -
          </button>
          <span className="text-xs font-mono text-slate-500  w-10 text-center tabular-nums select-none">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={scale >= 2.5}
            className="w-7 h-7 flex items-center justify-center rounded text-sm font-medium text-slate-600  hover:bg-slate-100  disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="放大"
          >
            +
          </button>
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-white/95  backdrop-blur-sm flex flex-col cursor-pointer"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-200  bg-white/80  backdrop-blur">
            <span className="text-sm font-medium text-slate-700 ">Mermaid 图表</span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100   transition-colors"
              title="关闭 (Esc)"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>
          <div
            className="flex-1 overflow-auto p-6 flex justify-center items-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              dangerouslySetInnerHTML={{ __html: svg }}
              className="[&>svg]:max-w-full [&>svg]:h-auto [&>svg]:my-0!"
            />
          </div>
        </div>
      )}
    </>
  );
};

const EChartsLoading = () => (
  <div className="my-0! w-full h-[400px] flex items-center justify-center bg-slate-50  rounded-xl border border-slate-200 ">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-500"></div>
  </div>
);

export const EchartsComponent = ({ optionsStr }: { optionsStr: string }) => {
  const option = parseEChartsOptions(optionsStr);
  // customers 站点为浅色模式（白底），使用 ECharts 默认 light 主题：
  // 标题/图例/坐标轴文字为深色，白底清晰。不使用 dark 主题（浅色文字会与白底混为一体）。
  // 数据内显式设置的颜色（如彩色图形内部的反白 label）保持原样。

  if (!option) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-xl my-4 text-sm border border-red-100">
        ECharts 配置解析失败，请确保内容是合法 JSON。
      </div>
    );
  }

  return (
    <div className="my-0! w-full h-[400px]">
      <Suspense fallback={<EChartsLoading />}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </Suspense>
    </div>
  );
};
