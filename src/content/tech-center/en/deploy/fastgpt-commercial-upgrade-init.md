---
title: Initialize FastGPT Commercial Edition Upgrade Data
slug: /en/deploy/fastgpt-commercial-upgrade-init
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4812
source_type: 官方文档
---

# Initialize FastGPT Commercial Edition Upgrade Data

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This step is a required initialization task for FastGPT Commercial Edition upgrades targeting version 4812. It configures and initializes member group data for applications and datasets within your self-hosted FastGPT deployment. This task must be completed to ensure proper access control and data organization for post-upgrade FastGPT functionality.

## Prerequisites
Before running the initialization command, you must have two critical pieces of information:
1.  The `rootkey` value from your FastGPT environment variables. This key grants administrative access to run initialization tasks.
2.  Your self-hosted FastGPT domain, referred to as `{{host}}` in the command template.
You will also need a terminal with the `curl` utility installed, and outbound network access to your FastGPT domain from the terminal machine.

## Initialization Command
Use the following HTTP POST request via `curl` to run the initialization. Replace the placeholder values exactly as specified:
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/4812' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
### Command Component Details
Each part of the command serves a defined purpose:
- `--location`: Ensures the request follows any HTTP redirects sent by the FastGPT server
- `--request POST`: Specifies the required HTTP POST method for the initialization endpoint
- `https://{{host}}/api/admin/init/4812`: The official administrative initialization endpoint for FastGPT 4812 upgrades
- `rootkey: {{rootkey}}`: Authentication header using your administrative root key from environment variables
- `Content-Type: application/json`: Sets the request content type to JSON, a required format for the endpoint to process the request

## Post-Initialization Validation
After executing the command, confirm the initialization completed successfully. The FastGPT server will return a valid JSON response confirming that member group data for applications and datasets has been initialized. If the request fails, verify that the `rootkey` is correct, your FastGPT domain is reachable, and the `curl` command uses the exact header and endpoint format provided.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4812)
