---
title: Configure FastGPT AI Reasoning Effort Settings
slug: /en/tutorial/fastgpt-ai-reasoning-effort-settings
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/ai_settings
source_type: Official documentation
---

# Configure FastGPT AI Reasoning Effort Settings

## What is FastGPT Reasoning Effort?
Reasoning Effort controls the depth of model reasoning for AI responses in FastGPT. This setting aligns with OpenAI's standard `reasoning_effort` parameter, with ai-proxy translating configurations to match the native format of every supported model provider. Available options include Default, None, Minimal, Low, Medium, High, and Extra High. Default uses the model's built-in default behavior, while None skips reasoning entirely for simple queries. Increasing effort levels from Minimal to Extra High enables stronger, more thorough reasoning for complex questions. Full compatibility rules across all model providers are documented in the ai-proxy reasoning compatibility guide.

## OpenAI Standard Parameter Mapping
FastGPT’s reasoning effort options map directly to OpenAI-compatible values and default token budgets, as shown below:

| FastGPT Option | OpenAI-Compatible Value | Default Budget |
| -------------- | --------------------- | -------------- |
| Default        | Not explicitly sent   | Model default  |
| None           | `none`                | `0`            |
| Minimal        | `minimal`             | `1024`         |
| Low            | `low`                 | `2048`         |
| Medium         | `medium`              | `8192`         |
| High           | `high`                | `16384`        |
| Extra High     | `xhigh`               | `32768`        |

When converting token budget values back to effort levels, ai-proxy uses standardized ranges: ≤0 maps to `none`, 1–1024 maps to `minimal`, 1025–4096 maps to `low`, 4097–12288 maps to `medium`, 12289–24576 maps to `high`, and values above 24576 map to `xhigh`.

## Cross-Provider Compatibility Details
### OpenAI & OpenAI Responses
For native OpenAI Chat/Completions requests, the setting maps directly to the `reasoning_effort` field. For OpenAI Responses format, the value is written to `reasoning.effort`. All non-OpenAI model requests are first normalized to the OpenAI-compatible format before translation.

### Google Gemini
Gemini native requests use `generationConfig.thinkingConfig` parameters including `thinkingLevel`, `thinkingBudget`, and `includeThoughts`. Ai-proxy translates FastGPT effort values to Gemini-specific settings based on the model family, with the following mapping:

| OpenAI Value | Gemini 3+ Pro        | Gemini 3+ non-Pro       | gemini-2.5-pro         | gemini-2.5-flash       | gemini-2.5-flash-lite  |
| ------------ | -------------------- | ----------------------- | ---------------------- | ---------------------- | ---------------------- |
| `none`       | `thinkingLevel=low`  | `thinkingLevel=minimal` | `thinkingBudget=128`   | `thinkingBudget=0`     | `thinkingBudget=0`     |
| `minimal`    | `thinkingLevel=low`  | `thinkingLevel=minimal` | `thinkingBudget=1024`  | `thinkingBudget=1024`  | `thinkingBudget=1024`  |
| `low`        | `thinkingLevel=low`  | `thinkingLevel=low`     | `thinkingBudget=2048`  | `thinkingBudget=2048`  | `thinkingBudget=2048`  |
| `medium`     | `thinkingLevel=low`  | `thinkingLevel=medium`  | `thinkingBudget=8192`  | `thinkingBudget=8192`  | `thinkingBudget=8192`  |
| `high`       | `thinkingLevel=high` | `thinkingLevel=high`    | `thinkingBudget=16384` | `thinkingBudget=16384` | `thinkingBudget=16384` |
| `xhigh`      | `thinkingLevel=high` | `thinkingLevel=high`    | `thinkingBudget=32768` | `thinkingBudget=24576` | `thinkingBudget=24576` |

Some Gemini models cannot fully disable thinking, so the `none` option falls back to the minimum supported reasoning level or budget.

### Claude & Anthropic Platforms
For Anthropic Claude, AWS Bedrock Claude, and Vertex AI Claude, settings map to native `thinking` and `output_config` parameters. The following partial mapping applies: `none` uses `thinking.type=disabled`, while `minimal` uses `thinking.type=enabled` with a 1024 token budget. Full adaptive mode mappings are available via the ai-proxy compatibility guide.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/ai_settings)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
