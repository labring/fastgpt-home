---
title: Perform FastGPT v469 Initialization Operations for Self-Hosted Deployments
slug: /en/deploy/fastgpt-v469-initialization-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/469
source_type: 官方文档
---

# Perform FastGPT v469 Initialization Operations for Self-Hosted Deployments

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview of FastGPT v469 Initialization Script
This administrative maintenance tool targets FastGPT version 469 for self-hosted deployments. It runs two targeted administrative tasks via a dedicated API endpoint, with strict authentication required to prevent unauthorized execution. All operations are triggered using a standard HTTP POST request.

## Required Command Parameters
The initialization request includes two mandatory placeholders that must be replaced with values from your self-hosted deployment before running the command:
1.  `{{rootkey}}`: The admin root key value stored in your FastGPT environment variables. This header authenticates the administrative API call.
2.  `{{host}}`: The public domain name of your FastGPT deployment, formatted with the appropriate protocol (e.g., `https://your-fastgpt-domain.com`).

## Step-by-Step Execution Command
Execute the following cURL command from any terminal session, replacing the placeholders with your actual deployment details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv469' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
This command sends a properly formatted POST request to the `/api/admin/initv469` endpoint, including the required authentication and content type headers. No additional request body is needed for this endpoint.

## Supported Maintenance Tasks
Upon successful execution, the script completes two predefined maintenance operations:
1.  **Reset Usage Tracking Table**: Clears and resets the system’s usage tracking database table to ensure accurate tracking of future platform activity.
2.  **Stale Data Cleanup**: Removes invalid, unused, or orphaned assets including uploaded files, images, dataset collections, and vector embeddings that are no longer linked to valid FastGPT resources.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/469)
