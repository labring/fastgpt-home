---
title: AntLing 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-antling03-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 128K 上下文这一档模型，其上下文长度 128000 Token 决定了单次请求中模型能够处理的输入信息总量，包括用户提问、历史对话和知识库召回内容。引用上限 120000 Token 意味着知识库内容在送入模型时，其最大允许占据的上下文空间。工具调用 `true` 表示模型具备与"
language: zh
axis_model_tier: "AntLing / 128000 /  / 120000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "Ling-1T、Ling-flash-2.0"
check_day: 2026-09-29
meta_title: AntLing 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: AntLing 128K 上下文这一档模型，其上下文长度 128000 Token 决定了单次请求中模型能够处理的输入信息总量，包括用户提问、历史对话和知识库召回内容。引用上限 120000 Token 意味着知识库内容在送入模型时，其最大允许占据的上下文空间。工具调用 `true` 表示模型具备与
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
AntLing 128K 上下文这一档模型，其上下文长度 128000 Token 决定了单次请求中模型能够处理的输入信息总量，包括用户提问、历史对话和知识库召回内容。引用上限 120000 Token 意味着知识库内容在送入模型时，其最大允许占据的上下文空间。工具调用 `true` 表示模型具备与外部工具集成的能力，可用于执行特定任务或获取实时信息。图片输入 `false` 则表明当前模型不支持直接处理图像数据。单次最大输出未标注，意味着在实际部署时，应根据业务场景对输出长度进行合理约束，以避免不必要的资源消耗。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限 |
| `ef_construction` | `64` | HNSW 索引构建时的邻居数，影响索引质量与构建速度 |
| `ef_search` | `40` | HNSW 搜索时的邻居数，影响召回精度与查询速度 |
| `m = 32` | `32` | HNSW 索引中每个节点的最大连接数，影响索引大小与查询效率 |
| `vector_ip_ops` | `true` | 启用内积距离计算，适用于特定向量距离度量 |
| `recall_limit` | `20` | 向量数据库单次召回的条目上限 |

## 这两者互相约束的地方
召回条数与每段知识长度的乘积，必须严格控制在 AntLing 模型 128000 Token 的上下文长度预算之内。若超出此限制，模型将无法处理所有输入信息，可能导致信息截断或理解偏差。模型的引用上限 120000 Token 与向量库的返回条数之间存在优先级关系：实际送入模型的内容量，由两者中较小的一个决定。即便向量库返回了更多条目，若总 Token 数超过引用上限，多余的部分也将被截断。当 PostgreSQL（pgvector）的索引参数 `ef_construction` 或 `ef_search` 调大时，向量召回的准确性通常会提高，但查询延时也会增加。对于 AntLing 128K 这样上下文容量较大的模型，高精度的召回有助于充分利用其理解能力，但查询时间的增加可能影响整体响应速度。

## 容易做错的三处
* 向量库查询返回 `[]` 或结果集为空，原因可能是 `ef_search` 设置过小导致无法找到有效邻居，或索引数据量不足。
* 模型返回内容明显短于预期，但未报错，可能是召回内容总 Token 数超过了 AntLing 模型的引用上限，导致部分召回内容被截断。
* 出现 `connection refused` 错误，通常是 `PG_URL` 中的主机、端口或认证信息配置有误，导致无法建立数据库连接。

## 怎么确认配好了
* 通过 FastGPT 的知识库管理界面，上传少量测试文档，并尝试进行问答，观察模型是否能正确引用知识库内容。
* 检查 PostgreSQL 的日志，确认 `pgvector` 扩展是否已正确加载，并且 HNSW 索引的构建过程无异常报错。
* 使用数据库客户端工具，直接查询 `pg_stat_statements` 或 `pg_stat_activity`，观察向量查询的执行计划和耗时，评估 `ef_search` 等参数的实际效果。
* 针对特定知识库内容，构造多个具有代表性的用户问题，通过 FastGPT 的调试功能，观察 AntLing 模型实际接收到的上下文内容，核对召回条数与 Token 长度是否符合预期。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
