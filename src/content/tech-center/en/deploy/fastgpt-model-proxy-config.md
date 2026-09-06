---
title: Configure FastGPT model provider connections
slug: /en/deploy/fastgpt-model-proxy-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: Official documentation
---

# Configure FastGPT model provider connections

# AI Proxy Integration Basics
FastGPT uses the AI Proxy service to connect to different model providers. Beyond basic connectivity, AI Proxy delivers three key operational tools: load balancing across model instances to improve reliability, structured model usage logging for auditing, and analytics dashboards to monitor model utilization. This unified proxy layer simplifies integrating with multiple model providers while adding critical visibility and reliability features for deployment administrators.

# Mandatory Configuration Requirements
All FastGPT deployments must follow these non-negotiable guidelines to ensure proper functionality:
1. Speech Recognition Model Restriction: Only one speech recognition model can be active at a time, so you only need to configure a single speech recognition model if your deployment uses speech-related features.
2. Minimum Model Requirements: The FastGPT system requires at least one language model and one embedding model to function properly. Without these two core model types properly configured, the platform will fail to operate as intended.

# Configuration Verification Workflow
To confirm your model configuration is complete and compliant, follow these structured steps:
1. Verify that no more than one speech recognition model is marked as active in your AI Proxy setup
2. Confirm that at least one language model and one embedding model are configured and linked to your FastGPT deployment
3. Check that the AI Proxy’s logging and analytics dashboards are capturing and displaying model usage data correctly
4. Run a basic connectivity test to confirm that FastGPT can invoke the configured models without errors

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/intro)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
