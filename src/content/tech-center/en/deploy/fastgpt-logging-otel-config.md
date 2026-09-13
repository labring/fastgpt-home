---
title: Configure FastGPT Logging and OTEL Collection
slug: /en/deploy/fastgpt-logging-otel-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/signoz
source_type: Official documentation
---

# Configure FastGPT Logging and OTEL Collection

## Log Configuration Overview
FastGPT supports flexible logging setup with both console output and OpenTelemetry (OTEL) based log collection. Valid log levels follow a standard severity hierarchy, including `trace`, `debug`, `info`, `warning`, `error`, and `fatal`. Each logging destination has independent minimum log level thresholds, allowing administrators to control the verbosity of logs sent to each output.

## Configurable Environment Variables
All logging settings are adjusted via environment variables, which can be set in your FastGPT deployment’s `.env` file or orchestrated environment configuration. The full list of available variables is below:

| Environment Variable | Description | Valid/Example Value |
|----------------------|-------------|---------------------|
| `LOG_ENABLE_CONSOLE` | Toggles real-time console log output | `true` to enable, `false` to disable |
| `LOG_CONSOLE_LEVEL` | Defines the minimum severity level for console logs | One of `trace`, `debug`, `info`, `warning`, `error`, `fatal` |
| `LOG_ENABLE_OTEL` | Toggles OTLP-compliant log collection | `true` to enable, `false` to disable |
| `LOG_OTEL_LEVEL` | Defines the minimum severity level for OTEL-collected logs | One of `trace`, `debug`, `info`, `warning`, `error`, `fatal` |
| `LOG_OTEL_SERVICE_NAME` | Labels the FastGPT service for the OTLP collector | Default example value: `fastgpt-client` |
| `LOG_OTEL_URL` | Full endpoint URL for the OTLP log collector | Must include the `/v1/logs` path; default example: `http://localhost:4318/v1/logs` |

## Deploy Updated Configuration
After updating your environment variables, apply the changes by restarting the FastGPT service. For file-based deployments, restart the background service running FastGPT. For containerized deployments, restart the FastGPT container instances to load the new configuration.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/signoz)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
