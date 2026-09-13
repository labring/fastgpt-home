---
title: Acquire FastGPT Docker Deployment Configuration Files
slug: /en/deploy/fastgpt-docker-deploy-configs
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/deploy/docker
source_type: Official documentation
---

# Acquire FastGPT Docker Deployment Configuration Files

This document covers three standardized methods to acquire required configuration files for self-hosted FastGPT via Docker, for engineering and technical deployment workflows.

### AI Agent-Assisted Configuration
Automate deployment setup by copying the following reference prompt to your coding agent:
```text
Refer to https://doc.fastgpt.cn/deploy/SKILL.md and deploy FastGPT with Docker for me.
```

### Interactive Script Deployment
Run the base guided deployment command in Linux, macOS, or Windows WSL:
```bash
FASTGPT_DEPLOY_BASE_URL=https://doc.fastgpt.cn bash <(curl -fsSL https://doc.fastgpt.cn/deploy/install.sh)
```
For deployments using custom domains, internal networks, or local addresses, set `FASTGPT_DEPLOY_BASE_URL` to your FastGPT documentation site root or a URL ending in `/deploy` to select the correct download source.

Non-interactive mode requires these mandatory environment variables:
| Variable | Description | Example |
|----------|-------------|---------|
| `FASTGPT_FE_DOMAIN` | Full public access URL for FastGPT | `https://fastgpt.example.com` |
| `FASTGPT_SANDBOX_PROXY_URL` | Sandbox WebSocket access URL | `wss://sandbox-proxy.example.com` |
| `FASTGPT_SANDBOX_PREVIEW_PROXY_URL` | (Version 4.16+) HTTP preview proxy URL | Prompted interactively for older versions |

Interactive mode will automatically prompt for required values based on your target FastGPT version: version 4.15 only asks for the WebSocket URL, while 4.16 adds the HTTP preview URL prompt.

The script automates core deployment setup tasks:
- Downloads the official `docker-compose.yml` file
- Configures externally accessible S3 and MCP addresses
- Generates secure random credentials including the `root` login password, service tokens, app keys, and component passwords
- Detects and updates the host Docker socket mount path in the compose file

After execution, the terminal will print the generated `root` password. Retain the final `docker-compose.yml` file securely, as it contains all generated credentials and is required for future upgrades. To use a local existing compose file, either select the local file option during the script prompt or pass the path via:
```bash
FASTGPT_LOCAL_COMPOSE_PATH=/path/to/docker-compose.yml bash <(curl -fsSL https://doc.fastgpt.cn/deploy/install.sh)
```

### Manual Configuration Download
For pinned deployments to specific `docker-compose.yml` versions, follow this step-by-step workflow:
1. Download the targeted compose file for your database and region. Example command for Pgvector on the China mirror:
   ```bash
   curl -fsSL https://doc.fastgpt.cn/deploy/docker/v4.15/cn/docker-compose.pg.yml -o docker-compose.source.yml
   ```
   Available database and region combinations are listed in the official documentation dropdown.
2. Download the installation script to your server:
   ```bash
   curl -fsSL https://doc.fastgpt.cn/deploy/install.sh -o install.sh
   ```
3. Run the script with your local source compose file to generate the final deployment configuration:
   ```bash
   FASTGPT_LOCAL_COMPOSE_PATH=./docker-compose.source.yml bash install.sh
   ```
The script will copy the source compose file to `docker-compose.yml`, generate required credentials, and configure S3/MCP addresses as needed.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/deploy/docker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
