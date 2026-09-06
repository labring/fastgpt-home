---
title: Set Up FastGPT AI Model Basic Settings
slug: /en/tutorial/fastgpt-ai-model-basic-settings
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/ai_settings
source_type: Official documentation
---

# Set Up FastGPT AI Model Basic Settings

## AI Model Basic Settings Overview
This panel allows you to select the AI model powering your current FastGPT application or workflow node. All available models vary across core performance and operational dimensions, including response quality, per-call cost, maximum context window size, native tool calling support, and multimodal input handling capabilities.

## Model Metadata Reference Table
The AI model selector displays four key metadata fields for each available model:
| Metadata Field               | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| Point cost                    | Reference pricing for model API calls, with separate pricing for input prompt content and model output responses. |
| Max context                   | The maximum volume of content the model can reference within a single request. Larger context windows support long-form document processing and extended conversational threads. |
| Tool calling                  | Indicates whether the model supports integration with configured app tools to perform data queries, automated calculations, or external functional calls. |
| Multimodal capability         | Confirms the model’s support for image, audio, or video input. Enable matching multimodal recognition features in the AI Settings panel using the modal’s displayed capabilities as the official reference. |

## Selection and Configuration Workflow
Follow these structured steps to select and apply an AI model:
1. Navigate to the AI Settings page for your target FastGPT application or workflow node.
2. Open the dropdown menu labeled "AI Model" to view all supported model options.
3. For each listed model, review the four core metadata fields to compare capabilities against your project requirements.
4. Select a model aligned with your needs: for example, choose a model with tool calling support for automated workflow tasks, or a model with a larger max context window for processing long documents.
5. Save your changes to finalize the AI model configuration for your app or node.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/ai_settings)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
