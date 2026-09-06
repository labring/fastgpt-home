---
title: Enable and Map FastGPT AI Models
slug: /en/deploy/fastgpt-enable-model-mapping
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: Official documentation
---

# Enable and Map FastGPT AI Models

## Default Model Configuration Basics
The FastGPT self-hosted system includes pre-configured AI models from major AI providers out of the box. For users who are unfamiliar with the model configuration workflow, the simplest activation step is to use the built-in `Enable` button. A critical configuration note: the `Model ID` field directly corresponds to the `Model` selection option within the `Model Channels` configuration menu. This consistent mapping eliminates confusion when associating model identifiers with their respective provider and model variants during deployment.

## Step-by-Step Model Activation Process
To activate a pre-included AI model:
1. Navigate to the model configuration section of your self-hosted FastGPT deployment.
2. Locate the target model from the default preloaded library of supported providers.
3. Click the clearly labeled `Enable` button to activate the model for use across your FastGPT instance.
The standard Enable Models interface, which displays the activation control for default models, is shown below:
![alt text](../../../../public/imgs/image-92.png)

## Model ID Mapping Reference
When configuring model channels, understanding the Model ID mapping is essential for accurate model setup. The following reference pairs the Enable Models interface with its corresponding Model ID mapping view:
| Enable Models Interface | Model ID Mapping Interface |
| ------------------------ | -------------------------- |
| ![alt text](../../../../public/imgs/image-92.png) | ![alt text](../../../../public/imgs/image-124.png) |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/intro)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
