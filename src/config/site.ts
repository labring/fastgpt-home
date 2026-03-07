import { SiteConfig } from '@/types/siteConfig';
import { BsGithub } from 'react-icons/bs';
import { IoLogoGithub } from 'react-icons/io';
import { HiUserGroup } from 'react-icons/hi';

import { MdEmail } from 'react-icons/md';
const OPEN_SOURCE_URL = 'https://github.com/labring/FastGPT';

const baseSiteConfig = {
  title: 'FastGPT - Enterprise AI Agent Builder | Open Source RAG Platform',
  name: 'FastGPT',
  description:
    'Build powerful AI agents with FastGPT\'s visual workflow, knowledge base, and RAG system. 500K+ users trust our open-source AI platform. Start free today.',
  url: process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io',
  userUrl: process.env.NEXT_PUBLIC_USER_URL || 'https://cloud.fastgpt.io',
  customPlanUrl:
    process.env.NEXT_PUBLIC_CUSTOM_PLAN_URL ||
    'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=C1&hide_S=1',
  ogImage: '/og-image.png',
  metadataBase: 'https://fastgpt.io',
  keywords: [
    'rag',
    'ai',
    'agent',
    'ai agent',
    'workflow',
    'llm',
    'gpt',
    'gpt5',
    'orchestration',
    'FastGPT',
    'free',
    '知识库',
    '问答',
    '数据处理',
    '模型调用',
    'RAG检索',
    '可视化AI工作流',
    '企业知识库'
  ],
  // commercial: 'https://doc.fastgpt.io/docs/commercial/intro/',
  commercial:
    'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=G1&hide_S=1',
  authors: [
    {
      name: 'labring',
      url: process.env.NEXT_PUBLIC_HOME_URL || '',
      twitter: 'https://github.com/labring/FastGPT'
    }
  ],
  creator: '@fastgpt',
  openSourceURL: 'https://github.com/labring/FastGPT',
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  nextThemeColor: 'dark', // next-theme option: system | dark | light
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/logo.svg'
  },
  headerLinks: [
    { name: 'repo', href: OPEN_SOURCE_URL, icon: IoLogoGithub },
    {
      name: 'Lark',
      href: 'https://oss.laf.run/otnvvf-imgs/fastgpt-feishu1.png',
      icon: HiUserGroup
    }
  ],
  footerLinks: [
    { name: 'email', href: 'mailto:yujinlong@sealos.io', icon: MdEmail },
    { name: 'github', href: 'https://github.com/labring/FastGPT', icon: BsGithub },
    {
      name: 'Lark',
      href: 'https://oss.laf.run/otnvvf-imgs/fastgpt-feishu1.png',
      icon: HiUserGroup
    }
  ],
  footerProducts: [
    // { url: 'https://sealos.io', name: 'Sealos' },
    // { url: 'https://doc.fastgpt.io/docs/introduction', name: 'Docs' },
    // { url: 'https://oss.laf.run/otnvvf-imgs/fastgpt-feishu1.png', name: '飞书讨论群' },
    // { url: 'https://uuhyahynnudq.hzh.sealos.run/status/in', name: 'Status' },
  ],
  footerService: [
    { url: 'https://doc.fastgpt.io/docs/protocol/terms', name: 'Terms of Service' },
    { url: 'https://doc.fastgpt.io/docs/protocol/privacy', name: 'Privacy Policy' }
  ]
};

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseSiteConfig.url,
    title: 'FastGPT - Enterprise AI Agent Builder',
    description: 'Flexible AI Workflow + AI Knowledge Base + Template System + Agentic RAG = Powerful AI Agent Builder. Trusted by 500,000+ users worldwide.',
    siteName: baseSiteConfig.name,
    images: [`${baseSiteConfig.url}/og-image.png`]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FastGPT - Enterprise AI Agent Builder',
    description: 'Build powerful AI agents with visual workflow, knowledge base, and RAG system. 500K+ users trust our open-source platform.',
    images: [`${baseSiteConfig.url}/og-image.png`],
    creator: baseSiteConfig.creator
  }
};

export const siteConfigZh: SiteConfig = {
  ...siteConfig,
  title: 'FastGPT - 企业级 AI 智能体构建平台 | 开源 RAG 系统',
  description:
    'FastGPT 是开源的企业级 AI 智能体构建平台，提供可视化工作流、知识库和 RAG 系统。50万+用户信赖，立即免费开始。',
  keywords: [
    'FastGPT',
    'AI Agent',
    'AI 智能体',
    '知识库',
    '问答',
    'workflow',
    'AI 客服',
    'RAG检索',
    '可视化AI工作流',
    '企业知识库',
    'rag',
    'ai',
    'AI 知识库',
    'llm',
    'gpt',
    'gpt5',
    'AI自动化工具'
  ],
  openGraph: {
    ...siteConfig.openGraph,
    locale: 'zh_CN',
    title: 'FastGPT - 企业级 AI 智能体构建平台',
    description: '灵活的 AI 工作流 + AI 知识库 + 模板系统 + Agentic RAG = 强大的 AI 智能体构建器。全球 50 万+用户信赖。',
    images: [`${baseSiteConfig.url}/og-image.png`]
  },
  twitter: {
    ...siteConfig.twitter,
    title: 'FastGPT - 企业级 AI 智能体构建平台',
    description: 'FastGPT 是开源的企业级 AI 智能体构建平台，提供可视化工作流、知识库和 RAG 系统。50万+用户信赖。'
  }
};

export const siteConfigJa: SiteConfig = {
  ...siteConfig,
  title: 'FastGPT - エンタープライズ AI エージェント構築プラットフォーム',
  description:
    'FastGPTは、LLM大規模言語モデルをベースにAIナレッジベースQ&Aシステムを構築できるエンタープライズAIエージェント構築プラットフォームです。すぐに使えるAIエージェントツールセットとモデル呼び出し機能を提供し、ビジュアルワークフロー編集で複雑なAIアプリケーションを実現します。',
  keywords: [
    'FastGPT',
    'AI Agent',
    'AIエージェント',
    'ナレッジベース',
    'ワークフロー',
    'RAG检索',
    'AI自動化',
    'エンタープライズAI',
    'LLM',
    'GPT',
    'チャットボット'
  ]
};
