---
title: FastGPT 4.16.0 Bug Fix Documentation
slug: /en/deploy/fastgpt-4160-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160
source_type: 官方文档
---

# FastGPT 4.16.0 Bug Fix Documentation

This document outlines all resolved bugs included in the FastGPT 4.16.0 self-hosted upgrade, targeted at engineers and technical decision makers managing FastGPT deployments. All fixes are sourced directly from the official 4.16.0 upgrade documentation.

### Core Sandbox & Runtime Fixes
This section addresses stability and security improvements for agent sandbox environments and cross-service operations:
- Fixed OpenSandbox resource release and reuse errors after session termination
- Resolved state race conditions and duplicate operations during Agent Sandbox creation, restoration, and runtime upgrades
- Corrected failed writes to nested directories when parent directories did not exist
- Eliminated duplicate HTTP headers in MCP SSE mode
- Fixed unencrypted Agent V2 system tool keys

### UI & Workflow Configuration Fixes
This section resolves usability and configuration errors across agent and workflow interfaces:
- Corrected number inputs switching to regular text fields when toggling between agent-generated and manual input modes
- Fixed string inputs incorrectly rendered as dropdown selectors
- Removed incorrect inclusion of the JSON Editor in Workflow tool configuration panels
- Fixed misdisplayed tool execution errors in both Agent and Workflow tool interfaces
- Prevented uninstalled system tools from appearing in the public system tool list
- Set default Agent/Agent V2 version selection to the latest available version automatically
- Restored correct default input mode for dynamic parameters in legacy Workflow HTTP tools
- Fixed missing initial configuration labels caused by unloaded Workflow translations during app creation
- Eliminated duplicate rendering of Workflow tool parameters
- Resolved file variable upload failures after an app has been published
- Fixed failed file uploads for shared Workflow tool parameters

### Storage & Sensitive Data Fixes
This section covers file storage, parsing, and data security fixes:
A tabulated summary of resolved S3-hosted file handling issues:
| Asset Category | Resolved Failure Scenario |
|----------------|---------------------------|
| Embedded images | Fixed 404 parse errors caused by malformed S3 object keys for files with spaces in their names |
| All S3-hosted files | Corrected upload, parsing, preview, and download failures for files with special characters including `%`, `#`, `?`, and slashes in keys or filenames |
Additionally, the upgrade added missing sensitive-data filtering for system default models, preventing exposure of model API keys, request URLs, and internal configuration in system initialization responses.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160)
