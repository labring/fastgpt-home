---
title: Run FastGPT v451 Initialization API
slug: /en/deploy/fastgpt-v451-initialization-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/451
source_type: 官方文档
---

# Run FastGPT v451 Initialization API

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## About the FastGPT v451 Initialization API
This endpoint supports schema migration and data setup for self-hosted FastGPT deployments upgrading to the v451 release. It aligns existing database structures with the v451 requirements without external dependencies beyond your existing deployment environment.

## Step-by-Step Execution
To run the initialization API, submit an authenticated HTTP POST request using the following configuration:
1. Retrieve two required values first:
   - `{{host}}`: Your FastGPT deployment's public domain name
   - `{{rootkey}}`: The rootkey value from your deployment's environment variables
2. Use the official curl command to send the request, substituting the placeholders above:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv451' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
The request targets the fixed path `/api/admin/initv451` and requires both specified headers for authentication and proper content formatting.

## Core Functional Changes
The initialization endpoint performs three targeted updates to your database environment:
1. Renames existing database fields to conform to the v451 schema standards
2. Initializes Dataset-related fields within the MongoDB APP collection
3. Configures PostgreSQL and MongoDB content storage: creates a dedicated MongoDB collection for each uploaded file, then assigns the correct reference back to the PostgreSQL database.

## Performance and Troubleshooting
This initialization endpoint may run slowly due to the scale of database migrations and content setup required. If the HTTP request times out before the process completes, do not stop your FastGPT service or re-run the endpoint immediately. Instead, review your FastGPT service logs to verify whether the initialization process finished successfully, as the timeout only affects the client-side request tracking, not the backend execution.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/451)
