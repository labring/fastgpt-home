---
title: Forms and Interactions for Power Industry Yield Rates
slug: /en/industry/finance-d007-c107-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Forms and Interactions for Power Industry Yield Rates
meta_description: Power industry yield and market data primarily comes from regional power market public trading APIs and industry data files released by provincial
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Forms and Interactions for Power Industry Yield Rates

## What this type of data looks like
Power industry yield and market data primarily comes from regional power market public trading APIs and industry data files released by provincial energy regulatory agencies. Data update cadence falls into two categories: intraday minute-level market data synchronizes every 15 minutes, and daily yield reports update at a fixed time each day. Documents use standardized JSON or CSV formats, and include fields such as trading period, on-grid electricity price, power generation side yield rate, regional load, and new energy grid connection ratio. The unit of electricity price is yuan/megawatt-hour, the unit of yield rate fields is percentage, and the unit of load is 10,000 kilowatts.

## Constraints imposed by these characteristics on forms and interactions
Multiple update frequencies require forms to support time granularity switching, and distinguish selectable time ranges for intraday and daily data. The unique business meanings and units of fields require forms to preset industry term prompts, to prevent users from entering incorrect units or terms. Demand for multiple data sources requires the interaction interface to provide data source checkboxes, and support switching between different APIs to obtain data. The structured field structure requires forms to support field mapping configuration, to establish a one-to-one correspondence between external API returned fields and fields required for system calculations. Frequent intraday updates require forms to support automatic or manual refresh functions, to ensure access to the latest market data.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `formFieldMapping` | `{"spot_price": "grid_connection_electricity_price", "profit_rate": "power_side_profit_margin"}` | Matches the exclusive field names of power data, prevents mismatch between fields returned by the external API and fields required for system calculations |
| `autoRefreshInterval` | `900 seconds` | Matches the 15-minute (900-second) update frequency of power intraday data, ensures access to the latest market data |
| `maxContextToken` | `8000–12000 characters` | Single daily power industry report text has a relatively long length, reserves sufficient context to avoid truncation |
| `apiRequestRetryTimes` | `3 times` | Power market APIs have occasional fluctuations, multiple retries improve the success rate of data acquisition |
| `datasetRecallNum` | `Top 3 entries` | Power industry data sources are single and structured, a small number of recalls can cover core calculation logic |
| `workflowTimeout` | `60 seconds` | Power data API response time is stable within 30 seconds, reserves a reasonable timeout threshold |

> The parameter values provided on this page are all common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing the settings.

## Three Common Mistakes
- Phenomenon: Power yield calculation results are empty when the workflow runs sequentially. Cause: `formFieldMapping` is not configured correctly. The mapping between fields returned by the external API and the system's preset power data fields is incorrect, so valid calculation parameters cannot be extracted.
- Phenomenon: Knowledge base search returns results that exceed the token threshold, triggering context truncation or errors. Cause: `datasetRecallNum` is set to an overly high value, and `maxContextToken` is not restricted. Power industry data text is long, and excessive recall will exceed the context carrying limit.
- Phenomenon: Sequential execution fails when calling external image generation APIs. Cause: Trigger dependencies for serial nodes are not configured in the workflow. Subsequent generation steps are executed before the previous API completes its response, leading to incorrect parameter passing.

## How to Confirm the Configuration Is Correct
- Manually trigger a data pull, check that the returned fields match the mapping relationship configured in `formFieldMapping`, with no missing or incorrectly mapped fields.
- Adjust `datasetRecallNum` to a low value, run a knowledge base search, confirm that the token count of the returned results meets the current context threshold requirements.
- Simulate an API delay scenario, check that the workflow completes responses within the duration set by `workflowTimeout`, and automatically retries the specified number of times upon failure.
- Switch the time granularity to intraday and daily, confirm that the form's time range selector automatically adapts to the corresponding data update frequency, with no invalid time range options.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
