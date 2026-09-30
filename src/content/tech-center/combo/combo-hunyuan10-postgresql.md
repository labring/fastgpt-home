---
title: Hunyuan 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-hunyuan10-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型具备 128000 的上下文长度，决定了单次处理请求时能纳入的召回内容总量。引用上限为 128000 token，意味着所有被引用的内容合计预算为 128000 token。被引用的段落条数由检索侧的配置决定，引用内容的 token 预算是独立的考量。这些模型不支持图片输入，也无法进行工具"
language: zh
axis_model_tier: "Hunyuan / 128000 /  / 128000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109"
check_day: 2026-09-29
meta_title: Hunyuan 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: 这一档模型具备 128000 的上下文长度，决定了单次处理请求时能纳入的召回内容总量。引用上限为 128000 token，意味着所有被引用的内容合计预算为 128000 token。被引用的段落条数由检索侧的配置决定，引用内容的 token 预算是独立的考量。这些模型不支持图片输入，也无法进行工具
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
这一档模型具备 128000 的上下文长度，决定了单次处理请求时能纳入的召回内容总量。引用上限为 128000 token，意味着所有被引用的内容合计预算为 128000 token。被引用的段落条数由检索侧的配置决定，引用内容的 token 预算是独立的考量。这些模型不支持图片输入，也无法进行工具调用，因此构建应用时无需考虑这两方面的集成。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database?sslmode=require` | 数据库连接字符串，确保可达性与安全性 |
| `ef_construction` | `64` | HNSW 索引构建时的邻居数量，影响索引质量与构建速度 |
| `ef_search` | `40` | HNSW 搜索时的邻居数量，影响召回精度与查询速度 |
| `m = 32` | `32` | HNSW 索引中每个节点的最大连接数，平衡索引大小与搜索性能 |
| `vector_ip_ops` | `true` | 使用内积距离计算向量相似度，适用于部分场景 |
| `max_connections` | 按实测标定 | 数据库最大连接数，需根据并发量与内存资源调整 |

## 这两者互相约束的地方
召回条数与每段内容的长度共同决定了总的 token 消耗，这必须控制在模型 128000 的上下文预算之内。引用上限是按 token 计量的，而向量库返回的是独立的段落条数。两者触顶的先后，取决于每段内容的平均 token 长度。如果段落较短，可能会先达到召回条数上限；如果段落较长，则可能先达到引用 token 上限。PostgreSQL（pgvector）的索引参数如 `ef_construction` 和 `ef_search` 调大，通常能提高召回的准确性。这使得模型在有限的召回条数下，获得更高质量的输入，从而可能提升最终输出的准确性。

## 容易做错的三处
- 报错信息 `connection refused`：`PG_URL` 配置不正确或数据库服务未启动。
- 检索结果相关性低：`ef_search` 设置过小，导致 HNSW 搜索未能充分探索邻近向量空间。
- 检索耗时过长：`m` 值设置过大，导致索引文件体积膨胀，查询效率下降。

## 怎么确认配好了
- 运行一个简单的查询，验证 `PG_URL` 配置是否能成功连接到数据库并执行向量查询。
- 监控数据库日志，检查是否有因连接数不足导致的错误，并调整 `max_connections`。
- 通过 FastGPT 平台界面，观察模型在处理 RAG 任务时的响应时间，评估 `ef_search` 对查询性能的影响。
- 检索少量文档，验证返回的相似文档是否符合预期，以此评估 `ef_construction` 和 `m` 对索引质量的影响。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
