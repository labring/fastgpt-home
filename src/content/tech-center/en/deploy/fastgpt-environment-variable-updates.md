---
title: Update FastGPT Environment Variables for 4.14.9
slug: /en/deploy/fastgpt-environment-variable-updates
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4149
source_type: Official documentation
---

# Update FastGPT Environment Variables for 4.14.9

# Environment Variable Update Overview
This document outlines required configuration changes for self-hosted FastGPT deployments upgrading to version 4.14.9, focusing on environment variable adjustments and a new security control toggle. All changes are derived from the official 4.14.9 upgrade documentation.

# Renamed Sandbox Service Environment Variables
Two environment variables tied to the FastGPT code sandbox service have been renamed to standardize naming across the platform. Deployments must update these variables to avoid service disruptions. The following table and example configuration show the legacy and updated formats:

| Legacy Environment Variable | Updated Environment Variable | Additional Notes |
|------------------------------|-----------------------------|------------------|
| `SANDBOX_URL`                | `CODE_SANDBOX_URL`          | Code sandbox service network address |
| `SANDBOX_TOKEN`              | `CODE_SANDBOX_TOKEN`        | Previously allowed an empty value, as sandbox authentication was added in 4.14.8. Requires a valid credential in the 4.14.9 update. |

A sample of the updated environment configuration is shown below:
```bash
# 4.14.9+ Configuration
CODE_SANDBOX_URL=<your-code-sandbox-address>
CODE_SANDBOX_TOKEN=<your-code-sandbox-credential>
```

For reference, the legacy pre-4.14.9 configuration was:
```bash
# Pre-4.14.9 Configuration
SANDBOX_URL=<your-code-sandbox-address>
SANDBOX_TOKEN=<your-code-sandbox-credential>
```

# Internal Network Security Check Toggle
As of 4.14.9, internal network IP security checks are disabled by default for all FastGPT services. This change reduces unnecessary validation overhead for most deployments. If your organization requires this security control to restrict access to internal IP ranges, you can re-enable it by setting the `CHECK_INTERNAL_IP` environment variable to `true`. This configuration applies to the following FastGPT services:
- fastgpt
- fastgpt-pro
- fastgpt-sandbox

An example of adding this toggle to your environment file is:
```bash
CHECK_INTERNAL_IP=true
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4149)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
