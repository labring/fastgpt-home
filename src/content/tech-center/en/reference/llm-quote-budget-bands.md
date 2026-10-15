---
title: FastGPT Chat Models by Quote Budget
slug: /en/reference/llm-quote-budget-bands
page_type: reference-data
source: https://github.com/labring/fastgpt-plugin/tree/v1.1.3/packages/infrastructure/src/static-data/models/provider
source_type: Official documentation
description: The 268 chat models built into fastgpt-plugin v1.1.3, grouped into 5 bands by quote budget (quoteMaxToken), with chunks per round.
language: en
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# FastGPT Chat Models by Quote Budget

`quoteMaxToken` is a chat model's quote budget: how many tokens the retrieved knowledge base content may take up in one answer. This page groups the 268 chat models built into fastgpt-plugin v1.1.3 into 5 bands by that value. Verified on 2026-09-28.

## Band table

| Quote budget range (tokens) | Models | Providers | Chunks per round at 512 tokens each | Largest budgets in the band |
| --- | --- | --- | --- | --- |
| 4,000–8,000 | 16 | 6 | 7–15 | `generalv3`, `generalv3.5`, `4.0Ultra`, `step-1-8k` |
| 12,000–32,000 | 35 | 12 | 23–62 | `hunyuan-turbos-latest`, `hunyuan-t1-latest`, `internlm2-pro-chat`, `internlm3-8b-instruct` |
| 50,000–128,000 | 90 | 16 | 97–250 | `hunyuan-2.0-instruct-20251111`, `hunyuan-2.0-thinking-20251109`, `gpt-5.2-chat-latest`, `gpt-5.1-chat-latest` |
| 190,000–350,000 | 68 | 14 | 371–683 | `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.3-codex`, `gpt-5.2` |
| 500,000–10,000,000 | 59 | 10 | 976–19,531 | `qwen-long`, `doubao-seed-evolving`, `gemini-3.8-flash`, `gemini-3.7-flash` |

## How to read it

The chunk column uses the 512-token default chunk length shared by all built-in embedding models and is an upper estimate. The number of chunks actually quoted also depends on how many results retrieval returns, the real chunk length and the minimum relevance filter. Longer chunks reduce the count in the same proportion.

## Scope of this reference

Values come from the built-in model definitions in the open-source fastgpt-plugin v1.1.3 repository. Models registered in a self-hosted deployment, or a changed `quoteMaxToken`, follow the actual configuration.

> Source: built-in model list of fastgpt-plugin v1.1.3. Verified on 2026-09-28.
