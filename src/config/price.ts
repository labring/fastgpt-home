export const PRICE_PLANS_CLOUD: Record<string, Record<string, any>[]> = {
  zh: [
    {
      key: 'free',
      title: '免费版',
      price: 0,
      content: '核心功能免费试用。30 天未登录，将会清空知识库。',
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
      content: '可解锁 FastGPT 完整功能',
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
      content: '适合企业级的生产工具',
      features: [
        25000,
        '36000 组知识库索引',
        '50 个团队成员',
        '200 个 Agent',
        '100 个知识库',
        '360 天对话记录保留',
        '720 天团队操作日志记录',
        '1500 QPM',
        '站点同步最大 500 页',
        '24 小时工单支持响应',
        '3 个应用备案'
      ]
    },
    {
      key: 'custom',
      title: '定制版',
      price: '定制化计费',
      content: '助力中大型企业构建核心竞争力',
      features: ['优先深度技术支持', '弹性资源配置', '安全可控', '专属客户经理']
    }
  ],
  en: [
    {
      key: 'free',
      title: 'Free Edition',
      price: 0,
      content: 'Core features are free to try. The knowledge base will be cleared after 30 days of inactivity.',
      features: [
        // '100 AI credits',
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
      content: 'Can unlock FastGPT full features',
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
      content: 'Suitable for enterprise-level production tools',
      features: [
        25000,
        '36000 knowledge base indexes',
        '50 team members',
        '200 Agents',
        '100 knowledge bases',
        '360 days conversation history retention',
        '720 days team operation log retention',
        '1500 QPM',
        'Max 500 web page syncs',
        '24-hour ticket support response',
        '3 application registrations'
      ]
    },
    {
      key: 'custom',
      title: 'Custom Edition',
      price: 'Custom billing',
      content: 'Help medium and large enterprises build core competitiveness',
      features: ['Priority in-depth technical support', 'Flexible resource allocation', 'Secure and controllable', 'Dedicated account manager']
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
      features: ['優先的な深い技術サポート', '柔軟なリソース配分', '安全で制御可能', '専任カスタマーマネージャー']
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

export const PRICE_FAQS: { [key: string]: { title: string; content: string }[] } = {
  zh: [
    {
      title: '是否切换订阅套餐？',
      content:
        '套餐使用规则为优先使用更高级的套餐，因此，购买的新套餐若比当前套餐更高级，则新套餐立即生效：否则将继续使用当前套餐。'
    },
    {
      title: '在哪里查看已订阅的套餐？',
      content:
        '账号-个人信息-套餐详情-使用情况。您可以查看所拥有套餐的生效和到期时间。当付费套餐到期后将自动切换免费版。'
    },
    {
      title: '什么是AI积分？',
      content:
        '每次调用AI模型时，都会消耗一定的AI积分。具体的计算标准可参考上方的“AI积分计算标准”。系统会优先采用模型厂商返回的实际usage，若为空，则采用GPT3.5的计算方式进行估算，1Token≈0.7中文字符≈0.9英文单词，连续出现的字符可能被认为是1个Tokens。'
    },
    {
      title: 'AI积分会过期么？',
      content:
        '会过期。当前套餐过期后，AI积分将会清空，并更新为新套餐的AI积分。年度套餐的AI积分时长为1年，而不是每个月。'
    },
    {
      title: '知识库存储怎么计算？',
      content:
        '1条知识库存储等于1条知识库索引。一条分块数据，通常对应多条索引，可以在单个知识库集合中看到“n组索引”'
    },
    {
      title: '知识库索引超出会删除么？',
      content: '不会。但知识库索引超出时，无法插入和更新知识库内容。'
    },
    {
      title: '额外资源包可以叠加么？',
      content:
        '可以的。每次购买的资源包都是独立的，在其有效期内将会叠加使用。AI积分会优先扣除最先过期的资源包。'
    },
    {
      title: '免费版数据会清除么？',
      content:
        '免费版团队（免费版且未购买额外套餐）连续 30 天未登录系统，系统会自动清除该团队下所有知识库内容。'
    }
  ],
  en: [
    {
      title: 'Can I switch subscription plans?',
      content:
        'The system prioritizes higher-tier plans. If the newly purchased plan is higher than your current plan, it takes effect immediately; otherwise you will continue with your current plan.'
    },
    {
      title: 'Where can I view my subscribed plan?',
      content:
        'Go to Account → Profile → Plan details → Usage. You can view your plan’s effective and expiration times. When a paid plan expires, it will automatically switch to the Free plan.'
    },
    {
      title: 'What are AI credits?',
      content:
        'Each call to an AI model consumes AI credits. See the “AI credit calculation” above. The system prefers the actual usage returned by the model provider; if unavailable, it estimates using the GPT‑3.5 method. 1 token ≈ 0.7 Chinese characters ≈ 0.9 English words. Repeated characters may be counted as a single token.'
    },
    {
      title: 'Do AI credits expire?',
      content:
        'Yes. When your current plan expires, your AI credits are reset and replaced by the credits of the new plan. For annual plans, credits are valid for one year, not per month.'
    },
    {
      title: 'How is knowledge base storage calculated?',
      content:
        'One knowledge base record equals one index entry. A single chunk of data typically corresponds to multiple index entries. You can see this as “n index groups” within a collection.'
    },
    {
      title: 'Will excess knowledge base indexes be deleted?',
      content:
        'No. However, once the index limit is exceeded, you will be unable to insert or update knowledge base content.'
    },
    {
      title: 'Can extra resource packs be stacked?',
      content:
        'Yes. Each purchased resource pack is independent and stacks during its validity period. AI credits are deducted first from the pack that expires the soonest.'
    },
    {
      title: 'Will data on the Free plan be cleared?',
      content:
        'If a Free team (on the Free plan with no additional packages) does not log in for 30 consecutive days, the system will automatically delete all knowledge base content under that team.'
    }
  ],
  ja: [
    {
      title: 'サブスクリプションプランを切り替えできますか？',
      content:
        'システムは上位プランを優先的に適用します。現在のプランより上位のプランを新たに購入した場合は即時に有効化され、そうでない場合は現行プランのまま継続します。'
    },
    {
      title: '契約中のプランはどこで確認できますか？',
      content:
        'アカウント → 個人情報 → プラン詳細 → 利用状況 で確認できます。プランの開始・有効期限を確認できます。有料プランの有効期限が切れると自動的に無料プランに切り替わります。'
    },
    {
      title: 'AIクレジットとは何ですか？',
      content:
        'AIモデルを呼び出すたびにAIクレジットを消費します。詳細な計算方法は上記の「AIクレジットの計算基準」をご参照ください。システムはモデル提供元が返す実際のusageを優先し、ない場合はGPT‑3.5の方式で推定します。1トークン ≈ 中国語0.7文字 ≈ 英語0.9語。連続する同一文字は1トークンと見なされる場合があります。'
    },
    {
      title: 'AIクレジットは有効期限がありますか？',
      content:
        'あります。現在のプランが失効するとAIクレジットはリセットされ、新しいプランのクレジットに更新されます。年額プランのクレジットは1年間有効で、月ごとではありません。'
    },
    {
      title: 'ナレッジベースのストレージはどのように計算されますか？',
      content:
        'ナレッジベース1件はインデックス1件に相当します。1つのチャンクは複数のインデックスに対応することが一般的です。コレクション内で「n組のインデックス」として確認できます。'
    },
    {
      title: 'インデックス数の上限を超えた場合、削除されますか？',
      content:
        '削除はされません。ただし上限を超えると、ナレッジベースへの挿入や更新ができなくなります。'
    },
    {
      title: '追加のリソースパックは併用できますか？',
      content:
        'できます。購入した各リソースパックは独立しており、有効期間内は積み上げて利用されます。AIクレジットは有効期限が早いパックから優先的に消費されます。'
    },
    {
      title: '無料プランのデータは消去されますか？',
      content:
        '無料チーム（無料プランで追加パッケージ未購入）が30日連続でログインしない場合、当該チームのナレッジベース内容は自動的に削除されます。'
    }
  ]
};
