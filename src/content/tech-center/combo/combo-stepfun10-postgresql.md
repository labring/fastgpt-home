---
title: StepFun 256K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-stepfun10-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`maxContext` 上下文长度 256000 token，这决定了单次请求模型能够处理的输入总量，包括系统指令、用户提问和召回内容。模型响应的长度由未标注的单次最大输出决定。`quoteMaxToken` 引用上限 256000 token，这限制了召回内容可以占据的 token 预算。引用内"
language: zh
axis_model_tier: "StepFun / 256000 /  / 256000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "step-1-256k"
check_day: 2026-09-29
meta_title: StepFun 256K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `maxContext` 上下文长度 256000 token，这决定了单次请求模型能够处理的输入总量，包括系统指令、用户提问和召回内容。模型响应的长度由未标注的单次最大输出决定。`quoteMaxToken` 引用上限 256000 token，这限制了召回内容可以占据的 token 预算。引用内
date_published: 2026-09-29
date_modified: 2026-09-29
---

# StepFun 256K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`maxContext` 上下文长度 256000 token，这决定了单次请求模型能够处理的输入总量，包括系统指令、用户提问和召回内容。模型响应的长度由未标注的单次最大输出决定。`quoteMaxToken` 引用上限 256000 token，这限制了召回内容可以占据的 token 预算。引用内容合计 token 量不能超过此上限。段落条数由检索侧的返回条数决定。`图片输入 false` 表明模型不支持图像作为输入。`工具调用 false` 则意味着模型不具备调用外部工具的能力。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限。 |
| `m` | `32` | HNSW 算法中每个节点连接的最大邻居数量，影响索引质量和查询速度。 |
| `ef_construction` | `100–200` | HNSW 索引构建时搜索的邻居数量，值越大索引质量越高，构建时间越长。 |
| `ef_search` | `80–150` | HNSW 查询时搜索的邻居数量，值越大召回率越高，查询时间越长。 |
| 检索条数 | `20–50` 条 | 召回条数与每段长度共同决定引用内容总 token 量，需适配 `quoteMaxToken`。 |
| 每段长度 | `500–800` 字符 | 文本切分的粒度，影响召回内容的精细度和 token 消耗。 |

## 这两者互相约束的地方
召回条数与每段文本长度的乘积，不能超过 `maxContext` 上下文预算。`quoteMaxToken` 引用上限按 token 计，而向量库返回的是按条数计。哪一个限制先触达，取决于每段内容的平均 token 长度。如果每段内容较短，可能在达到引用上限 token 数之前，就已经返回了大量条目。反之，如果每段内容较长，则可能只返回少量条目便触及引用上限。PostgreSQL（pgvector）的索引参数，如 `ef_construction` 和 `ef_search`，调大之后，向量搜索的召回准确率会提升，这为 `step-1-256k` 模型提供了更优质的输入内容，有助于提升模型理解和生成答案的质量。

## 容易做错的三处
- 日志显示 `context window exceeded`：召回内容加上用户输入超过了 `maxContext` 上下文长度。
- 返回内容与引用材料关联性低：`ef_search` 设置过低，导致向量检索的召回率不足。
- 数据库连接超时或失败：`PG_URL` 配置不正确，或者数据库防火墙限制了访问。

## 怎么确认配好了
- 运行测试用例，观察模型在不同召回条数下的响应质量，以此确定 `ef_search` 的合理阈值。
- 检查 FastGPT 平台日志，确认每次请求的输入 token 数量未超过 `maxContext`。
- 监控 PostgreSQL（pgvector）的查询延迟，确保 `ef_search` 和 `m` 的设置不会导致性能瓶颈。
- 通过 FastGPT 界面查看引用内容是否完整呈现，确认召回条数与每段长度的配置符合预期。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
