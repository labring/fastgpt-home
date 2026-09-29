---
title: Siliconflow 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-siliconflow01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型具备 128000 的上下文长度，决定了单次处理请求时可以容纳的输入内容总量，包括用户提问与召回文本。未标注的单次最大输出意味着回答长度由模型自行生成。引用上限为 50000 token，这是用于承载引用内容的 token 预算，它限定了引用内容的总量。段落条数由检索系统决定，与引用上限是"
language: zh
axis_model_tier: "Siliconflow / 128000 /  / 50000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "Qwen/Qwen2.5-72B-Instruct"
check_day: 2026-09-29
meta_title: Siliconflow 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: 这一档模型具备 128000 的上下文长度，决定了单次处理请求时可以容纳的输入内容总量，包括用户提问与召回文本。未标注的单次最大输出意味着回答长度由模型自行生成。引用上限为 50000 token，这是用于承载引用内容的 token 预算，它限定了引用内容的总量。段落条数由检索系统决定，与引用上限是
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Siliconflow 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
这一档模型具备 128000 的上下文长度，决定了单次处理请求时可以容纳的输入内容总量，包括用户提问与召回文本。未标注的单次最大输出意味着回答长度由模型自行生成。引用上限为 50000 token，这是用于承载引用内容的 token 预算，它限定了引用内容的总量。段落条数由检索系统决定，与引用上限是两个不同的考量。模型支持工具调用，可以在特定场景下执行外部操作，但不支持图片输入。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接的唯一标识，确保能够正确访问 PostgreSQL 实例。 |
| `ef_construction` | `64` | HNSW 索引构建时的邻居数量，影响索引质量与构建速度。 |
| `ef_search` | `32` | HNSW 索引查询时的邻居数量，影响查询召回率与速度。 |
| `m = 32` | `32` | HNSW 图中每个节点的最大连接数，影响索引的内存占用与查询性能。 |
| `vector_ip_ops` | `true` | pgvector 插件是否启用内积操作，与模型嵌入向量的距离计算方式匹配。 |
| 召回条数 | `前 5 条` | 经验值，需要结合单段长度与引用上限进行调整。 |

## 这两者互相约束的地方
召回条数与每段文本的长度共同决定了模型输入中引用内容的总体量。这一总量必须严格控制在模型的上下文长度 128000 token 预算之内。引用上限 50000 token 是对引用内容本身的 token 预算，而向量库返回的是固定数量的段落。当每段文本较短时，可以在不超过引用上限的前提下获取更多条召回内容；当每段文本较长时，即使召回条数不多，也可能迅速触及引用上限。PostgreSQL（pgvector）的 `ef_construction` 和 `ef_search` 等索引参数调大后，检索的精度和召回率会提升，这有助于模型获取更相关的上下文，但也会增加索引构建和查询的资源消耗，需要权衡。

## 容易做错的三处
- 日志显示 `Connection refused`：`PG_URL` 中的主机或端口配置不正确，或 PostgreSQL 服务未启动。
- 查询结果 `vector` 字段为空：`pgvector` 扩展未在数据库中启用，或表结构未正确定义 `vector` 类型。
- 检索返回条数与预期不符：SQL 查询的 `LIMIT` 子句设置不当，或过滤条件导致结果集变小。

## 怎么确认配好了
- 验证 `PG_URL` 配置：通过 `psql` 命令行工具连接到 PostgreSQL 数据库，确认连接成功。
- 检查 `pgvector` 扩展状态：在数据库中执行 `\dx` 命令，确认 `pgvector` 扩展已安装并启用。
- 测试向量插入与查询：插入一条测试向量数据，并执行相似度查询，观察 `ef_search` 参数调整后查询结果的变化。
- 模拟 RAG 流程：使用实际数据进行检索，并观察模型输入中引用内容的 token 数量，确保不超过 50000 的引用上限。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
