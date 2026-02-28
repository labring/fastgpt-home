import { SiteConfig } from '@/types/siteConfig';
import { BsGithub } from 'react-icons/bs';
import { IoLogoGithub } from 'react-icons/io';
import { HiUserGroup } from 'react-icons/hi';

import { MdEmail } from 'react-icons/md';
const OPEN_SOURCE_URL = 'https://github.com/labring/FastGPT';

const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';

const baseSiteConfig = {
  title: 'FastGPT - Enterprise AI Agent Builder',
  name: 'FastGPT',
  description:
    'FastGPT is a free, open-source Enterprise AI Agent Builder. Build AI knowledge bases, automate workflows with RAG retrieval, MCP tools, and visual orchestration. Deploy in minutes.',
  url: baseUrl,
  userUrl: process.env.NEXT_PUBLIC_USER_URL || 'https://cloud.fastgpt.io',
  customPlanUrl:
    process.env.NEXT_PUBLIC_CUSTOM_PLAN_URL ||
    'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=C1&hide_S=1',
  ogImage: `${baseUrl}/og.png`,
  metadataBase: baseUrl,
  // English-only keywords (Chinese keywords are in siteConfigZh)
  keywords: [
    'FastGPT',
    'AI Agent Builder',
    'RAG',
    'knowledge base',
    'AI workflow',
    'LLM',
    'open source AI',
    'enterprise AI',
    'AI Agent',
    'workflow automation',
    'MCP tools',
    'agentic RAG',
    'AI customer service',
    'chatbot builder'
  ],
  // commercial: 'https://doc.fastgpt.io/docs/commercial/intro/',
  commercial:
    'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=G1&hide_S=1',
  authors: [
    {
      name: 'labring',
      url: baseUrl,
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
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
    images: [baseSiteConfig.ogImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [baseSiteConfig.ogImage],
    creator: baseSiteConfig.creator
  }
};

export const siteConfigZh: SiteConfig = {
  ...siteConfig,
  title: 'FastGPT - 企业级 AI Agent 搭建平台',
  description:
    'FastGPT 是一款免费开源的企业级 AI Agent 搭建平台。支持 RAG 知识库问答、可视化 AI 工作流编排、MCP 工具集成，帮助企业快速构建 AI 客服、智能助手等应用。',
  keywords: [
    'FastGPT',
    'AI Agent',
    'AI 知识库',
    'RAG 检索',
    '可视化 AI 工作流',
    '企业 AI',
    'AI 客服',
    '大语言模型',
    '开源 AI',
    '知识库问答',
    'AI 自动化',
    '工作流编排',
    'MCP 工具',
    '智能助手'
  ],
  openGraph: {
    ...siteConfig.openGraph,
    locale: 'zh_CN',
    title: 'FastGPT - 企业级 AI Agent 搭建平台',
    description:
      'FastGPT 是一款免费开源的企业级 AI Agent 搭建平台。支持 RAG 知识库问答、可视化 AI 工作流编排、MCP 工具集成，帮助企业快速构建 AI 客服、智能助手等应用。'
  }
};

export const siteConfigJa: SiteConfig = {
  ...siteConfig,
  title: 'FastGPT - エンタープライズ AI エージェント構築プラットフォーム',
  description:
    'FastGPT は無料オープンソースのエンタープライズ AI エージェント構築プラットフォームです。RAG ナレッジベース、ビジュアルワークフロー、MCP ツール統合で AI エージェントを素早く構築できます。',
  keywords: [
    'FastGPT',
    'AI Agent',
    'AI エージェント',
    'ナレッジベース',
    'RAG 検索',
    'AI ワークフロー',
    'エンタープライズ AI',
    'オープンソース AI',
    'LLM',
    'AI 自動化',
    'チャットボット',
    'MCP ツール'
  ],
  openGraph: {
    ...siteConfig.openGraph,
    locale: 'ja_JP',
    title: 'FastGPT - エンタープライズ AI エージェント構築プラットフォーム',
    description:
      'FastGPT は無料オープンソースのエンタープライズ AI エージェント構築プラットフォームです。RAG ナレッジベース、ビジュアルワークフロー、MCP ツール統合で AI エージェントを素早く構築できます。'
  }
};
