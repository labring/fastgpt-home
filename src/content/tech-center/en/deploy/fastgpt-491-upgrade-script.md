---
title: Execute the FastGPT 4.9.1 Upgrade Script
slug: /en/deploy/fastgpt-491-upgrade-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/491
source_type: 官方文档
---

# Execute the FastGPT 4.9.1 Upgrade Script

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview of the 4.9.1 Upgrade Script
This administrative script is part of the self-hosted FastGPT upgrade process for version 4.9.1. It triggers a predefined API endpoint to perform required data updates for your deployment. The script is executed entirely via a terminal-based HTTP request, with no additional local software required beyond standard curl tooling available on most operating systems.

## Step-by-Step Execution Command
To run the upgrade script, you must first retrieve two critical values from your FastGPT deployment configuration:
1.  The `rootkey` administrative credential, which is stored in your environment variables
2.  Your deployed FastGPT domain, referenced as `{{host}}` in the command template

Use the following curl command, substituting the placeholders with your actual deployment values:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv491' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Each component of the command serves a defined purpose:
- The `--location` flag automatically follows any HTTP redirects issued by the FastGPT server
- The `rootkey` header authenticates the request as an authorized administrative action
- The `Content-Type` header specifies the request media type as JSON, aligning with the endpoint's requirements

## Script Function and Monitoring
The primary function of this upgrade script is to reprocess tokenization using the latest jieba dictionary. This data reprocessing step may take a significant amount of time, with the total duration dependent on the volume of data stored in your FastGPT deployment. To track the progress of the reprocessing, you can monitor the runtime logs of your FastGPT application, which will output periodic status updates throughout the script's execution.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/491)
