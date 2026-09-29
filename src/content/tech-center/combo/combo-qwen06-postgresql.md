---
title: Qwen 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-qwen06-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Qwen 128K 上下文模型档位，其上下文长度为 128000 tokens，决定了单次请求中模型能够处理的输入信息总量，包括用户查询和召回的知识内容。引用上限 120000 tokens 则直接限定了知识库召回内容在模型输入中的最大占比。图片输入 `true` 表明模型具备处理图像信息的能力，可"
language: zh
axis_model_tier: "Qwen / 128000 /  / 120000 / true / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "qwen-vl-max、qwen-vl-plus"
check_day: 2026-09-29
meta_title: Qwen 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Qwen 128K 上下文模型档位，其上下文长度为 128000 tokens，决定了单次请求中模型能够处理的输入信息总量，包括用户查询和召回的知识内容。引用上限 120000 tokens 则直接限定了知识库召回内容在模型输入中的最大占比。图片输入 `true` 表明模型具备处理图像信息的能力，可
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Qwen 128K 上下文模型档位，其上下文长度为 128000 tokens，决定了单次请求中模型能够处理的输入信息总量，包括用户查询和召回的知识内容。引用上限 120000 tokens 则直接限定了知识库召回内容在模型输入中的最大占比。图片输入 `true` 表明模型具备处理图像信息的能力，可用于多模态应用场景。工具调用 `false` 则说明此档模型不原生支持通过工具函数扩展能力，需要外部逻辑进行封装。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的标准格式。 |
| `ef_construction` | `64` | 构建 HNSW 索引时的邻居数量，影响索引质量与构建速度。 |
| `ef_search` | `32` | HNSW 搜索时的动态列表大小，影响搜索召回率与查询速度。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，平衡内存占用和搜索性能。 |
| `vector_ip_ops` | `true` | 使用内积（Inner Product）作为相似度度量，与模型嵌入向量特性匹配。 |
| 召回条数 | `10-20` 条 | 平衡召回质量与模型上下文限制，减少不必要的 token 消耗。 |

## 这两者互相约束的地方
Qwen 128K 模型的 128000 tokens 上下文长度是核心约束。知识库召回条数乘以每条内容的平均 token 长度，必须远小于此上限，以预留足够空间给用户查询和模型生成。引用上限 120000 tokens 进一步细化了召回内容的最大可用空间。当 PostgreSQL（pgvector） 返回的召回条数过多，导致总 token 数超出此上限时，需要 FastGPT 内部逻辑进行截断或精简。PostgreSQL（pgvector） 的索引参数 `ef_construction` 和 `ef_search` 调大，通常能提高召回的准确性，这意味着模型能够获得更高质量的输入，但也可能增加向量检索的时间开销，影响整体响应速度。

## 容易做错的三处
- 日志中出现 `context window exceeded` 错误：原因在于召回内容与用户查询的总 token 数超过了模型的 128000 tokens 上下文限制。
- 界面显示召回内容不相关或缺失：原因可能是 `ef_search` 参数过小，导致向量搜索未能有效找到最相关的知识段落。
- 数据库连接失败或超时：`PG_URL` 配置不正确，或者 PostgreSQL 数据库实例的网络访问权限未正确配置。

## 怎么确认配好了
- 运行测试查询，检查 FastGPT 界面返回的召回条数是否符合预期，并核对这些条目的相关性。
- 通过 FastGPT 后台的调试信息，观察每次请求发送给模型的实际 token 数量，确保不超过 128000 tokens。
- 监控 PostgreSQL 数据库的查询日志，确认 `pgvector` 索引被正确使用，并且查询响应时间在可接受范围内。
- 检查 FastGPT 系统日志，确认没有出现与数据库连接或模型 API 调用相关的错误信息。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
