---
title: Prevent Repeated Execution of Skill Scripts
slug: /en/tutorial/fastgpt-skill-deduplication-mechanism-2
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/guide/build/skill/initialization
source_type: 官方文档
---

# Prevent Repeated Execution of Skill Scripts

## Smart Deduplication Mechanism Overview
Repeated execution of environment initialization scripts across consecutive conversation turns—such as installing dependency packages—causes significant latency. FastGPT’s smart deduplication mechanism for skill scripts eliminates this redundant overhead by tracking successful script runs and avoiding repeated execution when safe. This ensures consistent performance across extended chat sessions.

## State Persistence Location
All execution state for skill initialization scripts is stored in a dedicated JSON file within the virtual machine running the skill. The exact, fixed file path is `~/.fastgpt/agent-skill-entrypoints/state.json`. This file maintains a log of `versionId` values for skill versions that have already completed successful initialization, allowing the system to quickly reference prior runs without reprocessing.

## Core Operational Rules
The mechanism follows three deterministic, framework-defined rules to ensure efficient, non-redundant script execution:
1. **Version ID Deduplication**: The code and script content of a specific skill version (identified by its unique `versionId`) are immutable once published. The system tracks all successfully executed `versionId` entries in the state file to avoid reprocessing the same, unchanged skill code.
2. **Conditional Script Skipping**: When the same virtual machine instance is reused for subsequent conversation turns, the system checks the state file. If the target `versionId` has already been marked as successfully executed, the initialization script is skipped entirely. This enables hot starts, reducing conversation response times by eliminating setup overhead.
3. **New Version Trigger**: Whenever a new skill version is published, the system will automatically deploy and run its initialization script during the next incoming conversation. This applies regardless of whether the chat window is new or an existing active session, ensuring the latest skill code is always utilized without manual intervention.

## Key Reference Parameters and Paths
The following concrete values and identifiers are used exclusively by the deduplication mechanism, as defined in the FastGPT framework:
| Configuration Item | Exact Specification |
|---------------------|---------------------|
| State storage file path | `~/.fastgpt/agent-skill-entrypoints/state.json` |
| Tracked unique identifier | `versionId` (immutable per published skill version) |
| Condition for script skipping | Reused VM instance + already executed `versionId` |
| Trigger for new version initialization | New published skill version + next incoming conversation |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/skill/initialization)
