---
title: 引用预算 19 万–35 万的对话模型配 jina-embeddings-v5-text-nano / jina-embeddings-v3 的分段与引用口径
slug: /zh/combo/combo-q360k-jina02
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是知识库应用中可纳入上下文的引用内容总token预算，本档对话模型的该参数区间为19万至35万。该预算覆盖多数长文档知识库的上下文拼接需求，可支持跨多篇长文本的关联信息整合，适配多轮对话的上下文累积场景，无需频繁截断核心业务信息，为复杂问答场景提供充足的上下文支撑。"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 jina-embeddings-v5-text-nano / jina-embeddings-v3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是知识库应用中可纳入上下文的引用内容总token预算，本档对话模型的该参数区间为19万至35万。该预算覆盖多数长文档知识库的上下文拼接需求，可支持跨多篇长文本的关联信息整合，适配多轮对话的上下文累积场景，无需频繁截断核心业务信息，为复杂问答场景提供充足的上下文支撑。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配该向量模型的默认分段token数，适配基础检索场景无需额外调整 |
| `maxToken` | 8000 | 匹配该向量模型的单段输入token上限，保障单段语义的完整呈现 |
| `quoteMaxToken` | 190000–350000 | 匹配本档对话模型的参数区间，确保引用内容总token不超出模型可处理范围 |
| `chunkSize` | 512 或 8000 | 对应向量模型的默认或最大分段token，平衡语义完整性与可引用段数 |
| 分块重叠长度 | 64–128 | 减少分块对语义连贯性的破坏，保障相邻分块的信息衔接 |
| 单次搜索上限 | 适配当前预算的合理区间 | 控制单次检索返回的总token不超出`quoteMaxToken`预留空间 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳约371–683段；若将每段调整至向量模型允许的8000 tokens上限，则仅可容纳约23段。每段越长，单段语义完整性越强，但单轮可引用的段数越少；每段越短，单轮可引用段数越多，但单段上下文的连贯性越弱。更换向量模型后，由于向量维度与模型绑定，已创建的知识库索引需要重新构建，以适配新的向量计算逻辑。

## 容易做错的三处
- 界面提示引用内容token超出模型上限，日志中出现上下文截断报错，原因是未将`quoteMaxToken`设置为匹配本档对话模型的区间，或检索返回的总token超出该预算。
- 检索返回的段落语义不连贯，出现关键信息被拆分的情况，原因是`chunkSize`设置不合理，或分块重叠长度未达到保障语义衔接的标准。
- 检索结果为空或向量相似度异常，原因是更换向量模型后未重新构建知识库索引，导致向量维度不匹配。

## 怎么确认配好了
- 查看向量模型的配置参数，确认`defaultToken`与`maxToken`与当前设置一致。
- 检查知识库集合的`chunkSize`，确认其未超出向量模型的`maxToken`上限。
- 核对对话模型的`quoteMaxToken`参数，确认其处于本档模型的区间范围内。
- 发起测试检索，查看返回结果的总token是否在`quoteMaxToken`预留范围内。
