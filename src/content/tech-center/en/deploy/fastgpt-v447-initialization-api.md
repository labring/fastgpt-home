---
title: Run FastGPT v447 Initialization API
slug: /en/deploy/fastgpt-v447-initialization-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/447
source_type: 官方文档
---

# Run FastGPT v447 Initialization API

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## API Purpose and Behavior
This initialization API supports FastGPT self-hosted deployment upgrades for version 447. It performs two critical database operations: initializing PostgreSQL indexes to optimize query performance, and converting empty `file_id` database objects to standardized `manual` objects to resolve data consistency gaps. For deployments with large datasets, execution may take extended time; administrators should monitor deployment logs to track real-time progress during processing.

## Required Parameters and Request Structure
The API request requires specific authentication and configuration values. The following table outlines all mandatory parameters:
| Parameter | Location | Requirement | Description |
|-----------|----------|-------------|-------------|
| `rootkey` | Request Header | Required | Authentication credential retrieved from the FastGPT deployment's environment variables |
| `host` | URL Base Path | Required | Public domain or base URL of your self-hosted FastGPT instance |
The full API endpoint is `https://{{host}}/api/admin/initv447`, where both `{{host}}` and `{{rootkey}}` must be replaced with actual deployment values. The request must include the `Content-Type: application/json` header to ensure proper payload handling.

## Step-by-Step Execution
1. Retrieve your `rootkey` value from the environment variables configured for your FastGPT deployment.
2. Replace the placeholder values `{{host}}` and `{{rootkey}}` in the following curl command with your actual domain and authentication key:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv447' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
3. Run the modified curl command in a terminal or command line interface with access to your FastGPT deployment network.
4. Monitor your FastGPT deployment logs to confirm successful completion of the initialization tasks.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/447)
