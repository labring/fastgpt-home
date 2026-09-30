---
title: Groq 131K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-groq04-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型具备 131072 token 的上下文长度，允许在单次对话中处理大量输入信息。单次最大输出长度未明确标注，通常这意味着模型会生成尽可能完整的回复，直至达到内部限制或用户设定的上限。引用上限为 120000 token，这部分预算专用于承载从知识库检索到的相关内容，旨在确保模型有充足的背景"
language: zh
axis_model_tier: "Groq / 131072 /  / 120000 / true / true"
axis_vector_db: "openGauss"
covered_models: "qwen/qwen3.6-27b、meta-llama/llama-4-scout-17b-16e-instruct"
check_day: 2026-09-29
meta_title: Groq 131K 上下文 这一档模型配 openGauss 的配置口径
meta_description: 这一档模型具备 131072 token 的上下文长度，允许在单次对话中处理大量输入信息。单次最大输出长度未明确标注，通常这意味着模型会生成尽可能完整的回复，直至达到内部限制或用户设定的上限。引用上限为 120000 token，这部分预算专用于承载从知识库检索到的相关内容，旨在确保模型有充足的背景
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Groq 131K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么

这一档模型具备 131072 token 的上下文长度，允许在单次对话中处理大量输入信息。单次最大输出长度未明确标注，通常这意味着模型会生成尽可能完整的回复，直至达到内部限制或用户设定的上限。引用上限为 120000 token，这部分预算专用于承载从知识库检索到的相关内容，旨在确保模型有充足的背景信息来生成精确且有依据的回答。引用内容的 token 预算限制的是检索结果内容的总量，而检索侧返回的段落条数是另一个独立量。模型支持工具调用，使得它能够与外部系统交互，执行特定任务。图片输入能力则允许模型处理并理解视觉信息。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 实例的标准 URI 格式。 |
| `ef_construction` | `100–250` | 影响 HNSW 索引构建时的图连接数量，值越大索引质量越高，但构建时间更长。 |
| `ef_search` | `60–120` | 影响 HNSW 索引查询时的邻居搜索范围，值越大召回率越高，但查询耗时更长。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引结构和查询性能的平衡。 |
| `hnsw.distance_method` | `cosine` | 向量相似度计算方法，`cosine` 余弦相似度适用于多数文本嵌入场景。 |
| `chunk_size` | `500–800 字符` | 知识库文档切分粒度，影响单段内容的语义完整性和 token 长度。 |

## 这两者互相约束的地方

这一档模型 131072 token 的上下文长度对 openGauss 检索结果的承载能力构成了直接限制。召回条数与每段内容的长度相乘，其总 token 量必须控制在上下文预算之内。引用上限 120000 token 专门用于检索到的内容，这意味着向量库返回的每一段文本在经过 tokenization 后，总和不能超出此预算。引用上限按 token 计量，而向量库返回的是条数，谁先达到限制取决于每段文本的平均 token 长度。当 openGauss 的 `ef_construction` 或 `ef_search` 等索引参数调大时，通常会提高检索的召回率和精确性，这意味着模型能获得更相关、更全面的背景信息，从而提高其回答质量。然而，更高的召回率也可能导致检索到的内容总 token 量更容易触及引用上限。

## 容易做错的三处

*   日志显示“Context window exceeded”，原因是检索到的内容总 token 量超出了模型上下文限制。
*   界面上模型回复内容明显缺乏细节或关联信息，原因是 openGauss 检索返回的条数过少，未能提供足够的背景。
*   知识库查询响应时间过长，甚至超时，原因是 openGauss 的 `ef_search` 参数设置过高，导致查询计算量过大。

## 怎么确认配好了

*   在 FastGPT 知识库管理界面，上传一个长文档，观察其切分后的段落数量和平均字符长度，与 `chunk_size` 配置对照。
*   模拟一次带有复杂查询的对话，在 FastGPT 后台查看模型实际接收到的引用内容 token 数量，确保其在 120000 token 引用上限内。
*   执行一系列检索请求，监控 openGauss 数据库的查询日志和性能指标，确保 `ef_search` 和 `ef_construction` 的设置不会引起不合理的延迟。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
