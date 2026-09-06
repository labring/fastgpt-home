---
title: Update FastGPT Logging Environment Variables
slug: /en/deploy/fastgpt-logging-env-updates
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147
source_type: Official documentation
---

# Update FastGPT Logging Environment Variables

# Logging System Environment Update Overview
This update modifies the FastGPT logging infrastructure, covering console log output, remote log collection, and centralized log analysis workflows. Prior deployments relied on SigNoz-specific environment variables for log management, which have been replaced with a standardized set of configurations. The changes apply consistently across all FastGPT-related services: fastgpt, fastgpt-pro, fastgpt-plugin, and fastgpt-mcp-server. This documentation outlines the exact environment variable adjustments needed to migrate to the updated logging system without disrupting service functionality.

# Deprecated Environment Variables
Five existing environment variables related to legacy logging and SigNoz integration are no longer supported and must be removed from all service configuration files. These variables are:
- `LOG_LEVEL`
- `STORE_LOG_LEVEL`
- `SIGNOZ_BASE_URL`
- `SIGNOZ_SERVICE_NAME`
- `SIGNOZ_STORE_LEVEL`

# New Logging Environment Variables
Six new environment variables replace the deprecated SigNoz-specific settings, with standardized configurations across all FastGPT services. The following table lists each variable, its default value, and official purpose:
| Variable Name                  | Default Value                          | Description                                                                 |
|--------------------------------|----------------------------------------|-----------------------------------------------------------------------------|
| `LOG_ENABLE_CONSOLE`           | `true`                                 | Enables console log output                                                  |
| `LOG_CONSOLE_LEVEL`            | `debug`                                | Minimum log severity level for console output                               |
| `LOG_ENABLE_OTEL`              | `false`                                | Toggles OTEL (OpenTelemetry) log collection                                 |
| `LOG_OTEL_LEVEL`               | `info`                                 | Minimum log severity level for OTEL-collected logs                           |
| `LOG_OTEL_SERVICE_NAME`        | `fastgpt-client`                       | Service name identifier sent to the OTLP collector                          |
| `LOG_OTEL_URL`                 | `http://localhost:4318/v1/logs`        | Full OTLP collector endpoint URL; must include the `/v1/logs` path          |

# Implementation Steps
1.  Locate all .env configuration files for your FastGPT services, including those for fastgpt, fastgpt-pro, fastgpt-plugin, and fastgpt-mcp-server.
2.  Remove the five deprecated logging variables from each of these configuration files.
3.  Add the six new environment variables to each configuration file, using the default values provided or updating them to match your deployment’s specific logging requirements.
4.  Restart each FastGPT service to apply the updated environment variables and activate the new logging system.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
