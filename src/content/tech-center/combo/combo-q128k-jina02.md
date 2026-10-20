---
title: 引用预算 5 万–12.8 万的对话模型配 jina-embeddings-v5-text-nano / jina-embeddings-v3 的分段与引用口径
slug: /zh/combo/combo-q128k-jina02
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken是对话模型允许的单轮引用内容累计token上限，本档50000至128000 tokens的区间，适配中长上下文的知识库问答场景。该预算可覆盖多段落的文档片段引用，支撑跨章节、长文档的上下文整合，满足复杂查询的信息召回需求，无需频繁截断引用内容以适配模型输入限制，提升回答的"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 jina-embeddings-v5-text-nano / jina-embeddings-v3 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken是对话模型允许的单轮引用内容累计token上限，本档50000至128000 tokens的区间，适配中长上下文的知识库问答场景。该预算可覆盖多段落的文档片段引用，支撑跨章节、长文档的上下文整合，满足复杂查询的信息召回需求，无需频繁截断引用内容以适配模型输入限制，提升回答的完整性与连贯性。

## 配 Jina 向量模型要定哪些
| `defaultToken` | 512 | 与所选向量模型登记的默认每段长度保持一致，确保分块与向量编码的匹配度 |
| --- | --- | --- |
| `maxToken` | 8000 | 匹配所选向量模型允许的单段最大token上限，充分利用模型的编码能力 |
| `quoteMaxToken` | 50000–128000 | 直接沿用本档对话模型的官方参数，确保引用内容的token总量不超出模型输入限制 |
| 分块长度 | 512–8000 | 可根据业务场景调整，平衡语义完整性与引用片段数量 |
| 单次搜索上限 | 匹配引用段数上限 | 结合分块长度调整，避免超出对话模型的引用预算 |
| 最低相关度 | 自定义区间 | 基于业务需求筛选有效召回片段，平衡召回数量与相关性 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可放下约97–250段；若将每段调整至向量模型允许的上限8000 tokens，仅可放下约6段起。分块长度越长，单段包含的语义越完整，但一轮能容纳的引用片段越少；分块长度越短，单段语义颗粒度越细，可容纳的片段越多，但上下文拼接的连贯性可能受影响。更换向量模型后，因向量维度与编码逻辑绑定，已构建的知识库索引需重新生成，否则无法匹配新的向量编码规则。

## 容易做错的三处
- 界面弹出引用内容超限提示，原因是累计引用的token总量超出了对话模型的`quoteMaxToken`预算。
- 向量检索返回的片段数量远高于预期，原因是未结合分块长度与引用预算限制单次搜索的召回上限。
- 导入文档后向量索引构建失败，原因是分块长度超出了所选向量模型的单段最大token限制。

## 怎么确认配好了
- 查看对话模型的参数配置页面，确认`quoteMaxToken`已设置为对应档位的区间值。
- 检查向量模型的绑定设置，确认已选择jina-embeddings-v5-text-nano或jina-embeddings-v3。
- 测试不同分块长度的文档导入，验证索引构建流程可正常完成。
- 发起模拟查询，确认引用内容的拼接逻辑符合业务预期。
