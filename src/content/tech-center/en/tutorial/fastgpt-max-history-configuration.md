---
title: Configure Max Conversation Histories for FastGPT
slug: /en/tutorial/fastgpt-max-history-configuration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/ai_settings
source_type: Official documentation
---

# Configure Max Conversation Histories for FastGPT

## Core Function of Max Histories
The Max Histories setting controls the maximum number of prior conversation rounds the FastGPT AI can reference when generating a response. It limits the volume of historical conversation data included in each inference request, ensuring the AI operates within defined context constraints for each interaction.

## Performance and Cost Tradeoffs
Adjusting the Max Histories value carries direct tradeoffs between context access and operational efficiency. Higher values expand the pool of prior conversation data available to the AI, making it easier for the model to reference earlier parts of the dialogue. However, increased context volume adds more content to each API request, which may raise operational costs and slow down response times. Conversely, lower values reduce the amount of context included in requests, which can lower costs and speed up responses, but may also prevent the AI from accessing useful prior context needed to deliver accurate, consistent answers.

## Recommended Usage Guidelines
If no specific operational requirements are defined for your application, use the platform default Max Histories value. Customer support applications and dataset Q&A applications typically only need a small number of history rounds to function effectively, as these use cases often center on single-turn interactions or short, focused multi-turn conversations that do not require access to extensive historical dialogue data.

## Step-by-Step Configuration
1. Navigate to the AI Settings tab while configuring your FastGPT application.
2. Locate the Max Histories parameter input field in the Basic Settings section.
3. Input a valid non-negative integer to specify the maximum number of prior conversation rounds the AI may reference.
4. Save the application configuration to apply the updated Max Histories setting.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/ai_settings)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
