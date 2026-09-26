---
title: Sharing and Embedding for Gas Utility Yield Rates
slug: /en/industry/finance-d007-c099-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Gas Utility Yield Rates
meta_description: Data for gas public utility categories includes daily yield rate and market trend reports. Sources are public gas purchase and sales guidance prices
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Gas Utility Yield Rates

## What this category’s data looks like
Data for gas public utility categories includes daily yield rate and market trend reports. Sources are public gas purchase and sales guidance prices from local municipal public utility regulatory platforms, and listed quotes from energy spot trading markets. Data is compiled within one hour after daily market close.

Each single data document includes the current date, gas category identifier, benchmark purchase price, terminal sales benchmark price, and calculated spread data. All field units are yuan/cubic meter. Spread data is rounded to two decimal places, with no additional percentage annotations.

Each daily report document includes aggregated data for seven consecutive calendar days, sorted in ascending order by date.

## What constraints these characteristics impose on sharing and embedding
Since data updates daily at a fixed time, embedded components must support a scheduled refresh mechanism. Otherwise, expired historical data will be displayed.

Since all field units are uniformly yuan/cubic meter with no percentage annotations, embedded pages must strictly follow preset unit display rules. Do not arbitrarily convert units or add unauthorized calculation annotations.

Since data sources come from multi-channel public APIs, correct cross-origin access permissions must be configured during embedding. Otherwise, browser security interception will be triggered, causing data loading failures.

Since each daily report includes seven consecutive days of aggregated data with a fixed field structure, embedded templates must strictly follow the preset field order. Otherwise, field misalignment and display errors will occur.

## How to set configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `Login-free share link validity period` | `7 days` | Gas utility yield rate daily reports update daily. A 7-day validity period covers a complete weekly cycle, preventing link expiration too early |
| `iframe custom style permission` | `Enabled` | Allows modification of embedded page font, spacing, and border styles to match unified typesetting specifications for gas industry reports |
| `Cross-origin whitelist configuration` | `Add business domain prefixes` | Prevents browser cross-origin interception of API requests, ensuring normal loading of gas data on embedded pages |
| `Hide "view original source" entry when sharing` | `Disabled` | Gas data must retain original data source traceability, preventing users from being unable to verify data authenticity |
| `API returned data format` | `JSON structured format` | Matches the fixed field structure of daily reports, enabling direct rendering of corresponding fields during front-end embedding |
| `Custom error page template` | `Display "Data loading, please try again later"` | Shows a friendly prompt when the API times out or data sources encounter exceptions, aligning with usage habits of industry tools |

> The parameter values provided on this page are conventional recommendations used as starting points for configuration decisions. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: Fonts and borders on embedded pages cannot be customized. Cause: The `iframe custom style permission` configuration item is not enabled. FastGPT restricts style modifications for embedded pages by default.
- Symptom: The "view original source" entry still appears on the page after disabling the login-free share setting. Cause: Latest configuration changes were not saved, or for FastGPT 4.9.6, configuration items must be synchronized separately in the application release settings.
- Symptom: A 403 Forbidden error appears when the embedded page loads. Cause: The business domain of the embedded page was not added to the `Cross-origin whitelist configuration`, triggering browser cross-origin security interception.

## How to confirm configurations are complete
- Copy the generated login-free share link, open it in an incognito browser, and check if the "view original source" button matches the configured hide/show status.
- Deploy the embedded code to a test domain, open the page, and check if styles such as fonts and spacing match the custom configuration.
- Simulate an API request, and check if the returned JSON data fields include preset fields such as current date, benchmark purchase price, and terminal sales benchmark price.
- Wait one hour, then refresh the embedded page, and confirm that the data has updated to the latest daily gas utility yield rate data.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
