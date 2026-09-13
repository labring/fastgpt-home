---
title: Run FastGPT 4.8.5 Upgrade Initialization Commands
slug: /en/deploy/fastgpt-485-upgrade-initialization
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/485
source_type: 官方文档
---

# Run FastGPT 4.8.5 Upgrade Initialization Commands

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This page details the required initialization steps for self-hosted FastGPT deployments upgrading to version 4.8.5. These commands apply critical database and permission system updates to ensure compatibility with the 4.8.5 release, and must be executed from a terminal with network access to your FastGPT domain.

## Mandatory General Initialization
All self-hosted FastGPT users must run this initialization step. It merges data from the plugin data table into the application table, and the original plugin table is not deleted after successful execution. Replace the following placeholders in the provided command:
- `{{rootkey}}`: The rootkey value from your FastGPT environment variables
- `{{host}}`: Your public FastGPT domain name

The exact command to run is:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv485' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## Commercial Edition Additional Initialization
Commercial edition FastGPT users must execute a second initialization step to reset the Dataset permission system. Community edition users do not need to run this command. Use the same placeholder replacements as the general initialization step. The exact command is:
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/485' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## Key Behavioral Notes
1. The mandatory general initialization preserves the original plugin data table, no existing plugin data is deleted during the merge.
2. The commercial edition initialization only modifies the Dataset permission system, with no unintended changes to application or plugin data.
3. Both commands require valid authentication using the rootkey from your environment variables.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/485)
