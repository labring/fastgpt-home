---
title: Key Operational Improvements in FastGPT 4.15.06
slug: /en/deploy/fastgpt-41506-operational-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506
source_type: Official documentation
---

# Key Operational Improvements in FastGPT 4.15.06

This document outlines the functional improvements released in FastGPT 4.15.06 for self-hosted deployments, focusing on operational consistency, data security, standardized data management, and reduced dependency installation failures.

## Chat Workflow and Security Hardening
Two critical updates enhance operational consistency and data security. First, chat title generation now leverages the system default model configuration, removing the need for per-workflow model overrides for title creation. This allows runtime switching of the title generation model and ensures consistent chat naming across all sessions. Second, LLM request trace queries now enforce team-level isolation, using the composite unique index `{ teamId, requestId }` instead of standalone request IDs. This update prevents cross-team exposure of sensitive trace data linked to individual request identifiers, strengthening access control for audit logs.

## Standardized Chat Storage and Legacy Cleanup
The Skill Edit chat flow has been updated to use the standard FastGPT chat storage and cleanup pipeline, aligning it with the core application's data management practices. This ensures that Skill Edit chat data follows the same retention and cleanup rules as other platform chat sessions. Previously generated Skill Debug chats are classified as legacy data, and can be cleaned up using the platform's official initialization API. No additional manual steps are required beyond invoking the designated initialization endpoint to purge outdated debug chat records.

## Agent Sandbox Dependency Configuration
The Agent Sandbox now includes support for custom npm and PyPI mirror configuration, which reduces the risk of dependency installation failures within sandbox environments. During sandbox initialization, the platform automatically writes common package manager configuration files to use the specified mirrors. The following configuration files are generated during setup:
| Package Manager | Target Configuration File |
|-----------------|--------------------------|
| npm             | `.npmrc`                 |
| PyPI            | `pip.conf`               |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
