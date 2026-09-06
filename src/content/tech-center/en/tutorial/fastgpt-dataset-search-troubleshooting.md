---
title: Troubleshoot Unexpected FastGPT Search Results
slug: /en/tutorial/fastgpt-dataset-search-troubleshooting
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/dataset_engine
source_type: Official documentation
---

# Troubleshoot Unexpected FastGPT Search Results

# Overview
When FastGPT dataset search results do not align with expected outcomes, avoid making broad parameter changes all at once. Instead, diagnose issues using observed symptoms to apply targeted, incremental adjustments. This reference covers standard troubleshooting workflows for common dataset search failures using native FastGPT engine configurations.

# Symptom-Based Tuning Reference
The following table maps specific search symptoms to their recommended first-step adjustments, using core FastGPT dataset search settings:

| Symptom                                            | Recommended First Adjustments                                                                 |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| No results found                                   | Confirm indexing completion; lower minimum relevance; increase citation limit; check for short or missing-subject queries |
| Results are too broad or off-topic                 | Raise minimum relevance; reduce citation limit; refine chunking; audit for unrelated recalled chunks |
| Inaccurate IDs, model numbers, or proper nouns | Use full-text or hybrid search; reduce semantic search weight; limit query rewriting for exact ID queries |
| Poor retrieval for natural-language questions    | Use semantic or hybrid search; enable query rewriting; add more precise data indexes |
| Slower search after enabling query rewriting      | Use a faster optimization model; restrict query rewriting to follow-up or short queries only |
| Poor ranking even after reranking                  | Validate complete user questions; ensure sufficient candidate recall; adjust minimum relevance and citation limit |
| Weak image-to-image search performance            | Confirm embedding model supports image inputs; verify image vector indexes were generated during ingestion; check for clear, distinct-subject images |
| Unstable text + image search                      | Clarify text/image priority; reduce extra text constraints if visual similarity is the primary goal |

# Key Parameter Context
Each adjustment in the table maps to native FastGPT dataset search parameters, including minimum relevance threshold, citation limit, search mode (full-text, semantic, hybrid), query rewriting settings, and reranking candidate counts. For example, increasing the citation limit expands the number of retrieved text chunks, while lowering the minimum relevance threshold broadens the search scope to return more results when initial queries yield no matches.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/dataset_engine)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
