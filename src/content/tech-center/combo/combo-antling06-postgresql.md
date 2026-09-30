---
title: AntLing 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-antling06-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 的 `Ring-mini-2.0` 模型，其上下文长度为 64000 token，意味着在一次交互中，模型可以处理的输入总长度上限。引用上限为 60000 token，这笔预算专门用于承载从知识库检索到的相关内容。模型单次最大输出未标注，通常由系统默认或用户侧设定。图片输入和工具调用"
language: zh
axis_model_tier: "AntLing / 64000 /  / 60000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "Ring-mini-2.0"
check_day: 2026-09-29
meta_title: AntLing 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: AntLing 的 `Ring-mini-2.0` 模型，其上下文长度为 64000 token，意味着在一次交互中，模型可以处理的输入总长度上限。引用上限为 60000 token，这笔预算专门用于承载从知识库检索到的相关内容。模型单次最大输出未标注，通常由系统默认或用户侧设定。图片输入和工具调用
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
AntLing 的 `Ring-mini-2.0` 模型，其上下文长度为 64000 token，意味着在一次交互中，模型可以处理的输入总长度上限。引用上限为 60000 token，这笔预算专门用于承载从知识库检索到的相关内容。模型单次最大输出未标注，通常由系统默认或用户侧设定。图片输入和工具调用功能为 `false`，表明该模型版本不支持直接处理图像输入或通过工具扩展能力。这些参数共同构成了模型处理 RAG 场景的边界，特别是引用上限直接影响了召回内容的总量。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :---------- | :---------- | :---------- |
| `PG_URL` | `postgresql://user:pass@host:port/dbname` | 连接 PostgreSQL 数据库实例的通用格式，确保 FastGPT 能正确访问。 |
| `ef_construction` | `64` | HNSW 索引构建时的邻居数量，影响索引质量和构建速度，适中值平衡性能。 |
| `ef_search` | `40` | HNSW 索引查询时的搜索范围，影响召回精度和查询速度，应大于或等于 `k` (召回条数)。 |
| `m` | `32` | HNSW 索引中每个层级的最大连接数，影响索引大小和查询性能，建议取值 `16` 或 `32`。 |
| 检索条数 `k` | `5` | 每次检索从 pgvector 返回的向量数量，直接影响模型接收到的信息量。 |
| `vector_ip_ops` | `true` | 启用向量的内积（Inner Product）操作，适用于 FastGPT 默认的余弦相似度计算。 |

## 这两者互相约束的地方
AntLing `Ring-mini-2.0` 的 64000 token 上下文长度是 RAG 流程的硬性上限。其中，60000 token 的引用上限专门分配给检索到的内容。当 FastGPT 从 pgvector 检索到多条数据时，这些数据的总 token 数不能超出 60000。向量库返回的是固定数量的段落条数，而模型引用的是这些段落的 token 总量。因此，召回条数与每段文本的平均长度共同决定了是否触及引用上限。例如，如果每段文本平均 500 token，那么最多可以引用 120 段。pgvector 的 `ef_construction` 和 `ef_search` 参数调高，可以提升检索的精度和召回率，意味着模型能够获得更相关的上下文信息。但高精度也可能带来更高的资源消耗和查询延迟，需要与模型的实时响应需求进行权衡。

## 容易做错的三处
- 日志中出现 `PostgreSQL connection error: authentication failed`：`PG_URL` 中的用户名或密码不正确。
- 检索结果为空或不相关：pgvector 的 `ef_search` 设置过低，导致搜索范围不足，未能召回有效结果。
- 界面显示模型回答不完整：模型输入上下文过长，超过了 64000 token 上限，导致部分内容被截断。

## 怎么确认配好了
- 在 FastGPT 后台知识库配置页面，测试数据库连接，确认 `PG_URL` 能成功连接 pgvector。
- 通过 FastGPT 的调试模式，观察模型实际接收到的引用内容条数和总 token 数，核对是否符合预期。
- 对比不同 `ef_search` 和 `ef_construction` 配置下的召回结果，评估检索相关性和查询延迟。
- 模拟一次用户提问，检查模型对引用内容的利用情况，确认回答中是否包含来自知识库的信息。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
