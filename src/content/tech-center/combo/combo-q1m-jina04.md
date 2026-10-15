---
title: 引用预算 50 万–1000 万的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径
slug: /zh/combo/combo-q1m-jina04
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken是单轮对话中可引用的知识库内容的总token预算，本档对话模型的预算区间覆盖50万至1000万token。该预算量级可支撑中大型知识库应用的上下文需求，能够整合多段知识库内容生成回答，无需因预算限制快速截断引用内容，适配多轮交互、复杂查询的场景，为模型提供充足的上下文支撑空"
language: zh
axis_model_tier: "引用预算 50 万–1000 万"
covered_models: "glm-5.3-flash、glm-5.3、glm-5.2、glm-4-long、deepseek-flash、deepseek-v4-flash、deepseek-v4-pro、doubao-seed-evolving、gemini-3.8-flash、gemini-3.7-flash、gemini-3.6-flash、gemini-3.5-flash、gemini-3.1-pro-preview-customtools、gemini-3.1-flash-lite、gemini-3.5-flash-lite、gemini-3.1-pro-preview、gemini-3.1-pro、gemini-3-flash-preview、gemini-3-flash、gemini-2.5-pro、gemini-2.5-flash、gemini-2.5-flash-lite、grok-4.5、grok-4.6、grok-4.3、grok-4.20-multi-agent-0309、grok-4.20-0309-reasoning、grok-4.20-0309-non-reasoning、hy4-preview、MiniMax-M3、MiniMax-M1、kimi-k3、gpt-6-astra、gpt-5.6、gpt-5.6-sol、gpt-5.6-terra、gpt-5.6-luna、gpt-5.5、gpt-5.5-pro、gpt-5.4、gpt-5.4-pro、gpt-4.1、gpt-4.1-mini、gpt-4.1-nano、qwen3.8-max、qwen3.8-flash、qwen3.7-max、qwen3.7-plus、qwen3.7-flash、qwen3.6-plus、qwen3.6-flash、qwen3.5-flash、qwen3.5-plus、qwen-plus、qwen-turbo、qwen-flash、qwen3-coder-plus、qwen3-coder-flash、qwen-long"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 50 万–1000 万的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken是单轮对话中可引用的知识库内容的总token预算，本档对话模型的预算区间覆盖50万至1000万token。该预算量级可支撑中大型知识库应用的上下文需求，能够整合多段知识库内容生成回答，无需因预算限制快速截断引用内容，适配多轮交互、复杂查询的场景，为模型提供充足的上下文支撑空间。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配向量模型默认的单段分词长度，无需额外调整即可适配基础分块逻辑 |
| `maxToken` | 32000 | 匹配向量模型支持的单段最大token上限，可用于需要完整长文本语义的分块场景 |
| `quoteMaxToken` | 500000–10000000 | 匹配本档对话模型的引用预算区间，确保引用内容总token不超出模型限制 |
| `chunkSize` | 512 或 32000 | 可根据场景选择，对应向量模型默认或最大单段长度，平衡语义完整性与引用段数 |
| 分块重叠长度 | 50–100 tokens | 避免分块截断关键语义，保证相邻分块间的上下文连贯性 |
| 单次搜索上限 | 自定义区间 | 控制单次召回的知识库段数，避免总token超出对话模型的引用预算 |

## 这两者互相约束的地方
本组合的引用段数由分块长度与引用预算共同约束。按默认每段512 tokens计算，一轮引用最多可放下976–19,531段；若将每段调整至向量模型允许的32000 tokens上限，则仅可放下约15段。分块长度越长，单段承载的语义越完整，但单轮可容纳的引用段数越少；分块长度越短，单轮可容纳的段数越多，但单段上下文的完整性越弱。更换向量模型后，已创建的知识库索引需要重新构建，因为向量维度与向量模型绑定，旧索引无法适配新模型的向量输出格式。

## 容易做错的三处
- 现象：单轮回答中引用内容被意外截断。原因：未正确设置`quoteMaxToken`为对应区间，或分块总token超出对话模型的引用预算。
- 现象：知识库检索召回的段数远低于预期。原因：分块长度设置过大，且单次搜索上限未同步调整，导致单段token占用过高，无法召回足够数量的段。
- 现象：更换向量模型后原有知识库无法正常检索。原因：未重新构建知识库索引，向量维度与新模型不匹配。

## 怎么确认配好了
- 查看对话模型的配置面板，确认`quoteMaxToken`处于50万–1000万token区间。
- 检查向量模型的配置参数，确认`defaultToken`与`maxToken`匹配对应取值。
- 测试创建新的知识库分块，验证分块长度与向量模型的单段长度要求一致。
- 发起一次包含多段知识库内容的测试查询，确认引用内容未被无故截断。
