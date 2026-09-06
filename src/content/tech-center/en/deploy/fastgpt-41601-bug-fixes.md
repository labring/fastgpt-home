---
title: FastGPT 4.16.01 Official Bug Fixes
slug: /en/deploy/fastgpt-41601-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41601
source_type: 官方文档
---

# FastGPT 4.16.01 Official Bug Fixes

This document outlines all resolved bugs in the FastGPT 4.16.01 self-hosted release, covering sandbox infrastructure, frontend UI, tooling configuration, cloud storage, and security fixes for administrators and engineers.

## Sandbox and Runtime Stability Fixes
This category addresses critical issues with sandbox resource management, concurrent operations, and file system access:
- OpenSandbox resources were not properly released or reused after stopping a sandbox instance, leading to potential resource exhaustion.
- State races and duplicate operations occurred during Agent Sandbox creation, restoration, and runtime upgrades, causing unstable sandbox behavior.
- Sandbox write operations to nested directories failed if the parent directory did not exist, blocking valid file creation workflows.
- Duplicate HTTP headers were present in MCP SSE mode responses, disrupting client-side event processing.
- Agent V2 system tool keys were stored unencrypted, creating a potential security vulnerability.

## UI and Tooling Configuration Fixes
This section resolves frontend rendering errors and tool display inconsistencies:
- Number inputs switched to regular text fields when toggling between Agent-generated and manual input modes, breaking numeric data entry.
- String inputs were incorrectly rendered as dropdown selection fields, preventing free-form text input.
- The JSON Editor component was erroneously included in Workflow tool configuration panels, adding unnecessary interface clutter.
- Tool execution errors were displayed incorrectly across Agent and Workflow tool interfaces, hindering debugging efforts.
- Uninstalled system tools continued to appear in the system tool list, confusing users during tool selection.
- The default Agent/Agent V2 version selection no longer defaulted to the latest available version, requiring manual version selection for new agents.

## Comprehensive Fixed Issues Reference Table
| Component Category       | Detailed Fixed Issue                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Sandbox Management       | OpenSandbox resources not released/reused after stopping                              |
| Sandbox Runtime          | State races and duplicate operations during sandbox create/restore/upgrade            |
| Sandbox File I/O         | Nested directory writes fail when parent directory missing                            |
| UI Input Fields          | Number inputs switch to text on Agent input mode toggle                               |
| UI Input Fields          | String inputs rendered as incorrect dropdowns                                          |
| Workflow Tooling         | JSON Editor incorrectly included in Workflow tool config                              |
| Tool Error Display       | Incorrect error rendering for tool executions in Agent/Workflow interfaces            |
| System Tool List         | Uninstalled tools remain visible in system tool list                                  |
| Agent Version Selection  | Default Agent/Agent V2 version not set to latest release                              |
| S3 Storage               | S3-hosted images with spaces fail parsing due to malformed keys (404 errors)           |
| Security                 | Unencrypted Agent V2 system tool keys                                                |
| MCP SSE Mode             | Duplicate headers in MCP SSE mode responses                                           |

All fixes are included in the official FastGPT 4.16.01 self-hosted upgrade package. No additional custom configuration changes are required to implement these fixes, though administrators may wish to validate sandbox and S3 storage integrations post-upgrade to confirm full resolution of reported issues.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41601)
