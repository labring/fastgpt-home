---
title: Citation Source and Traceability for Thermal Coal Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c028-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Thermal Coal Investment
meta_description: Thermal coal-related data comes primarily from industry association monthly supply and demand reports, coastal port spot price platforms, futures
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Thermal Coal Investment Research Knowledge Base Construction

## What this category of data looks like
Thermal coal-related data comes primarily from industry association monthly supply and demand reports, coastal port spot price platforms, futures exchange listed contract data, and power plant daily consumption monitoring systems. Update frequencies vary significantly: port spot prices are updated daily, futures contract prices fluctuate with trading days, and industry research reports are released weekly or monthly.

Document formats include structured CSV tables and unstructured research report PDFs. Structured table fields include calorific value (unit: kcal/kg), tax-included price (unit: yuan/ton), origin, port name, and release time. Unstructured research reports include supply and demand balance analysis and policy interpretation content.

## Constraints on citation source and traceability from these data characteristics
Thermal coal data characteristics impose multiple constraints on the citation and traceability link.
Structured quote data has cross-platform differences in fields and units. Standardized mapping of calorific value and price fields must be completed first. Traceability requires clear marking of collection channels and release time.
Unstructured research reports have long individual lengths. Precise matching of target paragraphs is required during recall, and traceability must locate specific page numbers or paragraph positions.
Daily updated spot prices have strong timeliness. The traceability link must verify the latest update time to avoid citing expired information.
Unit differences across multiple data sources must be unified in advance to ensure consistency of traceability results.

## Configuration settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `recall count` | `top 8-12 entries` | Thermal coal data sources are scattered. Multi-source recall covers different types of data including spot, futures, and research reports, avoiding bias from single-source information |
| `similarity threshold` | `0.75-0.85` | There are many technical terms in thermal coal. This range filters low-match irrelevant content while retaining relevant data with the same calorific value and price range |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Unstructured research reports have long lengths, requiring sufficient time for paragraph splitting and metadata extraction |
| `citation source display fields` | `["release time", "data source", "calorific value unit"]` | The timeliness and unit consistency of thermal coal data have a significant impact on investment research decisions. These details must be clearly displayed during traceability |
| `reorder return count` | `top 4-6 entries` | Investment research scenarios focus on core information. Only the most relevant core traceability content should be retained after reordering |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing.

## Three common configuration errors
- Phenomenon: Citation document lists appear on the debug page, but no citations are shown on the official chat page. Cause: The global switch for `citation source display` is not enabled, or the configured `citation source display fields` do not include required document identification fields.
- Phenomenon: The number of recalled citations does not meet expectations and exceeds the preset limit. Cause: The priority of `recall count` and `reorder return count` is not set correctly, or the recall permission of redundant data sources is not turned off.
- Phenomenon: Extracted text content is empty, and target fields cannot be extracted from knowledge base citations. Cause: The associated knowledge base parameters of the `text content extraction component` are not configured, or the target fields do not have extraction permissions enabled in `citation source display fields`.

## How to confirm configuration is complete
- Enter the knowledge base configuration page, check whether the `citation source display` switch is enabled, and confirm that the fields to be displayed have been configured.
- Initiate a test query, match professional questions related to thermal coal, and check whether the chat interface displays the corresponding citation source identifiers and fields.
- Adjust the parameters of `recall count` and `reorder return count`, initiate multiple tests, and verify that the number of returned citations meets the expected range.
- Upload a thermal coal spot price CSV and a research report PDF, test the parsing and recall process, and confirm that metadata and paragraph positioning are accurate.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
