---
title: ChatGLM 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-chatglm06-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "ChatGLM 128K 上下文模型系列，包括 `glm-4.5`、`glm-4.5-x`、`glm-4.5-air`、`glm-4.5-airx`、`glm-4.5-flash`、`glm-4-air`、`glm-4-flash`、`glm-4-plus`，其 128000 的上下文长度决定了单次"
language: zh
axis_model_tier: "ChatGLM / 128000 /  / 120000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4-air、glm-4-flash、glm-4-plus"
check_day: 2026-09-29
meta_title: ChatGLM 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: ChatGLM 128K 上下文模型系列，包括 `glm-4.5`、`glm-4.5-x`、`glm-4.5-air`、`glm-4.5-airx`、`glm-4.5-flash`、`glm-4-air`、`glm-4-flash`、`glm-4-plus`，其 128000 的上下文长度决定了单次
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
ChatGLM 128K 上下文模型系列，包括 `glm-4.5`、`glm-4.5-x`、`glm-4.5-air`、`glm-4.5-airx`、`glm-4.5-flash`、`glm-4-air`、`glm-4-flash`、`glm-4-plus`，其 128000 的上下文长度决定了单次请求中模型能处理的输入信息总量。120000 的引用上限，意味着知识库在单次召回中能提供给模型参考的段落数量存在硬性天花板。单次最大输出未标注，通常表示模型会根据输入信息和输出需求生成尽可能长的回答，但实际仍受限于模型内部设定。图片输入为 `false`，表明此模型不支持直接处理图像信息。工具调用为 `true`，则允许模型在生成回答时，通过调用预设工具来获取外部信息或执行特定动作。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项             | 建议取法       | 这样取的依据                                       |
| :----------------- | :------------- | :------------------------------------------------- |
| `PG_URL`           | `postgresql://...` | 标准连接字符串格式，确保数据库可达性与认证信息正确。 |
| `ef_construction`  | `64`–`128`     | 影响索引构建时的邻居搜索范围，数值越大索引质量越高，但构建时间增加。 |
| `ef_search`        | `40`–`80`      | 影响查询时的邻居搜索范围，数值越大召回精度越高，但查询延迟增加。 |
| `m`                | `32`           | HNSW 图算法的边数，影响图的连接密度和搜索效率。 |
| `vector_ip_ops`    | `true`         | 启用内积相似度计算，与大多数嵌入模型输出的向量匹配。 |
| `max_connections`  | `100`–`200`    | 根据 FastGPT 并发量和数据库资源设定，避免连接池耗尽。 |

## 这两者互相约束的地方
模型上下文长度与向量库召回内容之间存在紧密约束。ChatGLM 128K 上下文模型具备 128000 的上下文处理能力，而其引用上限为 120000。这意味着从 pgvector 召回的知识段落总字符数，加上用户查询和系统提示，必须控制在 128000 字符以内。同时，知识库引用段落数不能超过 120000 的引用上限。在实际应用中，pgvector 的 `LIMIT` 参数（向量库返回条数）与 FastGPT 的召回策略共同决定了最终传入模型的段落数量。通常情况下，召回条数会远小于引用上限，更重要的是保证“召回条数 × 每段平均长度”不超过上下文预算。调整 pgvector 的索引参数 `ef_construction` 和 `ef_search`，可以优化向量召回的质量和速度。较高的 `ef_search` 值能提升召回精度，但会增加查询耗时，这可能间接影响模型等待响应的时间。

## 容易做错的三处
*   日志显示“Context window exceeded”，原因是召回段落总字符数加上用户输入超过了 128000 的上下文长度。
*   FastGPT 界面提示“知识库引用数量超限”，原因是向量库返回的条目数量超过了模型的 120000 引用上限。
*   查询响应时间显著增长，原因是 `ef_search` 参数设置过高，导致 pgvector 在进行向量搜索时计算量过大。

## 怎么确认配好了
*   在 FastGPT 中配置并测试知识库，观察模型回复中引用的知识段落是否准确且充分。
*   检查 FastGPT 的系统日志，确认没有出现“Context window exceeded”或“知识库引用数量超限”的错误信息。
*   通过 FastGPT 的调试模式，查看每次请求传递给模型的 `prompt` 内容，确保知识库召回的文本长度在预期范围内。
*   使用数据库监控工具观察 PostgreSQL 的查询延迟和资源占用，确保 `ef_search` 等参数设置在可接受的性能范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
