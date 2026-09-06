---
title: FastGPT 4.16.0 Operational and UI Improvements
slug: /en/deploy/fastgpt-4-16-0-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160
source_type: 官方文档
---

# FastGPT 4.16.0 Operational and UI Improvements

## FastGPT 4.16.0 Operational and UI Improvements

## Agent Sandbox Enhancements
This release refactors the Agent Sandbox lifecycle and migration flow with concurrency protection, resumable execution, and idempotent retries for all core sandbox actions: creation, suspension, archiving, restoration, deletion, and provider changes. If the Agent Sandbox is unavailable or unsupported by the current team plan, App Chat automatically disables Sandbox functionality, while all other models, tools, datasets, and Workflow nodes remain fully available.

OpenSandbox now retains persistent volumes after stopping, and reuses these volumes on subsequent runs. Suspension and archive thresholds can be configured through environment variables. Additionally, sandbox file writes now automatically create parent directories, eliminating failures when writing to nested file paths.

## UI and Publishing Updates
The Publish Channels page has been fully redesigned, with separate native and third-party channel groups, plus a count of configured connections for each channel. The Agent Ask UI has also been updated for improved usability.

The Tool Marketplace now features improved batch updates: partially failed updates remain visible in the interface, allowing users to retry or uninstall individual items individually. Clearer installed-version and update-status information is now displayed for all marketplace tools. Runtime image upgrade status is now shared between Apps and Skills, and the Skill editor continuously polls for real-time upgrade results.

## Compatibility and Configuration Fixes
This release includes improved compatibility handling for legacy Workflow data and tool parameters, reducing errors when migrating older FastGPT configurations. A table of key configuration changes is below:

| Configuration Change | Specific Details |
|----------------------|------------------|
| Portal Quick App Limit | Limited to 3 per portal, while existing configurations exceeding the limit are preserved for backward compatibility |
| PDF Content Cropping | Replaced fixed PDF edge cropping with dynamic edge detection, preventing valid content near page boundaries from being removed |
| Sandbox Thresholds | Suspension and archive thresholds configurable via environment variables |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160)
