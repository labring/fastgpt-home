---
title: ChatGLM 128K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-chatglm06-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "本档模型以 128000 的上下文长度为特点，这意味着在单次对话中，模型可以处理更长的用户输入、系统指令以及从知识库检索到的信息。引用上限 120000 规定了知识库内容在送入模型前可占据的最大 token 数，这直接影响了召回内容的广度。模型支持工具调用，允许其与外部系统进行交互以执行特定任务，但"
language: zh
axis_model_tier: "ChatGLM / 128000 /  / 120000 / false / true"
axis_vector_db: "openGauss"
covered_models: "glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4-air、glm-4-flash、glm-4-plus"
check_day: 2026-09-29
meta_title: ChatGLM 128K 上下文 这一档模型配 openGauss 的配置口径
meta_description: 本档模型以 128000 的上下文长度为特点，这意味着在单次对话中，模型可以处理更长的用户输入、系统指令以及从知识库检索到的信息。引用上限 120000 规定了知识库内容在送入模型前可占据的最大 token 数，这直接影响了召回内容的广度。模型支持工具调用，允许其与外部系统进行交互以执行特定任务，但
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 128K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
本档模型以 128000 的上下文长度为特点，这意味着在单次对话中，模型可以处理更长的用户输入、系统指令以及从知识库检索到的信息。引用上限 120000 规定了知识库内容在送入模型前可占据的最大 token 数，这直接影响了召回内容的广度。模型支持工具调用，允许其与外部系统进行交互以执行特定任务，但不支持图片输入，因此在设计多模态应用时需注意。单次最大输出未标注，通常需通过实际测试或参考官方文档确定，以避免输出截断。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | 连接到 openGauss 数据库实例的必要配置，确保网络可达。 |
| `ef_construction` | `100–200` | 影响 HNSW 索引构建时的图连接数，数值越大索引质量越高，但构建时间也越长。 |
| `ef_search` | `80–150` | 影响 HNSW 搜索时的图遍历深度，数值越大召回率越高，但查询延迟也越大。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，平衡索引大小与查询性能。 |
| 检索条数 | `5–10 条` | 初始召回的知识库段落数量，需结合模型引用上限与单段长度调整。 |
| 单段最大长度 | `800–1200 字符` | 将原始文档切分为适合模型处理的段落长度，避免单个段落过长稀释信息密度。 |

## 这两者互相约束的地方
ChatGLM 128K 上下文模型与 openGauss 向量库的集成，核心在于合理分配模型上下文预算。召回条数与每段长度的乘积，必须严格控制在模型 128000 的上下文长度之内，同时不能超出 120000 的引用上限。在实际操作中，openGauss 返回的向量召回条数与系统设定的引用上限，两者中生效的是较小值。如果 openGauss 的 `ef_search` 或 `ef_construction` 等索引参数调大，虽然可能提升召回的准确性，但也会增加向量检索的计算开销，这可能导致整个 RAG 链路的响应时间延长，尤其是在高并发场景下，需要权衡召回质量与系统吞吐量。

## 容易做错的三处
*   日志显示 `ERROR: database "xxx" does not exist`：`OPENGAUSS_URL` 中指定的数据库名不存在或连接权限不足。
*   模型返回的答案缺乏细节，知识库引用为空：向量库检索到的相关段落数量过少，未达到有效信息量，或 `ef_search` 值过低导致召回率不佳。
*   查询响应时间显著增加，甚至超时：openGauss 的 `ef_search` 或 `ef_construction` 设置过高，导致索引构建或查询计算量过大。

## 怎么确认配好了
*   执行一次包含复杂查询的测试，检查 FastGPT 界面中模型输出是否引用了知识库内容，并验证引用内容的准确性。
*   监控 openGauss 数据库的 CPU、内存和 I/O 使用率，确保在负载下各项指标处于健康区间，没有资源瓶颈。
*   通过 FastGPT 的调试功能，检查每次请求发送给模型的实际 token 数量，确保召回内容与提示词的总和未超出 128000 的上下文限制。
*   调整 `ef_search` 参数，观察不同值对召回准确率和查询延迟的影响，找到适合业务场景的平衡点。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
