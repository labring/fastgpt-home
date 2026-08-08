import { createComparisonPage } from './loader';
import type { ComparisonPage } from './types';

export const maxkbComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'maxkb-vs-fastgpt',
  lang: 'zh',
  status: 'published',
  title: 'MaxKB 与 FastGPT：采购可预测性与细粒度',
  description:
    'MaxKB 与 FastGPT 的差异集中在私有化采购、知识治理、工作流恢复、渠道运营和原厂支持。按采购形态与生产细粒度要求筛选候选，用三年 TCO、同条件 POC 和合同责任矩阵完成核验。',
  heroSummary:
    '私有化交付与采购可预测性优先时，MaxKB 适合纳入候选；细粒度知识治理、工作流恢复和多渠道运营优先时，FastGPT 更匹配。',
  heroHighlights: [
    { label: 'MaxKB', value: '国内私有化交付与采购形态' },
    { label: 'FastGPT', value: '细粒度治理、工作流与多渠道运营' },
    { label: '验收重点', value: '三年 TCO、支持档位、次年维保' }
  ],
  keywords: ['MaxKB 对比', 'FastGPT', '私有化部署', '三年 TCO', '代码沙箱'],
  sourceFile: 'maxkb-vs-fastgpt.md',
  sourceHash: 'f118df2860058b5da52a5cb4d89494715a0b64b9e0a8313cbd1de3c65f4b4cd0',
  draftVersion: 'V1.2 (2026-08-08)',
  sourceRefs: [
    {
      id: 'draft-body',
      title: 'MaxKB 与 FastGPT 怎么选：采购可预测性与生产细粒度',
      localPath: 'content/competitors/maxkb-vs-fastgpt.md',
      section: '五段正文与内部证据',
      verifiedOn: '2026-07-20',
      version: 'V1.2',
      evidenceStatus: 'official-public'
    },
    {
      id: 'maxkb-docs',
      title: 'MaxKB official documentation',
      url: 'https://maxkb.cn/docs/',
      section: '私有化交付与采购形态',
      verifiedOn: '2026-07-20',
      version: '公开稳定资料',
      evidenceStatus: 'official-public'
    },
    {
      id: 'fastgpt-docs',
      title: 'FastGPT official documentation',
      url: 'https://doc.fastgpt.cn/',
      section: '生产运行时与治理',
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
    path: '/images/compare/maxkb-vs-fastgpt.svg',
    alt: 'MaxKB 与 FastGPT 的采购、治理、POC 与三年成本对照示意图',
    width: 1200,
    height: 630
  },
  internalLinks: [
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh', external: false, verified: true },
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh', external: false, verified: true },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh', external: false, verified: true }
  ],
  signoffs: [
    { role: 'product', status: 'pending', signer: 'FastGPT product', timestamp: '', evidenceRef: 'pending-product-version-review' },
    { role: 'sales', status: 'pending', signer: 'FastGPT sales', timestamp: '', evidenceRef: 'pending-commercial-review' },
    { role: 'legal', status: 'pending', signer: 'FastGPT legal', timestamp: '', evidenceRef: 'pending-trademark-license-review' }
  ],
  sourceFooter: {
    source: 'MaxKB 与 FastGPT 双方官网、官方文档、官方仓库、官方定价页与公开发布记录',
    verifiedOn: '2026-07-20',
    version: 'MaxKB 社区自托管 / 专业版 / 企业版；FastGPT Cloud / 社区自托管 / 托管与自托管商业版',
    updateRecord: 'V1.2（2026-08-08）重写可见文案与页面包装；授权价、维保、版本号与支持档位设 90 天复核周期'
  },
  officialSources: ['https://maxkb.cn/docs/', 'https://doc.fastgpt.cn/']
});

export default maxkbComparisonPage;
