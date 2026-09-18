/**
 * Reader-visible content for the Bing Ads one-keyword-one-page landings.
 *
 * Copy is transcribed verbatim from the approved replacement table
 * (《必应广告落地页替换表 V1.0-20260911》) and the 8 client-approved HTML
 * previews — do not paraphrase. Campaign numbers, ad copy and parameterized
 * final URLs live in the non-rendered `ad-ops.json` and must never appear here.
 *
 * This module stays dependency-free so build scripts can transpile and read it
 * without loading application code.
 */

export interface AdsLandingSection {
  heading: string;
  body: string;
}

export interface AdsReadingLink {
  label: string;
  url: string;
}

export interface AdsLeadFormCopy {
  title: string;
  subtitle: string;
  button: string;
}

export interface AdsComparisonRow {
  /** Compared dimension, e.g. 部署形态 */
  dimension: string;
  /** Dify-side wording, cut from the comparison-page table */
  dify: string;
  /** FastGPT-side wording, cut from the comparison-page table */
  fastgpt: string;
}

/** Optional second-screen comparison table; only pages whose intent is a
 *  head-to-head choice carry one. */
export interface AdsComparisonTable {
  rows: AdsComparisonRow[];
  /** Verification and attribution line rendered under the table */
  sourceNote: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface AdsWhyCard {
  title: string;
  body: string;
  /** Optional Dify-side verdict line quoted from the comparison page */
  verdict?: string;
}

/** Optional per-page override of the shared 「为什么选 FastGPT」 band. */
export interface AdsWhySection {
  title?: string;
  subtitle?: string;
    /** Exactly three capability cards */
    cards: AdsWhyCard[];
}

/** One published customer case card; the shared homepage cards omit org/url. */
export interface AdsCaseCard {
  /** Client name as published on the customers surface */
  org?: string;
  title: string;
  /** Outcome line copied verbatim from the case's published figures */
  metrics: string;
  /** Case detail page on the customers surface */
  url?: string;
  image: string;
}

/** Optional per-page override of the shared 「客户成功案例」 band. */
export interface AdsCaseSection {
  badge?: string;
  title?: string;
  subtitle?: string;
  /** Exactly three published customer cases */
  cards: AdsCaseCard[];
}

export interface AdsLandingPage {
  /** URL segment under /ads/, e.g. 'dify-vs-fastgpt' for /ads/dify-vs-fastgpt */
  slug: string;
  /** First-screen badge, e.g. 平台选型 */
  category: string;
  /** Keyword group the page takes over, e.g. dify、dify ai、dify 企业版 */
  keywordGroup: string;
  h1: string;
  subtitle: string;
  /** Optional override of the checklist band subtitle */
  checklistSubtitle?: string;
  /** Three progressive first-screen paragraphs, exactly three entries */
  sections: AdsLandingSection[];
  trustLine: string;
  form: AdsLeadFormCopy;
  /** Deep-reading links, exactly three entries */
  readingLinks: AdsReadingLink[];
  /** Optional second-screen comparison table */
  comparisonTable?: AdsComparisonTable;
  /** Optional override of the shared platform-capability band */
  why?: AdsWhySection;
  /** Optional override of the shared published-cases band */
  cases?: AdsCaseSection;
  /** Name of the deliverable promised in the closing call-to-action */
  leadMagnet: string;
}

export const adsLandingPages: AdsLandingPage[] = [
  {
    slug: 'dify-vs-fastgpt',
    category: '平台选型',
    keywordGroup: 'dify、dify ai、dify 企业版',
    h1: 'Dify 与 FastGPT 怎么选：一张能拿去汇报的对比表',
    subtitle:
      '给正在做平台选型的技术负责人：逐项拆解部署形态、知识库深度、工作流、商用授权与工程运维成本，客观呈现双方适用边界。',
    checklistSubtitle: '从部署、知识库、工作流到授权边界，理清上线半年后的真实工程成本与选型痛点。',
    sections: [
      {
        heading: '5 项核心选型维度',
        body: '聚焦部署形态、知识库、工作流、授权边界与原厂支持 5 项核心维度。针对双方均支持但实现路径不同的深水区，提供同机型、同模型下的基准实测建议与 POC 验证判据。'
      },
      {
        heading: '真实维护成本与工程深度',
        body: '功能勾选表比的是条目数量，这份清单比的是上线半年后的维护成本：答不准时能否定位到切分、索引还是检索配置，一份正文能否挂多条索引，训练队列出错能否单条修复，用量能否拆到解析、向量化、检索与生成各阶段。这些差别在演示阶段几乎看不出来。'
      },
      {
        heading: '商用授权与合规边界',
        body: '多租户托管、去除品牌标识、二次开发后分发，各开源协议的商业化红线差异巨大。立项阶段厘清 LICENSE 边界，规避业务上线后的法律与重构风险。'
      }
    ],
    trustLine: '基于官方公开文档与商用协议核验，支持企业按实际业务场景复现测试。',
    form: {
      title: '领取逐项对比清单',
      subtitle: '填写后由解决方案顾问联系，1 个工作日内响应。',
      button: '领取对比清单'
    },
    readingLinks: [
      { label: 'Dify 与 FastGPT：四种项目的选型分野', url: 'https://fastgpt.cn/compare/dify-vs-fastgpt' },
      { label: '自研或直接跑开源与用平台怎么选：四组必算成本', url: 'https://fastgpt.cn/compare/self-build-vs-platform' },
      { label: 'Docker Compose 部署与常见配置', url: 'https://fastgpt.cn/deploy/fastgpt-docker-compose-deploy' }
    ],
    comparisonTable: {
      rows: [
        {
          dimension: '部署形态',
          dify: 'Cloud + Community + Enterprise；Community 用 Docker Compose，Enterprise 用 Helm',
          fastgpt:
            'Cloud + 社区自托管 + 托管/自托管商业版；Docker Compose，支持多种向量后端；Kubernetes 的商业交付边界需确认'
        },
        {
          dimension: '知识库能力',
          dify: '同等粒度进入 POC 确认',
          fastgpt: '单正文多索引、索引独立编辑、训练队列修复、检索历史、各阶段 Token 成本拆分、引用粒度溯源'
        },
        {
          dimension: '工作流能力',
          dify: '以通用工作流与插件生态为主',
          fastgpt: '强调 Agentic RAG、交互状态恢复、Skills 与知识工程在同一运行时内协同'
        },
        {
          dimension: '商用授权边界',
          dify: '修改版 Apache 2.0；用源码提供多租户服务、去除前端品牌需商业授权；二次开发后分发在公开资料中未列出',
          fastgpt:
            '允许作为其他应用的后端服务商用、允许作为应用开发平台交付给企业；未获书面授权不得用源码运营同类多租户 SaaS，不得移除或修改控制台内的 LOGO 与版权信息'
        },
        {
          dimension: '原厂支持',
          dify: 'Enterprise 路线询价，SLA 按合同；社区版是否附带支持承诺需向对方确认',
          fastgpt:
            '分四个档位，覆盖时段从工作日逐档扩到 7×24，首次响应目标按档位递进；所有付费档位含安全补丁、新功能支持与远程线上协助'
        }
      ],
      sourceNote: '核验日期 2026-07-20 · 基于官方公开资料 · 来源：',
      sourceLabel: 'Dify 与 FastGPT：四种项目的选型分野',
      sourceUrl: 'https://fastgpt.cn/compare/dify-vs-fastgpt'
    },
    why: {
      title: 'FastGPT 的差异能力',
      subtitle: '覆盖生产落地所需的深度工程能力，Dify 侧对应项标注当前官方公开资料与验证状态。',
      cards: [
        {
          title: 'Skills 全生命周期',
          body: '导入导出、版本、权限继承、引用分析、编辑沙箱与运行沙箱',
          verdict: 'Dify Agent Skills 正式版支持范围进入 POC 阶段实测确认'
        },
        {
          title: 'Agent 会话文件工作区',
          body: '文件树、多标签编辑器、交互终端、目录 ZIP、会话沙箱产物回传',
          verdict: '同等原生能力进入 POC 阶段实测确认'
        },
        {
          title: '图片知识库与原图向量检索链路',
          body: '同时保存原图、VLM Caption 与 imageEmbedding，支持以图搜图及 Caption 降级',
          verdict: '同等原生能力进入 POC 阶段实测确认'
        }
      ]
    },
    cases: {
      badge: '客户成功案例',
      subtitle: '案例全部来自客户案例中心，点击卡片可查看完整落地过程与数据出处。',
      cards: [
        {
          org: '延锋国际',
          title: '财务智能审单助手',
          metrics: '财务共享中心年单据 52 万+；单据秒级初审',
          url: 'https://fastgpt.cn/customers/manufacturing-production-processing/ai-financial-audit-solution',
          image:
            'https://objectstorageapi.hzh.sealos.run/7jixeozw-solution/uploads/6a7d8bb1b79b7c6661bbd2c2/1786614414864-ai-cover_thumb.webp'
        },
        {
          org: '三诺生物',
          title: '诺诺助手智能客服',
          metrics: '40 人客服团队负荷饱和背景；拦截 20% 常规咨询，等效节省 10 名全职客服',
          url: 'https://fastgpt.cn/customers/medical-health-wellness/biomedical-customer-service-assistant',
          image:
            'https://objectstorageapi.hzh.sealos.run/7jixeozw-solution/uploads/6a7d8bfbb79b7c6661bbd2d6/1786614706219-ai-cover_thumb.webp'
        },
        {
          org: '朝阳永续',
          title: '财报分析智能助手',
          metrics: '35 人编辑团队精简为 1 人核心组；人均日产出 3-5 篇提升至 50 篇',
          url: 'https://fastgpt.cn/customers/finance-insurance-wealth-management/financial-reporting-ai-assistant',
          image:
            'https://objectstorageapi.hzh.sealos.run/7jixeozw-solution/uploads/6a7d8b53b79b7c6661bbd2a8/1786689664873-qfe9l_thumb.webp'
        }
      ]
    },
    leadMagnet: '逐项对比清单',
  },
  {
    slug: 'private-deployment',
    category: '私有化部署',
    keywordGroup: '本地gpt、私有化部署、豆包本地知识库',
    h1: '私有化部署一套企业 AI 应用平台：数据不出内网',
    subtitle:
      '给要把大模型应用放进自己机房的技术团队：自查硬件算力、网络隔离、自选模型与上线周期，全链路把控数据安全。',
    sections: [
      {
        heading: '4 项部署自查核心要素',
        body: '覆盖服务器与向量库选型、网络隔离与出网策略、可选模型与推理部署方式、装机至首个应用上线周期。支持企业对照自身基建逐项排查，清晰定位落地卡点与前置依赖。'
      },
      {
        heading: '生产级维护与自研工程成本',
        body: '装一个向量库、切分文档、接一个模型，几天就能演示。真正长期占人力的是围绕它的一圈工程：多版式解析的兜底路径、训练队列失败后的单条修复、工作流中断后的原地恢复、代码执行沙箱与租户隔离、渠道适配、升级回滚与值班。把这些的人天算进去，两条路的成本才可比。'
      },
      {
        heading: '安全评审与前置资源规划',
        body: '代码沙箱与租户隔离涉及运行时架构，不是上线前加一个中间件能补的；而安全评审通常在上线前一个月才提出来。资源规划也一样：向量库选型、文档量、模型部署方式与并发一起决定配置，这件事放在 POC 阶段做最省。'
      }
    ],
    trustLine: '部署走 Docker Compose，支持多种向量后端；社区自托管、托管商业版与自托管商业版三条路径并行。',
    form: {
      title: '领取部署条件自查表',
      subtitle: '填写后由解决方案顾问联系，1 个工作日内响应。',
      button: '领取自查表'
    },
    readingLinks: [
      { label: '自研或直接跑开源与用平台怎么选：四组必算成本', url: 'https://fastgpt.cn/compare/self-build-vs-platform' },
      { label: 'Docker Compose 部署与常见配置', url: 'https://fastgpt.cn/deploy/fastgpt-docker-compose-deploy' },
      { label: '私有化部署常见问题排查', url: 'https://fastgpt.cn/deploy/fastgpt-private-deployment-troubleshooting' }
    ],
    leadMagnet: '部署条件自查表',
  },
  {
    slug: 'brand',
    category: '版本与授权',
    keywordGroup: 'fastgpt、fastgpt官网',
    h1: 'FastGPT 官方：开源版、商业版与云服务怎么选',
    subtitle: '全面解析开源版、商业版与云服务的核心能力边界、授权范围与适用业务规模。',
    sections: [
      {
        heading: '3 种交付路径能力边界',
        body: '云服务按月订阅，开箱即用；社区自托管开源免费，装在自己的服务器上；商业版分托管与自托管两种交付，私有部署按单台服务器授权，分标准、专业、旗舰三个版本。完整版应用由社区版镜像加商业版镜像组成，商业版镜像需要 License 启动。'
      },
      {
        heading: '企业选型评估路径与标准',
        body: '小团队内部使用、且能自行承担部署、升级、备份与安全时，社区版通常够用。当需求进入单点登录、多租户、审计、长周期操作日志、商业支持或明确的响应时限，再评估商业版。选型顺序是：租户数 → 是否需要 SSO 与 OA 集成 → 是否需要独立开票与支付模块。'
      },
      {
        heading: '4 级服务响应与维保范围',
        body: '支持分四档，覆盖时段从工作日逐档扩到 7×24，首次响应目标按档位递进；付费档含安全补丁、新功能支持与远程线上协助，付费档起配专属支持群，最高档增加客户经理。首次响应目标指的是响应，不等于在同一时限内完成修复，具体以合同为准。'
      }
    ],
    trustLine: '版本差异与价格以官方定价页当日页面为准；私有部署的交付范围可含安装部署、调试与原厂技术维保。',
    form: {
      title: '获取商业版报价与版本建议',
      subtitle: '填写后由解决方案顾问联系，1 个工作日内响应。',
      button: '获取报价与版本建议'
    },
    readingLinks: [
      { label: '官方定价页', url: 'https://fastgpt.cn/price' },
      { label: '社区版升级到商业版', url: 'https://fastgpt.cn/faq/community-to-commercial-upgrade' },
      { label: 'Docker Compose 部署与常见配置', url: 'https://fastgpt.cn/deploy/fastgpt-docker-compose-deploy' }
    ],
    leadMagnet: '版本对比与报价入口',
  },
  {
    slug: 'coze-vs-fastgpt',
    category: '工作流迁移',
    keywordGroup: 'coze、coze官网、coze工作流',
    h1: 'Coze 工作流的开源替代：可自建、数据留在自己机房',
    subtitle: '给完成业务原型并计划内网落地的团队：评估自建与托管边界，获取平滑迁移方案。',
    sections: [
      {
        heading: '全流程平滑迁移方案',
        body: '涵盖工作流节点与变量对应体系、知识库数据无损导出与重入库机制、企业权限与数据资产归属方案，并配套场景化迁移工作量评估清单。'
      },
      {
        heading: '内网自建与云端托管架构对比',
        body: '托管形态由平台方承载底层运行环境，简化运维开销；自建形态保障源码与数据资产自主可控，满足内网隔离策略、自定义模型推理与等保合规审计要求。选型核心取决于内部数据沉淀周期与安全合规门槛。'
      },
      {
        heading: '验证路径与关键 POC 检查项',
        body: '可以先在云服务上验证工作流能不能跑通同样的业务，再迁到私有环境，三条交付路径共用同一套编排。建议在 POC 阶段就把人工确认节点、失败恢复与渠道发布这三件事测到，它们是原型跑通之后最常返工的部分。'
      }
    ],
    trustLine: '工作流支持人工确认后原地恢复，代码执行走隔离沙箱；企业微信、飞书、钉钉与公众号为原生渠道。',
    form: {
      title: '领取迁移路径说明',
      subtitle: '填写后由解决方案顾问联系，1 个工作日内响应。',
      button: '领取迁移说明'
    },
    readingLinks: [
      { label: '自研或直接跑开源与用平台怎么选：四组必算成本', url: 'https://fastgpt.cn/compare/self-build-vs-platform' },
      { label: '工作流节点配置指南', url: 'https://fastgpt.cn/tutorial/fastgpt-workflow-node-guide' },
      { label: 'Docker Compose 部署与常见配置', url: 'https://fastgpt.cn/deploy/fastgpt-docker-compose-deploy' }
    ],
    leadMagnet: '迁移路径说明',
  },
  {
    slug: 'opensource-vs-fastgpt',
    category: '开源选型',
    keywordGroup: 'ragflow、maxkb、hiagent',
    h1: 'RAGFlow、MaxKB 与 FastGPT：开源选型的三条判据',
    subtitle: '面向长期技术选型：厘清各开源方案的产品设计重心，评估全周期落地工程成本。',
    sections: [
      {
        heading: '3 大核心选型判据',
        body: '第一项聚焦业务瓶颈特性（如复杂版式解析对深度文档理解型方案的刚性依赖）；第二项关注商业采购模式确定性（一次性买断授权与订阅制维保审批成本）；第三项核验生产落地工程粒度（安全沙箱、人工介入断点恢复、租户配额治理与多索引混合检索）。'
      },
      {
        heading: '客观对照体系与资源基准',
        body: '按官方公开规范、共同能力差异化实现与友商优势模块客观分列，清晰界定交付边界。自托管硬件资源门槛独立对照：明确基础运行配置、向量库选型与并发扩展规格，支撑信创及内网基建快速评估。'
      },
      {
        heading: '3 年 TCO 综合测算逻辑',
        body: '同一份三年需求清单，向每个候选方案分别报价，把许可、模型、解析、存储、数据库、运维、升级与支持的人天全部入账。不入账人天的对比，结论一定偏向看起来便宜的那个。'
      }
    ],
    trustLine: '每一行都附核验日期与出处；各家公开资料里没查到的，直接写「未列出」。',
    form: {
      title: '领取开源选型对照表',
      subtitle: '填写后由解决方案顾问联系，1 个工作日内响应。',
      button: '领取选型对照表'
    },
    readingLinks: [
      { label: 'RAGFlow 与 FastGPT：复杂文档与完整链路', url: 'https://fastgpt.cn/compare/ragflow-vs-fastgpt' },
      { label: 'MaxKB 与 FastGPT：采购可预测性与细粒度', url: 'https://fastgpt.cn/compare/maxkb-vs-fastgpt' },
      { label: '自研或直接跑开源与用平台怎么选', url: 'https://fastgpt.cn/compare/self-build-vs-platform' }
    ],
    leadMagnet: '开源选型对照表',
  },
  {
    slug: 'agent-workflow',
    category: '工作流搭建',
    keywordGroup: '智能体搭建、ai工作流、ai agent 平台',
    h1: '搭一条能跑在生产里的 AI 工作流',
    subtitle: '基于开箱即用模板与实战指南快速验证业务闭环，平滑接入企业生产系统。',
    sections: [
      {
        heading: '开箱即用的工作流模板与实践指南',
        body: '提供生产级业务模板与节点编排指南：涵盖拓扑编排、全局变量传递、调试面板细粒度步骤输入输出与 Token 用量追踪，快速接入自有数据与业务提示词验证。'
      },
      {
        heading: '生产环境的 3 大工程核心诉求',
        body: '原型阶段流程跑通就算成功。放进生产要多三件事：节点失败后能重试且幂等、流程中间需要人工确认时能暂停并原地恢复、用固定问题集做回归，否则每次改动都是盲改。这三件事决定了流程改到第五版时还敢不敢动它。'
      },
      {
        heading: '多渠道原生发布与沙箱隔离集成',
        body: '应用可以发布为对外 API、嵌入页面，也可以反向发布为 MCP Server 供其他系统调用；企业微信、飞书、钉钉、公众号为原生渠道，不用自己写适配层。代码执行节点走隔离沙箱，外部工具调用有对应的安全配置。'
      }
    ],
    trustLine: '调试面板按节点显示输入输出与各阶段用量；Skills 支持导入导出、版本与权限继承。',
    form: {
      title: '获取工作流模板与搭建教程',
      subtitle: '填写后由解决方案顾问联系，1 个工作日内响应。',
      button: '获取模板与教程'
    },
    readingLinks: [
      { label: '工作流节点配置指南', url: 'https://fastgpt.cn/tutorial/fastgpt-workflow-node-guide' },
      { label: 'Skill 设计与使用', url: 'https://fastgpt.cn/tutorial/fastgpt-skill-design-usage' },
      { label: '发布为 MCP Server 的用法', url: 'https://fastgpt.cn/integration/fastgpt-mcp-server-usage' }
    ],
    leadMagnet: '可导入的模板与搭建教程',
  },
  {
    slug: 'ai-customer-service',
    category: '智能客服',
    keywordGroup: '智能客服机器人、在线客服系统',
    h1: '用自有知识库搭一套智能客服',
    subtitle: '参考成熟行业实践，通过 1v1 场景诊断精准评估现有工单与知识库的落地可行性。',
    sections: [
      {
        heading: '原生知识库与全渠道协同架构',
        body: '高效整合产品手册、历史工单与标准 QA 问答库，编排含人工兜底转接的业务工作流，原生覆盖官网、公众号、企业微信及主流客服渠道，支持答复内容直接溯源至知识库原始段落。'
      },
      {
        heading: '企业自有知识库驱动的精准溯源',
        body: '知识库方案的答复来自企业自有文档，随文档更新实时同步；答错时支持定位至具体文档版本、分块切分与索引链路，保障企业对客服业务话术的完整自主掌控权。'
      },
      {
        heading: '30-50 条工单回归与准出评估',
        body: '建议用 30 到 50 条真实工单做一次回归：看答对率、引用是否指向正确段落、该转人工的有没有转。这一步跑完，再谈接入范围与上线时间。AI 客服不会因为上传了资料就一定答得准，效果取决于文档质量、切分方式与检索配置。'
      }
    ],
    trustLine: '答案可溯源到原文段落；对话日志可按字段与条件导出 CSV，便于抽检与复盘。',
    form: {
      title: '预约 1v1 场景诊断',
      subtitle: '填写后由解决方案顾问联系，1 个工作日内响应。',
      button: '预约场景诊断'
    },
    readingLinks: [
      {
        label: '零售行业智能客服方案',
        url: 'https://solutions.fastgpt.cn/customers/e-commerce-retail-trade/retail-intelligent-customer-service'
      },
      {
        label: '物流行业智能客服方案',
        url: 'https://solutions.fastgpt.cn/customers/transportation-logistics/yc-intelligent-customer-service'
      },
      { label: '企业微信机器人接入配置', url: 'https://fastgpt.cn/integration/fastgpt-wecom-bot-config' }
    ],
    leadMagnet: '同行业落地案例与 1v1 场景诊断',
  },
  {
    slug: 'enterprise-knowledge-base',
    category: '企业知识库',
    keywordGroup: 'ai知识库、企业知识库、rag',
    h1: '企业知识库：从上传资料到答得准，中间还有六件事',
    subtitle: '聚焦解析、切分、索引、检索、评测与增量更新 6 大环节，明晰生产落地关键决策。',
    sections: [
      {
        heading: '6 步关键决策与标准化验收项',
        body: '覆盖文档解析链路、切分粒度定义、单正文多索引架构、检索与 ReRank 参数微调、回归基准测试集搭建及增量重训策略，为生产落地提供客观判断基准与架构设计依据。'
      },
      {
        heading: '规模化生产与演示原型的工程差距',
        body: '上传即用的形态在演示时足够。资料到了几千份之后，问题会变成：同一份文档换个问法检索不到、训练队列里几十份失败只能整库重跑、上个月的用量说不清花在解析还是生成上。这份清单要解决的正是这些在第二个月才出现的问题。'
      },
      {
        heading: '30 条黄金测试集驱动的评测闭环',
        body: '没有固定问题集，知识库的每次调整都只能凭感觉。建议在导入第一批文档时就定下 30 条黄金问题与期望答案，之后每次改切分或检索参数都跑一遍，答对率与引用正确率的变化才看得见。'
      }
    ],
    trustLine: '支持单正文多索引与索引独立编辑，训练队列失败可单条修复，检索历史可回溯。',
    form: {
      title: '领取知识库落地清单',
      subtitle: '填写后由解决方案顾问联系，1 个工作日内响应。',
      button: '领取落地清单'
    },
    readingLinks: [
      { label: '知识库 RAG 机制说明', url: 'https://fastgpt.cn/dataset/fastgpt-knowledgebase-rag-mechanism' },
      { label: '检索效果优化', url: 'https://fastgpt.cn/dataset/fastgpt-rag-retrieval-optimization' },
      { label: '知识库常见问题', url: 'https://fastgpt.cn/dataset/fastgpt-knowledgebase-faq' }
    ],
    leadMagnet: '知识库落地清单',
  }
];
