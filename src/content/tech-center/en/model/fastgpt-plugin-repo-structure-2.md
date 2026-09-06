---
title: FastGPT Plugin Repository Structure and Dependency Rules
slug: /en/model/fastgpt-plugin-repo-structure-2
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/intro
source_type: Official documentation
---

# FastGPT Plugin Repository Structure and Dependency Rules

FastGPT Plugin is a pnpm workspace Monorepo built with Clean Architecture and Domain-Driven Design (DDD) principles, organized for modular, maintainable plugin development and deployment.

## Repository Directory Layout
The full directory structure of the fastgpt-plugin repository is as follows:
```text
fastgpt-plugin/
├── apps/
│   ├── cli/                    # CLI for plugin development, build, check, pack, and debug
│   ├── server/                 # FastGPT Plugin HTTP service
│   └── debug-runtime-monitor/  # Local runtime monitoring and debugging panel
├── packages/
│   ├── domain/                 # Domain entities, value objects, and port definitions
│   ├── usecase/                # Application use cases for plugins, tools, models, runtime, and more
│   ├── interface-adapter/      # HTTP contracts, DTOs, and auth adapters
│   ├── infrastructure/         # Hono, Mongo, S3, Redis, runtime, logging, metrics, and other implementations
│   └── shared/                 # Cross-layer pure utilities
├── sdk/
│   ├── client/                 # Client SDK for calling the FastGPT Plugin service
│   └── factory/                # Plugin author SDK
├── test/                       # Cross-package test utilities and fixtures
└── docs/                       # Project documentation
```
Each top-level directory serves a distinct purpose: apps contains runtime and development tools, packages houses core modular business logic, sdk provides public external tools, test holds shared test utilities, and docs stores project documentation.

## Core Dependency Layer Rules
The repository follows strict dependency direction aligned with Clean Architecture:
- `domain`: Defines core business concepts and ports, the innermost layer with no external dependencies on application entrypoints or infrastructure.
- `usecase`: Orchestrates business workflows, and only depends on domain entities, value objects, and ports.
- `interface-adapter`: Defines HTTP contracts, DTOs, and auth adapters, converting external communication protocols into structures the application can interpret.
- `infrastructure`: Implements domain ports and runtime capabilities, including the Hono HTTP framework, Mongo, S3, Redis, plugin runtime, logging, and metrics.
- `apps/*`: Act as composition roots, assembling dependencies, registering routes, starting processes, or providing development commands.
- `sdk/*`: Published for external users, providing service call and plugin development capabilities.

## CLI Development Reference
The `apps/cli` directory provides a dedicated command line interface for plugin development workflows. A summary of supported CLI tasks is below:
| CLI Task | Purpose |
|----------|---------|
| Development | Initialize or scaffold new plugin projects |
| Build | Compile plugin source code for production deployment |
| Check | Validate plugin code against lint and schema requirements |
| Pack | Bundle plugin artifacts for distribution |
| Debug | Launch a local debugging session for plugin testing |

Additional guidance is available for system tool development and model presets.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/intro)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
