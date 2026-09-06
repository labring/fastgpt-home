---
title: FastGPT 4.14.11 Official Bug Fix Resolutions
slug: /en/deploy/fastgpt-41411-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41411
source_type: Official documentation
---

# FastGPT 4.14.11 Official Bug Fix Resolutions

## Overview of FastGPT 4.14.11 Bug Fixes
This technical document lists all validated bug resolutions included in the FastGPT 4.14.11 self-hosted upgrade, intended for engineers and technical decision makers evaluating or operating FastGPT deployments. All fixes are sourced directly from the official release notes, with no external assumptions or unlisted changes included.

## Categorized Bug Resolutions
The resolved issues are grouped into three core functional categories to help targeted troubleshooting:
1. **Chat and Workflow Tools**: Fixes for core workflow and chat agent reliability, including model state preservation, code execution correctness, and node alignment stability.
2. **API and Permission Management**: Resolves gaps in API security, billing accuracy, and permission filtering for evaluation workflows.
3. **Data and Tool Integration**: Addresses encoding errors during document upload and schema consistency issues for integrated tools.

## Full Detailed Fixed Issue Reference
All resolved bugs are documented below in a structured reference table for quick lookup:
| Issue Domain               | Resolved Bug Description                                                                 |
|----------------------------|----------------------------------------------------------------------------------------|
| Chat Agent Mode            | Model state reset after page refresh                                                   |
| API Security               | Missing permission validation across multiple platform APIs                             |
| Billing & Dataset API      | Incorrect billing calculation in dataset data push API                                 |
| Document Upload            | Garbled Chinese characters in uploaded Markdown files due to ASCII encoding misdetection |
| Code Execution Node        | Python code execution ignoring configured parameters when input is empty                |
| Workflow Global Variables  | Multi-select enum default values not cleared when an enum entry is removed              |
| Sub-Workflow Nodes         | Default global variable values not displayed when adding a sub-workflow node            |
| Workflow Code Run Node     | Output value IDs being replaced entirely after AI-generated code; preserved matching-key IDs |
| Workflow Node Alignment    | Child node position shifting when parent node is auto-aligned via workflow guides      |
| Evaluation Permissions     | Inherited permissions not covered by evaluation list permission filters                 |
| Tool Integration           | Raw schema not saved for MCP and HTTP tools, leading to inaccurate tool call schemas   |

Each fix addresses a specific, reported issue to improve system stability, data integrity, and user experience for self-hosted FastGPT instances. No unvalidated changes or external enhancements are included in this release’s bug fix scope.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41411)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
