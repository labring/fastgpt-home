---
title: Define Parameters Extraction Requirements for Content Extract Nodes
slug: /en/node/content-extract-parameter-requirements
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/content_extract
source_type: Official documentation
---

# Define Parameters Extraction Requirements for Content Extract Nodes

## Overview
FastGPT’s content extract workflow node automates targeted data extraction from input text or conversational transcripts. The core configuration for this node is a user-defined model instruction that specifies exactly what content the LLM should extract, ensuring consistent, focused output without extraneous analysis or commentary.

## Core Prompt Guidelines
The required prompt must clearly articulate three critical details for the extraction model: first, the model’s assigned functional role; second, the specific data points or content categories to extract from the input; and third, any necessary contextual variables to improve extraction accuracy. Dynamic variables such as timestamps can be integrated using FastGPT’s built-in template syntax, as shown in the sample prompts below.

## Validated Sample Prompts
Three official reference prompts are provided for common extraction use cases:
> Example 1: You are a lab appointment assistant. Extract the name, appointment time, and lab number from the conversation. Current time `{{cTime}}`
> Example 2: You are a Google search assistant. Extract search keywords from the conversation.
> Example 3: Translate my question directly into English without answering it.

## Step-by-Step Configuration Workflow
1. Access the content extract node within the FastGPT workflow builder interface.
2. Locate the dedicated "Parameters Extraction Requirement" input field.
3. Compose a natural language prompt that follows the core guidelines: assign a clear role to the model, list all required data points, and add any necessary contextual variables.
4. Review the prompt to confirm it does not include unintended instructions, such as adding commentary or answering questions beyond the extraction task.
5. Test the node using a sample input text or conversation to verify the extracted output aligns with the prompt’s requirements.
6. Save the finalized configuration once testing confirms correct performance.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/content_extract)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
