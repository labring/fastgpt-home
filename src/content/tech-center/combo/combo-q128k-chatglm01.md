---
title: 引用预算 5 万–12.8 万的对话模型配 embedding-3 的分段与引用口径
slug: /zh/combo/combo-q128k-chatglm01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是对话模型可调用的引用内容总token预算，本档对话模型的该参数区间为50,000–128,000 tokens。该预算区间适配需要承载较多上下文引用的知识库应用，可容纳多段检索到的知识库内容，支撑对长文档、多来源信息的整合处理，让对话模型能基于更全面的背景信息生成回"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 embedding-3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是对话模型可调用的引用内容总token预算，本档对话模型的该参数区间为50,000–128,000 tokens。该预算区间适配需要承载较多上下文引用的知识库应用，可容纳多段检索到的知识库内容，支撑对长文档、多来源信息的整合处理，让对话模型能基于更全面的背景信息生成回复，适配复杂场景下的上下文需求。

## 配 ChatGLM 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 与ChatGLM embedding-3的默认分段长度匹配，无需额外调整即可适配模型输入要求 |
| `maxToken` | 8000 | 匹配ChatGLM embedding-3的单段最大输入token上限，避免分段超出模型处理范围 |
| `quoteMaxToken` | 50000–128000 | 与本档对话模型的参数区间对齐，确保引用内容总token不超出模型预算 |
| 分块长度 | 512 或 8000 | 对应向量模型的默认或最大分段长度，平衡语义完整性与引用段数 |
| 重叠长度 | 100–200 tokens | 保留相邻分块的重叠内容，避免语义被分块割裂 |
| 单次搜索上限 | 按引用预算与分段长度动态调整 | 确保检索返回的总token不超出`quoteMaxToken`的限制 |
| 最低相关度 | 按业务场景设置 | 过滤低相关性的检索结果，减少无效token占用预算 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可放下约97–250段；若将每段调整至向量模型允许的8000 tokens上限，仅可放下约6段起。每段越长，单段语义完整性越强，但一轮可承载的引用段数越少；每段越短，段数越多，但单段上下文越碎片化。更换向量模型后，已创建的知识库索引需要重建，因为向量维度与向量模型绑定，旧索引无法适配新模型的向量计算逻辑。

## 容易做错的三处
- 检索返回结果超出token预算，导致对话模型报错。原因是未按`quoteMaxToken`限制调整单次搜索上限，导致总引用token超出模型可承载范围。
- 分块长度设置不当导致语义割裂或token浪费。原因是未结合向量模型的分段参数与对话模型的引用预算调整分块长度。
- 更换向量模型后未重建索引，导致检索结果匹配度异常。原因是向量维度与向量模型绑定，旧索引的向量格式无法适配新模型。

## 怎么确认配好了
- 查看知识库集合的分块配置，确认与向量模型的分段参数匹配。
- 核对对话模型的`quoteMaxToken`参数与本档模型的区间对齐。
- 测试检索功能，确认返回结果的总token未超出对话模型的预算限制。
- 检查向量索引的关联模型，确认与当前使用的向量模型一致。
