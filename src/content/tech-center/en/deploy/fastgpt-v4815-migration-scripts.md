---
title: Run Required FastGPT v4815 Post-Upgrade Migration Scripts
slug: /en/deploy/fastgpt-v4815-migration-scripts
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4815
source_type: 官方文档
---

# Run Required FastGPT v4815 Post-Upgrade Migration Scripts

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Migration Script Purpose
This page covers two official post-upgrade migration scripts for FastGPT v4815, designed to resolve specific data consistency and metric calculation issues introduced by prior version deployments. The first script optimizes database index size, while the second corrects inaccurate free-tier user usage notifications. No core application data is altered beyond targeted cleanup and recalculation.

## Required Parameters
All migration API requests use two mandatory placeholders that must be replaced with your deployment’s specific configuration:
| Placeholder | Description | Required Replacement |
|-------------|-------------|----------------------|
| `{{rootkey}}` | Admin-level authentication key | Value stored in your FastGPT environment variables |
| `{{host}}` | Public domain for your FastGPT deployment | Your FastGPT domain (used to route API traffic) |

## Step-by-Step Script Execution
Run each script from any terminal with network access to your FastGPT domain. Both scripts use identical authentication headers, with only the API endpoint differing.

### First Script: App Scheduled Execution Cleanup
This script resets scheduled execution fields for all FastGPT applications, removing null values to reduce database index size. Execute the following command, replacing placeholders as noted:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4815' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

### Second Script: Free-Tier User Duration Recalculation
A prior FastGPT version upgrade failed to properly recalculate free-tier user usage durations, leading to incorrect usage notifications. This script resets and recalculates accurate free-tier user time metrics. Execute the following command with replaced placeholders:
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/refreshFreeUser' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4815)
