---
title: Understand and Optimize FastGPT Vector Dataset Search
slug: /en/tutorial/fastgpt-vector-dataset-search
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/dataset_engine
source_type: Official documentation
---

# Understand and Optimize FastGPT Vector Dataset Search

## What Are Embedding Vectors for FastGPT Datasets
FastGPT uses an embedding-based RAG approach to build datasets. Computers cannot directly interpret human text, images, or other media; to measure similarity between two pieces of content, they must first be converted to a computer-readable format, and vectors are one standard method for this conversion. A vector is a numerical array, and the distance between two vectors can be calculated using mathematical formulas: a smaller distance indicates the vectors (and thus the original content) are more similar. Exact matching of text to vectors is not reliable due to the vast variety of text types and combinations, so vector-based datasets rely on a top-k recall approach: retrieving the top k most similar vector results before passing them to an LLM for semantic evaluation, logical reasoning, and summarization. This makes vector search one of the most critical steps in dataset-powered Q&A workflows.

## Key Factors Impacting Vector Search Accuracy
Multiple core factors influence the accuracy of vector search in FastGPT datasets. These include the quality of the embedding vector model, data quality (encompassing content length, completeness, and diversity), retriever precision (which involves a tradeoff between search speed and result accuracy), and the quality of the search query itself. Retriever precision adjustments are relatively straightforward to implement, while training or selecting a high-quality vector model is more complex. As a result, optimizing data and query quality is the primary focus for improving vector search performance.

## Configurable Vector Search Settings
The following are key configurable parameters for FastGPT vector dataset retrieval, directly tied to core retrieval logic:
| Parameter | Purpose | Tradeoff Notes |
|-----------|---------|---------------|
| top-k | Defines the number of most similar vector results to pass to the LLM for processing | A higher k value increases the volume of context provided to the LLM but raises computational latency |
| retriever precision | Tunable setting that adjusts the balance between search speed and result accuracy | Lower precision prioritizes faster search times, while higher precision prioritizes more relevant retrieval results |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/dataset_engine)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
