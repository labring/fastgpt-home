---
title: Run the FastGPT v463 Initialization API
slug: /en/deploy/fastgpt-v463-init-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/463
source_type: 官方文档
---

# Run the FastGPT v463 Initialization API

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This documentation covers the administrative initialization API for FastGPT self-hosted deployments targeting version 463. This API is a required step to prepare your MongoDB data for the updated software version.

## Step-by-Step API Execution
To run the initialization API, follow these structured steps:
1. Retrieve your `rootkey` credential from your FastGPT environment variables. This is a secure administrative key for your deployment.
2. Identify your deployment’s base domain or URL, referenced as `{{host}}` in the sample command.
3. Execute the following curl command in a terminal with network access to your FastGPT instance, replacing the placeholders:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv463' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Substitute `{{host}}` with your deployment’s actual base URL (e.g., `https://your-fastgpt-domain.com`) and `{{rootkey}}` with your stored administrative root key. The `--location` flag ensures any required redirects are automatically followed during the request.

## API Functional Purpose
The initialization API performs a single targeted database update: it initializes required fields across relevant MongoDB datasets, collections, and individual data documents. This step aligns your existing data with the schema requirements of FastGPT v463, preventing compatibility issues following your upgrade. No additional changes are made to your deployment beyond these necessary field initializations.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/463)
