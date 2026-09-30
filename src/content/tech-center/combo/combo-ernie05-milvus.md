---
title: Ernie 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-ernie05-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型具备 128000 的上下文长度，这意味着单次请求可以处理相当规模的输入文本。在 FastGPT 中，这直接映射为 `maxContext` 参数的上限。虽然单次最大输出长度未明确标注，但通常足以支持生成较长的回答内容。引用上限为 123000 token，这笔预算专"
language: zh
axis_model_tier: "Ernie / 128000 /  / 123000 / true / false"
axis_vector_db: "Milvus"
covered_models: "ernie-4.5-turbo-vl"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Ernie 128K 上下文模型具备 128000 的上下文长度，这意味着单次请求可以处理相当规模的输入文本。在 FastGPT 中，这直接映射为 `maxContext` 参数的上限。虽然单次最大输出长度未明确标注，但通常足以支持生成较长的回答内容。引用上限为 123000 token，这笔预算专
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型具备 128000 的上下文长度，这意味着单次请求可以处理相当规模的输入文本。在 FastGPT 中，这直接映射为 `maxContext` 参数的上限。虽然单次最大输出长度未明确标注，但通常足以支持生成较长的回答内容。引用上限为 123000 token，这笔预算专门用于模型在生成回答时可以引用的检索内容。引用上限限定了模型在生成回复时可利用的引用内容的总 token 量。段落条数由向量库的检索结果决定，这两者是相互独立的。此档模型支持图片输入，允许在对话中融入视觉信息。但工具调用功能未开放，因此无法通过模型自动触发外部工具或函数。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `127.0.0.1:19530` 或 `your_milvus_cluster_url` | 连接 Milvus 服务的入口地址，确保 FastGPT 可以访问。 |
| `MILVUS_TOKEN` | 按 Milvus 实例的认证要求配置 | 用于访问 Milvus 的认证凭据，保障数据安全。 |
| `HNSW` | 开启 | `HNSW` 索引类型在平衡检索性能和召回率方面表现优异，适合大规模向量检索。 |
| `IP` | 开启 | `IP` 距离度量适用于文本嵌入等场景，能够有效衡量向量间的相似度。 |
| `topK` | `5` 至 `10` | 检索返回的相似向量条数，平衡召回精度与模型上下文预算。 |
| `maxSegmentLength` | `800` 至 `1200` 字符 | 单个文本段落的最大长度，避免过长段落稀释语义或超出模型输入限制。 |

## 这两者互相约束的地方
模型的上下文长度对向量检索的整体数据量施加了硬性约束。检索返回的条数与每段文本的长度乘积，必须控制在模型 128000 的上下文预算之内，否则可能导致截断或信息丢失。引用上限 123000 token 专门用于模型引用的内容。向量库返回的是按条数计的文本段落，而引用上限是按 token 计的。这意味着当每段文本较短时，可以引用更多条段落；当每段文本较长时，即使条数不多，也可能很快达到引用上限。两者谁先触顶，取决于实际的段落平均长度。将 Milvus 的 `HNSW` 索引参数调大（例如，更高的 `efConstruction` 和 `M` 值），通常可以提升检索的召回率和精度。这意味着模型在生成回答时能获得更相关的上下文信息，潜在地提高回答质量。然而，这也会增加 Milvus 的索引构建和查询开销。

## 容易做错的三处
*   日志显示 `Milvus connection failed: invalid address`：`MILVUS_ADDRESS` 配置错误，无法连接到 Milvus 服务。
*   模型返回的回答中缺乏相关信息，但源文本库中存在：`topK` 设置过低，导致相关度高的向量未被检索到。
*   `quote` 字段为空或内容过少：`maxSegmentLength` 设置过大，或向量检索结果未能充分利用引用上限。

## 怎么确认配好了
*   在 FastGPT 管理界面，检查 Milvus 连接状态显示为“已连接”。
*   执行一次知识库问答，观察模型返回的引用内容是否准确且丰富，并检查 `quote` 字段的 token 计数是否在预期范围内。
*   调整 `topK` 参数，观察不同设置下检索结果的条数和相关性，确定满足业务需求的召回数量。
*   通过 Milvus 的监控指标，确认 `HNSW` 索引的查询延迟和召回率符合性能预期。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
