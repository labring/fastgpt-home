---
title: Citation Sources and Traceability for Coke Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c096-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Coke Intelligent Due
meta_description: Coke due diligence data primarily comes from industry association monthly supply and demand reports, real-time quotes from coastal port spot trading
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Coke Intelligent Due Diligence Reports

## What This Category’s Data Looks Like
Coke due diligence data primarily comes from industry association monthly supply and demand reports, real-time quotes from coastal port spot trading platforms, futures exchange delivery warehouse receipt data, and downstream steel mill purchase ledgers.
Data update frequencies are divided into daily (spot prices, port inventory), weekly (weekly industry inventory), and monthly (supply and demand balance sheets).
Most single documents are structured tables or annotated PDF reports. Core fields include origin, sulfur content, ash content, and benchmark delivery price. Units include yuan/ton, percentage, ten thousand tons, and others. Some non-standard survey data requires manual annotation and categorization.

## Constraints on Citation and Traceability
The multi-source heterogeneous data characteristics of the coke category impose multiple constraints on the citation and traceability process.
Daily updated spot price data requires real-time synchronized data source access to ensure the timeliness of cited content.
Structured port inventory and supply and demand table documents require dedicated table parsing configuration. Without this, core fields cannot be accurately extracted and traced.
Time stamp formats differ across data sources. Futures delivery data uses the delivery date as the benchmark, while spot quotes use the trading date as the reference point. The time dimension for traceability must be unified.
Long-form monthly industry reports require limiting single-segment recall length to avoid truncated traceability information caused by exceeding the context window.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `recall_count` | `top 8-12 entries` | Coke data is mostly structured entries. Too many recall entries cause context redundancy, while too few fail to cover core supply and demand and price information |
| `PARSE_TABLE_ENABLE` | `Enabled` | Most core coke data is stored in table format. Enabling this allows accurate extraction of fields such as origin and price for traceability |
| `similarity_threshold` | `0.75-0.85` | Coke industry terminology is highly specialized. A threshold that is too low introduces irrelevant coal category data, while a threshold that is too high fails to retrieve relevant segmented information |
| `SOURCE_TIMESTAMP_ALIGN` | `Align by trading date` | Time benchmarks differ between coke spot and futures data. Unified alignment avoids traceability time confusion |
| `MAX_DOC_PARSE_LENGTH` | `800-1200 characters` | Monthly supply and demand reports have long length. Limiting single-segment length prevents context window overflow |
| `API_KNOWLEDGE_BASE_ACCESS` | `Bind exclusive API key` | Private knowledge bases require restricting external access permissions to ensure the security of traceability data |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: When calling the API for queries, the returned citation list includes local knowledge base entries, but the answer body does not associate corresponding content. Cause: The `recall content splicing switch` is not configured, causing recalled knowledge base content to not be injected into the generation context.
- Phenomenon: Parsed coke table data is missing sulfur content and ash content fields. Cause: The `PARSE_TABLE_ENABLE` configuration is not enabled, or the table parsing column matching rules do not cover non-standard table headers.
- Phenomenon: Traceability timestamps are disorganized, with some data marked as delivery dates and others as trading dates. Cause: The `SOURCE_TIMESTAMP_ALIGN` parameter is not configured, and the time benchmarks of different data sources are not unified.

## How to Confirm Proper Configuration
- Upload a coke spot price table document, check whether the parsing result fully extracts core fields such as origin, price and sulfur content, to confirm that the table parsing configuration is effective.
- Initiate a query involving coke spot prices, check whether the returned citation list includes entries from corresponding data sources, and whether the timestamp format is unified.
- Call the API interface with a private knowledge base query request, verify that the returned results only include authorized knowledge base content, to confirm that the API access permission configuration is effective.
- Adjust the `recall_count` parameter, compare the coverage of answer content under different values, to confirm that the recall volume meets business requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
