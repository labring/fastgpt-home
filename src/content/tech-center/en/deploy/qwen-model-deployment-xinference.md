---
title: Deploy Qwen Models Using Xinference for FastGPT
slug: /en/deploy/qwen-model-deployment-xinference
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/xinference
source_type: Official documentation
---

# Deploy Qwen Models Using Xinference for FastGPT

## Access Xinference Web Interface
After starting the Xinference service, access its web-based user interface by navigating to `http://127.0.0.1:9997` in a supported web browser.

## Step-by-Step Qwen Chat Model Deployment
This workflow uses the Qwen-14B Chat model as a standard example:
1. In the Xinference Web UI, select the "Launch Model" tab from the main navigation menu.
2. Use the integrated search bar to locate the `qwen-chat` model entry.
3. Configure your desired launch parameters for the selected model.
4. Click the rocket button located in the lower left corner of the `qwen-chat` model card to initiate the deployment process.
> Note: The default Model UID for this deployment is `qwen-chat`, which is required to reference the model during FastGPT integration later.
A screenshot of the Xinference Launch Model tab is provided to assist with this workflow.

## Model Download and Caching Behavior
On the first deployment attempt, Xinference will download model parameter files from HuggingFace, which typically takes several minutes to complete. All downloaded model files are cached locally, so subsequent deployments of the same model will not require re-downloading assets.
In addition to HuggingFace, Xinference supports downloading model parameters from alternative sources including ModelScope. Full configuration instructions for additional model sources are available in the official Xinference documentation.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/xinference)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
