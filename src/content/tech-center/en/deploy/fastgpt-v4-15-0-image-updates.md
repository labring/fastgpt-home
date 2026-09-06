---
title: Update FastGPT Container Image Tags for v4.15.0
slug: /en/deploy/fastgpt-v4-15-0-image-updates
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: Official documentation
---

# Update FastGPT Container Image Tags for v4.15.0

## Image Update Overview
This document outlines the required container image version updates for self-hosted FastGPT deployments targeting the v4.15.0 release. All specified image tags must be applied to ensure compatibility with the new release, with no unlisted changes required for this upgrade.

## Mandatory Image Tag Reference
The following core and auxiliary FastGPT images require updated tags to complete the upgrade:
| Container Image Name         | Required Tag |
|-------------------------------|--------------|
| fastgpt-app                   | v4.15.0      |
| fastgpt-pro                   | v4.15.0      |
| fastgpt-code-sandbox          | v4.15.0      |
| fastgpt-plugin                | v1.0.0       |
| aiproxy                       | v0.6.5       |

To retrieve these updated images, use standard container runtime pull commands. For example, using Docker:
```bash
docker pull fastgpt/fastgpt-app:v4.15.0
docker pull fastgpt/fastgpt-pro:v4.15.0
docker pull fastgpt/fastgpt-code-sandbox:v4.15.0
docker pull fastgpt/fastgpt-plugin:v1.0.0
docker pull fastgpt/aiproxy:v0.6.5
```

## Optional Sandbox Image Updates
If your deployment enables the `opensandbox` configuration parameter, additional sandbox-related images must be updated to their specified tags:
| Container Image Name                 | Required Tag |
|---------------------------------------|--------------|
| fastgpt-agent-sandbox-proxy           | v0.2.0       |
| fastgpt-agent-sandbox                 | v0.2.0       |

Pull these images with the following Docker commands:
```bash
docker pull fastgpt/fastgpt-agent-sandbox-proxy:v0.2.0
docker pull fastgpt/fastgpt-agent-sandbox:v0.2.0
```

After pulling the updated images, restart your FastGPT deployment services to apply the new container versions. No additional configuration changes are required beyond updating the image tags in your deployment manifest, such as a `docker-compose.yml` or Kubernetes deployment file.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
