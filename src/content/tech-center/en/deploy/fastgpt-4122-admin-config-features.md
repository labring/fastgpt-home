---
title: FastGPT 4.12.2 New Admin Configuration Features
slug: /en/deploy/fastgpt-4122-admin-config-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4122
source_type: Official documentation
---

# FastGPT 4.12.2 New Admin Configuration Features

## Introduction to FastGPT 4.12.2 New Features
This technical document extends the official FastGPT self-hosted upgrade documentation for version 4.12.2, detailing all new platform features focused on deployment flexibility and team workspace customization. All configurations outlined are available for self-hosted FastGPT instances that have completed the 4.12 upgrade process.

## Embedding Model Concurrency Configuration
Prior to FastGPT 4.12.2, embedding model inference concurrency was hardcoded to 10, which caused compatibility issues with embedding models that do not support parallel inference requests. The 4.12.2 update adds a user-configurable concurrency setting, with a new default value of 1. This setting is adjusted exclusively via the model settings menu in the FastGPT admin panel. The official configuration parameters for this feature are listed below:
| Configuration Parameter | Default Value | Official Specification |
|--------------------------|---------------|-------------------------|
| embedding model concurrency | 1 | Replaces the prior hardcoded 10 limit; values should be set based on the supported concurrency of the deployed embedding model and host infrastructure capacity |

## Team Chat Page Customization Options
This update adds three admin-only customization options for the team chat interface:
1. **Featured Team App Recommendations**: Administrators can curate a list of featured applications that will be displayed as recommended apps for all team members when accessing the chat page.
2. **Common Team App Shortcuts**: Administrators can configure shortcut links for frequently used team applications, which appear prominently on the chat page homepage for quick one-click access.
3. **Disable Team Chat Homepage**: A new administrative toggle allows authorized admins to fully disable the team chat homepage, adjusting the default workspace layout to align with specific team workflow needs.

> [FastGPT 4.12.2 upgrade notes](https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4122)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
