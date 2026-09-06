---
title: Develop FastGPT System Tool Plugins Post v4.15.0
slug: /en/model/fastgpt-system-tool-plugin-dev-2
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Develop FastGPT System Tool Plugins Post v4.15.0

## Plugin Overview
This documentation covers system tool development for FastGPT versions 4.15.0 and later. The FastGPT Plugin service unifies system tools, model presets, and similar functional capabilities into installable, updatable, and runtime-isolated software packages. All completed plugins are delivered to the FastGPT Plugin service as `.pkg` format files. The core FastGPT main service invokes tools exclusively through the FastGPT Plugin service, while plugin code utilizes the `@fastgpt-plugin/sdk-factory` package to formally describe input parameters, output structures, secure secret configuration requirements, and core execution logic.

## Supported Stable Plugin Types
Two stable system tool plugin types are currently supported for production use:
- **Single Tool Plugins**: Each plugin package exposes exactly one standalone tool, and is declared using the `defineTool()` function. This format is ideal for standalone, isolated functional tools.
- **Toolkit Plugins**: Each plugin package exposes multiple related child tools grouped under a single parent package, and is declared using the `defineToolSet()` function. This format is suitable for collections of tools that share common dependencies or use cases.

## Runtime & Integration Details
System tool plugins execute within the isolated runtime environment provided by the FastGPT Plugin service. All communication between the core FastGPT service and plugin tools is mediated exclusively through the FastGPT Plugin service, ensuring secure and consistent execution across deployments. The `@fastgpt-plugin/sdk-factory` package is the mandatory tool for defining all structural and functional requirements of the plugin, including input schemas, output specifications, any required secret configurations, and the core execution logic for the tool(s).

## Step-by-Step Plugin Declaration
Follow this structured workflow to create a valid system tool plugin:
1. **Select Plugin Type**: Choose between single tool or toolkit plugin based on the number of tools you wish to expose.
2. **Choose Declaration Function**: Use `defineTool()` for single tool plugins, or `defineToolSet()` for toolkit plugins to formally register your tool(s).
3. **Define Plugin Specifications**: Use `@fastgpt-plugin/sdk-factory` to outline input parameters, expected output formats, required secret configurations, and the core execution logic for your tool(s).
4. **Package Plugin**: Compile the completed plugin code into a `.pkg` file for deployment to the FastGPT Plugin service.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
