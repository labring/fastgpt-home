---
title: 引用预算 1.2 万–3.2 万的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径
slug: /zh/combo/combo-q32k-jina04
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken是单轮对话中可插入的上下文引用内容的总token预算，本档对话模型的该参数覆盖12000至32000 tokens区间。该区间能够支撑包含较多背景信息、长文档片段的知识库问答场景，无需频繁截断核心上下文，保障回答时可调用的参考素材范围更广，适配对上下文完整性要求较高的业务需"
language: zh
axis_model_tier: "引用预算 1.2 万–3.2 万"
covered_models: "Baichuan4、Baichuan4-Turbo、Baichuan4-Air、Baichuan3-Turbo、Baichuan-M3、Baichuan-M3-Plus、Baichuan2-Turbo、glm-4v-plus、ernie-4.5-turbo-32k、ernie-4.5-turbo-vl-32k、hunyuan-large、hunyuan-pro、hunyuan-standard、hunyuan-turbo、hunyuan-turbos-latest、hunyuan-t1-latest、internlm2-pro-chat、internlm3-8b-instruct、mistral-small-latest、moonshot-v1-32k、moonshot-v1-32k-vision-preview、qwen3-vl-flash、qwen3-vl-plus、qwen3-1.7b、qwen3-0.6b、Qwen/Qwen2-VL-72B-Instruct、deepseek-ai/DeepSeek-V2.5、lite、max-32k、step-1o-turbo-vision、step-1-32k、step-1o-vision-32k、step-1v-32k、yi-lightning、yi-vision-v2"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 1.2 万–3.2 万的对话模型配 jina-embeddings-v5-text-small / jina-embeddings-v4 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken是单轮对话中可插入的上下文引用内容的总token预算，本档对话模型的该参数覆盖12000至32000 tokens区间。该区间能够支撑包含较多背景信息、长文档片段的知识库问答场景，无需频繁截断核心上下文，保障回答时可调用的参考素材范围更广，适配对上下文完整性要求较高的业务需求。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 与所选Jina向量模型的默认分段长度匹配，保障检索与引用的分段一致性 |
| `maxToken` | 32000 | 匹配所选Jina向量模型的单段最大token上限，充分利用向量编码的语义容纳能力 |
| `quoteMaxToken` | 12000-32000 | 与本档对话模型的参数区间对齐，限定单轮引用的总token消耗范围 |
| `chunkSize` | 512-32000 | 可根据内容语义完整性调整，覆盖从短片段到长文档的分段需求 |
| 单次搜索上限 | 按业务场景调整 | 匹配引用预算的总token消耗，避免单次检索返回过多片段导致超支 |
| 最低相关度 | 按业务场景调整 | 过滤低相关性片段，优化引用内容的质量与token使用效率 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可放下23至62段。每段长度越长，单段承载的语义信息越完整，但一轮能容纳的段数越少；每段长度越短，一轮可容纳的段数越多，但单段上下文的完整性越弱。当向量模型单段编码上限达到32000 tokens时，单段即可覆盖本档对话模型的引用预算下沿，此时单段可能占满整轮引用额度。此外，更换向量模型后，已创建的知识库索引需要重新构建，因为向量维度与模型绑定，原有索引无法适配新模型的编码规则。

## 容易做错的三处
- 检索返回片段总token超出quoteMaxToken限制，导致上下文被截断。原因是未将单次搜索上限与引用预算匹配，单次检索返回过多片段。
- 分块长度与向量模型defaultToken参数不一致，导致检索片段与引用分段不匹配。原因是未对齐向量模型的默认分段配置。
- 更换向量模型后未重建知识库索引，导致检索结果异常或匹配度下降。原因是向量维度与编码规则与原模型绑定，未重建的索引无法适配新模型。

## 怎么确认配好了
- 查看对话模型的quoteMaxToken参数配置，确认其处于12000至32000 tokens区间内。
- 核对向量模型的maxToken与defaultToken参数，确认与所选Jina模型的官方参数一致。
- 测试单次检索返回的片段总token消耗，验证未超出当前配置的引用预算。
- 检查知识库分块长度设置，确认符合业务场景的语义完整性需求。
