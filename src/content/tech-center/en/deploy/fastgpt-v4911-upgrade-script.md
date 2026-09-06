---
title: Run the Official FastGPT v4911 Upgrade Script
slug: /en/deploy/fastgpt-v4911-upgrade-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4911
source_type: 官方文档
---

# Run the Official FastGPT v4911 Upgrade Script

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

**Prerequisites**
This upgrade script is exclusively available for FastGPT Pro edition users. Before executing the script, you must retrieve two required values from your FastGPT deployment environment: the rootkey value stored in your environment variables, and the public domain name (host) for your FastGPT instance.

**Execute the Upgrade Script**
The upgrade script is triggered via an authenticated HTTP POST request, which can be run from any standard terminal session. Use the following formatted curl command, substituting the placeholder values with your deployment’s specific details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4911' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Before running the command, replace:
- `{{rootkey}}`: The rootkey value configured in your FastGPT environment variables, used to authenticate the admin-level API request.
- `{{host}}`: Your FastGPT deployment’s public domain name, which directs the request to the correct instance endpoint.
The `--location` flag included in the command automatically follows any HTTP redirects that may be encountered during the request, ensuring the script triggers successfully. The `rootkey` header validates administrative access, while the `Content-Type` header specifies the required JSON format for the API endpoint.

**Script Functional Capabilities**
The upgrade script performs one core migration function: migrating third-party Dataset API configurations. This task updates existing third-party dataset integrations to align with the v4911 version of FastGPT, streamlining the upgrade process for Pro edition users by removing the need for manual reconfiguration of these integrations.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4911)
