import { createComparisonPage } from './loader';
import type { ComparisonPage, ComparisonPagesByLocale } from './types';

export const ragflowComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'ragflow-vs-fastgpt',
  lang: 'zh',
  status: 'published',
  title: 'RAGFlow 与 FastGPT：复杂文档与完整链路',
  description:
    'RAGFlow 与 FastGPT 的差异集中在复杂文档解析、知识运营、工作流恢复、渠道和原厂支持。按文档类型与生产运营要求筛选候选，再用同一批文档和同条件 POC 验证。',
  heroSummary:
    '扫描件与复杂版式解析是首要任务时，RAGFlow 值得优先验证；知识运营、工作流恢复、中国渠道和原厂支持形成核心约束时，FastGPT 更匹配。',
  heroHighlights: [
    { label: 'RAGFlow', value: '扫描件与复杂版式解析' },
    { label: 'FastGPT', value: '知识运营、工作流恢复与中国渠道' },
    { label: '验收重点', value: '同一批文档、链路恢复、支持责任' }
  ],
  keywords: ['RAGFlow 对比', 'FastGPT', '复杂文档解析', '黄金集验证', '开源许可证'],
  sourceFile: 'ragflow-vs-fastgpt.md',
  dates: {
    datePublished: '2026-08-04',
    dateModified: '2026-08-08'
  },
  asset: {
    path: '/images/compare/ragflow-vs-fastgpt.svg',
    alt: 'RAGFlow 与 FastGPT 的复杂文档、POC 与完整链路对照示意图',
    width: 1200,
    height: 630
  },
  ctaCopy: {
    primaryHeroCta: '查看复杂文档判据',
    nextStepTitle: '核对文档解析、链路恢复与支持边界',
    nextStepDescription: '从复杂 PDF、OCR、Langfuse、恢复链路和 POC 清单继续核对落地条件。',
    ctaTitle: '用同一批文档验证解析质量',
    ctaButton: '设计复杂文档 POC'
  },
  trustSignals: ['核验日期 2026-07-20', '基于官方公开资料', '按同条件 POC 验收'],
  contextualLinks: [
    { label: '对比页总览', target: '/zh/compare', locale: 'zh' },
    { label: '三年成本模型', target: '/zh/compare/self-build-vs-platform', locale: 'zh' }
  ],
  internalLinks: [
    { label: '复杂文档解析能力说明', target: '/zh/faq/complex-document-parsing', locale: 'zh' },
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh' },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh' }
  ],
  officialSource: 'https://ragflow.io/docs/'
});

export const ragflowComparisonPages: ComparisonPagesByLocale = {
  zh: ragflowComparisonPage,
  en: createComparisonPage({
    slug: 'ragflow-vs-fastgpt',
    lang: 'en',
    status: 'published',
    title: 'RAGFlow vs FastGPT: Complex Docs vs Delivery Chain',
    description:
      'Compare RAGFlow and FastGPT on document parsing, knowledge ops, workflow recovery, channels, and support before a same-document POC with your own rubric.',
    heroSummary:
      'Prioritize RAGFlow validation when scanned files and complex-layout parsing are the primary job. Prioritize FastGPT when knowledge operations, workflow recovery, Chinese channels, and vendor support become core constraints.',
    heroHighlights: [
      { label: 'RAGFlow', value: 'Scanned files and complex-layout parsing' },
      { label: 'FastGPT', value: 'Knowledge operations, workflow recovery, Chinese channels' },
      { label: 'Validation focus', value: 'Same documents, chain recovery, support responsibility' }
    ],
    keywords: ['RAGFlow comparison', 'FastGPT', 'complex document parsing', 'golden-set validation', 'open source license'],
    sourceFile: 'en/ragflow-vs-fastgpt.md',
    dates: {
      datePublished: '2026-08-04',
      dateModified: '2026-08-08'
    },
    asset: {
      path: '/images/compare/ragflow-vs-fastgpt.svg',
      alt: 'Complex document, POC, and full-chain comparison diagram for RAGFlow and FastGPT',
      width: 1200,
      height: 630
    },
    ctaCopy: {
      primaryHeroCta: 'Check document parsing criteria',
      nextStepTitle: 'Check parsing, recovery, and support boundaries',
      nextStepDescription: 'Continue from complex PDFs, OCR, Langfuse, recovery paths, and POC checklists to validate rollout conditions.',
      ctaTitle: 'Validate parsing quality with the same documents',
      ctaButton: 'Design the document POC'
    },
    trustSignals: ['Verified on 2026-07-20', 'Based on official public sources', 'Validated through same-condition POC'],
    contextualLinks: [
      { label: 'Comparison hub', target: '/compare', locale: 'en' },
      { label: 'Official pricing page', target: '/price', locale: 'en' }
    ],
    internalLinks: [
      { label: 'Dify plugin-ecosystem comparison', target: '/compare/dify-vs-fastgpt', locale: 'en' },
      { label: 'Build-vs-buy TCO model', target: '/compare/self-build-vs-platform', locale: 'en' },
      { label: 'MaxKB procurement comparison', target: '/compare/maxkb-vs-fastgpt', locale: 'en' }
    ],
    officialSource: 'https://ragflow.io/docs/'
  })
};

export default ragflowComparisonPage;
