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
  sourceHash: '40b7ae9face789519cdcc5f95979040c57392263cf79c74918a52a70a46e5684',
  draftVersion: 'V1.2 (2026-08-08)',
  sourceRefs: [
    {
      id: 'draft-body',
      title: 'RAGFlow 与 FastGPT 怎么选：复杂文档与完整链路的分野',
      localPath: 'content/competitors/ragflow-vs-fastgpt.md',
      section: '五段正文与内部证据',
      verifiedOn: '2026-07-20',
      version: 'V1.2',
      evidenceStatus: 'official-public'
    },
    {
      id: 'ragflow-docs',
      title: 'RAGFlow official documentation',
      url: 'https://ragflow.io/docs/',
      section: '复杂文档解析与连接器',
      verifiedOn: '2026-07-20',
      version: '公开稳定资料',
      evidenceStatus: 'official-public'
    },
    {
      id: 'fastgpt-docs',
      title: 'FastGPT official documentation',
      url: 'https://doc.fastgpt.cn/',
      section: '知识工程与运营闭环',
      verifiedOn: '2026-07-20',
      version: '公开稳定资料',
      evidenceStatus: 'official-public'
    },
    {
      id: 'fastgpt-support-contract',
      title: 'FastGPT product knowledge base support and procurement sections',
      section: 'KB 5.4 / 6.3：原厂支持档位、交付范围与采购责任边界',
      verifiedOn: '2026-07-20',
      version: 'V1.1 fact set (2026-08-05)',
      evidenceStatus: 'contract-required'
    }
  ],
  dates: {
    sourceVerifiedOn: '2026-07-20',
    datePublished: '2026-08-04',
    dateModified: '2026-08-08',
    nextReviewOn: '2026-11-06'
  },
  asset: {
    path: '/images/compare/ragflow-vs-fastgpt.svg',
    alt: 'RAGFlow 与 FastGPT 的复杂文档、POC 与完整链路对照示意图',
    width: 1200,
    height: 630
  },
  internalLinks: [
    { label: '复杂文档解析能力说明', target: '/zh/faq/poc-design-checklist', locale: 'zh', external: false, verified: true },
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh', external: false, verified: true },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh', external: false, verified: true }
  ],
  signoffs: [
    { role: 'product', status: 'pending', signer: 'FastGPT product', timestamp: '', evidenceRef: 'pending-product-version-review' },
    { role: 'sales', status: 'pending', signer: 'FastGPT sales', timestamp: '', evidenceRef: 'pending-commercial-review' },
    { role: 'legal', status: 'pending', signer: 'FastGPT legal', timestamp: '', evidenceRef: 'pending-trademark-license-review' }
  ],
  sourceFooter: {
    source: 'RAGFlow 与 FastGPT 双方官网、官方文档、官方仓库、官方定价页与公开发布记录',
    verifiedOn: '2026-07-20',
    version: 'RAGFlow Community / Enterprise；FastGPT Cloud / 社区自托管 / 托管与自托管商业版',
    updateRecord: 'V1.2（2026-08-08）重写可见文案与页面包装；解析能力、连接器、版本边界与支持档位设 90 天复核周期'
  },
  officialSources: ['https://ragflow.io/docs/', 'https://doc.fastgpt.cn/']
});

export default ragflowComparisonPage;
