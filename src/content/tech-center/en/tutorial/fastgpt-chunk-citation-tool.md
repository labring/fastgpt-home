---
title: Enable Precise Citation and Traceable Dataset Reading
slug: /en/tutorial/fastgpt-chunk-citation-tool
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/chat/quoteList
source_type: Official documentation
---

# Enable Precise Citation and Traceable Dataset Reading

## FastGPT Chunk Reader Overview
FastGPT’s Chunk Reader is a built-in tool that enhances the presentation of dataset content and user questions within chat interactions. It delivers a fundamentally improved experience compared to standard citation displays, as illustrated in the accompanying visual reference (chunkReader4.jpg). The tool is designed to ensure traceability and provide a convenient reading experience for users reviewing AI-generated responses that rely on external dataset content.

## Core Functional Behavior
When the FastGPT assistant cites dataset content in its chat response, users can interact with the embedded citation links. Clicking any citation link opens a popup modal that displays the full original text of the referenced dataset entry. Within this modal, the exact passage of text used by the AI to generate its response is clearly highlighted, making it easy to identify the source material at a glance. This functionality eliminates ambiguity by confirming the exact context and wording of the cited content, while also allowing users to review full dataset entries without navigating away from the active chat session.

## Step-by-Step Interaction Workflow
1. Identify a FastGPT assistant chat response that includes inline dataset citation links, typically formatted as linked or superscript text corresponding to cited content.
2. Click on any single citation link within the assistant’s response to trigger the popup modal.
3. Review the full original dataset text displayed in the modal, noting the highlighted section that matches the AI’s cited passage.
4. Confirm the accuracy or context of the cited content as needed for your workflow.
5. Dismiss the popup modal to return to the main chat interface.

## Core Features
- Clear visual highlighting of the exact passage cited by the AI within the full original dataset text
- One-click access to complete source context without leaving the active chat session
- Verified traceability of all AI-generated response source material
- Improved readability of dataset content relative to standard citation displays

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/chat/quoteList)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
