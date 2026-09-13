---
title: Run the FastGPT 4101 Commercial Migration Script
slug: /en/deploy/fastgpt-4101-commercial-migration-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4101
source_type: 官方文档
---

# Run the FastGPT 4101 Commercial Migration Script

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Prerequisite for the Migration Script
This migration script is exclusively intended for commercial edition FastGPT users. Non-commercial edition deployments do not need to run this command when upgrading to version 4101, as the script targets commercial-specific feature updates. All execution requires valid access to the `rootkey` value configured in your FastGPT environment variables.

## Step-by-Step Execution Instructions
To execute the 4101 migration script, follow these structured steps using a terminal with outbound HTTPS access to your FastGPT domain:
1. Launch a terminal session on any machine that can reach your FastGPT domain.
2. Replace the `{{rootkey}}` placeholder with the `rootkey` value from your FastGPT environment variables. This header authenticates the administrative migration request.
3. Replace the `{{host}}` placeholder with your fully qualified FastGPT domain name.
4. Run the finalized curl command in your terminal:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4101' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
The command sends a POST request to the dedicated `/api/admin/initv4101` administrative endpoint.

## Post-Migration Task Updates
Upon successful completion of the script, FastGPT will add new scheduled tasks configured for automatically synchronized datasets. These scheduled tasks automate the synchronization of external dataset sources, reducing manual maintenance overhead for commercial deployments. The new tasks are integrated into the FastGPT built-in task scheduler, and will operate using the deployment’s existing task configuration settings.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4101)
