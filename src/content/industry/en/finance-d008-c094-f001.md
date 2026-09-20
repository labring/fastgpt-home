---
title: HTTP Interfaces and External Systems for Refining Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c094-f001
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: HTTP Interfaces and External Systems for Refining
meta_description: Refinery intelligent due diligence report data is sourced from publicly disclosed documents of refinery enterprises, monthly statistical reports from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# HTTP Interfaces and External Systems for Refining Intelligent Due Diligence Reports

## What the data for this category looks like
Refinery intelligent due diligence report data is sourced from publicly disclosed documents of refinery enterprises, monthly statistical reports from industry associations, transaction vouchers from supply chain upstream and downstream parties, and publicly available environmental monitoring data. This data provides core support for financial institution due diligence.

Three update cadences apply:
- Monthly basic production and sales data is updated monthly
- Quarterly capacity adjustment data is updated quarterly
- Annual business summary data is updated annually

The document structure is divided into four categories: supply chain ledger, production operation parameters, product inventory and sales, and compliance indicators.

For field specifications:
- Crude oil processing volume is measured in tons
- Unit design capacity is measured in 10,000 tons per year
- Raw material procurement unit price is measured in yuan per ton
- Product outbound volume is measured in cubic meters

## Constraints imposed on HTTP interfaces and external systems
Multiple dispersed data sources require integration with multiple external APIs. Support for concurrent request configuration is needed to improve data pulling efficiency.

Data with different update cadences requires differentiated scheduled pulling cycles. Unified scheduling rules cannot be used.

Differences in fields and units require strict field mapping configurations. This prevents data errors during financial due diligence analysis.

Large volumes of historical data increase the size of single requests. Batch pulling parameters must be configured to avoid request timeouts.

Information involving enterprise operations and compliance requires secure transmission. Signature verification and encrypted transmission options must be configured to meet financial data compliance requirements.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `external_api_concurrent_limit` | `2–3` | Refinery industry external APIs often have rate limiting rules; excessive concurrent requests will trigger request rejection |
| `pull_data_cron_expression` | `0 0 2 1 * ?` (monthly data), `0 0 3 1 */3 * ?` (quarterly data) | Matches the update cycles of different data types to avoid repeated pulling or missed updates |
| `field_mapping_template` | Preset templates categorized by data source | Refinery data fields have large differences in units and definitions; categorized mapping reduces conversion errors |
| `api_request_timeout` | `300 seconds` | Interface response times are typically long when pulling monthly refinery data in batches |
| `api_signature_type` | `HMAC-SHA256` | Refinery data involves enterprise operation information, so signature verification is required to ensure transmission security |
| `file_upload_max_size` | `2000 MB` | Attachments for refinery due diligence reports, such as capacity ledger Excel files, often have large file sizes |

> This page provides parameter values as common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three common configuration errors
- Calling the `rerank_api` interface returns an empty array, with the log showing a `204 No Content` status code. This occurs because the text length of refinery data exceeds the maximum input limit of the reranking model, and no pre-truncation processing is performed.
- Setting `external_api_concurrent_limit` to `10` triggers `429 Too Many Requests` errors from some enterprise ERP interfaces. This occurs because the rate limiting threshold of refinery industry APIs is not matched, and concurrent requests exceed the upper limit allowed by the interface.
- When uploading refinery due diligence report attachments, the system prompts that the file size exceeds the limit. This occurs because the `file_upload_max_size` configuration is not adjusted, and the default value is smaller than the actual size of the attachment.

## How to verify successful configuration
- Call the configured external interface test address, and verify that the returned field names and units match the preset mapping rules.
- Check the execution logs of scheduled pulling tasks to confirm that tasks for different data types are triggered according to the preset cycle, with no abnormal delays.
- Upload the maximum size attachment that meets the refinery due diligence report specifications, and confirm that the interface accepts it without errors.
- Simulate multiple concurrent requests to confirm that all interface return status codes are `200 OK`, with no rate limiting errors.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
