---
title: Ernie 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-ernie07-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`ernie-4.5-turbo-vl-32k` 模型提供 32000 token 的上下文长度，这意味着单次请求中可输入的最大文本量。引用上限 27000 token 划定了知识库召回内容在模型输入中的最大占比，超过此限制的召回内容将被截断或忽略。模型支持图片输入，可处理多模态任务。然而，不支持工"
language: zh
axis_model_tier: "Ernie / 32000 /  / 27000 / true / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "ernie-4.5-turbo-vl-32k"
check_day: 2026-09-29
meta_title: Ernie 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `ernie-4.5-turbo-vl-32k` 模型提供 32000 token 的上下文长度，这意味着单次请求中可输入的最大文本量。引用上限 27000 token 划定了知识库召回内容在模型输入中的最大占比，超过此限制的召回内容将被截断或忽略。模型支持图片输入，可处理多模态任务。然而，不支持工
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`ernie-4.5-turbo-vl-32k` 模型提供 32000 token 的上下文长度，这意味着单次请求中可输入的最大文本量。引用上限 27000 token 划定了知识库召回内容在模型输入中的最大占比，超过此限制的召回内容将被截断或忽略。模型支持图片输入，可处理多模态任务。然而，不支持工具调用，因此基于外部工具扩展模型能力的场景需要通过其他方式实现。这些参数共同定义了该模型在 FastGPT 平台中处理知识问答与多模态交互时的工程边界。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------ | :----------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的标准格式，确保网络可达性与凭证正确性。 |
| `ef_construction` | `80–120` | 控制 HNSW 索引构建时的邻居数量，影响索引质量与构建速度。较高的值能提升召回准确率，但会增加索引时间和存储空间。 |
| `ef_search` | `60–100` | 控制 HNSW 索引查询时的搜索宽度，影响查询速度与召回准确率。较高的值能找到更准确的近邻，但会增加查询延迟。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引结构密度与查询效率。更大的 `m` 值有助于提高召回质量，但会增加内存消耗和查询时间。 |
| `vector_ip_ops` | `true` | 指定 pgvector 使用内积（Inner Product）作为向量相似度计算方式，与 Ernie embedding 模型的输出特性相符。 |

## 这两者互相约束的地方
`ernie-4.5-turbo-vl-32k` 模型的 32000 token 上下文长度是核心约束。知识库召回的文本总长度（召回条数 × 每段长度）必须小于此值，同时需考虑模型自身生成回答所需的 token 空间。27000 token 的引用上限进一步限制了知识库内容在输入中的比例。PostgreSQL（pgvector）的查询结果条数与这个引用上限直接相关，召回条数不应盲目设置过高，以避免超出模型处理能力或导致有效信息被截断。`ef_construction` 和 `ef_search` 等索引参数的调整，旨在平衡召回速度与准确率。当这些参数调大以追求更高的召回质量时，可能会增加向量数据库的资源消耗，进而影响 FastGPT 整体响应时间，需与模型处理效率协同考量。

## 容易做错的三处
- 日志显示 `Connection refused` 或 `Authentication failed`：PostgreSQL 数据库的 `PG_URL` 配置有误，导致 FastGPT 无法建立连接或认证失败。
- 知识库召回结果不相关或缺失：`ef_search` 参数设置过低，导致 pgvector 在搜索时没有探索足够多的近邻，影响召回质量。
- 模型返回的回答长度远低于预期：知识库召回的文本总长度（召回条数 × 每段长度）过大，超出了模型的上下文长度或引用上限，导致模型输入被截断。

## 怎么确认配好了
- 通过 FastGPT 平台测试连接功能，确认 `PG_URL` 配置正确且数据库可达。
- 在 FastGPT 知识库管理界面，上传文档并进行一次问答测试，检查召回结果的条数与相关性是否符合预期，以此评估 `ef_construction` 和 `ef_search` 的效果。
- 观察 FastGPT 问答日志中模型输入 token 数量，确保知识库召回内容加上用户查询，总和未超过 32000 token 的模型上下文长度，且引用部分未超出 27000 token 的引用上限。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
