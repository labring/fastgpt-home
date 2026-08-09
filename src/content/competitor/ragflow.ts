import { createComparisonPage } from './loader';
import type { ComparisonPage } from './types';

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
  internalLinks: [
    { label: '复杂文档解析能力说明', target: '/zh/faq/poc-design-checklist', locale: 'zh' },
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh' },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh' }
  ],
  officialSource: 'https://ragflow.io/docs/'
});

export default ragflowComparisonPage;
