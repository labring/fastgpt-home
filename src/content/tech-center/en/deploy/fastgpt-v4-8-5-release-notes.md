---
title: FastGPT v4.8.5 Release Feature and Fix Details
slug: /en/deploy/fastgpt-v4-8-5-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/485
source_type: 官方文档
---

# FastGPT v4.8.5 Release Feature and Fix Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT v4.8.5 Release Feature and Fix Details

## Unified Studio and Core New Features
This release consolidates plugins and applications into a single unified Studio interface. Additional new capabilities include one-click app duplication, app template creation workflows, support for using code execution results as formal tool output, and pinch-to-zoom functionality for markdown images on mobile devices.

## Usability and Performance Enhancements
Several backend and frontend improvements streamline platform operation:
- Raw file encoding is updated for more reliable storage and retrieval
- Simple mode now filters out deleted datasets to prevent false error states
- Folder file limits are increased to support more than 100 files per folder
- For QA splitting and manual entry workflows, when an `a` field is present, the `q` field is automatically utilized as a supplementary index
- Frontend code for the chat dialog page is optimized
- New workflow nodes are automatically assigned sequential numbers upon creation

## Resolved Critical Bug Fixes
Multiple high-priority issues are addressed in this release:
- Scheduled tasks can now be properly disabled without remaining active
- Input guide special characters no longer trigger regex parsing errors
- Files containing unescaped `%` characters no longer cause page crashes
- Selecting dataset citations within custom input fields no longer results in page crashes

## Quick Verification Steps
1. Navigate to the scheduled tasks management page, toggle a task's disable status, and confirm the task stops executing as expected to validate the scheduled task fix.
2. Access the app library, select a target app, use the new duplication tool to create a duplicate copy, confirming the feature functions correctly.
3. Upload more than 100 files to a single folder, verify the folder loads fully without errors to confirm the folder file limit improvement.
4. Test the markdown image pinch-to-zoom feature on a mobile device by opening a chat with embedded markdown images.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/485)
