export const PRICE_PLANS_CLOUD = [
  {
    key: 'free',
    title: '免费版',
    price: 0,
    content: '核心功能免费试用。30 天未登录，将会清空知识库。',
    features: [
      '3 个团队成员上限',
      '30 个应用上限',
      '10 个知识库上限',
      '30 天对话记录保留',
      '600 组知识库索引',
      '100 AI 积分',
      '训练优先级: 1'
    ]
  },
  {
    key: 'trial',
    title: '体验版',
    price: 59,
    content: '可解锁 FastGPT 完整功能',
    features: [
      '10 个团队成员上限',
      '80 个应用上限',
      '30 个知识库上限',
      '180 天对话记录保留',
      '5000 组知识库索引',
      '3000 AI 积分',
      '训练优先级: 2',
      'Web 站点同步'
    ]
  },
  {
    key: 'team',
    title: '团队版',
    price: 399,
    content: '适合小团队构建知识库应用并提供对外服务',
    features: [
      '50 个团队成员上限',
      '200 个应用上限',
      '100 个知识库上限',
      '360 天对话记录保留',
      '40000 组知识库索引',
      '20000 AI 积分',
      '训练优先级: 3',
      'Web 站点同步'
    ]
  },
  {
    key: 'enterprise',
    title: '企业版',
    price: 999,
    content: '适合企业级应用，提供私有化部署',
    features: [
      '500 个团队成员上限',
      '1000 个应用上限',
      '500 个知识库上限',
      '720 天对话记录保留',
      '150000 组知识库索引',
      '60000 AI 积分',
      '训练优先级: 4',
      'Web 站点同步',
      '记录团队操作日志'
    ]
  }
] as const;

export const PRICE_PLANS_SELF = [
  {
    key: 'free',
    title: '免费版',
    price: '免费',
    content: '免费开源，共建 Agent 社区，为 Agent 贡献力量',
    features: [
      '基础核心功能（工作流、知识库等）',
      '单用户使用',
      '提供社区技术支持服务',
      '模型日志看板'
    ]
  },
  {
    key: 'host',
    title: '托管版',
    price: '基于云市场',
    content: '基于 Sealos 云端托管，更安全更高效部署',
    features: [
      '基础核心功能（工作流、知识库等）',
      '单用户使用',
      '提供社区技术支持服务',
      '模型日志看板',
      '团队版管理功能',
      '更精细化的运维和数据洞察看板',
      '更高级的知识库索引能力',
      '更安全的权限管理能力',
      '专属工程师专业支持',
      '商业授权许可，自定义 LOGO',
      '支持使用云服务商托管部署'
    ]
  },
  {
    key: 'commercial',
    title: '商业版',
    price: '定制化',
    content: '支持更高阶功能，私有化部署',
    features: [
      '基础核心功能（工作流、知识库等）',
      '单用户使用',
      '提供社区技术支持服务',
      '模型日志看板',
      '团队版管理功能',
      '更精细化的运维和数据洞察看板',
      '更高级的知识库索引能力',
      '更安全的权限管理能力',
      '专属工程师专业支持',
      '商业授权许可，自定义 LOGO',
      '支持企业私有云部署'
    ]
  }
] as const;

export const PRICE_PLANS_SELF_BUTTON_MAP = {
  free: {
    title: '立即使用',
    href: 'https://github.com/labring/FastGPT'
  },
  host: {
    title: '基于云市场',
    href: 'https://template.bja.sealos.run/deploy?templateName=fastgpt'
  },
  commercial: {
    title: '联系销售',
    href: 'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=H1&hide_S=1'
  }
} as const;
