---
title: Ernie 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-ernie02-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 64K 上下文模型系列，包括 `ernie-x1.1-preview` 和 `ernie-x1.1`，其 64000 的上下文长度是核心约束，决定了单次请求中可供模型参考的知识量上限。引用上限 55000 意味着在知识召回环节，模型能够处理的引用内容总量。工具调用功能允许模型与外部系统交"
language: zh
axis_model_tier: "Ernie / 64000 /  / 55000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "ernie-x1.1-preview、ernie-x1.1"
check_day: 2026-09-29
meta_title: Ernie 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Ernie 64K 上下文模型系列，包括 `ernie-x1.1-preview` 和 `ernie-x1.1`，其 64000 的上下文长度是核心约束，决定了单次请求中可供模型参考的知识量上限。引用上限 55000 意味着在知识召回环节，模型能够处理的引用内容总量。工具调用功能允许模型与外部系统交
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么

Ernie 64K 上下文模型系列，包括 `ernie-x1.1-preview` 和 `ernie-x1.1`，其 64000 的上下文长度是核心约束，决定了单次请求中可供模型参考的知识量上限。引用上限 55000 意味着在知识召回环节，模型能够处理的引用内容总量。工具调用功能允许模型与外部系统交互，扩展其解决问题的能力，而图片输入为 `false` 则表明此档模型不具备直接处理图像信息的能力。这些参数共同界定了模型在 FastGPT 平台中进行 RAG（检索增强生成）和 Agent 任务时的工程边界。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接的标准化格式，确保 FastGPT 能正确连接。 |
| `ef_construction` | `80` | 控制 HNSW 索引的构建质量，数值越大构建时间越长，但召回精度更高。 |
| `ef_search` | `60` | 控制 HNSW 索引的查询质量，数值越大查询时间越长，但召回精度更高。 |
| `m` | `32` | HNSW 索引的图层最大连接数，影响索引大小和查询性能。 |
| `vector_ip_ops` | `true` | pgvector 扩展使用内积操作，与 FastGPT 向量化模型输出兼容。 |
| 召回条数 | `8–12` 条 | 经验值，平衡召回质量与上下文长度，避免超出模型引用上限。 |

## 这两者互相约束的地方

模型上下文长度与向量库召回条数及每段长度之间存在直接约束。Ernie 64K 上下文模型的 64000 上下文长度是硬性限制，这意味着召回条数乘以每段长度的总和必须小于此值，以确保所有召回内容都能被模型处理。引用上限 55000 则进一步约束了实际可用于引用的知识段落总长度，即使上下文长度允许，引用内容也不能超过此上限。在实际应用中，FastGPT 会根据模型的引用上限和上下文长度，以及向量库返回的段落数量，进行截断或筛选。PostgreSQL（pgvector）的 `ef_construction` 和 `ef_search` 参数调大，虽然能提升召回精度，但会增加索引构建时间和查询延迟，这在需要快速响应的对话场景下，可能直接影响模型生成回复的速度。

## 容易做错的三处

*   日志显示 `context window exceeded`：原因通常是知识库召回的文本段落总长度超过了 64000 的上下文长度限制。
*   模型回复中知识点缺失：原因是向量召回条数设置过少，或 `ef_search` 参数过低，导致相关性不足的段落被排除。
*   FastGPT 界面显示 `database connection error`：原因为 `PG_URL` 配置错误，如数据库地址、端口、用户名或密码不正确。

## 怎么确认配好了

*   在 FastGPT 知识库管理页面，上传测试文档并进行向量化，观察日志确认 PostgreSQL 数据库连接和数据写入是否正常。
*   在 FastGPT 对话测试界面，针对特定问题进行提问，检查模型回复中是否包含了知识库中的相关信息，并核对引用来源。
*   通过 FastGPT 的调试工具，查看每次请求的上下文内容，确认召回的知识段落数量和总长度是否在模型上下文长度和引用上限范围内。
*   使用 PostgreSQL 客户端工具，查询 `pg_stat_statements` 或 `pg_stat_user_tables`，监测 pgvector 索引的实际查询性能。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
