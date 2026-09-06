---
title: Deploy and Use Custom ChatGLM2 and M3E Models on FastGPT
slug: /en/deploy/fastgpt-custom-chatglm-m3e-models
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2-m3e
source_type: Official documentation
---

# Deploy and Use Custom ChatGLM2 and M3E Models on FastGPT

## Model Compatibility and Core Notes
This documentation covers configuration workflows for two custom models supported natively by FastGPT: the M3E embedding model and the ChatGLM2 chat model. A critical overarching rule applies to all model setups: FastGPT applications can only bind Datasets that use an identical embedding model, and cross-model binding between different embedding model types is not supported.

## M3E Embedding Model Step-by-Step Configuration
Follow these exact steps to set up the M3E embedding model for your FastGPT instance:
1.  Create a new Dataset, and select the M3E model as the embedding model during the initial creation flow. A permanent restriction applies here: once the embedding model is selected for a Dataset, it cannot be modified at any later point.
2.  Import your target source data into the newly created Dataset.
3.  Execute a test search to validate that the embedding and search functionality operates correctly.
4.  Bind the fully configured Dataset to a FastGPT application. Prior to final deployment, adjust the application’s similarity threshold as needed: different embedding models produce distinct similarity (distance) score ranges, so targeted testing and iterative tuning is required to set an appropriate threshold for your use case.

Reference screenshots are provided for each key stage: the Dataset creation model selection screen, the test search validation interface, and the application-to-Dataset binding configuration screen.

## ChatGLM2 Chat Model Configuration
Configuring the ChatGLM2 chat model requires only a single straightforward step: during FastGPT application setup, select ChatGLM2 as the target chat model. No additional configuration steps, parameter adjustments, or post-setup validation beyond model selection are required for this chat model.

## Binding Restriction Details
To ensure consistent performance across all linked Dataset resources, FastGPT enforces a strict embedding model matching rule for application bindings. An application cannot bind multiple Datasets that use different embedding models, and any Dataset configured with a non-M3E embedding model cannot be bound to an application set up for M3E, and vice versa. This restriction prevents incompatible embedding calculations from breaking application search and response workflows.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2-m3e)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
