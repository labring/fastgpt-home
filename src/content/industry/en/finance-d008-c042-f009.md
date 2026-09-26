---
title: Citation Sources and Traceability for Brand Agency Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c042-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Brand Agency
meta_description: Brand agency services support brand promotion for financial and wealth management institutions. The data for their intelligent due diligence reports
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Brand Agency Intelligent Due Diligence Reports

## What the data for this category looks like
Brand agency services support brand promotion for financial and wealth management institutions. The data for their intelligent due diligence reports comes from four main sources: official social media backends of cooperating financial institutions, e-commerce platform data tools, offline cooperation contracts, and third-party social media monitoring platforms.

Data update frequency varies by type:
- Social media published content is synced every hour
- Monthly campaign reports are updated daily
- Cooperation contracts are static documents, and are supplemented and uploaded when new partnerships are added

Document structures include four categories: cooperation agreement PDFs, monthly campaign ledgers in Excel format, social media content release screenshots, and user feedback summary tables. Core fields include cooperating entity name, campaign channel, content release time, interaction volume, and contract validity period. Supported units include "pieces", "times", "yuan", "days", and similar units.

## Constraints Imposed by These Characteristics on the Citation Sources and Traceability Link
The multi-source nature of data for brand agency services serving financial institutions requires traceability systems to support parsing of multiple document formats. This prevents partial data from being untraceable due to exclusive support for a single file type.

Frequently updated social media content requires traceability-linked information to be tied to the latest release time. This prevents the use of expired content from reducing the accuracy of due diligence reports.

Diverse field structures require the system to support custom field mapping. Traceability cannot rely solely on common title and link fields.

Multi-cooperating entity scenarios require traceability information to clearly mark the corresponding cooperating party. This prevents confusion of cited content across different brand agency projects, which would undermine report rigor.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `source_field_mapping` | `{"合作主体":"partner_name", "发布时间":"publish_time", "内容链接":"content_url"}` | Matches the core traceability fields of brand agency due diligence reports, ensures that cooperating entities and release times can be displayed when citing, and complies with compliance requirements for financial institution due diligence |
| `recall_top_k` | Top 8 entries | Covers the main channel types of brand agency monthly campaigns, balances the number of citations and report readability |
| `similarity_threshold` | `0.75-0.85` | Adapts to the high similarity characteristic of agency content, balances citation relevance and coverage, and meets the accuracy requirements of financial institution due diligence |
| `parse_timeout_seconds` | `300 seconds` | Adapts to the parsing duration when monthly campaign reports contain a large number of entries, prevents parsing interruptions from causing report generation failures |
| `enable_source_citation` | Enabled | Meets the compliance traceability requirements of intelligent due diligence reports, clearly marks cited sources, and complies with information disclosure specifications for the financial industry |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- Phenomenon: Campaign data obtained via external HTTP interfaces cannot be traced, and the system prompts that source fields are missing. Cause: The `source_url_field` configuration is not used to specify the link field in HTTP return content as the traceability basis, causing the system to fail to associate corresponding source information.
- Phenomenon: After uploading an agency campaign ledger, the cooperating entity information is not displayed in the cited content. Cause: The cooperating party field in the ledger is not correctly mapped to the `source_field_mapping` configuration item.
- Phenomenon: After uploading a Notion-format agency campaign ledger, valid cited sources cannot be extracted. Cause: The `notion_source_sync` configuration item is not enabled, and the system is not authorized to access the content permissions of the corresponding Notion workspace.

## How to Verify Correct Configuration
- Upload a brand agency monthly campaign report, and check whether the parsed fields match the configuration in `source_field_mapping`.
- Initiate an intelligent due diligence report generation request, and check whether the output content includes marked cited source fields and corresponding links.
- Adjust the value of `similarity_threshold`, and verify whether the relevance of the output citations meets expectations.
- Import a brand cooperation contract document, and confirm whether the traceability information includes the contract entity and validity period fields.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
