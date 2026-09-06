---
title: Configure FastGPT Retrievers for RAG Workflows
slug: /en/tutorial/fastgpt-retriever-rag-configuration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: Official documentation
---

# Configure FastGPT Retrievers for RAG Workflows

# Core Purpose of FastGPT Retrievers
The retriever is a foundational RAG component in FastGPT, tasked with fetching the most relevant content from an external document or dataset collection for a given user input query. It supplies contextual background to the integrated LLM generator, enabling the model to produce more accurate, relevant answers based directly on the retrieved document fragments rather than ungrounded pre-trained knowledge.

# Supported Retrieval Methodologies
Two standard retrieval techniques are natively supported for FastGPT RAG workflows:
- Vector Retrieval: Uses embedding models such as BERT to convert both user queries and stored documents into numerical vector space representations. Matching between queries and documents is performed via similarity calculations, which excels at capturing semantic similarity rather than relying solely on exact lexical term matches.
- Traditional Keyword Retrieval (BM25): Implements the BM25 algorithm, which uses term frequency and inverse document frequency (TF-IDF) weighted scoring to rank and retrieve documents. This method performs well for straightforward keyword-based matching tasks where exact term relevance is a primary priority.

# Step-by-Step Retriever Configuration
Follow these structured steps to set up a retriever for your FastGPT RAG pipeline:
1.  Navigate to the RAG configuration panel for your target FastGPT dataset.
2.  Select your preferred retrieval technique from the two available options: Vector Retrieval or BM25 Traditional Retrieval.
3.  For Vector Retrieval: Confirm that your chosen embedding model (e.g., BERT) is properly integrated to generate consistent vector representations for both input queries and stored documents.
4.  For BM25 Retrieval: Enable TF-IDF weighted scoring to standardize the ranking of retrieved document fragments.
5.  Execute a test user query to validate that the retriever returns relevant, contextually appropriate snippets from your dataset.
6.  Save your retriever configuration to apply the settings to your active RAG workflow.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/rag)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
