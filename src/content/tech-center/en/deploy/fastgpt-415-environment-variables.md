---
title: Add FastGPT 4.15 Environment Configuration Variables
slug: /en/deploy/fastgpt-415-environment-variables
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41501
source_type: Official documentation
---

# Add FastGPT 4.15 Environment Configuration Variables

## Overview
This document details the optional environment variables released with FastGPT 4.15 for self-hosted deployments, supporting the `fastgpt-app` and `fastgpt-pro` services. These variables allow administrators to tune file processing performance, automate database index synchronization, and configure secure reverse proxy client IP validation.

You can add the following dotenv-formatted variables to your `fastgpt-app` and `fastgpt-pro` `.env` files:
```dotenv
# File parsing worker concurrency (optional)
PARSE_FILE_WORKERS=10
# File parsing timeout in seconds (optional)
PARSE_FILE_TIMEOUT_SECONDS=600
# HTML-to-Markdown worker concurrency (optional)
HTML_TO_MARKDOWN_WORKERS=10
# Text chunking worker concurrency (optional)
TEXT_TO_CHUNKS_WORKERS=10
# Automatically synchronize MongoDB indexes. Use a boolean string instead of 0 or 1. (optional)
SYNC_INDEX=true
# Enable trusted reverse proxy client IP validation (optional)
TRUSTED_PROXY_ENABLE=false
# Comma- or whitespace-separated trusted reverse proxy IP/CIDR list. Used only when TRUSTED_PROXY_ENABLE=true. Only X-Forwarded-For/X-Real-IP values from explicitly trusted proxies are used for client IP resolution. (optional)
TRUSTED_PROXY_IPS=
```

## Environment Variable Reference
The following table breaks down each variable for quick lookup:
| Variable Name | Default Value | Description |
| --- | --- | --- |
| `PARSE_FILE_WORKERS` | `10` | Number of concurrent workers for file parsing tasks. |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600` | Timeout duration, in seconds, for file parsing operations. |
| `HTML_TO_MARKDOWN_WORKERS` | `10` | Concurrent workers for converting HTML content to Markdown format. |
| `TEXT_TO_CHUNKS_WORKERS` | `10` | Concurrent workers for splitting raw text into structured processing chunks. |
| `SYNC_INDEX` | `true` | Automatically synchronize MongoDB database indexes. Use boolean string values (`true`/`false`, not `0`/`1`). |
| `TRUSTED_PROXY_ENABLE` | `false` | Enable validation of client IP addresses from trusted reverse proxies. |
| `TRUSTED_PROXY_IPS` | Empty string | Comma- or whitespace-separated list of trusted reverse proxy IPs or CIDR ranges. Only used when `TRUSTED_PROXY_ENABLE` is set to `true`, and restricts client IP resolution to requests from these explicitly trusted proxies. |

## Deployment Steps
1. Locate the `.env` configuration files for the `fastgpt-app` and `fastgpt-pro` services in your self-hosted FastGPT directory.
2. Add any or all of the environment variables from the reference table to the relevant `.env` files. All variables are optional, so only include those aligned with your deployment requirements.
3. Save the modified `.env` files.
4. Restart the `fastgpt-app` and `fastgpt-pro` services to apply the new configuration settings.

> [FastGPT 4.15.01 upgrade notes](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41501)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
