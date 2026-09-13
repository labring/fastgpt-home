---
title: Migrate User-Bound OpenAI Accounts for FastGPT v4817
slug: /en/deploy/fastgpt-v4817-openai-account-migration
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4817
source_type: 官方文档
---

# Migrate User-Bound OpenAI Accounts for FastGPT v4817

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Migration Script Purpose
This administrative script is a required step in the FastGPT v4817 self-hosted upgrade process. It transfers ownership and access of OpenAI accounts previously bound to individual user accounts to team-level permissions, updating the deployment's account structure to match the team-based access model introduced in this release. No additional configuration files or local file modifications are needed to run this migration.

## Required Parameters
Two dynamic placeholders must be replaced before executing the script:
- `{{rootkey}}`: The elevated administrator key configured in your FastGPT deployment's environment variables. This key is required to authenticate administrative API requests and run migration workflows.
- `{{host}}`: The full public domain or base URL of your FastGPT instance, including the HTTPS protocol (e.g., `https://fastgpt.example.com`). This ensures the API request is routed to the correct deployment endpoint.

## Step-by-Step Execution
First, ensure you have access to a terminal with the `curl` utility installed. Follow these exact steps to run the migration:
1. Retrieve the `rootkey` value from your FastGPT deployment's environment variables. Do not share this key publicly, as it grants full administrative access to your FastGPT instance.
2. Confirm your FastGPT domain to use as the `{{host}}` placeholder value.
3. Run the following curl command in your terminal, replacing both placeholder values with your actual configuration details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4817' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
This command sends a properly authenticated POST request to the FastGPT administrative migration endpoint. The request uses the `rootkey` header for authentication and sets the `Content-Type` header to ensure the API accepts the JSON-formatted request body, even though no additional payload data is required for this specific migration.

## Post-Execution Confirmation
Once the command is executed successfully, the migration of user-bound OpenAI accounts to team-level permissions will complete automatically. No additional manual steps are required to finalize the migration, as the script handles all necessary data transfers within your FastGPT deployment.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4817)
