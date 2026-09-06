---
title: Run Required FastGPT v46 Initialization APIs
slug: /en/deploy/fastgpt-v46-initialization-apis
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/46
source_type: 官方文档
---

# Run Required FastGPT v46 Initialization APIs

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## About FastGPT v46 Initialization
This documentation covers the official initialization APIs required to prepare a self-hosted FastGPT instance for the v46 release. These two sequential API calls perform four critical setup tasks: creating the default team, initializing team fields for all MongoDB resources, initializing PostgreSQL fields, and initializing core MongoDB data. Two critical operational notes apply to these endpoints: first, they may take significant time to complete; if a request times out, do not assume the process failed—instead, check your FastGPT service logs to verify progress. Second, you must complete the initv46 endpoint successfully before initiating the initv46-2 endpoint; skipping this order will result in incomplete initialization.

## Required Parameters
Before sending the initialization requests, you must replace two placeholders in all API commands:
- `{{rootkey}}`: The rootkey value configured in your FastGPT environment variables. This credential grants administrative access to run initialization tasks.
- `{{host}}`: Your self-hosted FastGPT domain name, including the full protocol (e.g., `https://your-fastgpt-domain.com`).

## Step-by-Step Initialization Execution
Follow these exact steps to run the initialization APIs:
1.  First, send a POST request to the initv46 admin endpoint. Use the following curl command, replacing the placeholders as noted:
    ```bash
    curl --location --request POST 'https://{{host}}/api/admin/initv46' \
    --header 'rootkey: {{rootkey}}' \
    --header 'Content-Type: application/json'
    ```
    Wait for this request to fully complete before proceeding to the second step. If the request times out, monitor your service logs instead of retrying immediately.
2.  After confirming the initv46 endpoint ran successfully, send a second POST request to the initv46-2 admin endpoint with this command:
    ```bash
    curl --location --request POST 'https://{{host}}/api/admin/initv46-2' \
    --header 'rootkey: {{rootkey}}' \
    --header 'Content-Type: application/json'
    ```
    Again, monitor service logs if you encounter timeouts, as the initialization process may still complete in the background.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/46)
