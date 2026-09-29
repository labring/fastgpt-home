---
title: Moonshot 1048K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-moonshot01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot 的 `kimi-k3` 模型，其上下文长度高达 1048576 token，意味着单次请求能处理的海量信息。这直接决定了知识库召回内容的总量上限，允许工程师在 RAG 流程中注入更长的文档段落或更多的召回条目。模型虽未标注单次最大输出，但其引用上限为 1000000 token，为"
language: zh
axis_model_tier: "Moonshot / 1048576 /  / 1000000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "kimi-k3"
check_day: 2026-09-29
meta_title: Moonshot 1048K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Moonshot 的 `kimi-k3` 模型，其上下文长度高达 1048576 token，意味着单次请求能处理的海量信息。这直接决定了知识库召回内容的总量上限，允许工程师在 RAG 流程中注入更长的文档段落或更多的召回条目。模型虽未标注单次最大输出，但其引用上限为 1000000 token，为
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 1048K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Moonshot 的 `kimi-k3` 模型，其上下文长度高达 1048576 token，意味着单次请求能处理的海量信息。这直接决定了知识库召回内容的总量上限，允许工程师在 RAG 流程中注入更长的文档段落或更多的召回条目。模型虽未标注单次最大输出，但其引用上限为 1000000 token，为知识库引用提供了极大的缓冲空间，确保即使在复杂问答场景下也能充分利用召回信息。图片输入和工具调用能力的存在，则表明此模型可接入多模态数据处理流程和复杂的 Agent 工作流。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :----- | :----- |
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接数据库的统一入口，需包含完整认证信息。 |
| `ef_construction` | `100` 到 `200` | 影响索引构建时的图连接数，越大召回质量越高，但索引构建时间越长。 |
| `ef_search` | `64` 到 `128` | 影响搜索时的图遍历深度，越大召回质量越高，但查询延迟越高。 |
| `m` | `32` | HNSW 图中每层连接的最大邻居数，影响索引大小和查询性能。 |
| `vector_ip_ops` | `true` (或 `ON`) | 启用内部产品操作，针对 IP 地址或特定数值进行优化，提升相关场景性能。 |
| 召回条数 | `10` 到 `20` 条 | 结合模型上下文长度和单条文档长度，避免超出模型处理上限。 |

## 这两者互相约束的地方
模型上下文长度与向量召回条数、单条文档长度之间存在直接制约。Moonshot `kimi-k3` 的 1048576 token 上下文预算，意味着召回条数与每段召回内容的 token 长度乘积，必须远小于此上限，以预留出给指令、问题和回答的足够空间。引用上限 1000000 token 提供了大量引用内容的空间，但实际召回条数还会受到向量库返回条数的限制。即使向量库配置了返回 50 条，如果模型上下文预算不足，最终传入模型的引用内容仍会截断。PostgreSQL（pgvector）的 `ef_construction` 和 `ef_search` 参数调高后，会提升召回的准确性，但同时也会增加查询延迟。这种延迟在与模型交互时，可能会导致整体响应时间变长，尤其是在需要多次向量检索的复杂 Agent 流程中。

## 容易做错的三处
- 日志显示 `PG: connection timeout`：`PG_URL` 配置错误，导致 FastGPT 无法连接到 PostgreSQL 数据库。
- 召回的知识段落与问题相关性差，但数量足够：`ef_search` 参数设置过低，导致 pgvector 在搜索时未能充分探索向量空间。
- 模型返回的回答中知识引用不完整或缺失关键信息：传入模型的引用内容总 token 数超出了模型实际可处理的上限，或向量库召回条数不足。

## 怎么确认配好了
- 通过 FastGPT 后台测试连接功能，验证 `PG_URL` 配置的 PostgreSQL 数据库能正常连通。
- 运行一组测试查询，观察 pgvector 返回的召回条数是否符合预期，并检查召回内容的语义相关性。相关性评估应基于实际业务场景中的样本问题。
- 对比不同 `ef_search` 和 `ef_construction` 参数设置下的查询延迟和召回质量，找到满足业务需求的平衡点。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
