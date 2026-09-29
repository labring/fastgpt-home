---
title: StepFun 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-stepfun07-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "StepFun 8K 上下文模型，其上下文长度为 8000 token，这决定了单次请求中模型能够处理的输入总量，包括用户查询、系统指令以及召回的引用内容。引用上限为 8000 token，这意味着模型在生成回复时，可以从知识库中引用的内容总计不能超过这个 token 预算。引用内容的条数由检索系统"
language: zh
axis_model_tier: "StepFun / 8000 /  / 8000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "step-1-8k"
check_day: 2026-09-29
meta_title: StepFun 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: StepFun 8K 上下文模型，其上下文长度为 8000 token，这决定了单次请求中模型能够处理的输入总量，包括用户查询、系统指令以及召回的引用内容。引用上限为 8000 token，这意味着模型在生成回复时，可以从知识库中引用的内容总计不能超过这个 token 预算。引用内容的条数由检索系统
date_published: 2026-09-29
date_modified: 2026-09-29
---

# StepFun 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
StepFun 8K 上下文模型，其上下文长度为 8000 token，这决定了单次请求中模型能够处理的输入总量，包括用户查询、系统指令以及召回的引用内容。引用上限为 8000 token，这意味着模型在生成回复时，可以从知识库中引用的内容总计不能超过这个 token 预算。引用内容的条数由检索系统决定，而引用上限限定了这些条目转换为 token 后的总量。该模型不支持图片输入和工具调用，因此基于这些功能的特定链路将无法启用。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的标准连接字符串 |
| `ef_construction` | `64` | 构建 HNSW 索引时的邻居搜索参数，影响索引构建速度和查询精度 |
| `ef_search` | `40` | 查询 HNSW 索引时的邻居搜索参数，影响查询速度和召回率 |
| `m` | `32` | HNSW 索引中每个节点的最大邻居数，影响索引大小和查询性能 |
| `vector_dimensions` | `1536` | 向量维度，需与嵌入模型输出的维度保持一致 |
| `hnsw.distance_op` | `vector_ip_ops` | 向量距离计算方式，使用内积距离更适合语义相似度检索 |

## 这两者互相约束的地方
模型的上下文长度和引用上限，与 PostgreSQL（pgvector） 的召回结果之间存在紧密关联。召回条数乘以每段内容的平均 token 长度，不能超过模型的总上下文预算。引用上限限制了所有召回内容转换为 token 后的总量，而向量库返回的是固定数量的段落条数。当每段内容的长度较长时，引用上限可能会先于条数限制达到；当每段内容较短时，条数限制可能先达到。此外，PostgreSQL（pgvector） 的索引参数，例如 `ef_construction` 和 `ef_search`，调大后可以提高检索精度，这意味着向量库能够更准确地找到与查询相关的段落。这些更相关的段落被送入模型，有助于模型在 8000 token 的引用预算内获得更高质量的信息，从而提升模型回复的准确性和相关性。

## 容易做错的三处
*   模型回复出现截断，并提示上下文超出限制：原因在于召回内容与用户查询的总 token 数超过了 8000 的上下文长度。
*   检索结果相关性差，模型回答不准确：原因可能是 `ef_search` 参数设置过低，导致 HNSW 索引查询时没有搜索足够多的邻居。
*   数据库连接失败，日志显示 `PG_URL` 错误：原因在于 `PG_URL` 环境变量的格式或凭证信息不正确。

## 怎么确认配好了
*   运行一次带知识库的查询，检查 FastGPT 系统日志，确认 PostgreSQL（pgvector） 数据库连接成功，且没有出现连接超时或认证失败的错误码。
*   进行多次不同主题的知识库查询，观察模型回复是否充分利用了召回内容，并与期望的引用上限和上下文长度进行对比，以此评估引用内容的 token 占比。
*   通过 FastGPT 提供的调试工具，查看每次查询召回的原始文本内容和对应的向量相似度分数，以此评估 `ef_search` 和 `m` 参数下 HNSW 索引的召回质量。
*   模拟高并发查询场景，监控 PostgreSQL 数据库的 CPU、内存和 I/O 使用情况，确认 `ef_construction` 和 `ef_search` 参数在当前负载下不会导致性能瓶颈。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
