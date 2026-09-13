---
title: Configure Multimodal Recognition Settings in FastGPT
slug: /en/tutorial/fastgpt-multimodal-recognition-settings
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/ai_settings
source_type: Official documentation
---

# Configure Multimodal Recognition Settings in FastGPT

## Multimodal Recognition Overview
This setting governs whether the connected large language model (LLM) can process image, audio, or video media included in user inputs. Supported media types are strictly tied to the native multimodal capabilities of the selected LLM: if a model only supports image recognition, only the image recognition toggle can be enabled. When active, the AI Chat node converts matching uploaded media files or valid media links within user questions into a model-readable format before submitting the inference request.

## Supported Media Use Cases
Each enabled media type corresponds to specific categories of input content:
- **Image Recognition**: Processes screenshots, table images, product images, posters, and similar static visual content.
- **Audio Recognition**: Processes uploaded audio content for models that natively support audio multimodal inputs.
- **Video Recognition**: Processes uploaded video content for models that natively support video multimodal inputs.

## Configuration Workflow
1. Navigate to the AI settings panel for your FastGPT application or AI Chat node.
2. Locate the Multimodal Recognition settings group.
3. Select the desired media recognition types, ensuring alignment with the selected model’s supported capabilities.
4. To parse media links embedded in user questions, enable the "Extract multimodal files from links" toggle.
5. Save the updated settings to activate the configuration.

## Critical Usage Constraints
All multimodal recognition workflows are subject to these enforced rules:
1. Enabled media types are re-filtered against the active model’s actual capabilities before the request is sent. Any unsupported media formats will not be transmitted to the model.
2. Media links in user questions are only parsed if the "Extract multimodal files from links" toggle is enabled. Parsing is only attempted for user questions under 500 characters, with a maximum of 4 media links processed per single request.
3. Regular document files cannot be sent directly to the LLM as multimodal input. All documents must first be parsed into structured text before they can be used by the AI.
4. Multimodal recognition relies entirely on the selected model’s built-in capabilities. If the system indicates the model does not support multimodal recognition, switch to a model that supports your required media type.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/ai_settings)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
