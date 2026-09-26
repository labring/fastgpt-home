---
title: Citation Sources and Provenance for Agrochemical Financial Report Analysis
slug: /en/industry/finance-d014-c024-f009
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Provenance for Agrochemical Financial
meta_description: Agrochemical financial report data primarily comes from publicly disclosed periodic reports from domestic and overseas stock exchanges, industrial
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Provenance for Agrochemical Financial Report Analysis

## What This Category’s Data Looks Like
Agrochemical financial report data primarily comes from publicly disclosed periodic reports from domestic and overseas stock exchanges, industrial operation data released by industry self-regulatory organizations, and annual reports published on corresponding company official websites.
Quarterly reports are disclosed 1 to 2 months after the end of each quarter. Annual reports are finalized and disclosed by the end of April of the following year. Temporary announcements are disclosed within 2 trading days after events such as production capacity adjustments or raw material price changes occur.
Each financial report document includes management discussion and analysis, financial statements and accompanying notes. Exclusive fields for the agrochemical category include main product sales volume, production capacity utilization rate, upstream raw material procurement proportion, and environmental protection investment amount, among others. Units are mostly RMB yuan and tons. Some export-related businesses include USD-denominated revenue data.

## Constraints on Citation Sources and Provenance Workflows
Exclusive fields for agrochemical financial reports require precise provenance matching. Do not rely solely on general financial field extraction rules, as this will miss core analysis data such as product sales volume and production capacity.
Frequent updates to temporary announcements require the provenance workflow to support real-time crawling and timestamp verification, to avoid citing expired temporary data.
Disclosure formats vary across different markets. Product details in A-share financial reports are mostly presented in table form, while those in Hong Kong stock financial reports are mostly described in paragraphs. This requires the provenance workflow to support multi-format structured extraction rules.
Some segmented production capacity data is only disclosed in industry association reports. The provenance workflow must support cross-data source association matching to bind and trace exchange financial reports and industry data.

## How to Configure
| Configuration Item | Recommended Value | Rationale for This Value |
| ---- | ---- | ---- |
| `rag_source_filter` | `["Exchange Announcements", "Industry Association Reports", "Company Official Website Annual Reports"]` | Covers core data sources for agrochemical financial reports, prevents irrelevant content from being included in analysis results |
| `recall_top_k` | `Top 8 entries` | Agrochemical financial reports contain many exclusive segmented fields, requiring sufficient recall volume to cover data needed for product and production capacity analysis |
| `parse_chunk_size` | `1200 characters` | Product details and cost structure paragraphs in agrochemical financial reports are lengthy, adapting to structured splitting of long paragraphs to avoid losing context |
| `source_citation_mode` | `full_path_with_timestamp` | Must retain the disclosure timestamp of the original data source to avoid citing expired temporary announcement data |
| `citation_link_enabled` | `Enabled` | Meets compliance requirements, providing traceable original basis for analysis results |
| `timeout_threshold` | `900 seconds` | Parsing agrochemical financial reports involves multiple tables and exclusive field extraction, requiring a longer parsing timeout to ensure complete parsing |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing.

## Three Common Configuration Mistakes
- Phenomenon: Redundant knowledge base citation links appear in reply content, or citation link display cannot be turned off. Cause: The `citation_link_enabled` parameter is not configured correctly, or `source_citation_mode` is set to full links instead of text-only display.
- Phenomenon: Recall results do not include agrochemical-exclusive production capacity and product sales data. Cause: The industry association report data source is not added to `rag_source_filter`, or the value of `recall_top_k` is set too low to cover relevant content for segmented fields.
- Phenomenon: After configuring variable reference rules, the temperature adjustment button disappears, and the generation temperature cannot be adjusted. Cause: The advanced parameter configuration switch is not enabled, or the variable mapping rule for `llm_temperature` is not configured separately, causing default parameters to be locked in variable reference mode.

## How to Confirm Proper Configuration
- Upload the annual financial report document of a target agrochemical company, and check if the parsed fields include exclusive content such as product sales volume and production capacity utilization rate.
- Initiate an analysis query targeting agrochemical product revenue, and verify if the returned results include the disclosure time and access path of the original data source.
- Test triggering the variable reference function, confirm that the value of `llm_temperature` can be adjusted through configuration items, and the temperature adjustment button does not disappear.
- View the recall result list, and confirm that preset data source types such as exchange announcements and industry association reports are included.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
