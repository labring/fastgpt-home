---
title: FastGPT’s Official DDD-Aligned Code Structure Breakdown
slug: /en/deploy/fastgpt-official-ddd-code-structure
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/dev
source_type: Official documentation
---

# FastGPT’s Official DDD-Aligned Code Structure Breakdown

## FastGPT DDD Domain Structure
FastGPT’s self-hosted codebase follows strict Domain-Driven Design (DDD) principles to organize functional code into isolated, maintainable domains. This breakdown covers the official code structure for engineering teams evaluating or deploying FastGPT.

The codebase is split into three primary functional domains, each focused on a distinct set of platform capabilities:
| Domain | Primary Role | Included Features |
|--------|--------------|-------------------|
| core | Core platform operations | Dataset management, workflow orchestration, application building, conversation processing |
| support | Operational support tools | User authentication, user account management, billing processing |
| common | Shared base utilities | Log management, file input/output operations |

## Top-Level Repository Layout
The root of the FastGPT monorepo includes dedicated directories for configuration, documentation, deployment assets, and code:
- `.github`: GitHub repository configuration and workflow files
- `.husky`: Pre-commit hook and code formatting enforcement setup
- `document`: Project documentation files
- `files`: External deployment resources including docker-compose and Helm chart templates
- `packages`: Monorepo subpackages for shared and specialized code modules
- `projects`: Standalone project deployments, with `projects/app` serving as the primary FastGPT application entry point
- `python`: Standalone model-related code that is not part of the core FastGPT platform
- `scripts`: Automation and setup scripts, including icon management tools in `scripts/icon` and the ChakraUI custom theme type initialization script `scripts/postinstall.sh`

Root-level configuration files define the monorepo structure and project dependencies: `pnpm-workspace.yaml` declares the monorepo workspace, `pnpm-lock.yaml` locks dependency versions, `package.json` manages top-level project scripts and dependencies, plus `Dockerfile` and LICENSE files for containerization and licensing.

## Monorepo Subpackage Details
The `packages/` directory contains four key subpackages:
- `global`: Shared code that works across both frontend and backend systems
- `plugins`: Custom workflow plugin packages for extending FastGPT’s built-in workflow capabilities
- `service`: Full backend service implementation code
- `web`: Frontend web application source code

Available automation scripts include `pnpm initIcon` to convert SVG icons into code assets, and `pnpm previewIcon` to preview custom icon implementations, both run via the `scripts/icon` tooling.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/dev)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
