---
title: Citation Sources and Attribution for Carbon Steel Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c079-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Attribution for Carbon Steel
meta_description: Carbon steel-related data primarily comes from monthly public reports released by the China Iron and Steel Industry Association, official monthly
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Attribution for Carbon Steel Intelligent Due Diligence Reports

## What Data for This Category Looks Like
Carbon steel-related data primarily comes from monthly public reports released by the China Iron and Steel Industry Association, official monthly reports from domestic major steel mills, and spot transaction records from commodity trading platforms. Data update cycles are mostly monthly, with some spot price data updated daily. Document structures are mostly structured tables, containing fields such as carbon steel output, social inventory, rebar/wire rod prices, and yield rate. Units are mostly tons, yuan per ton, and percentage. Some reports include regional breakdown data.

## What Constraints Do These Characteristics Impose on the Attribution Process?
The multi-source nature and structured table format of carbon steel data impose multiple constraints on the attribution workflow. First, nested table headers in structured documents require precise field matching. Misalignment between cited content and original document fields will occur otherwise. Second, the dispersed nature of multiple data sources requires associating links and collection timestamps from all sources during tracing, to avoid confusion between statistical data from different cycles. Third, daily updated spot price data requires precise collection times in attribution information, to verify the timeliness of cited data. Fourth, regional breakdown data’s multi-field attribute requires attribution entries to accurately locate corresponding paragraphs in the original document, to prevent incorrect cross-region and cross-product citations.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_TABLE_ENABLE` | Enabled | Adapts to the structured table format of carbon steel reports to correctly extract field content |
| `RECALL_CHUNK_SIZE` | 800–1200 characters | Carbon steel reports mostly contain long table paragraphs; this length fully covers a single data entry |
| `TOP_K_RECALL` | Top 6 entries | Carbon steel data has many fields, so enough recalled entries are needed to cover all indicators |
| `SOURCE_LINK_VALIDATE` | Enabled | Validates multi-source link validity to avoid citing expired industry reports |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | Reserves sufficient parsing time for large monthly carbon steel reports |
| `UPLOAD_FILE_MAX_SIZE` | 2000 MB | Adapts to batch uploads of industry statistical documents to avoid parsing interruptions |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test against your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: Citation source links display internal proxy addresses and cannot directly access external original documents. Cause: The `SOURCE_LINK_REWRITE` parameter is not configured, and internal proxy addresses are not mapped to publicly accessible original links.
- Symptom: Calling the `/v1/chat/completions` API returns a 200 status code but no `content` field content. Cause: The `ENABLE_SOURCE_LINK` configuration is not enabled, or recalled chunks are not associated with valid source data.
- Symptom: Cited content contains garbled characters, and field order does not match the original document. Cause: The `PARSE_TABLE_HEADER_AUTO_FIX` parameter is not enabled, and the nested header structure of carbon steel reports is not adapted, resulting in abnormal encoding of parsed text.

## How to Verify Correct Configuration
- Upload a local monthly carbon steel report, and check if the parsed text fully extracts output and price fields from the table, with no missing or misaligned content.
- Initiate a test conversation, and confirm that citation sources in returned results display public links to original documents, without using internal proxy addresses.
- Check the `source_info` field in the conversation log, and confirm that each cited entry includes the correct collection timestamp and source document name.
- Confirm that the FastGPT version is v4.8.21 or later to ensure all configuration parameters take effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
