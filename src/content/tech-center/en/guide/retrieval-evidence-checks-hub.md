---
title: FastGPT Retrieval and Evidence Checks
slug: /en/guide/retrieval-evidence-checks-hub
page_type: Issue list
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT Retrieval and Evidence Checks
meta_description: Learn to configure FastGPT knowledge base retrieval, hybrid search, and citation tracing to check application responses against original source documents.
keywords: 
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# FastGPT Retrieval and Evidence Checks

FastGPT provides configurable retrieval and citation features to support applications that must check responses against source documents. The process involves selecting knowledge bases, tuning search parameters, and verifying that the final answer is supported by the correct evidence. A proposed implementation might involve a B2B marketplace where product specifications from a quotation sheet are checked against a supplier's business certification documents. The following sections describe three distinct configuration tasks and the documentation for completing them.

## Task 1: Set Initial Search Scope and Filters

The first task is to define the initial search configuration. A FastGPT knowledge base search node can associate one or more knowledge bases, provided they use the same vector model. This establishes the scope of documents available for retrieval. After selecting the knowledge bases, the search mode determines how candidates are found. The available modes are semantic, full-text, and hybrid search. Comparing their performance with test questions helps identify the most suitable mode for a given set of documents, as no single mode is optimal for all materials.

Further refinement is possible through filtering parameters. A citation limit, measured in tokens, truncates retrieved content. Testing this limit with both long and short source passages is necessary to confirm that returned content is complete enough for its purpose. A minimum relevance threshold is another filter, but it only applies during semantic search or when a reranking model is active. To tune this threshold effectively, a set of pre-labeled relevant and irrelevant samples is required for comparison. Finally, a question optimization feature can be used for reference resolution and query expansion. The effect of this feature is checked by comparing the original question to the optimized version to verify that the core subject of the query was not altered incorrectly.

For detailed steps on configuring these parameters, see the guide to [Set FastGPT Dataset Search Filters and Limits](https://fastgpt.io/en/tutorial/fastgpt-dataset-search-params).

## Task 2: Implement Hybrid Search and Reranking

The second task is to configure how multiple sets of search results are combined and ordered. FastGPT's hybrid retrieval mode executes vector and full-text searches simultaneously, then merges the results using Reciprocal Rank Fusion (RRF). This fusion process is distinct from a single-pass sorting operation. For applications that require more sophisticated ordering, a separate reranking model can be applied to the initial candidates. If the number of candidates reaching the reranker seems insufficient, the cause may be in the initial retrieval stage, not necessarily the reranking model itself.

It is important to understand how filtering interacts with these modes. The minimum relevance threshold is only effective during semantic search or when a reranking model is explicitly used; it does not apply to a pure hybrid search configuration that lacks a reranker. When setting citation limits in tokens, checking the number of returned items is not enough. Reviewing both short and long passages confirms that the token-based truncation does not omit critical information. When question optimization is active, recording the before and after versions of a question helps confirm that pronoun resolution or other expansions have preserved the correct subject and its constraints.

To configure these search modes, consult the documentation to [Configure FastGPT dataset search parameters and modes](https://fastgpt.io/en/tutorial/fastgpt-dataset-search-modes).

## Task 3: Verify Citation Handoff and Display

The final task is to ensure that retrieved evidence is correctly passed to the generation stage and presented to the user. The knowledge base search node produces a citation array as its output. This array may be empty, which does not indicate a workflow error or termination. A proposed system design must account for an empty array and define how the application should respond, such as by requesting clarification or handing off to a different process.

When the citation array is not empty, the connection between the search node and the answer generation module must be checked to confirm the output is used as an input. Each part of the generated answer should then be compared against the original text in the corresponding citation. For example, in an illustrative reading exercise, a response might be checked against a specific version of a source document. The fluency of a generated answer or the content of its internal reasoning steps cannot substitute for this direct evidence check. The validity of the source documents themselves, such as comparing current and historical versions, is also a separate but related verification step.

For information on how citation data is handled for display, read the guide to [Configure External Citation Visibility for FastGPT Shared Links](https://fastgpt.io/en/tutorial/fastgpt-external-citation-visibility).
