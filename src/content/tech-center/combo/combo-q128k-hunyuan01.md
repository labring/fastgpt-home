---
title: 引用预算 5 万–12.8 万的对话模型配 hunyuan-embedding 的分段与引用口径
slug: /zh/combo/combo-q128k-hunyuan01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken指单轮对话中可引用的上下文内容总token预算，本次选型的5万至12.8万token区间，适配多数中长文本知识库的上下文需求。既可以覆盖长文档的分段引用，也能满足多轮对话中积累的上下文承载，无需频繁截断有效信息，为复杂查询提供充足的语义支撑空间，同时避免因预算过高导致的推理"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 hunyuan-embedding 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken指单轮对话中可引用的上下文内容总token预算，本次选型的5万至12.8万token区间，适配多数中长文本知识库的上下文需求。既可以覆盖长文档的分段引用，也能满足多轮对话中积累的上下文承载，无需频繁截断有效信息，为复杂查询提供充足的语义支撑空间，同时避免因预算过高导致的推理资源浪费，平衡了上下文丰富度与调用成本。

## 配 Hunyuan 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配hunyuan-embedding的默认单段长度配置，适配基础知识库场景 |
| `maxToken` | 1024 | 符合hunyuan-embedding支持的单段最大token上限，可用于需要完整语义的分块需求 |
| `quoteMaxToken` | 50000–128000 | 对齐本次选型的对话模型引用预算区间，保障上下文承载能力 |
| 分块长度 | 512 或 1024 | 与`defaultToken`或`maxToken`的配置保持一致，确保分块内容可被向量模型正常编码 |
| 重叠长度 | 64–128 | 衔接相邻分块的语义内容，避免关键信息被截断在分块边界 |
| 单次搜索上限 | 适配当前预算的合理区间 | 避免单次召回的内容总token超出`quoteMaxToken`的限制 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳约97至250段内容；若将每段调整至向量模型允许的1024 tokens上限，则仅可容纳约48段。分块长度越长，单段承载的语义信息越完整，但单轮可引用的段落数量越少；分块长度越短，单轮可容纳的段落越多，但单段语义的完整性会下降，可能导致上下文碎片化。若更换向量模型，需重建已生成的知识库索引，因为向量维度与向量模型绑定，原有索引无法适配新模型的编码规则。

## 容易做错的三处
- 单次查询后引用内容被意外截断，原因是召回内容的总token超出了`quoteMaxToken`的预算上限。
- 向量编码失败或索引生成报错，原因是分块长度超过了`maxToken`的限制，无法被当前向量模型处理。
- 知识库分块后语义衔接出现断层，原因是未设置合理的重叠长度，导致相邻分块之间的关键信息丢失。

## 怎么确认配好了
- 查看当前对话模型的配置项，确认`quoteMaxToken`的取值符合选型区间。
- 检查向量模型的绑定状态，确认已关联hunyuan-embedding。
- 测试单段文本的编码流程，确认无报错且符合设置的分块长度要求。
- 发起模拟查询，核对系统可正常加载所有召回的引用内容。
