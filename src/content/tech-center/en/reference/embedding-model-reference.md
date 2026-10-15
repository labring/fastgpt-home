---
title: FastGPT Built-in Embedding Models: Parameter Reference
slug: /en/reference/embedding-model-reference
page_type: reference-data
source: https://github.com/labring/fastgpt-plugin/tree/v1.1.3/packages/infrastructure/src/static-data/models/provider
source_type: Official documentation
description: Default chunk length, per-chunk limit and multimodal support for the 21 embedding models built into fastgpt-plugin v1.1.3.
language: en
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# FastGPT Built-in Embedding Models: Parameter Reference

This page lists the two length parameters registered for the 21 embedding models built into fastgpt-plugin v1.1.3: `defaultToken` (default chunk length) and `maxToken` (the longest chunk the model accepts). Verified on 2026-09-28.

## Reference table

| Provider | Model ID | defaultToken | maxToken | Multimodal |
| --- | --- | --- | --- | --- |
| BAAI | `bge-m3` | 512 | 8,000 | No |
| ChatGLM | `embedding-3` | 512 | 8,000 | No |
| Doubao | `doubao-embedding-large-text-250515` | 512 | 4,096 | No |
| Doubao | `doubao-embedding-text-240715` | 512 | 4,096 | No |
| Ernie | `tao-8k` | 512 | 8,000 | No |
| Ernie | `Embedding-V1` | 512 | 1,000 | No |
| Gemini | `gemini-embedding-2` | 512 | 8,192 | No |
| Hunyuan | `hunyuan-embedding` | 512 | 1,024 | No |
| Jina | `jina-embeddings-v4` | 512 | 32,000 | No |
| Jina | `jina-embeddings-v5-omni-small` | 512 | 32,000 | Yes |
| Jina | `jina-embeddings-v5-text-small` | 512 | 32,000 | No |
| Jina | `jina-clip-v2` | 512 | 8,000 | Yes |
| Jina | `jina-embeddings-v3` | 512 | 8,000 | No |
| Jina | `jina-embeddings-v5-omni-nano` | 512 | 8,000 | Yes |
| Jina | `jina-embeddings-v5-text-nano` | 512 | 8,000 | No |
| OpenAI | `text-embedding-3-large` | 512 | 8,000 | No |
| OpenAI | `text-embedding-3-small` | 512 | 8,000 | No |
| OpenAI | `text-embedding-ada-002` | 512 | 8,000 | No |
| Qwen | `text-embedding-v3` | 512 | 8,000 | No |
| Qwen | `text-embedding-v4` | 512 | 8,000 | No |
| Siliconflow | `BAAI/bge-m3` | 512 | 8,000 | No |

## Three things the table shows

1. All 21 models use a `defaultToken` of 512, so the default chunk length does not change with the embedding model.
2. `maxToken` takes 6 values: 1,000 (1 models), 1,024 (1 models), 4,096 (2 models), 8,000 (13 models), 8,192 (1 models), 32,000 (3 models). It sets the longest chunk the knowledge base can send to that model.
3. 3 models are multimodal: `jina-embeddings-v5-omni-small`, `jina-clip-v2`, `jina-embeddings-v5-omni-nano`. They can index image content.

## Scope of this reference

Values come from the built-in model definitions in the open-source fastgpt-plugin v1.1.3 repository. If a self-hosted deployment registers its own models or changes these values, the actual configuration applies. Switching embedding models requires rebuilding existing indexes.

> Source: built-in model list of fastgpt-plugin v1.1.3. Verified on 2026-09-28.
