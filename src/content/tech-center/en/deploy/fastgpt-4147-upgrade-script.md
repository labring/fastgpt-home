---
title: Execute Self-Hosted FastGPT 4.14.7 Upgrade Script
slug: /en/deploy/fastgpt-4147-upgrade-script
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147
source_type: Official documentation
---

# Execute Self-Hosted FastGPT 4.14.7 Upgrade Script

## Upgrade Script Purpose
This section covers the mandatory administrative HTTP request step for the FastGPT 4.14.7 self-hosted upgrade. When executed successfully, this script adds chat log records containing errors to the FastGPT statistics table, enabling complete error tracking functionality for deployed chat sessions. This step is a required post-deployment action to finalize the 4.14.7 upgrade.

## Required Configuration Values
Two dynamic placeholders must be replaced with your environment-specific values before running the command:
1.  `{{rootkey}}`: The root authentication key retrieved from your FastGPT environment variables. This header validates that the request originates from an authorized administrative source.
2.  `{{host}}`: Your fully qualified FastGPT domain name, including the HTTPS protocol (e.g., `https://your-fastgpt-domain.com`). Do not append a trailing slash to the domain value.

## Step-by-Step Command Execution
Follow these exact steps to run the upgrade script:
1.  Launch a terminal session on any machine with network connectivity to your FastGPT domain.
2.  Substitute the placeholders in the official curl command with your actual `rootkey` and `host` values:
    ```bash
    curl --location --request POST 'https://{{host}}/api/admin/initv4147' \
    --header 'rootkey: {{rootkey}}' \
    --header 'Content-Type: application/json'
    ```
3.  Paste the modified command into your terminal and press Enter to send the request. The POST request targets the FastGPT administrative initialization endpoint for version 4.14.7, triggering the automated update of the statistics table with error-containing chat log records.

## Post-Execution Behavior
After a successful request, the FastGPT platform will populate the statistics table with all relevant error-containing chat session logs. This ensures administrative users have access to complete error data for troubleshooting and monitoring. No additional configuration steps are required beyond running the modified command.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
