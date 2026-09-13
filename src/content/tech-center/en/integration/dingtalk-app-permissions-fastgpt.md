---
title: Configure DingTalk App Permissions for FastGPT Dataset
slug: /en/integration/dingtalk-app-permissions-fastgpt
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/dingtalk_dataset
source_type: Official documentation
---

# Configure DingTalk App Permissions for FastGPT Dataset

This document outlines the mandatory steps to configure DingTalk application permissions for integrating DingTalk data sources with FastGPT datasets. Proper permission setup ensures FastGPT can access authorized DingTalk workspace, document, and user data as required for dataset synchronization.

## Required Permissions Reference
The following table lists the exact permissions that must be enabled for successful DingTalk-FastGPT integration:

| Permission            | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| `qyapi_get_member`    | Get the operator ID from `User ID`.                  |
| `Wiki.Workspace.Read` | List DingTalk workspaces accessible to the operator. |
| `Wiki.Node.Read`      | List folders and documents under a workspace.        |
| `Storage.File.Read`   | Read DingTalk online document content.               |

## Step-by-Step Configuration
![Enable DingTalk app permissions configuration interface](/imgs/image-dd5.png)

Follow these steps to enable the required permissions:
1. Open the **Permissions** tab on the DingTalk application's detail management page.
2. Use the built-in search function to locate each permission listed in the reference table above.
3. Toggle the activation switch for each required permission to enable it.
4. After enabling all listed permissions, save your changes and publish the updated app configuration to apply the settings.

## Troubleshooting Permission Issues
If you encounter an error that includes the exact string `requiredScopes`, enable the permissions explicitly listed in that error notification to resolve the permission mismatch.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/dingtalk_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
