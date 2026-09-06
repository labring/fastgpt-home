---
title: Configure FastGPT Supported Object Storage Providers
slug: /en/deploy/fastgpt-object-storage-config-3
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/object-storage
source_type: Official documentation
---

# Configure FastGPT Supported Object Storage Providers

## Supported Object Storage Providers
This guide covers environment variable configuration for all object storage providers supported by FastGPT. The supported providers include self-hosted MinIO, AWS S3, Cloudflare R2, Alibaba Cloud OSS, and Tencent Cloud COS.

## Prerequisite Setup
Complete the following steps prior to deploying FastGPT with your chosen object storage provider, with one exception for local MinIO development:
1. If you are not using local MinIO for development: Create two separate buckets. The first bucket will be referenced using the `STORAGE_PUBLIC_BUCKET` environment variable, and the second will use the `STORAGE_PRIVATE_BUCKET` variable.
2. Generate an access key and corresponding secret key for your storage provider account. This identity will be used by FastGPT to authenticate with the object storage service.
3. Grant the access key associated with your FastGPT deployment read and write permissions on both pre-created buckets. This allows FastGPT to perform all required file operations on the stored assets.
Note: For local MinIO development environments, you do not need to pre-create these two buckets before deployment.

## Core Environment Variables
FastGPT requires two core environment variables to route static file traffic to the correct object storage buckets:
- `STORAGE_PUBLIC_BUCKET`: Specifies the name of the bucket designated for publicly accessible static files hosted via FastGPT.
- `STORAGE_PRIVATE_BUCKET`: Specifies the name of the bucket designated for privately accessible static files hosted via FastGPT.
In addition to these two variables, each supported object storage provider requires provider-specific environment variables to configure connection details such as endpoint URL, access key, and secret key. The exact requirements for these variables vary based on your chosen storage provider.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/object-storage)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
