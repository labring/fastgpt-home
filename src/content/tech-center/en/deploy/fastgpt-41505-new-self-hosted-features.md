---
title: FastGPT v4.15.05 New Feature Updates for Self-Hosted
slug: /en/deploy/fastgpt-41505-new-self-hosted-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505
source_type: Official documentation
---

# FastGPT v4.15.05 New Feature Updates for Self-Hosted

This document outlines all new features and functional improvements included in FastGPT version 4.15.05 for self-hosted deployments.

## HTTP Node Enhancements
The HTTP workflow node includes two critical updates: it now supports ignoring TLS certificate verification, which simplifies integration with internal HTTPS services using self-signed or privately issued certificates, and it returns the complete error object when requests fail to provide enhanced diagnostic data for troubleshooting.

## Configurable Environment Variables
Two new environment variables are available to customize platform behavior:

| Environment Variable | Description | Usage Notes |
|----------------------|-------------|-------------|
| `MAX_FOLDER_DEPTH` | Limits maximum nested folder depth to prevent unlimited, unmanageable folder structures | No default value is provided; administrators must set this variable to enforce the limit |
| `CHAT_TITLE_MODEL` | Enables automatic generation of chat titles using a configured large language model | Must be set to enable the feature; the specified model will generate titles for new chat sessions |

## UI & User Experience Improvements
Several usability and visual updates have been deployed: chat windows now include a quick scroll-to-bottom button to instantly navigate to the most recent message, streaming output animations have been optimized using Lobe UI for a smoother visual experience, the skill editing workflow has been refined to improve the editing experience, and a new output syntax for quick reply messages has been added to support interactive chat interactions.

## API & Agent Optimization
Backend and agent workflow improvements include: dataset search within agent mode now supports permission filtering to ensure only authorized data is used during agent responses, API key management has been unified across the platform with updated request requirements that mandate explicit app context be passed in all requests, and agent context compression has been optimized to reduce payload size and improve processing efficiency.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
