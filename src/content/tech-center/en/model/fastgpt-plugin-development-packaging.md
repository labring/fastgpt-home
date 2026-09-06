---
title: Build and Package FastGPT System Tool Plugins
slug: /en/model/fastgpt-plugin-development-packaging
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/intro
source_type: Official documentation
---

# Build and Package FastGPT System Tool Plugins

## Overview of FastGPT System Tool Plugins
FastGPT system tool plugins extend platform functionality by integrating custom logic and external services. These plugins are built exclusively using two official FastGPT packages: `@fastgpt-plugin/cli` and `@fastgpt-plugin/sdk-factory`. The CLI handles project scaffolding, while the SDK provides standardized structures to define plugin behavior and configurations.

## Mandatory SDK Declaration Fields
All system tool plugins require five core declarations implemented via the SDK. The following table lists each required field and its purpose:
| Field Name         | Purpose                                                                 |
|---------------------|-------------------------------------------------------------------------|
| manifest            | Defines core plugin metadata such as name, version, and display details |
| inputSchema         | Validates user-provided input parameters for the plugin                 |
| outputSchema        | Defines the structure and format of the plugin's returned output        |
| secretSchema        | Specifies required secure configuration values for plugin execution      |
| handler logic       | Implements the core functional logic of the plugin                       |

## Build and Packaging Workflow
The standard workflow for developing and distributing system tool plugins follows these structured steps:
1.  **Initialize Project**: Use the `@fastgpt-plugin/cli` to generate a project skeleton for either a single standalone tool or a full tool suite.
2.  **Configure Plugin Logic**: Use the SDK to populate all mandatory declaration fields and write the custom handler logic that executes the plugin's core functions.
3.  **Validate and Test**: Run local testing and validation workflows to confirm the plugin adheres to schema requirements and functions correctly.
4.  **Package for Distribution**: Execute the provided build, check, and pack operations to compile the plugin into a distributable `.pkg` file, which can be deployed to FastGPT environments.

For full, step-by-step development instructions including code examples and troubleshooting, refer to the [System Tool Development Guide](./system-tool-development.en.mdx).

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/intro)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
