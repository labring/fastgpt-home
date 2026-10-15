---
title: 引用预算 50 万–1000 万的对话模型配 embedding-3 的分段与引用口径
slug: /zh/combo/combo-q1m-chatglm01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是对话模型可接收的引用内容合计token预算，限定了单次对话中可注入的参考资料总token上限。本次选型的对话模型引用预算处于500,000–10,000,000 tokens区间，可支持长文档、多章节内容的完整引用，适配需要大量上下文支撑的知识库问答场景，减少因上下"
language: zh
axis_model_tier: "引用预算 50 万–1000 万"
covered_models: "glm-5.3-flash、glm-5.3、glm-5.2、glm-4-long、deepseek-flash、deepseek-v4-flash、deepseek-v4-pro、doubao-seed-evolving、gemini-3.8-flash、gemini-3.7-flash、gemini-3.6-flash、gemini-3.5-flash、gemini-3.1-pro-preview-customtools、gemini-3.1-flash-lite、gemini-3.5-flash-lite、gemini-3.1-pro-preview、gemini-3.1-pro、gemini-3-flash-preview、gemini-3-flash、gemini-2.5-pro、gemini-2.5-flash、gemini-2.5-flash-lite、grok-4.5、grok-4.6、grok-4.3、grok-4.20-multi-agent-0309、grok-4.20-0309-reasoning、grok-4.20-0309-non-reasoning、hy4-preview、MiniMax-M3、MiniMax-M1、kimi-k3、gpt-6-astra、gpt-5.6、gpt-5.6-sol、gpt-5.6-terra、gpt-5.6-luna、gpt-5.5、gpt-5.5-pro、gpt-5.4、gpt-5.4-pro、gpt-4.1、gpt-4.1-mini、gpt-4.1-nano、qwen3.8-max、qwen3.8-flash、qwen3.7-max、qwen3.7-plus、qwen3.7-flash、qwen3.6-plus、qwen3.6-flash、qwen3.5-flash、qwen3.5-plus、qwen-plus、qwen-turbo、qwen-flash、qwen3-coder-plus、qwen3-coder-flash、qwen-long"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 50 万–1000 万的对话模型配 embedding-3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是对话模型可接收的引用内容合计token预算，限定了单次对话中可注入的参考资料总token上限。本次选型的对话模型引用预算处于500,000–10,000,000 tokens区间，可支持长文档、多章节内容的完整引用，适配需要大量上下文支撑的知识库问答场景，减少因上下文截断导致的信息缺失，保证回答的连贯性与完整性。

## 配 ChatGLM 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配embedding-3模型的默认单段token长度，符合平台默认配置逻辑 |
| `maxToken` | 8000 | 适配embedding-3模型支持的单段最大token上限，最大化单段语义完整性 |
| `quoteMaxToken` | 500000–10000000 | 匹配当前选型对话模型的引用预算区间，适配模型上下文能力 |
| `chunkSize` | 512 或 8000 | 平衡单段语义完整性与可容纳的引用段数，匹配向量模型的token限制 |
| 重叠长度 | 64–128 | 避免分块断裂关键语义，保证相邻分块的上下文连贯性 |
| 单次搜索上限 | 按需调整 | 结合引用预算与分块长度，控制单次召回的总token不超限制 |

## 这两者互相约束的地方
当引用预算与向量模型参数结合时，会形成明确的约束关系。按默认每段512 tokens计算，一轮引用最多可容纳976–19,531段；若将每段调整至向量模型允许的8000 tokens上限，仅可容纳约62段。单段长度越长，单段承载的语义越完整，一轮可放置的引用段数越少；单段长度越短，可容纳的段数越多，单段上下文的完整性越弱。若更换向量模型，已创建的知识库索引需要重新构建，因为向量维度与向量模型绑定，原有索引无法适配新模型的向量生成逻辑。

## 容易做错的三处
- 检索召回的总token超出对话模型的引用预算，导致回答被异常截断。未根据`quoteMaxToken`和分块长度调整单次搜索上限，导致召回内容合计token超过限制。
- 知识库分块后出现关键语义断裂。分块长度设置与向量模型`maxToken`不匹配，或重叠长度设置过小，导致相邻分块无法衔接核心内容。
- 更换向量模型后，知识库搜索结果异常。未重新构建索引，新模型的向量维度与原有索引不匹配。

## 怎么确认配好了
- 查看对话模型的配置参数，确认引用预算参数处于指定区间
- 检查向量模型的配置，确认单段长度参数匹配对应模型的官方限制
- 测试长文档上传后的分块展示，确认分块逻辑符合预设配置
- 发起检索请求，核对召回内容未被异常截断
