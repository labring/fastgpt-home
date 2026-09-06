---
title: Run FastGPT v445 Variable Node Initialization
slug: /en/deploy/fastgpt-v445-init-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/445
source_type: 官方文档
---

# Run FastGPT v445 Variable Node Initialization

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This documentation covers the administrative initialization API required for FastGPT v445 self-hosted upgrade deployments. The API call merges the Variable node into the User Guide node, completing critical system setup for the targeted upgrade path. No additional configuration steps are needed beyond running the authenticated API request.

## Mandatory Request Headers
All requests to the initialization endpoint require two specific HTTP headers to authenticate and validate the request:
1. `rootkey`: A secret administrative key retrieved directly from your FastGPT self-hosted environment variables. This header grants access to the restricted administrative API endpoint.
2. `Content-Type`: Must be set exactly to `application/json` to ensure the FastGPT server parses the request correctly.

## Step-by-Step API Execution
Follow these exact, source-provided steps to run the initialization API:
1. Locate and copy your `rootkey` value from your FastGPT self-hosted environment variables. This key is preconfigured as part of your deployment setup.
2. Replace the `{{host}}` placeholder in the endpoint URL with your FastGPT deployment’s public base URL (for example, `https://your-fastgpt-domain.com`). Do not include trailing slashes in the base URL.
3. Run the following cURL command in a terminal or command-line interface to send the initialization request:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv445' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
No request body is required for this endpoint. The `--location` flag included in the command ensures any automatic URL redirects are handled correctly during the request.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/445)
