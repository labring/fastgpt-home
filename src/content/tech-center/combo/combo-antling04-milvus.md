---
title: AntLing 64K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-antling04-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 的 `Ling-mini-2.0` 模型，其 64000 的上下文长度（`maxContext`）定义了单次交互中模型能处理的总输入量，包含用户查询和召回内容。引用上限（`quoteMaxToken`）为 60000，这是专门分配给引用内容的 token 预算，它限定了所有召回段落合"
language: zh
axis_model_tier: "AntLing / 64000 /  / 60000 / false / true"
axis_vector_db: "Milvus"
covered_models: "Ling-mini-2.0"
check_day: 2026-09-29
meta_title: AntLing 64K 上下文 这一档模型配 Milvus 的配置口径
meta_description: AntLing 的 `Ling-mini-2.0` 模型，其 64000 的上下文长度（`maxContext`）定义了单次交互中模型能处理的总输入量，包含用户查询和召回内容。引用上限（`quoteMaxToken`）为 60000，这是专门分配给引用内容的 token 预算，它限定了所有召回段落合
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 64K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
AntLing 的 `Ling-mini-2.0` 模型，其 64000 的上下文长度（`maxContext`）定义了单次交互中模型能处理的总输入量，包含用户查询和召回内容。引用上限（`quoteMaxToken`）为 60000，这是专门分配给引用内容的 token 预算，它限定了所有召回段落合计能占用的 token 数量。引用上限是引用内容合计占用的 token 预算，段落条数由检索侧的返回条数决定，两者是不同的量。模型支持工具调用（`tool_calling` 为 `true`），允许通过外部工具扩展其能力。不支持图片输入（`image_input` 为 `false`），表示无法直接处理图像信息。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `milvus.svc.cluster.local:19530` | 内部服务发现地址，保障高可用与低延迟。 |
| `MILVUS_TOKEN` | 按实际密钥配置 | 认证凭证，确保访问安全。 |
| `index_type` | `HNSW` | 在高维数据上提供高效的近似最近邻搜索性能。 |
| `metric_type` | `IP` | 适用于文本嵌入向量，度量向量间的相似度。 |
| `top_k` | `5-10` 条 | 根据引用上限和单段平均 token 数，平衡召回质量与上下文预算。 |
| `chunk_overlap` | `10-20%` | 确保上下文连续性，避免语义割裂。 |

## 这两者互相约束的地方
模型的 64000 上下文长度是总预算，它限定了用户查询与召回内容的总和。引用上限 60000 token 专门用于召回内容。当向量库返回多段内容时，这些段落的合计 token 数量不能超过 60000。如果单段文本较长，即便召回条数不多，也可能迅速触及引用上限；反之，若单段文本较短，则可以召回更多条目。向量库的 `top_k` 参数决定了召回的段落数量。索引参数如 `HNSW` 的 `M` 和 `efConstruction` 值调大，可以提升搜索精度，这意味着模型能获得更相关的召回内容，从而可能在引用上限内提供更准确的回答。索引参数的调整不直接改变模型的上下文预算，但会影响这些预算如何被有效利用。

## 容易做错的三处
*   日志显示 `Milvus connection failed: [Errno 111] Connection refused`，原因可能是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   模型返回的引用内容为空，而 Milvus 检索有结果，原因可能是召回内容的合计 token 超过了 60000 的引用上限，导致内容被截断或丢弃。
*   查询结果与预期不符，响应中包含大量不相关信息，原因可能是 `metric_type` 或 `index_type` 配置不当，导致向量相似度计算不准确。

## 怎么确认配好了
*   通过 FastGPT 界面执行一次带有检索的对话，检查响应中是否包含预期数量的引用内容。
*   在 Milvus 控制台或通过 SDK 查询，验证 `HNSW` 索引的 `M` 和 `efConstruction` 参数是否已按配置生效。
*   观察 FastGPT 后台日志，确保没有 Milvus 相关的连接错误或认证失败信息。
*   进行多轮对话测试，其中包含不同长度的用户查询和预期召回内容，以评估模型在 60000 引用上限下对召回内容的利用情况。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
