---
title: Yi 16K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-yi01-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`yi-lightning` 模型具备 16000 的上下文长度，意味着单次请求可以处理约 16000 个 token 的输入。这决定了能够塞入模型的召回内容总量。模型未标注单次最大输出，通常由模型本身或平台限制。引用上限为 12000，这限制了知识库召回段落的总 token 数，直接影响了最终呈现"
language: zh
axis_model_tier: "Yi / 16000 /  / 12000 / false / false"
axis_vector_db: "openGauss"
covered_models: "yi-lightning"
check_day: 2026-09-29
meta_title: Yi 16K 上下文 这一档模型配 openGauss 的配置口径
meta_description: `yi-lightning` 模型具备 16000 的上下文长度，意味着单次请求可以处理约 16000 个 token 的输入。这决定了能够塞入模型的召回内容总量。模型未标注单次最大输出，通常由模型本身或平台限制。引用上限为 12000，这限制了知识库召回段落的总 token 数，直接影响了最终呈现
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Yi 16K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
`yi-lightning` 模型具备 16000 的上下文长度，意味着单次请求可以处理约 16000 个 token 的输入。这决定了能够塞入模型的召回内容总量。模型未标注单次最大输出，通常由模型本身或平台限制。引用上限为 12000，这限制了知识库召回段落的总 token 数，直接影响了最终呈现给模型的引用内容量。模型不支持图片输入和工具调用，因此基于图片内容理解和外部工具调用的 RAG 链路无法通过此模型实现。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的标准连接字符串格式。 |
| `ef_construction` | `64` – `128` | HNSW 索引构建参数，影响索引质量和构建速度。此范围可在保证召回质量的同时控制资源消耗。 |
| `ef_search` | `32` – `64` | HNSW 索引搜索参数，影响搜索精度和速度。应大于或等于 `top_k`。 |
| `m` (HNSW索引参数) | `32` | HNSW 索引层级参数，影响图的连接度。较高的 `m` 值会增加索引构建时间和内存消耗，但可能提高召回精度。 |
| 召回条数 | `10` – `20` | 结合模型引用上限和单段文本长度，控制向量库返回的段落数量。 |
| 单段文本长度 | `500` – `1000` 字符 | 确保召回的单个文本段落包含足够信息，同时避免单段过长，挤占模型上下文。 |

## 这两者互相约束的地方
召回条数与每段文本长度的乘积，加上系统指令和其他固定输入，必须严格控制在 16000 token 的上下文长度预算内。如果召回内容超出此限制，模型将无法处理全部输入。模型的引用上限 12000 token 设定了最终传递给模型的知识库引用内容的天花板。这意味着即使向量库返回了大量内容，最终也会被截断到 12000 token。向量库的 `top_k` 参数（即召回条数）与引用上限共同作用，确保不会过度召回或召回内容被大量丢弃。当 openGauss 的索引参数 `ef_construction` 或 `m` 调大时，通常会提高向量搜索的精度，这对于 `yi-lightning` 模型来说，意味着更有可能获得高质量的召回内容，从而提升回答的准确性，但同时也会增加索引构建和查询的资源开销。

## 容易做错的三处
*   API 调用返回 `400 Bad Request` 错误，内容提示 `input tokens exceeded limit`。原因是没有正确估算召回内容的总 token 数，导致超过 16000 的上下文长度。
*   回答内容中知识库引用部分为空或不相关。原因可能是 openGauss 的 `ef_search` 参数设置过低，导致召回精度不足，未能检索到最相关的知识段落。
*   FastGPT 后台日志显示查询 openGauss 超时。原因可能是 `ef_construction` 或 `m` 参数设置过高，导致索引构建或查询过于耗时，尤其是在数据量较大时。

## 怎么确认配好了
*   在 FastGPT 知识库测试界面，使用典型问题进行查询，观察返回的知识库引用内容是否相关且完整。通过调整召回条数和单段文本长度，确保引用总 token 数在 12000 限制内。
*   监控 openGauss 数据库的查询日志，确认 `ef_search` 和 `m` 参数生效，并且查询响应时间在可接受范围内。如果查询耗时过长，应考虑调整索引参数。
*   通过 FastGPT 的模型调用日志，检查每次请求传递给 `yi-lightning` 模型的输入 token 数量，确保其稳定在 16000 token 限制之内，没有出现截断或超限。
*   模拟高并发场景，评估 openGauss 数据库在当前配置下，能否稳定处理 FastGPT 的向量搜索请求，并保持合理的延迟。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
