---
title: FastGPT 4.15.0 Environment Variable Upgrade Changes
slug: /en/deploy/fastgpt-4150-env-upgrade-changes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: Official documentation
---

# FastGPT 4.15.0 Environment Variable Upgrade Changes

This page covers environment variable changes for FastGPT 4.15.0 self-hosted deployments, including mandatory validation steps, new configuration options, and migration details for core services, code sandbox, and the open-source edition.

## Core Service (fastgpt-app/pro) Updates
v4.15.0 introduces stricter environment variable validation for fastgpt-app and fastgpt-pro. First, validate these mandatory shared variables, which must have identical values across both services:
- `AES256_SECRET_KEY`: Encryption key
- `FILE_TOKEN_KEY`: File token key
- `INVOKE_TOKEN_SECRET`: JWT secret for invoke callbacks, minimum 32 characters

A new required environment variable is now mandatory:
- `SSE_MCP_SERVER_PROXY_ENDPOINT`: SSE MCP Server address, leave empty if SSE functionality is not used.

Optional environment variables have predefined defaults and do not require configuration unless customization is needed:
| Variable | Default Value | Description |
| --- | --- | --- |
| `PARSE_FILE_WORKERS` | 10 | File parsing worker concurrency |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 | File parsing timeout in seconds |
| `HTML_TO_MARKDOWN_WORKERS` | 10 | HTML-to-Markdown worker concurrency |
| `TEXT_TO_CHUNKS_WORKERS` | 10 | Text chunking worker concurrency |
| `SYNC_INDEX` | true | Automatically sync MongoDB indexes, use boolean strings only |
| `TRUSTED_PROXY_ENABLE` | false | Enable trusted reverse proxy client IP verification |
| `TRUSTED_PROXY_IPS` | (empty) | Trusted reverse proxy IP/CIDR list, comma or whitespace separated, only active when `TRUSTED_PROXY_ENABLE=true` |
| `SYSTEM_MAX_STRING_LENGTH_M` | 100 | Maximum string length for synchronous system variable replacement, range 1-100 |
| `MAX_FOLDER_DEPTH` | 4 | Maximum folder depth, range 2-20 |
| `WORKFLOW_MAX_LOOP_TIMES` | 100 | Maximum input array length for Loop/Parallel nodes |
| `WORKFLOW_PARALLEL_MAX_CONCURRENCY` | 10 | Parallel node concurrency limit, clamped to [5, 100] |

## Code Sandbox Configuration Updates
Code Sandbox adds security-focused environment variables and supports grouped run queueing via `queueId`. Full default variable set is as follows:
| Variable | Default | Description |
| --- | --- | --- |
| `SANDBOX_API_MAX_BODY_MB` | 8 | Maximum `/sandbox` API JSON body size, including `variables`, in MB |
| `SANDBOX_MAX_OUTPUT_MB` | 10 | Maximum code execution output JSON size, including return values and logs, in MB |
| `CHECK_INTERNAL_IP` | true | Enables internal IP checks for sandbox network requests to reduce SSRF risk |
| `SANDBOX_MAX_TIMEOUT` | 60000 | Code execution timeout in milliseconds |
| `SANDBOX_MAX_MEMORY_MB` | 256 | Sandbox memory limit in MB, with 50 MB reserved for overhead |
| `SANDBOX_POOL_SIZE` | 20 | Number of pre-warmed JS/Python workers |
| `SANDBOX_REQUEST_MAX_COUNT` | 30 | Maximum network requests allowed per code execution |
| `SANDBOX_REQUEST_TIMEOUT` | 60000 | Network request timeout from inside the sandbox, in milliseconds |
| `SANDBOX_REQUEST_MAX_RESPONSE_MB` | 10 | Maximum sandbox network request response body size in MB |
| `SANDBOX_REQUEST_MAX_BODY_MB` | 5 | Maximum sandbox network request body size in MB |
| `SANDBOX_QUEUE_ID_CONCURRENCY` | Empty | Number of concurrent requests with matching `queueId` for grouped queueing |

## Open-Source Edition Configuration Migration
The open-source edition no longer uses the `config.json` configuration file. All previously file-based settings are now available as environment variables. After removing any existing `config.json` volume mounts, add these variables as needed:
- `CUSTOM_PDF_PARSE_URL`: Custom PDF parsing service URL
- `CUSTOM_PDF_PARSE_KEY`: Custom PDF parsing service key
- `DOC2X_KEY`: Doc2x PDF parsing service key
- `TEXTIN_APP_ID`: TextIn service App ID
- `TEXTIN_SECRET_CODE`: TextIn service Secret Code
- `HNSW_EF_SEARCH` (default 100): hnsw ef_search parameter for vector search (PG / OB / OpenGauss only)
- `HNSW_MAX_SCAN_TUPLES` (default 100000): Maximum vector scan tuple count (PG only)
- `DATASET_PARSE_MAX_PROCESS` (default 10): Maximum Dataset file parsing queue concurrency
- `VECTOR_MAX_PROCESS` (default 10): Maximum vector indexing queue concurrency
- `QA_MAX_PROCESS` (default 10): Maximum Q&A split queue concurrency
- `VLM_MAX_PROCESS` (default 10): Maximum vision-language model processing queue concurrency

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
