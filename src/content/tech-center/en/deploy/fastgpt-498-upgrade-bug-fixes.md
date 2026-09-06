---
title: Resolved FastGPT 498 Upgrade Bug Fixes
slug: /en/deploy/fastgpt-498-upgrade-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/498
source_type: 官方文档
---

# Resolved FastGPT 498 Upgrade Bug Fixes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This technical document outlines all resolved bugs included in the FastGPT 498 self-hosted upgrade, for engineers and technical decision-makers maintaining FastGPT deployments. All fixes address previously identified issues across core application workflows, permission controls, API handling, and media processing.

## Fixed Bug Reference Table
| Affected Feature | Reported Issue | Resolved Fix |
|-------------------|----------------|--------------|
| App/Dataset Lists | Incorrect permission display for delete row actions | Corrected permission logic to restrict delete row options to authorized users only |
| Dataset Search | Automatic enabling of rerank option on settings open | Disabled automatic rerank activation; rerank must be manually toggled on |
| LLM API Requests | Incorrect format for json_schema mode | Standardized API request structure to align with required schema specifications |
| Image Retraining | Expired image indexes not cleared, causing image loss | Added automated cleanup of expired image indexes during retraining jobs |
| Retraining Workflows | Permission access gaps for retraining operations | Aligned retraining access controls with core application permission rules |
| Internal Links | Broken or outdated documentation URL links | Updated all internal documentation hyperlinks to valid current endpoints |
| Claude Tool Calls | Failures caused by empty index values | Added null value validation for index parameters in Claude tool call workflows |
| Nested Workflows | Abnormal behavior with interactive nodes inside tool calls | Restored proper execution flow for nested workflows containing interactive tool call nodes |

## Post-Upgrade Validation Checklist
To confirm the 498 upgrade was deployed successfully, complete the following validation steps:
1. Navigate to the App List and Dataset List pages, verify delete row action buttons only display for users with appropriate edit permissions.
2. Open Dataset search configuration settings, confirm the rerank toggle is disabled by default on initial load.
3. Submit a test API request using the LLM json_schema mode, validate the request format matches expected specifications.
4. Execute a retraining job for an image dataset, confirm no orphaned expired image indexes remain after job completion.
5. Test Claude tool calls with both populated and empty index parameter values, confirm no workflow failures occur.
6. Deploy a nested workflow containing interactive nodes within a tool call, confirm the workflow executes without abnormal behavior.
7. Click all internal documentation links within the application, confirm all URLs resolve to valid endpoints.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/498)
