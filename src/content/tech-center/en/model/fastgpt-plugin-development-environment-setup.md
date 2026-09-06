---
title: Set Up FastGPT Plugin Development Environments
slug: /en/model/fastgpt-plugin-development-environment-setup
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Set Up FastGPT Plugin Development Environments

## Required Development Tools
Before starting FastGPT plugin development, install the following recommended tools:
- A Node.js version compatible with the target plugin repository
- `pnpm`: The official `fastgpt-plugin` repository uses pnpm workspace for package management, so pnpm is required for consistent dependency handling across linked packages
- Git for local version control and repository synchronization across local and remote copies
- GitHub CLI (`gh`): Used for forking existing repositories, creating new repository instances, and submitting pull requests for community plugin contribution workflows.

## Community Plugin Development Workflow
To build and test community-contributed FastGPT plugins, first set up your local clone of the official community plugins repository:
1. Use the GitHub CLI to fork and clone the official community plugins repository:
   ```bash
   gh repo fork labring/fastgpt-community-plugins --clone
   ```
2. Navigate into the cloned project directory:
   ```bash
   cd fastgpt-community-plugins
   ```
3. Install all project dependencies for the community plugins workspace:
   ```bash
   pnpm install
   ```

## Debug SDK and CLI Tools
When debugging the official `fastgpt-plugin` repository’s CLI or SDK components, follow these steps to compile local tooling for testing:
1. Install core project dependencies first:
   ```bash
   pnpm install
   ```
2. Compile the SDK factory package to enable SDK functionality for plugin development:
   ```bash
   pnpm build:sdk-factory
   ```
3. Build the CLI tooling to enable local command-line testing:
   ```bash
   pnpm build:cli
   ```
This setup ensures all SDK and CLI components are compiled locally, allowing you to test changes to the FastGPT plugin framework directly on your machine.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
