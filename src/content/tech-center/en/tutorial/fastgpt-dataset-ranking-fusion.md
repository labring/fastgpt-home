---
title: Explain FastGPT Dataset Result Ranking and Fusion
slug: /en/tutorial/fastgpt-dataset-ranking-fusion
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/dataset_engine
source_type: Official documentation
---

# Explain FastGPT Dataset Result Ranking and Fusion

## Multi-Path Recall Architecture
FastGPT’s dataset search system does not rely on a single recall pathway to retrieve relevant content. Instead, it aggregates results from multiple standardized recall paths to cover a wider range of query types and use cases. The most common recall paths include text vector recall, full-text recall, image description recall, image vector recall, and pre-reranked results.

| Recall Path               | Core Mechanism                                  | Ideal Use Cases                                                                 |
|---------------------------|-------------------------------------------------|---------------------------------------------------------------------------------|
| Semantic Search           | Vector similarity matching                      | Natural-language questions, semantically related dataset content                |
| Full-Text Search          | Exact keyword matching                          | IDs, model numbers, proper nouns, error codes, exact string queries             |
| Hybrid Search             | Combines semantic + full-text recall, merges via RRF | Balanced query types requiring both contextual relevance and exact matches      |
| Rerank                    | Re-sorts candidate text results                 | Clearly defined user questions with a sufficient volume of candidate results     |
| Image Search              | Uses image description or vector embeddings      | Dataset content paired with visual assets, requires cross-modal result fusion    |

## Hybrid and Rerank Fusion Logic
Hybrid search combines outputs from both semantic search and full-text search, then merges the combined candidate set using Reciprocal Rank Fusion (RRF). The rerank step takes the unified hybrid candidate set and re-sorts the text-based results, which delivers optimal performance when the user’s question is clearly articulated and a sufficient number of candidate results are available for reordering.

## Final Result Ranking Rules
Unlike single-path search systems, FastGPT’s final ranked cited content does not follow a strict order based solely on a single vector similarity score. Instead, content that is matched by multiple recall pathways will typically receive a higher final rank. This multi-path validation ensures that more relevant, cross-validated cited content is prioritized for user queries, reducing the risk of irrelevant results from a single flawed recall pathway.

## Cross-Modal Image Fusion
For dataset collections that include visual assets, FastGPT integrates image search results into the overall ranking and fusion pipeline. Image search generates results using either image description embeddings or raw image vector embeddings, then fuses these image-derived results with the text-side recall results to create a complete, cross-modal candidate set for final ranking.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/dataset_engine)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
