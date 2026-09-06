---
title: Execute FastGPT v4.12.1 Commercial Migration Script
slug: /en/deploy/fastgpt-v4121-migration-script
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4121
source_type: Official documentation
---

# Execute FastGPT v4.12.1 Commercial Migration Script

## Eligibility & Prerequisites
This migration script is exclusively intended for FastGPT commercial edition users upgrading to version 4.12.1. Non-commercial self-hosted FastGPT deployments do not require running this script. The script must be executed from a terminal with outbound network access to your deployed FastGPT instance’s public domain.

## Required Parameters
Two dynamic placeholder values must be replaced with your actual FastGPT configuration details before running the script:
- `{{rootkey}}`: The admin-level rootkey value stored in your FastGPT environment variables, used to authenticate administrative API requests.
- `{{host}}`: Your fully qualified FastGPT domain, including the HTTPS protocol (e.g., `https://your-fastgpt-domain.com`).

## Step-by-Step Execution
Run the following exact curl command in your terminal, substituting the placeholder values with your actual configuration data:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4121' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
No additional command-line flags or arguments are necessary for this script. The POST request targets the official FastGPT 4.12.1 admin migration endpoint, and includes two mandatory HTTP headers for authentication and content type specification.

## Script Functionality
The sole purpose of this migration script is to migrate existing historical chat logs into the new log dashboard format introduced with FastGPT 4.12.1. No other database modifications, user data alterations, or system configuration changes are performed during script execution. Upon successful completion, your historical chat data will be accessible through the updated FastGPT log dashboard interface.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4121)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
