---
title: 引用预算 4K–8K的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径
slug: /zh/combo/combo-q8k-openai01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是单轮对话中留给上下文引用内容的token预算，限定了所有引用分段的总token数上限。当前对话模型档的预算区间为4000至8000 tokens，该范围适配多数知识库应用的中长文档问答场景，既能承载足够的上下文关联信息，支撑多分段的语义整合，又能合理分配模型推理资源"
language: zh
axis_model_tier: "引用预算 4K–8K"
covered_models: "glm-4v-flash、ERNIE-4.0-8K、ERNIE-4.0-Turbo-8K、ERNIE-Lite-8K、hunyuan-turbo-vision、hunyuan-vision、moonshot-v1-8k、moonshot-v1-8k-vision-preview、generalv3、generalv3.5、4.0Ultra、step-1-flash、step-1-8k、step-1v-8k、step-2-mini、step-2-16k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 4K–8K的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是单轮对话中留给上下文引用内容的token预算，限定了所有引用分段的总token数上限。当前对话模型档的预算区间为4000至8000 tokens，该范围适配多数知识库应用的中长文档问答场景，既能承载足够的上下文关联信息，支撑多分段的语义整合，又能合理分配模型推理资源，保障对话响应的稳定性与效率。

## 配 OpenAI 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 与目标向量模型的默认分段长度对齐，保障分段语义完整性与检索匹配精度 |
| `maxToken` | 8000 tokens | 匹配目标向量模型的单段最大接收长度，避免分段超出模型处理阈值 |
| `quoteMaxToken` | 4000-8000 tokens | 遵循当前对话模型档的引用token预算区间，适配单轮对话的上下文承载需求 |
| `chunkSize` | 512-8000 tokens | 可根据文档类型灵活调整，短文本场景适合小分段，长文档可匹配向量模型上限 |
| 分块重叠长度 | 10%-20%的分块长度 | 避免分段割裂上下文，保障相邻分段的语义连贯性 |
| 单次搜索召回上限 | 7-15段 | 匹配当前对话模型档引用预算下的理论最大容纳段数，避免超额度引用 |

## 这两者互相约束的地方
按默认每段512 tokens计算，单轮引用最多可容纳7至15段；当分段长度调至向量模型允许的8000 tokens上限时，单段即可占满当前对话模型的4000至8000 tokens引用预算。分段长度与可容纳段数呈反向关联：每段越长，单段语义完整性越强，但一轮能放下的段数越少；每段越短，段数越多，但单段上下文的完整性越弱。此外，向量模型与向量维度绑定，更换向量模型后，已建立的知识库索引需要重新构建，否则无法正常完成检索匹配。

## 容易做错的三处
- 界面弹出引用额度超限的提示，原因是未根据对话模型的`quoteMaxToken`调整单次召回的分段数量或分段长度。
- 检索得到的分段语义割裂严重，原因是分块重叠长度设置过低，导致相邻分段的上下文关联被切断。
- 更换向量模型后知识库无法正常检索，原因是未重建索引，旧索引的向量维度与新向量模型不匹配。

## 怎么确认配好了
- 查看当前对话模型的`quoteMaxToken`参数，确认其处于指定区间内。
- 检查向量模型的`maxToken`与`defaultToken`参数，确认与配置项的取值匹配。
- 模拟发起一次关联知识库的对话，查看上下文引用区域的内容是否符合预期。
- 测试更换向量模型后，检索功能是否正常运行，确认索引重建已完成。
