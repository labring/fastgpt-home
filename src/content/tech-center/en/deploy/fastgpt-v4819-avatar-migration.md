---
title: Migrate User Avatars for FastGPT v4819 Upgrade
slug: /en/deploy/fastgpt-v4819-avatar-migration
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4819
source_type: 官方文档
---

# Migrate User Avatars for FastGPT v4819 Upgrade

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Migration Script Overview
This command-line utility is a required step in the FastGPT v4819 self-hosted upgrade workflow. Its sole function is to transfer stored user avatar data from the primary user database table to the dedicated member database table, aligning the database schema for the updated FastGPT release. No additional database modifications or system changes are performed by this script.

## Required Configuration Values
Two mandatory placeholder values must be replaced before executing the migration command:
1.  `{{rootkey}}`: The administrative root authentication key, retrieved directly from your FastGPT environment variables. This key grants authorized access to the migration API endpoint.
2.  `{{host}}`: Your fully qualified FastGPT domain name, including the HTTPS protocol (for example, `https://your-fastgpt-instance.com`). This value targets the correct API endpoint for the migration process.

## Execute the Migration Command
Run the following curl request from any terminal with network access to your deployed FastGPT instance. Substitute the placeholder values with your actual configuration details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4819' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
After submitting the request, the migration process will run automatically without requiring additional user input. The script will complete the transfer of all existing user avatar records from the user table to the member table, ensuring the database structure matches the requirements of the FastGPT v4819 release.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4819)
