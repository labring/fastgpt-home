---
title: Run the FastGPT 4.14.1 Upgrade Script
slug: /en/deploy/fastgpt-4141-upgrade-script
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4141
source_type: Official documentation
---

# Run the FastGPT 4.14.1 Upgrade Script

# Upgrade Script Execution Overview
This document covers the official process for running the FastGPT 4.14.1 upgrade script, a required step in the self-hosted FastGPT upgrade workflow. This script creates a copy of your original application directory for safe, tool-assisted upgrade operations, and must be executed from a terminal with network access to your FastGPT deployment.

# Required Configuration Parameters
Two mandatory values are needed to run the upgrade script:
1.  `{{rootkey}}`: The rootkey value from your FastGPT environment variables. This header authenticates administrative access to the upgrade endpoint.
2.  `{{host}}`: Your fully qualified FastGPT domain name, including the HTTPS protocol scheme (e.g., `https://your-fastgpt-domain.com`). This specifies the target URL for the upgrade request.

# Step-by-Step Command Execution
Follow these precise steps to execute the upgrade script:
1.  Open a terminal session on any machine with network connectivity to your FastGPT domain.
2.  Use the following curl command template, replacing the placeholder values with your collected configuration data:
    ```bash
    curl --location --request POST 'https://{{host}}/api/admin/initv4141' \
    --header 'rootkey: {{rootkey}}' \
    --header 'Content-Type: application/json'
    ```
3.  Paste the modified command into your terminal and press Enter to send the request.
No request body is required for this endpoint, as defined in the official template.

# Post-Execution Result
After the command runs successfully, the FastGPT system will generate a complete copy of your original application directory. This copy is reserved for use during the remainder of the upgrade process to protect your existing deployment data.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4141)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
