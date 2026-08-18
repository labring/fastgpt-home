---
name: faq-translate
description: This skill should be used when the user asks to "翻译faq", "translate faq", "中文翻译", "translate to Chinese", "翻译成中文", mentions translating entries in faq.ts, or asks to add Chinese content to the FAQ data file. Provides structured guidance for translating English FAQ entries to Chinese for the fastgpt-home project.
version: 1.0.0
---

# FAQ 中文翻译 Skill

针对 `src/faq.ts` 文件的 English → 简体中文 翻译指南。

## 文件结构

每个 FAQ 条目包含以下字段：

```ts
"entry-key": {
  "Category": string,       // 分类名称
  "Question": string,       // 问题标题
  "Answers": string,        // 详细答案（多段落，\n 分隔）
  "Title": string,          // SEO 页面标题（含 "-Fastgpt" 后缀）
  "Description": string,    // SEO 描述（约 160 字符截断）
  "Keywords": string,       // 关键词（逗号分隔）
  "URL": string,            // 完整 URL（勿改动）
  "Url": string             // 相对路径（勿改动）
}
```

## 翻译规则

### 必须翻译的字段
- `Category` — 翻译分类名
- `Question` — 翻译问题
- `Answers` — 翻译答案，保留 `\n\n` 段落结构
- `Title` — 翻译标题，**保留** `-Fastgpt` 后缀
- `Description` — 翻译描述，控制在 160 字符以内
- `Keywords` — 翻译关键词，保持逗号分隔格式

### 禁止修改的字段
- `URL` — 保持原始英文 URL 不变
- `Url` — 保持原始路径不变

### 术语对照表（统一用词）

| 英文 | 中文 |
|------|------|
| AI Platform | AI 平台 |
| Knowledge Base | 知识库 |
| RAG | RAG（检索增强生成） |
| Large Language Model / LLM | 大语言模型 |
| Natural Language Processing | 自然语言处理 |
| Machine Learning | 机器学习 |
| Chatbot / Virtual Agent | 智能客服 / 虚拟助手 |
| Workflow | 工作流 |
| API Integration | API 集成 |
| Vector Search | 向量搜索 |
| Smart Assistant | 智能助手 |
| Task Automation | 任务自动化 |
| Enterprise AI | 企业 AI |
| Open Source AI | 开源 AI |
| Document AI | 文档 AI |
| FastGPT | FastGPT（不翻译） |

### Category 翻译对照

| 英文 | 中文 |
|------|------|
| Use Cases & Best Practices | 使用场景与最佳实践 |
| Development Challenges | 开发挑战 |
| Content & Creativity | 内容与创意 |
| Knowledge Management | 知识管理 |
| Project Management | 项目管理 |
| Education & Training | 教育与培训 |
| Translation & Localization | 翻译与本地化 |
| Marketing | 市场营销 |

## 翻译流程

1. **识别条目** — 确认要翻译的 key（如 `"Can-AI-intelligent-customer-service"`）
2. **逐字段翻译** — 按规则翻译各字段，跳过 URL/Url
3. **校验长度** — Description 不超过 160 字符
4. **保持格式** — 保留原有 `\n\n` 段落、引号、标点风格
5. **术语一致** — 对照术语表统一专业词汇

## 输出格式

直接输出可替换的 TypeScript 对象片段：

```ts
"entry-key": {
  "Category": "使用场景与最佳实践",
  "Question": "翻译后的问题？",
  "Answers": "第一段翻译内容。\n\n第二段翻译内容。\n\n第三段翻译内容。",
  "Title": "翻译后的标题-Fastgpt",
  "Description": "翻译后的描述，不超过160字符",
  "Keywords": "关键词1, 关键词2, 关键词3",
  "URL": "https://fastgpt.io/en/faq/original-url",
  "Url": "/faq/original-url.html"
},
```

## 示例

**原文：**
```ts
"Can-AI-intelligent-customer-service": {
  "Category": "Use Cases & Best Practices",
  "Question": "Can AI intelligent customer service platforms really reduce labor costs?",
  "Answers": "Yes, AI intelligent customer service platforms can significantly reduce labor costs...",
  "Title": "Can AI intelligent customer service platforms really reduce labor costs?-Fastgpt",
  "Description": "Yes, AI intelligent customer service platforms can significantly reduce labor costs...",
  "Keywords": "GPT Integration, AI Knowledge Management, Smart Assistant",
  "URL": "https://fastgpt.io/en/faq/Can-AI-intelligent-customer-service",
  "Url": "/faq/Can-AI-intelligent-customer-service.html"
}
```

**译文：**
```ts
"Can-AI-intelligent-customer-service": {
  "Category": "使用场景与最佳实践",
  "Question": "AI 智能客服平台真的能降低人力成本吗？",
  "Answers": "是的，AI 智能客服平台能够显著降低人力成本。其主要途径是通过自动化响应大量重复性客户咨询来实现。\n\n这些系统利用自然语言处理和机器学习技术，全天候处理常见问题，如订单状态查询、基础故障排查和基本政策咨询，从而直接减少对一线人工坐席的需求。\n\n有效实施后，AI 聊天机器人和虚拟助手可承接大量初始客户交互，将工单从人工坐席分流。这使人工员工能够专注于需要同理心和批判性思维的复杂、高价值交互，从而降低运营成本，同时保持服务水平。",
  "Title": "AI 智能客服平台真的能降低人力成本吗？-Fastgpt",
  "Description": "是的，AI 智能客服平台能够显著降低人力成本，主要通过自动化响应大量重复性客户咨询实现，支持全天候处理常见问题。",
  "Keywords": "GPT 集成, AI 知识管理, 智能助手, AI 平台, 任务自动化",
  "URL": "https://fastgpt.io/en/faq/Can-AI-intelligent-customer-service",
  "Url": "/faq/Can-AI-intelligent-customer-service.html"
}
```
