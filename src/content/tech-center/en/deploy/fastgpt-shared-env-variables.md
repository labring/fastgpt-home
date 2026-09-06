---
title: Set Up FastGPT Shared Environment Variables
slug: /en/deploy/fastgpt-shared-env-variables
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Set Up FastGPT Shared Environment Variables

## Introduction
This technical page covers shared application and administrator environment variables for self-hosted FastGPT, including required secrets, database configuration, and core deployment settings. These variables standardize configuration across both app and admin workflows, ensuring consistent security and functionality for your FastGPT instance.

## Full Variable Reference
The following table lists all supported shared environment variables, their default values, and official descriptions:

| Variable              | Default            | Description                                                                                                                                             |
| --------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_MAX_LINK`         | `5`                | Maximum connection pool size for MongoDB, PG, OceanBase, openGauss, and other databases.                                                                |
| `SYNC_INDEX`          | `true`             | Whether to create missing MongoDB indexes and remove explicitly declared deprecated indexes at startup. Maintain indexes manually when disabled.        |
| `FILE_TOKEN_KEY`      | None, **required** | Secret for file read and file authorization flows. Must be at least 6 characters.                                                                       |
| `AES256_SECRET_KEY`   | None, **required** | Secret used by AES encryption and decryption. Must be at least 6 characters.                                                                            |
| `INVOKE_TOKEN_SECRET` | None, **required** | JWT secret for Invoke reverse calls. Must be at least 32 characters.                                                                                    |
| `ROOT_KEY`            | `fastgpt_root_key` | Admin API key for the current system. It can call `/api/admin/**` APIs and must be at least 6 characters.                                               |
| `PRO_TOKEN`           | Empty              | Token for FastGPT app server calls to pro/admin internal APIs. It must match the pro/admin configuration and is required when App configures `PRO_URL`. |
| `PRO_URL`             | Empty              | Commercial service URL. When set, App can call Pro APIs, and the domain is allowed by file URL validation.                                              |

## Deployment Best Practices
All variables marked **required** must be configured before launching your FastGPT instance, with enforced minimum length requirements to prevent weak security configurations. For example, `INVOKE_TOKEN_SECRET` requires a minimum of 32 characters, while file and AES secrets require at least 6 characters.

The default `ROOT_KEY` uses a generic default value; replace it with a custom, secure value for production deployments to restrict unauthorized admin API access.

If `PRO_URL` is set, `PRO_TOKEN` must be configured to match your pro/admin setup, as the token validates internal API calls between the app and commercial services.

The `SYNC_INDEX` variable defaults to `true`, which automatically manages MongoDB indexes at startup; disable this only if you intend to manually maintain database indexes. Adjust `DB_MAX_LINK` based on your database server's connection capacity to optimize performance for your deployment size.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
