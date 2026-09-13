---
title: FastGPT 4.8.13 Release Feature and Fix Updates
slug: /en/deploy/fastgpt-4813-release-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4813
source_type: 官方文档
---

# FastGPT 4.8.13 Release Feature and Fix Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Functional Additions
This release adds multiple core user and developer-facing features:
1. Array variable selection now supports multi-select, with selected arrays or single data types automatically merged in the order of selection.
2. A revamped file upload workflow: AI chat and tool call nodes directly accept file URLs and enforce prompt injection without model-driven decisions; plugin custom variables now support file upload types, replacing global file references.
3. Chat history now displays timestamps for all messages.
4. Workflow validation errors now automatically navigate to the faulty node.
5. The loop node now includes an index value for iterative operations.
6. Partial chat error messages now have translated language support.
7. The chat input box supports drag-and-drop file uploads.
8. Chat logs now show the specific share link or API name as the request source.
9. Shared chat links now support configuration to display real-time execution status.

## Share Link Configuration Parameters
The following new configuration option is available for shared chat links:
| Configuration Key | Accepted Values | Purpose |
|-------------------|-----------------|---------|
| `show_real_time_execution_status` | Boolean (`true`/`false`) | Toggles display of real-time workflow execution status on the shared chat interface |

## Usability and Performance Improvements
Several enhancements improve system stability and user experience:
- Multiple system prompts have been merged into one to support models that do not accept multiple system prompt inputs.
- Error messages for dataset file uploads have been refined for clearer troubleshooting.
- Full-text search query rewriting has been updated to eliminate one unnecessary subquery.
- The `findLast` array method has been replaced with `[...array].reverse().find` to improve compatibility with older browsers.
- The Markdown component now includes auto-spacing to prevent splitting Chinese characters within URLs.
- Workflow context splitting has been optimized to deliver better overall performance.
- Text-to-speech functionality now waits for full audio generation before playback for browsers that do not support `mediaSource`.
- Chat starter CSV file reading now includes automatic encoding detection to improve import reliability.

## Critical Bug Fixes
Resolved issues include:
1. Dockerfile `pnpm install` commands now support proxy configurations for restricted network environments.
2. BI chart generation was fixed to properly write output files, with parsing updated to support numeric array types.
3. Share link titles now display correctly on the first page load, resolving an initial rendering bug.
4. Potential garbled text when importing chat starters via CSV has been fixed.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4813)
