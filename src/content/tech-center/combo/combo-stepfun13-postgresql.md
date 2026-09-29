---
title: StepFun 16K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-stepfun13-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "StepFun 16K 上下文模型提供了 16000 token 的上下文长度，这意味着一次请求中可以包含较长的输入内容。引用上限为 4000 token，这部分预算专用于承载从知识库中检索到的引用内容。段落条数由检索逻辑决定，而引用上限则限制了这些引用内容的总 token 数量。模型不具备图片输入"
language: zh
axis_model_tier: "StepFun / 16000 /  / 4000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "step-2-16k"
check_day: 2026-09-29
meta_title: StepFun 16K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: StepFun 16K 上下文模型提供了 16000 token 的上下文长度，这意味着一次请求中可以包含较长的输入内容。引用上限为 4000 token，这部分预算专用于承载从知识库中检索到的引用内容。段落条数由检索逻辑决定，而引用上限则限制了这些引用内容的总 token 数量。模型不具备图片输入
date_published: 2026-09-29
date_modified: 2026-09-29
---

# StepFun 16K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
StepFun 16K 上下文模型提供了 16000 token 的上下文长度，这意味着一次请求中可以包含较长的输入内容。引用上限为 4000 token，这部分预算专用于承载从知识库中检索到的引用内容。段落条数由检索逻辑决定，而引用上限则限制了这些引用内容的总 token 数量。模型不具备图片输入和工具调用能力，因此在设计 RAG 链路时无需考虑这些功能集成，专注于纯文本的召回与生成。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :---- | :------- | :----------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量与构建时间，通常取 `m` 的两倍 |
| `ef_search` | `32` | HNSW 搜索参数，影响召回精度与查询延迟，通常与 `m` 相等或略大 |
| `m` | `32` | HNSW 图结构参数，影响内存占用和查询性能，建议取 `16` 到 `64` 之间 |
| `vector_ip_ops` | `true` | 使用内积（Inner Product）作为距离度量，适用于 StepFun 模型嵌入向量 |
| `max_connections` | `按实测标定` | 数据库最大连接数，根据并发请求量和服务器资源调整 |

## 这两者互相约束的地方
StepFun 16K 上下文模型与 PostgreSQL（pgvector）的集成需要关注几个关键点。模型的总上下文长度为 16000 token，其中引用内容的预算为 4000 token。这意味着从 pgvector 召回的文本段落总计不能超过 4000 token。向量库返回的是条数，而模型的引用上限是按 token 计数的，因此，每段文本的平均长度决定了在达到引用上限前能召回多少条段落。如果每段文本较短，可以召回更多条；如果较长，则条数会减少。pgvector 的索引参数 `ef_construction` 和 `ef_search` 调大，会提升召回的准确性，这有助于模型获取更相关的上下文，从而可能减少需要召回的段落总数，以满足 4000 token 的引用预算。

## 容易做错的三处
*   日志显示 `PG::ConnectionBad: could not connect to server`：`PG_URL` 配置错误或数据库服务未启动。
*   检索结果为空或不相关：`ef_search` 设置过低，导致召回精度不足。
*   模型输出内容过短或不完整：召回的引用内容总 token 数低于 4000，且模型 `maxTokens` 未充分利用。

## 怎么确认配好了
*   通过 FastGPT 调试界面，检查模型返回结果中引用的内容是否与 pgvector 中存储的原始文本一致。
*   监控 PostgreSQL 数据库的查询日志，确认 `pg_vector_similarity` 函数被正确调用，并观察查询延迟。
*   在 FastGPT 中进行多次问答测试，确保在不同查询下，引用的文本段落数量和总 token 数在预期范围内，且不超过 4000 token 的引用上限。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
