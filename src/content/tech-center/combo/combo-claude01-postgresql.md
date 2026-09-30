---
title: Claude 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-claude01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型拥有 1000000 token 的上下文长度，决定了单次交互中可处理的输入和输出总量。模型单次最大输出能力未明确标注，实际应用中需要根据具体任务进行测试。引用上限为 200000 token，这是对引用内容总量的预算，它限制了被引用文本的总 token 数。段落条数由检索系统返回的数量决"
language: zh
axis_model_tier: "Claude / 1000000 /  / 200000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217"
check_day: 2026-09-29
meta_title: Claude 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: 这一档模型拥有 1000000 token 的上下文长度，决定了单次交互中可处理的输入和输出总量。模型单次最大输出能力未明确标注，实际应用中需要根据具体任务进行测试。引用上限为 200000 token，这是对引用内容总量的预算，它限制了被引用文本的总 token 数。段落条数由检索系统返回的数量决
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Claude 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
这一档模型拥有 1000000 token 的上下文长度，决定了单次交互中可处理的输入和输出总量。模型单次最大输出能力未明确标注，实际应用中需要根据具体任务进行测试。引用上限为 200000 token，这是对引用内容总量的预算，它限制了被引用文本的总 token 数。段落条数由检索系统返回的数量决定，引用上限与段落条数是两个独立的概念。图片输入能力允许模型处理视觉信息，工具调用能力则支持模型与外部系统进行交互，执行特定任务。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项             | 建议取法       | 这样取的依据                               |
| :--------------- | :------------- | :--------------------------------------- |
| `PG_URL`         | `postgresql://user:password@host:port/database` | 数据库连接凭证，确保 FastGPT 能正确连接数据库。 |
| `ef_construction`  | `100`–`200`    | 构建 HNSW 索引时邻居搜索参数，影响索引质量和构建速度。 |
| `ef_search`      | `40`–`80`      | 搜索 HNSW 索引时邻居搜索参数，影响召回质量和查询速度。 |
| `m = 32`         | `32`           | HNSW 索引中每个节点的最大连接数，影响索引大小和查询性能。 |
| `vector_ip_ops`  | `true`         | 启用内积操作符，优化向量相似度计算。       |

## 这两者互相约束的地方
向量库检索返回的段落条数与每段内容的长度之积，需要控制在模型 1000000 token 的上下文长度预算内。引用上限 200000 token 是对引用内容总 token 数的限制，向量库返回的是按条数计的段落，引用上限首先触顶还是条数首先触顶，取决于每段内容的平均长度。当 PostgreSQL（pgvector） 的 `ef_construction` 和 `ef_search` 参数调大时，索引构建和搜索的精度会提高，这可能意味着更准确的召回结果，从而为模型提供更相关的上下文信息，但同时也会增加索引构建和查询的时间开销。

## 容易做错的三处
*   日志显示 `PG_URL` 连接失败：原因在于数据库地址、用户名、密码或端口配置有误。
*   向量检索结果召回条数远低于预期：原因可能是 `ef_search` 参数设置过低，导致搜索范围不足。
*   模型回答中引用的内容与检索结果不符：原因可能是引用内容总 token 数超过了 200000 的引用上限，模型进行了截断或选择性引用。

## 怎么确认配好了
*   检查 FastGPT 后台的数据库连接状态，确认 `PG_URL` 配置无误且连接成功。
*   执行一次向量检索，观察返回的段落条数和内容，与预期结果进行比对，必要时调整 `ef_search`。
*   使用一个长文本作为输入，观察模型回答中引用内容的完整性，确认引用内容的总 token 数未超过 200000，且引用的相关性符合预期。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
