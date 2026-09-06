---
title: Run the FastGPT v4.8.1 Initialization Script
slug: /en/deploy/fastgpt-v481-initialization-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/481
source_type: 官方文档
---

# Run the FastGPT v4.8.1 Initialization Script

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This page details the execution of the FastGPT v4.8.1 initialization script, a utility for resolving prior inconsistencies in database collection names for self-hosted FastGPT deployments. The script targets the `/api/admin/initv481` endpoint to reset table names and align the database structure with current requirements.

## Prerequisites
Complete all the following checks before running the initialization script:
1. Access to a terminal with the `curl` tool installed.
2. Retrieval of the `rootkey` value from your FastGPT deployment’s environment variables.
3. Knowledge of your FastGPT domain host URL, including the HTTPS protocol.
4. Verification that the `dataset.trainings` database table contains no existing data.
5. Pause all active FastGPT platform operations to prevent data conflicts during initialization.

## Execution Command
To trigger the initialization workflow, send a POST HTTP request using the following curl command. Replace the placeholder values with your deployment’s specific details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv481' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
### Command Component Breakdown
- The `--location` flag ensures the request follows any server-issued redirects.
- The request targets the v4.8.1 admin initialization endpoint `/api/admin/initv481`.
- The `rootkey` header authenticates the request using your deployment’s secure admin key.
- The `Content-Type` header specifies the request uses JSON format, as required by the endpoint.

## Critical Usage Guidelines
This initialization process resets database table names to resolve prior collection name inconsistencies. It does not handle existing data in the `dataset.trainings` table, so failing to clear this table prior to execution may cause unintended data loss or deployment errors. Pausing active operations ensures no concurrent database modifications interfere with the initialization workflow, preserving data integrity.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/481)
