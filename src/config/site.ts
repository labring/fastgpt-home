import { SiteConfig } from '@/types/siteConfig';
import { BsGithub } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';

const OPENGRAPH_IMAGE = '/opengraph-image.png';
const TWITTER_IMAGE = '/twitter-image.png';

const baseSiteConfig = {
  title: 'FastGPT - Enterprise AI Agent Builder | Open Source RAG Platform',
  name: 'FastGPT',
  description:
    "Build powerful AI agents with FastGPT's visual workflow, knowledge base, and RAG system. 500K+ users trust our open-source AI platform. Start free today.",
  url: process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io',
  userUrl: process.env.NEXT_PUBLIC_USER_URL || 'https://cloud.fastgpt.io',
  customPlanUrl:
    process.env.NEXT_PUBLIC_CUSTOM_PLAN_URL ||
    'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=C1&hide_S=1',
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
    'knowledge base',
    'question answering',
    'data processing',
    'model invocation',
    'RAG retrieval',
    'visual AI workflow',
    'enterprise knowledge base'
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
  footerLinks: [
    { name: 'email', href: 'mailto:yujinlong@sealos.io', icon: MdEmail },
    { name: 'github', href: 'https://github.com/labring/FastGPT', icon: BsGithub },
    {
      name: 'Lark',
      href: 'https://oss.laf.run/otnvvf-imgs/fastgpt-feishu1.png',
      icon: HiUserGroup
    }
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
    description:
      'Flexible AI Workflow + AI Knowledge Base + Template System + Agentic RAG = Powerful AI Agent Builder. Trusted by 500,000+ users worldwide.',
    siteName: baseSiteConfig.name,
    images: [`${baseSiteConfig.url}${OPENGRAPH_IMAGE}`]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FastGPT - Enterprise AI Agent Builder',
    description:
      'Build powerful AI agents with visual workflow, knowledge base, and RAG system. 500K+ users trust our open-source platform.',
    images: [`${baseSiteConfig.url}${TWITTER_IMAGE}`],
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
    'RAG 检索',
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
    description:
      '灵活的 AI 工作流 + AI 知识库 + 模板系统 + Agentic RAG = 强大的 AI 智能体构建器。全球 50 万+用户信赖。',
    images: [`${baseSiteConfig.url}${OPENGRAPH_IMAGE}`]
  },
  twitter: {
    ...siteConfig.twitter,
    title: 'FastGPT - 企业级 AI 智能体构建平台',
    description:
      'FastGPT 是开源的企业级 AI 智能体构建平台，提供可视化工作流、知识库和 RAG 系统。50万+用户信赖。'
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
    'RAG検索',
    'AI自動化',
    'エンタープライズAI',
    'LLM',
    'GPT',
    'チャットボット'
  ],
  openGraph: {
    ...siteConfig.openGraph,
    locale: 'ja_JP',
    title: 'FastGPT - エンタープライズ AI エージェント構築プラットフォーム',
    description:
      'ビジュアルAIワークフロー、ナレッジベース、Agentic RAGで、本番環境向けのAIエージェントを構築します。'
  },
  twitter: {
    ...siteConfig.twitter,
    title: 'FastGPT - エンタープライズ AI エージェント構築プラットフォーム',
    description:
      'FastGPTは、企業向けAIエージェント、ナレッジベース、RAG、ワークフローを構築するオープンソースプラットフォームです。'
  }
};

function createLocalizedSiteConfig({
  title,
  description,
  keywords,
  locale,
  ogTitle,
  ogDescription
}: {
  title: string;
  description: string;
  keywords: string[];
  locale: string;
  ogTitle?: string;
  ogDescription?: string;
}): SiteConfig {
  return {
    ...siteConfig,
    title,
    description,
    keywords,
    openGraph: {
      ...siteConfig.openGraph,
      locale,
      title: ogTitle || title,
      description: ogDescription || description
    },
    twitter: {
      ...siteConfig.twitter,
      title: ogTitle || title,
      description: ogDescription || description
    }
  };
}

