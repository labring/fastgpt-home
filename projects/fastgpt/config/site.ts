import { SiteConfig } from '@/types/siteConfig';
import { BsGithub } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';
import { IoLogoWechat } from 'react-icons/io5';
import { HiUserGroup } from 'react-icons/hi';

import { MdEmail } from 'react-icons/md';
const OPEN_SOURCE_URL = 'https://github.com/labring/FastGPT';

const baseSiteConfig = {
  title: 'FastGPT - Enterprise AI Agent Builder',
  name: 'FastGPT',
  description:
    'A free, open-source Enterprise AI Agent Builder, provide Agentic RAG retrieval、AI-powered workflows and MCP tools. Easy to build AI Agents.',
  url: process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io',
  userUrl: process.env.NEXT_PUBLIC_USER_URL || 'https://cloud.fastgpt.io',
  ogImage: 'https://landingpage.weijunext.com/og.png',
  metadataBase: '/',
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
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name
  },
  twitter: {
    card: 'summary_large_image',
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png?${new Date().getTime()}`],
    creator: baseSiteConfig.creator
  }
};

export const siteConfigZh: SiteConfig = {
  ...siteConfig,
  title: 'FastGPT - 企业级 AI Agent 搭建平台',
  description:
    'FastGPT是一个企业级 AI Agent 搭建平台，可以基于 LLM 大语言模型搭建 AI 知识库问答系统,提供开箱即用的AI Agent 工具集及大模型调用等能力，并通过可视化 workflow 编排功能实现复杂的AI应用能力!',
  keywords: [
    'FastGPT',
    'AI Agent',
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
  ]
};
