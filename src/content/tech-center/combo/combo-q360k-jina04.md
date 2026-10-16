---
title: 引用预算 19 万–35 万的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径
slug: /zh/combo/combo-q360k-jina04
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是知识库应用中可引用内容的总 token 预算，本档对话模型的该参数区间为 190,000–350,000 tokens。该区间能够支撑较多数量的知识库片段整合，适配需要丰富上下文的问答场景，可承载多轮检索后的有效引用内容，无需因预算限制提前截断关键信息，为复杂问题的"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是知识库应用中可引用内容的总 token 预算，本档对话模型的该参数区间为 190,000–350,000 tokens。该区间能够支撑较多数量的知识库片段整合，适配需要丰富上下文的问答场景，可承载多轮检索后的有效引用内容，无需因预算限制提前截断关键信息，为复杂问题的精准回答提供充足的内容空间。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配该向量模型的默认分段长度，适配基础检索场景的标准配置 |
| `maxToken` | 32000 | 匹配该向量模型支持的单段最大token上限，用于长文本片段的向量化处理 |
| `quoteMaxToken` | 190000–350000 | 匹配本档对话模型的引用预算区间，确保所有引用内容的总token不超出模型限制 |
| `chunkSize` | 512 或 32000 | 可根据场景选择短分段或长分段，平衡语义完整性与可引用的总段数 |
| 分块重叠长度 | 64–128 | 避免分块切断语义关联，保障相邻知识库片段的信息衔接连贯性 |
| 单次搜索上限 | 按`quoteMaxToken`与分段长度动态调整 | 防止单次检索返回的片段总token超出引用预算，避免内容被无故截断 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可放下约371–683段；若将每段调整至向量模型允许的上限32000 tokens，则仅可放下约5段。每段越长，单段语义完整性越强，但一轮可容纳的引用段数越少；每段越短，可容纳的段数越多，但单段上下文的连贯性越弱。更换向量模型后，已构建的知识库索引需要重新生成，因为向量维度与向量模型绑定，旧索引无法适配新模型的向量化逻辑。

## 容易做错的三处
- 检索返回的片段总token超出`quoteMaxToken`导致内容被截断，原因是未根据引用预算调整单次搜索的返回段数。
- 长文本被切分为过短的片段，导致语义关联断裂，原因是未合理设置分块长度与重叠长度参数。
- 更换向量模型后未重建知识库索引，导致检索结果异常，原因是忽略了向量维度与向量模型绑定的约束。

## 怎么确认配好了
- 核对对话模型的引用预算参数，确认处于本档区间内
- 检查向量模型的单段最大token与分块长度配置，确认符合预设要求
- 执行检索测试，查看返回的知识库片段是否正常加载且未出现异常截断
- 验证系统在更换向量模型时，是否提示需重新生成知识库索引
