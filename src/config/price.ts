export const PRICE_PLANS_CLOUD: Record<string, Record<string, any>[]> = {
  zh: [
    {
      key: 'free',
      title: '免费版',
      price: 0,
      content: '核心功能免费试用',
      features: [
        // '100 AI 积分',
        100,
        '600 组知识库索引',
        '1 个团队成员',
        '10 个 Agent',
        '3 个 知识库',
        '30 天对话记录保留',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: '基础版',
      price: 99,
      content: '解锁 FastGPT 完整功能',
      features: [
        4000,
        '6000 组知识库索引',
        '5 个团队成员',
        '50 个 Agent',
        '30 个知识库',
        '180 天对话记录保留',
        '300 QPM',
        '站点同步最大 500 页',
        '48 小时工单支持响应'
      ]
    },
    {
      key: 'advanced',
      title: '高级版',
      price: 599,
      content: '适合企业级生产工具',
      features: [
        25000,
        '36000 组知识库索引',
        '50 个团队成员',
        '200 个 Agent',
        '100 个知识库',
        '360 天对话记录保留',
        '720 天团队操作日志记录',
        '1500 QPM',
        '站点同步最大 2000 页',
        '24 小时工单支持响应',
        '3 个应用备案'
      ]
    },
    {
      key: 'custom',
      title: '定制版',
      price: '定制计费',
      content: '助力中大型企业构建核心竞争力',
      features: ['优先深度技术支持', '弹性资源配置', '安全可控', '专属客户经理']
    }
  ],
  en: [
    {
      key: 'free',
      title: 'Free Edition',
      price: 0,
      content: 'Core features free to try',
      features: [
        100,
        '600 knowledge base indexes',
        '1 team member',
        '10 Agents',
        '3 knowledge bases',
        '30 days conversation history retention',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: 'Basic Edition',
      price: 99,
      content: 'Unlock FastGPT full features',
      features: [
        4000,
        '6000 knowledge base indexes',
        '5 team members',
        '50 Agents',
        '30 knowledge bases',
        '180 days conversation history retention',
        '300 QPM',
        'Max 500 web page syncs',
        '48-hour ticket support response'
      ]
    },
    {
      key: 'advanced',
      title: 'Advanced Edition',
      price: 599,
      content: 'Suitable for enterprise-level production',
      features: [
        25000,
        '36000 knowledge base indexes',
        '50 team members',
        '200 Agents',
        '100 knowledge bases',
        '360 days conversation history retention',
        '720 days team operation log retention',
        '1500 QPM',
        'Max 2000 web page syncs',
        '24-hour ticket support response',
        '3 application registrations'
      ]
    },
    {
      key: 'custom',
      title: 'Custom Edition',
      price: 'Custom',
      content: 'Help medium and large enterprises build core competitiveness',
      features: [
        'Priority in-depth technical support',
        'Flexible resource allocation',
        'Secure and controllable',
        'Dedicated account manager'
      ]
    }
  ],
  ja: [
    {
      key: 'free',
      title: '無料版',
      price: 0,
      content:
        'コア機能を無料で試用できます。30日間ログインがない場合、ナレッジベースがクリアされます',
      features: [
        // '100 AIクレジット',
        100,
        '600組のナレッジベースインデックス',
        '1チームメンバー',
        '10個のAgent',
        '3個のナレッジベース',
        '30日間の会話記録保存',
        '30 QPM'
      ]
    },
    {
      key: 'basic',
      title: '基本版',
      price: 99,
      content: 'FastGPTの完全な機能をアンロックできます',
      features: [
        4000,
        '6000組のナレッジベースインデックス',
        '5チームメンバー',
        '50個のAgent',
        '30個のナレッジベース',
        '180日間の会話記録保存',
        '300 QPM',
        'サイト同期最大500ページ',
        '48時間のチケットサポート対応'
      ]
    },
    {
      key: 'advanced',
      title: '高度版',
      price: 599,
      content: '企業レベルの生産ツールに適しています',
      features: [
        25000,
        '36000組のナレッジベースインデックス',
        '50チームメンバー',
        '200個のAgent',
        '100個のナレッジベース',
        '360日間の会話記録保存',
        '720日間のチーム操作ログ保存',
        '1500 QPM',
        'サイト同期最大500ページ',
        '24時間のチケットサポート対応',
        '3個のアプリケーション登録'
      ]
    },
    {
      key: 'custom',
      title: 'カスタム版',
      price: 'カスタマイズ料金',
      content: '中大型企業のコア競争力構築を支援',
      features: [
        '優先的な深い技術サポート',
        '柔軟なリソース配分',
        '安全で制御可能',
        '専任カスタマーマネージャー'
      ]
    }
  ]
};

export const PRICE_PLANS_SELF: {
  [key: string]: {
    key: string;
    title: string;
    price: string;
    content: string;
    features: string[];
  }[];
} = {
  zh: [
    {
      key: 'free',
      title: '社区版',
      price: '免费',
      content: '免费开源，共建 Agent 社区，为 Agent 贡献力量',
      features: [
        '基础核心功能（Agent、Workflow、知识库、MCP等）',
        '模型管理与模型日志',
        '单用户使用',
        '社区技术支持服务'
      ]
    },
    {
      key: 'host',
      title: '托管版',
      price: '云资源计费',
      content: '基于 Sealos 云端托管，更安全更高效部署',
      features: ['一键快速部署', '快速横纵向扩展', '多副本负载均衡', '数据库自动备份']
    },
    {
      key: 'commercial',
      title: '商业版',
      price: '定制化计费',
      content: '支持更高阶功能，私有化部署',
      features: [
        '完整商业授权',
        '企业级可扩展部署方案',
        '多工作空间 & 权限管理',
        '支持多种第三方 SSO',
        '原厂技术支持和服务支持',
        '原厂专业应用搭建支持'
      ]
    }
  ],
  en: [
    {
      key: 'free',
      title: 'Community Edition',
      price: 'Free',
      content: 'Free open source, build Agent community together, contribute power to Agent',
      features: [
        'Basic core functions (Agent, Workflow, Knowledge Base, MCP, etc.)',
        'Model management and model logs',
        'Single user use',
        'Community technical support service'
      ]
    },
    {
      key: 'host',
      title: 'Hosted Edition',
      price: 'Cloud resource billing',
      content: 'Based on Sealos cloud hosting, more secure and efficient deployment',
      features: [
        'One-click quick deployment',
        'Quick horizontal and vertical expansion',
        'Multiple replica load balancing',
        'Database automatic backup'
      ]
    },
    {
      key: 'commercial',
      title: 'Commercial Edition',
      price: 'Custom',
      content: 'Support higher-level features, private deployment',
      features: [
        'Full commercial license',
        'Enterprise-level scalable deployment solution',
        'Multiple workspaces & permission management',
        'Support for multiple third-party SSO',
        'Original factory technical support and service support',
        'Original factory professional application support'
      ]
    }
  ],
  ja: [
    {
      key: 'free',
      title: 'コミュニティ版',
      price: '無料',
      content: '無料オープンソース、共にAgentコミュニティを築き、Agentに貢献する',
      features: [
        '基礎核心機能（Agent、Workflow、知識ベース、MCP等）',
        'モデル管理とモデルログ',
        '単一ユーザー利用可能',
        'コミュニティ技術サポートサービス'
      ]
    },
    {
      key: 'host',
      title: 'ホスティング版',
      price: 'クラウドリソース計費',
      content: 'Sealos クラウドホスティングベースで、より安全で効率的なデプロイを提供',
      features: [
        '1クリックでの迅速なデプロイ',
        '迅速な横縦方向の拡張',
        '複数のレプリカ負荷分散',
        'データベースの自動バックアップ'
      ]
    },
    {
      key: 'commercial',
      title: '商用版',
      price: '要相談',
      content: 'より高度な機能をサポートし、プライベートデプロイを提供',
      features: [
        '完全な商用ライセンス',
        '企業レベルの拡張可能なデプロイソリューション',
        '複数のワークスペース & 権限管理',
        '複数のサードパーティーSSOのサポート',
        '原産国技術サポートとサービスサポート',
        '原産国専門アプリケーションのサポート'
      ]
    }
  ]
} as const;

export const PRICE_PLANS_SELF_BUTTON_MAP: {
  [key: string]: Record<string, string>;
} = {
  free: {
    zh: '立即使用',
    en: 'Get Started',
    ja: '使用開始',
    href: 'https://github.com/labring/FastGPT'
  },
  host: {
    zh: '立即使用',
    en: 'Get Started',
    ja: '使用開始',
    href: 'https://hzh.sealos.run/?openapp=system-template?templateName=fastgpt&uid=fnWRt09fZP'
  },
  commercial: {
    zh: '联系销售',
    en: 'Contact Sales',
    ja: '営業連絡',
    href: 'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=H1&hide_S=1'
  }
} as const;
