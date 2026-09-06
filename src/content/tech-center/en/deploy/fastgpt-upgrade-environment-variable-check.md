---
title: Validate Required Environment Variables for FastGPT Upgrade
slug: /en/deploy/fastgpt-upgrade-environment-variable-check
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41501
source_type: Official documentation
---

# Validate Required Environment Variables for FastGPT Upgrade

FastGPT version 4.15 introduces stricter environment variable validation for the fastgpt-app and fastgpt-pro self-hosted services. Prior to completing this upgrade, you must confirm that your existing configuration meets the new validation rules to avoid deployment failures or runtime operational errors. This documentation covers the mandatory environment variables, their official requirements, and a repeatable validation workflow.

### Mandatory Environment Variables
Three environment variables are now required for both fastgpt-app and fastgpt-pro services, with specific cross-service consistency rules. The following table outlines each variable, its purpose, and mandatory requirements:

| Variable Name               | Purpose                                                                 | Requirements                                                                 |
|------------------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `AES256_SECRET_KEY`          | Core encryption key for secured data handling                           | Must match between fastgpt-app and fastgpt-pro services                     |
| `FILE_TOKEN_KEY`             | Token key for secure file transfer and access validation                | Must match between fastgpt-app and fastgpt-pro services                     |
| `INVOKE_TOKEN_SECRET`        | JWT secret used for authenticated reverse service invocation            | Minimum 32 characters in length; must match between both services            |

A sample dotenv configuration block for these variables is provided below:
```dotenv
# Encryption key. Must match across both services.
AES256_SECRET_KEY=
# File token key. Must match across both services.
FILE_TOKEN_KEY=
# JWT secret for reverse invocation. Must be at least 32 characters and match across both services.
INVOKE_TOKEN_SECRET=
```

### Step-by-Step Validation Workflow
Follow this structured process to confirm your configuration meets the 4.15 upgrade requirements:
1.  Locate the active .env configuration files for both the fastgpt-app and fastgpt-pro services.
2.  Verify that all three mandatory variables are present and have non-empty values in both files.
3.  Compare the `AES256_SECRET_KEY` and `FILE_TOKEN_KEY` values between the two service configurations to ensure they are identical.
4.  Check that the `INVOKE_TOKEN_SECRET` value is at least 32 characters long, then confirm it matches across both service files.
5.  Resolve any identified discrepancies, such as missing values, mismatched keys, or insufficiently short secrets, before proceeding with the upgrade.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41501)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
