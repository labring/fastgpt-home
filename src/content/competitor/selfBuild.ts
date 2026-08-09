import { createComparisonPage } from './loader';
import type { ComparisonPage } from './types';

export const selfBuildComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'self-build-vs-platform',
  lang: 'zh',
  status: 'published',
  title: '自研或直接跑开源与用平台怎么选：四组必算成本',
  description:
    '自研或直接跑开源与平台方案的差异在长期人力、运行时、安全治理、运维升级和原厂支持。用同一份三年需求清单核算人天、基础设施、许可与服务责任，再决定自建或采购。',
  heroSummary:
    '已有平台工程团队并追求底层控制时，自研或直接跑开源更有空间；希望快速上线并获得成熟运行时、升级路径与支持渠道时，平台方案更匹配。',
  heroHighlights: [
    { label: '自研 / 开源', value: '底层控制与团队自运维' },
    { label: '平台方案', value: '现成运行时、升级路径与原厂支持' },
    { label: '验收重点', value: '三年 TCO、故障恢复、迁移成本' }
  ],
  keywords: ['自研成本', '三年 TCO', '平台工程', '原厂支持', '开源自托管'],
  sourceFile: 'self-build-vs-platform.md',
  dates: {
    datePublished: '2026-08-04',
    dateModified: '2026-08-08'
  },
  asset: {
    path: '/images/compare/self-build-vs-platform.svg',
    alt: '自研与平台方案的解析、运行时、安全和运维成本结构示意图',
    width: 1200,
    height: 630
  },
  internalLinks: [
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh' },
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh' },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh' }
  ],
  officialSource: 'https://doc.fastgpt.cn/'
});

export default selfBuildComparisonPage;
