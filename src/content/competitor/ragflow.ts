import { createComparisonPage } from './loader';
import type { ComparisonPage } from './types';

export const ragflowComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'ragflow-vs-fastgpt',
  lang: 'zh',
  status: 'published',
  title: 'RAGFlow 与 FastGPT：复杂文档与完整链路',
  description:
    '正面承认 RAGFlow 在扫描件与复杂版式解析上的强项，说明两者在定时自动化、审计配额、中国知识源与运营闭环上的差异，并给出让两家跑同一批文档的验证方法。',
  keywords: ['RAGFlow 对比', 'FastGPT', '复杂文档解析', '黄金集验证', '开源许可证'],
  sourceFile: 'ragflow-vs-fastgpt.md',
  sourceHash: '72583645e2dcc6202cec90cd9ca185a4ca4d498c5818192824076c20944a3faf',
  draftVersion: 'V1.1 (2026-08-05)',
  sourceRefs: [
    {
      id: 'draft-body',
      title: 'RAGFlow 与 FastGPT 怎么选：复杂文档与完整链路的分野',
      localPath: 'content/competitors/ragflow-vs-fastgpt.md',
      section: '全文五段与事实来源页脚',
      verifiedOn: '2026-07-20',
      version: 'V1.1',
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
      version: 'V1.1 revision (2026-08-05)',
      evidenceStatus: 'contract-required'
    }
  ],
  dates: {
    sourceVerifiedOn: '2026-07-20',
    datePublished: '2026-08-04',
    dateModified: '2026-08-05',
    nextReviewOn: '2026-11-03'
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
    updateRecord: 'V1.0（2026-07-30）首次发布；V1.1（2026-08-05）新增原厂支持维度与合同责任说明；解析能力、连接器、版本边界与支持档位设 90 天复核周期'
  },
  officialSources: ['https://ragflow.io/docs/', 'https://doc.fastgpt.cn/']
});

export default ragflowComparisonPage;
