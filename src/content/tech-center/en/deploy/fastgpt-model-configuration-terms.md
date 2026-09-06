---
title: Clarify FastGPT model configuration terminology
slug: /en/deploy/fastgpt-model-configuration-terms
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: Official documentation
---

# Clarify FastGPT model configuration terminology

## Overview of FastGPT Model Configuration
When self-hosting FastGPT, proper model integration configuration relies on clear alignment between API request fields, display settings, and provider connections. This documentation defines the core terminology used in FastGPT’s self-hosted model configuration workflow, enabling engineers and technical decision-makers to accurately set up, manage, and troubleshoot model integrations without ambiguous mappings.

## Core Terminology Reference
The following table lists the standard terms and their exact definitions as used in FastGPT model configuration:
| Term                  | Definition                                                                 |
|-----------------------|---------------------------------------------------------------------------|
| Model ID              | The value of the `model` field in the API request body. Must be globally unique. |
| Model Name            | The display name of the model, which can be customized.                          |
| Model Channel         | A connection configured for a model provider and API protocol, such as OpenAI, Anthropic, or Google. Most self-hosted channels use the OpenAI protocol. You can configure the same model in multiple channels to enable load balancing. |
| Custom Request URL / Key | Allows you to bypass Model Channels and send requests directly to a custom endpoint. You need to provide the full request URL and token. This is generally unnecessary and harder to manage. |

## Operational Usage Guidelines
Each term serves a distinct purpose in the configuration pipeline, and adhering to their definitions prevents common setup errors. Model ID must be unique across all configured models to ensure API requests route to the correct model endpoint. Model Name can be modified to match internal team naming conventions without impacting API functionality, as it is only used for display purposes. Model Channels allow grouping of provider connections, enabling load balancing for the same model to improve deployment reliability during high-traffic periods. The Custom Request URL/Key option provides a direct integration path for non-standard endpoints, but it requires manual management of both the full request URL and authentication token, which increases long-term operational complexity and is not recommended for most deployments.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/intro)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
