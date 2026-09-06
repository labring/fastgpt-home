---
title: Run the FastGPT 4820 Configuration Migration Script
slug: /en/deploy/fastgpt-4820-migration-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4820
source_type: 官方文档
---

# Run the FastGPT 4820 Configuration Migration Script

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Migration Script Purpose
This one-time administrative script is part of the self-hosted FastGPT 4820 upgrade workflow. Its sole function is to migrate legacy model configurations from your existing deployment to the updated model configuration system introduced in version 4820. No manual model reconfiguration is needed after running this script.

## Required Configuration Values
Before executing the script, you must retrieve two critical values from your FastGPT environment and deployment:
1. **rootkey**: The administrative root key defined in your FastGPT environment variables. This grants elevated access to run the initialization endpoint.
2. **{{host}}**: Your fully qualified FastGPT domain name, including the HTTPS protocol (e.g., `https://my-fastgpt-instance.com`).

## Step-by-Step Execution
To run the migration script, send the following HTTP POST request from any terminal with network access to your FastGPT instance:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4820' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Replace the `{{host}}` and `{{rootkey}}` placeholders with your actual domain and root key values. The `--location` flag ensures the request follows any necessary HTTP redirects to reach the admin initialization endpoint. The included headers specify the required authentication key and JSON content type for the request.

## Script Outcome
Upon successful delivery of the request to your FastGPT server, the script will automatically load all model configurations stored in your legacy configuration file into the new standardized model configuration format. This completes the model configuration migration step of the 4820 upgrade without additional manual intervention.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4820)
