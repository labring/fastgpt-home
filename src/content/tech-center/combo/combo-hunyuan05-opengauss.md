---
title: Hunyuan 28K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-hunyuan05-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`hunyuan-pro` 模型提供 28000 的上下文长度，这意味着单次请求中可以包含的输入内容总量（包括用户提问、系统指令和召回内容）有此限制。模型的引用上限同样为 28000 token，这是专门用于召回内容的总 token 预算。引用内容的条数由检索侧决定，引用上限约束的是这些召回内容的总"
language: zh
axis_model_tier: "Hunyuan / 28000 /  / 28000 / false / false"
axis_vector_db: "openGauss"
covered_models: "hunyuan-pro"
check_day: 2026-09-29
meta_title: Hunyuan 28K 上下文 这一档模型配 openGauss 的配置口径
meta_description: `hunyuan-pro` 模型提供 28000 的上下文长度，这意味着单次请求中可以包含的输入内容总量（包括用户提问、系统指令和召回内容）有此限制。模型的引用上限同样为 28000 token，这是专门用于召回内容的总 token 预算。引用内容的条数由检索侧决定，引用上限约束的是这些召回内容的总
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 28K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
`hunyuan-pro` 模型提供 28000 的上下文长度，这意味着单次请求中可以包含的输入内容总量（包括用户提问、系统指令和召回内容）有此限制。模型的引用上限同样为 28000 token，这是专门用于召回内容的总 token 预算。引用内容的条数由检索侧决定，引用上限约束的是这些召回内容的总 token 消耗。模型不支持图片输入，因此无法处理视觉信息。同时，此档模型不具备工具调用能力，无法通过外部工具扩展其功能边界。

## 配 openGauss 要定哪些

| 配置项             | 建议取法       | 这样取的依据                                                                 |
| :----------------- | :------------- | :--------------------------------------------------------------------------- |
| `OPENGAUSS_URL`    | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的必要参数，格式固定。                     |
| `ef_construction`  | `100–200`      | 索引构建时的邻居搜索参数，数值越大，索引质量越高，检索精度提升，但构建时间增加。 |
| `ef_search`        | `50–100`       | 查询时的邻居搜索参数，数值越大，召回率越高，但查询延迟可能增加。             |
| `m`                | `32`           | HNSW 索引的图层最大连接数，影响索引结构和查询性能。                        |
| `recall_max_docs`  | `前 5 条`      | 向量检索返回的最大文档条数，需与模型引用上限综合考虑。                       |
| `chunk_token_size` | `800–1200 token` | 文本切片时的最大 token 长度，影响单条召回内容的粒度和数量。                  |

## 这两者互相约束的地方
模型 28000 token 的上下文长度和引用上限，对 openGauss 的检索策略构成直接约束。向量库召回的条数乘以每条内容的 token 长度，其总和必须控制在模型的上下文预算之内，同时不能超出 28000 token 的引用上限。引用上限是以 token 计量的，而向量库返回的是文档条数。最终的召回内容量，取决于单条内容的平均 token 长度。如果单条内容较短，可以召回更多条；如果单条内容较长，则能召回的条数会相应减少。openGauss 索引参数 `ef_construction` 和 `ef_search` 调大后，向量检索的召回精度和召回率会提高，这可能意味着 FastGPT 能从向量库中获取到更相关的内容。

## 容易做错的三处
*   日志显示 `Error: Context window exceeded`：召回内容总 token 量加上用户输入和系统指令，超过了 28000 的上下文长度。
*   FastGPT 界面回复内容过短或不完整：向量库返回的召回内容条数不足，或单条内容过短，导致模型缺乏足够信息生成完整回复。
*   控制台显示 `openGauss connection refused`：`OPENGAUSS_URL` 配置错误，数据库连接失败。

## 怎么确认配好了
*   在 FastGPT 知识库中上传文档，观察 `hunyuan-pro` 模型能否正常进行问答，并检查回复内容是否充分利用了知识库信息。
*   通过 FastGPT 的调试接口，查看每次请求的输入 token 数量和召回内容 token 数量，确保其在 28000 的引用上限内。
*   监控 openGauss 数据库的连接状态和查询日志，确认 FastGPT 能够稳定、高效地进行向量检索操作。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
