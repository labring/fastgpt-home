---
title: FastGPT 4.15.4 Official Bug Fix Documentation
slug: /en/deploy/fastgpt-4154-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4154
source_type: 官方文档
---

# FastGPT 4.15.4 Official Bug Fix Documentation

## 4.15.4 Bug Fix Overview
This document outlines all resolved functional and stability issues included in the FastGPT 4.15.4 self-hosted release, tailored for engineers and technical decision managers maintaining self-hosted FastGPT instances. All fixes address specific gaps identified in prior versions, with no disruptive changes to core existing workflows.

## Categorized Bug Fix Reference Table
| Fix ID | Affected Feature | Resolved Issue |
|---|---|---|
| 1 | Chatbox Streaming Interface | Fixed display of system tool errors during active streaming responses |
| 2 | Full Run Details Panel | Corrected incorrect Markdown parsing of plain-text tool responses that caused unintended formatting issues |
| 3 | Embedding Model Management | Fixed scenario where switching embedding models triggered reindexing but did not rebuild vectors for existing dataset data |
| 4 | MinIO Storage Operations | Fixed bulk deletion failures using prefix paths caused by XML entity expansion limits, and added request timeout protection for storage operations |
| 5 | Enterprise Verification Flow | Fixed bank account validation errors during enterprise verification processes |
| 6 | Agent V2 Tool Configuration | Resolved inconsistencies between the displayed Agent V2 tool list and its associated prompt text |
| 7 | Deployment Configuration Files | Fixed syntax errors in deployment `.yaml` script files |

## Post-Upgrade Validation Checklist
To confirm all fixes are successfully applied after upgrading to FastGPT 4.15.4, follow these sequential steps:
1.  Initiate a chat session with a tool-integrated assistant, and verify no system tool error messages appear during streaming response delivery.
2.  Execute a complete workflow run, then access the full run details panel to confirm plain-text tool responses render without unintended formatting issues.
3.  Navigate to the dataset model settings, switch the active embedding model, and confirm the system automatically rebuilds existing dataset vectors without requiring manual reindexing.
4.  Target a stored dataset with a defined storage prefix, initiate a bulk deletion operation, and confirm the task completes without failure.
5.  Complete a test enterprise verification flow, and confirm bank account validation processes complete successfully.
6.  Configure an Agent V2 assistant, review the configured tool list and associated prompt text to confirm alignment between both fields.
7.  Validate your deployment `.yaml` script files using your standard infrastructure orchestration tools to confirm no syntax errors are resolved.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4154)
