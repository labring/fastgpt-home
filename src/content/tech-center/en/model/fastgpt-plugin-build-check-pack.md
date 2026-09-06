---
title: Build, Validate, and Package FastGPT Plugins
slug: /en/model/fastgpt-plugin-build-check-pack
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Build, Validate, and Package FastGPT Plugins

## Basic Local Plugin Preparation Workflow
When working within a dedicated FastGPT plugin directory, use this standard command sequence to validate, compile, and package your plugin:
```bash
pnpm run test
pnpm run build
pnpx @fastgpt-plugin/cli check --entry . --output ./dist
pnpm run pack
```
This sequence runs automated tests, compiles source code, validates plugin integrity, and packages the final distributable file.

## Explicit Directory Target Commands
For projects where you need to target specific plugin directories instead of working within the root, use the `@fastgpt-plugin/cli` tool with explicit path flags. The following table lists all supported flags for these commands:
| Flag | Purpose | Required |
|------|---------|----------|
| `--entry` | Defines the root source directory of the target plugin | Yes |
| `--output` | Specifies the directory for compiled plugin output files | Yes |
| `--minify` | Enables JavaScript minification for compiled builds | No |
| `--dist` | Points to the directory containing pre-built plugin artifacts | Yes for pack commands |

Example explicit commands:
```bash
pnpx @fastgpt-plugin/cli build --entry packages/tools/my-tool --output packages/tools/my-tool/dist --minify
pnpx @fastgpt-plugin/cli check --entry packages/tools/my-tool --output packages/tools/my-tool/dist
pnpx @fastgpt-plugin/cli pack --entry packages/tools/my-tool --dist ./dist --output packages/tools/my-tool/out
```

## Required Build Artifacts
All compiled FastGPT plugin packages must include these core files:
- `dist/index.js`: The primary runtime code for the plugin
- `dist/manifest.json`: Official plugin metadata manifest
- Icon files: Visual identification assets for the plugin
Optional supported artifacts include:
- `README.md`: Plugin usage documentation
- `assets/**`: Recursive static asset directory for the plugin

## Packaging Output
The final `pack` command generates a single `.pkg` file. This file is the exclusive format used for uploading, installing, and listing plugins within the FastGPT platform.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
