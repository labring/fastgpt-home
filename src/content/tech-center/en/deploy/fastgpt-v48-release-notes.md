---
title: FastGPT V4.8 Feature Updates and Fixes
slug: /en/deploy/fastgpt-v48-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/48
source_type: 官方文档
---

# FastGPT V4.8 Feature Updates and Fixes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT V4.8 Feature Updates and Fixes

## Core Workflow Overhaul and New Capabilities
The FastGPT workflow engine has been fully refactored, with multiple new features and quality-of-life improvements. Key additions include:
- Fully refactored workflow engine foundation
- If/ElseIf/Else conditional nodes (contributed by @newfish-cmyk) for implementing branching logic; existing preview version If/Else nodes must be deleted and recreated
- Variable update nodes (contributed by @newfish-cmyk) for modifying workflow output variables or global variables during runtime
- Automated workflow saving and version management
- Workflow debug mode for testing individual nodes or step-through full workflow execution
- Scheduled app execution for cron-like recurring tasks
- Enhanced plugin custom inputs with rendered input components
- New share link pre-chat hook (PR #1252, contributed by @gaord)
- 4-directional workflow connection support to simplify loop construction
- Improved workflow context passing performance

A quick reference table for key new workflow components:
| New Workflow Component | Core Purpose | Required Action |
|------------------------|--------------|-----------------|
| If/ElseIf/Else Conditional Node | Add conditional branching logic | Delete and recreate existing preview If/Else nodes |
| Variable Update Node | Modify runtime workflow or global variables | None |
| Workflow Debug Mode | Test individual or full workflow steps | None |

## Usability, Performance, and Operational Improvements
Several updates streamline daily usage and optimize system performance:
- Updated keyboard shortcuts: Ctrl+Enter and Alt+Enter now have improved line break cursor positioning
- Enhanced variable configuration storage in chat sessions to prevent configuration edits from affecting active conversations
- Simple mode now automatically updates the debug panel after configuration changes without requiring manual saves
- Overhauled worker process management, with token calculation delegated to worker processes
- Tool calling now supports specifying field data types: string, boolean, or number (resolved issue #1236)
- Increased Completions API size limit (resolved issue #1241)
- Updated Node API middleware and server-side code (contributed by @c121914yu)
- Chat history is now trimmed to an even number of messages to support models requiring paired input, with a maximum of 50 rounds (resolved issue #1384)
- HTTP nodes now terminate processes on error (resolved issue #1290)

## Resolved Bug Fixes
All reported issues from the pre-release cycle have been addressed:
- Fixed tool calling names being unable to start with numeric prefixes, which occurred occasionally with randomly generated IDs (contributed by @c121914yu)
- Resolved cached global variable query parameters on share links (contributed by @c121914yu)
- Fixed tool calling field compatibility issues (resolved issue #1253)
- Fixed HTTP node URL cursor positioning bug (resolved issue #1334, contributed by @maquannene)

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/48)
