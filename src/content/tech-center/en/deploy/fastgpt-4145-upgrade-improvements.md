---
title: FastGPT 4.14.5 Stability and Performance Improvements
slug: /en/deploy/fastgpt-4145-upgrade-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4145
source_type: Official documentation
---

# FastGPT 4.14.5 Stability and Performance Improvements

This document outlines the technical changes included in the FastGPT 4.14.5 self-hosted upgrade, focused on backend stability, user experience, and API reliability.

## Infrastructure & Stability Optimizations
This section addresses core backend performance and reliability. Optimized Redis key retrieval logic prevents server blocking during operations that fetch large numbers of keys, reducing unexpected service interruptions. Improved reconnection logic for MongoDB, Redis, and MQ minimizes downtime by automatically restoring connections after transient failures. Additionally, the Chats database table indexes have been optimized: redundant indexes have been removed, and conditional indexes added to streamline query execution for chat-related operations.

## UI & User Experience Adjustments
End-user facing refinements include support for copying content from disabled variable input fields, eliminating a previous barrier to reusing pre-configured variables. The citation list displayed below AI chat responses has been refined to only show Dataset content that was actually cited by the AI model, removing extraneous entries and improving readability of referenced source material.

## LLM, API & Tooling Enhancements
This section covers improvements to large language model handling, API limits, and developer tooling. A detailed breakdown of these changes is provided in the table below:
| Improvement Area | Specific Changes |
|-------------------|------------------|
| LLM Response Detection | Excludes content filter errors from being misidentified as empty AI responses, preventing false negatives when the model filters prohibited content |
| Error Messaging | Adds more raw data to error messages for AI chat and tool calls, enabling more efficient debugging of failed requests |
| File Parsing API | Increased maximum request size limit to 10MB, supporting larger file uploads for parsing |
| MCP SDK | Updated to the latest available version of the MCP SDK, incorporating latest bug fixes and feature improvements |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4145)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
