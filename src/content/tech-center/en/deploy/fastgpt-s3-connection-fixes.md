---
title: Fix FastGPT S3 Connection Configuration Issues
slug: /en/deploy/fastgpt-s3-connection-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/deploy/docker
source_type: Official documentation
---

# Fix FastGPT S3 Connection Configuration Issues

S3-compatible object storage is a required component for many FastGPT self-hosted deployments, and misconfiguration of connection parameters often leads to connectivity failures. This page covers targeted fixes for the most common S3 connection issues tied to core environment variables.

## Validate Core Endpoint Parameter
The primary configuration variable for S3 connectivity is `STORAGE_EXTERNAL_ENDPOINT`. This value must be reachable by both end-user clients and the FastGPT service containers. A common misconfiguration is using loopback addresses such as `127.0.0.1` or `localhost`, which will block access from external clients or internal service components.

> Do not use `127.0.0.1`, `localhost`, or other loopback addresses. When deploying via Docker, use your host machine’s static local IP address, or a fixed, publicly resolvable domain name. This prevents 403 errors caused by URL mismatches during object storage signed URL generation.

## Step-by-Step Correct Configuration
Follow these steps to set a valid `STORAGE_EXTERNAL_ENDPOINT`:
1.  Retrieve your host machine’s static local IP address using official system network tools or settings.
2.  Format the endpoint URL correctly for your S3-compatible storage: use `http://<static-ip>:<port>` for non-TLS deployments, or `https://<fixed-domain-name>` for TLS-enabled setups.
3.  Update the `STORAGE_EXTERNAL_ENDPOINT` environment variable in your FastGPT Docker deployment configuration. For example, if using a direct `docker run` command:
    ```bash
    docker run -e STORAGE_EXTERNAL_ENDPOINT=http://192.168.1.50:9000 [additional FastGPT container arguments]
    ```
4.  Restart the FastGPT service containers to apply the updated environment variable.

## Resolve 403 Signature Mismatch Errors
The most frequent error associated with S3 connection issues in FastGPT is the 403 Forbidden error tied to signed object storage URLs. This error occurs when the endpoint used to generate signed URLs does not match the `STORAGE_EXTERNAL_ENDPOINT` value configured for FastGPT. Updating the `STORAGE_EXTERNAL_ENDPOINT` to use a valid static IP or fixed domain will resolve this mismatch. For additional troubleshooting steps, refer to the official object storage configuration guide: [Object Storage Configuration & Common Issues](../config/object-storage.en.mdx)

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/deploy/docker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
