'use client';

import dynamic from 'next/dynamic';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import {
  type DashboardCategoryStat,
  type DashboardStatusStats,
  type DashboardTopSolution,
  type DashboardTrendPoint
} from '@/customers/lib/dashboard-analytics';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface DashboardChartsProps {
  topSolutions: DashboardTopSolution[];
  categoryStats: DashboardCategoryStat[];
  statusStats: DashboardStatusStats;
  trendStats: DashboardTrendPoint[];
}

interface TooltipAxisValueRow {
  name?: string;
  value?: number | string;
  color?: string;
  seriesName?: string;
  axisValueLabel?: string;
}

function toTooltipRows(params: unknown) {
  if (Array.isArray(params)) {
    return params as TooltipAxisValueRow[];
  }

  if (params && typeof params === 'object') {
    return [params as TooltipAxisValueRow];
  }

  return [];
}

const panelClassName =
  'bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/20';
const emptyStateClassName =
  'flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/70 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400';
const axisLabelColor = '#667085';
const splitLineColor = 'rgba(148, 163, 184, 0.18)';
const topBarGradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  { offset: 0, color: '#38bdf8' },
  { offset: 0.55, color: '#3b82f6' },
  { offset: 1, color: '#4f46e5' }
]);
const topBarGradientHover = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  { offset: 0, color: '#0ea5e9' },
  { offset: 0.55, color: '#2563eb' },
  { offset: 1, color: '#4338ca' }
]);
const categoryPalette = ['#2563eb', '#0f766e', '#7c3aed', '#f59e0b', '#e11d48', '#0891b2'];
const statusPalette = {
  published: '#2563eb',
  draft: '#94a3b8'
};
const trendPalette = {
  views: '#2563eb',
  likes: '#e11d48'
};

function formatNumber(value: number) {
  return value.toLocaleString();
}

function createLineArea(color: string, opacity = 0.22) {
  const rgbMap: Record<string, string> = {
    '#2563eb': '37, 99, 235',
    '#e11d48': '225, 29, 72'
  };

  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: `rgba(${rgbMap[color]}, ${opacity})` },
    { offset: 1, color: `rgba(${rgbMap[color]}, 0)` }
  ]);
}

function formatTooltipValue(value: number | string | undefined) {
  return typeof value === 'number' ? formatNumber(value) : String(value ?? '');
}

