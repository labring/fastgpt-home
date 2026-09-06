---
title: Understand FastGPT Workflow Nodes and Execution
slug: /en/node/fastgpt-workflow-nodes-execution
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/intro
source_type: Official documentation
---

# Understand FastGPT Workflow Nodes and Execution

# What Are FastGPT Workflow Nodes?
In programming terminology, a FastGPT workflow node acts as a discrete, reusable step analogous to a function or API endpoint. Each node performs a specific task within a larger workflow, and connecting multiple nodes in sequence builds a step-by-step process that produces a final AI-generated output. This modular design allows users to assemble custom AI workflows by combining pre-built nodes without needing to write low-level code for individual operations.

# Mandatory Node Configuration Parameters
The only core parameters explicitly defined for FastGPT workflow nodes come from the AI Chat node, the primary processing node for conversational workflows:

| Target Node       | Mandatory Parameters       | Default Configuration                  | Data Source Specification          |
|-------------------|----------------------------|----------------------------------------|-------------------------------------|
| AI Chat           | Chat History, User Question | Chat history retains up to 6 messages  | User Question populated by Workflow Start node |

This table outlines the required inputs and default behavior for the most commonly used workflow node, with all values pulled directly from standard FastGPT workflow setup rules.

# Minimal AI Conversation Workflow Execution
The simplest fully functional FastGPT workflow consists of exactly two nodes: the Workflow Start node and the AI Chat node. The complete sequential execution flow follows these defined steps:
1.  A user submits a question, which triggers the Workflow Start node to execute and save the submitted user question as active workflow data.
2.  The AI Chat node begins execution, requiring the two mandatory parameters listed in the prior section. The User Question parameter automatically pulls the stored user input from the Workflow Start node.
3.  The AI Chat node invokes the FastGPT conversation API using the configured chat history and retrieved user question to generate a structured AI response, which becomes the final output of the workflow.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/intro)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
