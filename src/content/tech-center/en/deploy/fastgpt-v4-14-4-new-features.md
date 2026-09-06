---
title: FastGPT v4.14.4 New Technical Feature Overview
slug: /en/deploy/fastgpt-v4-14-4-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4144
source_type: Official documentation
---

# FastGPT v4.14.4 New Technical Feature Overview

## Chat & Logging Enhancements
This release adds visibility and quality-of-life improvements for chat sessions and administrative logs:
- Tool calls now support configurable streaming output for real-time partial result delivery.
- AI point alert notifications are now available for configured monitoring triggers.
- Chat logs display IP geolocation data for each chat session participant.
- Chat logs show the active app version name; if the app is updated mid-conversation, the log reflects the latest deployed version.
- Chat logs support filtering by thumbs up or thumbs down feedback, with built-in quick navigation to liked or disliked chat records.

## Storage & Infrastructure Configuration
Several updates improve storage reliability and deployment flexibility:
- Local file uploads to datasets via the FastGPT API now save directly to S3 storage, and all legacy GridFS code has been removed from the codebase.
- S3 storage integration now supports two additional configuration parameters:
### S3 Configuration Parameters
| Parameter | Details |
|-----------|---------|
| `pathStyle` | Toggles path-style S3 bucket access |
| `region` | Specifies the S3 service region for bucket operations |
- A configurable file whitelist is now available for chat-based file uploads, restricting allowed file types for user submissions.
- Network proxy support is enabled via the `HTTP_PROXY` and `HTTPS_PROXY` environment variables, allowing traffic routing through a proxy server.

## Workflow & Multi-Tenant Updates
This release includes updates for workflow builders and multi-tenant deployments:
- Workflow tool references now support manual file input, in addition to the existing variable reference functionality.
- Multi-tenant custom domain configuration is now supported via Sealos for hosted deployments.
- A new subscription plan logic system has been implemented for usage-based billing and tiered access controls.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4144)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
