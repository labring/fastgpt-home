---
title: Execute FastGPT v4.14.51 Admin Upgrade Script
slug: /en/deploy/fastgpt-41451-upgrade-script
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41451
source_type: Official documentation
---

# Execute FastGPT v4.14.51 Admin Upgrade Script

## Upgrade Initialization Overview
This document covers the administrative initialization step for FastGPT version 4.14.51. This targeted script performs one core operational task: migrating system secret key configurations for integrated system tools. No additional configuration changes are handled by this specific initialization endpoint.

## Required Configuration Values
Before running the script, you must prepare two required values to substitute into the command:
1.  `{{host}}`: Your fully qualified FastGPT domain, used to build the target API endpoint. This must include the protocol (e.g., `https://your-fastgpt-instance.com`).
2.  `{{rootkey}}`: The root administrator secret key retrieved directly from your FastGPT environment variables. This key authenticates requests to the administrative initialization endpoint.

## Step-by-Step Execution Command
From any terminal with an available HTTP client (such as curl), run the modified POST request after replacing the placeholder values. The exact base command is:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv41451' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Substitute `{{host}}` with your FastGPT domain, and `{{rootkey}}` with your environment’s root key value. The `--location` flag ensures any server-side redirects are automatically followed, the `rootkey` header authenticates the administrative request, and the `Content-Type` header specifies the JSON request format required by the endpoint.

## Expected Execution Outcome
Upon successful completion of the request, the script finalizes the migration of system secret key configurations for all integrated system tools. No additional manual steps are required for this specific initialization process.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41451)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
