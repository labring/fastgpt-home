---
title: General Debugging for FastGPT Agent Chat Previews
slug: /en/tutorial/fastgpt-agent-chat-debugging
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/agentv2/debug
source_type: Official documentation
---

# General Debugging for FastGPT Agent Chat Previews

## General Debugging Capabilities Overview
All FastGPT Agent v2 chat previews include consistent debugging features, regardless of whether virtual machine execution is enabled. A reference visual for the general debugging interface is available at `/imgs/agent_chat_debug.png`. The primary global control is the Restart button, located in the upper right corner of the chat preview window. Clicking this button clears all current chat history and session state, enabling a fresh test cycle.

## Chat Bubble Action Bar and Standard Debug Tools
Each generated AI chat bubble includes a bottom action bar with auxiliary debugging tools:
- **Copy**: Copies the full text content of the AI’s response
- **Read Aloud**: Converts the response text to synthesized speech for playback
- **Annotation**: Saves the current user question and expected answer to a designated dataset to refine future model responses
- **Retry**: Triggers the AI to regenerate a response for the most recent user input
- **Response Duration**: Displays total time in seconds from request submission to full response receipt, formatted as `[numeric value] s` (example: `34.07 s`)
- **Run Details**: Expands a tree-structured decision-making chain log. This log records the full LLM reasoning process, internal plan updates, and tool call logs. It also displays the unique Request ID, selected model name, total response duration, and precise points consumed for performance auditing and cost control.

## Step-by-Step: Using Run Details for Debugging
1. Locate the AI chat bubble you wish to inspect for performance or workflow details
2. Click the **Run Details** option on the bubble’s action bar to expand the log panel
3. Navigate the tree-structured nodes to view nested reasoning steps, tool invocations, and session metadata
4. Use the displayed Request ID, model information, and cost metrics to audit performance or track spending

## Plan Card for Complex Task Troubleshooting
When the Agent initiates planning for a complex workflow, the chat interface streams a visual Plan Card. The card uses color-coded steps and animated status indicators to show progress for each task phase: In Progress, Completed, Pending, or Blocked. If a step is marked Blocked, the card displays the root cause of the stall. This tool helps developers optimize system prompts or troubleshoot misconfigured agent tools. A reference visual for the Plan Card is available at `/imgs/agent_plan_card.png`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/agentv2/debug)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
