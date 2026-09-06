---
title: Eliminate Repeated Command Execution Latency
slug: /en/tutorial/fastgpt-vm-status-deduplication
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/guide/build/agentv2/vm
source_type: 官方文档
---

# Eliminate Repeated Command Execution Latency

## Virtual Machine Status Deduplication Overview
This system mitigates latency caused by repeated execution of setup commands (such as pip package reinstalls) across subsequent chat turns. It optimizes sandbox startup and skill execution by skipping redundant runs during repeated agent interactions.

## Execution State Storage
The system maintains a persistent execution state file within the sandbox environment at `~/.fastgpt/agent-skill-entrypoints/state.json`. This file tracks executed script hashes and skill version IDs to determine whether commands require rerunning for each new chat session.

## Deduplication Implementation Rules
There are two standardized deduplication workflows, tailored to the type of configured script:
### SHA-256 Hash-Based Startup Script Deduplication
For custom "Startup script (sh)" configurations, the system calculates a SHA-256 hash of the script’s plain text content. This hash is compared against previously recorded hashes stored in `state.json`. If the script has not been modified, the system automatically skips execution on all subsequent chat turns. The script will only run again if its content is edited, or if the sandbox is fully rebuilt via the "Clear Chat" function.
### Version ID-Based Skill Entrypoint Deduplication
Bound skills use their immutable published version ID for deduplication. Since published skill versions are read-only, the associated entrypoint script will execute exactly once during the sandbox’s cold start, provided the bound skill version remains unchanged across sessions.

## State Lifecycle and Validation
The deduplication state is fully tied to the virtual machine instance. When the sandbox is rebuilt—either manually via "Clear Chat" or automatically due to system reclamation—a fresh environment is provisioned. All configured scripts will execute again during the next cold start of the sandbox.

For validation of the deduplication behavior:
1. Configure a custom startup script or bind a published skill to your agent VM.
2. Initiate an initial chat turn to trigger the sandbox cold start and initial script execution.
3. Submit a second identical chat turn: observe that redundant setup commands are not rerun.
4. Modify the startup script content or select "Clear Chat" to rebuild the sandbox.
5. Submit a new chat turn: confirm that the script executes again during the cold start.
6. Access the sandbox environment to view `~/.fastgpt/agent-skill-entrypoints/state.json` and verify updated hash or version ID entries after reruns.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/agentv2/vm)
