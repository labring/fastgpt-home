---
title: 引用预算 4K–8K的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径
slug: /zh/combo/combo-q8k-jina04
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken为单轮对话中可带入的引用内容总token预算，本档对话模型共包含16款，涵盖通用与多模态对话场景，其quoteMaxToken处于4000至8000 tokens区间。该区间适配多数知识库问答场景，既能够承载足够多的上下文信息支撑精准回答，又不会因上下文规模超出模型处理范围"
language: zh
axis_model_tier: "引用预算 4K–8K"
covered_models: "glm-4v-flash、ERNIE-4.0-8K、ERNIE-4.0-Turbo-8K、ERNIE-Lite-8K、hunyuan-turbo-vision、hunyuan-vision、moonshot-v1-8k、moonshot-v1-8k-vision-preview、generalv3、generalv3.5、4.0Ultra、step-1-flash、step-1-8k、step-1v-8k、step-2-mini、step-2-16k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 4K–8K的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken为单轮对话中可带入的引用内容总token预算，本档对话模型共包含16款，涵盖通用与多模态对话场景，其quoteMaxToken处于4000至8000 tokens区间。该区间适配多数知识库问答场景，既能够承载足够多的上下文信息支撑精准回答，又不会因上下文规模超出模型处理范围导致推理异常，为知识库应用的上下文调用提供了稳定的参数基准。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配平台登记的默认分段长度，适配基础语义拆分需求 |
| `maxToken` | 32000 tokens | 符合该向量模型允许的单段最大输入token上限，支持长文本拆分 |
| `quoteMaxToken` | 4000至8000 tokens | 匹配当前对话模型的引用预算区间，确保总引用token不超模型处理范围 |
| 分块长度 | 512 tokens | 与`defaultToken`默认配置对齐，保证分块与向量模型输入格式统一 |
| 单次搜索上限 | 7至15条 | 匹配按默认512 tokens分段时单轮引用预算可承载的合理段数 |
| 最低相关度 | 设定合理阈值 | 过滤低相关性内容，避免无效引用占用预算 |

## 这两者互相约束的地方
按默认512 tokens分段，一轮引用最多可放下7至15段。该向量模型单段最大输入token为32000，已超过当前对话模型引用预算的下沿4000 tokens，当分段长度调至该上限时，单段即可占满整轮引用预算。分段长度越长，单段语义完整性越强，但一轮可承载的段数越少；分段长度越短，段数越多，但单段上下文越细碎。此外，向量模型与向量维度绑定，更换向量模型后已建立的知识库索引需要重新构建，否则无法正常完成检索。

## 容易做错的三处
- 单轮问答中出现引用内容被截断，原因是总引用token未控制在对话模型的quoteMaxToken区间内。
- 检索返回的段落数量偏离合理范围，原因是未结合分段长度调整单次搜索上限的配置。
- 更换向量模型后无法加载原有知识库的检索结果，原因是向量模型与向量维度绑定，未重建对应索引。

## 怎么确认配好了
- 查看当前对话模型的配置项，确认quoteMaxToken的取值落在4000至8000 tokens区间。
- 核对向量模型的defaultToken与maxToken参数，确认与平台登记的配置一致。
- 检查知识库分块长度的配置，确保与向量模型的defaultToken对齐。
- 发起一轮测试问答，查看引用内容的总token数未超出对话模型的预算限制。
