---
title: FastGPT v4.15.2 General Technical Improvement Details
slug: /en/deploy/fastgpt-v4152-general-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152
source_type: Official documentation
---

# FastGPT v4.15.2 General Technical Improvement Details

## Core UI & Workflow Stability Improvements
This release includes targeted fixes for workflow and user interface stability:
- Updated delete confirmation prompt text when deleting a Skill that is not linked to any application, preventing accidental deletions for unassociated tools.
- Renamed plugin status from `Offline` to `Uninstalled` to align with standard application state terminology for clearer admin visibility.
- Judge nodes now use unique, persistent IDs instead of positional index values as identifiers. This eliminates broken target branch references when workflow branches are deleted or reordered, preserving workflow integrity during edits.
- Workflow node execution responses are now included in SSE streams, providing full end-to-end visibility of workflow data for debugging and monitoring.
- Performance of the fade-in animation for real-time streaming chat output has been improved, reducing visual lag during high-volume conversational sessions.

## File Parsing & Resource Management
Significant updates were made to document parsing and system-generated file handling:
- The `LiteParse` module has been upgraded to resolve PDF parsing errors that occurred under concurrent workloads, improving reliability for bulk document processing.
- The default number of concurrent file parsing workers has been reduced from 10 to 5, with the count still configurable via the `PARSE_FILE_WORKERS` environment variable. A reference table for this parameter is below:
| Parameter Name | Default Value | Purpose |
|----------------|---------------|---------|
| `PARSE_FILE_WORKERS` | 5 | Controls the number of parallel file parsing processes to balance resource usage and processing speed. |
- System tool-generated files no longer expire after a 1-hour window. All such files are now retained as long as their parent chat session exists, and are automatically deleted when the session is removed.

## API & Deployment Configuration Optimizations
Deployment and API layer improvements reduce redundant traffic and streamline managed deployments:
- In-flight request deduplication has been added for the model list and sandbox package endpoints. Concurrent identical requests will now share a single response, cutting redundant API calls triggered by workflow nodes and selection components.
- The user registration button is now hidden by default when the platform is running in Sync Mode, reducing UI clutter for self-hosted managed deployments.
- Compatibility with the latest WeChat publishing channel SDK has been added, supporting updated integration requirements for official WeChat publishing workflows.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
