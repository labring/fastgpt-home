---
title: FastGPT 4912 Upgrade Functional Improvements
slug: /en/deploy/fastgpt-4912-upgrade-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4912
source_type: 官方文档
---

# FastGPT 4912 Upgrade Functional Improvements

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This document details the functional improvements included in the FastGPT 4912 self-hosted upgrade, addressing stability, usability, and integration gaps for self-hosted FastGPT deployments.

### Backend and Dataset Stability Enhancements
This section resolves critical backend and dataset management issues:
1. Password validation now accepts a broader set of special characters, reducing authentication errors for users utilizing non-standard password formats.
2. Full revision of backend dataset chunk parameter calculation eliminates incorrect default value application during automated dataset processing, ensuring consistent and accurate chunking results.
3. Text chunking operations have been migrated to worker threads, preventing main thread blocking during large-scale dataset processing tasks that previously caused UI freezes or request timeouts.
4. Deleting non-existent dataset files no longer triggers failure errors, simplifying batch cleanup workflows for dataset administrators.

### Integration and Tooling Updates
Updates to external tool integrations and SDK compatibility expand functionality:
1. MCP tool calls now use raw schema for invocation, ensuring full completeness of passed parameters and reducing truncated or malformed tool execution data.
2. The MCP SDK has been upgraded to add compatibility with the latest HTTP Streamable protocol, supporting improved real-time data streaming for tool integrations.
3. The Yuque document library integration now supports recursive data fetching from document-type directories, eliminating the need for manual selection of individual documents during bulk imports.

### Dataset Chunk Auto-Mode Parameter Fixes
The following table outlines the corrected behavior for dataset chunk parameters in auto mode, resolving the prior issue of unintended default value application:
| Parameter Scope               | Prior Behavior                                  | Corrected Behavior                                  |
|-------------------------------|-------------------------------------------------|-----------------------------------------------------|
| Dataset Auto-Chunk Processing | Incorrect default values applied during runs     | Fully computed accurate parameters with no unintended defaults |

### UI and Usage Transparency Improvements
Frontend updates enhance user experience and visibility:
1. Updated input box styling and revised voice input UI optimize usability across both desktop and mobile devices, aligning form factors for consistent interaction.
2. Additional subscription plan usage information is now displayed, providing users with clearer visibility into their current resource consumption against their selected plan limits.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4912)
