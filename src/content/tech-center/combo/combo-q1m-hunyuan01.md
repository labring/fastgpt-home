---
title: 引用预算 50 万–1000 万的对话模型配 hunyuan-embedding 的分段与引用口径
slug: /zh/combo/combo-q1m-hunyuan01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是对话模型允许的引用内容总token预算，限定了一次对话中可带入的检索结果总长度。本档模型的预算区间为50万–1000万tokens，对应知识库应用中可整合的参考内容体量较大，能够支撑多文档关联的复杂问答场景，无需频繁截断参考片段，可更完整地传递源文档的语义信息，适配"
language: zh
axis_model_tier: "引用预算 50 万–1000 万"
covered_models: "glm-5.3-flash、glm-5.3、glm-5.2、glm-4-long、deepseek-flash、deepseek-v4-flash、deepseek-v4-pro、doubao-seed-evolving、gemini-3.8-flash、gemini-3.7-flash、gemini-3.6-flash、gemini-3.5-flash、gemini-3.1-pro-preview-customtools、gemini-3.1-flash-lite、gemini-3.5-flash-lite、gemini-3.1-pro-preview、gemini-3.1-pro、gemini-3-flash-preview、gemini-3-flash、gemini-2.5-pro、gemini-2.5-flash、gemini-2.5-flash-lite、grok-4.5、grok-4.6、grok-4.3、grok-4.20-multi-agent-0309、grok-4.20-0309-reasoning、grok-4.20-0309-non-reasoning、hy4-preview、MiniMax-M3、MiniMax-M1、kimi-k3、gpt-6-astra、gpt-5.6、gpt-5.6-sol、gpt-5.6-terra、gpt-5.6-luna、gpt-5.5、gpt-5.5-pro、gpt-5.4、gpt-5.4-pro、gpt-4.1、gpt-4.1-mini、gpt-4.1-nano、qwen3.8-max、qwen3.8-flash、qwen3.7-max、qwen3.7-plus、qwen3.7-flash、qwen3.6-plus、qwen3.6-flash、qwen3.5-flash、qwen3.5-plus、qwen-plus、qwen-turbo、qwen-flash、qwen3-coder-plus、qwen3-coder-flash、qwen-long"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 50 万–1000 万的对话模型配 hunyuan-embedding 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是对话模型允许的引用内容总token预算，限定了一次对话中可带入的检索结果总长度。本档模型的预算区间为50万–1000万tokens，对应知识库应用中可整合的参考内容体量较大，能够支撑多文档关联的复杂问答场景，无需频繁截断参考片段，可更完整地传递源文档的语义信息，适配对上下文完整性有要求的知识库应用。

## 配 Hunyuan 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| ---- | ---- | ---- |
| `defaultToken` | 512 tokens | 匹配向量模型登记的默认每段长度，无需额外调整即可适配模型原生输入要求 |
| `maxToken` | 1024 tokens | 遵循向量模型登记的单段输入上限，避免因分段过长触发模型报错 |
| `quoteMaxToken` | 500000–10000000 tokens | 沿用本档对话模型的官方配置，确保引用内容不超出模型允许的总预算 |
| `chunkSize` | 512 tokens / 1024 tokens | 对应向量模型的默认或最大单段长度，平衡语义完整性与引用段数 |
| 重叠长度 | 64–128 tokens | 避免分块截断关键语义单元，提升检索召回的连贯性 |
| 单次搜索上限 | 匹配引用预算的分段占比 | 防止单次检索返回过多结果超出总token预算 |

## 这两者互相约束的地方
本组合的引用段数受分段长度与引用预算双重约束。按默认每段512 tokens计算，一轮对话最多可容纳约976–19,531段参考内容；若将分段长度调整至向量模型允许的上限1024 tokens，则仅可容纳约488段。每段越长，单段承载的语义信息越完整，但一轮可引入的参考段数越少；每段越短，可引入的段数越多，但单段上下文的完整性越弱。更换向量模型后，已创建的知识库索引需要重建，因为向量维度与向量模型绑定，旧索引无法适配新模型的编码逻辑。

## 容易做错的三处
- 检索返回的结果超出对话模型的token预算，触发截断或报错。原因：未根据`quoteMaxToken`调整单次搜索的返回条数，导致总引用token超出限制。
- 知识库检索召回的语义片段不连贯。原因：分块长度与向量模型的单段上限不匹配，或重叠长度设置不合理。
- 更换向量模型后，知识库无法正常检索。原因：未重建已有的向量索引，旧索引的向量维度与新模型不兼容。

## 怎么确认配好了
- 核对对话模型的配置项，确认`quoteMaxToken`的取值符合本档区间。
- 查看向量模型绑定设置，确认已选择`hunyuan-embedding`。
- 检查知识库的分块配置，确认分段长度与向量模型的单段要求匹配。
- 发起测试对话，验证检索结果可正常带入对话上下文。
