'use client';

import dynamic from 'next/dynamic';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { SOURCE_LABELS, SOURCE_BUTTON_LABELS } from '@/customers/lib/cta-constants';
import type { CtaStatsData } from '@/customers/lib/cta-analytics';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const panelClassName =
  'bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/20';
const emptyStateClassName =
  'flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/70 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400';
const axisLabelColor = '#667085';
const splitLineColor = 'rgba(148, 163, 184, 0.18)';

const SOURCE_PALETTE: Record<string, string> = {
  home_hero: '#2563eb',
  home_bottom: '#0f766e',
  navbar_poc: '#f59e0b',
  customer_hero: '#7c3aed',
  customer_sidebar: '#e11d48',
  customer_bottom: '#0891b2',
  empty_state: '#ea580c',
  footer_private_deploy: '#059669'
};

const RGB_MAP: Record<string, string> = {
  '#2563eb': '37, 99, 235',
  '#0f766e': '15, 118, 110',
  '#f59e0b': '245, 158, 11',
  '#7c3aed': '124, 58, 237',
  '#e11d48': '225, 29, 72',
  '#0891b2': '8, 145, 178',
  '#ea580c': '234, 88, 12',
  '#059669': '5, 150, 105'
};

function formatNumber(value: number) {
  return value.toLocaleString();
}

function createLineArea(color: string, opacity = 0.22) {
  const rgb = RGB_MAP[color] || '148, 163, 184';
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: `rgba(${rgb}, ${opacity})` },
    { offset: 1, color: `rgba(${rgb}, 0)` }
  ]);
}

const commonTooltip: Record<string, unknown> = {
  backgroundColor: 'rgba(15, 23, 42, 0.92)',
  borderWidth: 0,
  padding: [10, 12],
  textStyle: { color: '#f8fafc' }
} as const;

const commonLegend: Record<string, unknown> = {
  bottom: '1%',
  left: 'center',
  itemWidth: 10,
  itemHeight: 10,
  icon: 'roundRect',
  textStyle: { fontSize: 11, color: axisLabelColor }
} as const;

interface CtaChartsProps {
  data: CtaStatsData;
  days: number;
}

