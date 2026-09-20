---
title: Vector Models and Indexing for Traditional Chinese Medicine Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c006-f004
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexing for Traditional Chinese Medicine
meta_description: The data for traditional Chinese medicine (TCM) intelligent due diligence reports comes from four primary sources: national pharmacopoeia standard
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexing for Traditional Chinese Medicine Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
The data for traditional Chinese medicine (TCM) intelligent due diligence reports comes from four primary sources: national pharmacopoeia standard documents, pharmaceutical company R&D filing documents, TCM material traceability and circulation data, and decoction pieces quality inspection reports.

Update rhythms fall into two categories: scheduled and real-time. Pharmacopoeia standards are updated per national revision cycles. Internal pharmaceutical company documents are updated with each R&D batch. Traceability data is updated in real time alongside TCM material circulation links.

Document structures include fixed fields such as original plant source, appearance and properties, identification, content determination, processing methods, nature, taste and meridian tropism, and functions and indications. Some documents include supplementary information such as batch numbers, production dates, and test values, with units including g, mg, ml, % and other standard measurements.

## Constraints Imposed on Vector Models and Indexing
Structured multi-field document content requires vector indexes to be stored split by field. This avoids irrelevant fields interfering with semantic similarity calculations.

Numeric content determination fields require prior normalization processing. Without this, values with different units will cause vector embedding deviations.

Real-time updated traceability data requires indexes to support incremental updates. Using full reconstruction will consume significant computing resources.

Densely packed professional terminology in documents requires embedding models adapted to the TCM vertical domain. General-purpose embedding models have semantic understanding deviations for professional terms, which reduces recall accuracy.

Long document segmentation must retain term integrity. Splitting will disrupt the semantic coherence of professional expressions.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `chunk_size` | 800–1200 characters | Adapts to the professional paragraph length of TCM documents, avoids splitting that disrupts term integrity |
| `chunk_overlap` | 100–150 characters | Retains professional term context across segments, avoids index breakage |
| `embedding_model` | M3e fine-tuned for TCM vertical domains | General-purpose embedding models have insufficient semantic matching accuracy for TCM professional terms; vertically fine-tuned models improve recall accuracy |
| `vector_db_index_type` | HNSW | Enables fast recall for high-dimensional vectors, meets real-time query requirements for professional documents |
| `recall_top_k` | Top 8–12 results | Covers multi-field associated information of TCM documents, avoids insufficient recall |
| `similarity_threshold` | 0.72–0.85 | Filters low-similarity irrelevant documents, adapts to semantic matching accuracy for professional domains |
| `incremental_index` | Enabled | Adapts to real-time update requirements for traceability data, reduces resource consumption from full reconstruction |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- An `m3e no available channel` error appears in the interface, and the embedding model cannot be invoked. The cause is incomplete node configuration for the m3e model, and the corresponding access channel has not been added in system settings.
- After uploading a TCM due diligence report document, no corresponding entry appears in the vector index list, and the task status shows `timeout`. The cause is that `chunk_size` is set too large, exceeding the maximum input length limit of the embedding model, which causes the embedding task to time out.
- The same query triggers multiple vector database requests, and results are not reused. The cause is that the `query_cache` configuration is not enabled, or the cache validity period is set unreasonably, failing to cover conventional query cycles.

## How to Verify Proper Configuration
- Upload a standard TCM decoction pieces quality inspection report, and confirm that the embedding task status is `completed`, with a corresponding entry generated in the vector index list.
- Enter a TCM professional term, and check that recall results include the corresponding fields of the document, with no obvious irrelevant content.
- Submit two identical consecutive queries, and confirm that the vector database log records only one request (if caching is enabled).
- Check the resource usage of system embedding tasks, with no overload conditions.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
