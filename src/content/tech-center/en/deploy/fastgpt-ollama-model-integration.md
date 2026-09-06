---
title: Add and Use Ollama Models in FastGPT
slug: /en/deploy/fastgpt-ollama-model-integration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/ollama
source_type: Official documentation
---

# Add and Use Ollama Models in FastGPT

## Model Configuration Access
To begin setting up Ollama models within FastGPT, navigate through the account navigation menu: select Account > Model Providers > Model Configuration. This portal allows registration of external models for use across FastGPT applications. A mandatory validation requirement states that the model ID entered during setup must exactly match the model name defined in your OneAPI instance. Accompanying visual aids illustrate this core configuration screen and required field inputs.

## Step-by-Step Model Addition
Follow these concrete steps to register an Ollama model:
1. From the Model Configuration page, click the Add Model button to launch the new model setup form.
2. Input the exact OneAPI model name into the model ID field.
3. Assign a custom alias for the model (this alias will be the visible name in FastGPT app builders).
4. Save the configuration.
Critical note: Duplicate model entries are not supported. If you attempt to add the same model multiple times, the FastGPT system will disregard prior alias configurations and use only the alias set during the most recent addition. Three accompanying screenshots walk through this addition process and confirmation states.

## Application Integration
Once the model is successfully registered, you can deploy it within FastGPT applications:
1. Navigate to the FastGPT Studio dashboard and create a new application, or edit an existing one.
2. Locate the model selection menu within the app’s configuration settings.
3. Select the Ollama model you registered earlier; the displayed name will be the custom alias you assigned during setup.
An accompanying screenshot demonstrates selecting the configured model within the studio application builder. After selection, the application will use the registered Ollama model for all chat and generation workflows associated with that app.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/ollama)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
