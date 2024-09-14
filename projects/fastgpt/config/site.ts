import { SiteConfig } from '@/types/siteConfig';
import { BsGithub, BsWechat } from 'react-icons/bs';
import { FaDiscord } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { MdEmail } from 'react-icons/md';
const OPEN_SOURCE_URL = 'https://github.com/labring/FastGPT';

const baseSiteConfig = {
  name: 'FastGPT',
  description:
    'A free, open-source, and powerful AI knowledge base platform, offers out-of-the-box data processing, model invocation, RAG retrieval, and visual AI workflows. Easily build complex Q&A systems.',
  url: process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.in',
  userUrl: process.env.NEXT_PUBLIC_USER_URL || 'https://cloud.fastgpt.in',
  ogImage: 'https://landingpage.weijunext.com/og.png',
  metadataBase: '/',
  keywords: [
    'rag',
    'ai',
    'workflow',
    'llm',
    'gpt',
    'gpt4',
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
  commercial: 'https://doc.fastgpt.in/docs/commercial/intro/',
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
      name: 'weChat',
      href: 'https://oss.laf.run/htr4n1-images/fastgpt-qr-code.jpg',
      icon: FaDiscord
    }
  ],
  footerLinks: [
    { name: 'email', href: 'mailto:cloud-native-yang@sealos.io', icon: MdEmail },
    { name: 'github', href: 'https://github.com/labring/FastGPT', icon: BsGithub },
    {
      name: 'weChat',
      href: 'https://oss.laf.run/htr4n1-images/fastgpt-qr-code.jpg',
      icon: BsWechat
    }
  ],
  footerProducts: [
    { url: 'https://sealos.io', name: 'Sealos' },
    { url: 'https://doc.fastgpt.in', name: 'Docs' },
    { url: 'https://doc.fastgpt.in/docs/community/', name: 'Forum' },
    { url: 'https://uuhyahynnudq.hzh.sealos.run/status/in', name: 'Status' },
  ],
  footerService:[
       { url: 'https://doc.fastgpt.in/docs/agreement/terms', name: 'Terms of Service' },
    { url: 'https://doc.fastgpt.in/docs/agreement/privacy', name: 'Privacy Policy' }
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
