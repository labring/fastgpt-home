---
title: Set Up FastGPT Local Development Dependencies
slug: /en/deploy/fastgpt-local-development-dependencies
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/dev
source_type: Official documentation
---

# Set Up FastGPT Local Development Dependencies

## Prerequisite for Local Development Startup
Before initiating the FastGPT local development environment, stop any currently running local FastGPT Docker containers. This critical preliminary step prevents port conflicts that would prevent the development stack from binding to required network ports, ensuring a smooth startup process without unexpected interruptions.

## Launch FastGPT Development Dependencies
To start the core dependencies required for local development, first navigate to the dedicated development deployment directory. Run the following command to change your working directory to the FastGPT development deployment path:
```bash
cd FastGPT/deploy/dev
```
Once in the correct directory, execute the standard Docker Compose command to launch all required services in detached mode. Detached mode allows the dependency services to run in the background, freeing your active terminal for other development tasks:
```bash
docker compose up -d
```

## Critical Deployment Warnings
Two key configuration notes are required to avoid common deployment issues when setting up the local development environment:
> [!WARNING]
> 1. If you are unable to pull official FastGPT Docker images from the default registry, use the China mirror configuration file by updating the Docker Compose command: `docker compose -f docker-compose.cn.yml up -d`
> 2. For connections to the included MongoDB instance, append the `directConnection=true` parameter to your connection string to successfully connect to the MongoDB replica set.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/dev)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
