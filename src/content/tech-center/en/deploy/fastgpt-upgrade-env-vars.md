---
title: Configure FastGPT 4.14.11 Upgrade Environment Variables
slug: /en/deploy/fastgpt-upgrade-env-vars
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41411
source_type: Official documentation
---

# Configure FastGPT 4.14.11 Upgrade Environment Variables

## Overview of Upgrade Environment Variables
This section covers the optional environment variables introduced or modified for FastGPT 4.14.11 self-hosted upgrades. All listed variables have predefined default values, so no changes are required unless you need to customize behavior for your deployment. These variables control two core feature sets: Redis-backed stream resume snapshots for interrupted generative tasks, and workflow parallel concurrency limits to manage resource usage during automated task execution.

## Environment Variable Reference Table
| Variable Name | Default Value | Description |
| --- | --- | --- |
| `STREAM_RESUME_TTL_SECONDS` | 300 | TTL for Redis stream resume snapshots while generating (seconds) |
| `STREAM_RESUME_POST_COMPLETE_TTL_SECONDS` | 30 | Shortened TTL after stream completes, for faster reclamation (seconds) |
| `STREAM_RESUME_REDIS_MAXMEMORY_RATIO` | 0.5 | Stop creating resume snapshots for new requests when Redis used memory / maxmemory reaches this threshold |
| `STREAM_RESUME_REDIS_MEMORY_CHECK_INTERVAL_MS` | 5000 | Cache duration for Redis memory checks (ms), avoids calling INFO MEMORY on every stream request |
| `WORKFLOW_PARALLEL_MAX_CONCURRENCY` | 10 | Upper bound for max concurrency; cannot exceed WORKFLOW_MAX_LOOP_TIMES |

## Step-by-Step Configuration Steps
1. Navigate to your self-hosted FastGPT deployment directory.
2. Open the primary `.env` environment configuration file using a plain-text editor.
3. Add or update any of the environment variables listed in the reference table. Omit variables to retain their default values automatically.
4. Save the updated `.env` file to apply your local configuration changes.
5. Restart all FastGPT backend and frontend services to propagate the new environment variable values across your deployment.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41411)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
