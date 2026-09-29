---
title: Qwen 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-qwen08-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Qwen 系列模型在 128000 的上下文长度下，一次处理的信息量非常大，能够容纳大量召回内容。引用上限 100000 意味着模型在生成回答时，引用内容的 token 总量有明确的预算限制。段落条数由检索系统的返回决定，这与引用内容的 token 预算是不同的量。模型具备工具调用能力，支持与外部系"
language: zh
axis_model_tier: "Qwen / 128000 /  / 100000 / false / true"
axis_vector_db: "Milvus"
covered_models: "qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b"
check_day: 2026-09-29
meta_title: Qwen 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Qwen 系列模型在 128000 的上下文长度下，一次处理的信息量非常大，能够容纳大量召回内容。引用上限 100000 意味着模型在生成回答时，引用内容的 token 总量有明确的预算限制。段落条数由检索系统的返回决定，这与引用内容的 token 预算是不同的量。模型具备工具调用能力，支持与外部系
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Qwen 系列模型在 128000 的上下文长度下，一次处理的信息量非常大，能够容纳大量召回内容。引用上限 100000 意味着模型在生成回答时，引用内容的 token 总量有明确的预算限制。段落条数由检索系统的返回决定，这与引用内容的 token 预算是不同的量。模型具备工具调用能力，支持与外部系统进行交互以完成复杂任务。图片输入功能当前未开放，因此不适合处理多模态图像信息。

## 配 Milvus 要定哪些

| 配置项             | 建议取法       | 这样取的依据                               |
| :----------------- | :------------- | :----------------------------------------- |
| `MILVUS_ADDRESS`   | `localhost:19530` | 标准本地 Milvus 服务地址                   |
| `MILVUS_TOKEN`     | 按实际标定     | 认证鉴权凭证，确保访问安全                 |
| `HNSW` `efConstruction` | `64`            | 索引构建时控制邻居数量，平衡召回与性能     |
| `HNSW` `M`         | `16`            | 邻居数量，影响搜索精度和索引大小           |
| `IP`               | `COSINE`       | 相似度计算方式，适用于文本嵌入的余弦距离   |
| `recall_k`         | `前 20 条`     | 向量检索返回的条目数量，初步筛选相关内容   |

## 这两者互相约束的地方
模型的上下文长度决定了单次请求中可以包含的召回内容总量，其中引用上限 100000 token 是对这部分内容的具体预算。向量库返回的段落数量和每段内容的长度共同决定了总的 token 消耗。引用上限按 token 计数，而向量库返回的是固定条数的段落，因此引用内容的 token 预算和向量检索的条数是两个独立的约束条件。当每段内容较短时，可以在引用上限内包含更多条段落；当每段内容较长时，即使条数较少也可能达到引用上限。Milvus 的索引参数，例如 `HNSW` 的 `efConstruction` 和 `M` 值，调大可以提升检索精度，从而为模型提供更准确的上下文信息，但这会增加索引构建和查询的计算开销。

## 容易做错的三处
*   日志显示“Context window exceeded”，原因是没有正确估算向量检索返回内容的总 token 数，导致超过模型上下文限制。
*   检索结果返回的 `score` 字段普遍偏高，原因是没有对向量数据进行有效清洗或标准化，导致相似度计算失真。
*   用户提问后模型返回内容与预期关联度不高，原因可能是 `recall_k` 设置过小，未能召回足够的相关信息。

## 怎么确认配好了
*   在 FastGPT 界面调试，观察“引用内容”区域的 token 计数是否稳定在引用上限 100000 token 以下。
*   通过 Milvus 客户端执行 `search` 操作，检查返回的 `top_k` 结果是否包含与查询高度相关的条目，并评估 `score` 分布。
*   针对典型问题，反复测试模型生成回答的质量和引用内容的准确性，根据实际效果调整 Milvus 的 `HNSW` 参数。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
