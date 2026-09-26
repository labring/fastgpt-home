---
title: Form and Interaction for Iron Ore Yield Rates
slug: /en/industry/finance-d007-c150-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Iron Ore Yield Rates
meta_description: Iron ore-related yield and market data primarily comes from Dalian Commodity Exchange iron ore futures contracts and major domestic coastal port spot
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Iron Ore Yield Rates

## What the data for this category looks like
Iron ore-related yield and market data primarily comes from Dalian Commodity Exchange iron ore futures contracts and major domestic coastal port spot quotation platforms. Real-time market data updates every 10 minutes during trading hours. A complete daily statistical document is generated after 17:00 each day. Documents are grouped by futures contract, and include fields such as contract identifier, daily benchmark quotation, daily settlement price, price change amount, position size, and more. Price-related fields use yuan/wet ton as the unit, position size uses trading lots as the unit, and there are no percentage-based statistical items.

## Constraints on form and interaction workflows
Since market data updates every 10 minutes, interactive components must support real-time triggering to pull the latest data, while adapting to grouping display logic for different contracts. Because documents are grouped by contract and contain no percentage-based statistical fields, the form must preset contract code format validation rules to block invalid input entries, and must not generate percentage-based input items by default. Daily statistical documents are generated at a fixed time each day, so scheduled pull tasks must align with this time window to avoid pulling empty, ungenerated data. Position size uses trading lots as the unit, so the form must clearly label unit prompts to reduce user input errors.

## Configuration settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `form_field_unit` | `yuan/wet ton`, `trading lots` | Matches the standard field units for iron ore market data, unifies input and output formats |
| `tool_trigger_interval` | `600 seconds` | Adapts to the 10-minute market data update frequency for iron ore, avoids frequent pull requests |
| `contract_code_regex` | `^i\d{4}$` | Matches the standard code format for Dalian Commodity Exchange iron ore futures contracts, blocks invalid inputs |
| `schedule_fetch_time` | `17:00-18:00` | Matches the generation time window for the daily statistical document, ensures complete daily data is pulled |
| `input_field_validation` | `Only positive floating-point numbers and integers are allowed` | Adapts to the input requirements for numerical fields such as prices and price changes, reduces format errors |
| `form_display_group` | `Group by futures contract` | Matches the document structure of iron ore data grouped by contract, improves interactive readability |

> The parameter values provided on this page are common recommended starting points for determining configurations. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Form input fields do not appear in conversations. Cause: The `form_show_in_dialog` configuration item is not enabled, causing the form to only take effect in the background and not sync to the conversation frontend.
- Scheduled iron ore data pull returns empty results. Cause: The scheduled task execution time is set earlier than 17:00, the time when the daily document is generated, and does not match the data update window.
- Contract code input triggers format validation errors. Cause: The regular validation rule for `contract_code_regex` is not configured, or the regular expression does not match the standard format of Dalian Commodity Exchange contracts.

## How to confirm the configuration is complete
- The test conversation interface is accessed, a preset iron ore contract code is entered, and form fields are verified to display correct unit prompts.
- A real-time pull operation is triggered, and the returned market data is checked to confirm inclusion of preset contract grouping information and compliance with required field formats.
- A scheduled pull task is configured, wait until after 17:00 that day, and task logs are reviewed to confirm successful pulling of complete daily data.
- A test form is submitted, and entered numerical fields are verified to pass validation without displaying format error prompts.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
