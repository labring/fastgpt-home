---
title: Deploy M3E Large Model API for FastGPT
slug: /en/deploy/m3e-large-model-api-deployment
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/m3e
source_type: Official documentation
---

# Deploy M3E Large Model API for FastGPT

## Container Image Options
Two official container images are provided for running the M3E large model API. The primary public image is `stawky/m3e-large-api:latest`. For users in mainland China, a mirrored image is available to reduce pull latency: `registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/m3e-large-api:latest`. All images expose a single service port: 6008.

## Configuration Environment Variables
The only required environment variable for deployment sets the security token, which functions as the channel key in OneAPI. The official parameter details are listed below:
| Environment Variable | Default Value | Description |
|----------------------|---------------|-------------|
| `sk-key`             | `[REDACTED_CREDENTIAL]` | Security token used as the channel key in OneAPI |

For alternative methods of passing environment variables to the container, refer to the official Docker documentation.

## Step-by-Step Deployment
1. Pull the selected container image. For the official image:
   ```bash
   docker pull stawky/m3e-large-api:latest
   ```
   For mainland China users, use the mirrored image instead:
   ```bash
   docker pull registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/m3e-large-api:latest
   ```
2. Launch the container with the required port mapping and authentication token. Use the default token or replace it with a custom value:
   ```bash
   docker run -d -p 6008:6008 -e sk-key=[REDACTED_CREDENTIAL] stawky/m3e-large-api:latest
   ```
   Replace the image name in the run command if using the mirrored image, and update the `sk-key` value if a custom security token is required.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/m3e)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
