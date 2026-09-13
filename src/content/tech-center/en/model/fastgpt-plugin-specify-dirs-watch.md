---
title: Configure Plugin Paths and Live Reload for Remote Debugging
slug: /en/model/fastgpt-plugin-specify-dirs-watch
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Configure Plugin Paths and Live Reload for Remote Debugging

## Automatic Plugin Directory Discovery
When running the `fastgpt-plugin dev` command without specifying plugin directories, the CLI automatically discovers plugins from the current working directory. If the root directory contains an `index.ts` file, this file serves as the plugin’s entry point. If no `index.ts` exists in the root, the CLI scans one level of child directories to locate `index.ts` files as valid plugin entries. This default behavior simplifies quick testing of plugins stored in the working directory or its immediate subfolders.

## Explicit Plugin Directory Specification
To target specific plugin directories instead of relying on automatic discovery, pass one or more directory paths as arguments to the `dev` command. This is useful for organizing plugins into dedicated folders or isolating specific plugins for testing. The following example command targets two separate plugin directories:
```bash
fastgpt-plugin dev ./plugins/getTime ./plugins/dbops
```
Each specified directory will be scanned for its `index.ts` entry file, following the same logic as the automatic discovery workflow.

## Live Reload and Reconnection Settings
Two optional flags adjust the development workflow behavior:

| Flag               | Behavior                                                                 |
|---------------------|--------------------------------------------------------------------------|
| `--watch`           | Monitors specified plugin directories for file changes, reloads plugins, and recreates the remote-debug session automatically. |
| `--no-reconnect`    | Disables the default automatic reconnection behavior if the remote debug session is disconnected. |

By default, the CLI will automatically reconnect to the remote debug session if the connection is interrupted. A combined example using both flags is:
```bash
fastgpt-plugin dev ./plugins/my-custom-plugin --watch --no-reconnect
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
