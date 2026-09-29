---
title: Ernie 128K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-ernie03-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型提供了高达 128000 的上下文长度（`maxContext`），这意味着单次请求能够处理大量输入信息，为复杂的问答和推理任务提供了充足的空间。引用上限（`quoteMaxToken`）为 119000，这是对引用内容总 token 数量的预算。模型能够处理图片输入"
language: zh
axis_model_tier: "Ernie / 128000 /  / 119000 / true / true"
axis_vector_db: "openGauss"
covered_models: "ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Ernie 128K 上下文模型提供了高达 128000 的上下文长度（`maxContext`），这意味着单次请求能够处理大量输入信息，为复杂的问答和推理任务提供了充足的空间。引用上限（`quoteMaxToken`）为 119000，这是对引用内容总 token 数量的预算。模型能够处理图片输入
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型提供了高达 128000 的上下文长度（`maxContext`），这意味着单次请求能够处理大量输入信息，为复杂的问答和推理任务提供了充足的空间。引用上限（`quoteMaxToken`）为 119000，这是对引用内容总 token 数量的预算。模型能够处理图片输入，支持多模态交互。工具调用功能允许模型与外部工具集成，扩展了其解决问题的能力。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | 连接 openGauss 数据库的必要信息 |
| `ef_construction` | `800–1200` | 影响索引构建质量与查询速度的平衡 |
| `ef_search` | `100–200` | 影响查询召回率与查询速度的平衡 |
| `m` | `32` | HNSW 索引的邻居数量，影响搜索精度 |
| `chunk_size` | `500` 字符 | 文本切片的平均长度，影响召回粒度 |
| `top_k` | `5–10` 条 | 向量检索返回的段落数量，影响引用内容总量 |

## 这两者互相约束的地方
这一档模型 128000 的上下文长度，决定了召回条数与每段长度的乘积不能超出此限制。引用上限 119000 token，限定了引用内容的总 token 预算。向量库返回的段落数量是按条计数的，而模型的引用上限是按 token 计数的，引用内容的实际 token 数量取决于每段文本的平均长度。索引参数 `ef_construction` 和 `ef_search` 调大后，向量检索的精度和召回率会提升，这可能导致返回更多或更相关的段落，进而影响引用内容的 token 消耗。因此，需要根据模型引用上限和实际段落长度，调整 `top_k` 参数以控制引用内容的 token 总量。

## 容易做错的三处
- 日志中出现 `connection refused` 错误，原因是没有正确配置 `OPENGAUSS_URL` 环境变量或数据库服务未启动。
- 检索结果返回的段落数量远低于预期，原因是 `ef_search` 参数设置过低，导致搜索范围受限。
- 模型回答内容缺乏相关引用，原因是 `chunk_size` 过大导致切片粒度过粗，或 `top_k` 过小导致召回条数不足。

## 怎么确认配好了
- 运行一次端到端查询，检查 FastGPT 界面上引用的内容是否与 openGauss 向量库中的原始文本一致。
- 监控 openGauss 数据库的 CPU 和内存使用率，确保在高并发查询下系统资源稳定。
- 通过 FastGPT 的调试功能，查看模型实际接收到的引用 token 数量，确保其在 119000 引用上限内。
- 调整 `ef_search` 和 `ef_construction` 参数，观察查询延迟和召回结果的相关性变化，找到适合业务场景的阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
