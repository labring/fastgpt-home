---
title: Perform FastGPT 4811 Commercial Edition Initialization
slug: /en/deploy/fastgpt-4811-commercial-initialization
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4811
source_type: 官方文档
---

# Perform FastGPT 4811 Commercial Edition Initialization

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Purpose of FastGPT 4811 Commercial Edition Initialization
This procedure is a mandatory post-upgrade task exclusively for self-hosted FastGPT commercial edition version 4811. Its sole function is to initialize team member permission groups within your FastGPT deployment. No custom configuration data is required beyond the authenticated API request, as the endpoint handles all necessary group setup automatically.

## Required Authentication and Endpoint Details
To send a valid initialization request, you must replace two placeholders with values from your deployment environment, and include two fixed HTTP headers. The following table outlines all required components:
| Placeholder/Header | Required Value Source |
|---------------------|------------------------|
| `{{host}}` | Your public FastGPT domain name, used to access your self-hosted instance |
| `{{rootkey}}` | Admin root key configured in your FastGPT environment variables |
| `rootkey` HTTP header | Exact value of the environment-defined `rootkey` for authentication |
| `Content-Type` HTTP header | Fixed value: `application/json` |

## Step-by-Step Execution
1. Open any terminal with the curl command-line tool installed.
2. Replace `{{host}}` in the target URL `https://{{host}}/api/admin/init/4811` with your FastGPT public domain.
3. Replace `{{rootkey}}` in the `rootkey` header with your environment’s admin root key.
4. Run the modified curl command:
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/4811' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
5. Validate completion: A successful request will finalize the initialization of team member groups for your FastGPT commercial deployment. No default success message is returned by default; confirm setup by reviewing your FastGPT team group configurations. If the request fails, an error response will be returned to the terminal.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4811)
