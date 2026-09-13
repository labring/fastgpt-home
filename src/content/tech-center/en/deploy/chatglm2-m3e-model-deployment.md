---
title: Deploy ChatGLM2-M3E Custom Model Image for FastGPT
slug: /en/deploy/chatglm2-m3e-model-deployment
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2-m3e
source_type: Official documentation
---

# Deploy ChatGLM2-M3E Custom Model Image for FastGPT

## Available Container Images
Two pre-built container images are provided for this custom model deployment. The primary public image is `stawky/chatglm2-m3e:latest`. For users in mainland China with limited international network access, an official mirrored image is hosted at `registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/chatglm2-m3e:latest`. Pull the appropriate image for your environment using the standard Docker pull command, substituting the correct image name as needed.

## Core Configuration Parameters
All required and configurable parameters for this model container are defined below:
| Parameter | Default Value | Usage Notes |
|-----------|---------------|-------------|
| Exposed Port | 6006 | Fixed port for API communication between the model container and FastGPT platform |
| Default Security Token | `[REDACTED_CREDENTIAL]` | Static token that functions as the channel key when integrating with OneAPI |
| Custom Token Override | `sk-key` | Environment variable used to set a unique security token, replacing the default value |

## Full Deployment Command
A complete Docker run command for deploying the model is shown below. Adjust the image name and custom token to match your environment:
```bash
docker run -d \
  --name chatglm2-m3e \
  -p 6006:6006 \
  -e sk-key=your-custom-token \
  stawky/chatglm2-m3e:latest
```
If using the China mainland mirrored image, replace the final image argument with `registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/chatglm2-m3e:latest`. Omit the `-e` flag entirely to use the default security token, though using a custom token is recommended for secure deployments. After starting the container, confirm it is running with `docker ps` and validate connectivity to the API endpoint on port 6006 to ensure successful deployment.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2-m3e)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
