---
title: Add and Maintain FastGPT Model Presets
slug: /en/model/fastgpt-plugin-model-presets
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: Official documentation
---

# Add and Maintain FastGPT Model Presets

## What Are FastGPT Model Presets
Model presets are static configuration assets that define core model integration details for FastGPT. These assets deliver standardized data for built-in model provider definitions, curated lists of supported models per provider, granular model capability mappings, and baseline default request parameters. Once FastGPT loads these presets during startup, end users can select preconfigured models across three key interface areas: the model configuration menu, AIProxy channel setups, and plugin-integrated workflow tools.

## Official Maintenance Entry Points
For FastGPT version 1.0 and later, the primary maintenance entry for model presets is the `fastgpt-plugin` repository. Prior FastGPT iterations used file paths under `modules/model/*` for preset management, but these legacy locations are no longer the preferred update points and should not be used for new preset development or modifications. All new model preset additions or updates must be authored to align with the v1.0+ plugin system code structure to ensure compatibility with current FastGPT releases.

## Core Preset Configuration Fields
All valid model presets include four standardized fields, as outlined in the table below:
| Field Name                  | Core Functionality                                                                 |
|------------------------------|-----------------------------------------------------------------------------------|
| Model Providers              | Defines supported third-party model service integrations and connection details |
| Supported Model Lists        | Enumerates valid model identifiers for each integrated provider                    |
| Model Capabilities           | Specifies supported features for individual models                                |
| Default Request Parameters   | Establishes baseline default parameters for automated model API calls              |

## Post-Update Validation
After updating or adding model presets in the `fastgpt-plugin` repository, validating the changes is required to ensure proper functionality. This workflow involves deploying the updated plugin repository to a FastGPT instance, navigating to the model configuration menu, and confirming that the new or updated models appear in the available selection list. If models do not appear in the selection menu, verify that the preset files follow the v1.0+ plugin system structure and that no syntax errors are present in the configuration files.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/model-presets)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
