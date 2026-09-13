---
title: Complete Required FastGPT Commercial Edition Initialization
slug: /en/deploy/fastgpt-commercial-edition-initialization
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/468
source_type: 官方文档
---

# Complete Required FastGPT Commercial Edition Initialization

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
Self-hosted FastGPT commercial edition deployments require a dedicated initialization procedure to format team information and configure the integrated billing system. This step is mandatory for commercial users to ensure core commercial features function as intended before launching the instance for team use.

## Required Configuration Values
Two critical values must be sourced from your deployment environment before running the initialization:
1.  `rootkey`: The admin root key defined in your FastGPT commercial edition environment variables. This key authenticates privileged API requests for initialization.
2.  `host`: The full public domain name for your deployed FastGPT commercial edition instance, including the HTTPS protocol (e.g., `https://your-company-fastgpt.com`).

## Step-by-Step Initialization Request
To execute the initialization, send a single authenticated HTTP POST request using the following curl command. Replace the placeholder values `{{rootkey}}` and `{{host}}` with your actual environment values:
```bash
curl --location --request POST 'https://{{host}}/api/init/v468' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
### Request Details
The target API endpoint is `/api/init/v468`, which specifies the commercial edition initialization workflow for version 468. The `rootkey` header provides the required administrative authentication, and the `Content-Type: application/json` header ensures the request payload is formatted correctly for the FastGPT API. No additional request body parameters are required for this initialization step.

## Post-Initialization Behavior
Upon successful execution of the command, the FastGPT commercial billing system will be fully initialized. For internal-only FastGPT deployments, you may adjust the free storage quota to meet your team's needs without external billing configuration.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/468)
