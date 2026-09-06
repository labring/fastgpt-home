---
title: FastGPT v4.11.1 New Feature Details
slug: /en/deploy/fastgpt-v4111-upgrade-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4111
source_type: 官方文档
---

# FastGPT v4.11.1 New Feature Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This page outlines all new feature additions included in the FastGPT v4.11.1 self-hosted upgrade, tailored for engineering and technical decision-making teams.

## System Tooling & MCP Architecture Updates
Direct toolkit usage for automated tool calls is now natively supported, removing the need for custom wrapper scripts to integrate external tooling into chat workflows. The Model Control Plane (MCP) architecture has been fully rewritten to simplify ongoing maintenance. Following a standard MCP update procedure, all currently active MCP components will automatically apply the new version without requiring manual removal and re-addition of existing configurations.

### MCP Update Step-by-Step
1. Retrieve the latest MCP service package or container image from the official distribution channel
2. Execute the standard service restart command matching your deployment environment (e.g., `docker compose restart mcp` for containerized setups)
3. Validate that all previously configured MCP components remain active and connected without manual re-registration

## Admin & Chat Dashboard Enhancements
The chat log dashboard now supports custom field display, allowing administrators to select and prioritize specific log metadata fields for improved operational visibility. Native account deletion functionality is now available as part of the user management workflow, providing a standardized process for removing inactive or unauthorized user accounts from the self-hosted instance.

## Model & Documentation Updates
The platform now includes official configuration support for the GLM 4.5 series of large language models, with setup parameters aligned to the model's official API specifications. Additionally, the official FastGPT documentation has been migrated to a new framework, improving navigation, search functionality, and organization of self-hosted deployment guides and technical reference materials.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4111)
