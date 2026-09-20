---
title: Vector Models and Indexing for Advertising and Marketing Research Knowledge Base Construction
slug: /en/industry/finance-d006-c062-f004
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexing for Advertising and Marketing
meta_description: Data sources for financial advertising and marketing research include financial institution ad campaign backend reports, media monitoring logs
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexing for Advertising and Marketing Research Knowledge Base Construction

## What this category of data looks like
Data sources for financial advertising and marketing research include financial institution ad campaign backend reports, media monitoring logs, competitor ad material libraries, industry communication research reports, and platform traffic data. Update frequencies cover hourly real-time campaign data, daily industry research reports, and weekly competitor updates.
Document structures are mixed: they include structured tables with fields such as campaign date, platform, and impression count, alongside short copy materials, long-text campaign strategy documents, and competitor analysis reports.
Fields include impressions, clicks, conversion cost, material type, and others. Common units are per thousand impressions, per click, yuan per conversion, and similar units.

## What constraints do these characteristics impose on vector models and indexing?
Mixed multi-source data types require vector models to support mixed embedding of structured and unstructured text, to avoid losing structured field association information from financial ad campaign data.
Mixed real-time and batch update rhythms require configuring both full and incremental indexes, to balance index update efficiency and the freshness requirement of financial campaign data.
Specific units and business meanings of fields require index configurations to retain field associations, to avoid destroying the business semantics of financial ad campaign data via unified embedding.
Mixed distribution of short-text materials and long-text research reports requires adjusting chunk lengths to fit different text lengths, to avoid semantic fragmentation from too-short chunks or embedding bias from too-long chunks.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `embedding_model` | `Doubao-embedding-large` | Financial ad research data includes extensive short copy and structured fields. This model has strong adaptation for embedding short-text semantics and value-linked fields. |
| `chunk_size` | 800–1200 characters | Ad research documents mix short and long text. This range balances context completeness and vector index storage density. |
| `top_k` | Top 8–12 results | Research retrieval requires balancing result breadth and accuracy, to avoid excessive redundant results interfering with analysis. |
| `similarity_threshold` | 0.72–0.85 | Ad material copy has high similarity. This range filters low-match irrelevant data. |
| `incremental_sync_interval` | 15–30 minutes | Real-time campaign data has a high update frequency. This interval synchronizes indexes timely to ensure data freshness. |
| `enable_structured_embedding` | Enabled | Ad research data includes extensive structured fields. Enabling this converts field values to vectors to support precise retrieval. |

> The parameter values provided on this page are general recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- Enabling the `Doubao-embedding-large` index model, filling in a custom request address and API key, then clicking the test button directly returns a `403 Forbidden` error. The cause is that the provided API key does not have embedding model call permissions enabled, or the custom request address does not match the model interface access specifications.
- Enabling multi-vector support for table data, but retrieval results do not include table field content. The cause is that the embedding option for the corresponding table fields was not checked in the knowledge base settings, or the table data format does not meet parsing requirements.
- The number of retrieved recall results exceeds the configured `top_k` limit. The cause is that after enabling the reranking model, the number of reranked returned results was not restricted, causing the final result count to exceed the preset range.

## How to confirm the configuration is complete
- Enter the vector model configuration page of the knowledge base, verify that the selected embedding model, custom request address, and API key match the configured settings, and click the test button to confirm no errors.
- Upload a sample ad research document containing structured tables and unstructured copy, check if the parsed text chunks fall within the `chunk_size` configuration range.
- Submit a research retrieval request, verify that the number of returned results matches the `top_k` configuration, and that similarity meets the expected threshold.
- Upload a real-time updated campaign data file, check if the incremental index completes updating within the configured `incremental_sync_interval` time frame.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
