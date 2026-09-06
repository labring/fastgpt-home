---
title: Set Up FastGPT Lark Dataset Import
slug: /en/integration/fastgpt-lark-dataset-import
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/lark_dataset
source_type: Official documentation
---

# Set Up FastGPT Lark Dataset Import

### Prerequisites
Before configuring Lark dataset import, confirm your FastGPT deployment meets all mandatory requirements:
- Your FastGPT instance is running version 4.8.16 or later
- Your FastGPT subscription is the commercial edition
Lark API constraints limit the scope of accessible content: only documents stored in shared space directories are available for import. Personal spaces and wiki content cannot be ingested, and only cloud document types are supported for this integration.

### Configuration Workflow
Follow this step-by-step process to set up the Lark dataset import:
1. Navigate to the third-party dataset import page within your FastGPT commercial deployment.
2. Select the Lark dataset integration card to initiate the setup flow.
3. In the provided credential fields, input your Lark application’s `appId` and `appSecret`.
4. Save the configured credentials to proceed to the folder selection step.
5. Choose a **top-level folder within a document space** as the source for your dataset import.
Reference screenshots of the credential configuration interface (image-39) and folder selection screen (image-40) to validate your setup steps.

### Beta Status and Limitations
This Lark dataset import feature is currently in beta, and some user interactions may still require refinement. Per official Lark API restrictions, the integration cannot access all document content: only files stored in shared space directories are supported for import. Personal spaces and wiki content are not compatible with this workflow, and only cloud document types can be ingested via this integration.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/lark_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
