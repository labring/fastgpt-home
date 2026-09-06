---
title: Skip Classification for Follow-Up Chat Messages
slug: /en/tutorial/fastgpt-skip-classification-followups
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/faq
source_type: Official documentation
---

# Skip Classification for Follow-Up Chat Messages

## Use Case Overview
This configuration addresses a targeted chatbot workflow need: initial user messages require classification to route to the correct dataset, but follow-up questions should skip classification and reuse existing chat history as context. The core scenario involves a workflow initiated with a Question Classification node, with separate branches for each targeted dataset and associated AI Chat integration. Without this adjustment, every user message would trigger the classification step, which is redundant for follow-up interactions that build on prior conversation context.

## Step-by-Step Implementation
Follow these concrete steps to deploy the skip classification logic using native FastGPT workflow tools:
1. Start building your workflow with a Question Classification node as the initial routing step, configured to split incoming queries into dedicated dataset branches.
2. Insert a conditional check node immediately after the workflow’s input trigger, positioned before the existing Question Classification node.
3. Configure the conditional check to evaluate the total count of existing chat history entries:
   - Set the condition to `history count == 0`, which matches the first user message with no prior conversation context.
4. Connect the true outcome branch of the conditional check to the pre-configured Question Classification node.
5. Connect the false outcome branch directly to the Dataset and AI Chat nodes, bypassing the classification step entirely for follow-up messages.
6. Link all completed downstream branches to the workflow’s final output node to return finalized AI responses to the user.

## Core Behavioral Rules
When the active workflow runs:
- For the first user message (history count equals 0), the conditional check routes the query through the Question Classification node, which sorts the request to the appropriate dataset branch.
- For all subsequent messages (history count greater than 0), the conditional check skips classification, passing the full existing chat history as context directly to the selected Dataset and AI Chat nodes. This ensures follow-up interactions retain full conversation context without redundant classification processing.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/faq)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
