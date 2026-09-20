---
title: Workflow Orchestration for Traditional Chinese Medicine (TCM) Yield Rates
slug: /en/industry/finance-d007-c006-f007
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Traditional Chinese Medicine
meta_description: Data on yields and market trends for TCM-related financial products comes from three sources: TCM ETF market interfaces from stock exchanges, Chinese
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Traditional Chinese Medicine (TCM) Yield Rates

## What data for this category looks like
Data on yields and market trends for TCM-related financial products comes from three sources: TCM ETF market interfaces from stock exchanges, Chinese herbal medicine futures market interfaces from futures exchanges, and structured monitoring data from financial news platforms.
Update frequency varies by product type: TCM ETF data is updated daily after market close, Chinese herbal medicine futures data is updated after each trading day’s close, and index product data is updated weekly.
Each data entry includes more than 10 fields, covering product code, common name, underlying category, latest transaction price, periodic change value, holding ratio, circulation scale, and more. Field units adjust based on product type: ETF products use yuan per share, futures products use yuan per ton, and index products have no fixed trading unit.

## Constraints on Workflow Orchestration
These data characteristics create four key constraints for workflow setup:
1.  Parallel multi-data source call constraint: Different product types use distinct data sources. Three types of interfaces (stock, futures, news platforms) must be called simultaneously. Configure parallel data source nodes in the workflow to avoid delays from serial calls.
2.  Layered update frequency constraint: Products with daily, after-hours, and weekly update cycles require layered scheduled trigger rules that match their respective data source update periods.
3.  Inconsistent field naming constraint: Field names vary across different data sources. Configure field mapping rules to unify non-standard fields into standard fields required for yield calculations.
4.  Unit conversion constraint: Trading units differ across product types. Add unit conversion nodes to ensure consistency during yield calculations.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `schedule_cron` | `0 0 9 * * *` (ETF products), `0 0 15 * * *` (futures products), `0 0 * * 0` (index products) | Matches the update cycles of different product types, ensuring data fetch timing aligns with data source updates |
| `datasource_parallel_count` | `3` | Supports simultaneous calls to stock, futures, and news platform data sources, avoiding timeouts from serial calls |
| `field_mapping_template` | Calibrated based on actual testing | Adapts to differences in field naming across data sources, mapping non-standard fields to unified standard fields for yield calculation |
| `response_timeout` | `600 seconds` | Covers total time for multi-data source calls, preventing interface timeouts caused by large data volumes |
| `variable_reference_scope` | `Session context + knowledge base retrieval variables` | Supports binding TCM financial product variables from the knowledge base in the workflow, enabling dynamic filtering of target data |
| `chat_trigger_button_config` | Display submit button, bind variable submission event | A pop-up button appears in the session to trigger the workflow submission phase, passing user-selected product parameters to subsequent nodes |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: Workflow runs return empty fields, with an error message stating "standard fields not matched". Cause: No `field_mapping_template` is configured, and non-standard field names returned by data sources are directly used for yield calculations, resulting in field matching failures.
- Phenomenon: No submit button appears in the session, making it impossible to trigger subsequent workflow nodes. Cause: The session button display configuration for `chat_trigger_button_config` is not enabled, or the correct variable submission event is not bound.
- Phenomenon: Mermaid generation node returns an empty image link with a 408 status code. Cause: No reasonable `response_timeout` value is set, or the MCP Server access address is not configured correctly, resulting in request timeout and failure to obtain generation results.

## How to Confirm Correct Configuration
- Execute workflow test nodes, check whether returned fields match preset standard fields, confirm field mapping configuration is active.
- Trigger the workflow from the session interface, check whether the preset submit button appears, confirm button configuration is correct.
- Call the Mermaid generation node, check whether the returned link is accessible normally, confirm MCP Server configuration is correct.
- View workflow run logs, confirm scheduled tasks trigger per the preset `schedule_cron` expression, confirm scheduled configuration is active.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
