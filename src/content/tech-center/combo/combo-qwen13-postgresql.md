---
title: Qwen 10000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-qwen13-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Qwen 的 `qwen-long` 模型，具备 10000000 的上下文长度，这意味着在单次交互中，模型能够处理极大量的输入信息。模型单次最大输出未标注，实际输出长度取决于具体部署环境和应用配置。引用上限为 10000000 token，用于限定模型在生成回答时，引用自知识库内容的 token "
language: zh
axis_model_tier: "Qwen / 10000000 /  / 10000000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "qwen-long"
check_day: 2026-09-29
meta_title: Qwen 10000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Qwen 的 `qwen-long` 模型，具备 10000000 的上下文长度，这意味着在单次交互中，模型能够处理极大量的输入信息。模型单次最大输出未标注，实际输出长度取决于具体部署环境和应用配置。引用上限为 10000000 token，用于限定模型在生成回答时，引用自知识库内容的 token
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 10000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Qwen 的 `qwen-long` 模型，具备 10000000 的上下文长度，这意味着在单次交互中，模型能够处理极大量的输入信息。模型单次最大输出未标注，实际输出长度取决于具体部署环境和应用配置。引用上限为 10000000 token，用于限定模型在生成回答时，引用自知识库内容的 token 总量。引用上限明确了可供模型引用的内容预算，而知识库检索返回的段落条数是另一个独立变量。此档模型不支持图片输入和工具调用，因此在应用设计时，无需考虑多模态输入和外部工具集成。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限正确 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量和构建速度，此值在性能与精度间取得平衡 |
| `ef_search` | `32` | HNSW 索引查询参数，影响查询召回精度和速度，此值在查询速度与召回率间取得平衡 |
| `m` | `32` | HNSW 索引层数参数，影响内存占用和查询性能，此值在效率与资源消耗间取得平衡 |
| `vector_ip_ops` | 启用 | `pgvector` 的内积运算，优化向量相似度计算性能 |
| 召回条数 | `10–20` 条 | 综合考虑上下文长度与引用上限，避免单次召回过多无用信息 |

## 这两者互相约束的地方
Qwen `qwen-long` 模型的 10000000 上下文长度，为知识库召回内容提供了充足的承载空间。向量库返回的段落条数乘以每段文本的平均长度，其总和不能超出此上下文长度的预算。引用上限 10000000 token 限制了模型在生成回答时可以引用的知识库内容总量，这个限制是基于 token 数量的。向量库返回的结果是按条数计量的，因此，是引用上限先触顶还是召回条数先触顶，取决于每段内容的平均 token 长度。当 `ef_construction` 和 `ef_search` 等索引参数调大时，向量检索的精度通常会提升，这意味着在相同召回条数下，模型接收到的相关性更强的内容占比可能更高，进而更好地利用其巨大的上下文窗口。

## 容易做错的三处
*  知识库检索返回结果为空，原因可能是向量索引未正确构建，或查询向量与知识库向量空间不匹配。
*  模型回答中未引用任何知识，原因可能是引用上限配置过低，或检索到的内容相关性不足。
*  请求处理超时，原因可能是 PostgreSQL 数据库连接池配置不当，或向量检索查询 `ef_search` 值过高导致查询耗时过长。

## 怎么确认配好了
*  通过 FastGPT 管理界面观察知识库检索返回的段落条数，确认与 `召回条数` 配置一致。
*  检查 FastGPT 日志输出，确认数据库连接 `PG_URL` 成功建立，且无连接错误信息。
*  通过实际对话测试，观察模型回答是否有效引用了知识库内容，并评估引用内容的准确性与相关性。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
