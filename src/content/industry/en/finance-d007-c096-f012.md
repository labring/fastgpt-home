---
title: Model Access and Configuration for Coke Yield Rate
slug: /en/industry/finance-d007-c096-f012
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Model Access and Configuration for Coke Yield Rate
meta_description: Coke market and yield rate data is sourced from public APIs operated by domestic futures exchanges.
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Model Access and Configuration for Coke Yield Rate

## What the Data Looks Like for This Category
Coke market and yield rate data is sourced from public APIs operated by domestic futures exchanges.
Update timing follows regular trading sessions. Initial data is generated during the pre-market auction period. Real-time market data updates after each trade during continuous trading hours. Full daily settlement data is generated after the day’s settlement process.
Standard data sets include these fields: trading date, product contract code, opening price, closing price, settlement price, price change, trading volume, and open interest.
Price-related fields use yuan/ton as the unit. Trading volume and open interest use lots as the unit. No additional nested data levels are present.

## Constraints Imposed on Model Access and Configuration
The real-time update schedule and core settlement price attribute of coke data create multiple constraints for model access and configuration.
A dedicated API key and access permission must be configured for the exchange data source. The pull interval must match the trading session schedule, and should not exceed 60 seconds to ensure daily report timeliness.
Settlement price is the core benchmark for yield rate calculation. The data source configuration must specify pulling settlement price as the priority field, to avoid mistakenly using closing prices.
The existence of multiple monthly contracts requires configuring contract code filtering rules, to ensure only target coke contract data is accessed.
The fixed unit format for fields must be clearly stated in the model prompt, to avoid unit confusion in output results.

## Configuration Setup
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `defaultLLM` | `doubao-1.6-32k` | Meets the text length requirements for yield rate calculation, supports long-context field concatenation and logical deduction |
| `apiPullInterval` | `60 seconds` | Matches the real-time market update schedule for coke trading days, ensures data timeliness for daily reports |
| `contractFilter` | `Only retain coke main contracts with contract codes starting with J` | Filters non-target contract data, prevents invalid market data from other products or far-month contracts |
| `fieldMapping` | `Map original fields to standard Chinese names, unify units to yuan/ton and lots` | Aligns field formats for model input, eliminates unit ambiguity and inconsistent field names |
| `stream` | `false` | Prevents daily report interruptions caused by real-time pushing, ensures complete output in one single response |
| `responseDetail` | `true` | Returns full market fields and calculation logic descriptions, meets the information completeness requirements for daily reports |

> The parameter values provided on this page are common starting points for configuration. Actual values may be affected by material form, data volume and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Symptom: A "No language model configured" error pop-up appears when entering the workspace edit page, or a "Missing LLM configuration" prompt appears when saving the application. Cause: The `defaultLLM` parameter has not been configured in system settings or application configuration, or the selected model has not passed platform permission verification.
- Symptom: When setting `stream=false` and `responseDetail=true` during API calls, the returned results have obvious differences in output format and field completeness compared to the online chat window. Cause: The context and field mapping configuration consistent with the online editor have not been passed synchronously in the API call parameters, or the platform API default parameters are not aligned with the online debugging parameters.
- Symptom: When using the `doubao-1.6` series models, the output only contains the thinking process, with no final main text results. Cause: Output format requirements have not been clearly specified in the prompt, or the model context length is insufficient to carry complete market data and calculation logic output.

## How to Verify a Successful Configuration
- Check the system settings and application configuration pages, confirm that the `defaultLLM` parameter has been selected and saved, and verify that the workspace edit page can be entered normally without errors.
- Initiate an API call, compare the output results with the online chat window, confirm that the `stream` and `responseDetail` parameter configurations match expectations, with no format differences.
- Manually trigger a market data pull, verify that the returned field units and names comply with the preset `fieldMapping` rules, with no unit ambiguity or missing fields.
- Submit a test input containing complete coke market data, confirm that the model output includes both the thinking process and final main text results, with no content truncation.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
