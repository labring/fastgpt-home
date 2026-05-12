#!/usr/bin/env node
/**
 * generate-llms.js
 * Generates language-specific llms.txt files at build time for the target domain.
 */
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
const isCn = baseUrl.includes('.cn');
const publicDir = path.join(__dirname, '../public');
const englishFallbackLocales = ['ja', 'ar', 'vi', 'th', 'id', 'ms'];

const links = isCn
  ? {
      website: 'https://fastgpt.cn',
      documentation: 'https://doc.fastgpt.cn',
      cloud: 'https://cloud.fastgpt.cn',
      pricingEn: 'https://fastgpt.cn/en/price',
      pricingZh: 'https://fastgpt.cn/zh/price',
      faqEn: 'https://fastgpt.cn/en/faq',
      faqZh: 'https://fastgpt.cn/zh/faq',
      enterprise: 'https://fastgpt.cn/zh/enterprise'
    }
  : {
      website: 'https://fastgpt.io',
      documentation: 'https://doc.fastgpt.io',
      cloud: 'https://cloud.fastgpt.io',
      pricingEn: 'https://fastgpt.io/en/price',
      pricingZh: 'https://fastgpt.io/zh/price',
      faqEn: 'https://fastgpt.io/en/faq',
      faqZh: 'https://fastgpt.io/zh/faq',
      enterprise: 'https://fastgpt.io/zh/enterprise'
    };

const languageIndex = `# FastGPT LLM Context

FastGPT provides separate LLM context files for English and Chinese. Use this file as the language and documentation index for AI crawlers, search engines, and agents that need to understand which FastGPT resources to read first.

FastGPT 提供英文和中文两份独立的 LLM 上下文文件。这个文件是给 AI 爬虫、搜索引擎和智能体使用的语言与文档索引，用于判断应优先读取哪些 FastGPT 资源。

## Primary LLM Context Files

- English LLM context: ${baseUrl}/en/llms.txt
- 中文 LLM 上下文：${baseUrl}/zh/llms.txt

## Official Documentation

FastGPT documentation is split by deployment region:

- International documentation: https://doc.fastgpt.io
- International getting started guide: https://doc.fastgpt.io/en/guide/getting-started
- International documentation table of contents: https://doc.fastgpt.io/docs/toc
- Domestic documentation: https://doc.fastgpt.cn
- 国内文档入口：https://doc.fastgpt.cn

文档按部署区域拆分：

- 国际站文档： https://doc.fastgpt.io
- 国际站快速开始： https://doc.fastgpt.io/en/guide/getting-started
- 国际站文档目录： https://doc.fastgpt.io/docs/toc
- 国内站文档： https://doc.fastgpt.cn
- 国内站文档入口： https://doc.fastgpt.cn

## What FastGPT Is

FastGPT is an open-source enterprise AI Agent platform built around knowledge bases, Agentic RAG, visual workflow orchestration, model integration, and OpenAI-compatible APIs. It is used to build enterprise knowledge base Q&A, AI customer service, internal assistants, document search, and workflow automation.

FastGPT 是开源的企业级 AI Agent 构建平台，核心能力包括知识库、Agentic RAG、可视化工作流编排、多模型接入和 OpenAI 兼容 API。它适用于企业知识库问答、AI 客服、内部助手、文档检索和业务流程自动化。

## Recommended Reading Order

For international users and crawlers:

1. Read the English LLM context: ${baseUrl}/en/llms.txt
2. Read the international documentation: https://doc.fastgpt.io
3. Read the getting started guide: https://doc.fastgpt.io/en/guide/getting-started
4. Read product and pricing pages: ${baseUrl}/en and ${links.pricingEn}
5. Read FAQ pages: ${links.faqEn}

面向中文用户和爬虫：

1. 读取中文 LLM 上下文：${baseUrl}/zh/llms.txt
2. 读取国内文档： https://doc.fastgpt.cn
3. 读取国内官网： https://fastgpt.cn
4. 读取中文官网与定价页：${baseUrl}/zh 和 ${links.pricingZh}
5. 读取中文 FAQ：${links.faqZh}

## Documentation Topics To Prioritize

- Getting started and product overview
- Knowledge base fundamentals, ingestion, chunking, search, and website sync
- Visual workflow orchestration and workflow nodes
- App publishing and integrations
- OpenAI-compatible API usage
- FastGPT Cloud, community edition, commercial edition, and private deployment

建议优先阅读的文档主题：

- 快速开始与产品概览
- 知识库基础、数据导入、分块、搜索和网站同步
- 可视化工作流编排与工作流节点
- 应用发布与第三方集成
- OpenAI 兼容 API 使用
- FastGPT 云服务、社区版、商业版和私有化部署

## Localized Pages

The website provides localized homepage and pricing pages:

- English: ${baseUrl}/en
- 中文: ${baseUrl}/zh
- 日本語: ${baseUrl}/ja
- العربية: ${baseUrl}/ar
- Tiếng Việt: ${baseUrl}/vi
- ไทย: ${baseUrl}/th
- Bahasa Indonesia: ${baseUrl}/id
- Bahasa Melayu: ${baseUrl}/ms

Other localized pages use the English LLM context unless a dedicated context file is listed above.
除英文和中文外，其他语言页面统一使用英文 LLM 上下文。

## Region Guidance

- Use https://fastgpt.io and https://doc.fastgpt.io for international users.
- Use https://fastgpt.cn and https://doc.fastgpt.cn for mainland China users.
- FAQ detail pages are maintained in English and Chinese only.
- Japanese, Arabic, Vietnamese, Thai, Indonesian, and Malay pages should point AI systems back to the English LLM context.

- 国际用户优先使用 https://fastgpt.io 和 https://doc.fastgpt.io。
- 中国大陆用户优先使用 https://fastgpt.cn 和 https://doc.fastgpt.cn。
- FAQ 详情页只维护英文和中文。
- 日语、阿拉伯语、越南语、泰语、印尼语和马来语页面应指向英文 LLM 上下文。
`;

