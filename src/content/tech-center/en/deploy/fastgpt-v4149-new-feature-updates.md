---
title: Official FastGPT v4.14.9 New Feature Updates
slug: /en/deploy/fastgpt-v4149-new-feature-updates
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4149
source_type: Official documentation
---

# Official FastGPT v4.14.9 New Feature Updates

## Core Feature Additions
This release includes several key user-facing feature expansions. First, the AI Sandbox tool, which enables attaching dedicated sandbox utilities to AI assistants to enable richer operational workflows. Next, support has been added for WeChat personal accounts as a new publish channel, allowing AI assistants to be distributed to this platform. The AgentV2 context system has been updated to properly adapt to paused operational states, ensuring more reliable context retention during interruptions. Additionally, form file input fields now support direct file preview, eliminating the need to download files to view their contents.

## AI Sandbox Availability Details
The following table outlines current AI Sandbox support across deployment types, per official release documentation:
| Deployment Type | AI Sandbox Availability | Additional Notes |
|-----------------|-------------------------|------------------|
| Cloud Service   | Fully Available         | No additional setup required |
| Self-Hosted     | Not Currently Available | Lightweight self-hosted deployment support is scheduled for the next FastGPT release |

## Data Management Enhancements
A critical update to dataset management has been implemented: when a single dataset entry is modified or updated, the parent collection’s update timestamp will now automatically refresh. This ensures that dataset collections maintain accurate, up-to-date inventory tracking metadata, making it easier to identify recently modified datasets at a glance.

## Observability Tooling Improvements
FastGPT v4.14.9 introduces a new logger SDK integrated with metrics tracking, providing enhanced operational visibility for self-hosted deployments. This tooling allows administrators to collect and monitor system metrics and logs, simplifying troubleshooting and performance optimization for self-hosted instances.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4149)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
