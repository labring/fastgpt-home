---
title: Initialize FastGPT dataset.files collection via API
slug: /en/deploy/fastgpt-dataset-initialization-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/441
source_type: 官方文档
---

# Initialize FastGPT dataset.files collection via API

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Purpose of the Initialization API
This API endpoint supports the FastGPT self-hosted upgrade workflow for version 441. Its dedicated function is to initialize the `dataset.files` collection in your MongoDB database. Upon successful execution, all existing file-based dataset data will be marked as available for use within your FastGPT instance. This step ensures that file-related dataset records are properly configured after completing prior upgrade steps.

## Required Headers and Configuration
Before sending the initialization request, you must gather two critical authentication and formatting details, and set the correct request headers. The following table outlines all mandatory request components:
| Header Name          | Mandatory Status | Details |
|----------------------|------------------|---------|
| `rootkey`            | Required         | The value is sourced directly from your self-hosted FastGPT environment variables. This key authenticates the administrative initialization request. |
| `Content-Type`       | Required         | Must be explicitly set to `application/json` to ensure the FastGPT API correctly parses the incoming request. |
The request uses the `POST` HTTP method, with the target endpoint URL formatted as `https://{{host}}/api/admin/initv441`. Replace `{{host}}` with the domain name or IP address of your deployed FastGPT instance, including any custom port if required.

## Execute the Initialization Request
To run the API call, use the following exact curl command, substituting the placeholders with your actual environment values:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv441' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Before executing the command, confirm that your terminal has network access to your FastGPT instance’s public or internal endpoint. Replace `{{host}}` with your instance’s base URL (e.g., `https://fastgpt.yourcompany.com` or `http://192.168.0.5:3000` for local deployments). Replace `{{rootkey}}` with the exact value retrieved from your FastGPT environment variables. No additional request body data is needed for this endpoint. Once the command is processed, the FastGPT backend will complete the initialization of the `dataset.files` collection.
> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/441)
