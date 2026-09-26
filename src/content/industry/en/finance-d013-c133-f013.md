---
title: Knowledge Base Retrieval and Recall for Securities Financing Daily Reports
slug: /en/industry/finance-d013-c133-f013
page_type: Industry scenario page
article_section: Financing Daily Report
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Securities Financing
meta_description: Securities financing daily report data is sourced from publicly disclosed margin trading business data released by domestic stock exchanges and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Securities Financing Daily Reports

## What This Category of Data Looks Like
Securities financing daily report data is sourced from publicly disclosed margin trading business data released by domestic stock exchanges and securities registration and settlement institutions. Updates occur once per trading day, with no updates on non-trading days. Most documents are presented as structured tables, containing fields such as security code, security abbreviation, margin purchase amount, margin balance, short sale volume, short sale remaining quantity, and short sale balance. Common units include RMB ten thousand and shares. Some documents are classified and summarized by the Shanghai, Shenzhen, and Beijing stock exchange markets.

## Constraints Imposed by These Characteristics on Knowledge Base Retrieval and Recall
The large number of structured fields with clear units requires accurate matching of field names and units during retrieval, to avoid invalid recall across fields or units.
The high daily update frequency requires the knowledge base to support automated incremental synchronization and scheduled updates, to prevent data lag from impacting query accuracy.
Each daily report covers thousands of security targets, so retrieval must support filtering recall scope by dimensions such as security code and market sector, to avoid returning redundant results.
Tables are the primary document format, so the parsing module must support structured table extraction and retain the correspondence between fields and values, to prevent retrieval errors caused by disorganized parsed data.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_TABLE_ENABLE` | Enabled | Securities financing daily reports use structured tables as their primary format. Enabling this setting fully extracts fields, values, and corresponding units, preventing parsed data from becoming disorganized |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 seconds | A full-market financing daily report file requires traversing thousands of rows of table data. Allocating sufficient timeout time prevents parsing interruptions |
| `Recall count` | Top 20 entries | Each daily report covers thousands of security targets. Limiting the number of recalled entries avoids redundant results while covering core query needs |
| `Similarity threshold` | 0.75–0.85 | Precise identification fields such as security code and security abbreviation require high matching accuracy. This range balances precision and recall coverage |
| `UPLOAD_FILE_MAX_SIZE` | 100 MB | A full-market financing daily report Excel file typically does not exceed 50 MB. Allocating reasonable buffer space prevents upload failures |
| `Knowledge Base Auto Sync Cycle` | Once per day | Financing daily reports are publicly updated daily. Synchronizing once per day ensures the knowledge base data matches the timeliness of publicly disclosed information |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: After calling an external interface to upload a financing daily report file, the knowledge base does not display the new file, or returns a `413 Request Entity Too Large` error. Cause: Interface call permissions are not configured correctly, or the uploaded file size exceeds the preset value of `UPLOAD_FILE_MAX_SIZE`, leading to upload failure.
- Phenomenon: When retrieving financing daily report data, only preset QA pairs are returned, and no values or field information from structured tables are recalled. Cause: The `PARSE_TABLE_ENABLE` configuration is not enabled, or the knowledge base is mistakenly set to QA-only mode, with document chunking and structured retrieval functions disabled.
- Phenomenon: Unable to specify only financing daily report data for 100 specified securities during retrieval, and must recall all data from all files in the knowledge base. Cause: Retrieval filtering rules are not configured, or the method to filter recall scope by security code or sector is not mastered, making targeted subset recall impossible.

## How to Confirm Configuration is Correct
- Upload a test financing daily report file, verify that the parsed fields and values in the knowledge base match the original file, to confirm the structured parsing configuration is active.
- Call the external upload interface to upload the test file, check that the interface returns a `200` status code and the knowledge base displays the file, to confirm the interface configuration is correct.
- Initiate a retrieval request with security code as the filter condition, check that returned results only include financing daily report data for the corresponding security, to confirm retrieval filtering rules are configured correctly.
- Wait for the end of a trading day, check if the knowledge base has automatically updated the latest financing daily report data, to confirm the automatic synchronization cycle configuration is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
