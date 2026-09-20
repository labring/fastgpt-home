---
title: Workflow Orchestration for Precious Metal Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c136-f007
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Precious Metal Intelligent Due
meta_description: Precious metal intelligent due diligence report data mainly comes from public market data APIs from official precious metal trading institutions and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Precious Metal Intelligent Due Diligence Reports

## What the data for this category looks like
Precious metal intelligent due diligence report data mainly comes from public market data APIs from official precious metal trading institutions and industry associations, as well as inventory and supply and demand research reports released by industry associations. Market data is updated at minute-level intervals, while inventory and research report data is updated daily. Each individual due diligence report includes fields such as contract code, product name (e.g., Au9999, Ag(T+D)), opening price, closing price, highest price, lowest price, trading volume, open interest, with units including yuan/gram, kilogram, troy ounce. The document structure is divided into two parts: structured market data tables and unstructured research report text. Some data sources return multilingual fields.

## What constraints do these characteristics impose on workflow orchestration
Minute-level real-time market updates require workflow fetch nodes to use a scheduled frequency that matches the data source rhythm. Too high a frequency will exceed API call limits, while too low a frequency will fail to meet the timeliness requirements of due diligence reports. Multi-field and unit conversion needs require adding format conversion nodes in orchestration to unify field names and unit systems across different data sources. The mixed structured and unstructured document structure requires splitting parsing nodes in the workflow to handle market data and research report content separately. Multi-source data integration needs require configuring multiple input nodes in the workflow to ensure alignment and verification of data from different sources in the same process.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `DATA_FETCH_INTERVAL` | `150–300 seconds` | Matches the update frequency of precious metal market data, avoids exceeding API call limits |
| `workflow_cron_expression` | `0/15 * * * *` | Adapts to the scheduled trigger requirements for minute-level market data fetching |
| `PARSE_DOC_FIELD_MAPPING` | `{"contract_code":"合约代码","price":"收盘价","unit":"元/克","volume":"成交量"}` | Unifies field names across multiple data sources, adapts to the field requirements of due diligence reports |
| `ERROR_RETRY_TIMES` | `2–3 times` | Addresses occasional fluctuations in precious metal APIs, reduces the impact of single request failures |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Meets the parsing time requirements for large research report documents |
| `UPLOAD_ALLOWED_MIME_TYPES` | `["application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]` | Supports common research report and data table formats used in due diligence reports |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing.

## Three common mistakes
- Symptom: Dragging workflow nodes causes frontend lag. The lag stops after deleting variable nodes bound to multiple sets of precious metal market data fields. Cause: The variable node binds too many market fields, and excessive node configuration items lead to high frontend rendering load.
- Symptom: Uploaded research report image links in the workflow display an IP plus port format, and are not replaced with a custom domain. Cause: The workflow’s resource domain name replacement rule is not configured, and locally stored resource addresses are not replaced with the official domain name.
- Symptom: Workflow nodes throw validation error prompts containing the `$schema` field. Cause: The imported workflow configuration includes an undeclared `$schema` field, which does not comply with FastGPT workflow JSON specifications.

## How to confirm the configuration is correct
- Run a single test task for the workflow, then check whether each node’s output fields match the configuration in `PARSE_DOC_FIELD_MAPPING`.
- View the workflow trigger logs to confirm that the fetch nodes’ execution interval complies with the `DATA_FETCH_INTERVAL` setting.
- Upload a standard precious metal research report document, then check that the parsed text is not truncated and has complete fields.
- Simulate an API return exception scenario, then check whether the node retries according to the `ERROR_RETRY_TIMES` configuration.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
