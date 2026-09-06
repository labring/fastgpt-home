---
title: Configure Cloudflare R2 for FastGPT Object Storage
slug: /en/deploy/cloudflare-r2-fastgpt-object-storage-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/object-storage
source_type: Official documentation
---

# Configure Cloudflare R2 for FastGPT Object Storage

## Cloudflare R2 Configuration Overview
Cloudflare R2 integrates with FastGPT using its S3-compatible API. To set up the integration, follow these core behavioral guidelines first: Set `STORAGE_REGION` to `auto`, and use your Cloudflare account-level S3 endpoint as the value for `STORAGE_S3_ENDPOINT`. FastGPT does not rewrite R2 presigned URLs via the `STORAGE_S3_CDN_ENDPOINT` variable. Private storage objects will use the default `short-proxy` download mode under normal circumstances. The `STORAGE_R2_PUBLIC_ENDPOINT` variable is required only for serving public storage objects.

## Required Environment Variables
All configuration is defined via environment variables. A complete sample configuration is provided below, followed by detailed parameter descriptions:
```dotenv
STORAGE_VENDOR=r2
STORAGE_REGION=auto
STORAGE_S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
STORAGE_R2_PUBLIC_ENDPOINT=https://assets.example.com
STORAGE_ACCESS_KEY_ID=<r2-access-key-id>
STORAGE_SECRET_ACCESS_KEY=<r2-secret-access-key>
STORAGE_PUBLIC_BUCKET=<r2-public-bucket>
STORAGE_PRIVATE_BUCKET=<r2-private-bucket>
STORAGE_S3_FORCE_PATH_STYLE=false
```

| Variable Name | Required | Description |
|---------------|----------|-------------|
| `STORAGE_VENDOR` | Yes | Enables the R2 storage backend |
| `STORAGE_REGION` | Yes | Must be set to `auto` for R2 compatibility |
| `STORAGE_S3_ENDPOINT` | Yes | Account-specific S3 API endpoint for R2 |
| `STORAGE_R2_PUBLIC_ENDPOINT` | Conditional | Required for public objects; must be an HTTPS custom domain bound to the R2 public bucket, with no query parameters |
| `STORAGE_ACCESS_KEY_ID` | Yes | R2 account access key credential |
| `STORAGE_SECRET_ACCESS_KEY` | Yes | R2 account secret access key credential |
| `STORAGE_PUBLIC_BUCKET` | Yes | Name of the pre-created public R2 bucket |
| `STORAGE_PRIVATE_BUCKET` | Yes | Name of the pre-created private R2 bucket |
| `STORAGE_S3_FORCE_PATH_STYLE` | No | Defaults to `false`; no modification is needed for standard R2 setups |

## Production Deployment Requirements
For production deployments, avoid using the rate-limited `r2.dev` development URL, and instead use a custom HTTPS domain bound to your R2 bucket. You must pre-create both the public and private R2 buckets prior to starting the FastGPT service. FastGPT will validate that these buckets exist during startup, and will not automatically create missing buckets.

> [FastGPT public documentation](https://doc.fastgpt.cn/en/self-host/config/object-storage)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
