import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/customers/components/theme-provider';
import 'echarts/theme/dark.js';

const ReactECharts = lazy(() => import('echarts-for-react'));

const MERMAID_SINGLE_LINE_DECLARATIONS = [
  /^(flowchart\s+(?:TB|TD|BT|RL|LR))(?=\S)/,
  /^(graph\s+(?:TB|TD|BT|RL|LR))(?=\S)/,
  /^(sequenceDiagram)(?=\S)/,
  /^(classDiagram(?:-v2)?)(?=\S)/,
  /^(stateDiagram(?:-v2)?)(?=\S)/,
  /^(erDiagram)(?=\S)/,
  /^(journey)(?=\S)/,
  /^(gantt)(?=\S)/,
  /^(mindmap)(?=\S)/,
  /^(timeline)(?=\S)/,
  /^(gitGraph)(?=\S)/,
  /^(quadrantChart)(?=\S)/,
  /^(requirementDiagram)(?=\S)/,
  /^(xychart(?:-beta)?)(?=\S)/,
  /^(block-beta)(?=\S)/,
  /^(packet-beta)(?=\S)/,
  /^(architecture-beta)(?=\S)/,
  /^(sankey-beta)(?=\S)/
];

function trimTrailingWhitespaceByLine(source: string) {
  return source
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n');
}

export function normalizeMermaidSource(source: string) {
  const normalized = trimTrailingWhitespaceByLine(
    source
      .replace(/\uFEFF/g, '')
      .replace(/\r\n?/g, '\n')
      .replace(/\u00A0/g, ' ')
      .trim()
  );

  if (!normalized || normalized.includes('\n')) {
    return normalized;
  }

  for (const pattern of MERMAID_SINGLE_LINE_DECLARATIONS) {
    if (pattern.test(normalized)) {
      return normalized.replace(pattern, '$1\n');
    }
  }

  return normalized;
}

const loadMermaid = () => import('mermaid').then((m) => {
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

// 仅允许纯对象/数组/原始值字面量构成的 ECharts 配置。拒绝任何函数、
// 调用、成员访问、运算符与危险关键字，避免把 markdown 正文当代码执行
// （new Function 与 eval 等价，属于存储型 XSS 面）。
const ECHARTS_UNSAFE_TOKEN_RE =
  /[()=+*/%`;&|<>!?~]|-(?!\d)|\bfunction\b|=>|\b(new|typeof|instanceof|import|require|eval|window|document|globalThis|process|Math|Date|JSON|constructor|prototype)\b|\.[a-zA-Z_$]/i;

export function parseEChartsOptions(optionsStr: string) {
  const source = optionsStr.trim();
  if (!source) return null;

  // 先把字符串字面量脱敏，避免字符串内的括号/关键字被误判。
  const masked = source.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g, '"s"');
  if (ECHARTS_UNSAFE_TOKEN_RE.test(masked)) {
    return null;
  }

  try {
    // 已通过静态白名单校验，此处仅求值纯对象字面量表达式。
    const getOptions = new Function(`return (${source});`) as () => unknown;
    return getOptions();
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
    return () => { isMounted = false; };
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
    return <div className="p-4 bg-slate-50 text-slate-500 rounded-xl my-4 text-sm border border-slate-200">Mermaid 图表语法有误，已跳过预览。</div>;
  }

  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)));
  const zoomIn = () => setScale((s) => Math.min(2.5, +(s + 0.25).toFixed(2)));
  const containerWidth = `${scale * 100}%`;

  return (
    <>
      <div className="!my-0 w-full relative">
        <div className="max-h-[450px] overflow-auto">
          <div
            ref={chartRef}
            className="cursor-zoom-in mx-auto [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:!my-0"
            style={{
              width: containerWidth,
              transition: 'width 0.2s ease-out'
            }}
            onClick={() => setIsFullscreen(true)}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>

        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-0.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-0.5">
          <button
            type="button"
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="w-7 h-7 flex items-center justify-center rounded text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="缩小"
          >
            -
          </button>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 w-10 text-center tabular-nums select-none">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={scale >= 2.5}
            className="w-7 h-7 flex items-center justify-center rounded text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="放大"
          >

          </button>
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm flex flex-col cursor-pointer"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Mermaid 图表</span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="关闭 (Esc)"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 5l10 10M15 5l-10 10" />
              </svg>
            </button>
          </div>
          <div
            className="flex-1 overflow-auto p-6 flex justify-center items-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              dangerouslySetInnerHTML={{ __html: svg }}
              className="[&>svg]:max-w-full [&>svg]:h-auto [&>svg]:!my-0"
            />
          </div>
        </div>
      )}
    </>
  );
};

const EChartsLoading = () => (
  <div className="!my-0 w-full h-[400px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-500"></div>
  </div>
);

export const EchartsComponent = ({ optionsStr }: { optionsStr: string }) => {
  const option = parseEChartsOptions(optionsStr);
  const { resolvedTheme } = useTheme();

  if (!option) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-xl my-4 text-sm border border-red-100">
        ECharts 配置解析失败，请确保返回的是一个合法的 JavaScript 对象。
      </div>
    );
  }

  return (
    <div className="!my-0 w-full h-[400px]">
      <Suspense fallback={<EChartsLoading />}>
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          theme={resolvedTheme === 'dark' ? 'dark' : undefined}
        />
      </Suspense>
    </div>
  );
};
