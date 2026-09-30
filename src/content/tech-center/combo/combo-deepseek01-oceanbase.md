---
title: DeepSeek 1000K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-deepseek01-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "DeepSeek 这一档模型，其 1000000 的上下文长度 (`maxContext`) 决定了一次请求中可以承载的输入信息总量，这包括用户查询、历史对话以及召回内容。引用上限 (`quoteMaxToken`) 为 960000 token，这直接限定了在单次模型调用中，用于承载知识库召回内容"
language: zh
axis_model_tier: "DeepSeek / 1000000 /  / 960000 / true / true"
axis_vector_db: "OceanBase"
covered_models: "deepseek-flash"
check_day: 2026-09-29
meta_title: DeepSeek 1000K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: DeepSeek 这一档模型，其 1000000 的上下文长度 (`maxContext`) 决定了一次请求中可以承载的输入信息总量，这包括用户查询、历史对话以及召回内容。引用上限 (`quoteMaxToken`) 为 960000 token，这直接限定了在单次模型调用中，用于承载知识库召回内容
date_published: 2026-09-29
date_modified: 2026-09-29
---

# DeepSeek 1000K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
DeepSeek 这一档模型，其 1000000 的上下文长度 (`maxContext`) 决定了一次请求中可以承载的输入信息总量，这包括用户查询、历史对话以及召回内容。引用上限 (`quoteMaxToken`) 为 960000 token，这直接限定了在单次模型调用中，用于承载知识库召回内容的预算。单次最大输出 (`maxTokens`) 未标注，意味着模型响应长度具备较高灵活性。图片输入 `true` 和工具调用 `true` 则表明模型原生支持多模态输入和外部工具的函数调用能力，为复杂应用场景提供了基础链路。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OCEANBASE_URL` | `ob://user:pass@host:port/database` | 连接 OceanBase 数据库实例的唯一标识，确保数据库可达。 |
| `ef_construction` | `128` | 影响 HNSW 索引构建时的图结构密度，数值越大索引质量越高，搜索精度提升。 |
| `m` | `16` | 影响 HNSW 索引每个节点的最大连接数，数值越大搜索精度越高，但索引大小和搜索延迟增加。 |
| `recall_num` | `前 5 条` | 经验值，平衡召回质量与 token 消耗，可根据实际业务调整。 |
| `chunk_size` | `800–1200 字符` | 确保每个召回段落包含足够信息量，同时避免单段过长。 |

## 这两者互相约束的地方
模型 1000000 的上下文长度是总预算，其中 960000 token 专门用于引用内容。向量库返回的是固定数量的条目，每条具有一定的字符长度。当向量库返回的段落数量乘以每段的平均 token 长度，其总和不能超过模型的引用上限。引用上限是按 token 计数的，而向量库返回的是按段落条数计数的。召回条数和每段长度的乘积总 token 预算，决定了引用内容在模型上下文中的占比。索引参数 `ef_construction` 和 `m` 调大，意味着向量搜索的召回精度可能更高，返回的段落与查询的相关性更强，但也会增加向量库的索引构建时间和搜索延迟。在 DeepSeek 这种高引用上限的模型下，高精度的召回有助于充分利用其处理能力，提供更精确的答案。

## 容易做错的三处
- 日志显示 `Connection refused`：`OCEANBASE_URL` 配置的地址或端口不正确，导致无法连接 OceanBase 数据库。
- 召回内容为空，但数据库中存在相关数据：向量索引构建时 `ef_construction` 或 `m` 参数设置过低，导致召回精度不足。
- 模型返回结果与召回内容无关：召回条数 `recall_num` 设置过少，未能提供足够的相关上下文给模型。

## 怎么确认配好了
- 运行一次带知识库的查询，检查 FastGPT 界面上的召回内容是否与预期一致，且包含相关信息。
- 通过 FastGPT 的调试模式，观察模型实际接收到的引用内容 token 数量，确认未超过 960000 的引用上限。
- 监测 OceanBase 数据库的慢查询日志，确认向量搜索操作的响应时间在可接受范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
