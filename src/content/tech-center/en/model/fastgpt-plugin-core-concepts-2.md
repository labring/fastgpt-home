---
title: Learn FastGPT Plugin Core Technical Concepts
slug: /en/model/fastgpt-plugin-core-concepts-2
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/intro
source_type: Official documentation
---

# Learn FastGPT Plugin Core Technical Concepts

This reference page outlines core technical concepts for FastGPT plugins, tailored for engineers and technical decision makers evaluating or deploying FastGPT plugin-enabled systems.

## Core Plugin Terminology Table
The following table defines standard FastGPT plugin terms:
| Term               | Description                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Plugin             | An independent, reusable feature component. Plugins can have different types, such as tools, model presets, and Dataset sources.      |
| Plugin Package     | The packaged `.pkg` file for a plugin. All plugin types are installed, updated, and managed through plugin packages.                  |
| Tool               | A plugin type that usually wraps third-party services, internal APIs, or local computation and can be called by workflows and Agents. |
| Toolkit            | A plugin that exposes multiple related child tools while sharing plugin metadata and secret configuration.                            |
| Plugin Marketplace | A centralized platform where users can search, download, and install plugins.                                                         |
| Runtime            | The backend implementation responsible for executing plugin code. The current default runtime is `local-pool`.                        |
| Pod                | A single plugin child process in the local process pool. One plugin service can own multiple Pods.                                    |

## Plugin Type Functional Roles
Plugins are categorized by their intended use case within the FastGPT ecosystem:
- Tool plugins: Wrap third-party services, internal APIs, or local computational tasks, and are callable directly by FastGPT workflows and AI Agents.
- Toolkit plugins: Aggregate multiple related tool plugins, sharing unified plugin metadata and secret configuration across all included child tools to reduce redundant setup.
- Specialized plugin types: Including model presets and Dataset source plugins, which extend core FastGPT functionality beyond external service integration.

## Runtime and Pod Architecture
The FastGPT plugin runtime provides the backend execution layer for all plugin code. The default runtime environment is `local-pool`, which manages a pool of isolated child processes called Pods. Each Pod represents a single running instance of a plugin service, and a single plugin service can deploy multiple Pods to support varying levels of concurrent plugin invocation demand.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/intro)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
