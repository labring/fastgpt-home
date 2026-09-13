---
title: Import Yuque File Libraries to FastGPT
slug: /en/integration/fastgpt-yuque-library-import
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/yuque_dataset
source_type: Official documentation
---

# Import Yuque File Libraries to FastGPT

## Prerequisites
This documentation outlines the official process for importing Yuque file libraries into FastGPT. To access this functionality, two mandatory conditions must be satisfied: first, your FastGPT deployment must be running version 4.8.16 or a later release, and second, your FastGPT instance must be subscribed to the commercial edition of the software. Two reference screenshots are included to support setup: image-31.png shows the initial configuration panel, while image-32.png illustrates the post-configuration import workflow confirmation screen. The only required configuration parameters for this integration are a valid Yuque API token and your unique Yuque user UID.

## Configuration and Import Workflow
Follow these exact steps to configure and initiate Yuque library imports:
1. Log into your FastGPT administrative dashboard and navigate to the dedicated dataset management section.
2. From the third-party integration menu, select the Yuque file library import option to open the configuration modal.
3. Refer to image-31.png to locate the designated token input field, then paste your validated Yuque API token into this field.
4. Locate the UID parameter input field in the same modal, then enter your official Yuque user UID.
5. Review the entered credentials to confirm no typos or formatting errors are present.
6. Select the specific Yuque file libraries you wish to import into your FastGPT dataset.
7. Trigger the import process, and cross-reference the workflow initiation screen with image-32.png to confirm the setup is correct.

## Beta Feature Considerations
The Yuque file library import feature is currently marked as beta. During the beta period, some user interactions related to library synchronization, post-import management, or error handling may still be in active refinement. No additional configuration options beyond the required token and UID parameters are available in this release. All imported content will follow the default dataset processing rules configured for your FastGPT instance.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/yuque_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
