---
title: Configure SiliconCloud for FastGPT Self-Hosted Deployments
slug: /en/deploy/siliconcloud-fastgpt-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud
source_type: Official documentation
---

# Configure SiliconCloud for FastGPT Self-Hosted Deployments

## SiliconCloud Integration Overview
SiliconCloud is a platform focused on open source model inference, equipped with its own proprietary acceleration engine. This platform enables users to rapidly test and deploy open source models at a low cost, removing barriers to accessing advanced AI tools. Practical usage has shown that the models available through SiliconCloud deliver consistent speed and stability. The platform’s model catalog includes a broad range of categories: language processing, embedding, reranking, text-to-speech (TTS), speech-to-text (STT), image generation, and video generation. All of these model categories meet every model requirement for self-hosted FastGPT deployments, ensuring users can access all necessary model types through a single provider.

## Prerequisite Knowledge
Before proceeding with this integration guide, all readers must first review the official FastGPT Model Configuration Guide. This foundational document provides critical context for understanding how model providers are configured within a FastGPT environment, and is required to properly complete the SiliconCloud integration process. Without this prerequisite reading, users may struggle to correctly implement the integration steps outlined below.

## Step-by-Step Integration Workflow
1. Complete the FastGPT Model Configuration Guide, as specified in the prerequisite requirements.
2. Review the available model categories on SiliconCloud to confirm they align with your FastGPT deployment’s needs.
3. Access the model configuration interface within your self-hosted FastGPT instance.
4. Select SiliconCloud as the target model provider from the available options.
5. Input your unique SiliconCloud access credentials and select the desired model from the SiliconCloud catalog.
6. Validate the configuration to ensure a successful connection between FastGPT and SiliconCloud.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
