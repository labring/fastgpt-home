---
title: Start local FastGPT plugin remote debugging
slug: /en/model/fastgpt-plugin-local-debug
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Start local FastGPT plugin remote debugging

## Overview
This guide covers starting local remote debug sessions for FastGPT plugins via the official `fastgpt-plugin` CLI tool. This workflow enables developers to connect their local plugin codebase to a FastGPT instance for real-world testing without first publishing the plugin to a remote registry or production environment.

## Interactive Debug Session Setup
For manual testing via a terminal user interface (TUI), follow these steps:
1. Open a terminal and navigate to a directory containing your FastGPT plugin, or a workspace with multiple plugin directories.
2. Launch the interactive debug workflow with the base command:
```bash
fastgpt-plugin dev
```
3. When prompted in the TUI, paste the debug link copied directly from your FastGPT admin interface.
Behind the scenes, the CLI extracts the connection key from the provided link, exchanges it for a short-lived WebSocket Secure (WSS) connection token, and mounts your local plugins to the FastGPT debug channel. To update your debug connection later in the TUI, press the `c` key to enter and save a new debug link or raw connection key.

## Non-Interactive Debug Session Setup
For automated workflows, scripts, or headless environments, use the non-interactive mode with two supported configuration patterns:
### Full Connection URL Pattern
Pass the complete debug connection URL including the embedded connection key via the `--connect` flag alongside the `--no-interactive` flag to skip all TUI prompts:
```bash
fastgpt-plugin dev --no-interactive \
  --connect "https://fastgpt.example.com/api/plugin/debug-channel/connection-key/exchange?connectionKey=fpg_dbg_..."
```
### Raw Connection Key Pattern
If you only have the raw connection key string, set the `FASTGPT_PLUGIN_DEBUG_CONNECT_URL` environment variable to your FastGPT instance's connection exchange endpoint first, then run the dev command with the raw key:
```bash
FASTGPT_PLUGIN_DEBUG_CONNECT_URL=https://fastgpt.example.com/api/plugin/debug-channel/connection-key/exchange \
  fastgpt-plugin dev --no-interactive --connect "fpg_dbg_..."
```
After a successful connection, the CLI saves the connection details to your local user configuration. Subsequent runs of `fastgpt-plugin dev` will automatically reuse the stored configuration, eliminating the need to re-enter connection details for future sessions.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
