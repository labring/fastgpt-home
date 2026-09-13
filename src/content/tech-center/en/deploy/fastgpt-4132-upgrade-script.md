---
title: Run the FastGPT 4.13.2 Upgrade Script
slug: /en/deploy/fastgpt-4132-upgrade-script
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4132
source_type: Official documentation
---

# Run the FastGPT 4.13.2 Upgrade Script

## Upgrade Script Execution Overview
This section covers the official HTTP-based upgrade script step for FastGPT 4.13.2 self-hosted deployments. The script performs a targeted storage policy cleanup as part of the version upgrade workflow, removing the prior S3 circleLife policy from your deployment’s storage configuration.

## Step-by-Step Script Execution
You can execute this upgrade script from any terminal with network access to your FastGPT domain. Follow these concrete steps:
1. Retrieve two required values from your FastGPT deployment environment:
   - `{{rootkey}}`: The rootkey environment variable configured for your FastGPT instance
   - `{{host}}`: Your FastGPT domain name
2. Substitute the placeholders in the official curl command with your actual values. The full authenticated POST command is:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4132' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
This command sends a validated admin request to the FastGPT dedicated 4.13.2 upgrade API endpoint. The `rootkey` header authenticates the administrative request, while the `Content-Type` header ensures the request is properly formatted for the JSON API endpoint.

## Error Handling Guidelines
The upgrade script attempts to remove the existing S3 circleLife policy during execution. If your deployment uses an external S3 service that does not support circleLife operations, the script may return an error. Per official documentation, this error is safe to disregard: the intended policy update would have already failed in this unsupported environment, so no additional corrective action is required.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4132)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
