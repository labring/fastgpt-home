---
title: Set Up SigNoz Observability for FastGPT
slug: /en/deploy/fastgpt-signoz-observability-setup
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/signoz
source_type: Official documentation
---

# Set Up SigNoz Observability for FastGPT

## SigNoz Observability Overview
SigNoz is an open-source Application Performance Monitoring (APM) and observability platform that provides comprehensive service monitoring for FastGPT. Built on the OpenTelemetry standard, it collects, processes, and visualizes telemetry data from distributed systems, including tracing, metrics, and logging.

## Core Capability Table
| Capability | Description |
|---|---|
| Distributed Tracing | Track the complete call chain of user requests across FastGPT services |
| Performance Monitoring | Monitor key metrics like API response times and throughput |
| Error Tracking | Automatically capture and record system exceptions for troubleshooting |
| Log Aggregation | Centrally collect and manage application logs with structured query support |
| Real-time Alerts | Set alert rules based on metric thresholds to detect anomalies early |

## Integration Value for FastGPT
Each of SigNoz’s core capabilities addresses critical monitoring needs for FastGPT deployments. Distributed tracing provides full visibility into end-to-end user request flows across FastGPT’s distributed service architecture. Performance monitoring tracks key operational metrics to identify system bottlenecks. Error tracking automatically captures and stores system exceptions to streamline troubleshooting workflows. Log aggregation centralizes application logs for structured querying, and real-time alerts allow operators to set threshold-based rules to detect and respond to anomalies before they impact end users.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/signoz)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
