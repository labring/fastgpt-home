---
title: HTTP Interfaces and External Systems for Small Home Appliance Yield Rate Reporting
slug: /en/industry/finance-d007-c057-f001
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: HTTP Interfaces and External Systems for Small Home
meta_description: The built-in intelligent collection module and grid power consumption data interface provide the data source for small home appliance yield rate
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# HTTP Interfaces and External Systems for Small Home Appliance Yield Rate Reporting

## What the data for this category looks like
The built-in intelligent collection module and grid power consumption data interface provide the data source for small home appliance yield rate related data. Full data updates for the previous day complete daily between 2:00 AM and 4:00 AM. Data documents use standard JSON array format. Each data entry includes these fields: `device_id` (unique device identifier, string type), `model_name` (device model, string type), `daily_power_consumption` (daily power consumption, unit: kilowatt-hour), `standard_power_consumption` (daily power consumption of traditional devices of the same type, unit: kilowatt-hour), `daily_saving_amount` (daily energy-saving profit, unit: CNY), `report_date` (data date, format: YYYY-MM-DD).

## Constraints for HTTP Interfaces and External Systems
The fixed daily update window requires interfaces to support specifying the `report_date` parameter as the previous day’s date. Requests must avoid the 2:00 AM to 4:00 AM update window, or empty data will return.
Interfaces must validate the legality of numeric values for fields containing monetary and energy consumption data. This prevents parsing failures caused by non-numeric input values.
Device ID and model are core fields for associated queries. Interfaces must support batch data pulls using the `device_id` array. The maximum number of devices per single request must match the scale of small home appliance devices per user.
Data uses standard JSON format. Interfaces must support UTF-8 encoded request and response bodies.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `external_data_sync_interval` | `86400 seconds` | Small home appliance yield rate data is updated once daily, matching the daily report broadcast cycle |
| `external_data_request_timeout` | `30 seconds` | The response delay of small home appliance data source interfaces is usually low; 30 seconds covers most normal request scenarios |
| `external_data_batch_max_size` | `20 units` | The number of small home appliance devices managed by a single user usually does not exceed 20, avoiding batch requests exceeding the interface load limit |
| `api_request_headers` | `{"Content-Type": "application/json", "Authorization": "Bearer ${api_key}"}` | Most small home appliance intelligent data interfaces use Bearer token authentication and return JSON format data |
| `return_selected_fields` | `["device_id", "daily_saving_amount", "report_date"]` | Only retain core fields required for yield rate broadcasting, reducing the size of response data |
| `request_date_offset` | `-1 day` | Pull operating data from the previous day, matching the time range of the daily report broadcast |

> The parameter values provided on this page are conventional recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: The `messages is empty` error returns when calling the HTTP interface, with a 400 response status code. Cause: Query parameters for small home appliance data were not correctly passed in the request body, or the `return_selected_fields` configuration was not set, resulting in empty returned fields.
- Symptom: The `daily_saving_amount` field returned by the interface is `null`, making it impossible to generate yield rate broadcast content. Cause: Correct authentication information was not configured in `api_request_headers`, causing the data source interface to return restricted partial fields.
- Symptom: Calling the internal small home appliance data interface fails after deploying FastGPT in an internal network, with a connection timeout prompt. Cause: The IP segment of the internal data source was not added to FastGPT's internal network access whitelist, preventing the container network from accessing the internal interface.

## How to Confirm the Configuration Is Properly Configured
- Initiate a test request for a single small home appliance device. Verify that the response fields match the configured `return_selected_fields`.
- View FastGPT external data synchronization logs. Confirm that the most recent synchronization task execution time avoided the data source's update window and that no abnormal errors occurred.
- Run a curl command in the FastGPT running environment to call the external data source interface. Verify network connectivity and response validity.
- Adjust the `request_date_offset` parameter to 0. Initiate a test request to confirm the interface correctly identifies and returns data for the corresponding date.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
