---
title: Citation Sources and Traceability for Securities Financing Daily Reports
slug: /en/industry/finance-d013-c133-f009
page_type: Industry scenario page
article_section: Financing Daily Report
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Securities Financing
meta_description: Data sources are publicly disclosed margin trading daily reports from the Shanghai, Shenzhen and Beijing Stock Exchanges, and relevant statistical
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Securities Financing Daily Reports

## What the data for this category looks like
Data sources are publicly disclosed margin trading daily reports from the Shanghai, Shenzhen and Beijing Stock Exchanges, and relevant statistical reports from China Securities Depository and Clearing Corporation.
The update schedule is to complete same-day data updates by 17:00 each trading day. No updates are made on non-trading days.
Documents are stored as structured tables, including fields such as trading date, security code, security abbreviation, margin purchase amount, margin balance, short sale volume, short sale remaining quantity, short sale balance and others.
Amount fields use RMB yuan as the unit. Quantity fields use shares as the unit. All fields are standardized content that can be extracted structurally.

## What constraints do these characteristics impose on the "citation sources and traceability" link
Exchange publicly disclosed data sources require that citation traceability clearly marks the original disclosure channel and disclosure date, to meet basic compliance requirements for financial data traceability.
The fixed daily update schedule requires that knowledge base incremental syncs trigger per trading day. Citations must limit the valid time window for data to prevent calling expired historical data.
The structured field system includes unique security codes, requiring traceability to bind security code and trading date. This avoids traceability failure caused by security abbreviation changes or data confusion.
Standardized field formats require citation tags to associate with specific fields, not entire text blocks. This improves traceability accuracy and readability.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `rag_ref_enable` | `Enabled` | Securities financing daily reports belong to structured financial data. Clear traceability paths are required to comply with regulatory requirements |
| `rag_top_k` | `5–8 entries` | Securities financing daily reports have relatively few structured fields. Too many recall results will cause redundant citations, while too few will fail to cover core data |
| `rag_ref_metadata_fields` | `["Transaction Date", "Security Code", "Security Abbreviation"]` | The core identifiers for securities financing daily reports are trading date and security code. These can accurately locate individual data entries |
| `rag_ref_format` | `【Source: Exchange Margin Trading Daily Report, Date: {Transaction Date}, Code: {Security Code}】` | Complies with compliance annotation habits for financial data traceability, and facilitates quick location of original data |
| `rag_similarity_threshold` | `0.75–0.85` | Structured data for securities financing daily reports has distinct characteristics. A threshold that is too high will miss relevant data, while a threshold that is too low will introduce irrelevant entries |
| `rag_increment_sync_cron` | `0 17 * * 1-5` | Matches the exchange's daily 17:00 update deadline. Scheduled syncs on working days ensure data timeliness |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: Generated reply body or exported files contain `[1]`-style citation markers. Cause: The `rag_ref_output_clean` parameter is not configured, and no filtering processing is applied to citation markers.
- Phenomenon: Recalled data sources do not match the target security code. Cause: `证券代码` is not added to the `rag_ref_metadata_fields` configuration item, and recall is performed only via text keyword matching, leading to incorrect recall of securities data with the same abbreviation but different codes.
- Phenomenon: Data expiration occurs during citation traceability. Cause: The scheduled configuration of the incremental sync task does not match the exchange data update time, leading to expired data from the previous day or non-trading days being stored in the knowledge base.

## How to Confirm Configuration Is Complete
- Upload a single piece of structured test data, initiate a query that includes the corresponding security code and trading date, and check whether the configured citation annotation format is included in the reply.
- View the knowledge base's incremental sync task logs, confirm that the task triggers at the preset time and has no failed records.
- Initiate a query that does not include the target security code, check that the recall results contain no irrelevant data.
- Export the generated reply file, confirm that no uncleaned citation marker residues are present.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
