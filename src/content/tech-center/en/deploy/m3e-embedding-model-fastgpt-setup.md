---
title: Set Up M3E Embedding Models in FastGPT
slug: /en/deploy/m3e-embedding-model-fastgpt-setup
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/m3e
source_type: Official documentation
---

# Set Up M3E Embedding Models in FastGPT

## Core Usage Restrictions
Before implementing M3E embedding models in FastGPT, note two non-modifiable constraints: First, when creating a dataset, selecting the M3E embedding model locks the model for that dataset permanently; no subsequent changes to the embedding model are allowed. Second, FastGPT applications can only bind datasets that use the identical embedding model; cross-model binding between different embedding models is unsupported. Additionally, similarity distance scores differ across embedding models, so the similarity threshold must be tested and tuned to align with your specific use case when using M3E.

## Step-by-Step Integration Workflow
Follow these ordered steps to deploy M3E embedding models in your FastGPT environment:
1.  **Create a Dataset with M3E Embedding**: Navigate to the dataset creation interface, and select the M3E model as the embedding model during setup. Refer to the model selection screenshot (`../../../public/imgs/model-m3e2.png`) for visual guidance.
2.  **Import Source Data**: Upload or connect your target source data to the newly created M3E-enabled dataset.
3.  **Test Search Functionality**: Execute a test search to validate the embedding model’s performance. Refer to the search test screenshot (`../../../public/imgs/model-m3e3.png`) to review expected output.
4.  **Bind Dataset to a FastGPT App**: Navigate to your target application’s configuration page, and select the M3E-enabled dataset for binding. Adjust the similarity threshold based on testing, as M3E produces unique similarity scores compared to other models. Refer to the app binding screenshot (`../../../public/imgs/model-m3e4.png`) for setup guidance.

## Post-Binding Validation
After binding the dataset to your app, confirm that the similarity threshold is calibrated correctly. Re-run test searches to ensure relevant results are returned at the configured threshold, as improper threshold settings can lead to overly broad or overly narrow search results. No additional configuration steps are required beyond this tuning, as all core functionality is handled automatically once the dataset and app are properly linked.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/m3e)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
