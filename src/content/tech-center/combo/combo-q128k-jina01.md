---
title: 引用预算 5 万–12.8 万的对话模型配 jina-embeddings-v5-omni-nano / jina-clip-v2 的分段与引用口径
slug: /zh/combo/combo-q128k-jina01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "本次选型的对话模型档包含AntLing系列、Baichuan系列、ChatGLM系列等共90个模型，其`quoteMaxToken`指单轮对话中可引用的知识库内容总token预算，50000–128000 tokens的区间覆盖了多数长上下文知识库的引用需求。在知识库应用中，该预算可支撑复杂文档、长"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 jina-embeddings-v5-omni-nano / jina-clip-v2 的分段与引用口径

## 这一档模型的参数意味着什么
本次选型的对话模型档包含AntLing系列、Baichuan系列、ChatGLM系列等共90个模型，其`quoteMaxToken`指单轮对话中可引用的知识库内容总token预算，50000–128000 tokens的区间覆盖了多数长上下文知识库的引用需求。在知识库应用中，该预算可支撑复杂文档、长报告类内容的完整引用，无需频繁截断核心信息，适配多轮对话中需要调取大量分段知识的场景，提升回答的信息完整性与连贯性。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配该Jina系列多模态向量模型默认的单段token长度，无需额外调整即可适配基础分块逻辑 |
| `maxToken` | 8000 | 匹配该Jina系列多模态向量模型允许的单段最大输入token上限，避免分块超出模型支持范围 |
| `quoteMaxToken` | 50000–128000 | 匹配当前选型的对话模型引用预算区间，确保可引用内容符合模型上下文限制 |
| 分块长度 | 512 或 8000 | 对应向量模型的默认token长度或单段最大上限，可根据语义完整性需求选择 |
| 重叠长度 | 64–128 | 保留相邻分块的语义重叠，避免关键信息被分块截断 |
| 单次搜索上限 | 按需调整 | 控制单次检索返回的分段数量，结合引用预算平衡召回范围与上下文长度 |

## 这两者互相约束的地方
当前选型下，按默认每段512 tokens计算，一轮引用最多可容纳97–250段；若将分块长度调整至向量模型允许的8000 tokens上限，仅可容纳约6段。分块长度越长，单段包含的语义信息越完整，但一轮可引用的分段数量越少；分块长度越短，可引用的分段数量越多，但单段上下文的完整性越弱。更换向量模型后，已构建的知识库索引需要重新生成，因为向量维度与向量模型绑定，旧索引无法适配新模型的编码逻辑。

## 容易做错的三处
- 界面显示引用内容超出限制却未触发截断提示。原因：未将`quoteMaxToken`配置为对应对话模型的预算区间，导致系统无法正确校验引用总token数。
- 分块后的内容无法被向量模型正常编码。原因：分块长度超出了向量模型`maxToken`的上限，导致输入token超限。
- 检索结果相关性不足且未调整相关参数。原因：未根据场景设置合理的最低相关度阈值，或单次搜索上限配置过低导致召回范围不足。

## 怎么确认配好了
- 查看向量模型配置页面，确认`defaultToken`、`maxToken`的取值与当前选型匹配。
- 检查知识库集合的分块配置，确认分块长度未超出向量模型的`maxToken`限制。
- 测试单轮对话，查看引用内容的总token数未触发对话模型的`quoteMaxToken`限制。
- 上传包含图片的测试文档，确认可正常生成多模态向量索引。
