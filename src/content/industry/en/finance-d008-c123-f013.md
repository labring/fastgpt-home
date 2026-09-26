---
title: Knowledge Base Retrieval and Recall for Energy Metals Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c123-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Energy Metals
meta_description: Data sources for energy metals include public reports from industry associations, exchange spot price databases, annual reports from mining
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Energy Metals Intelligent Due Diligence Reports

## What the data for this category looks like
Data sources for energy metals include public reports from industry associations, exchange spot price databases, annual reports from mining enterprises, and customs import and export statistics.
Spot data is updated daily. Industry research reports are released quarterly or semi-annually. Qualification documents such as mining rights certificates and environmental assessment reports are updated annually.
Document types include structured multi-column price tables. Fields cover metal grade, purity, origin, transaction price, and price change range. Units include percentages, tons, kilograms, and others. The category also includes long-text research reports, compliance documents, and other long-form documents.

## What Constraints Do These Characteristics Bring to the Knowledge Base Retrieval and Recall Link
Multi-column structured table fields for energy metals have strong correlations. Breaking column associations during chunking prevents complete business information from being matched during retrieval.
Long-text research reports have high information density per paragraph. Chunks that are too long exceed the model's context window. Chunks that are too short lose semantic integrity.
Different data sources have varying update frequencies. Distinguish trigger logic for incremental updates and full updates.
Fields and units have strong specificity. For example, grade values and purity descriptions are easily confused. Precise field matching is required to obtain valid results.
These characteristics require knowledge base parsing, chunking, and retrieval parameters to be adapted to the category's characteristics, avoiding lost fields, semantic breaks, or insufficient matching accuracy.

## How to Set Configuration Parameters

| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `PARSE_EXCEL_MULTI_COLUMN` | `Enabled` | Energy metals due diligence tables have associated fields such as specifications, origin, and price across multiple columns. Enabling this setting retains the complete column structure and avoids field loss |
| `chunk_size` | `800–1200 characters` | Energy metals research reports and price information have high information density. 800-1200 characters preserves the complete semantics of a single price entry or single chapter of a research report, avoiding truncation of key associated information |
| `recall_top_k` | `Top 6–8 results` | Energy metals data includes multi-dimensional price and research report information. 6-8 results cover the core data dimensions required for a single due diligence, avoiding redundant recall |
| `similarity_threshold` | `0.72–0.8` | Energy metal fields have strong specificity, such as grade values and origin identifiers. Setting the threshold to 0.72-0.8 filters low-match irrelevant data and retains accurately matched results |
| `rerank_enable` | `Enabled` | Semantic drift often occurs after recall of long-text chunks. Enabling reranking reorders results based on semantic relevance, solving the problem of failed ranking after long chunking |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Energy metals due diligence reports include multiple attachments. 500MB can accommodate complete industry data packages for a single batch, avoiding upload truncation |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: Retrieved long text paragraphs are not reordered. Result order is based solely on initial similarity, with long paragraphs containing semantic drift appearing at the top. Cause: The `rerank_enable` configuration is not enabled, or the reranking model's call threshold does not match chunk length.
- Phenomenon: After uploading a multi-column energy metal price table, only the first two columns are parsed, and remaining fields are empty. Cause: The `PARSE_EXCEL_MULTI_COLUMN` configuration is not enabled. The default parsing logic only retains the first two columns of data.
- Phenomenon: The "reference content template" and "reference template prompt word" in the knowledge base reference configuration are confused, causing retrieval result reference formats to not match expectations. Cause: The configuration scenarios of the two template types are not clearly defined, and variable replacement logic is incorrectly placed in the wrong configuration item.

## How to Verify Correct Configuration
- Upload an energy metal price table with more than 3 columns. Check if all column fields are retained in the parsed knowledge base content to verify that the `PARSE_EXCEL_MULTI_COLUMN` configuration takes effect.
- Trigger a knowledge base retrieval. Check if returned results have been reordered, confirm that the semantic order of long chunk results meets expectations to verify that the `rerank_enable` configuration takes effect.
- Adjust the `similarity_threshold` value. Retrieve known energy metal data, observe changes in the number of returned results to confirm that the threshold setting matches the data matching range.
- Call a workflow node to trigger knowledge base retrieval. Confirm that all knowledge base files are accessible to verify that the retrieval range configuration is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
