---
title: 引用预算 50 万–1000 万的对话模型配 jina-embeddings-v5-text-nano / jina-embeddings-v3 的分段与引用口径
slug: /zh/combo/combo-q1m-jina02
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是单轮对话中可插入的引用内容总 token 预算，直接限定了引用内容的总消耗额度。这一档 50 万–1000 万 token 的区间，能够支撑大规模知识库的上下文引用需求，适配多文档整合、长文本问答等复杂场景，无需为控制 token 消耗过度精简引用内容，保障回答的信"
language: zh
axis_model_tier: "引用预算 50 万–1000 万"
covered_models: "glm-5.3-flash、glm-5.3、glm-5.2、glm-4-long、deepseek-flash、deepseek-v4-flash、deepseek-v4-pro、doubao-seed-evolving、gemini-3.8-flash、gemini-3.7-flash、gemini-3.6-flash、gemini-3.5-flash、gemini-3.1-pro-preview-customtools、gemini-3.1-flash-lite、gemini-3.5-flash-lite、gemini-3.1-pro-preview、gemini-3.1-pro、gemini-3-flash-preview、gemini-3-flash、gemini-2.5-pro、gemini-2.5-flash、gemini-2.5-flash-lite、grok-4.5、grok-4.6、grok-4.3、grok-4.20-multi-agent-0309、grok-4.20-0309-reasoning、grok-4.20-0309-non-reasoning、hy4-preview、MiniMax-M3、MiniMax-M1、kimi-k3、gpt-6-astra、gpt-5.6、gpt-5.6-sol、gpt-5.6-terra、gpt-5.6-luna、gpt-5.5、gpt-5.5-pro、gpt-5.4、gpt-5.4-pro、gpt-4.1、gpt-4.1-mini、gpt-4.1-nano、qwen3.8-max、qwen3.8-flash、qwen3.7-max、qwen3.7-plus、qwen3.7-flash、qwen3.6-plus、qwen3.6-flash、qwen3.5-flash、qwen3.5-plus、qwen-plus、qwen-turbo、qwen-flash、qwen3-coder-plus、qwen3-coder-flash、qwen-long"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 50 万–1000 万的对话模型配 jina-embeddings-v5-text-nano / jina-embeddings-v3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是单轮对话中可插入的引用内容总 token 预算，直接限定了引用内容的总消耗额度。这一档 50 万–1000 万 token 的区间，能够支撑大规模知识库的上下文引用需求，适配多文档整合、长文本问答等复杂场景，无需为控制 token 消耗过度精简引用内容，保障回答的信息完整性与准确性。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配向量模型登记的默认每段长度，保障基础分块的语义完整性与检索效率 |
| `maxToken` | 8000 | 遵循向量模型允许的单段最大 token 上限，避免超出模型处理边界 |
| `quoteMaxToken` | 500000–10000000 | 匹配对话模型档的引用预算区间，适配长上下文引用需求 |
| `chunkSize` | 512–8000 | 可根据场景调整，短分段适配高频检索，长分段保障单段语义完整 |
| 重叠长度 | 10%–20%的分块长度 | 避免分块割裂语义，保障相邻分块的上下文连贯性 |
| 单次搜索上限 | 对应引用预算的分段数区间 | 控制单次召回的总 token 不超出对话模型的引用预算 |
| 最低相关度 | 0.3–0.7 | 过滤低相关内容，避免无效引用占用 token 预算 |

## 这两者互相约束的地方
当该对话模型档与该向量模型组合时，按默认每段 512 tokens 计算，一轮引用最多可放下约 976–19,531 段；若将每段调整至向量模型允许的 8000 tokens 上限，则仅能放下约 62 段。每段长度越长，单段承载的语义越完整，但一轮可容纳的分段数量越少；每段长度越短，可容纳的分段数量越多，但单段上下文的连贯性越弱。更换向量模型后，已创建的知识库索引需要重建，因为向量维度与向量模型绑定，旧索引无法适配新模型的向量计算逻辑。

## 容易做错的三处
- 界面显示引用内容超出预算报错，原因是未正确设置`quoteMaxToken`区间，导致召回的总token超出对话模型限制。
- 检索结果出现大量低相关片段，原因是未设置合理的最低相关度阈值，无效内容占用了过多引用token预算。
- 更换向量模型后知识库无法正常检索，原因是未重建索引，新旧向量模型的向量维度与计算逻辑不匹配。

## 怎么确认配好了
- 查看对话模型的配置面板，确认`quoteMaxToken`处于50万–1000万token区间。
- 检查向量模型的配置参数，确认`defaultToken`与`maxToken`匹配对应设置。
- 发起测试查询，查看返回结果的引用内容未触发异常报错。
- 验证知识库分块设置，确认`chunkSize`符合预设的分段要求。
