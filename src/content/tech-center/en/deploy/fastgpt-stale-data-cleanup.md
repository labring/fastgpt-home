---
title: Clear Stale Invalid Data for FastGPT Self-Hosted Instances
slug: /en/deploy/fastgpt-stale-data-cleanup
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/471
source_type: 官方文档
---

# Clear Stale Invalid Data for FastGPT Self-Hosted Instances

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This document covers the official HTTP initialization script for performing stale data cleanup on self-hosted FastGPT deployments. The script targets the removal of unused or invalid dataset-related assets to maintain a clean, efficient FastGPT instance. The automated cleanup process specifically removes invalid files, images, Dataset collections, and vector embeddings.

## Required Configuration Parameters
Before executing the script, you must retrieve two required placeholder values from your FastGPT deployment:
| Parameter Placeholder | Source Location | Purpose |
|-----------------------|---------------|---------|
| `{{rootkey}}` | FastGPT environment variables | Admin-level authentication key required to access FastGPT admin API endpoints |
| `{{host}}` | Deployment configuration | Public domain name of your self-hosted FastGPT instance, used to route the API request correctly |

## Execution Command
Run the following curl command in any terminal session, replacing the placeholder values with your actual deployment details:
```bash
curl --location --request POST 'https://{{host}}/api/admin/clearInvalidData' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
This command sends an authenticated POST request to the FastGPT admin cleanup endpoint. The `rootkey` header validates your admin access, while the `Content-Type` header ensures the request is formatted correctly for the JSON API endpoint. No additional request body is required for this cleanup operation.

## Cleanup Process Details
Upon successful execution of the authenticated request, the FastGPT instance will initiate the background stale data cleanup routine. This routine scans and removes all identified invalid assets, including orphaned files, unused images, unassociated Dataset collections, and stale vector embeddings. No explicit user-facing output is specified for this script, but the cleanup will complete automatically once triggered.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/471)
