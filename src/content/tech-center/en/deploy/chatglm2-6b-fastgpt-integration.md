---
title: Set Up ChatGLM2-6B For FastGPT Integration
slug: /en/deploy/chatglm2-6b-fastgpt-integration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2
source_type: Official documentation
---

# Set Up ChatGLM2-6B For FastGPT Integration

## Model Overview
ChatGLM2-6B is the second-generation iteration of the open-source bilingual (Chinese-English) chat model originally released as ChatGLM-6B. This updated model delivers native support for both Chinese and English conversational tasks, building on the foundation of its initial release. For comprehensive technical details, model architecture, and community resources, refer to the official [ChatGLM2-6B project page](https://github.com/THUDM/ChatGLM2-6B).

<Alert context="warning">
  Note: ChatGLM2-6B weights are fully open for academic research. Commercial use requires official
  written permission. This tutorial only demonstrates one integration method and does not grant any
  license.
</Alert>

## Usage Compliance Requirements
All use of ChatGLM2-6B model weights must adhere to the licensing terms set forth by its original developers. Academic research use is fully permitted without additional formal approval. Commercial deployment, including any use that generates revenue, supports paid services, or operates within a formal commercial organization’s production workflows, requires prior official written permission. It is critical to note that this FastGPT integration tutorial only demonstrates one possible integration approach, and does not confer any license or usage rights to the ChatGLM2-6B model beyond the explicitly stated terms.

## Step-by-Step Integration Workflow
1. Secure valid access to the official ChatGLM2-6B model weights, and confirm your intended use aligns with the outlined licensing restrictions
2. Deploy the ChatGLM2-6B model using the official guidance from its GitHub project repository to create a reachable API endpoint for FastGPT to connect to
3. Configure FastGPT’s custom model integration settings to point to the hosted ChatGLM2-6B API endpoint, including any required authentication parameters if applicable
4. Test the integrated setup by sending a sample chat message through the FastGPT interface to verify successful model communication

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
