---
title: Sharing and Embedding for Small Home Appliance Yield Data
slug: /en/industry/finance-d007-c057-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Small Home Appliance Yield Data
meta_description: The yield and market trend data for small home appliances mainly comes from built-in energy consumption collection modules of smart small home
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Small Home Appliance Yield Data

## What the data for this category looks like
The yield and market trend data for small home appliances mainly comes from built-in energy consumption collection modules of smart small home appliances, synchronized data from home smart meters, and publicly available energy efficiency filing information for the corresponding product category. Data is updated daily: full previous day’s data is compiled at midnight each day to generate a single device’s daily yield report. Each data document includes 6 core fields: device unique identifier, device model, daily cumulative operating duration, daily energy-saving yield amount, daily electricity cost savings, and affiliated energy efficiency grade. For field units: operating duration is measured in hours, yield amount in Chinese Yuan (RMB), and energy efficiency grades are identified by uppercase English letters.

## What constraints these characteristics impose on the sharing and embedding workflow
The daily update schedule of small home appliance yield data requires embedding components to be configured with a daily midnight data source synchronization task. This ensures displayed content matches official compiled data and avoids data lag. Each single data document contains multiple fields with distinct units. During embedding, format conversion rules must be configured separately for fields like monetary amounts and operating duration to ensure readable display. The device unique identifier is the core parameter for data matching. Correct device ID must be passed during embedding calls, otherwise yield data for the corresponding device cannot be loaded. Text identifiers for energy efficiency grades must be mapped and converted in advance. Raw encoded content must not be directly output during embedded display. Additionally, the document size of single device daily data is small. Embedding components do not need large cache mechanisms, but the number of documents returned per request must be limited to avoid loading redundant content.

## How to set the configurations
| Config Item | Recommended Value | Rationale |
| --- | --- | --- |
| `iframe_custom_css` | `body { font-size: 14px; padding: 12px; border-radius: 8px; }` | Adapts to the short text display needs of small home appliance yield data, prevents layout overflow caused by default styles |
| `data_cache_ttl` | `86400 seconds` | Matches the daily update schedule of small home appliance data, ensures the cache synchronization cycle aligns with official data |
| `api_request_timeout` | `30 seconds` | Adapts to response times for pulling data across multiple devices, prevents request timeouts caused by scattered data sources |
| `share_expire_days` | `7 days` | Meets short-term data sharing needs for financial scenarios, balances security and reusability |
| `share_show_original` | `Disabled` | Most small home appliance yield data is used for internal operations or household scenarios, no need to display the original document entry |
| `pass_user_id_param` | `user_id` | Supports passing through calling user identifiers, adapts to identity acquisition requirements for MCP Server |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common misconfigurations
- Symptom: Embedded iframe component styles cannot be modified as expected, and page overflow or layout chaos occurs. Cause: The `iframe_custom_css` parameter is not configured correctly, or the custom CSS code has syntax errors and does not override default styles.
- Symptom: When accessing the application via a login-free sharing link, the View Original button still displays even if the `share_show_original` setting is disabled. Cause: The FastGPT version is lower than 4.9.6. This version fixes configuration synchronization issues in login-free scenarios, and configurations in older versions do not take effect.
- Symptom: The MCP Server cannot obtain the userid identifier of the calling user. Cause: The `pass_user_id_param` parameter is not configured, or the passed parameter name does not match the FastGPT settings, resulting in failure to correctly pass through user identity information.

## How to confirm configurations are set correctly
- Open the preview page of the embedding component, check whether the styles match the expected font, margin, and rounded corner configurations, and confirm that the custom CSS takes effect.
- Wait for a full data update cycle, check whether the yield data displayed by the embedding component matches the official compiled data, and confirm that the cache configuration is correct.
- Try passing different device ID parameters, check whether the component can correctly load the yield data of the corresponding device, and confirm that the device ID matching logic works properly.
- Call the associated MCP Server interface, check whether the userid identifier of the current calling user can be obtained, and confirm that the user identity passing configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
