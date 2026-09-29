---
title: StepFun 100K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-stepfun04-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "StepFun 100K 上下文模型系列，其上下文长度高达 100000 token，这决定了单次请求中模型可以处理的输入信息总量。引用上限 `quoteMaxToken` 设定了模型在生成回复时，从检索内容中可引用的 token 总预算。引用上限限定了模型可以从检索结果中采纳的内容总量，而召回条数"
language: zh
axis_model_tier: "StepFun / 100000 /  / 60000 / true / true"
axis_vector_db: "Milvus"
covered_models: "step-r1-v-mini"
check_day: 2026-09-29
meta_title: StepFun 100K 上下文 这一档模型配 Milvus 的配置口径
meta_description: StepFun 100K 上下文模型系列，其上下文长度高达 100000 token，这决定了单次请求中模型可以处理的输入信息总量。引用上限 `quoteMaxToken` 设定了模型在生成回复时，从检索内容中可引用的 token 总预算。引用上限限定了模型可以从检索结果中采纳的内容总量，而召回条数
date_published: 2026-09-29
date_modified: 2026-09-29
---

# StepFun 100K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
StepFun 100K 上下文模型系列，其上下文长度高达 100000 token，这决定了单次请求中模型可以处理的输入信息总量。引用上限 `quoteMaxToken` 设定了模型在生成回复时，从检索内容中可引用的 token 总预算。引用上限限定了模型可以从检索结果中采纳的内容总量，而召回条数限定了向量库可以返回的文档段落数量。图片输入能力表示模型能够理解并处理图像信息，工具调用能力则允许模型与外部系统或API进行交互，执行特定任务。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `127.0.0.1:19530` | Milvus 服务默认端口与本地部署常见配置 |
| `MILVUS_TOKEN` | 按实际部署密钥配置 | 安全认证，保障数据访问权限 |
| `index_type` | `HNSW` | 高效近似最近邻搜索，适用于大规模向量数据 |
| `metric_type` | `IP` | 内积距离，适用于多数文本嵌入模型的相似度计算 |
| `nprobe` | `32` | 查询时搜索的聚类数量，平衡召回率与查询速度 |
| `ef` | `128` | HNSW 图遍历参数，影响搜索精度，平衡精度与性能 |

## 这两者互相约束的地方
模型上下文预算与向量库召回内容的匹配是关键。召回条数与每段文本长度的乘积，必须控制在 StepFun 100K 模型的 `maxContext` 限制之内，以避免输入超限。模型的引用上限 `quoteMaxToken` 是按 token 数量进行预算的，而向量库返回的是固定数量的文档段落。当每段文本较短时，模型可能因引用了大量段落而达到 token 上限；当每段文本较长时，模型可能因少量段落就触及 token 上限。索引参数，如 Milvus 的 `ef` 和 `nprobe` 调大后，会提升检索的召回精度，这意味着向量库能更准确地返回与查询相关的段落。这种高精度的召回有助于模型在有限的引用上限内获得更优质的输入，从而可能提升模型输出的质量和相关性。

## 容易做错的三处
*   调用模型时出现 HTTP 400 错误，提示 `context_length_exceeded`。原因通常是向量库返回的段落总 token 数加上用户查询的总 token 数超出了模型的 `maxContext` 限制。
*   模型输出内容与期望的引用信息关联性不强，部分关键信息缺失。原因可能是 Milvus 的索引参数（如 `nprobe`、`ef`）设置过低，导致召回的段落质量不高或相关性不足。
*   检索结果中的 `score` 字段普遍偏低，或返回的条数远少于预期。原因可能是 Milvus 的 `collection` 或 `partition` 配置错误，或者向量嵌入模型与 Milvus 存储的向量空间不匹配。

## 怎么确认配好了
*   执行一系列带不同查询的 RAG 请求，检查模型输出中引用的内容是否与召回的源文档段落高度相关，并观察日志中 `quote_token_count` 是否合理。
*   在 Milvus 客户端执行 `search` 操作，并检查返回的 `top_k` 结果的 `distance` 值分布，确保相似度分数符合预期范围。
*   通过 FastGPT 界面或 API 提交包含复杂查询的请求，观察模型在多次迭代后，其回复是否能持续有效利用召回信息，并检查 Milvus 服务端的 CPU 和内存利用率，确保系统稳定。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
