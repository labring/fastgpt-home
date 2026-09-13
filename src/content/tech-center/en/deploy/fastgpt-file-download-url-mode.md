---
title: Configure FastGPT File Download URL Mode
slug: /en/deploy/fastgpt-file-download-url-mode
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152
source_type: Official documentation
---

# Configure FastGPT File Download URL Mode

This document details configuration of the file download URL mode for self-hosted FastGPT deployments upgraded to version 4.15.2 or later. FastGPT 4.15.2 introduced the `STORAGE_DOWNLOAD_URL_MODE` environment variable to control how file download URLs are generated and how file transfer traffic is handled for self-hosted instances.

## Available Configuration Parameters
| Parameter Name | Default Value | Description |
|----------------|---------------|-------------|
| `STORAGE_DOWNLOAD_URL_MODE` | `short-proxy` | Controls the method used for generating and serving file download URLs. Two modes are supported. |
| `STORAGE_EXTERNAL_ENDPOINT` | N/A | Required only when using `short-redirect` mode. Must be set to the external public endpoint of your storage service. |

## Configuration Steps
Follow these steps to adjust the file download URL mode for your FastGPT deployment:
1. Locate your FastGPT environment variable configuration: this may be a `.env` file, Docker run command arguments, Kubernetes ConfigMap entries, or another deployment-specific configuration method.
2. Adjust the `STORAGE_DOWNLOAD_URL_MODE` variable to your preferred setting:
   - To retain the default behavior, where file downloads are proxied through the FastGPT application, no changes are required.
   - To use short URLs without routing file traffic through the FastGPT application, set `STORAGE_DOWNLOAD_URL_MODE=short-redirect`.
3. If you selected the `short-redirect` mode, add and configure the `STORAGE_EXTERNAL_ENDPOINT` environment variable with your storage service’s external public URL.
4. Restart all FastGPT application services to apply the updated environment variables.

## Mode Behavior Breakdown
Two distinct modes are available for file download URL handling:
- `short-proxy`: This default mode returns a FastGPT-generated short URL. All file download requests are routed through the FastGPT application, which proxies the file transfer to the underlying storage service.
- `short-redirect`: This mode returns a FastGPT short URL that validates incoming download requests, then redirects the client to a temporary, direct S3/CDN storage URL. This eliminates the need to route file traffic through the FastGPT application, reducing proxy-related overhead for large file transfers. Note that this mode requires the `STORAGE_EXTERNAL_ENDPOINT` variable to be properly configured to ensure valid redirects to your storage service.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
