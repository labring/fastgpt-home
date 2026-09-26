---
title: Citation Source and Traceability for Brand Agency Operation Research Knowledge Base Construction
slug: /en/industry/finance-d006-c042-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Brand Agency Operation
meta_description: The data sources for brand agency operations mainly include product detail documents provided by brands, advertising reports from e-commerce platform
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Brand Agency Operation Research Knowledge Base Construction

## What the data for this category looks like
The data sources for brand agency operations mainly include product detail documents provided by brands, advertising reports from e-commerce platform backends, social media interaction data, and third-party industry monitoring reports. Update cycles vary significantly: e-commerce advertising data is updated daily or hourly, social media interaction data is updated in real time, and static documents from brands are updated on demand.

Document structures include structured tables (such as SKU codes, advertising budgets, ROI), long-text activity planning plans, and product main image attachments. Fields cover SKU codes, impressions, interaction rates, advertising amounts, etc. Units include pieces, yuan, times, etc.

## What constraints do these characteristics impose on the "citation source and traceability" link
The multi-source and heterogeneous data characteristics require the traceability system to distinguish different types of data sources, avoiding confusion between internal brand documents and third-party monitoring data.

Differentiated update cycles require the traceability function to support configuring incremental update rules by data source, ensuring that cited content is always the latest version.

Diverse document structures require parsing tools to retain the original fields and units of structured tables, avoiding information loss caused by extracting only plain text.

Complex fields and units require traceability tags to accurately mark the specific fields and units corresponding to each citation, preventing confusion between advertising data of different products.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `similarity threshold` | `0.65–0.75` | Brand agency operation data mostly consists of structured e-commerce and social media data. A threshold that is too low will introduce irrelevant advertising reports, while a threshold that is too high will miss core product materials |
| `recall TopK` | `Top 3–5` | Research scenarios require precise matching of core data for a single product or single campaign. Excessive recall will lead to redundant traceability information |
| `rerank return count` | `Top 2–3` | Core advertising data is mostly concentrated in the top recall results. Excessive reranked results will increase the reading cost of traceability content |
| `enable source traceability` | `Enabled` | Agency operation data sources include internal brand documents, e-commerce backend reports, and social media backend data. Enabling this function can clearly mark the original source of each citation |
| `incremental update cycle` | `1 hour–24 hours` | Update frequencies vary across different data sources. Set e-commerce advertising data to 1 hour, and static brand documents to 24 hours |
| `PARSE_FIELD_MAPPING` | Configure according to business field mapping | Agency operation data includes exclusive fields such as SKU codes and advertising amounts. Enabling field mapping ensures that accurate business information is marked during traceability |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- The phenomenon is that after setting the `similarity threshold` to 1.0, the generated response still contains a large number of citation contents that do not match core requirements. The reason is that structured data for brand agency operations includes a large number of similar advertising report fields, and the default similarity calculation logic does not distinguish the business weight of fields, resulting in low-relevance content being mistakenly recalled.
- The phenomenon is that referenced Notion links cannot jump normally or display missing content. The reason is that the public sharing permission of the Notion data source is not configured, or the access token of the third-party data source is not correctly bound, causing the system to fail to obtain the complete content of the original document.
- The phenomenon is that the generated citations do not mark the specific fields and units of the data. The reason is that the field extraction configuration of the `PARSE_FIELD_MAPPING` parameter is not enabled, resulting in the parsed document only retaining plain text and losing key traceability information such as SKU, advertising amount, and yuan.

## How to confirm the configuration is complete
- Submit a query that includes specific product advertising requirements, and check whether each citation in the response marks the type and specific path of the original data source.
- Check the incremental update logs of the knowledge base to confirm that different data sources have completed synchronization according to the preset update cycle.
- Manually enter a query with low relevance, and verify that the number of returned citations meets the `recall TopK` configuration requirements.
- View the details of the parsed document to confirm that the fields and units of each structured data have been correctly extracted and marked.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
