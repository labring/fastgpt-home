---
title: Run the FastGPT v467 Initialization API
slug: /en/deploy/fastgpt-v467-initialization-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/467
source_type: 官方文档
---

# Run the FastGPT v467 Initialization API

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

### Overview
This page details the official v467 initialization API for self-hosted FastGPT deployments. This API is intended for post-upgrade data consistency maintenance, targeting adjustments required after upgrading to the FastGPT v467 release. It executes two core data processing operations to align deployment data to the v467 schema requirements.

### Initialization Core Functions
The API performs two specific data adjustment tasks during execution:
1.  Re-establishes associations between uploaded images and their parent Collections within the FastGPT deployment
2.  Cleans up and sets null values in PostgreSQL (PG) database tables associated with the FastGPT application

### Step-by-Step API Execution
To run the initialization API, you must first obtain two required configuration values from your self-hosted FastGPT environment:
1.  `{{rootkey}}`: The root authentication key configured in your FastGPT deployment's environment variables
2.  `{{host}}`: Your deployment's public domain or base URL, used to construct the API endpoint URL

Use the following validated curl command template to send the initialization request, replacing the placeholder values with your actual deployment details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv467' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
This POST request does not require a request body. The `--location` flag ensures that any valid HTTP redirects returned by the API endpoint are automatically followed, while the included headers authenticate the request and specify the correct content type for the API call.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/467)
