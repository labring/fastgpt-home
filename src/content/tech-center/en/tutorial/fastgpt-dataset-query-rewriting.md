---
title: Optimize Multi-Turn RAG Retrieval With Query Rewriting
slug: /en/tutorial/fastgpt-dataset-query-rewriting
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/dataset_engine
source_type: Official documentation
---

# Optimize Multi-Turn RAG Retrieval With Query Rewriting

## Background of Query Rewriting
In retrieval-augmented generation (RAG) workflows using FastGPT datasets, semantic search matches the user’s input query to embedded dataset content. In multi-turn conversations, follow-up questions often fail to return relevant results because dataset search only uses the immediate current question rather than full conversation context. For example, after a prior discussion of a QA structure document, a user asking “What's the second point?” will return no useful results when searched directly. The intended query is actually “What is the QA structure?”, so the Query Rewriting node resolves this gap by expanding and clarifying the user’s current question to improve retrieval relevance.

## Core Operational Mechanics
Before executing dataset data retrieval, the Query Rewriting node runs two core processing steps: coreference resolution to resolve ambiguous references such as pronouns or truncated follow-up questions, and query expansion to enrich the semantic scope of the input query. Each rewritten optimized query is saved and can be reviewed in the conversation details panel following every interaction. This process adds an additional model call to the workflow, which increases total end-to-end latency.

## Configuration and Usage Guidelines
Query rewriting is an optional workflow feature. The following framework and validation steps are based on official FastGPT documentation:
### Decision Criteria Table
| Use Case Scenario | Recommended Setting |
|-------------------|---------------------|
| Multi-turn conversations with ambiguous context references | Enable |
| Single-turn, explicit, self-contained queries | Disable |
| Minimal end-to-end latency required | Disable |
| Priority on improved retrieval accuracy | Enable |

### Validation Steps
1.  After enabling the feature, initiate a multi-turn conversation
2.  Access the conversation details panel to view the automatically rewritten query
3.  Confirm that dataset search returns relevant matching content for the optimized query
4.  Monitor total response times to balance accuracy and latency for your deployment

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/dataset_engine)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
