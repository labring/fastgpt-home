---
title: Multiturn Conversations and Prompting for Securities Financial Report Analysis
slug: /en/industry/finance-d014-c133-f005
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Multiturn Conversations and Prompting for Securities
meta_description: Public disclosure platforms of domestic and overseas securities exchanges provide source data for securities financial reports. Update timelines
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multiturn Conversations and Prompting for Securities Financial Report Analysis

## What the Data for This Category Looks Like
Public disclosure platforms of domestic and overseas securities exchanges provide source data for securities financial reports. Update timelines follow fixed schedules: quarterly reports are disclosed within one month after the end of the reporting period, semi-annual reports within two months, and annual reports within four months. The dataset also includes temporary performance bulletins. Typical document structures contain a cover page, table of contents, financial statements, notes to financial statements, management’s discussion and analysis, and other sections. Common fields include operating revenue, net profit, net profit excluding non-recurring gains and losses, earnings per share, and return on net assets. Different fields use distinct units of measurement.

## Constraints Imposed by These Characteristics on Multiturn Conversations and Prompting
Securities financial report documents are often lengthy; a single annual report can span dozens of pages. Multiturn conversations must retain sufficient context to link indicator queries across turns, while avoiding context overflow that disrupts model output. Financial report fields use varied units and measurement standards. Prompts for multiturn conversations must explicitly require the model to unify output units to prevent data confusion. The update nature of disclosure timelines and report versions means multiturn conversations must prompt the model to confirm the current reporting period and disclosed version of the financial report being referenced, to avoid using outdated data. The sudden nature of temporary announcements requires support for quickly appending newly disclosed financial report fragments to conversation context, to ensure analysis timeliness.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Single PDF securities financial reports contain multiple pages of tables and long text. 300 seconds covers parsing time for most large annual reports |
| `maxContext` | `10000–15000 characters` | Core analysis segments of securities financial reports account for approximately 25%-35% of total length. This range retains key financial data while avoiding context overflow |
| `UPLOAD_FILE_MAX_SIZE` | `50 MB` | Publicly disclosed securities annual report PDFs typically do not exceed 30 MB. 50 MB covers upload requirements for temporary announcements and quarterly reports |
| `UPLOAD_FILE_ACCEPT_EXT` | `["pdf", "xlsx", "csv"]` | Publicly disclosed securities financial reports primarily use PDF format. Structured data is often provided in Excel/CSV formats, covering mainstream upload formats |
| `conversation_history_keep_num` | `First 8 turns` | Securities analysis multiturn conversations focus on core indicator comparisons and trend judgments. Excessive historical dialogue interferes with context weighting for current queries |
| `FILE_PARSE_TABLE_MODE` | `Preserve original format` | Securities financial reports contain large volumes of structured financial tables. Preserving original format avoids post-parsing field confusion and facilitates data verification in subsequent multiturn conversations |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Scenario: Markdown content generated in conversations cannot retain table and paragraph formatting when pasted into third-party collaboration tools, only plain text is displayed. Cause: The `PARSE_FILE_MARKDOWN_STRICT` configuration is not enabled, leading to incorrect retention of parsed format markers and parsing failure in third-party tools.
- Scenario: No parsing result is returned after uploading a financial report file, and no error logs appear in the backend. Cause: The uploaded file size exceeds the `UPLOAD_FILE_MAX_SIZE` configuration threshold, or the file format is not included in the allowed range of `UPLOAD_FILE_ACCEPT_EXT`.
- Scenario: The model continues generating responses after calling the API to stop the current conversation. Cause: The correct `conversation_id` parameter is not included in the API request, or the trigger condition for `conversation_stop_api_trigger` is not properly configured.

## How to Verify Correct Configuration
- Upload a securities financial report that meets public disclosure standards, and check if the parsed text retains the original table structure and paragraph formatting.
- Initiate a multiturn conversation, sequentially ask for core financial indicators across different reporting periods, and confirm the model can accurately link data from each period to its corresponding disclosure time.
- Call the stop conversation API, confirm that the current conversation generation process terminates immediately with no additional response content output.
- Upload a file not included in the allowed format list, confirm the system returns a format not supported prompt with no unresponsive behavior.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
