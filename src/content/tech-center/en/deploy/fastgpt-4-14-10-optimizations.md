---
title: FastGPT 4.14.10 Performance and Configuration Optimizations
slug: /en/deploy/fastgpt-4-14-10-optimizations
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41410
source_type: Official documentation
---

# FastGPT 4.14.10 Performance and Configuration Optimizations

## Workflow Runtime Optimization
This update refines the core workflow runtime logic to reduce overall computational complexity. The optimization lowers resource utilization during active workflow execution while preserving all native FastGPT workflow functionality, supporting more consistent performance across variable workloads.

## Large Variable Computational Safeguards
To prevent thread blocking caused by unregulated high-complexity calculations on large variables, the update adds explicit computational limits for large variable processing. These limits cap resource-intensive variable operations, eliminating unexpected system thread stalls that can occur when handling oversized or highly complex variable datasets. This enhancement improves deployment stability for environments processing large volumes of dynamic variable data.

## Unified Model Configuration Changes
The 4.14.10 update removes two legacy model configuration fields and unifies their functionality under a single "Test Model" flag. The following table outlines the legacy settings and their replacement:
| Legacy Model Configuration Fields | Unified Configuration |
| --- | --- |
| Used for Dataset file processing | "Test Model" |
| Used for question classification | "Test Model" |

Test Models assigned this flag receive a special system identifier, with strict usage restrictions: they may only be utilized in AI chat workflows, and are automatically filtered out of all other operational scenarios including dataset file processing and question classification tasks. All prior per-scenario configuration toggles have been removed from the model settings menu entirely.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41410)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
