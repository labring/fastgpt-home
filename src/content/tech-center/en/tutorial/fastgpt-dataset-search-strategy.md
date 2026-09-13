---
title: FastGPT Dataset Detailed Multi-Step Search Strategy
slug: /en/tutorial/fastgpt-dataset-search-strategy
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/dataset_engine
source_type: Official documentation
---

# FastGPT Dataset Detailed Multi-Step Search Strategy

# Overview of FastGPT Dataset Search
FastGPT dataset search does not operate as a simple direct user question-to-vector database lookup workflow. Instead, it integrates multiple complementary retrieval and refinement components to generate high-quality cited content for large language model processing. The pipeline combines query rewriting, multi-channel candidate recall, result merging, secondary sorting, and final filtering to adapt to diverse input types and search requirements.

# Step-by-Step Search Pipeline
The full search workflow follows six standardized stages as defined by the FastGPT dataset engine:
1. **Query Rewriting**: Resolves coreferential references in multi-turn conversations and expands the original query to improve semantic richness and search relevance for complex user requests.
2. **Candidate Recall**: Selects one or more recall channels based on configured parameters, including semantic search, full-text search, or hybrid search, to retrieve a preliminary set of candidate content.
3. **Image-Aware Search**: If the input payload includes images, the pipeline uses either image description search or image vector search, dependent on the capabilities of the deployed computer vision model.
4. **Result Merging**: Applies Reciprocal Rank Fusion (RRF) to combine results from all active search channels into a single unified candidate set, eliminating duplicate or low-priority entries early in the workflow.
5. **Secondary Sorting**: Runs a reranking step to reorder the merged candidate list, refining the relevance of the top candidates before final filtering.
6. **Final Filtering**: Applies similarity filtering and citation limits to trim the candidate set, producing the final curated cited content that is passed to the connected large language model.

# Configurable Search Parameters
Users can adjust the following parameters to tailor the search pipeline to their use case, all defined within the FastGPT dataset engine configuration:
| Parameter | Valid Options | Description |
|-----------|---------------|-------------|
| Search Mode | Semantic Search, Full-Text Search, Hybrid Search | Specifies the primary candidate recall method(s) |
| Enable Query Rewriting | `true`, `false` | Toggles the coreference resolution and query expansion stage |
| Enable Image Search | `true`, `false` | Activates image-based search processing for image inputs |
| Enable Reranking | `true`, `false` | Toggles the secondary relevance sorting step |
| Similarity Threshold | Float between 0 and 1 | Filters out candidates with a similarity score below the specified threshold |
| Maximum Citation Count | Positive integer | Limits the total number of cited content items included in the final output |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/dataset_engine)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
