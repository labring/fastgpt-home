---
title: FastGPT v497 Detailed Bug Fix Summary
slug: /en/deploy/fastgpt-v497-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/497
source_type: 官方文档
---

# FastGPT v497 Detailed Bug Fix Summary

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This page details all bug fixes included in FastGPT version 497 for self-hosted administrators and technical users.

## Infrastructure & Data Storage Fixes
This section addresses core storage and data handling issues:
- Implemented a file upload chunk size limit to prevent exceeding MongoDB database document size constraints during file transfers.
- Updated chat record export functionality to cap individual conversation exports at 1,000 message pairs, eliminating export failure errors caused by overly large datasets.
- Fixed a dataset collection metadata filtering bug where same-named tags across separate datasets failed to return matching results when using `$and` logical filters.

## Dashboard & Analytics Fixes
Resolved two critical reporting and dashboard-related bugs:
- Corrected an issue where the usage dashboard could not retrieve usage statistics for specific individual team members.
- Fixed timezone handling logic in the dashboard API, which previously returned incorrect statistical data due to misaligned time zone conversions.

## Workflow & Node Debug Fixes
This section covers workflow, LLM, and data node improvements, including a validation step for the LLM model test API fix:
1.  Resolved core LLM test API issues: the endpoint can now test disabled LLM models, and no longer strips custom request URLs during test runs. To validate this fix:
    a.  Navigate to the FastGPT LLM model management interface
    b.  Select an enabled LLM model with a custom request URL configured
    c.  Run a test via the model test API endpoint
    d.  Confirm the test completes successfully and the custom request URL is preserved
2.  Fixed a workflow variable rendering bug where consecutive workflow variables failed to trigger proper content rendering.
3.  Eliminated "no permission" errors during debugging of the Dataset search node.
4.  Corrected default value assignment logic for the Text content extraction node.
5.  Fixed copy app permission configuration issues, ensuring proper access controls are applied when duplicating applications.
6.  Resolved a share link bug where nested applications would forcibly return citation content unexpectedly.
7.  Fixed app list permission configuration that previously caused index refresh issues.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/497)
