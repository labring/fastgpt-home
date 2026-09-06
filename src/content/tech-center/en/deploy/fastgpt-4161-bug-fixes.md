---
title: List of FastGPT 4.16.1 Bug Fixes
slug: /en/deploy/fastgpt-4161-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4161
source_type: 官方文档
---

# List of FastGPT 4.16.1 Bug Fixes

## Overview
This document details the bug fixes included in FastGPT 4.16.1 for self-hosted FastGPT deployments. Each resolution addresses a specific operational, display, or security issue to improve platform reliability and user experience for administrators and end users.

## Detailed Bug Fix Entries
The following five specific issues are resolved in this release:
1.  **Workflow Global Variable Configuration Overflow**: Fixed layout overflow in Workflow global variable configuration panels when using excessively long field names.
2.  **AgentV2 Child Workflow Streaming Handling**: Corrected execution logic for AgentV2 calls to child Workflows, ensuring streaming output disable settings within the target Workflow are properly enforced.
3.  **Team Invitation Link Reuse**: Fixed a security oversight where team invitation links could be exploited to accept the same team invitation multiple times.
4.  **Usage Records Date Picker Display**: Resolved a UI bug where the date picker component on the Usage records page displayed one unintended extra day in selections.
5.  **Dataset Fallback Image Model Display**: Fixed client-side rendering where a fallback image model was shown even when no custom image model was configured for a Dataset.

## Post-Upgrade Verification Steps
To confirm all fixes are active on your self-hosted instance, follow these targeted validation steps:
1.  Navigate to the Workflow editor, access the global variable configuration menu, and input a field name longer than 50 characters. Confirm the configuration panel does not exhibit text overflow or broken UI elements.
2.  Create an AgentV2 bot configured to trigger a child Workflow with streaming output disabled. Run a test chat session and verify the child Workflow does not produce unintended streaming output.
3.  Generate a team invitation link, use it to accept the invitation once with a test user account, then attempt to reuse the same link to accept the invitation again. Confirm the second acceptance attempt is rejected.
4.  Open the Usage records page, launch the date picker component, and confirm no extra day is displayed in calendar previews or selected date ranges.
5.  Edit an existing Dataset with no custom image model configured, upload a test image, and confirm the client does not display a fallback image model by default.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4161)
