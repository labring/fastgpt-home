---
title: Migrate FastGPT config.json to environment variables
slug: /en/deploy/fastgpt-config-env-migration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41507
source_type: Official documentation
---

# Migrate FastGPT config.json to environment variables

## Overview of Config.json Removal
Starting with FastGPT 4.15.07, the `config.json` configuration file is deprecated and no longer supported. All platform configuration previously managed via this file must now be defined using environment variables. This update standardizes configuration management across all deployment types, reducing inconsistencies between local and production environments.

## Environment Variable Reference
All configuration settings are now managed via environment variables. The following table lists all available variables, their purposes, and default values where specified:

| Environment Variable | Description | Default Value |
|----------------------|-------------|---------------|
| `SSE_MCP_SERVER_PROXY_ENDPOINT` | MCP Server proxy endpoint, used to build the SSE URL on the MCP usage page. Must not include a trailing slash. | None (required for MCP feature access) |
| `CUSTOM_PDF_PARSE_URL` | Custom PDF parsing service endpoint. Optional for enhanced PDF parsing workflows. | Unset |
| `CUSTOM_PDF_PARSE_KEY` | Authentication key for the configured custom PDF parsing service. Optional. | Unset |
| `DOC2X_KEY` | Doc2x PDF parsing service authentication key. Optional. | Unset |
| `TEXTIN_APP_ID` | TextIn service application identifier. Optional. | Unset |
| `TEXTIN_SECRET_CODE` | TextIn service authentication secret code. Optional. | Unset |
| `HNSW_EF_SEARCH` | HNSW ef_search parameter for vector retrieval. Applies to PostgreSQL, OceanBase, and OpenGauss databases. | 100 |
| `HNSW_MAX_SCAN_TUPLES` | Maximum scanned rows for vector retrieval operations. Only applies to PostgreSQL databases. | 100000 |
| `DATASET_PARSE_MAX_PROCESS` | Maximum concurrent processes for the dataset file parsing queue. | 10 |
| `VECTOR_MAX_PROCESS` | Maximum concurrent processes for the vector indexing queue. | 10 |
| `QA_MAX_PROCESS` | Maximum concurrent processes for the Q&A splitting queue. | 10 |
| `VLM_MAX_PROCESS` | Maximum concurrent processes for the image understanding model processing queue. | 10 |

## Migration Steps
Complete the following steps to migrate your configuration from `config.json` to environment variables:
1. Locate the existing `config.json` file in your FastGPT deployment directory and delete it.
2. Translate all configuration entries from the removed `config.json` file to the corresponding environment variables listed in the reference table.
3. Configure the required and optional environment variables in your deployment environment:
   - For Docker Compose: Add entries to the `environment` section of your FastGPT service definitions.
   - For Kubernetes: Define variables in a ConfigMap or Secrets resource, then mount them to your FastGPT pods.
   - For manual server deployments: Export the variables using `export VARIABLE_NAME=value` prior to starting FastGPT services.
4. Restart all FastGPT backend and frontend services to apply the new configuration settings.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41507)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
