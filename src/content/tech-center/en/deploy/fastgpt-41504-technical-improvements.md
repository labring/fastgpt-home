---
title: FastGPT 4.15.04 Technical Improvement Details
slug: /en/deploy/fastgpt-41504-technical-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41504
source_type: Official documentation
---

# FastGPT 4.15.04 Technical Improvement Details

## System Tool Execution Overhaul
System tool execution is now migrated to local-pool, with native support for process pools, task queues, execution timeouts, retry backoff logic, and real-time runtime metrics collection. This update provides more reliable and observable tool execution for self-hosted deployments.

## Plugin & Storage Integration Updates
Plugin-level runtime configuration is now supported, allowing per-plugin tuning of execution parameters. Additionally, plugin entry files can be retrieved from object storage and cached to a local file directory to reduce repeated retrieval delays.

## Validation & Parsing Enhancements
Multiple safeguards are added to prevent configuration and processing errors: input guide configuration now validates custom lexicon URLs to block invalid entries, and workflow array reference type validation is enhanced to avoid conflicts with two-dimensional dataset data. When a linked dataset is deleted during app orchestration, a graceful prompt is displayed to users.
For document parsing, the PDF parsing engine is replaced with `liteparse`, delivering a 3x improvement in parsing speed. XLSX parsing is optimized to automatically remove empty rows and columns, and supplement missing merged cell data to improve dataset quality.

## Workflow Stability Improvements
Workflow execution is optimized by storing nodeResponse in a flattened format, which eliminates failures when saving large nested workflow configurations.

### Local-Pool Configuration Parameters
The updated local-pool system exposes the following configurable parameters for deployment tuning:
| Parameter | Description |
|-----------|-------------|
| process_pool_size | Maximum number of concurrent system tool processes |
| task_queue_limit | Maximum number of pending queued execution tasks |
| execution_timeout | Maximum allowed runtime for individual system tool tasks |
| retry_backoff_policy | Logic for delayed retries of failed tasks |
| runtime_metrics_enabled | Toggle for real-time execution performance metrics collection |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41504)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
