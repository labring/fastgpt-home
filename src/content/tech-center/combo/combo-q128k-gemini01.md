---
title: 引用预算 5 万–12.8 万的对话模型配 gemini-embedding-2 的分段与引用口径
slug: /zh/combo/combo-q128k-gemini01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken是知识库应用中可引用的上下文内容的总token限额，本档50000至128000token的预算区间，适配多数中长上下文的知识库问答场景。该区间可容纳数十至上百段标准长度的知识库片段，无需频繁截断核心信息，能支持对多文档段落、长文档片段的整合引用，适配复杂的多轮问答需求，让"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 gemini-embedding-2 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken是知识库应用中可引用的上下文内容的总token限额，本档50000至128000token的预算区间，适配多数中长上下文的知识库问答场景。该区间可容纳数十至上百段标准长度的知识库片段，无需频繁截断核心信息，能支持对多文档段落、长文档片段的整合引用，适配复杂的多轮问答需求，让生成的回复能基于更全面的背景知识，提升内容的完整性与准确性。

## 配 Gemini 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配Gemini向量模型登记的默认每段长度，适配基础分块逻辑 |
| `maxToken` | 8192 | 遵循Gemini向量模型允许的单段最大token上限，最大化单段语义承载量 |
| `quoteMaxToken` | 50000-128000 | 严格匹配本档对话模型的引用预算区间，确保上下文不超限 |
| `chunkSize` | 512 或 8192 | 根据语义完整性需求选择，不超出向量模型的单段token限制 |
| 重叠长度 | 64-128 | 保留相邻分块的语义衔接，避免关键信息被分块截断 |
| 单次搜索上限 | 不超过对话模型引用预算除以单段token的最大值 | 确保返回的片段总token不超出对话模型限额 |
| 最低相关度 | 0.6-0.8 | 过滤低相关性片段，避免无效内容占用引用预算 |

## 这两者互相约束的地方
当对话模型的引用预算与Gemini向量模型的单段token限制结合时，会形成明确的约束关系。按默认每段512tokens计算，一轮引用最多可放下约97-250段；若将每段调整至向量模型允许的上限8192tokens，则仅能放下约6段。每段越长，单段承载的语义信息越完整，但一轮可容纳的知识库片段数量越少；每段越短，可容纳的段数越多，但单段上下文的完整性越弱，可能出现语义碎片化的情况。若更换向量模型，由于向量维度与模型绑定，已建立的知识库索引需要重新构建，才能适配新的向量模型逻辑。

## 容易做错的三处
- 知识库分块长度设置超出向量模型的maxToken限制，原因是向量模型无法处理超出单段上限的分块，会导致索引构建失败或检索异常。
- 单次搜索返回的片段总token超过对话模型的quoteMaxToken，原因是超出对话模型的引用预算，会导致生成回复时上下文被强制截断，影响内容完整性。
- 更换向量模型后未重建索引，原因是新向量模型的向量维度与原有索引不匹配，无法正常完成检索匹配。

## 怎么确认配好了
- 查看向量模型的配置参数，确认defaultToken、maxToken与Gemini向量模型的登记参数一致。
- 核对对话模型的quoteMaxToken参数，确认处于本档的50000至128000token区间内。
- 验证分块长度设置，确保其不超过向量模型的maxToken限制。
- 发起一次知识库检索，检查返回的上下文总长度未超出对话模型的引用预算。
