---
title: Form and Interaction for Coking Coal Yield Rates
slug: /en/industry/finance-d007-c097-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Coking Coal Yield Rates
meta_description: Coking coal market and yield rate data is primarily sourced from public market APIs of the Dalian Commodity Exchange and domestic coal industry spot
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Coking Coal Yield Rates

## What the data for this category looks like
Coking coal market and yield rate data is primarily sourced from public market APIs of the Dalian Commodity Exchange and domestic coal industry spot quotation platforms. Data updates follow two schedules: futures market data is updated within 15 minutes after each trading day’s close, while spot quotation data is updated each morning. Each data entry includes fields such as trading date, product code, settlement price, trading volume, open interest, spot benchmark price, and more. All field units follow general commodity standards. For example, settlement price uses yuan per ton as its unit, while trading volume and open interest use trading lots as their units.

## What constraints these characteristics impose on form and interaction workflows
Data sources are split into futures and spot categories. The form must support data source switching options to avoid mixing calculation logic for the two data types. The two types of data have different update schedules. The interactive interface must support configuring scheduled pull task trigger times to match the update cycles of the corresponding data sources. Field units are unified to commodity standard units. The form must automatically bind unit suffixes without requiring manual input from users, while also validating the rationality of input numerical values. Coking coal futures contract codes follow a fixed format. Form input fields must add format validation rules to block input content that does not match the JM+number pattern. Yield rate calculations rely on the difference between settlement price and benchmark price. The form must preset basic calculation logic without requiring users to manually write formulas.

## How to Set Configurations

| Configuration Item | Recommended Setting | Rationale |
|---|---|---|
| `FORM_FIELD_VALIDATION_RULES` | `{"code": {"pattern": "^JM\\d{2}$", "message": "Please enter a valid coking coal futures code format, such as JM2409"}}` | Coking coal futures contract codes always start with JM, followed by a two-digit year and two-digit month numeric combination. Matching this rule blocks invalid input |
| `DATA_SOURCE_SYNC_INTERVAL` | `1440 minutes` | Both coking coal futures and spot data are updated daily. Synchronizing once per day ensures data timeliness and avoids resource occupation from frequent pull requests |
| `UPLOAD_FILE_MAX_SIZE` | `50 MB` | Single files for coking coal market daily reports typically range from tens of KB to several MB. Setting 50 MB covers conventional import scenarios while restricting malicious large file uploads |
| `PARSE_FILE_TIMEOUT_SECONDS` | `60 seconds` | A single coking coal market daily report contains approximately 100 entries. 60 seconds is sufficient to complete text parsing and field extraction, avoiding task interruptions due to timeout |
| `RECALL_TOP_K` | `Top 3 entries` | Core information for coking coal market data focuses on the day’s latest settlement price, trading volume, and basis difference. Recalling the top 3 entries ensures the accuracy of interactive results and avoids interference from redundant information |
| `FORM_AUTO_UNIT_BIND` | `Enabled` | All fields related to coking coal use fixed units. Automatic binding reduces user input errors and improves interaction efficiency |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: After uploading a TXT file of the coking coal market daily report, the interface returns the `failed to create post p` error. Cause: The `UPLOAD_FILE_MAX_SIZE` parameter is not configured, or its value is set too small, causing the request body to exceed server limits during large file uploads.
- Symptom: After configuring the data source synchronization task, the regularly pushed messages do not include coking coal yield rate data. Cause: The `DATA_SOURCE_SYNC_INTERVAL` is not set to match the update cycle of coking coal data, resulting in expired data being pulled.
- Symptom: When a user enters coking coal-related numerical values in the chat window, the corresponding units are not automatically bound, requiring manual addition of the yuan per ton suffix. Cause: The `FORM_AUTO_UNIT_BIND` configuration is not enabled, so units are not automatically attached.

## How to Confirm Successful Configuration
- Try entering a code that does not follow the JM+number format in the form input field. Check if the preset validation prompt pops up, confirming that the `FORM_FIELD_VALIDATION_RULES` configuration is active.
- Manually trigger a data source synchronization task. Check if the update time of the pulled coking coal data matches the update schedule of the current data source, confirming that the `DATA_SOURCE_SYNC_INTERVAL` configuration is reasonable.
- Upload a coking coal market daily report file that follows the correct format. Check if the parsing progress completes within a reasonable duration, confirming that the `PARSE_FILE_TIMEOUT_SECONDS` configuration is adapted to the data volume.
- Enter coking coal-related numerical values during chat interaction. Check if the corresponding units are automatically bound, confirming that the `FORM_AUTO_UNIT_BIND` configuration is enabled.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
