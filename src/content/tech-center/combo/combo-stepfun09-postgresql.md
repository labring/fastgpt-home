---
title: StepFun 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-stepfun09-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "StepFun 模型 `step-1-128k` 的上下文长度为 128000 Token，这意味着模型在单次推理中可以处理的总输入量上限。知识库召回内容、用户提问和系统指令的总和不得超过此限制。引用上限 128000 表示模型可以参考的知识库段落总 Token 数天花板，它直接影响知识库召回策略的"
language: zh
axis_model_tier: "StepFun / 128000 /  / 128000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "step-1-128k"
check_day: 2026-09-29
meta_title: StepFun 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: StepFun 模型 `step-1-128k` 的上下文长度为 128000 Token，这意味着模型在单次推理中可以处理的总输入量上限。知识库召回内容、用户提问和系统指令的总和不得超过此限制。引用上限 128000 表示模型可以参考的知识库段落总 Token 数天花板，它直接影响知识库召回策略的
date_published: 2026-09-29
date_modified: 2026-09-29
---

# StepFun 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
StepFun 模型 `step-1-128k` 的上下文长度为 128000 Token，这意味着模型在单次推理中可以处理的总输入量上限。知识库召回内容、用户提问和系统指令的总和不得超过此限制。引用上限 128000 表示模型可以参考的知识库段落总 Token 数天花板，它直接影响知识库召回策略的设计。图片输入为 `false`，表明该模型不具备处理图像信息的能力。工具调用为 `false`，意味着该模型无法直接执行外部工具或函数。这些参数共同定义了该模型在 FastGPT 平台中的应用边界和优化方向。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的必要凭证，确保数据库可访问。 |
| `ef_construction` | `64` | HNSW 索引构建时的参数，影响索引质量和构建速度。适当提高可提升召回精度。 |
| `ef_search` | `40` | HNSW 索引查询时的参数，影响查询速度和召回精度。通常设为 `ef_construction` 的 0.6–0.8 倍。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引大小和查询性能。 |
| `vector_ip_ops` | `true` | 启用内积相似度计算，与 FastGPT 默认的向量相似度算法匹配。 |
| 召回条数 | `20–50` 条 | 在模型上下文限制下，平衡召回广度和单次推理成本。 |

## 这两者互相约束的地方
StepFun `step-1-128k` 模型的 128000 Token 上下文长度是核心约束。知识库召回的“召回条数 × 每段平均 Token 数”的总和，加上用户提问和系统指令的 Token 数，必须严格控制在此上限内。如果总 Token 数超限，模型推理将失败或被截断。PostgreSQL（pgvector）的召回条数设置与模型的引用上限共同作用：向量库返回的条数是物理上限，而模型的引用上限是逻辑上限，最终进入模型的内容取两者中较小的值。HNSW 索引参数 `ef_construction` 和 `ef_search` 的调整会影响向量召回的精度和速度。当 `ef_construction` 和 `ef_search` 设置得较大时，向量召回的精度会提高，但查询延时也会增加，这对于需要快速响应的对话场景可能带来挑战，需要确保召回延迟在模型推理时间预算之内。

## 容易做错的三处
*   日志中出现 `Token limit exceeded` 错误码：知识库召回内容、用户问题和系统指令的总 Token 数超过了 128000 的模型上下文限制。
*   PostgreSQL 数据库连接失败或超时：`PG_URL` 配置错误，例如用户名、密码、主机或端口不正确，导致 FastGPT 无法建立数据库连接。
*   召回结果与预期不符或为空：`ef_search` 参数设置过小，导致 HNSW 索引在查询时无法找到足够多的相关向量，或者向量数据未正确写入 pgvector。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传文档并进行一次向量化，检查 PostgreSQL 数据库中 `vectors` 表是否有新增数据。
*   进行一次知识库查询测试，观察 FastGPT 返回的召回段落是否符合预期，并通过 FastGPT 的调试面板查看实际送入模型的 Token 数量，确保未超限。
*   通过 PostgreSQL 数据库的性能监控工具，观察 HNSW 索引的查询延迟，确保在可接受的范围内，并根据业务需求调整 `ef_search` 和 `ef_construction` 参数。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
