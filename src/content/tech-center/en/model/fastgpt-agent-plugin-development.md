---
title: Develop FastGPT Agent Plugin Standard Workflows
slug: /en/model/fastgpt-agent-plugin-development
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Develop FastGPT Agent Plugin Standard Workflows

## Overview
This technical page outlines the official, sanctioned workflow for building FastGPT agent plugins, using only the documented guidelines and tools provided by FastGPT. It is intended for engineers and technical decision makers evaluating or implementing FastGPT plugin integrations.

## Official Development Skill Resources
Two primary skill resources guide plugin development:
1.  The public, hosted development skill for general FastGPT plugin creation, available at `https://raw.githubusercontent.com/labring/fastgpt-official-plugins/refs/heads/main/.agents/skills/develop-fastgpt-plugin/SKILL.md`
2.  Local repository skills for SDK or CLI maintenance within the `fastgpt-plugin` repository, located at `sdk/factory/skills/fastgpt-plugin-development/SKILL.md`, `sdk/factory/skills/fastgpt-system-tool-development/SKILL.md`, and `sdk/factory/skills/fastgpt-sdk-factory/SKILL.md`.

## Step-by-Step Development Workflow
The structured development process follows these mandatory steps:
1.  **Pre-Development Data Collection**: First, fully review the selected skill documentation. Gather all required plugin details: plugin name and type, bilingual (Chinese and English) names and descriptions, input/output schemas, required secrets, external API dependencies, expected runtime behavior, error handling protocols, and test cases. If critical requirements are missing, submit up to three targeted essential questions; if reasonable defaults exist, document your assumptions and proceed with development.
2.  **Skeleton Generation**: Use the official `@fastgpt-plugin/cli` tool to create the initial plugin project skeleton. Ensure compliance with the target repository's existing structure, naming conventions, testing frameworks, and build pipelines.
3.  **Agent-Assisted Development (Optional)**: When using tools like Claude Code or Codex, use the official prompt template to standardize development:
    ```plaintext
    Develop a plugin using the following official FastGPT plugin development Skill:

    https://raw.githubusercontent.com/labring/fastgpt-official-plugins/refs/heads/main/.agents/skills/develop-fastgpt-plugin/SKILL.md

    Requirements:

    1. Read and understand the complete Skill first, then follow its development workflow.
    2. Before coding, collect the plugin name and type, Chinese and English names and descriptions, inputs and outputs, secrets, external APIs, expected behavior, error handling, and test cases.
    3. If key requirements are missing, ask no more than three essential questions. When reasonable defaults are available, state the assumptions and continue.
    4. Use `@fastgpt-plugin/cli` to create the plugin skeleton. Follow the repository's existing structure, naming, testing, and build conventions.
    5. After implementation, run the required validation, including tests, build, plugin checks, and packaging. Explain anything that could not be validated.
    6. In the final response, list changed files, validation results, remaining assumptions, and external API behavior that requires human confirmation.
    ```
4.  **Validation and Finalization**: After implementing the plugin, run all required validation steps: execute unit tests, complete a production build, perform plugin compatibility checks, and package the final artifact. Document any components that could not be fully validated during this process.

## Final Deliverables
Upon completing development, you must submit a summary including: a full list of changed project files, results of all validation runs, documented remaining assumptions, and a list of external API behaviors that require manual human confirmation.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
