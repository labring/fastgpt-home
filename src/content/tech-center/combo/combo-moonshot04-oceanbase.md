---
title: Moonshot 32K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-moonshot04-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot 32K 这一档模型，其上下文长度为 `32000` tokens，决定了单次请求中可处理的输入（包括用户提问、历史对话、系统指令及召回内容）总量。引用上限 `32000` tokens 意味着知识库检索到的内容总和不应超过此限制。工具调用 `true` 开启了模型与外部系统交互的能"
language: zh
axis_model_tier: "Moonshot / 32000 /  / 32000 / false / true"
axis_vector_db: "OceanBase"
covered_models: "moonshot-v1-32k"
check_day: 2026-09-29
meta_title: Moonshot 32K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Moonshot 32K 这一档模型，其上下文长度为 `32000` tokens，决定了单次请求中可处理的输入（包括用户提问、历史对话、系统指令及召回内容）总量。引用上限 `32000` tokens 意味着知识库检索到的内容总和不应超过此限制。工具调用 `true` 开启了模型与外部系统交互的能
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 32K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
Moonshot 32K 这一档模型，其上下文长度为 `32000` tokens，决定了单次请求中可处理的输入（包括用户提问、历史对话、系统指令及召回内容）总量。引用上限 `32000` tokens 意味着知识库检索到的内容总和不应超过此限制。工具调用 `true` 开启了模型与外部系统交互的能力，可用于执行特定任务或获取实时信息。图片输入 `false` 则表明模型不支持直接处理图像数据。单次最大输出未标注，但通常建议在实际应用中根据业务需求设定合理范围，避免过长或过短的响应。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `OCEANBASE_URL` | `ob://user:pass@host:port/db` | OceanBase 连接协议与凭证，确保 FastGPT 能正确连接到向量库实例。 |
| `ef_construction` | `80–120` | HNSW 索引构建参数，影响索引质量与构建速度，兼顾召回准确性与资源消耗。 |
| `m=16` | `16` | HNSW 索引参数，决定了每个节点的最大邻居数，影响召回效率和存储开销。 |
| `recall_top_k` | `5–8` 条 | 向量检索返回的文档片段数量，需与模型引用上限及单段长度匹配。 |
| `chunk_size` | `800–1200` 字符 | 知识库文档切分粒度，影响单段信息密度和召回效果，避免过大或过小。 |
| `embedding_model` | `text-embedding-v2` | FastGPT 侧用于生成向量的嵌入模型名称，需与 OceanBase 中存储的向量维度一致。 |

## 这两者互相约束的地方
模型的上下文长度对知识库召回提出了明确约束。召回条数与每段长度的乘积，加上用户提问和历史对话的tokens量，必须小于模型的上下文长度 `32000`。例如，如果每段长度设定为 1000 tokens，则最多只能召回约 30 段。引用上限 `32000` tokens 进一步限制了知识库召回内容的总量，即使向量库返回了更多条目，FastGPT 也会在此限制内进行截断或筛选。在实际操作中，向量库的返回条数 (`recall_top_k`) 优先由 FastGPT 的配置生效，确保传入模型的内容符合引用上限。索引参数 `ef_construction` 和 `m` 调大，通常会提升召回的准确性，但也会增加索引构建时间和查询延迟，对于模型而言，这意味着可以获得更相关的上下文，但需平衡系统性能。

## 容易做错的三处
* 连接 OceanBase 报错 `SQLSTATE[HY000]: General error: 2005 Unknown MySQL server host`：`OCEANBASE_URL` 中的主机名或端口配置不正确。
* 知识库召回内容为空或不相关：`ef_construction` 或 `m` 参数设置过低，导致索引质量不佳，或 `chunk_size` 不合理。
* 模型响应内容短或不完整：召回条数 (`recall_top_k`) 过少，未能提供足够信息支撑模型生成完整回答，或模型输出限制过严。

## 怎么确认配好了
* 通过 FastGPT 管理界面上传文档至知识库，观察 OceanBase 数据库中是否有新增的向量数据，并通过 `SELECT COUNT(*) FROM your_vector_table;` 确认。
* 在 FastGPT 平台进行一次 RAG 问答测试，检查日志输出中是否有 OceanBase 的查询记录，并核对召回的文档片段数量与内容。
* 调整 FastGPT 知识库配置中的召回条数 (`recall_top_k`)，然后再次进行测试，观察模型回答的详细程度和引用内容的变化，以确定召回策略是否符合预期。
* 检查 FastGPT 运行时对 OceanBase 的连接状态，确保没有 `ERROR 2003 (HY000): Can't connect to MySQL server` 等连接错误。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