function renderChart(
  option: EChartsOption,
  height: number,
  hasData: boolean
) {
  if (!hasData) {
    return <div className={emptyStateClassName}>暂无可视化数据，待真实行为数据写入后自动更新</div>;
  }

  return (
    <ReactECharts
      option={option}
      style={{ height, width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
}

export default function DashboardCharts({
  topSolutions,
  categoryStats,
  statusStats,
  trendStats
}: DashboardChartsProps) {
  const sortedTopSolutions = [...topSolutions].sort((left, right) => right.usageCount - left.usageCount);
  const rankedTopSolutions = [...sortedTopSolutions].reverse();
  const trendLabels = trendStats.map((point) => point.label);
  const totalTrendViews = trendStats.reduce((sum, point) => sum + point.views, 0);
  const totalTrendLikes = trendStats.reduce((sum, point) => sum + point.likesDelta, 0);
  const hasTrendData = totalTrendViews > 0 || totalTrendLikes !== 0;

  const commonTitle = {
    left: 'center',
    top: '2%',
    textStyle: {
      fontSize: 16,
      fontWeight: 700,
      color: '#0f172a'
    }
  } as const;

  const commonTooltip: Record<string, unknown> = {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderWidth: 0,
    padding: [10, 12],
    textStyle: {
      color: '#f8fafc'
    }
  } as const;

  const commonLegend = {
    bottom: '1%',
    left: 'center',
    itemWidth: 10,
    itemHeight: 10,
    icon: 'roundRect',
    textStyle: {
      fontSize: 11,
      color: axisLabelColor
    }
  } as const;

  const barOption: EChartsOption = {
    title: {
      ...commonTitle,
      text: '高频使用解决方案 Top 5',
    },
    tooltip: {
      ...commonTooltip,
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: unknown) => {
        const rows = toTooltipRows(params);
        const data = rows[0];
        return `${data?.name || ''}<br/>使用次数: <span style="font-weight:700;color:#93c5fd">${formatTooltipValue(data?.value)}</span>`;
      }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '8%',
      top: '16%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '使用次数',
      nameLocation: 'end',
      nameGap: 10,
      nameTextStyle: { color: axisLabelColor },
      axisLabel: { color: axisLabelColor },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: splitLineColor } }
    },
    yAxis: {
      type: 'category',
      data: rankedTopSolutions.map((solution) => solution.title),
      axisLabel: {
        width: 160,
        overflow: 'truncate',
        interval: 0,
        color: axisLabelColor
      },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    series: [
      {
        name: '使用次数',
        type: 'bar',
        data: rankedTopSolutions.map((solution) => solution.usageCount),
        itemStyle: {
          color: topBarGradient,
          borderRadius: [0, 10, 10, 0],
          shadowBlur: 12,
          shadowColor: 'rgba(37, 99, 235, 0.22)'
        },
        barWidth: '45%',
        emphasis: {
          itemStyle: {
            color: topBarGradientHover
          }
        }
      }
    ]
  };

  const pieOption: EChartsOption = {
    title: {
      ...commonTitle,
      text: '方案分类分布',
    },
    tooltip: {
      ...commonTooltip,
      trigger: 'item',
      formatter: '{a} <br/>{b}: <span style="font-weight:bold">{c}</span> ({d}%)'
    },
    legend: {
      ...commonLegend,
      orient: 'horizontal'
    },
    series: [
      {
        name: '方案分类',
        type: 'pie',
        radius: ['36%', '62%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 3
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 13,
            fontWeight: 700,
            color: '#0f172a'
          }
        },
        labelLine: {
          show: false
        },
        color: categoryPalette,
        data: categoryStats.map((item) => ({
          name: item.name,
          value: item.count
        }))
      }
    ]
  };

  const statusOption: EChartsOption = {
    title: {
      ...commonTitle,
      text: '发布状态概览',
    },
    tooltip: {
      ...commonTooltip,
      trigger: 'item',
      formatter: '{b}<br/>数量: <span style="font-weight:700;color:#e2e8f0">{c}</span> ({d}%)'
    },
    legend: commonLegend,
    series: [
      {
        name: '发布状态',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        data: [
          { value: statusStats.published, name: '已发布', itemStyle: { color: statusPalette.published } },
          { value: statusStats.draft, name: '草稿箱', itemStyle: { color: statusPalette.draft } }
        ],
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 13,
            fontWeight: 700,
            color: '#0f172a'
          },
          itemStyle: {
            shadowBlur: 18,
            shadowOffsetX: 0,
            shadowColor: 'rgba(15, 23, 42, 0.18)'
          }
        }
      }
    ]
  };

  const trendOption: EChartsOption = {
    title: {
      ...commonTitle,
      text: '近30天互动趋势',
      subtext: hasTrendData
        ? `近 30 天浏览 ${formatNumber(totalTrendViews)} 次，点赞净增 ${formatNumber(totalTrendLikes)} 次`
        : '当前展示最近 30 天真实统计，暂无行为写入',
      subtextStyle: {
        color: '#94a3b8',
        fontSize: 11
      }
    },
    tooltip: {
      ...commonTooltip,
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: '#334155'
        }
      },
      formatter: (params: unknown) => {
        const rowsData = toTooltipRows(params);
        const rows = rowsData
          .map(
            (item) =>
              `<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;">
                <span style="display:flex;align-items:center;gap:8px;">
                  <span style="width:8px;height:8px;border-radius:9999px;background:${item.color || '#94a3b8'};display:inline-block;"></span>
                  ${item.seriesName || ''}
                </span>
                <span style="font-weight:700;color:#e2e8f0;">${formatTooltipValue(item.value)}</span>
              </div>`
          )
          .join('');

        return `<div style="display:flex;flex-direction:column;gap:8px;">
          <div style="font-weight:700;color:#f8fafc;">${rowsData[0]?.axisValueLabel ?? ''}</div>
          ${rows}
        </div>`;
      }
    },
    legend: {
      ...commonLegend,
      data: ['浏览量', '点赞净增']
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '22%',
      bottom: '13%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: trendLabels,
        axisLine: {
          lineStyle: {
            color: 'rgba(148, 163, 184, 0.24)'
          }
        },
        axisLabel: {
          color: axisLabelColor
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: axisLabelColor
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: splitLineColor
          }
        }
      }
    ],
    series: [
      {
        name: '浏览量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 8,
        lineStyle: { width: 3, color: trendPalette.views },
        areaStyle: {
          color: createLineArea(trendPalette.views, 0.2)
        },
        itemStyle: {
          color: trendPalette.views
        },
        emphasis: {
          focus: 'series',
          scale: true
        },
        data: trendStats.map((point) => point.views)
      },
      {
        name: '点赞净增',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 8,
        lineStyle: { width: 3, color: trendPalette.likes },
        areaStyle: {
          color: createLineArea(trendPalette.likes, 0.16)
        },
        itemStyle: {
          color: trendPalette.likes
        },
        emphasis: {
          focus: 'series',
          scale: true
        },
        data: trendStats.map((point) => point.likesDelta)
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 柱状图 */}
        <div className={panelClassName}>
          {renderChart(barOption, 350, topSolutions.length > 0)}
        </div>

        {/* 分类饼图 */}
        <div className={panelClassName}>
          {renderChart(pieOption, 350, categoryStats.length > 0)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 状态环形图 */}
        <div className={panelClassName}>
          {renderChart(statusOption, 300, statusStats.published + statusStats.draft > 0)}
        </div>

        {/* 近30天趋势图 */}
        <div className={`lg:col-span-2 ${panelClassName}`}>
          <ReactECharts
            option={trendOption}
            style={{ height: 300, width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </div>
    </div>
  );
}
