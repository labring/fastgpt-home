---
title: New Features Added in FastGPT 4.14.10
slug: /en/deploy/fastgpt-4-14-10-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41410
source_type: Official documentation
---

# New Features Added in FastGPT 4.14.10

## Sandbox Deployment and Tooling
This release adds official support for OpenSandbox Docker deployment and adaptation, with data persistence enabled through mounted volumes. Administrators can configure persistent storage for sandbox environments without additional custom scripting. A new sandbox file link reading tool is also introduced, allowing the AI assistant to directly return valid file access links for end-users, eliminating the need for manual file sharing workflows.

## Publishing Channel Enhancements
This update expands supported publishing platforms with two key improvements: first, official support for the WeChat Personal Account publishing channel, enabling direct content distribution to this platform. Second, streaming output support is added for the Lark publishing channel, allowing real-time content delivery instead of batch post submissions. All existing publishing channels remain fully compatible with these new features.

## Configurable System Parameters
Two critical system constraints are now adjustable via environment variables, providing greater operational flexibility:
| Parameter Purpose | Configuration Method | Core Use Case |
|-------------------|----------------------|---------------|
| Maximum directory limit | Set via environment variables | Adjust storage directory quotas for team or user workspaces |
| Rerank model single document limit | Set via environment variables | Prevent rerank pipeline failures caused by oversized individual documents |

## LLM Billing and Reporting Updates
This release introduces tiered billing mode for large language model (LLM) usage, aligning billing calculations with actual resource consumption tiers. Additionally, the billing push method has been unified across all billing events, ensuring a consistent delivery format for usage reports and billing notifications across the platform. This standardization simplifies integration with internal billing tracking systems for self-hosted deployments.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41410)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
