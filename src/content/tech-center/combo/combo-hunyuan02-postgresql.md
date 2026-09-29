---
title: Hunyuan 256K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-hunyuan02-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 256K 档模型，其上下文长度 `maxContext` 为 256000 token，决定了单次交互中模型可处理的总信息量。单次最大输出长度未标注，意味着模型可以生成较长的回答内容。引用上限 `quoteMaxToken` 为 192000 token，此参数限定了所有引用内容合计"
language: zh
axis_model_tier: "Hunyuan / 256000 /  / 192000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "hy3"
check_day: 2026-09-29
meta_title: Hunyuan 256K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Hunyuan 256K 档模型，其上下文长度 `maxContext` 为 256000 token，决定了单次交互中模型可处理的总信息量。单次最大输出长度未标注，意味着模型可以生成较长的回答内容。引用上限 `quoteMaxToken` 为 192000 token，此参数限定了所有引用内容合计
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 256K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 256K 档模型，其上下文长度 `maxContext` 为 256000 token，决定了单次交互中模型可处理的总信息量。单次最大输出长度未标注，意味着模型可以生成较长的回答内容。引用上限 `quoteMaxToken` 为 192000 token，此参数限定了所有引用内容合计占用的 token 预算。段落条数由检索系统返回，与引用内容的 token 预算是两个独立的衡量维度。工具调用功能 `tool_calling` 为 `true`，支持模型执行外部工具操作；图片输入功能 `image_input` 为 `false`，表示模型不具备直接处理图像信息的能力。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接标准配置，确保 FastGPT 能正确连接到 pgvector 实例。 |
| `ef_construction` | `64`–`128` | 控制 HNSW 索引构建时的图层连接数，数值越大索引质量越高，但构建时间与内存消耗也随之增加。 |
| `ef_search` | `40`–`60` | 控制 HNSW 索引查询时的邻居节点搜索范围，数值越大召回率越高，但查询延迟也随之增加。 |
| `m` | `32` | HNSW 索引的最大连接数，影响图的稠密程度，过高会增加内存占用，过低会影响召回性能。 |
| `vector_ip_ops` | `true` | pgvector 向量运算类型，设置为 `true` 启用内积距离计算，适用于需要度量向量相似度的场景。 |
| `max_connections` | `100`–`200` | PostgreSQL 最大并发连接数，需根据 FastGPT 的并发请求量及数据库负载能力进行配置。 |

## 这两者互相约束的地方
模型的 256000 token 上下文预算与 pgvector 返回的召回条数及每段长度紧密相关。召回条数乘以每段文本的平均 token 数，其总和必须低于模型的上下文长度，以确保所有输入都能被模型处理。引用上限 `quoteMaxToken` 为 192000 token，这是对引用内容总 token 量的约束。pgvector 返回的是若干段文本，按条数计。当单段文本较长时，即使返回的条数不多，也可能迅速触达引用上限；当单段文本较短时，可以返回更多条。索引参数 `ef_construction` 和 `ef_search` 调大后，pgvector 的召回精度通常更高，这为模型提供了更相关、更优质的引用内容，从而可能提升模型回答的准确性与相关性。

## 容易做错的三处
*   日志显示 `ERROR: relation "vectors" does not exist`：原因是没有正确初始化 pgvector 扩展或表结构。
*   查询返回的召回条数远低于预期：原因可能是 `ef_search` 配置过低，导致 HNSW 索引搜索范围不足，未能找到足够多的邻近向量。
*   模型回答中引用内容为空或不相关：原因可能是向量嵌入质量不高，或者 pgvector 的 `ef_construction` 或 `m` 值设置不当，导致索引构建质量不佳。

## 怎么确认配好了
*   运行 FastGPT 内置的向量搜索测试，检查 pgvector 返回的召回条数和相关性分数是否符合预期。
*   监控 PostgreSQL 数据库的 CPU、内存及 I/O 使用率，确保在高并发查询下数据库性能稳定。
*   通过 FastGPT 界面发起多次问答，观察模型回答中引用内容的准确性、完整性以及是否能够有效利用引文。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
