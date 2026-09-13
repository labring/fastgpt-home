---
title: Add Custom SiliconCloud Models to FastGPT
slug: /en/deploy/fastgpt-add-siliconcloud-models
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud
source_type: Official documentation
---

# Add Custom SiliconCloud Models to FastGPT

## Default and Custom SiliconCloud Model Setup
The self-hosted FastGPT system includes a small set of pre-configured SiliconCloud models for quick initial testing. To add additional models beyond this default collection, users must follow the official manual custom model addition process, linked at ./intro.en.mdx#add-a-custom-model.

## Example Target Model Configuration
This demonstration uses a standard set of SiliconCloud models to enable a complete AI workflow. The configured models cover core inference, embedding, reranking, text-to-speech (TTS), and speech-to-text (STT) functionality:

| Model Type               | Model Identifier          | Primary Use Case                                  |
|--------------------------|---------------------------|---------------------------------------------------|
| Text & Vision Model      | Qwen2.5 72b               | Dual text generation and visual understanding     |
| Embedding Model          | bge-m3                    | Vector embedding generation for semantic search   |
| Rerank Model             | bge-reranker-v2-m3        | Reorder search results to improve relevance       |
| TTS Model                | fish-speech-1.5           | Convert written text to natural speech audio      |
| STT Model                | SenseVoiceSmall           | Convert spoken audio to written text transcript   |

## Configuration Validation
After completing the manual model addition steps outlined in the linked guide, users can cross-reference their setup with the included reference screenshot (image-104.png). This visual resource confirms the correct formatting and placement of all configured SiliconCloud model entries within the FastGPT administrative interface.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
