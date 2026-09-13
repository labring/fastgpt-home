---
title: Control FastGPT Single AI Response Token Limits
slug: /en/tutorial/fastgpt-max-tokens-settings
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/ai_settings
source_type: Official documentation
---

# Control FastGPT Single AI Response Token Limits

## What is the Max Tokens Setting
The Max Tokens setting in FastGPT’s Basic AI Settings controls the maximum length of a single AI-generated response, measured using the model’s native token counting standard. This setting enforces a hard cap on the total volume of text the model can produce in a single interaction turn. When enabled, the built-in slider control lets you define this limit with granular precision.

## Configuration Workflow
To adjust the Max Tokens limit for your FastGPT deployment:
1. Navigate to the AI Settings panel for your target FastGPT application.
2. Locate the Max Tokens configuration field in the Basic Settings subsection.
3. Toggle the setting to activate manual limit control if it is not already enabled.
4. Drag the provided slider to set your preferred maximum token value.
Critical note: If the configured limit is set too low, the AI’s response may be cut off prematurely before completing its intended full output.

## Usage and Tradeoff Guidance
The optimal Max Tokens value is tied directly to your specific use case. For requests requiring concise, brief answers, use a lower token limit to reduce unnecessary compute overhead and operational costs. For tasks that demand more extensive, unbroken output—such as generating structured project plans, long-form articles, or detailed technical explanations—use a higher token limit to allow the model to produce complete, fully realized responses. It is critical to balance output completeness with operational costs: higher token limits enable more comprehensive answers but will increase the total cost per AI interaction.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/ai_settings)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
