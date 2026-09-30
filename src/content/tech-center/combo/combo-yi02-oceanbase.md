---
title: Yi 16K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-yi02-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`yi-vision-v2` 模型的 `maxContext` 为 16000 token，这决定了单次交互中模型能处理的总输入信息量。引用上限 `quoteMaxToken` 为 12000 token，意味着在 RAG 场景下，用于填充上下文的召回内容合计不能超过此限制。工具调用 `false`"
language: zh
axis_model_tier: "Yi / 16000 /  / 12000 / true / false"
axis_vector_db: "OceanBase"
covered_models: "yi-vision-v2"
check_day: 2026-09-29
meta_title: Yi 16K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: `yi-vision-v2` 模型的 `maxContext` 为 16000 token，这决定了单次交互中模型能处理的总输入信息量。引用上限 `quoteMaxToken` 为 12000 token，意味着在 RAG 场景下，用于填充上下文的召回内容合计不能超过此限制。工具调用 `false`
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Yi 16K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
`yi-vision-v2` 模型的 `maxContext` 为 16000 token，这决定了单次交互中模型能处理的总输入信息量。引用上限 `quoteMaxToken` 为 12000 token，意味着在 RAG 场景下，用于填充上下文的召回内容合计不能超过此限制。工具调用 `false` 说明该模型不直接支持函数调用，需要外部逻辑进行封装。图片输入 `true` 允许模型处理视觉信息，为多模态应用提供了基础。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `OCEANBASE_URL` | `ob://user:pass@host:port/database` | 连接 OceanBase 数据库的必要参数，遵循 MySQL 协议格式 |
| `ef_construction` | `128` | HNSW 索引构建参数，影响索引质量与构建速度，`128` 是一个均衡值 |
| `m=16` | `16` | HNSW 索引图的邻居数量参数，影响召回精度与查询性能，`16` 是常见取值 |
| `top_k` | `5` | 向量检索时返回的相似向量数量，匹配引用上限与召回策略 |
| `chunk_size` | `800–1200 字符` | 文本切分块大小，影响单段内容的完整性和检索效率 |

说明：SEEKDB 与 OceanBase 使用同一套控制器实现，配置口径相同。

## 这两者互相约束的地方
召回条数与每段长度的乘积必须在这一档模型的 `maxContext` 预算之内，否则可能导致截断或无法处理。`quoteMaxToken` 限制了引用内容的总 token 数，而向量库返回的是按条数计的文档段落。当每段内容较长时，即使返回的条数不多，也可能迅速触及 `quoteMaxToken` 上限；反之，如果每段内容较短，则可以召回更多条目。索引参数 `ef_construction` 和 `m` 调大后，向量检索的精度通常会提高，这可能意味着在相同 `top_k` 下能召回更相关的内容，进一步优化模型对信息的利用效率。

## 容易做错的三处
*   日志显示 `context window exceeded` 错误：原因可能是召回内容总 token 数加上用户输入超出了 `maxContext`。
*   检索结果为空或不相关：可能是 `OCEANBASE_URL` 配置有误，导致无法连接数据库或连接到错误的实例。
*   回答内容引用信息不完整：原因可能是在 `quoteMaxToken` 限制下，部分召回内容被截断，未能全部送入模型。

## 怎么确认配好了
*   执行一次完整的问答流程，观察模型返回的引用内容是否符合预期，没有出现明显截断。
*   检查 OceanBase 数据库的连接日志，确保 `OCEANBASE_URL` 配置能够成功建立连接。
*   通过 FastGPT 后台的调试工具，查看每次检索请求返回的 `top_k` 条目是否与 `chunk_size` 配置相匹配。
*   在实际应用场景下，通过模拟高并发或大数据量检索，评估 `ef_construction` 和 `m` 参数下系统的响应时间是否满足业务需求。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
