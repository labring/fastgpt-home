---
title: FastGPT 4.14.5 List of Resolved Bug Fixes
slug: /en/deploy/fastgpt-4145-resolved-bugs
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4145
source_type: Official documentation
---

# FastGPT 4.14.5 List of Resolved Bug Fixes

## Overview
This page covers all resolved software bugs included in the FastGPT 4.14.5 self-hosted upgrade. These fixes address stability, compatibility, and user experience issues across core platform features, including workflow automation, tool integration, database operations, and frontend UI rendering. All fixes are validated for self-hosted FastGPT deployments.

## Resolved Bugs Table
| Bug Reference | Description | Impact Level |
|---|---|---|
| 1 | Workflow parallel merge could cause duplicate execution | Critical |
| 2 | MCP tool creation with custom auth headers threw an error | Standard |
| 3 | Fetching chat log list threw an error when user avatar was empty | Standard |
| 4 | chatAgent showed query rewriting as enabled in the frontend UI when it was actually disabled | Standard |
| 5 | maxTokens field was not assigned when loading default models, causing empty model max response configuration | Standard |
| 6 | S3 file cleanup queue was blocked due to network instability, preventing deletion tasks from executing | Standard |
| 7 | Chat log API adapted for mongo 4.x syntax | Standard |
| 8 | Variable update node incorrectly converted file URL string arrays to object arrays | Standard |
| 9 | Multiple form input nodes sharing sessionStorage caused default values not to display | Standard |
| 10 | Code execution node still used the old language for AI code generation after switching languages | Standard |
| 11 | Multiple custom feedback nodes writing concurrently triggered database write conflicts | Standard |
| 12 | Custom feedback nodes following interactive nodes failed to write | Standard |

## Post-Upgrade Validation Steps
To confirm all fixes are applied correctly after upgrading to FastGPT 4.14.5, follow these sequential validation steps:
1.  Test a parallel workflow merge to confirm no duplicate task execution occurs.
2.  Create an MCP tool with custom authentication headers to verify no runtime error is thrown during setup.
3.  Attempt to fetch chat logs for a user with an empty avatar profile to confirm successful data retrieval.
4.  Navigate to the chatAgent settings page and confirm the query rewriting toggle matches the actual configured state.
5.  Load default model configurations to verify the maxTokens field is properly populated, eliminating empty model max response settings.
6.  Monitor S3 file cleanup tasks to confirm deletion queues process without blockage from temporary network instability.
7.  Run chat log API operations on a MongoDB 4.x cluster to confirm compatibility and successful data access.
8.  Use the variable update node with a file URL string array to confirm correct conversion to the expected format.
9.  Deploy multiple form input nodes on a single page to confirm default values display correctly for all instances.
10. Switch the code execution node programming language and confirm AI-generated code uses the newly selected language.
11. Execute concurrent write operations from multiple custom feedback nodes to confirm no database write conflicts occur.
12. Place a custom feedback node after an interactive node and submit test data to confirm successful writing to the database.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4145)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
