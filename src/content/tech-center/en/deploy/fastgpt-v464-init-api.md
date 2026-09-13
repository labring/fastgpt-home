---
title: Execute FastGPT v464 Administrative Initialization API
slug: /en/deploy/fastgpt-v464-init-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/464
source_type: 官方文档
---

# Execute FastGPT v464 Administrative Initialization API

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT v464 Administrative Initialization API
This document covers the administrative initialization API for FastGPT version 464 self-hosted deployments. The API is used to update existing database structures to meet the requirements of the FastGPT v464 release.

## API Request Details
The initialization API requires a POST request to the endpoint `https://{{host}}/api/admin/initv464`. Two custom HTTP headers must be included in the request:
1. `rootkey`: Replace `{{rootkey}}` with the administrative root key configured in your FastGPT environment variables.
2. `Content-Type`: Set to `application/json`, with no additional request body required.

The official curl command syntax for executing this request is:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv464' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## Step-by-Step Execution
1. Retrieve your FastGPT administrative root key from your self-hosted environment variables.
2. Substitute the `{{host}}` placeholder in the curl command with your deployment’s public domain name.
3. Substitute the `{{rootkey}}` placeholder in the curl command with the administrative root key you retrieved.
4. Run the modified curl command in a terminal environment with network access to your FastGPT instance.

## API Database Updates
When executed successfully, the API performs two targeted database updates:
1. Initializes the `createTime` field in PostgreSQL databases across your FastGPT deployment.
2. Initializes the feedback field for chat records stored in MongoDB.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/464)
