---
title: 引用预算 5 万–12.8 万的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径
slug: /zh/combo/combo-q128k-qwen01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken是对话模型允许的引用内容总token预算，限定了单次对话中可注入的外部知识库内容的总token数量。本次选型的对话模型档，quoteMaxToken区间覆盖50000至128000 tokens，能够支撑较大体量的知识库内容引用，适配需要多段检索结果拼接的复杂问答场景，满足"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken是对话模型允许的引用内容总token预算，限定了单次对话中可注入的外部知识库内容的总token数量。本次选型的对话模型档，quoteMaxToken区间覆盖50000至128000 tokens，能够支撑较大体量的知识库内容引用，适配需要多段检索结果拼接的复杂问答场景，满足长上下文交互的基础需求。

## 配 Qwen 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配向量模型预设的默认分段长度，减少参数调整成本 |
| `maxToken` | 8000 tokens | 遵循向量模型允许的单段最大输入长度，避免内容被强制截断 |
| `quoteMaxToken` | 50000–128000 tokens | 匹配当前对话模型档的引用预算区间，适配大段内容引用需求 |
| `chunkSize` | 512 tokens / 8000 tokens | 可根据场景灵活选择，短分段适配细粒度检索，长分段适配完整语义提取 |
| 重叠长度 | 10%–20% of 分段长度 | 衔接相邻分块内容，避免关键语义被分块割裂 |
| 单次搜索上限 | 与引用预算匹配 | 控制单次召回的总token不超出对话模型的引用限制 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳约97–250段；若将每段调整至向量模型允许的8000 tokens上限，仅可容纳约6段。每段长度越长，单段承载的语义越完整，但一轮可引用的总段数越少；每段长度越短，总段数越多，但单段上下文的完整性越弱。更换向量模型后，由于向量维度与模型绑定，已创建的知识库索引需要重新构建，否则无法保证检索匹配的准确性。

## 容易做错的三处
- 检索后界面提示token超限，查看日志发现召回内容总token超出限制。原因是未将单次搜索上限与quoteMaxToken做关联校验，导致召回内容总token超出对话模型的引用预算。
- 检索返回的片段割裂了完整的关键信息。原因是未设置合理的重叠长度，导致核心语义被分块截断在不同片段中。
- 更换向量模型后检索结果出现异常匹配。原因是未重建知识库索引，新向量模型与原索引的向量维度不匹配。

## 怎么确认配好了
- 查看知识库集合的分块配置，确认与预设的分段参数一致。
- 模拟发起检索请求，检查返回的引用内容总token未超出对话模型的引用预算。
- 更换向量模型后，执行索引重建操作并验证检索功能正常。
- 调整分块长度后，查看检索召回的片段是否符合预期的语义完整性。
