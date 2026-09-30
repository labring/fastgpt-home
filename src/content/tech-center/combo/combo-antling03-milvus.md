---
title: AntLing 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-antling03-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 128K 上下文模型，其 `maxContext` 达 128000 token，意味着单次请求中可以承载大量召回内容与用户输入，为复杂问答和长篇文档理解提供了充足空间。单次最大输出未标注，通常表示模型会根据输入和任务智能调整输出长度。`quoteMaxToken` 引用上限为 12"
language: zh
axis_model_tier: "AntLing / 128000 /  / 120000 / false / true"
axis_vector_db: "Milvus"
covered_models: "Ling-1T、Ling-flash-2.0"
check_day: 2026-09-29
meta_title: AntLing 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: AntLing 128K 上下文模型，其 `maxContext` 达 128000 token，意味着单次请求中可以承载大量召回内容与用户输入，为复杂问答和长篇文档理解提供了充足空间。单次最大输出未标注，通常表示模型会根据输入和任务智能调整输出长度。`quoteMaxToken` 引用上限为 12
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
AntLing 128K 上下文模型，其 `maxContext` 达 128000 token，意味着单次请求中可以承载大量召回内容与用户输入，为复杂问答和长篇文档理解提供了充足空间。单次最大输出未标注，通常表示模型会根据输入和任务智能调整输出长度。`quoteMaxToken` 引用上限为 120000 token，这是用于存放引用内容的预算。引用内容合计的 token 消耗受此限制，而向量库检索出的段落条数是另一个独立的指标。工具调用 `true` 允许模型集成外部功能，进行更丰富的交互。图片输入 `false` 则表明当前模型不支持视觉输入能力。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `milvus-cluster:19530` | 标准 Milvus 集群服务地址，根据实际部署情况配置 |
| `MILVUS_TOKEN` | `按实测标定` | 访问 Milvus 的认证凭据，确保数据安全与权限控制 |
| `index_type` | `HNSW` | HNSW 索引在召回效率和精度之间提供良好平衡，适合大规模向量检索 |
| `metric_type` | `IP` | IP（内积）距离度量适用于许多语义相似度场景，与模型嵌入向量匹配度高 |
| `search_k` | `32` | 搜索过程中考虑的邻居数量，适当增大可提高召回率，但会增加计算开销 |
| `nprobe` | `20` | IVF_FLAT/IVF_PQ 索引的参数，对于 HNSW 索引无实际作用，但仍需配置 |

## 这两者互相约束的地方
模型的 128000 token 上下文预算，直接限制了召回内容的总量。当从 Milvus 召回多段内容时，`召回条数 × 每段平均 token 长度` 必须小于或等于模型的 `maxContext` 减去用户输入和系统提示所占用的 token。模型的 `quoteMaxToken` 引用上限 120000 token 专门用于引用内容，它按 token 数量进行计算。向量库返回的是按段落条数计量的结果。究竟是引用上限先触顶，还是召回条数过多导致总 token 超限，取决于每段内容的平均长度。如果每段内容较短，可能在达到引用上限前就已召回了大量条目；反之，若每段内容较长，则可能在少量条目下便触及引用上限。此外，Milvus 的 `search_k` 等索引参数调大，意味着召回阶段会考虑更多候选向量，这可能提高召回质量，但同时也会增加 Milvus 端的查询延迟，并可能导致召回的总 token 量更容易超出模型的上下文或引用预算。

## 容易做错的三处
- 日志显示 `401 Unauthorized` 错误，原因是没有正确配置 `MILVUS_TOKEN` 或其权限不足。
- 查询结果返回的段落数量远少于预期，原因可能是 `search_k` 参数设置过小，导致召回阶段过滤了大量潜在匹配项。
- 模型返回的回答中未包含任何引用信息，原因可能是召回内容总 token 超出 `quoteMaxToken` 预算，导致模型无法有效利用引用。

## 怎么确认配好了
- 通过 Milvus 客户端连接配置的 `MILVUS_ADDRESS`，执行一次简单的向量插入和查询操作，确认连接通畅且数据可读写。
- 在 FastGPT 界面配置 RAG 模块，上传一段测试文档并进行提问，观察模型的回答是否能引用到文档内容。
- 调整 RAG 配置中的召回条数和单段最大 token，通过多次提问观察模型返回的引用内容总 token 数，确保其在 `quoteMaxToken` 限制之内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
