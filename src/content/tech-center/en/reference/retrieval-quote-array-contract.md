---
title: FastGPT Retrieval Parameters and Output Baseline
slug: /en/reference/retrieval-quote-array-contract
page_type: Reference baseline
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT Retrieval Parameters and Output Baseline
meta_description: Compare FastGPT v4.17.2 retrieval modes, token limits and empty citation output. Check documented values and conditions before configuration changes.
keywords: 
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# FastGPT Retrieval Parameters and Output Baseline

A fixed-version baseline makes changes easier to investigate: a search-mode change, a citation-volume limit and an empty citation output describe different parts of the retrieval process. The table records behavior explicitly documented for FastGPT v4.17.2. It is a documentation baseline for configuration review, with no measured accuracy or performance result attached.

## Values and conditions

| Item | Documented value or form | Condition to check | Source section |
| --- | --- | --- | --- |
| Search mode | Semantic, full-text, hybrid | Compare modes for the query; they use different retrieval paths | dataset_engine / search modes |
| Minimum relevance | Range 0–1; no universal default supplied | Applies only to semantic retrieval or retrieval with reranking | dataset_engine / minimum relevance |
| Citation limit | Tokens | Controls cited content volume; a passage count is a different measure | dataset_engine / citation limit |
| Question optimization | Reference resolution and query expansion | Use supplied context and inspect the resulting subject | dataset_engine / question optimization |
| Associated knowledge bases | One or more | Multiple associated knowledge bases must use the same embedding model | dataset_search / associated knowledge bases |
| Citation output | Array; length may be zero | The empty-output connection can continue; subsequent behavior needs design | dataset_search / citation output |
| Hybrid fusion | RRF | Combines vector and full-text results; one path score does not define final order | dataset_engine / hybrid retrieval |

## Read relevance and citation volume separately

Minimum relevance uses a value between zero and one, with the documented applicability limited to semantic retrieval or retrieval with reranking. The range alone does not identify a suitable setting for a specific dataset. Label relevant and unrelated examples before comparing settings. A citation limit uses tokens to control content volume. Counting retrieved passages does not establish whether a complete qualification or exception remains available to the answering stage.

## Interpret an empty array at the correct stage

The search node can output an empty citation array and the connected workflow path can continue. This is distinct from an instruction to produce an unsupported answer. Define what the application should do when a query subject is missing, the source document is absent, or indexed evidence was not recalled. A proposed clarification or handoff requires implementation and a responsible receiving path.

## Keep a stable comparison

For a configuration review, retain the complete question, selected knowledge bases and cited originals. Compare the search output with the actual input received by the answering stage. Change document content and search configuration in separate runs so that the observed difference can be attributed to the changed condition. Fixed-version source descriptions do not establish resource authorization or determine which business document is current.
