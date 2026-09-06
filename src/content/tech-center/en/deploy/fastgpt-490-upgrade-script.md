---
title: Run the FastGPT 4.90 Upgrade Script
slug: /en/deploy/fastgpt-490-upgrade-script
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490
source_type: 官方文档
---

# Run the FastGPT 4.90 Upgrade Script

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Upgrade Script Overview
This documentation covers executing the official FastGPT 4.90 upgrade script, which automates critical database maintenance and schema updates for your self-hosted FastGPT deployment. The script is designed to streamline the transition to FastGPT 4.90 by handling targeted database changes without manual intervention.

## Prerequisite Configuration
Two required values are needed to run the script, both sourced from your existing FastGPT environment:
1.  `rootkey`: The root administrator key defined in your FastGPT environment variables. This key grants elevated access to run administrative database updates.
2.  `host`: Your public FastGPT domain name, which maps to your deployed instance. Do not include additional path segments or protocol prefixes beyond what is required for the API endpoint.

## Step-by-Step Execution
Run the following HTTP POST request via curl from any terminal that has network access to your FastGPT domain:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv490' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Substitute `{{host}}` with your FastGPT’s public domain, and replace `{{rootkey}}` with the root key value from your environment variables. Ensure the terminal session remains connected until the script completes its initial execution cycle.

## Script Execution Details & Notes
The upgrade script performs three specific database updates:
1.  Upgrades the installed PG Vector extension version to match FastGPT 4.90 requirements
2.  Updates all Dataset collection fields to align with the new 4.90 data schema
3.  Modifies the `type` field across all Dataset data entries. This final update may take an extended period to process fully.
You may observe a timeout error message at the conclusion of the script’s initial run. This timeout does not indicate failure of the ongoing update process: the database changes will continue incrementally so long as your FastGPT database remains active and connected. No further user action is required after running the initial command beyond monitoring your database performance if needed.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490)
