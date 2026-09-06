---
title: Configure FastGPT Object Storage Access Modes
slug: /en/deploy/fastgpt-object-storage-access-modes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/object-storage
source_type: Official documentation
---

# Configure FastGPT Object Storage Access Modes

## Core Object Storage Access Behavior
All FastGPT file uploads route exclusively through the FastGPT backend proxy, regardless of selected access mode. For external file downloads, all generated URLs are FastGPT short links; FastGPT will no longer return direct object storage presigned URLs for public client access. This standardizes download link handling across all supported object storage integrations.

## Configurable Download Modes
The `STORAGE_DOWNLOAD_URL_MODE` environment variable controls download traffic routing, with two available modes and a default value of `short-proxy`. The following table details each mode’s behavior and requirements:

| Mode               | Behavior                                                                 | Required Deployment Setup                          |
|---------------------|--------------------------------------------------------------------------|--------------------------------------------------|
| `short-proxy`       | FastGPT validates the associated short link, then proxies the full file stream from object storage to the requesting client. | No public object storage endpoint required       |
| `short-redirect`    | FastGPT validates the short link, then redirects clients to a short-lived object storage or CDN URL. File transfer traffic bypasses the FastGPT backend entirely. | Public object storage endpoint required |

## Self-Hosted Storage Configuration Requirements
When running a self-hosted MinIO instance and using the `short-redirect` access mode, you must configure the `STORAGE_EXTERNAL_ENDPOINT` environment variable. This variable provides the public-facing endpoint needed to generate valid redirect URLs, enabling direct client access to stored files without FastGPT proxying file traffic. No additional mandatory configuration is needed for `short-proxy` mode with self-hosted MinIO, or for any mode with other supported object storage providers beyond standard initial setup.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/object-storage)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
