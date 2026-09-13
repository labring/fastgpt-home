---
title: Run FastGPT 4.12.4 Commercial Migration Script
slug: /en/deploy/fastgpt-4124-migration-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4124
source_type: 官方文档
---

# Run FastGPT 4.12.4 Commercial Migration Script

## Prerequisites for 4.12.4 Migration Script
This administrative migration script is exclusively required for commercial edition FastGPT users. Non-commercial users do not need to execute this script as part of their upgrade process. To run the script successfully, you must retrieve two specific configuration values from your existing FastGPT deployment: the `rootkey` value from your environment variables, and your public FastGPT domain name (labeled as `{{host}}` in the command syntax). No additional preparation steps are mandated beyond obtaining these two values.

## Migration Script Execution Command
Run the exact HTTP POST request below from any terminal session on a system with network access to your FastGPT domain. Replace the placeholder values precisely as specified:
1. Substitute `{{rootkey}}` with the secret `rootkey` value configured in your FastGPT environment variables.
2. Replace `{{host}}` with your full public FastGPT domain, including the `https://` protocol prefix.

The official command is:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4124' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## Script Functional Capabilities
The migration script performs one targeted administrative update to your FastGPT deployment: it adds owner permissions to all existing resources within your instance. This action aligns resource access controls to meet the updated permission requirements for FastGPT 4.12.4, ensuring that all users and teams retain correct access levels after the upgrade completes. No additional data modifications, configuration changes, or system restarts are triggered by this script beyond the permission update.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4124)
