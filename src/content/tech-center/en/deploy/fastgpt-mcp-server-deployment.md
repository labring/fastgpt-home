---
title: Deploy FastGPT MCP Server for Self-Hosted Upgrades
slug: /en/deploy/fastgpt-mcp-server-deployment
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/496
source_type: 官方文档
---

# Deploy FastGPT MCP Server for Self-Hosted Upgrades

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This document provides standardized deployment instructions for the FastGPT MCP Server service, aligned with official FastGPT v4.9.6 specifications.

### Docker Compose Deployment
Add the dedicated `fastgpt-mcp-server` service block to your existing `docker-compose.yml` file. Use the exact configuration provided below:
```yml
fastgpt-mcp-server:
  container_name: fastgpt-mcp-server
  image: ghcr.io/labring/fastgpt-mcp_server:v4.9.6
  ports:
    - 3005:3000
  networks:
    - fastgpt
  restart: always
  environment:
    - FASTGPT_ENDPOINT=http://fastgpt:3000
```
This service block defines a persistent, network-connected container for the MCP server, with host port 3005 exposed for external service access.

### Sealos Cloud Deployment
For deployments managed via Sealos, follow these exact steps:
1. Navigate to the `App Management` dashboard.
2. Create a new application with the name `fastgpt-mcp-server`.
3. Set the application container image to `ghcr.io/labring/fastgpt-mcp_server:v4.9.6`.
4. Configure the required environment variable `FASTGPT_ENDPOINT` using your organization’s official FastGPT access URL.

### Key Configuration Parameters
The following table lists all mandatory and critical parameters for FastGPT MCP Server deployment, as specified in the official documentation:
| Parameter | Required | Default Value | Purpose |
|-----------|----------|---------------|---------|
| `container_name` | Yes | `fastgpt-mcp-server` | Unique identifier for the MCP server container |
| `image` | Yes | `ghcr.io/labring/fastgpt-mcp_server:v4.9.6` | Pinned official container image for FastGPT MCP Server v4.9.6 |
| `ports` | Yes | `3005:3000` | Maps host port 3005 to container port 3000 for service communication |
| `networks` | Yes | `fastgpt` | Attaches the container to the shared FastGPT network for core service integration |
| `restart` | Yes | `always` | Configures automatic container restart on failure or host reboot |
| `FASTGPT_ENDPOINT` | Yes | `http://fastgpt:3000` (Docker) / Custom URL | Specifies the endpoint for the core FastGPT service to enable MCP server connectivity |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/496)
