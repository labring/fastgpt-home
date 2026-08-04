import { createComparisonPage } from './loader';
import type { ComparisonPage } from './types';

export const selfBuildComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'self-build-vs-platform',
  lang: 'zh',
  status: 'preview',
  title: '自研或直接跑开源与用平台怎么选：四组必算成本',
  description:
    '把自研 AI 知识库的真实工作量拆成解析检索、运行时、安全治理、发布运维四组，给出同一份三年需求清单的报价方法与同条件 POC 测算表。',
  keywords: ['自研成本', '三年 TCO', '平台工程', '开源自托管', '技术选型'],
  sourceFile: 'self-build-vs-platform.md',
  sourceHash: '311664f8f4dbbd77d4480675d0cdaef640584c5b944f1db6d0e166f7f378ca20',
  draftVersion: 'V1.0 (2026-07-30)',
  sourceRefs: [
    {
      id: 'draft-body',
      title: '自研或直接跑开源与用平台怎么选：四组必算成本',
      localPath: 'content/competitors/self-build-vs-platform.md',
      section: '全文五段与事实来源页脚',
      verifiedOn: '2026-07-20',
      version: 'V1.0',
      evidenceStatus: 'official-public'
    },
    {
      id: 'fastgpt-docs',
      title: 'FastGPT official documentation',
      url: 'https://doc.fastgpt.cn/',
      section: '平台能力与交付路径',
      verifiedOn: '2026-07-20',
      version: '公开稳定资料',
      evidenceStatus: 'official-public'
    },
    {
      id: 'fastgpt-license',
      title: 'FastGPT source repository and license',
      url: 'https://github.com/labring/FastGPT',
      section: '许可证与商业边界',
      verifiedOn: '2026-07-20',
      version: '公开稳定资料',
      evidenceStatus: 'official-public'
    }
  ],
  dates: {
    sourceVerifiedOn: '2026-07-20',
    datePublished: '2026-08-04',
    dateModified: '2026-07-30',
    nextReviewOn: '2026-10-28'
  },
  asset: {
    path: '/images/compare/self-build-vs-platform.svg',
    alt: '自研与平台方案的解析、运行时、安全和运维成本结构示意图',
    width: 1200,
    height: 630
  },
  internalLinks: [
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh', external: false, verified: true },
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh', external: false, verified: true },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh', external: false, verified: true }
  ],
  signoffs: [
    { role: 'product', status: 'pending', signer: 'FastGPT product', timestamp: '', evidenceRef: 'pending-product-version-review' },
    { role: 'sales', status: 'pending', signer: 'FastGPT sales', timestamp: '', evidenceRef: 'pending-commercial-review' },
    { role: 'legal', status: 'pending', signer: 'FastGPT legal', timestamp: '', evidenceRef: 'pending-license-review' }
  ],
  sourceFooter: {
    source: 'FastGPT 官方文档、官方仓库、官方定价页与公开发布记录',
    verifiedOn: '2026-07-20',
    version: 'FastGPT Cloud / 社区自托管 / 托管与自托管商业版',
    updateRecord: 'V1.0（2026-07-30）首次发布；模型、基础设施、版本与支持范围设 90 天复核周期'
  },
  officialSources: ['https://doc.fastgpt.cn/', 'https://github.com/labring/FastGPT']
});

export default selfBuildComparisonPage;
