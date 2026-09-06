---
title: FastGPT V4.5 PgVector Index Upgrade Guide
slug: /en/deploy/fastgpt-v45-pgvector-index-upgrade
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/45
source_type: 官方文档
---

# FastGPT V4.5 PgVector Index Upgrade Guide

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## PgVector HNSW Index Performance Overview
FastGPT V4.5 introduces native support for PgVector 0.5’s HNSW index, a specialized vector indexing system that dramatically improves dataset search performance. Compared to the previously used IVFFlat index, the HNSW index delivers query speeds 3x to 10x faster, easily achieving millisecond-scale search responses for datasets containing millions of records. A critical tradeoff associated with the HNSW index is slower upfront index construction: on a 4C16G hardware server hosting 5 million dataset records, a `parallel build` takes approximately 48 hours to complete. For detailed parameter configuration for index setup, tuning, and build optimization, reference the official PgVector documentation at https://github.com/pgvector/pgvector.

## Required Database Upgrade Operations
This FastGPT V4.5 upgrade requires targeted database operations to deploy the new HNSW index functionality. All changes must align with the official PgVector 0.5 indexing workflows, as the extension provides the native HNSW index support integrated into FastGPT V4.5. Administrators must ensure their vector database instance runs PgVector 0.5 prior to implementing the new index, as earlier versions do not support HNSW indexing. No additional custom FastGPT-specific configurations are required beyond standard PgVector 0.5 setup steps for vector dataset indexing.

## Index Performance Reference Table
| Index Type | Query Speed Performance | Scale and Hardware Notes | Build Time Estimate |
|---|---|---|---|
| HNSW | 3x to 10x faster than IVFFlat, millisecond-level queries | 4C16G server, 5 million dataset records | `~48 hours` (parallel build) |
| IVFFlat | Legacy slower query speeds | Not specified | Not specified |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/45)
