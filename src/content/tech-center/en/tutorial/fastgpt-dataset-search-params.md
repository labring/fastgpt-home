---
title: Set FastGPT Dataset Search Filters and Limits
slug: /en/tutorial/fastgpt-dataset-search-params
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/dataset_engine
source_type: Official documentation
---

# Set FastGPT Dataset Search Filters and Limits

## Overview of Dataset Search Controls
FastGPT’s dataset search controls refine retrieval results to resolve inconsistent performance in mixed dataset environments. Standard top-k search often yields unstable results across collections with varying chunk lengths, such as combined Q&A and document datasets. FastGPT replaces top-k with targeted parameters to deliver consistent, predictable search outcomes.

## Search Parameter Reference
| Parameter Name | Description | Valid Range | Key Notes |
|----------------|-------------|-------------|-----------|
| Citation Limit | Maximum number of tokens permitted per search citation | Unspecified | Replaces top-k to standardize control across mixed chunk-length datasets |
| Minimum Relevance | Threshold for filtering low-relevance search results | 0–1 | Only active when Semantic Search or Result Reranking is enabled. This is a filtering threshold, not a final sorting rule. Final results may fuse outputs from multiple recall paths, and are not strictly sorted by a single vector similarity score. |

## Critical Usage Details
Citation limit provides more consistent control than top-k, as it accounts for varying chunk sizes across mixed dataset types. Unlike top-k, which counts results by the number of returned chunks, citation limit caps the total token count of each individual citation, ensuring uniform resource usage and result predictability.

For Minimum Relevance, it is important to note that this parameter does not govern final result ordering. When enabled alongside query rewriting, hybrid search, or image search, final search results may combine outputs from multiple retrieval pathways. As such, individual results may not align strictly with raw vector similarity scores, and only results meeting or exceeding the set threshold are included in the final result set.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/dataset_engine)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
