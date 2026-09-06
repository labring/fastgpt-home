---
title: Fix Incorrect TTL for MongoDB Bill Collection
slug: /en/deploy/fastgpt-mongodb-bill-ttl-fix
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/442
source_type: 官方文档
---

# Fix Incorrect TTL for MongoDB Bill Collection

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This technical page covers the FastGPT v442 initialization API, which resolves an issue with incorrect Time-to-Live (TTL) expiration settings for the MongoDB `Bill` collection in self-hosted deployments. The API targets a specific index reinitialization task to correct the flawed TTL configuration, ensuring proper automated cleanup of billing-related records in the MongoDB database.

## Required Authentication and Headers
To successfully call the initialization API, two HTTP headers must be included in every request:
1. `rootkey`: This value is pulled directly from your FastGPT self-hosted environment variables. It serves as the authentication credential for administrative API endpoints.
2. `Content-Type`: Must be set to `application/json` to ensure the request is parsed correctly by the FastGPT backend.

No additional request body parameters are required for this API call, as the endpoint is designed to trigger the index reinitialization process without additional configuration.

## Step-by-Step API Execution
Use the following exact cURL command to run the initialization API, replacing placeholder values with your deployment-specific details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv442' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Replace `{{host}}` with the full domain or IP address of your self-hosted FastGPT instance, such as `https://fastgpt.yourdomain.com` or `http://192.168.1.100:3000`. Replace `{{rootkey}}` with the exact rootkey value configured in your FastGPT environment variables.

## Expected Outcome
Upon successful execution of the request, the FastGPT backend will reinitialize the indexes on the MongoDB `Bill` collection. This action corrects the previously incorrect TTL expiration setting, ensuring that billing records are automatically cleaned up at the intended interval rather than failing to expire as configured. No explicit success response message is specified beyond the completion of the index reinitialization task.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/442)
