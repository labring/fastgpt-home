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

export interface AdsLandingPage {
  /** URL segment under /ads/, e.g. 'dify-vs-fastgpt' for /ads/dify-vs-fastgpt */
  slug: string;
  /** First-screen badge, e.g. 平台选型 */
  category: string;
  /** Keyword group the page takes over, e.g. dify、dify ai、dify 企业版 */
  keywordGroup: string;
  h1: string;
  subtitle: string;
  /** Three progressive first-screen paragraphs, exactly three entries */
  sections: AdsLandingSection[];
  trustLine: string;
  form: AdsLeadFormCopy;
  /** Deep-reading links, exactly three entries */
  readingLinks: AdsReadingLink[];
  /** Name of the deliverable promised in the closing call-to-action */
  leadMagnet: string;
  /** Footer 「页面更新」 date line */
  updatedAt: string;
}

export const adsLandingPages: AdsLandingPage[] = [
  {
    slug: 'dify-vs-fastgpt',
    category: '平台选型',
    keywordGroup: 'dify、dify ai、dify 企业版',
    h1: 'Dify 与 FastGPT 怎么选：一张能拿去汇报的对比表',
    subtitle:
      '给正在做平台选型的技术负责人：部署形态、知识库、工作流、商用授权与迁移成本逐项列开，两边的强项都写进去。',
    sections: [
      {
        heading: '这份清单是什么',
        body: '一张五栏对照表，把两个平台的部署形态、知识库能力、工作流能力、商用授权边界与迁移成本放在同一行上比较。表里同时写明哪些项属于「双方都有但实现路径不同」——这类项只能用同一份数据集、同一个模型与同一台机型跑 POC 才分得出高下。'
      },
      {
        heading: '和自己列功能表的区别',
        body: '功能勾选表比的是条目数量，这份清单比的是上线半年后的维护成本：答不准时能否定位到切分、索引还是检索配置，一份正文能否挂多条索引，训练队列出错能否单条修复，用量能否拆到解析、向量化、检索与生成各阶段。这些差别在演示阶段几乎看不出来。'
      },
      {
        heading: '为什么现在看',
        body: '许可证是这类选型里最容易被「都是开源」一句带过、事后又最容易出问题的一项：用源码提供多租户服务、去除控制台品牌标识、二次开发后分发，三条边界各家写法不同，需要法务在立项前读一遍 LICENSE 原文。清单里附了这三条的逐条对照。'
      }
    ],
    trustLine: '对照表标注每一项的核验日期与出处，公开资料未列出的项写「未列出」，不做推断。',
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
    leadMagnet: '逐项对比清单',
    updatedAt: '2026年9月11日'
  },
  {
    slug: 'private-deployment',
    category: '私有化部署',
    keywordGroup: '本地gpt、私有化部署、豆包本地知识库',
    h1: '私有化部署一套企业 AI 应用平台：数据不出内网',
    subtitle:
      '给要把大模型应用放进自己机房的技术团队：先用一份部署条件自查表，确认硬件、网络、模型与上线周期这四项。',
    sections: [
      {
        heading: '这份自查表是什么',
        body: '四栏：服务器与向量库选型、网络隔离与出网策略、可选模型与推理部署方式、从装机到第一个应用上线的时间安排。按自己的环境逐行填，填完就知道缺口在哪。'
      },
      {
        heading: '和直接跑开源的区别',
        body: '装一个向量库、切分文档、接一个模型，几天就能演示。真正长期占人力的是围绕它的一圈工程：多版式解析的兜底路径、训练队列失败后的单条修复、工作流中断后的原地恢复、代码执行沙箱与租户隔离、渠道适配、升级回滚与值班。把这些的人天算进去，两条路的成本才可比。'
      },
      {
        heading: '为什么现在做这一步',
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
    updatedAt: '2026年9月11日'
  },
  {
    slug: 'brand',
    category: '版本与授权',
    keywordGroup: 'fastgpt、fastgpt官网',
    h1: 'FastGPT 官方：开源版、商业版与云服务怎么选',
    subtitle: '三条路径的能力边界、授权方式与适用规模一次看清，不用在文档里来回翻。',
    sections: [
      {
        heading: '三条路径分别是什么',
        body: '云服务按月订阅，开箱即用；社区自托管开源免费，装在自己的服务器上；商业版分托管与自托管两种交付，私有部署按单台服务器授权，分标准、专业、旗舰三个版本。完整版应用由社区版镜像加商业版镜像组成，商业版镜像需要 License 启动。'
      },
      {
        heading: '怎么判断该用哪一条',
        body: '小团队内部使用、且能自行承担部署、升级、备份与安全时，社区版通常够用。当需求进入单点登录、多租户、审计、长周期操作日志、商业支持或明确的响应时限，再评估商业版。选型顺序是：租户数 → 是否需要 SSO 与 OA 集成 → 是否需要独立开票与支付模块。'
      },
      {
        heading: '支持档位怎么看',
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
    updatedAt: '2026年9月11日'
  },
  {
    slug: 'coze-vs-fastgpt',
    category: '工作流迁移',
    keywordGroup: 'coze、coze官网、coze工作流',
    h1: 'Coze 工作流的开源替代：可自建、数据留在自己机房',
    subtitle: '给已经用工作流搭出原型、正在考虑把它放进内网长期跑的团队。',
    sections: [
      {
        heading: '能拿到什么',
        body: '一份迁移路径说明：工作流节点与变量的对应关系、知识库数据的导出与重新入库方式、权限与数据归属的落点，以及一份按自己场景填的工作量估算表。'
      },
      {
        heading: '自建与托管的分别在哪',
        body: '托管形态下平台方负责运行环境，省掉运维；自建形态下源码与数据都在自己手里，可以按内网策略约束出网、自选模型、按等保要求留存日志。两者不是一个更好的问题，取决于这套系统要不要长期承载内部数据、以及合规评审会不会要求数据不出内网。'
      },
      {
        heading: '怎么先试再定',
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
    updatedAt: '2026年9月11日'
  },
  {
    slug: 'opensource-vs-fastgpt',
    category: '开源选型',
    keywordGroup: 'ragflow、maxkb、hiagent',
    h1: 'RAGFlow、MaxKB 与 FastGPT：开源选型的三条判据',
    subtitle: '给要在几个开源方案里选一个长期用下去的团队：先分清各家的产品重心，再比落地成本。',
    sections: [
      {
        heading: '三条判据是什么',
        body: '一是项目的成败因素落在哪里——如果几乎完全由扫描件与复杂版式解析决定，深度文档理解型的方案必须进最终 POC；二是采购形态要不要可预测——一次性授权与订阅制在审批链条上的差别是真实价值；三是进入生产后的能力粒度——沙箱、人工确认恢复、配额治理与多索引检索。'
      },
      {
        heading: '对照表怎么用',
        body: '表里按「各家公开资料明确列出 / 双方都有但实现不同 / 对方强项」三列分开写，不用一句「对方不支持」掩盖版本与交付边界。自托管资源门槛也单列一行：有的方案公开写死最低配置，有的按向量库、文档量与并发设计，如果企业已有固定服务器规格或信创约束，这一行要在选型第一周核对。'
      },
      {
        heading: '结论怎么落',
        body: '同一份三年需求清单，向每个候选方案分别报价，把许可、模型、解析、存储、数据库、运维、升级与支持的人天全部入账。不入账人天的对比，结论一定偏向看起来便宜的那个。'
      }
    ],
    trustLine: '对照表只使用各家官方公开资料中可验证的事实并标注核验日；未列出的项写「未列出」，不做推断。',
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
    updatedAt: '2026年9月11日'
  },
  {
    slug: 'agent-workflow',
    category: '工作流搭建',
    keywordGroup: '智能体搭建、ai工作流、ai agent 平台',
    h1: '搭一条能跑在生产里的 AI 工作流',
    subtitle: '可直接导入的模板加一份搭建教程，先把流程跑起来，再决定要不要接进业务系统。',
    sections: [
      {
        heading: '先拿到什么',
        body: '几套可直接导入的工作流模板与配套教程：节点怎么连、变量怎么传、调试面板怎么看每一步的输入输出与用量。导入后改成自己的知识库与提示词即可试跑。'
      },
      {
        heading: '原型和生产的差别在哪',
        body: '原型阶段流程跑通就算成功。放进生产要多三件事：节点失败后能重试且幂等、流程中间需要人工确认时能暂停并原地恢复、用固定问题集做回归，否则每次改动都是盲改。这三件事决定了流程改到第五版时还敢不敢动它。'
      },
      {
        heading: '接进业务的路径',
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
    updatedAt: '2026年9月11日'
  },
  {
    slug: 'ai-customer-service',
    category: '智能客服',
    keywordGroup: '智能客服机器人、在线客服系统',
    h1: '用自有知识库搭一套智能客服',
    subtitle: '先看同行业已经落地的做法，再用一次 1v1 场景诊断确认自己的工单与知识库能不能接。',
    sections: [
      {
        heading: '这套客服是怎么组成的',
        body: '把已有的产品手册、工单记录与内部问答导入知识库，配一条带人工转接的工作流，再发布到官网、公众号、企业微信或在线客服入口。答案带引用出处，可以点回到知识库里的原始段落。'
      },
      {
        heading: '和买一套成品客服系统的区别',
        body: '成品系统的答案来自它自己的语料库，改说法要走它的配置；知识库方案的答案来自企业自己的文档，文档更新答案跟着更新，答错时能定位到是哪一份文档、哪一次切分、哪一条索引的问题。代价是知识库本身需要有人维护。'
      },
      {
        heading: '先验证什么',
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
    updatedAt: '2026年9月11日'
  },
  {
    slug: 'enterprise-knowledge-base',
    category: '企业知识库',
    keywordGroup: 'ai知识库、企业知识库、rag',
    h1: '企业知识库：从上传资料到答得准，中间还有六件事',
    subtitle: '一份落地清单，把解析、切分、索引、检索、评测与更新这六步各自要做的决定写清楚。',
    sections: [
      {
        heading: '清单里有什么',
        body: '六步各自的决定项与验收方式：文档解析用哪条路径、切分策略怎么定、一份正文要不要挂多条索引、检索参数与 ReRank 怎么调、用什么问题集做回归、文档更新后怎么增量重训。每一步都给了判断依据，不是操作步骤。'
      },
      {
        heading: '和「上传资料就能问」的区别',
        body: '上传即用的形态在演示时足够。资料到了几千份之后，问题会变成：同一份文档换个问法检索不到、训练队列里几十份失败只能整库重跑、上个月的用量说不清花在解析还是生成上。这份清单要解决的正是这些在第二个月才出现的问题。'
      },
      {
        heading: '为什么要先定评测',
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
    updatedAt: '2026年9月11日'
  }
];
