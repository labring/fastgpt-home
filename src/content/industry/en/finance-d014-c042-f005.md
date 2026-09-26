---
title: Multi-turn Dialogue and Prompting for Brand Agency Financial Report Analysis
slug: /en/industry/finance-d014-c042-f005
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompting for Brand Agency Financial
meta_description: Data sources include sales details from partner brands’ e-commerce platform backends, ad spend reports, service ledgers of the agency team, account
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompting for Brand Agency Financial Report Analysis

## What the data for this category looks like
Data sources include sales details from partner brands’ e-commerce platform backends, ad spend reports, service ledgers of the agency team, account operation data, and monthly summary reports. Update frequencies cover real-time daily sales data, monthly operation reports updated by the 5th of each month, and quarterly or annual service financial reports submitted per cooperation cycle. Document structures include structured Excel tables (with fields such as order number, actual payment amount, platform commission, service fee, and others), PDF-format operation summary documents. Some fields are adjusted based on partner brands’ business requirements. Units are mostly yuan, times, and hours, and there is no unified fixed format.

## What constraints do these characteristics impose on multi-turn dialogue and prompting
Data sources are scattered across multiple platforms and ledgers. Multi-turn dialogue must first guide users to clarify the brand and time range corresponding to the data source, to avoid mixing data across brands. Update cycles range from real-time to annual. Prompts must explicitly specify the specific time range of the data, to prevent calling expired or mismatched datasets. Document structures are non-standardized, with differences in fields across partner brands. Multi-turn dialogue must first verify the completeness of required fields, and conduct targeted follow-up questions for missing content. Field units are diverse. Prompts must clearly require unified unit conversion rules, to avoid deviations in calculation results.

## How to configure the settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–12000 characters` | Brand agency financial report data usually includes multiple reports and historical conversation context, requiring sufficient window space to hold complete information |
| `recall_top_k` | `Top 6–10 entries` | Financial report data has many fields, requiring recall of sufficient relevant fields and historical conversation content to avoid missing key information |
| `similarity_threshold` | `0.75–0.85` | Financial report fields have similar names such as "actual payment amount" and "received amount", requiring a reasonable threshold to filter low-relevance recall results |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Large financial report summary files contain multiple sheet tables, requiring a long time for the parsing process |
| `code_runner_enable` | `Enabled` | Custom code is required to remove think tags, unify unit conversions and other business logic |
| `prompt_template_mode` | `Custom mode` | The analysis logic and fields of brand agency financial reports are not universal, requiring custom prompts to adapt to business scenarios |

> The parameter values provided on this page are all conventional recommendations used as starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three common mistakes
- Phenomenon: After adding a code running node to remove think tags, the debugging phase runs normally, but thinking content is still retained during formal operation. Cause: The code node is not connected to the upstream link of conversation output, or the code logic does not cover think tag wrapped blocks for all output formats.
- Phenomenon: Financial report data recalled from the knowledge base is truncated, and normal output is only possible with simple mode when using a quantized model. Cause: The `maxContext` parameter is not adjusted to match the context window of the quantized model, or the number of recalled entries exceeds the maximum token number that the model can process.
- Phenomenon: Conversation logs cannot be deleted, or the log management entry cannot be found. Cause: The editable permission for conversation logs is not enabled in system settings, or the log storage path is incorrectly configured as read-only.

## How to confirm configuration is complete
- Initiate a cross-brand financial report analysis conversation, check whether the system actively follows up on missing brand identifiers and time ranges, to confirm that the multi-turn dialogue guidance logic matches business requirements.
- Upload a financial report summary file with multiple sheets, wait for the parsing to complete, and view the returned field list, to confirm that the recall configuration covers the required business field range.
- Run a workflow that includes a code node, verify whether the output result has removed think tags and unified units as required, to confirm that the code node trigger and logic configuration are correct.
- Enter the conversation log management interface, attempt to delete a single log entry, to confirm that the system permission and storage configuration support log cleaning operations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
