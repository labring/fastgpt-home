---
title: 引用预算 50 万–1000 万的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径
slug: /zh/combo/combo-q1m-openai01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是对话模型允许的单次调用中引用内容的总token预算，限定了可带入知识库片段的总长度。本档模型的预算区间覆盖50万至1000万tokens，可支撑长文档知识库、多轮连贯查询的上下文需求，能够容纳更多细分场景的参考片段，无需频繁截断核心信息，适配复杂业务场景下的大上下文"
language: zh
axis_model_tier: "引用预算 50 万–1000 万"
covered_models: "glm-5.3-flash、glm-5.3、glm-5.2、glm-4-long、deepseek-flash、deepseek-v4-flash、deepseek-v4-pro、doubao-seed-evolving、gemini-3.8-flash、gemini-3.7-flash、gemini-3.6-flash、gemini-3.5-flash、gemini-3.1-pro-preview-customtools、gemini-3.1-flash-lite、gemini-3.5-flash-lite、gemini-3.1-pro-preview、gemini-3.1-pro、gemini-3-flash-preview、gemini-3-flash、gemini-2.5-pro、gemini-2.5-flash、gemini-2.5-flash-lite、grok-4.5、grok-4.6、grok-4.3、grok-4.20-multi-agent-0309、grok-4.20-0309-reasoning、grok-4.20-0309-non-reasoning、hy4-preview、MiniMax-M3、MiniMax-M1、kimi-k3、gpt-6-astra、gpt-5.6、gpt-5.6-sol、gpt-5.6-terra、gpt-5.6-luna、gpt-5.5、gpt-5.5-pro、gpt-5.4、gpt-5.4-pro、gpt-4.1、gpt-4.1-mini、gpt-4.1-nano、qwen3.8-max、qwen3.8-flash、qwen3.7-max、qwen3.7-plus、qwen3.7-flash、qwen3.6-plus、qwen3.6-flash、qwen3.5-flash、qwen3.5-plus、qwen-plus、qwen-turbo、qwen-flash、qwen3-coder-plus、qwen3-coder-flash、qwen-long"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 50 万–1000 万的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是对话模型允许的单次调用中引用内容的总token预算，限定了可带入知识库片段的总长度。本档模型的预算区间覆盖50万至1000万tokens，可支撑长文档知识库、多轮连贯查询的上下文需求，能够容纳更多细分场景的参考片段，无需频繁截断核心信息，适配复杂业务场景下的大上下文调用，提升回答的完整性与逻辑连贯性。

## 配 OpenAI 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配向量模型默认的单段token长度，适配通用知识库的分块标准 |
| `maxToken` | 8000 | 匹配向量模型允许的单段最大token上限，最大化单段语义完整性 |
| `quoteMaxToken` | 500000–10000000 | 匹配本档对话模型的引用预算区间，对齐整体配置逻辑 |
| `chunkSize` | 512–8000 | 可根据业务需求调整，短长度适配多片段召回场景，长长度适配长语义场景 |
| 分块重叠长度 | 100–200 tokens | 避免分块破坏语义连贯性，保证相邻片段的上下文衔接 |
| 单次搜索上限 | 20–50 | 平衡召回数量与token预算消耗，避免单次调用超出限额 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳976–19,531段知识库片段；若将单段长度调整至向量模型允许的8000 tokens上限，仅可容纳约62段。单段长度越长，单段承载的语义越完整，但一轮可引入的片段数量越少；单段长度越短，可引入的片段数量越多，但单段上下文的连贯性越弱。更换向量模型后，已构建的知识库索引需要重建，因为向量维度与向量模型强绑定，旧索引无法适配新模型的向量计算逻辑。

## 容易做错的三处
- 界面显示单次调用的引用内容被强制截断。原因：实际引用的总token数超过了`quoteMaxToken`的预设预算。
- 检索返回的知识库片段数量远低于配置的搜索上限。原因：分块长度设置超出向量模型的`maxToken`限制，或总引用token即将触达`quoteMaxToken`。
- 更换向量模型后无法正常加载已有知识库。原因：未重建知识库索引，新向量模型的向量维度与原有索引不匹配。

## 怎么确认配好了
- 查看配置面板中的`quoteMaxToken`参数，确认取值处于本档模型的预算区间内。
- 核对向量模型的`defaultToken`与`maxToken`参数，确保与所选OpenAI向量模型的官方参数匹配。
- 调整知识库分块长度，验证分块后的片段token数未超出向量模型的`maxToken`限制。
- 发起一次带知识库召回的测试调用，检查返回内容的引用逻辑是否符合配置要求。
