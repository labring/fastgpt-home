---
title: Sharing and Embedding of Jewelry Yield Data
slug: /en/industry/finance-d007-c154-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Jewelry Yield Data
meta_description: Jewelry yield-related data primarily comes from brand dealer supply ledgers, offline store POS sales data, and industry terminal monitoring platforms.
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Jewelry Yield Data

## What the data for this category looks like
Jewelry yield-related data primarily comes from brand dealer supply ledgers, offline store POS sales data, and industry terminal monitoring platforms. Data updates occur once weekly, with full weekly data finalized for update at the early morning of the following Monday. Documentation uses structured table formats, with core fields including SKU code, jewelry category, supply unit price, retail guide price, and cost proportion coefficient. Supply unit price and retail guide price use yuan per piece as their unit. The cost proportion coefficient is a unitless decimal between 0 and 1; percentage format is not used for display.

## What constraints these characteristics impose on the "Sharing and Embedding" workflow
The weekly update frequency of jewelry yield data requires embedding component cache durations to match this cycle, preventing expired data from displaying. The structured field system requires embedding components to support custom field filtering. Different usage scenarios need matching field combinations: dealer scenarios display supply unit price and cost proportion coefficient, while consumer scenarios only display retail guide price. The multi-SKU category feature requires sharing links to support parameterized filtering. Specify a category or SKU via URL parameters to load corresponding data, reducing invalid data transmission. Non-percentage numerical units need adaptation during embedded front-end rendering to avoid unit conversion errors.

## How to set the configurations
| Configuration Item | Suggested Value | Rationale |
| ---- | ---- | ---- |
| `shareLinkExpireTime` | `604800 seconds` | Matches the weekly update cycle of jewelry yield data, preventing expired data from being accessed via sharing links |
| `embedComponentCacheTTL` | `604800 seconds` | Aligns with the data update cycle to reduce request overhead from repeated full data pulls |
| `embedAllowedFields` | `SKU Code, Category Name, Supply Unit Price, Retail Guide Price, Cost Proportion Coefficient` | Covers core data fields related to jewelry yield, adapting to display requirements for different scenarios such as dealers and consumers |
| `workflowApiAuthType` | `No Login Required` | Lowers access barriers, aligning with the guest login release function features added in version V4.9.7 |
| `apiRequestTimeout` | `30 seconds` | Reserves sufficient buffer time to adapt to the conventional response duration for structured data pulls |
| `embedCustomParams` | `["category", "skuId"]` | Supports filtering data by category or SKU, adapting to targeted display requirements for different pages |

> The parameter values provided on this page are common recommended starting points for configuration setup. Actual values are affected by material form, data volume and business rules, so specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: The sharing application URL returned by a node in the workflow is empty. Cause: Sharing functionality is not enabled on the application release page, or the called node parameters are not bound to the correct application ID.
- Symptom: Different browsers accessing the same `No Login Required` link obtain inconsistent `userId` field values. Cause: Cross-session identity synchronization in guest login mode is not configured, and the browser's local storage isolation mechanism prevents unified identity retention.
- Symptom: After a user deletes conversation content via a `No Login Required` link, no corresponding operation record appears in the backend logs. Cause: Log retention for guest login temporary sessions is disabled by default in version V4.9.7, and the log retention switch has not been manually enabled.

## How to Confirm Configuration is Complete
- Log in to the FastGPT backend, enter the release settings page of the target application, and check whether the `shareLinkExpireTime` configuration value matches the jewelry data update cycle.
- Generate embedding code and insert it into a test webpage, then confirm that the displayed data fields match the preset `embedAllowedFields` list after loading.
- Run the workflow bound to the sharing link acquisition node, and check whether the output result contains a valid sharing URL address.
- Enable guest login release mode, use two different browsers to access the generated link, and confirm that session identity consistency meets configuration requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