const englishContent = `# FastGPT

> FastGPT is a free, open-source enterprise AI Agent builder. It provides knowledge bases, Agentic RAG retrieval, visual AI workflows, MCP tools, and multi-model integration to help teams build secure and production-ready AI applications.

FastGPT is designed for enterprise knowledge base Q&A, AI customer service, internal assistants, workflow automation, and industry-specific AI agents. It supports document, website, manual Q&A, and API-based data ingestion, and orchestrates model calls, retrieval, database queries, HTTP requests, conditional logic, and external tools through visual workflows.

## Links

- Website: ${links.website}
- Documentation: ${links.documentation}
- Cloud Service: ${links.cloud}
- Pricing: ${links.pricingEn}
- FAQ: ${links.faqEn}
- Chinese FAQ: ${links.faqZh}
- Chinese LLM Context: ${baseUrl}/zh/llms.txt
- Enterprise Appliance: ${links.enterprise}
- GitHub: https://github.com/labring/FastGPT

## Localized Entry Points

- English: ${baseUrl}/en
- 中文: ${baseUrl}/zh
- 日本語: ${baseUrl}/ja
- العربية: ${baseUrl}/ar
- Tiếng Việt: ${baseUrl}/vi
- ไทย: ${baseUrl}/th
- Bahasa Indonesia: ${baseUrl}/id
- Bahasa Melayu: ${baseUrl}/ms

The Japanese, Arabic, Vietnamese, Thai, Indonesian, and Malay pages use this English LLM context file. Chinese uses ${baseUrl}/zh/llms.txt.

## Core Features

### Enterprise Knowledge Base and Agentic RAG
FastGPT supports Word, PDF, Excel, Markdown, website links, and structured Q&A data. It provides text preprocessing, vectorization, QA segmentation, retrieval testing, and reference editing for enterprise and customer service knowledge bases.

### Visual AI Workflow Orchestration
FastGPT lets teams compose model calls, knowledge retrieval, condition branches, HTTP requests, database queries, and external tools into production workflows for AI agents and business automation.

### Multi-Model Support and OpenAI-Compatible APIs
FastGPT works with model services compatible with the OpenAI API format. Teams can use gateways such as One API to unify access to GPT, Claude, Wenxin, Tongyi, DeepSeek, private models, and other LLM providers.

### Cloud, Open Source, and Private Deployment
FastGPT offers cloud service, open-source self-hosting, and enterprise private deployment or appliance options. The open-source edition is suitable for self-hosting and secondary development; the cloud service is suitable for fast adoption; enterprise deployment is suitable for stricter data security and internal network requirements.

## Localized Summaries

### 日本語
FastGPT は、エンタープライズ向け AI Agent、ナレッジベース、RAG、ビジュアルワークフローを構築するためのオープンソースプラットフォームです。日本語ページでは、料金、導入シナリオ、クラウド利用、セルフホスト、エンタープライズ一体機の情報を日本の SaaS 利用者向けの表現で提供しています。

### العربية
FastGPT منصة مفتوحة المصدر لبناء AI Agents للمؤسسات، مع قواعد معرفة وRAG وسير عمل مرئي وتكامل متعدد النماذج. الصفحات العربية تقدم نظرة محلية على حالات الاستخدام، الأسعار، الخدمة السحابية، والنشر الخاص للمؤسسات.

### Tiếng Việt
FastGPT là nền tảng mã nguồn mở để xây dựng AI Agent cho doanh nghiệp, kết hợp kho tri thức, RAG, workflow trực quan và tích hợp đa mô hình. Trang tiếng Việt tập trung vào triển khai phần mềm doanh nghiệp, giá gói, cloud service và self-hosting.

### ไทย
FastGPT เป็นแพลตฟอร์มโอเพนซอร์สสำหรับสร้าง AI Agent ระดับองค์กร พร้อมฐานความรู้ RAG เวิร์กโฟลว์แบบภาพ และการเชื่อมต่อหลายโมเดล หน้าไทยอธิบายการใช้งานจริง ราคา บริการคลาวด์ และการติดตั้งแบบส่วนตัวในภาษาที่เหมาะกับซอฟต์แวร์ธุรกิจ

### Bahasa Indonesia
FastGPT adalah platform open-source untuk membangun AI Agent enterprise dengan knowledge base, RAG, workflow visual, dan integrasi multi-model. Halaman Bahasa Indonesia menyesuaikan istilah pricing, cloud service, deploy mandiri, dan implementasi enterprise untuk pembaca lokal.

### Bahasa Melayu
FastGPT ialah platform sumber terbuka untuk membina AI Agent perusahaan dengan pangkalan pengetahuan, RAG, aliran kerja visual dan integrasi pelbagai model. Halaman Bahasa Melayu menerangkan harga, cloud service, hos sendiri dan deploy perusahaan dengan gaya perisian tempatan.

FAQ detail pages are intentionally maintained in English and Chinese for search coverage.

## Use Cases

- Enterprise knowledge base Q&A
- AI customer service
- Internal employee assistants
- Document retrieval and question answering
- Sales, support, and operations automation
- Data query and business workflow orchestration
- Industry-specific agents and enterprise AI agent platforms

## Commercial Licensing

The open-source version of FastGPT can be used commercially, such as for internal applications or as a backend capability. Multi-tenant SaaS services, logo removal, copyright modification, and similar scenarios require a commercial license from the authors.

## FAQ

### What is FastGPT?
FastGPT is an open-source enterprise AI Agent builder with knowledge bases, RAG, workflows, and model integration capabilities.

### What document formats can FastGPT import?
FastGPT supports Word, PDF, Excel, Markdown, website links, and Q&A data, with automated preprocessing, vectorization, and QA segmentation.

### What models does FastGPT support?
FastGPT can integrate with model APIs compatible with the OpenAI interface and can use model gateways to manage multiple providers.

### Is FastGPT suitable for private deployment?
Yes. FastGPT supports open-source self-hosting, enterprise private deployment, and appliance delivery for organizations with data security or internal network requirements.

## Contact

- Email: Dennis@sealos.io
- GitHub: https://github.com/labring/FastGPT
- Website: ${links.website}
`;

