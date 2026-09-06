---
title: Adjust WeCom Login Auto Redirect Settings
slug: /en/deploy/fastgpt-wecom-login-redirect-settings
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151
source_type: Official documentation
---

# Adjust WeCom Login Auto Redirect Settings

## Overview
This document covers configuration of the WeCom login auto redirect behavior for self-hosted FastGPT deployments starting with version 4.15.1, addressing changes to default login flow handling for WeCom terminal users.

## Default Behavior Update
Prior to FastGPT version 4.15.1, the platform automatically redirected WeCom terminal users to the login page by default. This behavior matched explicitly setting the `WECOM_LOGIN_AUTO_REDIRECT` environment variable to `true`. Starting with v4.15.1, this automatic redirect is no longer enabled by default. Users who require the previous automatic login redirect flow will need to manually configure the environment variable to restore the prior behavior.

## Configuration Parameter & Setup
The following environment variable controls the automatic redirect behavior for WeCom terminal sessions:
| Environment Variable Name          | Default Value | Behavior                                                                 |
|-------------------------------------|---------------|---------------------------------------------------------------------------|
| `WECOM_LOGIN_AUTO_REDIRECT`         | `false`       | Enables automatic redirect to WeCom login page when set to `true`         |

To configure the setting:
1.  Locate the environment variable configuration for your FastGPT main application deployment.
2.  Add or update the `WECOM_LOGIN_AUTO_REDIRECT` variable with your desired value:
    - Set to `true` to restore the pre-v4.15.1 automatic redirect behavior
    - Leave the variable unset or set to `false` to disable automatic redirects
3.  Apply the updated environment variable configuration.

To explicitly enable automatic redirects, add the following environment variable to your FastGPT main app:
```bash
WECOM_LOGIN_AUTO_REDIRECT=true
```

## Activate Configuration Changes
After updating the environment variables for the FastGPT main application, you must restart the main application process for the new setting to take effect. No additional configuration steps are required for other FastGPT platform components.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
