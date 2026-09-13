---
title: Configure Redis for FastGPT Self-Hosted Upgrades
slug: /en/deploy/fastgpt-redis-upgrade-configuration
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/494
source_type: 官方文档
---

# Configure Redis for FastGPT Self-Hosted Upgrades

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Redis Setup Requirements for FastGPT Upgrades
This document covers mandatory Redis configuration for self-hosted FastGPT version upgrades. Redis provides temporary and cached data storage required for both the `fastgpt` and `fastgpt-pro` core services. All configuration workflows must define the `REDIS_URL` environment variable for each of these two services to ensure post-upgrade functionality.

## Docker Deployment Configuration
For Docker-based self-hosted FastGPT deployments:
1. Reference the latest official `docker-compose.yml` file to integrate required Redis configuration.
2. Add a dedicated Redis container service to the compose file.
3. Locate the environment variable blocks for both the `fastgpt` and `fastgpt-pro` services.
4. Set the `REDIS_URL` environment variable for each service, pointing to the locally deployed Redis container instance.

## Sealos Deployment Configuration
For Sealos-hosted FastGPT deployments, follow this structured workflow:
1. Navigate to the Database section of your Sealos cluster dashboard.
2. Create a new `redis` database instance.
3. Copy the pre-generated internal connection URL for the newly created Redis database.
4. Navigate to the environment variable configuration panels for both the `fastgpt` and `fastgpt-pro` services.
5. Assign the copied internal connection URL as the value for the `REDIS_URL` environment variable for each service.
Annotated supporting screenshots are available to illustrate each step of this workflow.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/494)
