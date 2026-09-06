---
title: Clarify FastGPT Team Plugin Installation Scope
slug: /en/model/fastgpt-team-plugin-installation-scope
page_type: 模型接入
source: https://doc.fastgpt.cn/en/plugin/team-installation
source_type: 官方文档
---

# Clarify FastGPT Team Plugin Installation Scope

## Core Installation Role Separation
FastGPT enforces a clear split between system-wide and team-specific plugin deployments. System administrators are tasked with installing and configuring system plugins, which are made available for use across every team in the FastGPT deployment. Team administrators, by contrast, only have permission to install team plugins for their own current team. This structured separation ensures that critical shared tools remain consistent across all organizations while allowing individual teams to deploy custom plugins tailored to their unique workflows.

## Dual Plugin Registration and Isolation Rules
A single plugin identifier can be deployed as both a system plugin and a team plugin at the same time. When this occurs, both plugin entries will be displayed in the platform’s plugin library, with the system-wide entry clearly marked with a bold **System** label to distinguish it from the team-specific version. A critical configuration isolation rule applies here: team plugins do not inherit any settings from a system plugin with the same ID, including secrets, pricing structures, operational status, and version configurations. Additionally, individual teams have no ability to hide or alter the visibility of system-wide plugins; these visibility settings are controlled exclusively by system administrators.

## Key Scope and Lifecycle Reference Table
The following table summarizes the core scope and lifecycle rules for FastGPT plugins, per official documentation:
| Plugin Type       | Authorized Installer    | Inherits Config from Same-ID System Plugin | Teams Can Adjust Visibility | Supports Deprecation Status |
|-------------------|-------------------------|-------------------------------------------|------------------------------|------------------------------|
| System Plugin     | System Administrator    | N/A (manages its own base configuration)  | No                           | Yes                          |
| Team Plugin       | Current Team Administrator | No                                        | No                           | No                           |

Team plugins support standard update and removal workflows for authorized team administrators. Unlike system plugins, team plugins do not have a deprecation state available for configuration or display, simplifying routine lifecycle management for team-specific tools.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/plugin/team-installation)
