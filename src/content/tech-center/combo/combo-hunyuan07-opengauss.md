---
title: Hunyuan 6K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-hunyuan07-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 6K 上下文模型提供了 6000 token 的上下文长度，这决定了单次请求中可以包含的指令、历史对话和召回内容的上限。单次最大输出未标注，意味着模型可以根据上下文生成较长的回答，但实际输出长度仍受总上下文窗口的约束。引用上限 6000 token，用于限定模型在生成回答时可以引用的"
language: zh
axis_model_tier: "Hunyuan / 6000 /  / 6000 / true / false"
axis_vector_db: "openGauss"
covered_models: "hunyuan-turbo-vision"
check_day: 2026-09-29
meta_title: Hunyuan 6K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Hunyuan 6K 上下文模型提供了 6000 token 的上下文长度，这决定了单次请求中可以包含的指令、历史对话和召回内容的上限。单次最大输出未标注，意味着模型可以根据上下文生成较长的回答，但实际输出长度仍受总上下文窗口的约束。引用上限 6000 token，用于限定模型在生成回答时可以引用的
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 6K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 6K 上下文模型提供了 6000 token 的上下文长度，这决定了单次请求中可以包含的指令、历史对话和召回内容的上限。单次最大输出未标注，意味着模型可以根据上下文生成较长的回答，但实际输出长度仍受总上下文窗口的约束。引用上限 6000 token，用于限定模型在生成回答时可以引用的内容总量，引用内容总 token 数在此预算内。图片输入能力允许模型处理多模态输入，支持图文混合场景，而工具调用功能缺失则表示该模型不直接支持通过函数调用与外部系统交互。

## 配 openGauss 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | 连接 openGauss 数据库的必要参数，确保 FastGPT 能够访问向量存储。 |
| `ef_construction` | `128` | HNSW 索引构建参数，影响索引质量和构建速度，提高召回精度。 |
| `ef_search` | `64` | HNSW 搜索参数，影响搜索召回率和搜索速度，权衡性能与准确性。 |
| `m` | `32` | HNSW 图结构参数，控制每个节点的最大连接数，影响索引大小和查询效率。 |
| `recall_top_k` | `前 5 条` | FastGPT 检索时从 openGauss 获取的向量条数，用于填充上下文。 |
| `chunk_size` | `800` | 文本切片的最大字符数，影响单段内容的粒度与上下文填充效率。 |

## 这两者互相约束的地方
模型 6000 token 的上下文长度是核心约束。openGauss 向量库召回的条目，其内容长度总和不能超过这一上下文预算。引用上限为 6000 token，这是模型可引用内容的总预算，以 token 数衡量。openGauss 向量库返回的是固定数量的条目，每个条目包含一定长度的文本。当单条目文本较短时，模型可以引用更多条目；当单条目文本较长时，即使返回条目数不多，也可能迅速触及引用上限。openGauss 索引参数 `ef_construction` 和 `ef_search` 调大，通常会提升召回的准确性，这意味着模型在有限的引用预算内，能够获得更相关的上下文内容，从而可能提升回答质量。

## 容易做错的三处
* 检索结果为空，或者返回的召回内容与问题不相关。原因：openGauss 索引配置 `ef_search` 过低，导致检索精度不足，或者向量嵌入模型与查询模型不匹配。
* 模型回答内容过短，且未引用任何召回内容。原因：FastGPT 配置的 `recall_top_k` 返回条数过少，或者返回的文档内容总 token 超过了模型的引用上限。
* FastGPT 启动时报错 `Connection refused`。原因：`OPENGAUSS_URL` 配置错误，导致无法连接 openGauss 数据库，或者数据库服务未启动。

## 怎么确认配好了
* 检查 FastGPT 日志，确认 `OPENGAUSS_URL` 连接成功，没有数据库连接错误信息。
* 在 FastGPT 界面进行一次包含 RAG 的对话测试，观察模型回答中是否包含引用内容，并核对引用内容是否与召回条目一致。
* 通过 FastGPT 的调试接口或日志，查看每次召回的 `recall_top_k` 实际返回条数，以及这些条目内容的总 token 数，确认在模型上下文和引用上限内。
* 调整 openGauss 的 `ef_search` 参数，并观察 FastGPT 检索结果的相关性变化，确定合适的召回精度阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
