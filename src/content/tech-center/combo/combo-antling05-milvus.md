---
title: AntLing 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-antling05-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 128K 这一档模型，其上下文长度 `maxContext` 达到 128000 token，这意味着单次输入可以容纳大量的召回内容，为模型理解复杂语境提供了充足空间。引用上限 `quoteMaxToken` 为 120000 token，这限定了模型在生成回复时可以引用的内容总预算"
language: zh
axis_model_tier: "AntLing / 128000 /  / 120000 / false / false"
axis_vector_db: "Milvus"
covered_models: "Ring-1T、Ring-flash-2.0"
check_day: 2026-09-29
meta_title: AntLing 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: AntLing 128K 这一档模型，其上下文长度 `maxContext` 达到 128000 token，这意味着单次输入可以容纳大量的召回内容，为模型理解复杂语境提供了充足空间。引用上限 `quoteMaxToken` 为 120000 token，这限定了模型在生成回复时可以引用的内容总预算
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
AntLing 128K 这一档模型，其上下文长度 `maxContext` 达到 128000 token，这意味着单次输入可以容纳大量的召回内容，为模型理解复杂语境提供了充足空间。引用上限 `quoteMaxToken` 为 120000 token，这限定了模型在生成回复时可以引用的内容总预算。引用内容的总 token 量由每段内容的长度与召回段落数量共同决定。单次最大输出未标注，通常意味着模型会根据输入和任务智能调整输出长度。图片输入为 `false`，表示该模型不支持图像作为输入的一部分。工具调用为 `false`，表明当前模型不具备直接调用外部工具的能力。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :---------- | :---------- | :---------- |
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_host:19530` | Milvus 服务默认端口，确保连接正确 |
| `MILVUS_TOKEN` | `Bearer your_api_key` | 鉴权凭证，保障数据访问安全 |
| `index_type` | `HNSW` | `HNSW` 提供高召回率和较低查询延迟，适用于大规模向量检索 |
| `metric_type` | `IP` | 内积距离 `IP` 适用于衡量向量间的相似度，与多数模型嵌入向量兼容 |
| `nprobe` | `32` | 提高查询精度，平衡查询性能与召回效果 |
| `ef` | `100` | `HNSW` 索引构建和查询参数，影响召回率与查询速度 |

## 这两者互相约束的地方
AntLing 128K 模型的上下文长度与 Milvus 向量库的召回策略存在紧密联系。模型单次处理的上下文总量受 128000 token 的限制，这意味着从 Milvus 召回的所有段落，其总 token 数不能超出此预算。同时，模型的引用上限为 120000 token，这笔预算专门用于模型生成回答时参考的召回内容。向量库的检索结果以条数计，而模型的引用上限以 token 计。因此，当每段召回内容的平均长度较短时，可以召回更多条段落；若每段内容较长，则在达到引用上限前能召回的条数就会减少。索引参数如 `ef` 或 `nprobe` 的调整，会影响 Milvus 的召回效率和精度。若这些参数调优使得 Milvus 召回更多相关但冗余的段落，可能会更快触及模型的上下文长度或引用上限，导致部分内容被截断或模型无法处理全部信息。

## 容易做错的三处
*   日志中出现 `Milvus connection failed: [Errno 111] Connection refused` 错误，原因是没有正确配置 `MILVUS_ADDRESS` 或 Milvus 服务未启动。
*   模型回答中引用的内容不完整或缺失关键信息，原因可能是在检索时设置的 `limit` 参数过小，导致召回的段落条数不足。
*   RAG 链路响应时间过长，甚至超时，原因可能是 Milvus 索引参数 `nprobe` 或 `ef` 设置过高，导致查询计算量过大。

## 怎么确认配好了
*   运行一个包含简单查询的测试用例，检查日志输出，确认 `MILVUS_ADDRESS` 和 `MILVUS_TOKEN` 成功连接 Milvus 服务。
*   对 FastGPT 平台进行一次 RAG 问答，观察模型返回的引用内容，确保引用内容与召回段落数量匹配，且引用总 token 量未超过 `quoteMaxToken`。
*   通过 Milvus 客户端工具，查询特定向量的 top-k 相似向量，对比返回结果的准确性和召回条数，与预期召回效果进行比对，以确定 `HNSW` 和 `IP` 索引参数的有效性。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
