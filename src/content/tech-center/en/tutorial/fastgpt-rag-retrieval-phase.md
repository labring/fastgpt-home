---
title: Understand FastGPT RAG Retrieval Phase Workflows
slug: /en/tutorial/fastgpt-rag-retrieval-phase
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: Official documentation
---

# Understand FastGPT RAG Retrieval Phase Workflows

# Core Purpose of the RAG Retrieval Phase
The RAG retrieval phase is the initial critical step in FastGPT's retrieval-augmented generation pipeline. As documented, this phase directly dictates the quality of context available to the FastGPT response generator, so accurate retrieval directly improves final output reliability. Unlike basic keyword-based matching, this phase leverages semantic vector representations to handle complex or ambiguous user queries more effectively.

# Standard Retrieval Workflow
Follow this structured sequence as defined in the FastGPT documentation:
1.  Convert the user's input query into a numerical vector representation using a pre-trained language model.
2.  Generate vector embeddings for all relevant document fragments stored in the connected FastGPT dataset, using the same pre-trained model used for query vectorization.
3.  Execute a vector search across the dataset to compare the query vector against all document fragment vectors.
4.  Calculate similarity between the query vector and each document fragment vector, typically using cosine similarity as the core matching metric.
5.  Return the top-ranked most semantically relevant document fragments as context for the response generator.

# Key Retrieval Configuration Parameters
The following parameters govern retrieval behavior, all aligned with FastGPT's official RAG documentation:
| Parameter | Supported Options | Default Behavior |
|-----------|-------------------|------------------|
| Embedding Model | Pre-trained language models (e.g., BERT) | Platform-standard pre-trained embedding model |
| Similarity Metric | Cosine similarity | Cosine similarity |
| Matching Mode | Semantic, Keyword | Semantic matching |
Each parameter directly impacts the relevance of retrieved context: semantic matching uses vector-based similarity to capture contextual meaning, while keyword matching relies on exact term overlaps.

# Critical Retrieval Quality Notes
Since retrieval quality directly determines the context available to the generator, suboptimal retrieval will limit the generator's ability to produce accurate, relevant responses. Avoid overreliance on keyword-only matching, as this fails to account for contextual nuance in user queries or document content. Ensuring consistent vectorization across queries and document fragments is also essential for reliable matching.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/rag)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
