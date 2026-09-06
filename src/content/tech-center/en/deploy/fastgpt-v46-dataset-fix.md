---
title: Fix V4.6 Dataset Import Display Failure
slug: /en/deploy/fastgpt-v46-dataset-fix
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/46
source_type: 官方文档
---

# Fix V4.6 Dataset Import Display Failure

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## V4.6 Dataset Import Bug Overview
The initial release of FastGPT V4.6 contained an unintended missing database field. This isolated defect prevented uploaded file dataset data from displaying in the FastGPT interface immediately after import operations. No other core FastGPT platform functionality was impacted by this specific bug.

## Official Fix Endpoint Specifications
A dedicated administrative API endpoint is provided to resolve this V4.6 dataset import defect. The endpoint URL follows the format `https://{{host}}/api/admin/initv46-fix`, where `{{host}}` represents the fully qualified domain name or IP address of your self-hosted FastGPT deployment. Two mandatory HTTP headers are required to authenticate and properly format the fix request:
- `rootkey: {{rootkey}}`: The root-level administrator key configured for your FastGPT instance, which grants authorization to run administrative fix scripts.
- `Content-Type: application/json`: Ensures the FastGPT backend correctly parses the POST request, even though no request body is submitted alongside the fix command.

## Step-by-Step Fix Execution
To apply the dataset import fix safely and correctly, follow these structured steps using only official parameters:
1.  Retrieve your FastGPT instance's root administrator key (`{{rootkey}}`) and your instance's host URL (`{{host}}`).
2.  Execute the following `curl` command in a terminal environment with network access to your FastGPT instance:
    ```bash
    curl --location --request POST 'https://{{host}}/api/admin/initv46-fix' \
    --header 'rootkey: {{rootkey}}' \
    --header 'Content-Type: application/json'
    ```
3.  Wait for the terminal output to confirm a successful API response. A successful execution restores the missing database field, resolving the dataset display failure for file imports. No additional service restarts or post-processing steps are required after a successful fix run.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/46)
