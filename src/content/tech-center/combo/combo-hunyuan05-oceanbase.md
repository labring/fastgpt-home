---
title: Hunyuan 28K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-hunyuan05-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 28K 模型，其 `maxContext` 为 28000 tokens，意味着单次请求可以处理的总输入文本长度上限。`quoteMaxToken` 为 28000 tokens，这表示模型在生成回答时，用于引用的内容总预算是 28000 tokens。引用上限是引用内容合计占的 t"
language: zh
axis_model_tier: "Hunyuan / 28000 /  / 28000 / false / false"
axis_vector_db: "OceanBase"
covered_models: "hunyuan-pro"
check_day: 2026-09-29
meta_title: Hunyuan 28K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Hunyuan 28K 模型，其 `maxContext` 为 28000 tokens，意味着单次请求可以处理的总输入文本长度上限。`quoteMaxToken` 为 28000 tokens，这表示模型在生成回答时，用于引用的内容总预算是 28000 tokens。引用上限是引用内容合计占的 t
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 28K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 28K 模型，其 `maxContext` 为 28000 tokens，意味着单次请求可以处理的总输入文本长度上限。`quoteMaxToken` 为 28000 tokens，这表示模型在生成回答时，用于引用的内容总预算是 28000 tokens。引用上限是引用内容合计占的 token 数量，段落条数由检索侧的返回条数决定，两者是不同的量。模型不支持图片输入，因此无法处理图像信息。同时，由于 `tool_calling` 为 `false`，该模型不具备直接调用外部工具的能力。

## 配 OceanBase 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OCEANBASE_URL` | `ob://user:pass@host:port/database` | 连接 OceanBase 数据库的必要参数，确保服务可达。 |
| `ef_construction` | `100` | OceanBase 向量索引构建时邻居数量的参数，影响索引质量和构建时间。 |
| `m` | `16` | HNSW 索引中每个节点连接的最大邻居数，影响召回精度和查询速度。 |
| `chunk_size` | `800–1200 字符` | 文本切分时每个块的理想大小，需适配模型上下文和引用上限。 |
| `top_k` | `5–10` | 向量检索时返回的相似度最高的文档块数量，直接影响召回条数。 |

## 这两者互相约束的地方
Hunyuan 28K 模型 `maxContext` 的 28000 tokens 限制，直接影响了 OceanBase 检索结果的可用性。如果向量库返回的段落条数过多，或者每段文本过长，导致召回内容的总 token 数超出模型的上下文预算，模型将无法处理全部信息。引用上限按 token 计，向量库返回的按条数计，两者需协调。引用上限 `quoteMaxToken` 决定了模型最终能够引用的内容总 token 数，而 OceanBase 返回的是具体文档块的条数。当每段文本的平均 token 数较高时，引用上限会限制可引用的段落条数；当每段文本较短时，则可引用更多段落。OceanBase 的索引参数 `ef_construction` 和 `m` 调大，通常会提升检索精度，但也可能增加索引构建和查询的资源消耗，这在处理大量数据时需要权衡，以确保检索效率不会影响整体响应时间。SEEKDB 与 OceanBase 使用同一套控制器实现，配置口径相同，在配置时可以参考此处的建议。

## 容易做错的三处
*   错误信息显示 `Context window exceeded`：原因在于向量检索返回的文本总长度超过了模型 `maxContext` 限制。
*   模型回答中引用的内容不完整或缺失关键信息：原因可能是 `quoteMaxToken` 设置过小，导致模型只能引用部分召回内容。
*   向量检索耗时过长，导致整体响应超时：原因可能是 OceanBase 的 `ef_construction` 或 `m` 参数设置过大，导致索引构建或查询效率下降。

## 怎么确认配好了
*   在 FastGPT 界面中，上传文档并进行提问，观察模型回答是否能有效引用文档内容。
*   通过 FastGPT 的日志系统，检查每次模型调用的 `maxContext` 和 `quoteMaxToken` 使用情况，确保未超限。
*   对不同长度和复杂度的查询进行测试，监控 OceanBase 的查询响应时间，确保在可接受范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
