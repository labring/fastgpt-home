---
title: Deploy ChatGLM2 for FastGPT via Docker
slug: /en/deploy/chatglm2-docker-deployment-fastgpt
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2
source_type: Official documentation
---

# Deploy ChatGLM2 for FastGPT via Docker

## Image and Port Specifications
Two official container images are provided for ChatGLM2 deployment. The global public image is `stawky/chatglm2:latest`. Users in mainland China can use the accelerated China mirror image: `registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/chatglm2:latest`. The container listens on internal port 6006 by default; this port must be mapped to a host port to enable external connectivity for FastGPT integration.

## Security Token Configuration
A default security token is pre-configured for the container: `[REDACTED_CREDENTIAL]`. This token functions as the channel key when integrating the ChatGLM2 model with OneAPI. If a custom security token is required, it can be set using the `sk-key` environment variable during container deployment, following standard Docker environment variable passing procedures.

## Step-by-Step Deployment Workflow
1.  Pull the selected container image. For global deployments:
    ```bash
    docker pull stawky/chatglm2:latest
    ```
    For mainland China users:
    ```bash
    docker pull registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/chatglm2:latest
    ```
2.  Launch the container with the required port mapping. To use the default pre-configured security token, run:
    ```bash
    docker run -d -p 6006:6006 stawky/chatglm2:latest
    ```
3.  To specify a custom security token instead of the default value, add the environment variable flag to the run command:
    ```bash
    docker run -d -p 6006:6006 -e sk-key=your-custom-security-token stawky/chatglm2:latest
    ```
Replace `your-custom-security-token` with your desired token value. The container will now run the ChatGLM2 model, accessible via the mapped host port 6006 for FastGPT integration.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
