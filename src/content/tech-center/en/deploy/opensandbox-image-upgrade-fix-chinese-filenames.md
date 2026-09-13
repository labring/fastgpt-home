---
title: Upgrade OpenSandbox to Fix Chinese File Downloads
slug: /en/deploy/opensandbox-image-upgrade-fix-chinese-filenames
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152
source_type: Official documentation
---

# Upgrade OpenSandbox to Fix Chinese File Downloads

## Purpose of This Upgrade
This document covers required updates for OpenSandbox container images in self-hosted FastGPT deployments where OpenSandbox is enabled. The specified image upgrades resolve a bug that blocked downloading files with Chinese language filenames. For full OpenSandbox configuration details for your FastGPT deployment, see [OpenSandbox Configuration](../../config/sandbox/opensandbox).

## Required Updated Container Images
The following OpenSandbox images must be updated to the specified versions to apply the fix:
| Container Image          | Target Version |
|--------------------------|----------------|
| `opensandbox/server`     | `v0.2.1`       |
| `opensandbox/execd`      | `v1.0.21`      |
| `opensandbox/egress`     | `v1.1.4`       |

## Upgrade Execution Steps
Follow these steps to complete the image upgrade:
1.  Confirm OpenSandbox is enabled in your FastGPT deployment configuration.
2.  Pull each updated OpenSandbox image using your container runtime. Example Docker commands:
    ```bash
    docker pull opensandbox/server:v0.2.1
    docker pull opensandbox/execd:v1.0.21
    docker pull opensandbox/egress:v1.1.4
    ```
3.  Restart the OpenSandbox services linked to each updated image to use the new container versions. Depending on your deployment setup (e.g., Docker Compose, Kubernetes), this may involve restarting relevant service definitions or redeploying associated pods.
4.  Confirm the new images are in use by checking your container runtime’s image list or service status.

## Post-Upgrade Validation
After restarting services, validate the fix by downloading a file with a Chinese filename. Confirm the download completes without errors, verifying the resolved issue is no longer present. If you encounter problems, review the linked OpenSandbox Configuration documentation for setup and troubleshooting guidance.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
