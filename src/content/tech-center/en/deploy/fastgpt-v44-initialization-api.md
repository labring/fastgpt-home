---
title: Run the FastGPT v44 Initialization API
slug: /en/deploy/fastgpt-v44-initialization-api
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/44
source_type: 官方文档
---

# Run the FastGPT v44 Initialization API

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Initialization API Overview
This dedicated HTTP POST endpoint is used to initialize required database fields within MongoDB for FastGPT v44 self-hosted deployments. The request does not include a request payload, and relies on a single authentication header to validate access. Successful execution of this API will populate the necessary missing or updated fields to ensure your FastGPT instance operates correctly after upgrade or initial setup.

## Mandatory Request Specifications
To send a valid initialization request, you must adhere to the following fixed formatting rules:
- HTTP Request Method: POST
- Full Endpoint URL: `https://{{host}}/api/admin/initv44`, where `{{host}}` is replaced with your FastGPT deployment’s public domain name or IP address.
- Required Headers:
  1. `rootkey`: A string value extracted directly from your deployment’s environment variables. This header serves as the authentication credential for the initialization API.
  2. `Content-Type`: Must be explicitly set to `application/json` to ensure the server correctly parses the request.

## Step-by-Step Execution
Follow these exact steps to run the initialization API:
1. Retrieve your `rootkey` value from the environment variables configured for your FastGPT deployment.
2. Replace the `{{host}}` placeholder in the endpoint URL with your instance’s actual host address.
3. Replace the `{{rootkey}}` placeholder in the curl command’s header with the retrieved environment variable value.
4. Execute the finalized curl command in a terminal or command prompt on a machine with network access to your FastGPT instance.

The exact pre-formatted curl command is as follows:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv44' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Upon successful execution, the API will update the required MongoDB fields for your FastGPT v44 instance. No additional success message is specified in the official documentation, but the request will fail if the provided `rootkey` does not match the environment variable value, or if the endpoint is unreachable.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/44)
