---
title: FastGPT 内置向量模型参数对照表
slug: /zh/reference/embedding-model-reference
page_type: 基准数据页
source: https://github.com/labring/fastgpt-plugin/tree/v1.1.3/packages/infrastructure/src/static-data/models/provider
source_type: 官方文档
description: fastgpt-plugin v1.1.3 内置的 21 个向量模型的默认分段长度、单段上限与是否多模态。
language: zh
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# FastGPT 内置向量模型参数对照表

本页列出 fastgpt-plugin v1.1.3 内置的 21 个向量模型在平台里登记的两个长度参数：
`defaultToken`（默认每段长度）与 `maxToken`（单段能送进向量模型的上限），核验日 2026-09-28。

## 对照表

| 提供商 | 模型标识 | defaultToken | maxToken | 多模态 |
| --- | --- | --- | --- | --- |
| BAAI | `bge-m3` | 512 | 8,000 | 否 |
| ChatGLM | `embedding-3` | 512 | 8,000 | 否 |
| Doubao | `doubao-embedding-large-text-250515` | 512 | 4,096 | 否 |
| Doubao | `doubao-embedding-text-240715` | 512 | 4,096 | 否 |
| Ernie | `tao-8k` | 512 | 8,000 | 否 |
| Ernie | `Embedding-V1` | 512 | 1,000 | 否 |
| Gemini | `gemini-embedding-2` | 512 | 8,192 | 否 |
| Hunyuan | `hunyuan-embedding` | 512 | 1,024 | 否 |
| Jina | `jina-embeddings-v4` | 512 | 32,000 | 否 |
| Jina | `jina-embeddings-v5-omni-small` | 512 | 32,000 | 是 |
| Jina | `jina-embeddings-v5-text-small` | 512 | 32,000 | 否 |
| Jina | `jina-clip-v2` | 512 | 8,000 | 是 |
| Jina | `jina-embeddings-v3` | 512 | 8,000 | 否 |
| Jina | `jina-embeddings-v5-omni-nano` | 512 | 8,000 | 是 |
| Jina | `jina-embeddings-v5-text-nano` | 512 | 8,000 | 否 |
| OpenAI | `text-embedding-3-large` | 512 | 8,000 | 否 |
| OpenAI | `text-embedding-3-small` | 512 | 8,000 | 否 |
| OpenAI | `text-embedding-ada-002` | 512 | 8,000 | 否 |
| Qwen | `text-embedding-v3` | 512 | 8,000 | 否 |
| Qwen | `text-embedding-v4` | 512 | 8,000 | 否 |
| Siliconflow | `BAAI/bge-m3` | 512 | 8,000 | 否 |

## 从表里能读出的三件事

1. 全部 21 个模型的 `defaultToken` 都是 512，默认分段长度不随向量模型变化。
2. `maxToken` 有 6 种取值：1,000（1 个）、1,024（1 个）、4,096（2 个）、8,000（13 个）、8,192（1 个）、32,000（3 个）。它决定知识库里单段最长能切到多少，超过它的段落无法送进该模型。
3. 多模态向量模型 3 个：`jina-embeddings-v5-omni-small`、`jina-clip-v2`、`jina-embeddings-v5-omni-nano`，可对图片类内容建索引。

## 这张表的适用范围

表中数值取自开源仓库 fastgpt-plugin v1.1.3 的内置模型定义。私有化部署时若自行登记了模型或改过参数，以实际配置为准；更换向量模型后，已建索引需要按新模型重建。

> 数据取自 fastgpt-plugin v1.1.3 的内置模型清单，核验日 2026-09-28。
