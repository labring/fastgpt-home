#!/usr/bin/env node
/**
 * generate-llms.js
 * Generates public/llms.txt at build time for the target domain.
 */
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
const isCn = baseUrl.includes('.cn');

const links = isCn
  ? {
      website: 'https://fastgpt.cn',
      documentation: 'https://doc.fastgpt.cn',
      cloud: 'https://cloud.fastgpt.cn',
      pricing: 'https://fastgpt.cn/zh/price',
      faq: 'https://fastgpt.cn/zh/faq',
      enterprise: 'https://fastgpt.cn/zh/enterprise'
    }
  : {
      website: 'https://fastgpt.io',
      documentation: 'https://doc.fastgpt.io',
      cloud: 'https://cloud.fastgpt.io',
      pricing: 'https://fastgpt.io/en/price',
      faq: 'https://fastgpt.io/en/faq',
      enterprise: 'https://fastgpt.io/zh/enterprise'
    };

const content = isCn
  ? `# FastGPT

> FastGPT 是开源的企业级 AI Agent 构建平台，提供知识库、Agentic RAG、可视化工作流、MCP 工具和多模型接入能力，帮助团队构建安全、可控、可落地的企业级 AI 应用。

FastGPT 面向企业知识库问答、AI 客服、内部助手、流程自动化和行业智能体场景。它支持通过文档、网页、手动问答和 API 数据构建知识库，并通过可视化工作流编排模型调用、检索、数据库查询、HTTP 请求、条件分支和外部系统集成。

## 关键链接

- 官网：${links.website}
- 文档：${links.documentation}
- 云服务：${links.cloud}
- 定价：${links.pricing}
- FAQ：${links.faq}
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
`
  : `# FastGPT

> FastGPT is a free, open-source enterprise AI Agent builder. It provides knowledge bases, Agentic RAG retrieval, visual AI workflows, MCP tools, and multi-model integration to help teams build secure and production-ready AI applications.

FastGPT is designed for enterprise knowledge base Q&A, AI customer service, internal assistants, workflow automation, and industry-specific AI agents. It supports document, website, manual Q&A, and API-based data ingestion, and orchestrates model calls, retrieval, database queries, HTTP requests, conditional logic, and external tools through visual workflows.

## Links

- Website: ${links.website}
- Documentation: ${links.documentation}
- Cloud Service: ${links.cloud}
- Pricing: ${links.pricing}
- FAQ: ${links.faq}
- Enterprise Appliance: ${links.enterprise}
- GitHub: https://github.com/labring/FastGPT

## Core Features

### Enterprise Knowledge Base and Agentic RAG
FastGPT supports Word, PDF, Excel, Markdown, website links, and structured Q&A data. It provides text preprocessing, vectorization, QA segmentation, retrieval testing, and reference editing for enterprise and customer service knowledge bases.

### Visual AI Workflow Orchestration
FastGPT lets teams compose model calls, knowledge retrieval, condition branches, HTTP requests, database queries, and external tools into production workflows for AI agents and business automation.

### Multi-Model Support and OpenAI-Compatible APIs
FastGPT works with model services compatible with the OpenAI API format. Teams can use gateways such as One API to unify access to GPT, Claude, Wenxin, Tongyi, DeepSeek, private models, and other LLM providers.

### Cloud, Open Source, and Private Deployment
FastGPT offers cloud service, open-source self-hosting, and enterprise private deployment or appliance options. The open-source edition is suitable for self-hosting and secondary development; the cloud service is suitable for fast adoption; enterprise deployment is suitable for stricter data security and internal network requirements.

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

const outputPath = path.join(__dirname, '../public/llms.txt');
fs.writeFileSync(outputPath, content, 'utf-8');
console.log(`[generate-llms] Generated ${outputPath} for ${baseUrl}`);
