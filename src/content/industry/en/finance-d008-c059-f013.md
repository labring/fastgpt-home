---
title: Knowledge Base Retrieval and Recall for Industrial Metals Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c059-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Industrial Metals
meta_description: Industrial metals data sources include commodity exchanges, industry associations, customs import and export statistics, and public reports from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Industrial Metals Intelligent Due Diligence Reports

## What the data for this category looks like
Industrial metals data sources include commodity exchanges, industry associations, customs import and export statistics, and public reports from mining enterprises. Update cycles follow multiple tiers: spot prices are updated daily, weekly inventory and trading volume data is released weekly, and monthly import and export statistics and quarterly production capacity reports are updated on fixed schedules.
Document structures are primarily structured tables, with fields including product name, delivery grade, origin, price, inventory and more. These are supplemented by industry analysis text. Field units are mostly USD/ton, CNY/ton, ten thousand tons and similar. Some documents include structured reports in Excel format and industry weekly reports in PDF format.

## What constraints these characteristics impose on knowledge base retrieval and recall
Data from multiple sources has inconsistent field naming. For example, the London Metal Exchange uses "cash price" to refer to spot prices, while domestic exchanges use the "spot price" field. Additional field mapping rules must be configured to unify retrieval standards.
Data with different update frequencies requires differentiated recall priorities, to prevent old quarterly production capacity data from overriding new daily spot price quotes.
Documents with mixed structured and unstructured content must support both vector recall and exact field matching. Relying solely on unified vector retrieval logic is not sufficient.
Precise specification matching is a core requirement for industrial metals due diligence. Retrieval matching accuracy must be strictly controlled to avoid data from unrelated categories being included in results.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall_top_k` | `Top 10-15 results` | Industrial metals data includes structured price quotes and analysis text. Too many recall results will exceed context length limits, while too few will miss critical specification data |
| `similarity_threshold` | `0.85-0.90` | Core fields such as origin, delivery grade, and specification model require precise matching, to avoid low-relevance non-standard product data from being included in retrieval results |
| `parse_structured_table` | `Enabled` | Most industrial metals industry documents include structured price lists and inventory statistics. Enabling this setting allows extraction of fields for exact matching retrieval |
| `chunk_size` | `800-1200 characters` | Structured fragments and analysis text in industrial metals documents have balanced lengths. This range preserves field associations and complete analysis logic |
| `knowledge_base_fallback` | `Disabled` | Industrial metals due diligence relies on authoritative industry data. Triggering the large language model when the knowledge base is empty will generate unsupported fabricated content |
| `rerank_top_k` | `Top 5-8 results` | High-relevance data from multiple sources must be retained for cross-verification, and redundant results are filtered after reranking |

> The parameter values provided on this page are common recommended starting points for determining configurations. Actual values are affected by material format, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: A due diligence query is initiated with an empty knowledge base, and the system returns large language model-generated unsupported industrial metal price data. Cause: The `knowledge_base_fallback` configuration item was not properly disabled, so the fallback logic was not turned off.
- Symptom: After disabling the "question optimization" switch, retrieval results still include AI-completed non-official industry data. Cause: The large language model's context completion switch was not disabled at the same time, or the forced matching logic for structured fields was not enabled.
- Symptom: After deploying the PG database via Docker, uploading an industrial metals Excel price list results in a timeout failure for the indexing creation task. Cause: The `PARSE_FILE_TIMEOUT_SECONDS` parameter was not adjusted. Parsing structured tables for industrial metals takes longer, and the default timeout duration is insufficient to complete parsing.

## How to confirm the configurations are set correctly
- Upload an industrial metals industry weekly report document, check that the parsed structured fields are correctly extracted, and confirm that the `parse_structured_table` configuration is active.
- Enter a query that includes specific specifications, such as "SHFE aluminum spot price September 2024", check that the similarity scores of retrieval results fall within the preset threshold range.
- Initiate a query after clearing the knowledge base, confirm that the system does not return large language model-generated fabricated content, and verify that the `knowledge_base_fallback` configuration is correct.
- Adjust the `recall_top_k` parameter, compare the change in the number of returned retrieval results, and confirm that the configuration parameter has taken effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
