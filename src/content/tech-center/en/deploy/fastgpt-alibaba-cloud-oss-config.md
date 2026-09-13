---
title: Configure Alibaba Cloud OSS for FastGPT Self-Hosting
slug: /en/deploy/fastgpt-alibaba-cloud-oss-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/object-storage
source_type: Official documentation
---

# Configure Alibaba Cloud OSS for FastGPT Self-Hosting

## Prerequisites and Bucket Setup
Before deploying configuration variables, you must provision two Alibaba Cloud OSS buckets: one public read bucket and one private bucket. Assign public-read permissions to the public bucket, and retain default private permissions for the private bucket. You may use the same Alibaba Cloud Access Key ID and Secret Access Key pair for both buckets, but the bucket names must be distinct. For cross-origin resource sharing (CORS) setup required to allow frontend access to public bucket assets, refer to the official Alibaba Cloud OSS CORS configuration guide.

## Environment Variable Reference
All required and optional configuration parameters are defined via environment variables. Use the table below to map your OSS setup to the correct variables:

| Environment Variable | Description | Default Value | Example |
|---|---|---|---|
| `STORAGE_VENDOR` | Required: Sets the object storage provider to Alibaba Cloud OSS | N/A | `oss` |
| `STORAGE_REGION` | Required: OSS region identifier | N/A | `oss-cn-hangzhou` |
| `STORAGE_ACCESS_KEY_ID` | Required: Alibaba Cloud Access Key ID | N/A | `your_access_key` |
| `STORAGE_SECRET_ACCESS_KEY` | Required: Alibaba Cloud Secret Access Key | N/A | `your_secret_key` |
| `STORAGE_PUBLIC_BUCKET` | Required: Name of the public read OSS bucket | N/A | `fastgpt-public` |
| `STORAGE_PRIVATE_BUCKET` | Required: Name of the private OSS bucket | N/A | `fastgpt-private` |
| `STORAGE_OSS_ENDPOINT` | OSS hostname; use custom domain if `STORAGE_OSS_CNAME` is enabled | `{region}.aliyuncs.com` | `oss-cn-hangzhou.aliyuncs.com` or `your-domain.com` |
| `STORAGE_OSS_CNAME` | Toggles usage of a custom domain for OSS access | `false` | `true` or `false` |
| `STORAGE_OSS_SECURE` | Enables TLS encryption; disable if your custom domain has no SSL certificate | `false` | `true` or `false` |
| `STORAGE_OSS_INTERNAL` | Optional: Use Alibaba Cloud internal network to reduce bandwidth costs | `disabled` | `true` or `false` |

## Full Configuration Example
A complete set of environment variables for a standard OSS setup is shown below:
```dotenv
STORAGE_VENDOR=oss
STORAGE_REGION=oss-cn-hangzhou
STORAGE_ACCESS_KEY_ID=your_access_key
STORAGE_SECRET_ACCESS_KEY=your_secret_key
STORAGE_PUBLIC_BUCKET=fastgpt-public
STORAGE_PRIVATE_BUCKET=fastgpt-private
STORAGE_OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com
STORAGE_OSS_CNAME=false
STORAGE_OSS_SECURE=false
STORAGE_OSS_INTERNAL=false
```

## Optional Internal Network Configuration
The `STORAGE_OSS_INTERNAL` parameter is intended for deployments hosted within Alibaba Cloud infrastructure. Enabling this flag routes all OSS traffic through Alibaba Cloud’s internal network, which eliminates public network bandwidth fees and reduces latency.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/object-storage)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
