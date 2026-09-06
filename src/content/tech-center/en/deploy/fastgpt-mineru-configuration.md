---
title: Configure FastGPT for MinerU Custom Models
slug: /en/deploy/fastgpt-mineru-configuration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/mineru
source_type: Official documentation
---

# Configure FastGPT for MinerU Custom Models

## MinerU Custom PDF Parsing Configuration Overview
This page details the required configuration steps to integrate MinerU’s custom PDF parsing service with a self-hosted FastGPT deployment. This configuration replaces or augments default PDF parsing workflows to support optimized handling for MinerU model deployments, using values defined in the official FastGPT self-hosted documentation.

## Environment Variable Configuration Parameters
For open-source self-hosted FastGPT deployments, configuration is nested under the `systemEnv.customPdfParse` field in the FastGPT environment configuration JSON file. The following supported parameters are defined in the official documentation:

| Parameter Name | Default Value | Description |
|----------------|---------------|-------------|
| `url` | Unspecified (required) | Full endpoint URL for the custom MinerU PDF parsing service, with example format `http://xxxx.com/v2/parse/file` |
| `key` | Empty string `""` | Authentication key for the custom PDF parsing service |
| `doc2xKey` | Empty string `""` | Authentication key for the supplementary doc2x parsing service |
| `price` | `0` | Monetary cost assigned to each individual PDF parsing request |

## Commercial Edition Administrative Configuration
For commercial FastGPT deployments, configuration of the MinerU custom PDF parsing service is managed via the included administrative web interface. The interface includes form fields that directly map to the environment variable parameters listed above. A reference screenshot of the configuration page is provided as `mineru6.png`.

## Configuration Activation
Any changes made to the environment variable configuration file will not take effect until the FastGPT service is fully restarted. This requirement applies to all custom service integrations configured via the file-based environment variable method, per official FastGPT documentation.

> [FastGPT public documentation](https://doc.fastgpt.cn/en/self-host/custom-models/mineru)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