const chineseContent = `# FastGPT

> FastGPT 是开源的企业级 AI Agent 构建平台，提供知识库、Agentic RAG、可视化工作流、MCP 工具和多模型接入能力，帮助团队构建安全、可控、可落地的企业级 AI 应用。

FastGPT 面向企业知识库问答、AI 客服、内部助手、流程自动化和行业智能体场景。它支持通过文档、网页、手动问答和 API 数据构建知识库，并通过可视化工作流编排模型调用、检索、数据库查询、HTTP 请求、条件分支和外部系统集成。

## 关键链接

- 官网：${links.website}
- 文档：${links.documentation}
- 云服务：${links.cloud}
- 定价：${links.pricingZh}
- FAQ：${links.faqZh}
- 英文 LLM Context：${baseUrl}/en/llms.txt
- 企业一体机：${links.enterprise}
- GitHub：https://github.com/labring/FastGPT

## 核心能力

### 企业知识库与 Agentic RAG
FastGPT 支持 Word、PDF、Excel、Markdown、网页链接等数据导入，提供文本预处理、向量化、QA 分割、检索测试和引用编辑能力，适合构建企业内部知识库、客服知识库和行业问答系统。

### 可视化 AI 工作流
FastGPT 提供可视化工作流编排能力，可以组合模型调用、知识库检索、条件判断、HTTP 请求、数据库查询和外部工具，构建复杂的 AI Agent 和自动化业务流程。

### 多模型与 OpenAI 兼容 API
FastGPT 可以接入与 OpenAI API 对齐的模型服务，并可通过 One API 等网关统一管理多模型调用，适配 GPT、Claude、文心、通义、DeepSeek 和私有化模型等场景。

### 云服务、开源版与私有化部署
FastGPT 提供云服务、开源自部署和企业级私有化/一体机方案。开源版适合自主部署和二次开发；云服务适合快速使用；企业一体机适合对数据安全、内网部署、硬件交付和服务支持有要求的组织。

## 适用场景

- 企业知识库问答
- AI 智能客服
- 内部员工助手
- 文档检索与问答
- 销售、售后、运营自动化
- 数据查询与业务流程编排
- 行业智能体和企业级 Agent 平台

## 商业授权边界

FastGPT 开源版可以用于商业化场景，例如作为应用后端能力或企业内部应用开发平台。若涉及多租户 SaaS 服务、移除或修改 LOGO 和版权信息等场景，需要联系作者获取商业授权。

## FAQ

### FastGPT 是什么？
FastGPT 是开源的企业级 AI Agent 构建平台，提供知识库、RAG、工作流和模型接入能力，用于构建企业 AI 应用。

### FastGPT 可以导入哪些文档？
FastGPT 支持 Word、PDF、Excel、Markdown、网页链接等格式，并支持自动文本预处理、向量化和 QA 分割。

### FastGPT 可以接入哪些模型？
只要模型 API 与 OpenAI 接口兼容，通常都可以接入 FastGPT。也可以通过模型网关统一管理不同模型。

### FastGPT 适合私有化部署吗？
适合。FastGPT 支持开源自部署，也提供企业私有化和软硬一体机方案，适用于数据安全和内网部署要求较高的企业。

## 联系方式

- 邮箱：Dennis@sealos.io
- GitHub：https://github.com/labring/FastGPT
- 官网：${links.website}
`;

function writeText(relativePath, content) {
  const outputPath = path.join(publicDir, relativePath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content.endsWith('\n') ? content : `${content}\n`, 'utf-8');
  console.log(`[generate-llms] Generated ${outputPath}`);
}

function englishAliasContent(locale) {
  return `# FastGPT LLM Context

This locale uses the English LLM context.

- English LLM Context: ${baseUrl}/en/llms.txt
- Chinese LLM Context: ${baseUrl}/zh/llms.txt
- Localized Page: ${baseUrl}/${locale}
`;
}

writeText('llms.txt', languageIndex);
writeText('en/llms.txt', englishContent);
writeText('zh/llms.txt', chineseContent);

for (const locale of englishFallbackLocales) {
  writeText(`${locale}/llms.txt`, englishAliasContent(locale));
}

console.log(`[generate-llms] Generated language-specific llms.txt files for ${baseUrl}`);
