---
title: 引用预算 50 万–1000 万的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径
slug: /zh/combo/combo-q1m-qwen01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是知识库应用中引用内容的累计token预算，限定检索后返回的所有参考内容的总token数量。本档对话模型的500000–10000000 tokens预算区间，能够支撑较大规模的上下文引用需求，适配长文档知识库、多轮对话等场景，无需频繁截断引用内容，保障回答的上下文连"
language: zh
axis_model_tier: "引用预算 50 万–1000 万"
covered_models: "glm-5.3-flash、glm-5.3、glm-5.2、glm-4-long、deepseek-flash、deepseek-v4-flash、deepseek-v4-pro、doubao-seed-evolving、gemini-3.8-flash、gemini-3.7-flash、gemini-3.6-flash、gemini-3.5-flash、gemini-3.1-pro-preview-customtools、gemini-3.1-flash-lite、gemini-3.5-flash-lite、gemini-3.1-pro-preview、gemini-3.1-pro、gemini-3-flash-preview、gemini-3-flash、gemini-2.5-pro、gemini-2.5-flash、gemini-2.5-flash-lite、grok-4.5、grok-4.6、grok-4.3、grok-4.20-multi-agent-0309、grok-4.20-0309-reasoning、grok-4.20-0309-non-reasoning、hy4-preview、MiniMax-M3、MiniMax-M1、kimi-k3、gpt-6-astra、gpt-5.6、gpt-5.6-sol、gpt-5.6-terra、gpt-5.6-luna、gpt-5.5、gpt-5.5-pro、gpt-5.4、gpt-5.4-pro、gpt-4.1、gpt-4.1-mini、gpt-4.1-nano、qwen3.8-max、qwen3.8-flash、qwen3.7-max、qwen3.7-plus、qwen3.7-flash、qwen3.6-plus、qwen3.6-flash、qwen3.5-flash、qwen3.5-plus、qwen-plus、qwen-turbo、qwen-flash、qwen3-coder-plus、qwen3-coder-flash、qwen-long"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 50 万–1000 万的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是知识库应用中引用内容的累计token预算，限定检索后返回的所有参考内容的总token数量。本档对话模型的500000–10000000 tokens预算区间，能够支撑较大规模的上下文引用需求，适配长文档知识库、多轮对话等场景，无需频繁截断引用内容，保障回答的上下文连贯性与信息完整性，可覆盖多数通用知识库的应用场景。

## 配 Qwen 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配向量模型默认分段长度，简化配置流程，适配多数通用知识库场景 |
| `maxToken` | 8000 | 遵循向量模型单段最大输入限制，保障单段语义完整性，避免截断关键信息 |
| `quoteMaxToken` | 500000–10000000 tokens | 匹配本档对话模型的引用预算区间，适配不同规模的知识库引用需求 |
| `chunkSize` | 512 或 8000 | 可根据场景灵活选择，512适配细粒度检索，8000适配长文本语义连贯需求 |
| 重叠长度 | 10%-20%的分块长度 | 避免分块截断关键语义单元，提升检索召回的完整性 |
| 单次搜索上限 | 对应引用预算的分段数区间 | 平衡检索召回数量与引用token预算，防止超预算 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可放下约976–19,531段；若将每段调整至向量模型允许的8000 tokens上限，则仅可放下约62段。分块长度同时影响检索精度与引用容量：每段越长，单段语义越完整，一轮能承载的段数越少；每段越短，段数越多，单段上下文越碎，可能影响检索召回的精准性。此外，向量模型与索引维度绑定，更换向量模型后，已构建的知识库索引无法复用，需重新生成向量数据以匹配新模型的编码逻辑。

## 容易做错的三处
- 界面显示引用内容超出预算报错，原因是未按本档对话模型的`quoteMaxToken`设置引用token上限，导致检索召回内容累计token超限。
- 检索召回的内容出现语义断裂，原因是分块长度设置未匹配向量模型的分段规则，导致关键信息被意外截断。
- 更换向量模型后未重建索引，原因是忽略了向量模型与索引维度的绑定关系，旧索引无法适配新模型的编码逻辑。

## 怎么确认配好了
- 查看对话模型的`quoteMaxToken`配置项，确认取值落在500000–10000000 tokens区间内。
- 核对向量模型的`maxToken`配置，确认未超过8000 tokens的单段输入上限。
- 测试检索功能，查看返回内容的分段长度与预设的`chunkSize`是否一致。
- 提交测试用的长文本，检查是否触发引用token超限的相关提示。
