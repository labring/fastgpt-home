---
title: FastGPT RAG Pipeline Technical Operational Steps
slug: /en/tutorial/fastgpt-rag-pipeline-reference
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/rag
source_type: Official documentation
---

# FastGPT RAG Pipeline Technical Operational Steps

## FastGPT RAG Pipeline Overview
This reference outlines the standard Retrieval-Augmented Generation (RAG) workflow integrated into FastGPT, a framework designed to align large language model outputs with verified dataset content. The pipeline addresses hallucination risks by combining external document retrieval with pre-trained language model knowledge, delivering contextually accurate responses.

## Step-by-Step RAG Execution Workflow
The FastGPT RAG pipeline follows five standardized stages:
1.  **Data Loading and Query Input**
    - End users submit natural language queries via the FastGPT user interface or API endpoints
    - Submitted input is processed by a configured vectorizer, including supported models such as BERT or Sentence Transformer, to convert the query into a numerical vector representation.
2.  **Document Retrieval**
    - The vectorized query is routed to the integrated retriever component, which scans the connected dataset to identify the most relevant document fragments
    - Retrieval operations support both sparse techniques (BM25) and dense techniques (DPR) to optimize matching precision and operational efficiency.
3.  **Generator Processing and Natural Language Generation**
    - Retrieved document fragments are passed as context to the configured generator model, including supported options such as GPT, BART, or T5
    - The generator combines the external retrieval context with its pre-trained language knowledge to produce coherent, factually grounded natural language answers.
4.  **Result Output**
    - The finalized generated answer is returned to the requesting user via the FastGPT UI or API, with built-in safeguards to ensure response coherence and factual accuracy.
5.  **Feedback and Optimization**
    - End users can provide direct feedback on generated answers, which the system uses to refine future retrieval and generation processes
    - System improvements are implemented via model fine-tuning or adjustments to retrieval weight parameters, progressively enhancing accuracy and operational efficiency over time.

## RAG Domain Applications
RAG workflows integrated into FastGPT have been widely adopted across multiple operational domains. Curated case studies and reference material for cross-domain RAG implementations are available via the linked external survey resource.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/rag)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
