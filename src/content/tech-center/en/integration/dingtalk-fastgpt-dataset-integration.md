---
title: Configure DingTalk Dataset Integration for FastGPT
slug: /en/integration/dingtalk-fastgpt-dataset-integration
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/dingtalk_dataset
source_type: Official documentation
---

# Configure DingTalk Dataset Integration for FastGPT

## Overview
This documentation covers integration between DingTalk enterprise resources and FastGPT knowledge datasets via a DingTalk internal enterprise app. This workflow allows pulling authorized DingTalk content directly into FastGPT’s knowledge base.

## Required Configuration Parameters
Three mandatory parameters are needed to set up the integration:
| Parameter Name | Description |
|----------------|-------------|
| App Key | Unique identifier for your DingTalk internal enterprise app |
| App Secret | Secure authentication credential for your DingTalk internal enterprise app |
| User ID | DingTalk user ID associated with the app’s authorized access scope |

## Step-by-Step Setup
Follow these ordered steps to complete the integration:
1. Navigate to the FastGPT dataset creation interface.
2. Select the DingTalk dataset integration option to start configuration.
3. Enter the required App Key, App Secret, and User ID into their respective fields, then finalize dataset creation.
4. Open the newly created dataset’s detail page.
5. Click the `Add file` button on the dataset detail page.
6. Select the desired DingTalk workspace, online documents, or folders to import content.

## Supported Import Content
Only text content from DingTalk online documents is supported for import. Binary file formats including PDF, Word, Excel, and PPT are not compatible with this integration and cannot be added to the FastGPT dataset.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/dingtalk_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
