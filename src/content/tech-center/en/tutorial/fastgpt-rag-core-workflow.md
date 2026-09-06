---
title: Explain FastGPT RAG System Core Workflow
slug: /en/tutorial/fastgpt-rag-core-workflow
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: Official documentation
---

# Explain FastGPT RAG System Core Workflow

## RAG Definition for FastGPT Datasets
Retrieval-Augmented Generation (RAG) is a hybrid architecture that combines information retrieval with generative models. First, the retriever fetches content fragments relevant to the user's query from an external Dataset or document collection. Then, the generator produces natural language output based on these retrieved fragments, ensuring the output is information-rich, highly relevant, and accurate.

## Core RAG System Components
FastGPT’s RAG implementation consists of two main, integrated components: the Retriever and the Generator. These components work together to ensure generated text contains relevant external knowledge while maintaining natural, fluent language.
- **Retriever**: The component responsible for identifying and extracting content fragments relevant to the user’s query from connected external datasets or document collections.
- **Generator**: The generative model that uses the retrieved content fragments as contextual input to produce a coherent, knowledge-grounded natural language response.

## Step-by-Step RAG Execution Workflow
This standardized workflow outlines how FastGPT’s RAG system processes user queries:
1. A user submits a natural language query to the FastGPT platform
2. The retriever scans the configured external dataset or document collection to retrieve relevant content fragments aligned to the query
3. The collected content fragments are passed as contextual input to the generator component
4. The generator synthesizes the retrieved data into a polished, relevant natural language response that meets standards for accuracy, relevance, and fluency

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/rag)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
