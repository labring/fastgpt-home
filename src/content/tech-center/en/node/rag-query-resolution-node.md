---
title: Resolve Ambiguous Queries in RAG Workflows
slug: /en/node/rag-query-resolution-node
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/coreferenceResolution
source_type: Official documentation
---

# Resolve Ambiguous Queries in RAG Workflows

## Overview of Query Rewriting in FastGPT RAG Workflows
In FastGPT’s retrieval-augmented generation (RAG) workflow, dataset search relies on embedding matching against the input query to retrieve relevant stored content. For multi-turn conversational scenarios, follow-up user questions frequently fail to return useful search results, creating a critical limitation in the workflow’s ability to deliver accurate responses.

## Common Ambiguous Query Failure Mode
The core cause of this failure is that standard dataset search only uses the explicit, current question text, without incorporating prior conversation context. For example, if a user first asks about the QA structure of a system, then submits the follow-up question "What is the second point?", the default dataset search will only look for the exact phrase "What is the second point?" and return no relevant results. The user’s actual intended query references the previously discussed QA structure, which is not included in the standalone current question. This disconnect between the explicit question and the user’s true intent breaks the dataset search step.

## Query Rewriting Node Solution
The Query Rewriting node addresses this gap by expanding the current follow-up question to include necessary prior conversation context, transforming the ambiguous standalone query into a full, context-aware search query. When integrated into the workflow, the node combines the current user question with available conversation history to generate the complete intended query. For the provided example, this rewrites "What is the second point?" to reference the earlier discussed QA structure, allowing the subsequent dataset search to return relevant matching content.

## Step-by-Step Workflow Integration
1. Insert the Query Rewriting node into the FastGPT workflow immediately before the dataset search step.
2. Configure the node to ingest the current user query and prior conversation context as input, per native FastGPT workflow input behavior.
3. Pass the generated context-expanded query to the dataset search step to retrieve relevant content.
4. Proceed with remaining workflow steps using the retrieved relevant data.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/coreferenceResolution)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