export const siteConfigAr = createLocalizedSiteConfig({
  title: 'FastGPT - منصة بناء وكلاء ذكاء اصطناعي للمؤسسات',
  description:
    'FastGPT منصة مفتوحة المصدر لبناء وكلاء ذكاء اصطناعي للمؤسسات، تجمع بين سير العمل المرئي وقواعد المعرفة وRAG لبناء تطبيقات AI آمنة وقابلة للإنتاج.',
  keywords: ['FastGPT', 'وكيل ذكاء اصطناعي', 'RAG', 'قاعدة معرفة', 'سير عمل AI', 'LLM', 'أتمتة مؤسسية'],
  locale: 'ar_SA',
  ogTitle: 'FastGPT - منصة وكلاء AI للمؤسسات',
  ogDescription: 'ابن وكلاء AI للمؤسسات باستخدام سير عمل مرئي، قواعد معرفة، وAgentic RAG.'
});

export const siteConfigVi = createLocalizedSiteConfig({
  title: 'FastGPT - Nền tảng xây dựng AI Agent cho doanh nghiệp',
  description:
    'FastGPT là nền tảng mã nguồn mở để xây dựng AI Agent cho doanh nghiệp, cung cấp workflow trực quan, kho tri thức và RAG để triển khai ứng dụng AI an toàn.',
  keywords: ['FastGPT', 'AI Agent', 'RAG', 'kho tri thức', 'workflow AI', 'LLM', 'tự động hóa doanh nghiệp'],
  locale: 'vi_VN',
  ogTitle: 'FastGPT - Nền tảng AI Agent cho doanh nghiệp',
  ogDescription: 'Xây dựng AI Agent sẵn sàng sản xuất với workflow trực quan, kho tri thức và Agentic RAG.'
});

export const siteConfigTh = createLocalizedSiteConfig({
  title: 'FastGPT - แพลตฟอร์มสร้าง AI Agent สำหรับองค์กร',
  description:
    'FastGPT เป็นแพลตฟอร์มโอเพนซอร์สสำหรับสร้าง AI Agent ระดับองค์กร พร้อมเวิร์กโฟลว์แบบภาพ ฐานความรู้ และ RAG เพื่อสร้างแอป AI ที่ปลอดภัยและใช้งานจริงได้',
  keywords: ['FastGPT', 'AI Agent', 'RAG', 'ฐานความรู้', 'เวิร์กโฟลว์ AI', 'LLM', 'ระบบอัตโนมัติองค์กร'],
  locale: 'th_TH',
  ogTitle: 'FastGPT - แพลตฟอร์ม AI Agent สำหรับองค์กร',
  ogDescription: 'สร้าง AI Agent สำหรับงานจริงด้วยเวิร์กโฟลว์แบบภาพ ฐานความรู้ และ Agentic RAG.'
});

export const siteConfigId = createLocalizedSiteConfig({
  title: 'FastGPT - Platform pembuat AI Agent untuk perusahaan',
  description:
    'FastGPT adalah platform open-source untuk membangun AI Agent perusahaan, dengan workflow visual, knowledge base, dan RAG untuk aplikasi AI yang aman dan siap produksi.',
  keywords: ['FastGPT', 'AI Agent', 'RAG', 'knowledge base', 'workflow AI', 'LLM', 'otomatisasi perusahaan'],
  locale: 'id_ID',
  ogTitle: 'FastGPT - Platform AI Agent untuk perusahaan',
  ogDescription: 'Bangun AI Agent siap produksi dengan workflow visual, knowledge base, dan Agentic RAG.'
});

export const siteConfigMs = createLocalizedSiteConfig({
  title: 'FastGPT - Platform membina AI Agent untuk perusahaan',
  description:
    'FastGPT ialah platform sumber terbuka untuk membina AI Agent perusahaan, dengan aliran kerja visual, pangkalan pengetahuan dan RAG untuk aplikasi AI yang selamat dan sedia produksi.',
  keywords: ['FastGPT', 'AI Agent', 'RAG', 'pangkalan pengetahuan', 'aliran kerja AI', 'LLM', 'automasi perusahaan'],
  locale: 'ms_MY',
  ogTitle: 'FastGPT - Platform AI Agent untuk perusahaan',
  ogDescription: 'Bina AI Agent sedia produksi dengan aliran kerja visual, pangkalan pengetahuan dan Agentic RAG.'
});
