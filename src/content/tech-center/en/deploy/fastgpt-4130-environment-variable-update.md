---
title: Update FastGPT Environment Variables for 4.13.0 Upgrade
slug: /en/deploy/fastgpt-4130-environment-variable-update
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4130
source_type: Official documentation
---

# Update FastGPT Environment Variables for 4.13.0 Upgrade

## Environment Variable Update Overview for FastGPT 4.13.0
This upgrade modifies existing environment variable names and adds new required variables to support S3-compatible storage, system plugin management, and core database connections for self-hosted FastGPT deployments. Two separate variable configurations apply: one for the `fastgpt-plugin` service, and another for the core `fastgpt` or commercial `fastgpt-pro` edition services. All variables must be validated against your existing deployment’s infrastructure to avoid service disruption.

## fastgpt-plugin Required Environment Variables
The following variables must be updated or added for the `fastgpt-plugin` service. A complete configuration block is provided below the table:

| Variable Name               | Default Value/Example                          | Description                                                                 |
|------------------------------|------------------------------------------------|-----------------------------------------------------------------------------|
| `S3_EXTERNAL_BASE_URL`       | `https://xxx.com`                              | External public URL for the S3 storage service                               |
| `S3_ENDPOINT`                | `localhost`                                    | Internal hostname of the S3 service                                          |
| `S3_PORT`                    | `9000`                                         | Port number for the S3 service                                              |
| `S3_USE_SSL`                 | `false`                                        | Toggle for SSL encryption in S3 connections                                 |
| `S3_ACCESS_KEY`              | `minioadmin`                                   | S3 access key credential                                                    |
| `S3_SECRET_KEY`              | `minioadmin`                                   | S3 secret key credential                                                    |
| `S3_TOOL_BUCKET`             | `fastgpt-tool`                                 | Bucket for system tool temporary files (public read, private write)          |
| `S3_PLUGIN_BUCKET`           | `fastgpt-plugin`                               | Bucket for system plugin hot-install files (private read/write)              |
| `RETENTION_DAYS`             | `15`                                           | Number of days to retain system tool temporary files                         |
| `MONGODB_URI`                | `mongodb://[REDACTED_CREDENTIAL]@mongo:27017/fastgpt?authSource=admin` | Full MongoDB connection string |
| `REDIS_URL`                  | `redis://default:mypassword@redis:6379`        | Full Redis connection string                                                |

Full configuration example for `fastgpt-plugin`:
```
S3_EXTERNAL_BASE_URL=https://xxx.com
S3_ENDPOINT=localhost
S3_PORT=9000
S3_USE_SSL=false
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_TOOL_BUCKET=fastgpt-tool
S3_PLUGIN_BUCKET=fastgpt-plugin
RETENTION_DAYS=15
MONGODB_URI=mongodb://[REDACTED_CREDENTIAL]@mongo:27017/fastgpt?authSource=admin
REDIS_URL=redis://default:mypassword@redis:6379
```

## Core FastGPT and Commercial Edition Variables
For the `fastgpt` or `fastgpt-pro` commercial edition services, add the following S3-related environment variables. These must align with the S3 configuration used for the `fastgpt-plugin` service to ensure consistent plugin and temporary file handling:

| Variable Name               | Default Value                          | Description                                                                 |
|------------------------------|----------------------------------------|-----------------------------------------------------------------------------|
| `S3_EXTERNAL_BASE_URL`       | *Unset, required*                      | External public URL for the S3 storage service                               |
| `S3_ENDPOINT`                | `localhost`                            | Internal hostname of the S3 service                                          |
| `S3_PORT`                    | `9000`                                 | Port number for the S3 service                                              |
| `S3_USE_SSL`                 | `false`                                | Toggle for SSL encryption in S3 connections                                 |
| `S3_ACCESS_KEY`              | `minioadmin`                           | S3 access key credential                                                    |
| `S3_SECRET_KEY`              | `minioadmin`                           | S3 secret key credential                                                    |
| `S3_PLUGIN_BUCKET`           | `fastgpt-plugin`                       | Bucket for system plugin hot-install files (private read/write)              |

Full minimal configuration example for core services:
```
# S3 external URL
S3_EXTERNAL_BASE_URL=
S3_ENDPOINT=localhost
S3_PORT=9000
S3_USE_SSL=false
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_PLUGIN_BUCKET=fastgpt-plugin
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4130)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
