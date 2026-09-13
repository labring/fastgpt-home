---
title: Run FastGPT 4.8.23 Migration Script for Dataset Cleanup
slug: /en/deploy/fastgpt-4823-migration-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4823
source_type: 官方文档
---

# Run FastGPT 4.8.23 Migration Script for Dataset Cleanup

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## About the 4.8.23 FastGPT Migration Script
This administrative migration script is part of the self-hosted FastGPT upgrade workflow, specifically intended to resolve dataset dirty data inconsistencies. Its core function is to identify and remove redundant full-text indexes within FastGPT datasets, which can otherwise lead to unexpected behavior or degraded performance during standard platform use. The script requires elevated administrative access to execute, and is triggered via a dedicated API endpoint.

## Step-by-Step Execution Command
To run the migration script, use a terminal session with network access to your FastGPT domain. Execute the following HTTP POST request, replacing the placeholder values with your deployment’s specific details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4823' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Two required placeholder values must be replaced:
- `{{host}}`: Your FastGPT domain, used to form the full API endpoint URL.
- `{{rootkey}}`: The elevated administrative root key stored in your FastGPT environment variables.
No additional command flags or input parameters are needed beyond the provided structure.

## Script Purpose and Expected Results
The script operates autonomously once triggered, with no user intervention required after submission. It scans all configured FastGPT datasets to locate and clean up redundant full-text index entries, a common form of dirty data in post-upgrade deployments. No configuration options are exposed for this script; all necessary parameters are inherited from your existing FastGPT environment setup. Successful execution will resolve the targeted dataset inconsistencies without impacting active non-dirty dataset data.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4823)
