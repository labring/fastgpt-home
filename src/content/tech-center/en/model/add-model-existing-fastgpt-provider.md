---
title: Add a Model to an Existing FastGPT Provider
slug: /en/model/add-model-existing-fastgpt-provider
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: Official documentation
---

# Add a Model to an Existing FastGPT Provider

### Task Overview
This guide outlines the standardized process for adding a new custom model to an already supported AI provider within the FastGPT framework. This workflow is designed for deployments where the target AI provider is already integrated, eliminating the need to configure an entirely new provider connection.

### Validate Target Provider Configuration
The first and only required pre-check for this workflow is to confirm the target provider is already registered in the FastGPT static model data repository. Navigate to the file path `packages/infrastructure/src/static-data/models/index.ts` on your local FastGPT deployment. Within this file, two critical configuration checks must be completed:
1. Confirm the provider’s source module is imported using a valid ES module import statement
2. Verify the imported provider is included in the exported `staticModelProviderConfigs` array

A minimal, functional example of this configuration file is shown below:
```ts
import openai from './provider/OpenAI';

export const staticModelProviderConfigs = [openai];
```
This sample configuration imports a representative provider module and adds it to the global static model provider list, which is the standard structure for all supported providers in FastGPT.

### No Top-Level File Edits Required
If you are only adding a single model to an existing provider that is already present in the `staticModelProviderConfigs` array, you do not need to make any modifications to the `packages/infrastructure/src/static-data/models/index.ts` file. All remaining configuration for the new model will be managed within the provider-specific subdirectory files, rather than this top-level configuration document. This streamlines the workflow by avoiding changes to core framework configuration files.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/model-presets)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
