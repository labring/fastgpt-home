---
title: FastGPT 4.15.7 List of Resolved Bug Fixes
slug: /en/deploy/fastgpt-4-15-7-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4157
source_type: 官方文档
---

# FastGPT 4.15.7 List of Resolved Bug Fixes

## Summary of FastGPT 4.15.7 Bug Fixes
This document outlines the targeted bug fixes released in FastGPT 4.15.7 for self-hosted FastGPT instances. All changes address specific operational edge cases and configuration validation gaps that impact standard FastGPT deployment workflows.

## Individual Fix Breakdown
### MCP SSE Fallback Duplicate Header Fix
When a Model Context Protocol (MCP) connection using Streamable HTTP encounters a failure, the FastGPT service automatically falls back to using Server-Sent Events (SSE) for continued communication. Prior to 4.15.7, this fallback flow incorrectly injected duplicate request headers, leading to upstream API rejection, increased error logs, or interrupted model inference. This fix removes duplicate header entries during the SSE fallback process, ensuring clean, valid HTTP requests are sent to upstream services.

### Portal Quick App Count Limit and Validation
FastGPT’s portal quick app functionality now enforces a maximum limit of 3 active quick apps per portal instance. Additionally, new validation logic has been added to detect existing legacy portal configurations that exceed this 3-app limit, preventing unexpected deployment failures or broken app workflows during updates.

### App Upload Configuration Alignment
Previously, published FastGPT apps incorrectly rejected file upload attempts even when individual file variables were configured to allow uploads. This mismatch occurred when the app-level global upload configuration was disabled, overriding per-variable permissions. The 4.15.7 fix aligns the access control logic to prioritize per-variable upload settings when app-level global configurations are adjusted, ensuring consistent file upload behavior for published apps.

## Legacy Configuration Validation Steps
For self-hosted instances with existing portal quick app configurations, follow these steps to validate compliance with the new limit:
1. Access the FastGPT portal admin dashboard using your authorized credentials.
2. Navigate to the **Portal Quick Apps** management menu.
3. Count the total number of currently configured quick apps.
4. If the total exceeds 3, remove excess quick app entries to comply with the 3-app limit.
5. Save updated configurations and restart the FastGPT portal service to apply the validation changes.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4157)
