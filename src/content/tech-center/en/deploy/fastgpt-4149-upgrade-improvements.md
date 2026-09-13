---
title: FastGPT 4.14.9 Upgrade Key Improvement Details
slug: /en/deploy/fastgpt-4149-upgrade-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4149
source_type: Official documentation
---

# FastGPT 4.14.9 Upgrade Key Improvement Details

## API and Tooling Enhancements
This section covers critical updates to API integrations, dataset synchronization, and built-in workflow tooling. First, API-based dataset synchronization now includes additional fallback methods for retrieving file names, addressing edge cases where primary filename retrieval mechanisms fail to return valid data. Next, the HTTP tool now incorporates SSRF protection, which blocks unauthorized requests to internal network resources, reducing security risks associated with external workflow tool calls. Finally, compatibility with MCP JsonSchema fields has been improved; prior versions could not properly handle mixed-type fields, limiting support for certain schema definitions, while this update resolves that limitation to expand supported format options.

## Workflow Runtime Stability & Performance
Optimizations have been made to key workflow runtime components to improve reliability and reduce operational overhead. First, parts of the workflow runtime pool logic have been refined to lower computational complexity, which reduces resource usage during concurrent workflow executions. A critical stability fix was also implemented: the edge grouping logic for workflow runtime now uses Tarjan's Strongly Connected Components (SCC) algorithm instead of the previous DFS implementation. This change resolves failures that occurred when running complex cyclic workflows, which previously could not execute correctly due to flawed cycle detection logic.

## System Toolkit Interface Update
System toolkits no longer display a version number in their user interface. This change aligns with the fact that system toolkits have no selectable versions, simplifying the user interface and removing unnecessary visual clutter for users configuring and deploying workflows.

## Quick Reference Improvement Table
Below is a structured table summarizing all documented improvements in FastGPT 4.14.9:
| Improvement Category | Specific Changes |
|----------------------|------------------|
| Dataset Sync API | Added fallback filename retrieval methods |
| HTTP Tool | Added SSRF protection |
| MCP JsonSchema | Improved support for mixed-type fields |
| Workflow Runtime Pool | Optimized logic to reduce computational complexity |
| Workflow Edge Grouping | Replaced DFS with Tarjan's SCC algorithm, fixing cyclic workflow failures |
| System Toolkits | Removed version number display |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4149)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
