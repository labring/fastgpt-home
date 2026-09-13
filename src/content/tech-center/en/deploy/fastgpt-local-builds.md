---
title: Perform FastGPT Builds for Local Development
slug: /en/deploy/fastgpt-local-builds
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/dev
source_type: Official documentation
---

# Perform FastGPT Builds for Local Development

## Recommended Build Approach
Docker is the recommended method for building FastGPT, as it standardizes the build environment and automates all required setup and dependency installation steps. This approach eliminates manual configuration overhead and ensures consistent build results across host systems.

## Docker Build Commands
Two official Docker build workflows are provided, with optional regional proxy support. All commands use the Dockerfile located at `./projects/app/Dockerfile`, tag the resulting container image as `fastgpt`, and require the `name` build argument set to `app`.

### Unproxied Build
```bash
docker build -f ./projects/app/Dockerfile -t fastgpt . --build-arg name=app
```

### Taobao Proxy Enabled Build
For builds in regions with limited access to standard package repositories, use the Taobao proxy configuration:
```bash
docker build -f ./projects/app/Dockerfile -t fastgpt . --build-arg name=app --build-arg proxy=taobao
```
The `--build-arg proxy=taobao` flag enables use of Taobao's public package mirrors to accelerate dependency retrieval during the build process.

## Manual Build Alternative
If Docker is not available on your host system, you can perform a manual build by executing all run-stage commands directly from the `./projects/app/Dockerfile`. This approach requires manually replicating every step defined in the Dockerfile's run stages, including dependency installation, environment configuration, and application compilation. This method is explicitly not recommended, as it carries a high risk of configuration errors and inconsistent build outcomes.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/dev)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
