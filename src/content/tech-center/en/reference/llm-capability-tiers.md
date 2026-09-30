---
title: FastGPT LLM Capability Tiers Reference
slug: /en/reference/llm-capability-tiers
page_type: reference-data
source: https://github.com/labring/FastGPT
source_type: Open-source repository definitions (FastGPT v4.17.0, fastgpt-plugin v1.1.3)
description: The 268 chat models bundled with fastgpt-plugin v1.1.3, grouped by context length and capability fields
language: en
check_day: 2026-09-29
meta_title: FastGPT LLM Capability Tiers Reference
meta_description: The 268 chat models bundled with fastgpt-plugin v1.1.3, grouped by context length and capability fields
date_published: 2026-09-29
date_modified: 2026-09-29
---

# FastGPT LLM Capability Tiers Reference

This page groups the 268 chat models bundled with fastgpt-plugin v1.1.3 by context length, maximum single response, quote limit, image input and tool calling. Models in the same tier have identical values across these fields and can be configured with the same settings.

## Overview

| Item | Count |
| --- | --- |
| Bundled chat models | 268 |
| Providers | 21 |
| Distinct capability tiers (provider + fields) | 124 |
| Marked as supporting tool calling | 210 |
| Marked as supporting image input | 135 |

## Distribution by context length

| Context length | Models |
| --- | --- |
| 1M and above | 69 |
| 200K–1M | 66 |
| 100K–200K | 71 |
| 32K–100K | 38 |
| Below 32K | 24 |

## Distribution by provider

| Provider | Models | Capability tiers |
| --- | --- | --- |
| Qwen | 38 | 13 |
| OpenAI | 32 | 8 |
| ChatGLM | 27 | 10 |
| StepFun | 16 | 13 |
| Claude | 15 | 3 |
| AntLing | 14 | 8 |
| Ernie | 14 | 10 |
| Gemini | 14 | 3 |
| Hunyuan | 14 | 11 |
| MiniMax | 11 | 6 |
| Moonshot | 11 | 8 |
| MistralAI | 10 | 4 |
| Doubao | 9 | 3 |
| Groq | 9 | 4 |
| Baichuan | 8 | 3 |
| Grok | 7 | 3 |
| SparkDesk | 7 | 4 |
| DeepSeek | 5 | 4 |
| Siliconflow | 3 | 3 |
| InternLM | 2 | 1 |
| Yi | 2 | 2 |

## Three things to keep in mind

1. Capability fields are the values registered in the bundled catalogue. Actual availability also depends on whether the connected channel exposes that capability.
2. Context length (`maxContext`) caps how much retrieved content fits in one request. The quote limit (`quoteMaxToken`) is a token budget for cited content — it caps the total tokens quotes may occupy, not the number of segments; segment count is set on the retrieval side. Read them together; looking at only one leads to a wrong recall setting.
3. Models in the same tier share these field values, which does not mean they produce answers of the same quality.

## Scope of this reference

Content is taken from the bundled model catalogue in fastgpt-plugin v1.1.3. The following are out of scope:

- Custom models registered by the operator
- Quota, region and version differences on the provider side
- Capability fields not present in the bundled catalogue

## References

- [FastGPT source repository](https://github.com/labring/FastGPT)
- [fastgpt-plugin source repository](https://github.com/labring/fastgpt-plugin)
