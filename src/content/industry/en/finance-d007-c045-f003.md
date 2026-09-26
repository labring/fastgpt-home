---
title: Sharing and Embedding for Commercial Vehicle Yield Rates
slug: /en/industry/finance-d007-c045-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Commercial Vehicle Yield Rates
meta_description: Data for commercial vehicle yield rate daily reports comes from the telematics TSP platform, freight order system, and fleet operation management
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Commercial Vehicle Yield Rates

## What the data for this category looks like
Data for commercial vehicle yield rate daily reports comes from the telematics TSP platform, freight order system, and fleet operation management system. The data updates every early morning, generating full statistics for the previous day. It supports backtracking historical data by operation cycle. The document structure is split by operating entity. Each data entry includes fields such as vehicle ID, operation duration, total revenue, direct costs, and net revenue. Operation duration is measured in hours. Total revenue, direct costs, and net revenue are measured in yuan. No percentage display fields are included.

## What constraints these characteristics impose on sharing and embedding
Commercial vehicle yield rate daily report data relies on multi-system aggregation and contains operation-sensitive information. As such, sharing and embedding must balance data timeliness and security. The daily T+1 update rhythm requires share link cache duration to match the update cycle, preventing expired data from being displayed. The multi-field document structure requires embedded components to support custom field display and filtering, adapting to the viewing needs of different operating entities. The vehicle-level data granularity requires share permissions to support configuration by fleet or vehicle dimension, preventing unauthorized access.

## How to set the configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `shareLinkExpireTime` | 86400 seconds | Matches the T+1 update rhythm of commercial vehicle yield rate daily reports to avoid displaying expired data |
| `shareRequirePassword` | Enable as needed, default disabled | Commercial vehicle operation data contains sensitive revenue information; enabling this restricts unauthorized access |
| `iframeAllowOrigin` | Fill in a list of business domain names, separated by commas | Restricts cross-domain access scope for embedded pages to comply with data security compliance requirements |
| `disableShareQuote` | Enable as needed | Disabling the quote view function prevents external platforms from leaking the original data link, adapting to the confidentiality requirements of commercial vehicle data |
| `customEmbedStyle` | Calibrate based on actual testing | Adapts to the display requirements of multi-field commercial vehicle data, adjust card width, field spacing and other styles |
| `shareAuthScope` | Fleet dimension | Matches the data structure of commercial vehicles grouped by operating entities, only grants view permissions for specified fleets |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: The share link forces password input on first open, even when password protection is not enabled. Cause: The `shareAuthScope` parameter is not configured correctly, causing the permission verification logic to incorrectly trigger password verification.
- Phenomenon: The page style embedded via iframe cannot be modified, and the custom style configuration does not take effect. Cause: The domain name of the embedded page is not configured in `iframeAllowOrigin`, causing the custom style cross-domain request to be blocked.
- Phenomenon: After disabling the `disableShareQuote` function, accessing the share link of FastGPT 4.9.6 still displays the quote view button. Cause: There is a configuration synchronization delay in this version. Restart the application service for the configuration to take effect.

## How to confirm the configuration is complete
- Open the configured share link, check whether the permission verification logic meets expectations, and verify whether the password input or no permission intercept prompt is correct as needed.
- In the browser developer tools of the embedded page, check whether the custom style has been loaded and confirm that there are no error messages for cross-domain requests.
- Wait 24 hours and refresh the share link to confirm that the data has been updated to the latest previous day's daily report data.
- Check the status of the share link's quote view button to confirm that it matches the configuration result of `disableShareQuote`.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
