---
title: Configure FastGPT dataset search parameters and modes
slug: /en/tutorial/fastgpt-dataset-search-modes
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/dataset_engine
source_type: Official documentation
---

# Configure FastGPT dataset search parameters and modes

## Overview
FastGPT’s dataset search system provides four configurable retrieval modes to align query matching with specific use cases: semantic search, full-text search, hybrid search, and result reranking. Each mode offers distinct tradeoffs between semantic understanding, keyword precision, and computational efficiency, with built-in merging logic to combine results for optimized relevance.

## Search Mode Reference Table
| Search Mode               | Core Behavior                                                                 | Key Advantages                                                                 | Limitations & Notes                                                                 |
|---------------------------|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Semantic Search           | Calculates vector distance between query and dataset content to measure similarity | Understands similar semantics, cross-language matching, multimodal support      | Depends on model training quality, inconsistent accuracy, affected by keyword use and sentence completeness |
| Full-Text Search          | Uses traditional full-text indexing and term matching                          | Optimal for locating specific terms, subjects, and predicates                  | No documented limitations; focused on exact keyword matching                            |
| Hybrid Search             | Combines vector and full-text search results using the RRF formula              | Delivers richer, more accurate combined results                                | Cannot directly filter by similarity; requires pairing with reranking for final filtering |
| Result Reranking          | Uses a Rerank model to re-sort initial search results                          | Significantly improves retrieval accuracy in most cases; scores more reliable than vector similarity | Generates 0-1 relevance scores; works best with complete, structured queries; query rewriting is applied pre-processing |

## Standard Implementation Workflow
1.  Submit a user query to the FastGPT dataset search endpoint.
2.  Select a search mode based on your retrieval goals: use semantic search for semantic matching, full-text search for exact keyword targeting, or hybrid search for balanced performance.
3.  If enabling reranking:
    a.  Apply query rewriting to ensure the query has complete subjects and predicates to maximize rerank model effectiveness.
    b.  Run the rerank model to generate 0-1 relevance scores for all initial search results.
4.  Merge initial vector search, full-text search, and reranked results using the RRF formula to produce the final sorted result set.
5.  Filter results using rerank scores if granular relevance filtering is required.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/dataset_engine)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
