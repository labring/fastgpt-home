---
title: Retrieve Yuque Token and User ID for FastGPT
slug: /en/integration/yuque-token-user-id-fastgpt
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/yuque_dataset
source_type: Official documentation
---

# Retrieve Yuque Token and User ID for FastGPT

# Initial Access to Yuque Credentials
To obtain the required Yuque credentials for integrating with FastGPT datasets, start by navigating to the Yuque homepage. Click your user avatar, then select **Settings** to access the dedicated pages where you can retrieve your authentication token and user ID. Accompanying screenshots illustrate each step, with references included in the configuration tables below.

# Personal Edition Credential Retrieval
For users on Yuque Personal Edition, follow the structured workflow in the table below to collect your credentials and configure the necessary token permissions:

| Get Token                       | Add Permissions                 | Get User ID                     |
| ------------------------------- | ------------------------------- | ------------------------------- |
| ![alt text](/imgs/image-33.png) | ![alt text](/imgs/image-34.png) | ![alt text](/imgs/image-35.png) |

This workflow ensures your token has the exact access level required to sync Yuque content to FastGPT datasets. Skip the permission assignment step only if you have already configured a token with valid access for third-party integrations.

# Enterprise Edition Credential Retrieval
Yuque Enterprise Edition users can retrieve their credentials using the simplified two-step workflow below:

| Get Token                        | Get User ID                      |
| -------------------------------- | -------------------------------- |
| ![alt text](/imgs/image-109.png) | ![alt text](/imgs/image-108.png) |

No additional permission configuration is required for Enterprise Edition tokens, as default access settings align with FastGPT integration needs.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/yuque_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
