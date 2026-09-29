---
title: AntLing 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-antling05-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 的 128K 上下文模型，其上下文长度 128000 意味着单次请求可处理的文本总量上限。引用上限 120000 决定了知识库召回内容在模型中被引用的最大令牌数。单次最大输出未标注，表示回答长度需根据实际应用场景测试确定。图片输入 `false` 和工具调用 `false` 表明此档"
language: zh
axis_model_tier: "AntLing / 128000 /  / 120000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "Ring-1T、Ring-flash-2.0"
check_day: 2026-09-29
meta_title: AntLing 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: AntLing 的 128K 上下文模型，其上下文长度 128000 意味着单次请求可处理的文本总量上限。引用上限 120000 决定了知识库召回内容在模型中被引用的最大令牌数。单次最大输出未标注，表示回答长度需根据实际应用场景测试确定。图片输入 `false` 和工具调用 `false` 表明此档
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
AntLing 的 128K 上下文模型，其上下文长度 128000 意味着单次请求可处理的文本总量上限。引用上限 120000 决定了知识库召回内容在模型中被引用的最大令牌数。单次最大输出未标注，表示回答长度需根据实际应用场景测试确定。图片输入 `false` 和工具调用 `false` 表明此档模型不具备直接处理图像信息或调用外部工具的能力，因此在 FastGPT 中，相关功能链路不会被激活，需要通过其他模块实现。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可达性与权限正确 |
| `ef_construction` | `64` | 影响索引构建时的邻居数量，数值越大召回质量越高但构建耗时增加 |
| `ef_search` | `32` | 影响查询时的邻居数量，数值越大召回质量越高但查询耗时增加 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引结构与查询性能 |
| `vector_ip_ops` | 相似度计算类型为 `inner product` | 向量相似度计算方式，需与模型嵌入向量类型匹配 |
| 召回条数 | `10-20` 条 | 结合模型引用上限与单条文本长度，避免超出上下文 |

## 这两者互相约束的地方
AntLing 128K 上下文模型的引用上限 120000 令牌，是限制召回内容总量的关键。这意味着从 pgvector 召回的文本段落总长度，加上系统提示词、用户问题等，不能超过 128000 令牌。通常情况下，pgvector 返回的召回条数与每段文本的平均长度乘积，应小于模型的引用上限。当 pgvector 的 `ef_search` 或 `ef_construction` 等索引参数调大时，向量检索的精度会提高，可能召回更相关的段落。然而，召回条数并非越多越好，过多的召回条目可能会稀释相关信息或超出模型的引用上限，导致模型处理效率下降或生成质量不佳。因此，召回条数需要根据实际的文本平均长度和模型引用上限进行精细调整。

## 容易做错的三处
- 错误现象：模型返回内容出现 `Context window exceeded` 错误。
  原因：召回内容总令牌数加上系统提示词和用户问题，超出了 128000 的上下文长度限制。
- 错误现象：pgvector 查询返回的向量相似度过低，导致模型回答不准确。
  原因：`ef_search` 参数设置过小，或 `m` 参数设置不当，导致 HNSW 索引查询效率或精度不足。
- 错误现象：FastGPT 界面显示知识库无法连接。
  原因：`PG_URL` 配置错误，如数据库地址、端口、用户名或密码有误，或网络不通。

## 怎么确认配好了
- 检查 FastGPT 系统日志，确认 `PG_URL` 连接无误，且 pgvector 索引创建或加载成功。
- 在 FastGPT 知识库测试界面，上传少量文档并进行检索测试，观察召回条数和召回内容的质量，根据模型引用上限调整召回条数。
- 运行模拟请求，观察模型返回内容是否包含来自知识库的引用，并检查引用内容是否与召回段落相符，确认 `ef_search` 和 `m` 参数的设置能提供足够的召回质量。
- 监控 FastGPT 运行时的内存与 CPU 占用，尤其是在高并发场景下，评估 pgvector 的 `ef_construction` 和 `ef_search` 参数对系统资源的影响，并根据实际情况调整。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
