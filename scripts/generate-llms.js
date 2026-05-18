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
      pricingZhHant: 'https://fastgpt.cn/zh-hant/price',
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
      pricingZhHant: 'https://fastgpt.io/zh-hant/price',
      pricingZh: 'https://fastgpt.io/zh/price',
      faqEn: 'https://fastgpt.io/en/faq',
      faqZh: 'https://fastgpt.io/zh/faq',
      enterprise: 'https://fastgpt.io/zh/enterprise'
    };

const englishContent = `# FastGPT

> FastGPT is a free, open-source enterprise AI Agent builder. It provides knowledge bases, Agentic RAG retrieval, visual AI workflows, MCP tools, and multi-model integration to help teams build secure and production-ready AI applications.

FastGPT is designed for enterprise knowledge base Q&A, AI customer service, internal assistants, workflow automation, and industry-specific AI agents. It supports document, website, manual Q&A, and API-based data ingestion, and orchestrates model calls, retrieval, database queries, HTTP requests, conditional logic, and external tools through visual workflows.

## Links

- Website: ${links.website}
- Documentation: ${links.documentation}
- Cloud Service: ${links.cloud}
- Pricing: ${links.pricingEn}
- FAQ: ${links.faqEn}
- Simplified Chinese FAQ: ${links.faqZh}
- Simplified Chinese LLM Context: ${baseUrl}/zh/llms.txt
- Traditional Chinese LLM Context: ${baseUrl}/zh-hant/llms.txt
- Enterprise Appliance: ${links.enterprise}
- GitHub: https://github.com/labring/FastGPT

## Localized Entry Points

- English: ${baseUrl}/en
- 简体中文: ${baseUrl}/zh
- 繁體中文: ${baseUrl}/zh-hant
- 日本語: ${baseUrl}/ja
- العربية: ${baseUrl}/ar
- Tiếng Việt: ${baseUrl}/vi
- ไทย: ${baseUrl}/th
- Bahasa Indonesia: ${baseUrl}/id
- Bahasa Melayu: ${baseUrl}/ms

The Japanese, Arabic, Vietnamese, Thai, Indonesian, and Malay pages use this English LLM context file. Chinese uses ${baseUrl}/zh/llms.txt, and Traditional Chinese uses ${baseUrl}/zh-hant/llms.txt.

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

### 繁體中文
FastGPT 是開源的企業級 AI Agent 構建平台，結合知識庫、Agentic RAG、可視化工作流與多模型接入。繁體中文頁面面向使用繁體中文的企業軟體採購者，提供產品能力、雲服務、開源自部署、私有化部署與價格方案說明。

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
- 国内文档：https://doc.fastgpt.cn
- 国际文档：https://doc.fastgpt.io
- 云服务：${links.cloud}
- 定价：${links.pricingZh}
- FAQ：${links.faqZh}
- 繁体中文 LLM Context：${baseUrl}/zh-hant/llms.txt
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

const traditionalChineseContent = `# FastGPT

> FastGPT 是開源的企業級 AI Agent 構建平台，提供知識庫、Agentic RAG、可視化工作流、MCP 工具與多模型接入能力，協助團隊構建安全、可控、可落地的企業級 AI 應用。

FastGPT 面向企業知識庫問答、AI 客服、內部助手、流程自動化與產業智能體場景。它支援透過文件、網頁、手動問答與 API 資料構建知識庫，並透過可視化工作流編排模型呼叫、檢索、資料庫查詢、HTTP 請求、條件分支與外部系統整合。

## 關鍵連結

- 官網：${links.website}
- 國內文件：https://doc.fastgpt.cn
- 國際文件：https://doc.fastgpt.io
- 雲服務：${links.cloud}
- 定價：${links.pricingZhHant}
- FAQ：${links.faqZh}
- 簡體中文 LLM Context：${baseUrl}/zh/llms.txt
- 英文 LLM Context：${baseUrl}/en/llms.txt
- 企業一體機：${links.enterprise}
- GitHub：https://github.com/labring/FastGPT

## 核心能力

### 企業知識庫與 Agentic RAG
FastGPT 支援 Word、PDF、Excel、Markdown、網頁連結等資料匯入，提供文字預處理、向量化、QA 分割、檢索測試與引用編輯能力，適合構建企業內部知識庫、客服知識庫與產業問答系統。

### 可視化 AI 工作流
FastGPT 提供可視化工作流編排能力，可以組合模型呼叫、知識庫檢索、條件判斷、HTTP 請求、資料庫查詢與外部工具，構建複雜的 AI Agent 和自動化業務流程。

### 多模型與 OpenAI 相容 API
FastGPT 可以接入與 OpenAI API 對齊的模型服務，並可透過 One API 等閘道統一管理多模型呼叫，適配 GPT、Claude、文心、通義、DeepSeek 與私有化模型等場景。

### 雲服務、開源版與私有化部署
FastGPT 提供雲服務、開源自部署與企業級私有化/一體機方案。開源版適合自主部署與二次開發；雲服務適合快速使用；企業一體機適合對資料安全、內網部署、硬體交付與服務支援有要求的組織。

## 適用場景

- 企業知識庫問答
- AI 智能客服
- 內部員工助手
- 文件檢索與問答
- 銷售、售後、營運自動化
- 資料查詢與業務流程編排
- 產業智能體和企業級 Agent 平台

## 商業授權邊界

FastGPT 開源版可以用於商業化場景，例如作為應用後端能力或企業內部應用開發平台。若涉及多租戶 SaaS 服務、移除或修改 LOGO 與版權資訊等場景，需要聯繫作者取得商業授權。

## FAQ

### FastGPT 是什麼？
FastGPT 是開源的企業級 AI Agent 構建平台，提供知識庫、RAG、工作流與模型接入能力，用於構建企業 AI 應用。

### FastGPT 可以匯入哪些文件？
FastGPT 支援 Word、PDF、Excel、Markdown、網頁連結等格式，並支援自動文字預處理、向量化與 QA 分割。

### FastGPT 可以接入哪些模型？
只要模型 API 與 OpenAI 介面相容，通常都可以接入 FastGPT。也可以透過模型閘道統一管理不同模型。

### FastGPT 適合私有化部署嗎？
適合。FastGPT 支援開源自部署，也提供企業私有化與軟硬一體機方案，適用於資料安全與內網部署要求較高的企業。

FAQ 詳細頁目前僅維護英文與簡體中文版本；繁體中文定價頁內含本地化價格 FAQ。

## 聯繫方式

- 郵箱：Dennis@sealos.io
- GitHub：https://github.com/labring/FastGPT
- 官網：${links.website}
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
- Simplified Chinese LLM Context: ${baseUrl}/zh/llms.txt
- Traditional Chinese LLM Context: ${baseUrl}/zh-hant/llms.txt
- Localized Page: ${baseUrl}/${locale}
`;
}

writeText('llms.txt', englishContent);
writeText('en/llms.txt', englishContent);
writeText('zh-hant/llms.txt', traditionalChineseContent);
writeText('zh/llms.txt', chineseContent);

for (const locale of englishFallbackLocales) {
  writeText(`${locale}/llms.txt`, englishAliasContent(locale));
}

console.log(`[generate-llms] Generated language-specific llms.txt files for ${baseUrl}`);
