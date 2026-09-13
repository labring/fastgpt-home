---
title: Manually Run FastGPT Stale Data Cleanup
slug: /en/deploy/fastgpt-stale-data-cleanup-2
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/481
source_type: 官方文档
---

# Manually Run FastGPT Stale Data Cleanup

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview of Stale Data Cleanup
Self-hosted FastGPT deployments previously utilized a scheduled automated cleanup timer that contained documented issues, including the failure to identify and purge all invalid dataset entries. This manual cleanup utility allows administrators to trigger a comprehensive sweep of invalid data on demand, ensuring the FastGPT instance maintains accurate storage utilization and data integrity by resolving gaps present in the original scheduled cleanup workflow.

## Required Configuration Values
Before executing the cleanup command, two mandatory configuration values must be retrieved from your self-hosted FastGPT environment:
- `{{rootkey}}`: The elevated administrator key configured in your FastGPT environment variables. This header value authenticates the request to run administrative cleanup tasks.
- `{{host}}`: The full base domain or URL for your FastGPT deployment, including the HTTPS protocol (e.g., `https://fastgpt.yourorganization.com`).

## Step-by-Step Execution
From any terminal with network connectivity to your FastGPT host, construct and run the following HTTP POST request. Replace the placeholder values with your actual retrieved configuration details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/clearInvalidData' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
After submitting the request, the FastGPT backend will process the cleanup task, scanning all stored data to remove invalid entries that were not addressed by the prior scheduled cleanup process. No additional optional parameters are supported for this command per the official documentation.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/481)
