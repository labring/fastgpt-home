---
title: Run FastGPT v4.8.18 Full-Text Migration Script
slug: /en/deploy/fastgpt-v4818-fulltext-migration-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4818
source_type: 官方文档
---

# Run FastGPT v4.8.18 Full-Text Migration Script

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Migration Script Overview
This document details the mandatory full-text search table migration step for self-hosted FastGPT deployments upgrading to version 4.8.18. This workflow updates underlying database tables to support updated full-text search functionality introduced in this release, and is a required component of the official upgrade process.

## Required Prerequisites
Before running the migration script, confirm you have the following ready:
1. A terminal with access to the `curl` command-line utility.
2. Your official FastGPT domain hostname, which will replace the `{{host}}` placeholder in the migration command.
3. The `rootkey` environment variable value assigned to your FastGPT instance, used for authenticated administrative API requests.

## Execute the Migration Command
Run the following exact curl command from any accessible terminal, replacing the placeholder values with your instance's specific details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4818' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Each placeholder serves a specific purpose:
- `{{host}}`: Replace with your FastGPT domain (e.g., `https://my-fastgpt.example.com`).
- `{{rootkey}}`: Replace with the value of your instance's rootkey environment variable.
The command sends an authenticated administrative POST request to the FastGPT backend to trigger the migration workflow.

## Monitor Migration Progress
The migration process will take a measurable amount of time, with the exact duration dependent on the size of your deployed dataset. During the migration, full-text search capabilities for your FastGPT instance will be temporarily unavailable. Real-time progress updates will print to the terminal during execution, showing the total volume of data that has been successfully migrated at each interval. Once the migration finishes, the API request will return a final confirmation response indicating successful completion.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4818)
