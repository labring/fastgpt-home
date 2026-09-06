---
title: Grant Folder Permissions for FastGPT Lark Dataset
slug: /en/integration/fastgpt-lark-folder-permissions
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/lark_dataset
source_type: Official documentation
---

# Grant Folder Permissions for FastGPT Lark Dataset

# Permission Prerequisites for Lark Dataset Integration
To use a Lark folder as a knowledge base in FastGPT, you must configure valid folder access permissions for the associated Lark open platform app. For additional context on common permission-related issues, refer to the official Lark drive permissions FAQ: https://open.feishu.cn/document/server-docs/docs/drive-v1/faq#b02e5bfb.

# Step-by-Step Permission Grant Workflow
Follow these two core steps to configure folder permissions for your FastGPT Lark dataset:
1.  **Add the Target Lark App to a Group Chat**: Locate a dedicated group chat for permission management, then add the newly created Lark open platform app to this chat. This enables the group to facilitate app-level access to the target folder.
2.  **Assign Directory Permissions to the Group**: Open the target Lark folder's permission settings panel, then grant the required directory access privileges to the group chat that now includes the Lark app.
A reference screenshot showing the folder permission configuration interface is included in the original FastGPT documentation, with the alt text "folder permission setup screenshot".

# Direct Token Retrieval for Pre-Authorized Folders
If your target Lark folder already has permissions granted to the "All Members" built-in group, you do not need to complete the two configuration steps above. In this scenario, you can proceed directly to retrieving the Folder Token to connect the Lark folder to your FastGPT knowledge base.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/lark_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
