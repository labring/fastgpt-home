---
title: Run FastGPT 4822 Contact Data Migration
slug: /en/deploy/fastgpt-4822-contact-migration
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4822
source_type: 官方文档
---

# Run FastGPT 4822 Contact Data Migration

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Eligibility Requirements
This migration step is exclusively required for commercial edition FastGPT users who operate a SaaS-based FastGPT deployment. Non-commercial or standard self-hosted FastGPT instances do not need to run this script. The core function of this script is to transfer existing contact information records into the corresponding FastGPT user tables, aligning data structures across the deployment.

## Command Specification
The migration is initiated via a single HTTP POST request, which can be run from any terminal with network access to your FastGPT instance. Two mandatory substitution parameters are required to configure the command correctly:
- `{{rootkey}}`: The secure administrative rootkey value retrieved from your FastGPT deployment’s environment variables. This credential is required to authenticate the migration request.
- `{{host}}`: The public full base URL (domain name) of your FastGPT instance, used to route the request to the migration API endpoint.

The exact, unmodified curl command template is:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4822' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## Step-by-Step Execution
Follow these structured steps to run the migration script without errors:
1. Locate and record the `rootkey` value from your FastGPT environment variables, ensuring you have the correct, unmodified credential.
2. Confirm your FastGPT public domain, verifying it matches the base URL used to access your live FastGPT instance.
3. Open a terminal session on any machine that can send outbound HTTPS requests to your confirmed FastGPT domain.
4. Edit the provided curl command template, replacing `{{rootkey}}` with your recorded rootkey and `{{host}}` with your verified FastGPT domain.
5. Execute the modified command in the terminal. The script will automatically complete the contact data migration without requiring additional user input once initiated.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4822)
