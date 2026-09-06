---
title: Detailed Breakdown of FastGPT RAG Workflow
slug: /en/tutorial/fastgpt-rag-workflow-breakdown
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: Official documentation
---

# Detailed Breakdown of FastGPT RAG Workflow

FastGPT implements a standardized Retrieval-Augmented Generation (RAG) pipeline tailored to integrate with its native dataset management system. This pipeline ensures all generated responses are anchored to verified, user-uploaded dataset content rather than generic model knowledge.

# Step-by-Step Operational Execution
The full RAG workflow follows four sequential, mandatory stages:
1.  **Input Query Handling**: End users submit a natural language question, which the FastGPT system converts into a numerical vector representation for matching purposes.
2.  **Relevant Document Retrieval**: The system’s retriever component extracts the most topically relevant document fragments from the connected dataset. Two supported retrieval techniques are vector similarity search and traditional BM25 keyword-based matching.
3.  **Contextual Answer Generation**: The generator component receives the pre-filtered relevant document fragments, then synthesizes a natural language answer using both the original user query and the retrieved contextual content to produce rich, contextually accurate responses.
4.  **Final Response Delivery**: The completed generated answer is returned directly to the end user, ensuring they receive an accurate response grounded in relevant, up-to-date dataset information.

# Core Component Specifications
Each stage of the workflow relies on dedicated system components:
- Input query processing converts user questions into vector formats to enable efficient similarity matching against stored dataset embeddings.
- Document retrieval selects high-relevance content to avoid overwhelming the generation model with non-pertinent data.
- Answer generation leverages the retrieved context and original query to produce coherent, contextually appropriate responses.
- Response delivery ensures all outputs are returned clearly without extraneous processing steps.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/rag)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
