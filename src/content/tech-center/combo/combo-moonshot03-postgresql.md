---
title: Moonshot 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-moonshot03-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`moonshot-v1-8k` 模型提供了 8000 tokens 的上下文窗口，这意味着单次请求中可以输入和输出的总量上限。在 RAG 场景下，这直接决定了能够塞入模型的知识库召回内容总量。尽管单次最大输出未明确标注，但通常会受限于整体上下文窗口。6000 tokens 的引用上限，则为知识库召"
language: zh
axis_model_tier: "Moonshot / 8000 /  / 6000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "moonshot-v1-8k"
check_day: 2026-09-29
meta_title: Moonshot 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `moonshot-v1-8k` 模型提供了 8000 tokens 的上下文窗口，这意味着单次请求中可以输入和输出的总量上限。在 RAG 场景下，这直接决定了能够塞入模型的知识库召回内容总量。尽管单次最大输出未明确标注，但通常会受限于整体上下文窗口。6000 tokens 的引用上限，则为知识库召
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`moonshot-v1-8k` 模型提供了 8000 tokens 的上下文窗口，这意味着单次请求中可以输入和输出的总量上限。在 RAG 场景下，这直接决定了能够塞入模型的知识库召回内容总量。尽管单次最大输出未明确标注，但通常会受限于整体上下文窗口。6000 tokens 的引用上限，则为知识库召回段落数设定了实际的天花板，超出此限制的引用内容将无法被模型有效利用。工具调用功能的存在，表明该模型支持通过函数调用扩展能力，而 `图片输入 false` 则明确了其不具备多模态图像理解能力。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 连接 FastGPT 到 pgvector 数据库的必要凭证。 |
| `ef_construction` | `64` 到 `128` | 影响索引构建时的图结构质量和搜索准确性，通常越大越好，但会增加构建时间。 |
| `ef_search` | `32` 到 `64` | 影响查询时的图遍历范围，越大搜索精度越高，但响应时间也越长。 |
| `m` | `32` | HNSW 索引中每个节点连接的最大邻居数量，影响索引质量和存储开销。 |
| 向量维度 | `1536` | 需与模型嵌入向量的输出维度保持一致，确保向量能够正确存储。 |
| 召回条数 | 前 `5` 到 `8` 条 | 结合模型引用上限和单段文本长度，避免超出模型上下文。 |

## 这两者互相约束的地方
模型 8000 tokens 的上下文预算是核心约束。知识库召回的条数乘以每段文本的平均长度，其总和必须远小于此预算，以留出空间给用户提问、指令以及模型生成回答。引用上限 6000 tokens 则进一步限制了模型实际能引用的知识内容量。即使向量库返回了大量相关条目，模型也只会处理不超过 6000 tokens 的引用内容。因此，向量库的召回条数配置，应优先考虑不超过模型引用上限所允许的段落数量。`ef_construction` 和 `ef_search` 等索引参数的调大，会提升召回的精确性，但也可能增加向量搜索的延迟，这在一定程度上会影响到模型响应的整体时间，需要权衡。

## 容易做错的三处
* 模型回复内容过短或不完整：通常是由于知识库召回内容过少，未能提供足够信息支撑模型生成完整回答。
* 出现 `Context window exceeded` 错误：表明召回内容加上用户输入，总长度超出了模型的 8000 tokens 上下文限制。
* 向量搜索响应时间过长：可能是 `ef_search` 设置过大，导致向量库查询开销过高。

## 怎么确认配好了
* 检查 FastGPT 后台日志，确认 `PG_URL` 连接成功，没有数据库连接错误信息。
* 在 FastGPT 知识库管理页面，上传文档并进行一次向量化，观察过程是否顺利，没有出现 `pgvector` 相关的索引构建失败提示。
* 针对特定问题进行提问，观察模型回答中是否能准确引用知识库内容，且引用内容的总长度在 6000 tokens 限制内。
* 使用数据库工具直接查询 `pg_stat_statements` 或 `pg_stat_activity`，检查向量搜索查询的平均响应时间，并与预期阈值进行比对。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
