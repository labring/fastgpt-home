---
title: Configure AWS S3 for FastGPT Storage
slug: /en/deploy/fastgpt-aws-s3-storage-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/object-storage
source_type: Official documentation
---

# Configure AWS S3 for FastGPT Storage

## Overview
AWS S3 storage integration for FastGPT uses S3-compatible environment variables identical to those used for MinIO. For production deployments, you must pre-create two dedicated buckets: one public and one private. The public bucket must be configured with public-read access permissions, or restricted access via CloudFront or a custom domain, per your access control requirements.

## Configuration Reference
The following environment variables control AWS S3 storage behavior for FastGPT. All required variables must be set explicitly; optional variables use the listed default values if omitted.

| Environment Variable                | Required | Default Value | Example Value                          |
|--------------------------------------|----------|---------------|----------------------------------------|
| `STORAGE_VENDOR`                     | Yes      | None          | `aws-s3`                                 |
| `STORAGE_REGION`                     | Yes      | None          | `ap-southeast-1`                         |
| `STORAGE_ACCESS_KEY_ID`              | Yes      | None          | `your_access_key`                        |
| `STORAGE_SECRET_ACCESS_KEY`          | Yes      | None          | `your_secret_key`                        |
| `STORAGE_PUBLIC_BUCKET`              | Yes      | None          | `fastgpt-public`                         |
| `STORAGE_PRIVATE_BUCKET`             | Yes      | None          | `fastgpt-private`                        |
| `STORAGE_S3_ENDPOINT`                | Yes      | None          | `https://s3.ap-southeast-1.amazonaws.com`|
| `STORAGE_S3_FORCE_PATH_STYLE`        | No       | `false`       | `false`                                  |
| `STORAGE_S3_MAX_RETRIES`             | No       | `3`           | `3`                                      |

## Full Example Configuration
The complete set of environment variables for AWS S3 storage is shown below. Replace example values with your actual credentials and bucket details:
```dotenv
STORAGE_VENDOR=aws-s3
STORAGE_REGION=ap-southeast-1
STORAGE_ACCESS_KEY_ID=your_access_key
STORAGE_SECRET_ACCESS_KEY=your_secret_key
STORAGE_PUBLIC_BUCKET=fastgpt-public
STORAGE_PRIVATE_BUCKET=fastgpt-private
STORAGE_S3_ENDPOINT=https://s3.ap-southeast-1.amazonaws.com
STORAGE_S3_FORCE_PATH_STYLE=false
STORAGE_S3_MAX_RETRIES=3
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/object-storage)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
