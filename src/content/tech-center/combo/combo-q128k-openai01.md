---
title: 引用预算 5 万–12.8 万的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径
slug: /zh/combo/combo-q128k-openai01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是对话模型允许的引用内容总token预算，限定了单次对话中可注入的知识库参考内容的token总量。本次选型的对话模型档`quoteMaxToken`处于50000–128000 tokens区间，能够承载更长的上下文参考内容，支持更复杂的多段召回整合，适配对上下文长度"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是对话模型允许的引用内容总token预算，限定了单次对话中可注入的知识库参考内容的token总量。本次选型的对话模型档`quoteMaxToken`处于50000–128000 tokens区间，能够承载更长的上下文参考内容，支持更复杂的多段召回整合，适配对上下文长度有较高要求的知识库应用场景，可满足多轮对话或长文本问答的参考内容注入需求。

## 配 OpenAI 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配向量模型登记的默认分段长度，确保分块与向量模型输入格式对齐 |
| `maxToken` | 8000 | 遵循向量模型允许的单段最大token上限，规避输入超限报错 |
| `quoteMaxToken` | 50000–128000 | 匹配当前对话模型档的引用预算区间，控制总引用内容的token总量 |
| `chunkSize` | 512 或 8000 | 按需选择，短分段适配高频检索场景，长分段保留完整语义单元 |
| 重叠长度 | 100–200 tokens | 衔接相邻分块，避免语义被截断割裂 |
| 单次搜索上限 | 不超过对应分段下的最大可容纳段数 | 防止单次召回的总token超出引用预算 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳97–250段；若将每段调整至向量模型允许的8000 tokens上限，仅可容纳约6段。每段越长，单段语义完整性越强，但一轮可承载的段落数越少；每段越短，段落数越多，但单段上下文会更细碎。此外，向量模型与向量维度绑定，更换向量模型后已构建的知识库索引需要重新生成，否则会出现检索匹配失效的问题，无法正常获取相关参考内容。

## 容易做错的三处
- 界面显示引用内容超出预算。原因是未按对话模型档的`quoteMaxToken`区间设置总引用token限制，单次召回的总token超过了对话模型的允许范围。
- 向量检索返回结果为空或匹配度极低。原因是更换了向量模型但未重建知识库索引，新旧模型的向量维度不匹配导致检索失效。
- 分块后语义出现明显割裂。原因是未设置合理的重叠长度，导致相邻分块的上下文衔接出现断层。

## 怎么确认配好了
- 核对对话模型的引用预算参数，确认其处于50000–128000 tokens区间。
- 检查向量模型的单段最大token设置，确认与所选分块长度匹配。
- 验证分块长度与向量模型默认输入要求对齐，无格式冲突。
- 测试单次召回的总token量，确认未超出对话模型的引用预算。
