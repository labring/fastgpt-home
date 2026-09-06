---
title: Recommended SeekDB Resource Specifications for FastGPT
slug: /en/deploy/seekdb-resource-specs-fastgpt
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/deploy/docker
source_type: Official documentation
---

# Recommended SeekDB Resource Specifications for FastGPT

## SeekDB Overview
SeekDB is a high-performance vector database integrated for FastGPT self-hosted deployments. It operates over the MySQL protocol and is fully compatible with OceanBase, enabling efficient vector retrieval. Core built-in features include support for 1536-dimensional vector retrieval, a native HNSW index algorithm, batch insert and query rewriting, automatic retry functionality, and built-in connection pool management.

## Recommended Resource Specifications
The following table lists minimum and recommended single-node hardware resources for SeekDB deployments across standard FastGPT workloads:

| Environment                        | Minimum (Single Node) | Recommended  |
| ---------------------------------- | --------------------- | ------------ |
| Testing (reduce compute processes) | 2c4g                  | 2c8g         |
| 1M vector groups                   | 4c8g 50GB             | 4c16g 50GB   |
| 5M vector groups                   | 8c32g 200GB           | 16c64g 200GB |

## Workload Environment Context
Each row in the table corresponds to a specific FastGPT workload scale:
- Testing (reduce compute processes): For non-production testing scenarios, with reduced compute process overhead to minimize resource usage during validation.
- 1M vector groups: For deployments handling up to 1 million vector groups, with baseline and upgraded resource tiers for consistent performance.
- 5M vector groups: For high-scale deployments handling up to 5 million vector groups, with scaled minimum and recommended resources to support sustained workloads.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/deploy/docker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
