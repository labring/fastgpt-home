import { SiteConfig } from "@/types/siteConfig";
import { BsGithub, BsTwitterX, BsWechat } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { SiBuymeacoffee, SiJuejin } from "react-icons/si";

const OPEN_SOURCE_URL = 'https://github.com/labring/FastGPT'

const baseSiteConfig = {
  name: "FastGPT",
  description:
    "A free, open-source, and powerful AI knowledge base platform, offers out-of-the-box data processing, model invocation, RAG retrieval, and visual AI workflows. Easily build complex Q&A systems.",
  url: "https://fastgpt.in",
  ogImage: "https://landingpage.weijunext.com/og.png",
  metadataBase: '/',
  keywords: ["rag", "ai", "workflow", "llm", "langchain", "gpt", "gpt4", "orchestration"],
  commercial: "https://doc.fastai.site/docs/commercial/intro/",
  authors: [
    {
      name: "labring",
      url: "https://fastgpt.in",
      twitter: 'https://github.com/labring/FastGPT',
    }
  ],
  creator: '@fastgpt',
  openSourceURL: 'https://github.com/labring/FastGPT',
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  nextThemeColor: 'dark', // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/logo.svg",
  },
  headerLinks: [
    { name: 'repo', href: OPEN_SOURCE_URL, icon: BsGithub },
    { name: 'weChat', href: "https://oss.laf.run/htr4n1-images/fastgpt-qr-code.jpg", icon: BsWechat }
  ],
  footerLinks: [
    { name: 'email', href: "mailto:cloud-native-yang@sealos.io", icon: MdEmail },
    { name: 'github', href: "https://github.com/labring/FastGPT", icon: BsGithub },
    { name: 'weChat', href: "https://oss.laf.run/htr4n1-images/fastgpt-qr-code.jpg", icon: BsWechat }
  ],
  footerProducts: [
    { url: 'https://sealos.io', name: 'Sealos' },
    { url: 'https://doc.fastai.site', name: 'Docs' },
    { url: 'https://doc.fastai.site/docs/community/', name: 'Forum' },
    { url: 'https://uuhyahynnudq.hzh.sealos.run/status/in', name: 'Status' },
  ]
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
}
