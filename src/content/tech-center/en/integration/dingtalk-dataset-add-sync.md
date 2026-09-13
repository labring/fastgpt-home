---
title: Add and Sync DingTalk Dataset Files in FastGPT
slug: /en/integration/dingtalk-dataset-add-sync
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/dingtalk_dataset
source_type: Official documentation
---

# Add and Sync DingTalk Dataset Files in FastGPT

## DingTalk Dataset File Import and Sync Overview
This guide details the process for importing online documents from DingTalk workspaces into FastGPT datasets, and synchronizing updated document content to ensure search indexes reflect the latest available data. All actions are performed within the FastGPT dataset management interface following successful creation of a DingTalk-connected dataset.

## Step-by-Step Import Workflow
Follow these ordered steps to import files from DingTalk into your FastGPT dataset:
1. Open the detail page for the target FastGPT dataset.
2. Click the `Add file` button in the dataset interface.
3. Select the desired target DingTalk workspace.
4. Choose either individual online documents or a parent folder to import.
5. Confirm the import request to begin file ingestion.

When a folder is selected for import, FastGPT recursively imports all supported online documents contained under the selected folder and its nested subdirectories.

## Synchronization of Updated Document Content
To sync changes made to imported DingTalk documents:
1. Locate the target imported file within the dataset.
2. Access the file’s associated action menu.
3. Click the `Sync` option.

FastGPT will retrieve the latest version of the document’s content from the connected DingTalk workspace and refresh the dataset’s search indexes to incorporate the updated data. This ensures that all edits to the original DingTalk documents are reflected in the FastGPT dataset’s search and retrieval functionality.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/dingtalk_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
