---
title: Properly Terminate FastGPT Remote Debug Sessions
slug: /en/model/fastgpt-debug-session-termination
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Properly Terminate FastGPT Remote Debug Sessions

### Overview
This page covers the official procedures for terminating active FastGPT remote debugging sessions and managing debug link validity. Two primary workflows are available, depending on the initiation point of the debug session: local command-line interface (CLI) or the FastGPT platform interface.

### Local CLI Debug Session Termination
For debug sessions started in a local terminal, use this sequential command to terminate the session:
1. Press `Ctrl+C` in the local terminal running the debug process. This first command attempts to gracefully close the active CLI debug session.
2. If the initial `Ctrl+C` does not exit the session, press `Ctrl+C` a second time to force an immediate exit of the debug process.

### FastGPT Platform End Debug Action
The FastGPT platform includes a native End Debugging action for managing active remote debug sessions. When executed, this action performs two core functions: it revokes the current member’s debug channel access, and removes the debug plugin entry from the application page. This action cleans up platform-initiated debug sessions securely.

### Debug Link Refresh
In scenarios where the debug link has been exposed, the signed-in member changes, or authorization needs to be renewed, use the Refresh Link function. This function generates a new valid debug link to replace the existing exposed, expired, or invalid link.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
