---
title: Configure FastGPT Shared App Databases, Cache, and Vector Stores
slug: /en/deploy/fastgpt-shared-app-storage-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Shared App Databases, Cache, and Vector Stores

## Overview
This reference covers environment variables for configuring shared application storage, cache, and vector database systems for self-hosted FastGPT deployments. These settings define connectivity to core data layers and operational thresholds for streaming session tracking.

## Core Storage Parameter Table
| Variable                                       | Default                                     | Description                                                                                              |
| ---------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `REDIS_URL`                                    | `redis://default:mypassword@localhost:6379` | Redis connection URL.                                                                                    |
| `STREAM_RESUME_TTL_SECONDS`                    | `300`                                       | TTL for an active stream resume mirror, in seconds.                                                      |
| `STREAM_RESUME_POST_COMPLETE_TTL_SECONDS`      | `30`                                        | Shortened TTL after a stream completes, in seconds.                                                      |
| `STREAM_RESUME_REDIS_MAXMEMORY_RATIO`          | `0.5`                                       | When Redis used memory divided by `maxmemory` reaches this ratio, new stream resume mirrors are skipped. |
| `STREAM_RESUME_REDIS_MEMORY_CHECK_INTERVAL_MS` | `5000`                                      | Redis memory watermark cache duration, in milliseconds.                                                  |
| `MONGODB_URI`                                  | Local MongoDB example URL                   | Main business MongoDB connection URL.                                                                    |
| `MONGODB_LOG_URI`                              | Same example as `MONGODB_URI`               | MongoDB connection URL for logs. If unset, it can reuse the main database.                               |
| `VECTOR_VQ_LEVEL`                              | `32`                                        | Vector quantization level. Supported ranges depend on the vector store.                                  |
| `PG_URL`                                       | Empty                                       | PostgreSQL/pgvector connection URL.                                                                      |
| `OCEANBASE_URL`                                | Empty                                       | OceanBase vector store connection URL.                                                                   |
| `SEEKDB_URL`                                   | Empty                                       | SeekDB vector store connection URL.                                                                      |
| `MILVUS_ADDRESS`                               | Empty                                       | Milvus/Zilliz address.                                                                                   |
| `MILVUS_TOKEN`                                 | Empty                                       | Milvus/Zilliz access token.                                                                              |
| `OPENGAUSS_URL`                                | Empty                                       | openGauss vector store connection URL.                                                                   |

## Redis Stream Resume Settings
A subset of these variables manages temporary tracking of active and completed streaming sessions using Redis. The default time-to-live (TTL) for active stream resume mirrors is 300 seconds, which is shortened to 30 seconds once a stream completes. To mitigate Redis memory exhaustion, a default memory ratio threshold of 0.5 is applied: when Redis used memory divided by the configured maxmemory reaches this value, new stream resume mirrors are skipped. The system checks Redis memory watermarks every 5000 milliseconds to update this threshold status.

## Vector Store and Secondary Database Configuration
This section details variables for connecting to supported vector databases and a dedicated MongoDB instance for logging. The `VECTOR_VQ_LEVEL` sets the vector quantization level, with supported ranges dependent on the selected vector store. All vector store connection variables default to empty, so they must be explicitly configured when using a dedicated vector database. The `MONGODB_LOG_URI` can reuse the main MongoDB connection string if a separate log database is not deployed.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
