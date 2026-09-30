---
title: Ernie 128K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-ernie04-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型，其 `ernie-4.5-turbo-128k` 具备 128000 的上下文长度，这决定了单次请求中可输入的最大文本量，包括用户提问、历史对话和召回内容。引用上限 123000 表示模型在生成回答时，引用外部召回内容的 token 总量不能超过此数值，这与召回的段"
language: zh
axis_model_tier: "Ernie / 128000 /  / 123000 / false / false"
axis_vector_db: "openGauss"
covered_models: "ernie-4.5-turbo-128k"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Ernie 128K 上下文模型，其 `ernie-4.5-turbo-128k` 具备 128000 的上下文长度，这决定了单次请求中可输入的最大文本量，包括用户提问、历史对话和召回内容。引用上限 123000 表示模型在生成回答时，引用外部召回内容的 token 总量不能超过此数值，这与召回的段
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型，其 `ernie-4.5-turbo-128k` 具备 128000 的上下文长度，这决定了单次请求中可输入的最大文本量，包括用户提问、历史对话和召回内容。引用上限 123000 表示模型在生成回答时，引用外部召回内容的 token 总量不能超过此数值，这与召回的段落数量无关，而是与召回内容的整体篇幅紧密关联。单次最大输出未标注，意味着模型输出长度由实际生成内容和上下文预算共同决定。该模型不支持图片输入和工具调用，因此 RAG 架构中无需考虑多模态输入和外部工具集成。

## 配 openGauss 要定哪些

| 配置项             | 建议取法       | 这样取的依据                               |
| :----------------- | :------------- | :----------------------------------------- |
| `OPENGAUSS_URL`    | `postgresql://user:password@host:port/dbname` | 连接到 openGauss 数据库的必要信息          |
| `ef_construction`  | `64`–`128`     | 索引构建时的邻居数量，影响索引质量和构建速度 |
| `ef_search`        | `40`–`60`      | 搜索时邻居数量，影响召回精度和查询延迟     |
| `m = 32`           | `32`           | HNSW 图算法中每层最大连接数，影响内存和查询 |
| `vector_dimension` | `1024`         | 与嵌入模型输出向量维度保持一致             |
| `recall_top_k`     | `5`–`10` 条    | 检索时返回的最相关向量条数                 |

## 这两者互相约束的地方
模型的 128000 上下文长度是总预算，其中引用上限 123000 专门用于承载外部召回内容。openGauss 向量库返回的是条数，每条内容的 token 长度不固定。因此，检索侧返回的条数乘以每段内容的平均 token 长度，不能超出 123000 的引用上限，同时总和也不能超出 128000 的上下文长度。如果单段内容较长，即使召回条数不多，也可能迅速触及引用上限。反之，如果每段内容短小精悍，则可以召回更多条目。openGauss 的 `ef_construction` 和 `ef_search` 等索引参数调大，通常会提升召回的精确度，这意味着模型能获得更相关的信息，但同时也可能增加向量检索的时间开销，需要根据实际应用场景权衡。

## 容易做错的三处
*   日志显示 `context_length_exceeded` 错误：召回条数过多，或者每段内容过长，导致引用内容 token 总量超出模型的 123000 引用上限。
*   返回结果中关键信息缺失或不准确：openGauss 的 `ef_search` 参数设置过低，导致召回精度不足，未能检索到最相关的文档。
*   查询响应时间过长：openGauss 的索引参数 `ef_construction` 或 `m` 设置过高，导致索引构建或查询时计算量过大。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传典型文档后，查看分段后的平均 token 长度，并以此估算在给定 123000 引用上限下，openGauss 最多能召回的条数。
*   通过 FastGPT 的 RAG 调试功能，在不同 `recall_top_k` 设置下，观察召回内容是否相关，并检查模型输出是否有效利用了召回信息。
*   监控 openGauss 数据库的查询延迟，确保在 `ef_search` 和 `m` 等参数调整后，查询性能仍在可接受范围内，具体阈值应根据业务 SLA 确定。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
