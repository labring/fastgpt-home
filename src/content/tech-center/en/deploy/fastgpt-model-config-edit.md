---
title: Edit FastGPT Self-Hosted Model Configuration Settings
slug: /en/deploy/fastgpt-model-config-edit
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: Official documentation
---

# Edit FastGPT Self-Hosted Model Configuration Settings

# Access Model Configuration Modal
To open the configuration settings for a specific model in a self-hosted FastGPT environment, locate the target model entry in the administrative model management interface. Click the gear-shaped icon that appears immediately adjacent to the model’s listing. This action will launch a dedicated modal window containing the model’s configuration options.

# Visual Reference for Configuration Workflow
Two official reference images accompany this documentation to clarify the model configuration process. The table below shows the two reference assets:

| Model Management List View | Open Configuration Modal |
|------------------------------|--------------------------|
| ![image-93.png](../../../../public/imgs/image-93.png) | ![image-94.png](../../../../public/imgs/image-94.png) |

This first image displays the main model management list, where each listed model includes a gear icon for accessing its configuration. The second image shows the open configuration modal for a selected model, presenting the unique configuration fields for that model type. Administrators can use these visuals to confirm their location within the workflow and correctly identify the gear icon trigger for any model entry.

# Model Configuration Variations
A core characteristic of FastGPT’s model configuration system is that each model type has distinct configuration options. This means that the fields, input requirements, and available settings within the configuration modal will differ depending on the specific model being edited. Administrators must review the exact fields presented for their selected model before making any changes, as the available options are not uniform across all model entries. Any changes saved to the configuration modal will update the model’s operational parameters within the FastGPT instance, and will apply immediately after confirmation.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/intro)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
