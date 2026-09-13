---
title: Implement Custom Feedback Nodes for Conversation Data Analysis
slug: /en/node/custom-feedback-nodes-conversation-analysis
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/custom_feedback
source_type: Official documentation
---

# Implement Custom Feedback Nodes for Conversation Data Analysis

## Custom Feedback Node Overview
The Custom Feedback node is a workflow component for FastGPT that attaches structured feedback tags to conversations, simplifying post-hoc analysis of conversation data via the platform’s admin panel. Unlike core chat generation nodes, this node does not alter the final assistant response but instead captures contextual feedback for later review and reporting.

## Runtime Behavior Differences
The behavior of the Custom Feedback node varies significantly based on the execution context:
### Debug Mode
When executed within the FastGPT debug workflow interface, no actual feedback data is persisted to storage. Instead, the system displays the exact test preview string: `Auto feedback test: feedback content`. No permanent chat log entries are generated for debug-mode runs of this node.
### Active Chat Mode
When used in live chat environments, including the standard chat interface, shared public chat windows, and API calls that include a valid chatId parameter, the configured feedback content is recorded to the conversation’s chat log. A 60-second delay exists between the node’s execution and the final recording of the feedback tag to the log.

## Configuration Parameters
The Custom Feedback node requires a single mandatory configuration parameter, as defined below:
| Parameter Name | Required | Description |
|----------------|----------|-------------|
| Feedback Content | Yes | The custom text, tag, or note added to the conversation. This value is displayed in debug mode previews and stored in chat logs during active chat sessions. |

## Admin Panel Analysis Integration
Once feedback tags are added via the Custom Feedback node, team members can use the admin panel’s built-in filtering and search tools to locate conversations with specific tags. This allows teams to quickly identify and review conversations that meet predefined quality, compliance, or support criteria, streamlining the analysis process.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/custom_feedback)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
