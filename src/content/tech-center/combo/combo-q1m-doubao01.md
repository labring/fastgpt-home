---
title: 引用预算 50 万–1000 万的对话模型配 doubao-embedding-large-text-250515 / doubao-embedding-text-240715 的分段与引用口径
slug: /zh/combo/combo-q1m-doubao01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是单轮对话中可引用的知识库内容总token限额，本次选型的对话模型档区间为50万至1000万token。该区间覆盖了从轻量化到大规模的知识库引用需求，既可以支撑长文档拆解后的多段落上下文关联，也能适配复杂查询的多轮背景补充，让应用在处理专业领域问答、长文本总结等场景时"
language: zh
axis_model_tier: "引用预算 50 万–1000 万"
covered_models: "glm-5.3-flash、glm-5.3、glm-5.2、glm-4-long、deepseek-flash、deepseek-v4-flash、deepseek-v4-pro、doubao-seed-evolving、gemini-3.8-flash、gemini-3.7-flash、gemini-3.6-flash、gemini-3.5-flash、gemini-3.1-pro-preview-customtools、gemini-3.1-flash-lite、gemini-3.5-flash-lite、gemini-3.1-pro-preview、gemini-3.1-pro、gemini-3-flash-preview、gemini-3-flash、gemini-2.5-pro、gemini-2.5-flash、gemini-2.5-flash-lite、grok-4.5、grok-4.6、grok-4.3、grok-4.20-multi-agent-0309、grok-4.20-0309-reasoning、grok-4.20-0309-non-reasoning、hy4-preview、MiniMax-M3、MiniMax-M1、kimi-k3、gpt-6-astra、gpt-5.6、gpt-5.6-sol、gpt-5.6-terra、gpt-5.6-luna、gpt-5.5、gpt-5.5-pro、gpt-5.4、gpt-5.4-pro、gpt-4.1、gpt-4.1-mini、gpt-4.1-nano、qwen3.8-max、qwen3.8-flash、qwen3.7-max、qwen3.7-plus、qwen3.7-flash、qwen3.6-plus、qwen3.6-flash、qwen3.5-flash、qwen3.5-plus、qwen-plus、qwen-turbo、qwen-flash、qwen3-coder-plus、qwen3-coder-flash、qwen-long"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 50 万–1000 万的对话模型配 doubao-embedding-large-text-250515 / doubao-embedding-text-240715 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是单轮对话中可引用的知识库内容总token限额，本次选型的对话模型档区间为50万至1000万token。该区间覆盖了从轻量化到大规模的知识库引用需求，既可以支撑长文档拆解后的多段落上下文关联，也能适配复杂查询的多轮背景补充，让应用在处理专业领域问答、长文本总结等场景时，能获取足够的有效背景信息，同时合理控制上下文资源占用。

## 配 Doubao 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| ---- | ---- | ---- |
| `defaultToken` | 512 tokens | 对应选型向量模型登记的默认每段长度，匹配基础分块逻辑 |
| `maxToken` | 4096 tokens | 为选型向量模型允许的单段输入上限，避免超出模型处理阈值 |
| `quoteMaxToken` | 50万–1000万 tokens | 匹配当前选型的对话模型档引用预算，确保引用内容总token符合模型限制 |
| `chunkSize` | 512 tokens / 4096 tokens | 可根据场景选择，对应向量模型默认或上限分块长度 |
| 分块重叠长度 | 64–128 tokens | 保留段落间语义关联，避免关键信息被分块截断 |
| 单次搜索上限 | 按场景调整 | 结合引用预算与分块长度，控制单次召回的总token不超限额 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可放下约976–19,531段；若将每段调整至向量模型允许的上限4096 tokens，则仅可放下约122段。分块长度越长，单段包含的语义信息越完整，但一轮对话可容纳的段落数越少；分块长度越短，单段上下文越碎片化，但一轮可容纳的段落数更多。更换向量模型后，因向量维度与原模型绑定，已创建的知识库索引需要重新构建才能适配新模型。

## 容易做错的三处
- 单轮对话返回时出现上下文截断提示，原因是引用内容总token超出了`quoteMaxToken`的限额。
- 向量检索返回的结果与查询相关性较低，原因是分块长度设置过短，导致单段语义被拆分，检索时无法匹配完整语义关联。
- 更换向量模型后知识库无法正常召回内容，原因是未重新构建与新向量模型匹配的知识库索引。

## 怎么确认配好了
- 查看对话模型的`quoteMaxToken`配置项，确认取值在50万–1000万 tokens区间内。
- 检查向量模型的`maxToken`与`defaultToken`配置，确认与选型的向量模型参数一致。
- 测试分块长度设置，验证不同长度下的段落拆分逻辑符合预期。
- 执行一次完整的知识库检索，确认召回的段落总token未超出对话模型的引用预算。
