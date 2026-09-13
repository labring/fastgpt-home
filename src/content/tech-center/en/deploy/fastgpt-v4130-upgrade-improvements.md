---
title: FastGPT v4.13.0 Core Technical Upgrade Improvements
slug: /en/deploy/fastgpt-v4130-upgrade-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4130
source_type: Official documentation
---

# FastGPT v4.13.0 Core Technical Upgrade Improvements

## Core Database & System Tool Updates
This release includes targeted database optimizations and system tool visibility improvements for self-hosted FastGPT deployments. A new dedicated `chat_node_details` table now stores workflow node details from chat history, separating this granular workflow data from core chat records to improve query efficiency during auditing or chat replay. The `chat_items` table has had its invalid, unused `dataId` index removed to reduce unnecessary write overhead for chat message operations, speeding up real-time chat interactions. Additionally, all system tool listings now display the corresponding author name, with safe, validated internationalization (i18n) translations to prevent localization errors across multi-language deployments.
| Target Database Table | Change Details                                                                 |
|------------------------|--------------------------------------------------------------------------------|
| `chat_items`           | Removed unused `dataId` database index to reduce write latency                  |
| `chat_node_details`    | New dedicated table for persistent storage of workflow node data from chats    |

## Workflow & Conversation UX Improvements
Client-side performance for the workflow builder has been enhanced by minimizing unnecessary component re-renders, reducing idle CPU and memory usage during workflow design and editing. The user experience for dynamic input and output variables in workflows has been refined to clarify variable scoping and usage, reducing user confusion during workflow setup. For chat-based deployments, dataset citation authentication now applies to the entire conversation thread instead of individual messages, eliminating repeated verification prompts for citations within a single chat session and improving compliance for shared chat links.

## Metered Billing Logic Updates
The metered billing tracking logic has been updated to standardize push and merge operations for usage metrics. This ensures that self-hosted deployments accurately record and aggregate usage data without creating duplicate billing entries, improving the reliability of cost tracking for team and enterprise deployments. No additional configuration is required to enable this updated logic; it activates automatically upon completing the upgrade to FastGPT v4.13.0.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4130)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
