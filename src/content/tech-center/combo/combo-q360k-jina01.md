---
title: 引用预算 19 万–35 万的对话模型配 jina-embeddings-v5-omni-nano / jina-clip-v2 的分段与引用口径
slug: /zh/combo/combo-q360k-jina01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是知识库引用内容的总 token 预算，限定了单次对话中可纳入上下文的所有引用内容的累计 token 上限。这一档 190000–350000 tokens 的区间，能够支撑大容量的上下文召回，适配多段落、长文档的知识库场景，无需频繁截断核心信息，可满足复杂多轮对话的"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 jina-embeddings-v5-omni-nano / jina-clip-v2 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是知识库引用内容的总 token 预算，限定了单次对话中可纳入上下文的所有引用内容的累计 token 上限。这一档 190000–350000 tokens 的区间，能够支撑大容量的上下文召回，适配多段落、长文档的知识库场景，无需频繁截断核心信息，可满足复杂多轮对话的上下文积累需求，同时与多模态向量模型的内容索引形成匹配，支撑跨模态的知识库应用。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配向量模型默认的单段分词长度，保证基础分块与向量编码对齐 |
| `maxToken` | 8000 tokens | 匹配向量模型允许的单段最大 token 上限，避免分块超出编码限制 |
| `quoteMaxToken` | 190000–350000 tokens | 匹配当前对话模型档的引用预算上限，严格遵循选型范围 |
| `chunkSize` | 512 tokens 或 8000 tokens | 可根据业务场景选择，对应两种分段策略的基准长度 |
| 分块重叠长度 | 50–100 tokens | 保留相邻分块的语义衔接，避免关键信息被截断在分块边界 |
| 单次搜索上限 | 与引用预算匹配的合理区间 | 控制单次召回的总 token 不超出 `quoteMaxToken` 的限制 |

## 这两者互相约束的地方
当该档对话模型与 Jina 向量模型组合时，引用预算与分块长度形成双向约束。按默认每段 512 tokens 计算，一轮引用最多可容纳 371–683 段；若将分块长度调整至向量模型允许的 8000 tokens 上限，则仅可容纳约 23 段。每段越长，单段承载的语义信息越完整，但一轮可放置的段数越少；每段越短，可容纳的段数越多，但单段上下文的完整性越弱。更换向量模型后，已构建的知识库索引需要重新生成，因为向量维度与编码逻辑与原模型绑定。

## 容易做错的三处
- 界面显示引用内容超出限制，原因是未按照选型档的 `quoteMaxToken` 设置总引用 token 预算，导致召回内容累计 token 超出对话模型的上限。
- 部分长文本的语义连贯性缺失，原因是分块长度设置不当，未匹配向量模型的 `maxToken` 或 `defaultToken` 参数，导致关键信息被割裂。
- 更换向量模型后索引无法正常召回，原因是未重新生成知识库索引，新向量模型的编码逻辑与原有索引不匹配。

## 怎么确认配好了
- 查看对话模型的选型配置，确认 `quoteMaxToken` 处于 190000–350000 tokens 的区间内。
- 核对向量模型的参数设置，确认 `defaultToken` 与 `maxToken` 匹配选型档的要求。
- 测试分块功能，验证生成的分块长度符合预设的配置项。
- 发起一次跨模态的知识库检索，确认图片与文本内容均可正常召回并纳入上下文。
