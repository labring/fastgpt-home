---
title: Cosmetics Intelligent Due Diligence Report Citation Sources and Traceability
slug: /en/industry/finance-d008-c030-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Cosmetics Intelligent Due Diligence Report Citation Sources
meta_description: Cosmetic-related data comes from three main sources: the National Medical Products Administration Cosmetic Filing Public Platform, official brand
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Cosmetics Intelligent Due Diligence Report Citation Sources and Traceability

## What the data for this category looks like
Cosmetic-related data comes from three main sources: the National Medical Products Administration Cosmetic Filing Public Platform, official brand compliance documents, and third-party compliance test reports. Data updates synchronize with newly filed product launches and industry compliance standard revisions, with no fixed cycle. Most documents are structured tables or standardized PDF files. They contain filing numbers, full product names, ingredient lists, manufacturer information, and compliance judgment fields. Ingredient fields must list International Nomenclature of Cosmetic Ingredients (INCI) and their corresponding Chinese names. Some documents include quantitative annotations for test items.

## Constraints imposed on citation sources and traceability
Cosmetic data comes from multiple dispersed sources. Unified multi-source field mapping is necessary to avoid naming deviations during traceability. Data has no fixed update cycle. The traceability link must support real-time pulling of the latest compliance data to ensure cited content timeliness. Structured documents include multi-dimensional compliance fields. Precise matching of specific cited entries is required, such as ingredient INCI names and filing batch information. The original unit system of quantitative annotations must be retained to ensure traced content compliance and accuracy. Cosmetic compliance requirements are strict. Traceability must target specific filing batches; otherwise, compliance risks may arise.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `citation_count` | Top 3-5 entries | Compliance entries related to a single cosmetic product are concentrated. Too many will introduce redundant non-core compliance information, while too few will fail to cover complete compliance judgment basis |
| `reference_format` | Retain only original source name and number, hide markup symbols | Avoid custom citation markers in output, which aligns with formal display standards for due diligence reports |
| `similarity_threshold` | 0.75-0.85 | Semantic similarity between cosmetic ingredients and compliance statements is high, so low-relevance non-target entries need to be filtered |
| `rerank_top_n` | Top 8-10 entries | The reranking step can optimize the relevance of recall results and supplement the coverage of basic recall |
| `parse_chunk_size` | 800-1200 characters | Adapts to the structured paragraph length of cosmetic filing documents, avoiding loss of association between ingredients and filing numbers during splitting |
| `citation_source_whitelist` | `["国家药监局化妆品备案平台", "品牌官方合规文档"]` | Filter non-compliant third-party data sources to ensure the authority and compliance of traced content |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Mistakes
- Phenomenon: Custom citation markers such as `[1]` remain in output content. Cause: The `reference_format` parameter is not configured correctly, and the default markup symbol output logic is retained.
- Phenomenon: Non-official filing third-party non-compliant data source entries are mixed into recall results. Cause: The `citation_source_whitelist` parameter is not configured, and the scope of legal traceability sources is not limited.
- Phenomenon: Cited ingredient information does not match the batch number of the original filing document. Cause: The `parse_chunk_size` parameter value is unreasonable, and the association between ingredients and filing numbers is broken during paragraph splitting.

## How to Confirm the Configuration Is Correct
- Initiate a due diligence query for a cosmetic product, check whether custom citation markers exist in the output content, and adjust the `reference_format` parameter until the expected result is achieved.
- View the source list of recall results, confirm that only the whitelist data sources configured are included, and remove unauthorized source entries.
- Verify the correspondence between cited ingredient names, filing numbers and the original filing documents, adjust the `parse_chunk_size` parameter to ensure complete field association.
- Test query scenarios for different products, confirm that the number of cited recall entries meets requirements, and adjust the `citation_count` parameter to adapt to the query scenario.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
