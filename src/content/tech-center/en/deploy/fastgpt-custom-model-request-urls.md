---
title: Set Up FastGPT Custom Model Request URLs
slug: /en/deploy/fastgpt-custom-model-request-urls
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: Official documentation
---

# Set Up FastGPT Custom Model Request URLs

## Custom Request URL Overview
When you configure a custom request URL for a FastGPT model integration, the platform bypasses its pre-built Model Channels and sends all relevant API requests directly to your specified endpoint. This setup is designed for integrating self-hosted or third-party model hosts that adhere to the supported endpoint formats. You must provide the full, complete request URL for your custom endpoint, with distinct required path suffixes for each model category:
- LLM: `[host]/v1/chat/completions`
- Embedding: `[host]/v1/embeddings`
- STT: `[host]/v1/audio/transcriptions`
- TTS: `[host]/v1/audio/speech`
- Rerank: `[host]/v1/rerank`

## Authentication for Custom Endpoints
All outgoing requests sent to your custom URL will automatically include an `Authorization: Bearer {custom_key}` header, where `{custom_key}` is the secret key you define during configuration. This header authenticates requests between FastGPT and your custom model host.

## Endpoint Format Specifications
Most supported model types follow the official OpenAI API format for their respective endpoints. For full details on request and response structures, refer to the official OpenAI API documentation. Rerank models are an exception: since OpenAI does not offer a native rerank API, your custom rerank endpoint must follow the Cohere API format. For example request payloads and troubleshooting guidance for common errors with custom endpoints, see the linked model error troubleshooting documentation.

## Step-by-Step Configuration
1. Access the self-hosted FastGPT administrative model configuration panel.
2. Select the type of model you want to integrate via a custom URL (LLM, embedding, STT, TTS, or rerank).
3. Enter the full custom endpoint URL, ensuring it matches the required path suffix for your selected model type.
4. Input your custom request key, which will populate the Authorization header for all requests to this endpoint.
5. Validate the configuration to confirm the URL and key are correctly formatted, then save the settings to enable direct routing to your custom endpoint.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/intro)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
