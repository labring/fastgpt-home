---
title: 引用预算 5 万–12.8 万的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径
slug: /zh/combo/combo-q128k-jina04
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken是单次对话中可引用的参考内容总token上限，本档5万至12.8万的区间，能够覆盖多数长文本知识库的上下文需求，可在单次交互中纳入较多合规的参考片段，适配多文档整合、长段落问答等场景，为对话提供充足的参考依据，保障回答的准确性与完整性。"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken是单次对话中可引用的参考内容总token上限，本档5万至12.8万的区间，能够覆盖多数长文本知识库的上下文需求，可在单次交互中纳入较多合规的参考片段，适配多文档整合、长段落问答等场景，为对话提供充足的参考依据，保障回答的准确性与完整性。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配向量模型登记的默认分段长度，适配多数常规知识库的分块配置 |
| `maxToken` | 32000 tokens | 遵循向量模型允许的单段最大token上限，保障单段语义完整度 |
| `quoteMaxToken` | 50000–128000 tokens | 匹配本档对话模型的引用预算区间，控制单次交互的参考内容总token消耗 |
| `chunkSize` | 512–32000 tokens | 可根据业务场景灵活调整，短分段适配细粒度检索需求，长分段适配长文本场景 |
| 重叠长度 | 10%–20% of 分块长度 | 填补分块间隙，避免上下文被割裂，保障相邻片段的语义连贯性 |
| 单次搜索上限 | 匹配对话模型引用预算 | 确保检索返回的参考内容总token不超出对话模型的限制 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳约97–250段参考内容；若将每段调整至向量模型允许的32000 tokens上限，则仅可容纳约1段起。每段长度越长，单段承载的语义信息越完整，但一轮可纳入的参考片段数量越少；每段长度越短，可容纳的片段数量越多，但单段上下文的完整性越弱。当更换向量模型时，由于向量维度与模型绑定，已创建的知识库索引需要重新构建，才能适配新的向量配置。

## 容易做错的三处
- 检索返回片段总token超出对话模型限制，导致对话截断或报错。原因是未根据quoteMaxToken调整单次搜索上限，未控制参考内容的总token消耗。
- 分块长度超过向量模型的maxToken上限，导致片段无法正常向量化。原因是未遵循向量模型的单段token限制，设置了过大的分块长度。
- 未保留合理的重叠长度，导致相邻分块的语义衔接断裂，检索时出现上下文割裂的问题。原因是未配置或配置了过低的重叠长度，未保障片段间的语义连贯性。

## 怎么确认配好了
- 查看知识库的分块配置，确认分块长度符合向量模型的单段token限制。
- 核对对话模型的引用预算区间，确认与当前配置的quoteMaxToken匹配。
- 测试单次检索返回的参考内容总token，确保未超出对话模型的限制。
- 检查向量模型的绑定配置，确认与当前选用的jina向量模型参数一致。
