---
title: Run the Required FastGPT v43 Initialization API
slug: /en/deploy/fastgpt-v43-init-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/43
source_type: 官方文档
---

# Run the Required FastGPT v43 Initialization API

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Purpose of the FastGPT v43 Initialization API
This API is a required step for self-hosted FastGPT v43 deployments. When successfully executed, it modifies the PostgreSQL database used by your FastGPT instance by adding a new `file_id` column to the `modeldata` table. This column is intended for storing file identifiers linked to FastGPT platform resources.

## Required Request Components
All initialization requests must include two mandatory HTTP headers and a valid target endpoint:
1.  Authentication header: The `rootkey` header, whose value is pulled directly from your FastGPT deployment's environment variables. This header authenticates the privileged initialization request.
2.  Content type header: The `Content-Type` header set to `application/json` to specify the request format.
3.  API endpoint: The full path for the v43 initialization API is `https://{{host}}/api/admin/initv43`, where `{{host}}` represents your deployed FastGPT instance's base URL or IP address.

A reference table of required headers is below:
| HTTP Header Name | Value Source |
|-------------------|--------------|
| `rootkey` | FastGPT deployment environment variables |
| `Content-Type` | Fixed to `application/json` |

## Execute the Initialization Request
Use the following curl command to send the authenticated POST request. Replace the placeholders `{{host}}` and `{{rootkey}}` with your actual FastGPT base URL and rootkey value respectively:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv43' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
No request body is required for this API call. After successful execution, the `modeldata` PostgreSQL table will include the new `file_id` column.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/43)
