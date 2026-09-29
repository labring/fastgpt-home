---
title: Yi 16K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-yi01-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Yi 16K 上下文模型提供 16000 个 token 的处理能力。这决定了单次请求中模型可以接收的输入总长度，包括用户查询和知识库召回内容。引用上限 12000 个 token 意味着在 RAG 场景下，用于知识库引用的部分最多只能占用 12000 token。模型不具备图片输入能力，因此无法直"
language: zh
axis_model_tier: "Yi / 16000 /  / 12000 / false / false"
axis_vector_db: "OceanBase"
covered_models: "yi-lightning"
check_day: 2026-09-29
meta_title: Yi 16K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Yi 16K 上下文模型提供 16000 个 token 的处理能力。这决定了单次请求中模型可以接收的输入总长度，包括用户查询和知识库召回内容。引用上限 12000 个 token 意味着在 RAG 场景下，用于知识库引用的部分最多只能占用 12000 token。模型不具备图片输入能力，因此无法直
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Yi 16K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么

Yi 16K 上下文模型提供 16000 个 token 的处理能力。这决定了单次请求中模型可以接收的输入总长度，包括用户查询和知识库召回内容。引用上限 12000 个 token 意味着在 RAG 场景下，用于知识库引用的部分最多只能占用 12000 token。模型不具备图片输入能力，因此无法直接处理图像信息。同时，缺少工具调用能力，表示模型不能直接执行外部函数或 API 以获取实时信息或完成特定任务，需要通过外部 Agent 框架进行封装。

## 配 OceanBase 要定哪些

| 配置项             | 建议取法       | 这样取的依据                                                 |
| :----------------- | :------------- | :----------------------------------------------------------- |
| `OCEANBASE_URL`    | `jdbc:mysql://<host>:<port>/<db>?user=<user>&password=<pwd>` | OceanBase 兼容 MySQL 协议，使用 JDBC 连接字符串指定实例地址、端口、数据库、用户和密码。 |
| `ef_construction`  | `64`           | 影响 HNSW 索引构建时的邻居搜索效率与索引质量，值越大索引构建时间越长但召回精度越高。 |
| `m`                | `16`           | HNSW 索引中每个节点的最大出边数量，影响索引大小和搜索性能，值越大召回精度越高。 |
| `top_k`            | `5`            | 向量检索时返回的相似度最高的前 K 条结果，直接影响召回数量。 |
| `chunk_size`       | `800-1200 字符` | 知识库文档切分时的文本块大小，需结合模型上下文长度与引用上限进行调整。 |
| `overlap_size`     | `100 字符`     | 文档切分时相邻文本块的重叠部分，有助于保持上下文连贯性。 |

## 这两者互相约束的地方

模型 16000 token 的上下文长度与 OceanBase 召回的知识段落之间存在直接约束。知识库召回的条数乘以每条的平均 token 长度，其总和不能超过模型上下文长度的可用部分。例如，若 `top_k` 设置为 5，每个 `chunk_size` 对应约 500 token，则召回内容大约占用 2500 token。这部分加上用户查询、系统提示词等，总和必须小于 16000 token。引用上限 12000 token 进一步限制了知识库内容在整个上下文中的占比，即使模型总上下文允许，引用部分也不能超出此限制。当 OceanBase 的 `ef_construction` 或 `m` 参数调大时，通常意味着向量索引的召回精度更高，可能在相同 `top_k` 下返回更相关的结果，从而提高模型利用知识库的效率，但也会增加索引构建和查询的资源消耗。

## 容易做错的三处

*   RAG 问答结果为空，日志显示 `Context window exceeded`。原因在于知识库召回内容加上用户查询的总长度超过了模型的上下文长度。
*   OceanBase 向量检索返回结果不准确，但 `top_k` 数量正确。原因可能是 `ef_construction` 或 `m` 参数设置过小，导致 HNSW 索引构建质量不高，影响召回精度。
*   知识库文档上传后，检索时无法命中关键信息。原因可能是 `chunk_size` 设置过大或过小，导致关键信息被截断或上下文不足。

## 怎么确认配好了

*   在 FastGPT 界面上传测试文档，并进行多轮问答，观察召回内容是否准确且完整。
*   检查模型请求日志，确认 `prompt_tokens` 和 `completion_tokens` 未超出模型的上下文限制。
*   通过 FastGPT 的调试功能，查看 OceanBase 向量检索的 `top_k` 返回结果，评估其相关性。
*   监控 OceanBase 实例的 CPU、内存和 I/O 使用率，确保在负载下性能稳定，无明显瓶颈。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
