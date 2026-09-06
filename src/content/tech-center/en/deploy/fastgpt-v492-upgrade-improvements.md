---
title: Key FastGPT v492 Version Upgrade Improvements
slug: /en/deploy/fastgpt-v492-upgrade-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/492
source_type: 官方文档
---

# Key FastGPT v492 Version Upgrade Improvements

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This page outlines the concrete feature and optimization improvements released in FastGPT version 492 for self-hosted deployments, targeted at engineering and technical leadership teams.

## Platform & Core Framework Updates
The Next.js framework underlying FastGPT has been upgraded to version 14.2.25. This update improves foundational stability, compatibility, and performance for self-hosted instances without introducing breaking changes to core deployment workflows.

## Workflow & AI Proxy Optimizations
Several targeted improvements were made to workflow automation and AI proxy functionality:
- AI Proxy channel names now display correctly in the interface, even when channels are not pre-built into the deployment.
- AI Proxy logging has been streamlined: retry failure logs are removed, retaining only the final error log to reduce noise in debug outputs.
- Workflow node handling has been simplified: array-string type nodes automatically adapt to string input, and array-type nodes now automatically JSON-parse string input, eliminating manual formatting steps for users building automation flows.

## UI & Usability Improvements
Multiple user interface and experience refinements were implemented:
- Chat log exports now include member names for improved traceability and auditability.
- The invite link user interface has been updated for clearer navigation and usage.
- A dialog prompt now appears when SSL certificates are unavailable and copy operations fail, allowing users to perform manual copying as needed.
- Personal information and notification displays have been optimized for greater clarity.
- Loading animations for model testing have been updated to provide more consistent visual feedback during validation workflows.

## Chunking Algorithm Refinements
Minor adjustments were made to the document chunking algorithm to improve content retention during processing:
| Adjustment Category | Specific Improvements |
|----------------------|----------------------|
| Cross-processing symbols | Enhanced continuity between cross-processing symbols to prevent broken content splits |
| Code block handling | Uses the LLM model’s context window as the chunk size to better preserve full code block integrity |
| Table handling | Uses the LLM model’s context window as the chunk size to maintain complete table structure during splitting |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/492)