export default function CtaCharts({ data, days }: CtaChartsProps) {
  const { allTimeTotals, dailyTrends, overallTrend, customerRanking } = data;

  const hasAnyData = Object.values(allTimeTotals).some((v) => v > 0);
  const totalClicks = Object.values(allTimeTotals).reduce((sum, v) => sum + v, 0);

  // 稳定排序：按点击数降序，同数时按 source 名称升序
  const sortedSources = Object.entries(allTimeTotals)
    .sort(([aKey, aCount], [bKey, bCount]) =>
      bCount - aCount || aKey.localeCompare(bKey)
    );

  // 标识有数据的 source（用于默认隐藏零值线）
  const sourcesWithData = new Set(
    sortedSources.filter(([, count]) => count > 0).map(([key]) => key)
  );

  // 对比图系列数据 + legend selected 初始态
  const comparisonSeries = Object.entries(dailyTrends).map(([source, points]) => ({
    name: SOURCE_LABELS[source] || source,
    type: 'line' as const,
    smooth: true,
    symbol: 'circle',
    showSymbol: false,
    symbolSize: 6,
    lineStyle: { width: 2, color: SOURCE_PALETTE[source] || '#94a3b8' },
    itemStyle: { color: SOURCE_PALETTE[source] || '#94a3b8' },
    emphasis: { focus: 'series' as const, scale: true },
    data: points.map((p) => p.count)
  }));

  // legend selected：有数据的默认选中，无数据的默认隐藏
  const legendSelected: Record<string, boolean> = {};
  for (const source of Object.keys(dailyTrends)) {
    legendSelected[SOURCE_LABELS[source] || source] = sourcesWithData.has(source);
  }

  // 总体趋势图
  const overallOption: EChartsOption = {
    title: {
      text: `近 ${days} 天 POC 按钮总点击趋势`,
      subtext: hasAnyData
        ? `历史累计 ${formatNumber(totalClicks)} 次点击`
        : '暂无点击数据',
      left: 'center',
      top: '2%',
      textStyle: { fontSize: 16, fontWeight: 700, color: '#0f172a' },
      subtextStyle: { color: '#94a3b8', fontSize: 11 }
    },
    tooltip: {
      ...commonTooltip,
      trigger: 'axis',
      axisPointer: { type: 'line', label: { backgroundColor: '#334155' } },
      formatter: (params: unknown) => {
        const rows = Array.isArray(params) ? params : [params];
        const row = rows[0] as Record<string, unknown>;
        return `${row.axisValueLabel}<br/>点击次数: <span style="font-weight:700;color:#93c5fd">${formatNumber(row.value as number)}</span>`;
      }
    },
    legend: { ...commonLegend, show: false },
    grid: { left: '3%', right: '3%', top: '22%', bottom: '8%', containLabel: true },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: overallTrend.map((p) => p.label),
      axisLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.24)' } },
      axisLabel: { color: axisLabelColor },
      axisTick: { show: false }
    }],
    yAxis: [{
      type: 'value',
      minInterval: 1,
      axisLabel: { color: axisLabelColor },
      splitLine: { lineStyle: { type: 'dashed', color: splitLineColor } }
    }],
    series: [{
      name: '总点击',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      showSymbol: false,
      symbolSize: 8,
      lineStyle: { width: 3, color: '#2563eb' },
      areaStyle: { color: createLineArea('#2563eb', 0.2) },
      itemStyle: { color: '#2563eb' },
      emphasis: { focus: 'series', scale: true },
      data: overallTrend.map((p) => p.count)
    }]
  };

  // 各来源对比多折线图
  const comparisonOption: EChartsOption = {
    title: {
      text: `各入口来源近 ${days} 天点击趋势对比`,
      left: 'center',
      top: '2%',
      textStyle: { fontSize: 16, fontWeight: 700, color: '#0f172a' }
    },
    tooltip: {
      ...commonTooltip,
      trigger: 'axis',
      axisPointer: { type: 'line', label: { backgroundColor: '#334155' } }
    },
    legend: {
      ...commonLegend,
      data: Object.keys(dailyTrends).map((src) => SOURCE_LABELS[src] || src),
      selected: legendSelected
    },
    grid: { left: '3%', right: '3%', top: '22%', bottom: '10%', containLabel: true },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: overallTrend.map((p) => p.label),
      axisLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.24)' } },
      axisLabel: { color: axisLabelColor },
      axisTick: { show: false }
    }],
    yAxis: [{
      type: 'value',
      minInterval: 1,
      axisLabel: { color: axisLabelColor },
      splitLine: { lineStyle: { type: 'dashed', color: splitLineColor } }
    }],
    series: comparisonSeries
  };

  // 来源饼图
  const pieData = sortedSources
    .filter(([, count]) => count > 0)
    .map(([source, count]) => ({
      name: SOURCE_LABELS[source] || source,
      value: count,
      itemStyle: { color: SOURCE_PALETTE[source] || '#94a3b8' }
    }));

  const pieOption: EChartsOption = {
    title: {
      text: '各来源历史累计点击占比',
      left: 'center',
      top: '2%',
      textStyle: { fontSize: 16, fontWeight: 700, color: '#0f172a' }
    },
    tooltip: {
      ...commonTooltip,
      trigger: 'item',
      formatter: '{b}: <span style="font-weight:bold">{c} 次</span> ({d}%)'
    },
    legend: { ...commonLegend, orient: 'horizontal' },
    series: [{
      name: '来源占比',
      type: 'pie',
      radius: ['30%', '55%'],
      center: ['50%', '48%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2.5 },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}\n{d}%',
        color: axisLabelColor,
        fontSize: 11,
        lineHeight: 16
      },
      labelLine: {
        show: true,
        length: 16,
        length2: 24,
        smooth: true,
        lineStyle: { color: axisLabelColor, width: 1 }
      },
      emphasis: {
        label: { show: true, fontSize: 14, fontWeight: 700, color: '#0f172a' },
        itemStyle: { shadowBlur: 18, shadowOffsetX: 0, shadowColor: 'rgba(15, 23, 42, 0.18)' }
      },
      data: pieData
    }]
  };

  return (
    <div className="space-y-6">
      {/* 入口来源排行榜 */}
      <div className={panelClassName}>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">入口来源排行榜</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">按&quot;申请 POC&quot;按钮历史累计点击次数排名，反映哪些入口位置最能吸引用户发起 POC 咨询。</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 text-left">
                <th className="py-3 pr-4 font-semibold text-zinc-500 dark:text-zinc-400 w-12">#</th>
                <th className="py-3 pr-4 font-semibold text-zinc-500 dark:text-zinc-400">入口 · 按钮</th>
                <th className="py-3 font-semibold text-zinc-500 dark:text-zinc-400 text-right w-24">点击次数</th>
              </tr>
            </thead>
            <tbody>
              {sortedSources.map(([source, count], index) => (
                <tr
                  key={source}
                  className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      index < 3
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'text-zinc-400'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-zinc-800 dark:text-zinc-200">
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: SOURCE_PALETTE[source] || '#94a3b8' }}
                      />
                      <span className="font-medium">{SOURCE_LABELS[source] || source}</span>
                      <span className="text-zinc-400 dark:text-zinc-500">·</span>
                      <span className="text-zinc-500 dark:text-zinc-400 truncate max-w-[180px]">{SOURCE_BUTTON_LABELS[source] || '—'}</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-semibold text-zinc-700 dark:text-zinc-300 tabular-nums">
                    {formatNumber(count)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 总体趋势图 */}
      <div className={panelClassName}>
        {hasAnyData ? (
          <ReactECharts option={overallOption} style={{ height: 320, width: '100%' }} opts={{ renderer: 'svg' }} />
        ) : (
          <div className={emptyStateClassName}>暂无点击数据，点击按钮后将自动统计</div>
        )}
      </div>

      {/* 多来源对比 + 饼图 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 ${panelClassName}`}>
          {hasAnyData ? (
            <ReactECharts option={comparisonOption} style={{ height: 380, width: '100%' }} opts={{ renderer: 'svg' }} />
          ) : (
            <div className={emptyStateClassName}>暂无点击数据</div>
          )}
        </div>
        <div className={panelClassName}>
          {pieData.length > 0 ? (
            <ReactECharts option={pieOption} style={{ height: 380, width: '100%' }} opts={{ renderer: 'svg' }} />
          ) : (
            <div className={emptyStateClassName}>暂无点击数据</div>
          )}
        </div>
      </div>

      {/* 方案级 POC 意向排名 */}
      {customerRanking.length > 0 && (
        <div className={panelClassName}>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">高意向方案 Top 10</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">按方案页面按钮（&quot;验证该方案&quot;&quot;咨询 POC 路径&quot;&quot;申请免费 POC&quot;）历史累计点击次数排名，反映哪些方案最能吸引用户咨询 POC 验证。</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="py-3 pr-4 font-semibold text-zinc-500 dark:text-zinc-400 text-center w-12">#</th>
                  <th className="py-3 pr-4 font-semibold text-zinc-500 dark:text-zinc-400 text-left">方案名称</th>
                  <th className="py-3 pr-4 font-semibold text-zinc-500 dark:text-zinc-400 text-right w-24 whitespace-nowrap">验证该方案</th>
                  <th className="py-3 pr-4 font-semibold text-zinc-500 dark:text-zinc-400 text-right w-20 whitespace-nowrap">咨询 POC</th>
                  <th className="py-3 pr-4 font-semibold text-zinc-500 dark:text-zinc-400 text-right w-20 whitespace-nowrap">申请 POC</th>
                  <th className="py-3 pr-4 font-semibold text-zinc-500 dark:text-zinc-400 text-right w-16 whitespace-nowrap">合计</th>
                </tr>
              </thead>
              <tbody>
                {customerRanking.map((item, index) => (
                  <tr
                    key={item.customerId}
                    className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        index < 3
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'text-zinc-400'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-medium text-zinc-800 dark:text-zinc-200 max-w-[200px] truncate">
                      {item.customerTitle}
                    </td>
                    <td className="py-3 pr-4 text-right text-zinc-500 dark:text-zinc-400 tabular-nums whitespace-nowrap">
                      {item.heroCount > 0 ? formatNumber(item.heroCount) : '—'}
                    </td>
                    <td className="py-3 pr-4 text-right text-zinc-500 dark:text-zinc-400 tabular-nums whitespace-nowrap">
                      {item.sidebarCount > 0 ? formatNumber(item.sidebarCount) : '—'}
                    </td>
                    <td className="py-3 pr-4 text-right text-zinc-500 dark:text-zinc-400 tabular-nums whitespace-nowrap">
                      {item.bottomCount > 0 ? formatNumber(item.bottomCount) : '—'}
                    </td>
                    <td className="py-3 pr-4 text-right font-semibold text-zinc-700 dark:text-zinc-300 tabular-nums">
                      {formatNumber(item.count)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
