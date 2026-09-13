---
title: Run the FastGPT 4.9.4 Upgrade Script
slug: /en/deploy/fastgpt-494-upgrade-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/494
source_type: 官方文档
---

# Run the FastGPT 4.9.4 Upgrade Script

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Required User Eligibility
This upgrade script is exclusively intended for FastGPT Pro edition users. Only individuals with access to the deployment’s `rootkey` environment variable and the public FastGPT domain can successfully execute this command. Unauthorized execution will fail due to missing or invalid authentication credentials, as the target administrative endpoint requires valid `rootkey` authentication.

## Step-by-Step Execution Command
To run the 4.9.4 upgrade script, use any standard terminal session and submit the following HTTP POST request. Two mandatory placeholders must be replaced prior to running the command:
1. Replace `{{rootkey}}` with the exact value of your FastGPT deployment’s `rootkey` environment variable. This key grants full administrative access to run upgrade operations.
2. Replace `{{host}}` with your public FastGPT domain name (e.g., `fastgpt.yourcompany.com`).

The complete, required curl command is:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv494' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Each component of this command is required: the `--location` flag automatically follows any HTTP redirects, the `rootkey` header authenticates the administrative request, and the `Content-Type` header specifies that the request body uses JSON formatting.

## Script Functional Impact
When executed without errors, this script performs one targeted upgrade task: it updates the site sync scheduler for your FastGPT 4.9.4 deployment. This adjustment aligns your site’s synchronization processes with the latest version’s requirements, resolving potential scheduling inconsistencies or synchronization failures associated with prior configurations. No additional changes to your deployment’s core functionality, stored data, or secondary settings are made by this script.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/494)
