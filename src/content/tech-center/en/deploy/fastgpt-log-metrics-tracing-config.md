---
title: Configure FastGPT Logging, Metrics, and Tracing
slug: /en/deploy/fastgpt-log-metrics-tracing-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Logging, Metrics, and Tracing

# Observability Configuration Overview
This section covers environment variables for configuring logging, metrics, and tracing for self-hosted FastGPT deployments. These settings enable you to monitor application performance, debug runtime issues, and export telemetry data to external observability tools. All variables are shared across core FastGPT services and worker processes, ensuring consistent telemetry across your entire deployment.

# Environment Variable Reference
The following table lists all available environment variables for configuring observability features, with their default values and descriptions:

| Variable                    | Default          | Description                                                                                           |
| --------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------- |
| `LOG_ENABLE_CONSOLE`        | `true`           | Whether console logging is enabled.                                                                   |
| `LOG_CONSOLE_LEVEL`         | `debug`          | Console log level. Supported values are `trace`, `debug`, `info`, `warning`, `error`, and `fatal`.    |
| `LOG_DEPTH`                 | `3`              | Legacy template variable for log object depth. New structured logging mainly uses log-level settings. |
| `LOG_ENABLE_OTEL`           | `false`          | Whether OpenTelemetry log export is enabled.                                                          |
| `LOG_OTEL_LEVEL`            | `info`           | OTEL log level.                                                                                       |
| `LOG_OTEL_SERVICE_NAME`     | `fastgpt-client` | OTEL log service name.                                                                                |
| `LOG_OTEL_URL`              | Empty            | OTEL log export URL.                                                                                  |
| `METRICS_ENABLE_OTEL`       | `false`          | Whether OpenTelemetry metrics export is enabled.                                                      |
| `METRICS_EXPORT_INTERVAL`   | `30000`          | Metrics export interval, in milliseconds.                                                             |
| `METRICS_OTEL_SERVICE_NAME` | `fastgpt-client` | OTEL metrics service name.                                                                            |
| `METRICS_OTEL_URL`          | Empty            | OTEL metrics export URL.                                                                              |
| `TRACING_ENABLE_OTEL`       | `false`          | Whether OpenTelemetry tracing is enabled.                                                             |
| `TRACING_OTEL_SERVICE_NAME` | `fastgpt-client` | OTEL tracing service name.                                                                            |
| `TRACING_OTEL_URL`          | Empty            | OTEL tracing export URL.                                                                              |
| `TRACING_OTEL_SAMPLE_RATIO` | Empty            | Trace sampling ratio from `0` to `1`.                                                                 |
| `CHAT_LOG_URL`              | Empty            | Chat log push service URL. Empty disables pushing.                                                    |
| `CHAT_LOG_INTERVAL`         | Empty            | Chat log batch push interval, in milliseconds.                                                        |
| `CHAT_LOG_SOURCE_ID_PREFIX` | `fastgpt-`       | Prefix for chat log source IDs.                                                                       |
| `TRACK_BATCH_UPDATE_TIME`   | `10000`          | Event counter batch write interval, in milliseconds.                                                  |

# Deployment Configuration Steps
All observability variables are set as standard environment variables for your FastGPT deployment. For Docker Compose deployments, add the variables to the `environment` section of your FastGPT service definition. For bare-metal or Kubernetes deployments, set the variables in your host shell or deployment manifest.

For example, to enable OpenTelemetry tracing with a 50% sampling rate and a custom service name, add these lines to your configuration:
```
TRACING_ENABLE_OTEL=true
TRACING_OTEL_SAMPLE_RATIO=0.5
TRACING_OTEL_URL=https://otel-collector.example.com:4318/v1/traces
TRACING_OTEL_SERVICE_NAME=production-fastgpt
```
To disable console logging and set the console log level to `info`, use:
```
LOG_ENABLE_CONSOLE=false
LOG_CONSOLE_LEVEL=info
```
Empty default values mean a feature is disabled unless you explicitly provide a valid endpoint or setting. For chat log pushing, you must set `CHAT_LOG_URL` to enable the feature, with optional `CHAT_LOG_INTERVAL` and `CHAT_LOG_SOURCE_ID_PREFIX` to customize batch timing and source ID formatting.

# Key Usage Notes
The `LOG_DEPTH` variable is a legacy setting and may be deprecated in future releases, as modern structured logging relies on built-in log level controls rather than object depth limits. Log levels follow standard severity ordering, with `trace` being the most verbose and `fatal` the most severe. The `TRACK_BATCH_UPDATE_TIME` variable balances write frequency and resource usage by controlling how often event counters are persisted to storage.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
