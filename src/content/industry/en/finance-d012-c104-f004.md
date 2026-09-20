---
title: Vector Models and Indexing for Glass Marketing Content
slug: /en/industry/finance-d012-c104-f004
page_type: Industry scenario page
article_section: Marketing Content and Lead Generation
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexing for Glass Marketing Content
meta_description: Data for glass marketing content comes primarily from product specification manuals, offline promotional materials, bidding technical response
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexing for Glass Marketing Content

## What the data for this category looks like
Data for glass marketing content comes primarily from product specification manuals, offline promotional materials, bidding technical response documents, and compliance certification files. Updates are triggered by new product launches, quarterly promotional adjustments, and updates to industry compliance standards, with no fixed cycle.
Each marketing document typically includes product model, physical parameters such as thickness and light transmittance, application scenarios, marketing selling points, and compliance identification numbers. Unit fields mostly use millimeters, square meters, degrees Celsius, and grade identifiers. There are no unified long text paragraphs; content consists mostly of structured parameters paired with short descriptive text.

## Constraints imposed on vector models and indexing
The combination of structured parameters and short descriptions in glass marketing data requires vector models to support mixed encoding of multiple fields, to avoid encoding bias that only targets pure text semantics. The high-frequency incremental update nature of promotional materials requires indexes to support incremental writes, avoiding full reindexing to reduce update costs. The presence of long parameter descriptions requires chunk length to fit the complete semantics of parameter groups, avoiding splitting critical parameters from their corresponding units. Additionally, the numerical and grade attributes of parameters require indexes to support vector-associated retrieval of numerical fields, rather than relying solely on semantic similarity matching.

## How to set configurations
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `chunk_size` | 800–1200 characters | Glass marketing documents contain long parameter descriptions and scenario explanations. This range preserves the complete semantics of parameter groups, avoiding splitting critical numerical values and their units |
| `overlap_ratio` | 15%–20% | This range preserves parameter associations between adjacent chunks, preventing split results where numerical values and their units are separated |
| `local_embedding_model` | `bge-large-zh-v1.5` | Supports multi-field encoding, has higher semantic correlation for structured parameters, and adapts to the parameter characteristics of glass products |
| `recall_top_k` | Top 8–12 results | Glass product selection requires matching multi-dimensional parameters. This range balances retrieval efficiency and recall coverage |
| `similarity_threshold` | 0.72–0.80 | This range helps distinguish products with different thicknesses and temperature resistance grades, preventing irrelevant models with low similarity from being recalled |
| `vector_db_index_type` | `HNSW` | Supports fast retrieval of vector indexes for structured parameters, adapts to high-frequency incremental updates of promotional materials |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Phenomenon: Vector retrieval returns `query_timeout` error, and logs show retrieval time exceeds the threshold. Cause: When using the default `pgvector` index, no separate index is created for structured parameter fields, leading to reduced retrieval efficiency during multi-field matching.
- Phenomenon: Isolated fragments without units such as "thickness 5" appear in recall results. Cause: `chunk_size` is set too small, and `overlap_ratio` is not adjusted, failing to preserve the contextual association between parameters and their units.
- Phenomenon: The knowledge base interface shows remaining capacity as 0 after import, and new documents cannot be uploaded. Cause: The distinction between single-file upload limits and total knowledge base storage quota is not properly made, and the value of `UPLOAD_FILE_MAX_SIZE` is mistakenly treated as total capacity configuration.

## How to confirm configuration is correct
- Upload a single glass marketing document containing complete parameters, check whether the chunked results preserve the complete association between parameters and their units, and adjust `chunk_size` and `overlap_ratio` until the expected result is achieved.
- Initiate a retrieval request targeting specific thickness and temperature resistance grades, verify the parameter matching degree of the recall results, and adjust `similarity_threshold` to meet business screening requirements.
- Upload a new product marketing document, check whether the index completes incremental updates automatically without triggering full reindexing, to verify that the `vector_db_index_type` configuration takes effect.
- View the vector database monitoring panel, confirm that retrieval response time meets business requirements, and adjust `recall_top_k` to balance efficiency and the number of recall results.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
