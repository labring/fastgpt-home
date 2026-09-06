---
title: Install and Configure MinerU for FastGPT Parsing
slug: /en/deploy/mineru-installation-fastgpt
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/mineru
source_type: Official documentation
---

# Install and Configure MinerU for FastGPT Parsing

## MinerU Integration Overview
The MinerU parsing service for FastGPT is distributed via a pre-built Docker container, eliminating manual dependency setup. The service operates in pipeline mode with built-in parallelization, which automatically creates multiple processing processes based on the number of available GPUs to handle concurrent PDF uploads. This design optimizes throughput for batch PDF processing workflows integrated with FastGPT.

## Quick Docker Installation Steps
Follow these exact steps to deploy the MinerU parsing service:
1. Pull the supported MinerU Docker image using the official repository:
   ```bash
   docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
   ```
2. Create and start the service container with the required configuration:
   ```bash
   docker run --gpus all -itd -p 7231:8001 --name mode_pdf_minerU crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
   ```
   This command enables full GPU access, runs the container in detached interactive mode, maps host port 7231 to the container’s internal service port 8001, and assigns a fixed container name for easy management.
3. Update your FastGPT configuration file to include the deployed service URL. The service is accessible at `http://localhost:7231` for local deployments, or `http://[host-server-ip]:7231` for remote network access.

## Key Container Configuration Parameters
The following table lists the critical parameters used in the deployment command, all sourced from official FastGPT MinerU documentation:
| Parameter | Value/Flag | Purpose |
|-----------|------------|---------|
| GPU Access | `--gpus all` | Grants full GPU access to enable parallel PDF processing |
| Port Mapping | `-p 7231:8001` | Maps host port 7231 to the container’s internal service port 8001 |
| Container Name | `--name mode_pdf_minerU` | Assigns a fixed, human-readable name to the service container |
| Image Version | `v1` | Specifies the supported, validated version of the MinerU Docker image |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/mineru)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
