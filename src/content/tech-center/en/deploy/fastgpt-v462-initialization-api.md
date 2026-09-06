---
title: Execute FastGPT v462 Initialization API for Self-Hosted Deployments
slug: /en/deploy/fastgpt-v462-initialization-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/462
source_type: 官方文档
---

# Execute FastGPT v462 Initialization API for Self-Hosted Deployments

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Initialization API Purpose
This page covers the official v462 initialization API for self-hosted FastGPT deployments. This dedicated API call performs a single documented function: initializing full-text indexing for the FastGPT platform. No additional setup or configuration tasks are executed by this API request beyond the stated indexing initialization.

## Required Authentication and Endpoint Details
To run the initialization API, two placeholder values must be replaced with your deployment's specific configuration:
1. `{{rootkey}}`: The root administrator key retrieved directly from your FastGPT deployment's environment variables. This header value authenticates the administrative initialization request.
2. `{{host}}`: Your self-hosted FastGPT deployment's public domain name, used to construct the full HTTPS endpoint URL for the API call.
The official API endpoint path is `/api/admin/initv462`, accessed via HTTPS on your specified domain.

## Step-by-Step Execution Workflow
Follow these exact steps to run the initialization API:
1. Retrieve your deployment's rootkey value from the environment variables configured for your FastGPT instance.
2. Confirm your public deployment domain to use as the `{{host}}` placeholder.
3. Execute the standardized HTTP POST request using the provided curl command, replacing the two placeholder values:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv462' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
After submitting the request, the API will process the initialization of full-text indexing for your FastGPT deployment. No additional user input is required once the authenticated request is sent, as the API handles the full indexing initialization workflow as documented.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/462)
