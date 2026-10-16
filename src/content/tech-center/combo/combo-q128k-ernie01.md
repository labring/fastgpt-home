---
title: 引用预算 5 万–12.8 万的对话模型配 Embedding-V1 的分段与引用口径
slug: /zh/combo/combo-q128k-ernie01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是引用内容的总token预算，限定单轮对话中可投入的参考内容总长度。本档5万–12.8万的token区间，可支撑较多段落的上下文引用，适配需要整合多段背景信息的知识库问答场景，无需过度截断参考内容，保障模型可基于更完整的参考信息生成回复，适配多数知识库应用的常规引用需"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 Embedding-V1 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是引用内容的总token预算，限定单轮对话中可投入的参考内容总长度。本档5万–12.8万的token区间，可支撑较多段落的上下文引用，适配需要整合多段背景信息的知识库问答场景，无需过度截断参考内容，保障模型可基于更完整的参考信息生成回复，适配多数知识库应用的常规引用需求。

## 配 Ernie 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配Embedding-V1的默认分块长度，无需额外调整即可适配模型原生输入要求 |
| `maxToken` | 1000 tokens | 遵循Embedding-V1的单段输入上限，保障单段文本可完整送入向量模型完成编码 |
| `quoteMaxToken` | 50000–128000 tokens | 匹配本档对话模型的引用预算区间，适配当前选型的整体配置 |
| `chunkSize` | 512–1000 tokens | 可根据场景选择，匹配向量模型的输入上限，平衡单段语义完整性与引用段数 |
| 分块重叠长度 | 10%–20%的分块长度 | 避免分块截断关键语义，保障上下文连贯性 |
| 单次搜索上限 | 对应引用预算与分块长度的合理区间 | 控制召回结果的总token不超出`quoteMaxToken`限制 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可放下约97–250段；若将每段调整至向量模型允许的1000 tokens上限，则仅可放下约50段。每段越长，单段承载的语义越完整，但一轮可容纳的引用段数越少；每段越短，单段语义完整性有所降低，但一轮可容纳的段数更多。不同向量模型的单段输入上限与向量维度存在绑定关系，更换向量模型后，已构建的知识库索引需要重新生成，以适配新的编码规则。

## 容易做错的三处
-  单轮回复中引用内容被提前截断，原因是召回内容的总token超过了`quoteMaxToken`的预算限制，未提前校验配置组合的匹配关系。
-  向量编码环节出现报错，原因是配置的`chunkSize`超出了`maxToken`的上限，不符合Embedding-V1的单段输入要求。
-  参考内容的语义连贯性不足，原因是分块重叠长度设置过低，导致相邻分块的关键语义被截断，无法形成完整上下文。

## 怎么确认配好了
-  查看向量模型的配置参数，确认`defaultToken`与`maxToken`的取值符合当前选型要求。
-  校验知识库分块配置，确认`chunkSize`未超出向量模型的单段输入上限。
-  测试单轮召回的总token规模，确认未超过对话模型的`quoteMaxToken`预算。
-  生成少量测试索引，验证向量编码环节无异常报错。
