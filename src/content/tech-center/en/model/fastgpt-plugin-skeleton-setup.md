---
title: Set Up FastGPT Plugin Project Skeletons
slug: /en/model/fastgpt-plugin-skeleton-setup
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Set Up FastGPT Plugin Project Skeletons

## Plugin CLI Basics
The FastGPT official `@fastgpt-plugin/cli` tool automates creation of standardized project skeletons for custom system tools, ensuring compliance with FastGPT plugin development conventions. Two core plugin types are supported: single-tool plugins for individual custom tools, and toolkit plugins for grouped collections of multiple related tools.

## Direct Command Project Creation
You can generate a plugin skeleton with a single terminal command, using explicit flags to define project details. For a single-tool plugin, run:
```bash
pnpx @fastgpt-plugin/cli create my-tool --type tool --cwd packages/tools
```
Replace `my-tool` with your desired plugin directory name. For a toolkit plugin bundling multiple tools, use:
```bash
pnpx @fastgpt-plugin/cli create my-tool-suite --type tool-suite --cwd packages/tools
```
The `--type` flag specifies the plugin category, accepting either `tool` for single-tool projects or `tool-suite` for grouped collections. The `--cwd` flag sets the working directory for the plugin, commonly `packages/tools` for standard FastGPT plugin repositories.

## Interactive Project Setup
For ad-hoc plugin creation without manual flag entry, run the CLI in interactive mode:
```bash
pnpx @fastgpt-plugin/cli create
```
This prompt will collect required project information step-by-step, eliminating the need to memorize command-line parameters.

## Standard Generated File Structure
The CLI creates a complete plugin directory with the following standardized files:
| File               | Purpose                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| `index.ts`         | Plugin entry, default-exporting `defineTool()` or `defineToolSet()`.      |
| `package.json`     | Plugin dependencies and `build`, `build:dev`, `pack`, and `test` scripts. |
| `tsconfig.json`    | TypeScript config.                                                        |
| `vitest.config.ts` | Test config.                                                              |
| `README.md`        | Plugin description.                                                       |
| `logo.svg`         | Main plugin icon.                                                         |

All generated files align with FastGPT’s official development standards, ensuring compatibility and ease of maintenance.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
