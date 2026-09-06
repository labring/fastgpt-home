---
title: Run FastGPT v4.12.0 Commercial Migration Script
slug: /en/deploy/fastgpt-commercial-4120-migration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4120
source_type: Official documentation
---

# Run FastGPT v4.12.0 Commercial Migration Script

## Eligible Users for the Migration Script
This migration script is exclusively required for FastGPT commercial edition users. Non-commercial FastGPT deployments do not need to execute this command when upgrading to version 4.12.0, as the changes targeted by the script do not apply to their deployment configuration.

## Execute the Migration Command
To run the migration, send a properly formatted HTTP POST request from any terminal with network access to your FastGPT domain. Use the standardized curl command below, substituting the placeholder values with your deployment’s specific details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4120' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Two placeholders must be updated before running the command:
1.  Replace `{{rootkey}}` with the value of the `rootkey` environment variable configured for your FastGPT instance. This key grants administrative access required to run the migration script.
2.  Replace `{{host}}` with your public FastGPT domain name, which is the base URL used to access your FastGPT deployment.

## Script Core Functionality
The migration script completes a single critical post-upgrade setup task: initializing chat log permissions for team members. This process updates the access control settings for existing chat logs to match the v4.12.0 permission model, ensuring that all team members have the correct level of access to chat logs based on their assigned workspace roles. Without running this script, team members may experience unexpected permission errors when accessing pre-upgrade chat logs.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4120)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
