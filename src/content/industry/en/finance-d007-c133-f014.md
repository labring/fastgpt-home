---
title: Form and Interaction for Securities Yield Rates
slug: /en/industry/finance-d007-c133-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Securities Yield Rates
meta_description: Securities yield-related data comes from real-time market interfaces of the Shanghai and Shenzhen Stock Exchanges, public datasets from China
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Securities Yield Rates

## What the data for this category looks like
Securities yield-related data comes from real-time market interfaces of the Shanghai and Shenzhen Stock Exchanges, public datasets from China Securities Depository and Clearing Corporation Limited, and index yield datasets from China Securities Index Co., Ltd. Intraday order book and real-time yield data are updated in real time during trading hours. Daily cumulative yield data is updated at a fixed time after market close on trading days.

Data documents use standardized JSON or CSV format, including fields such as unique security identifiers, trading session identifiers, yield indicators for the corresponding category, benchmark reference values, and more. Field units: closing price is in RMB yuan, yield indicators are dimensionless values, and benchmark reference values are point values of the corresponding index.

## What constraints do these characteristics impose on the "form and interaction" link
The characteristics of multi-source data require forms to support multi-data source priority configuration, to avoid broadcast interruptions caused by single-source failure. The real-time update rhythm requires the interaction module to bind trading session verification logic, automatically disabling active pull operations during non-trading hours to avoid obtaining invalid lagged data. The standardized document structure requires forms to preset field mapping rules, automatically matching standard field names of securities data to reduce the probability of manual configuration errors. Field differences across different security categories require interactive forms to support dynamically loading configuration items for corresponding fields, avoiding display of redundant or mismatched fields and improving interaction accuracy.

## How to set the configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `DATA_SOURCE_PRIORITY` | `Exchange market data > China Securities Index data > third-party synchronized data` | The exchange data source has the highest real-time performance and accuracy, meeting the timeliness requirements for securities yield broadcast |
| `FETCH_TRIGGER_TIMES` | `Trigger once every 15 minutes during trading hours 9:30-15:00 on trading days, trigger one full update 1 hour after market close` | Matches the official update rhythm of securities market data, avoiding invalid pull requests that occupy system resources |
| `FIELD_MAPPING_RULE` | `Preset mappings by security type, e.g., stocks mapped to price change rate and closing price; bonds mapped to yield to maturity and clean price` | Adapts to field differences across different security categories, reducing manual configuration workload |
| `REQUEST_TIMEOUT` | `10 seconds` | The average response duration of securities market interfaces covers most normal scenarios; 10 seconds can handle mild network fluctuations |
| `MAX_RETRY_TIMES` | `3 times` | Addresses temporary network jitter; triggers an exception alert after exceeding the retry count to ensure the stability of the broadcast process |
| `DYNAMIC_FIELD_ENABLE` | `Enabled` | Supports automatically loading corresponding fields based on the selected security category, adapting to interaction requirements for different scenarios |

> The parameter values provided on this page are common recommended starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: When `REQUEST_TIMEOUT` is set to more than 30 seconds, a `504 Gateway Timeout` error is returned after a scheduled pull task times out. Cause: The response duration of securities market interfaces is affected by exchange bandwidth fluctuations. An overly long timeout threshold will lead to task backlogs, affecting subsequent broadcast processes.
- Phenomenon: When selecting knowledge base variable references in the form, no security code field is matched, resulting in empty broadcast content. Cause: No preset correspondence between `FIELD_MAPPING_RULE` and knowledge base fields has been configured, so the system cannot automatically map securities-related data fields.
- Phenomenon: Triggering a pull task during non-trading hours returns yield data from the previous trading day. Cause: The interaction module is not bound with trading session verification logic, allowing pull operations during non-trading hours, resulting in the acquisition of lagged market information.

## How to confirm the configuration is complete
- Enter the scheduled task configuration page, verify that the trigger period of `FETCH_TRIGGER_TIMES` matches the securities trading hours. Adjustments must refer to official trading times published by the stock exchanges.
- Manually trigger a pull task, check whether the returned data fields fully match the preset `FIELD_MAPPING_RULE`, with no missing or redundant fields.
- Simulate a network fluctuation scenario, check whether the retry logic for `MAX_RETRY_TIMES` triggers normally, and whether corresponding alert information is generated when an exception occurs.
- Switch configuration items for different security categories, confirm that when `DYNAMIC_FIELD_ENABLE` is enabled, form fields automatically update to optional fields for the corresponding category.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
