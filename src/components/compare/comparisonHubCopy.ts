import type { CompareLocale } from '@/content/competitor';

const comparisonHubCopy = {
  zh: {
    heroEyebrow: 'FastGPT 竞品入口',
    heroTitle: 'FastGPT 竞品对比',
    heroDescription:
      '汇总 Dify、RAGFlow、MaxKB 与自研方案的对比页，按插件生态、复杂文档、采购可预测性和三年 TCO 进入细页核对。',
    trustStripAriaLabel: '入口页核验信息',
    pageCountLabel: '04 个页面',
    cardCta: '查看对比',
    cardPrefix: '进入页面',
    relatedTitle: '继续阅读',
    relatedDescription: '从入口页跳到更具体的选型、POC 与成本核对页面。',
    compareLabel: '对比页合集'
  },
  en: {
    heroEyebrow: 'FastGPT comparison hub',
    heroTitle: 'FastGPT Comparison Hub',
    heroDescription:
      'Browse FastGPT with Dify, RAGFlow, MaxKB, and build-vs-buy pages from one indexable hub. Jump into fit, POC, support, and TCO checks you need for each route.',
    trustStripAriaLabel: 'Hub verification details',
    pageCountLabel: '04 pages',
    cardCta: 'Open comparison',
    cardPrefix: 'Open page',
    relatedTitle: 'Continue reading',
    relatedDescription: 'Jump from the hub into the page that matches your selection, POC, and budget check.',
    compareLabel: 'Comparison cluster'
  }
} as const satisfies Record<
  CompareLocale,
  {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    trustStripAriaLabel: string;
    pageCountLabel: string;
    cardCta: string;
    cardPrefix: string;
    relatedTitle: string;
    relatedDescription: string;
    compareLabel: string;
  }
>;

export function getComparisonHubCopy(locale: CompareLocale) {
  return comparisonHubCopy[locale];
}
