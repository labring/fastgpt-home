---
title: Add Sandbox Container to Docker FastGPT Deployment
slug: /en/deploy/fastgpt-docker-sandbox-setup
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/482
source_type: 官方文档
---

# Add Sandbox Container to Docker FastGPT Deployment

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Official Reference Configuration File
The official docker-compose configuration for Docker-based FastGPT deployments is available at https://github.com/labring/FastGPT/blob/main/document/public/deploy/docker/main/global/docker-compose.pg.yml. Users should pull the latest version of this file to use as a reference for all required modifications.

## Mandatory Configuration Changes
Two core updates are required to integrate the sandbox container into an existing Docker FastGPT deployment:
1. Add a new dedicated `sandbox` container service to the deployment’s docker-compose configuration.
2. Add the `SANDBOX_URL` environment variable to both the standard `fastgpt` container and the commercial `fastgpt-pro` container, to enable communication between the main services and the sandbox.

## Step-by-Step Implementation
Follow these structured steps to complete the setup:
1. Download the latest version of the official `docker-compose.pg.yml` file to your Docker deployment host machine.
2. Edit the downloaded file to include the pre-defined `sandbox` container service block from the reference file.
3. Locate the environment variable sections for the `fastgpt` and `fastgpt-pro` containers, then add the `SANDBOX_URL` variable configured to point to the internal network address of the new sandbox container.
4. Verify that the sandbox container’s network ports are not bound to public network interfaces, to align with security guidelines.
5. Apply the updated configuration to launch the sandbox container and reload the core FastGPT services.

## Security Guidance
The sandbox container does not include built-in credential verification, so exposing it to public networks is not recommended. All traffic to the sandbox container should be restricted to internal FastGPT service networks only.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/482)
