---
title: Sharing and Embedding of Livestock and Poultry Farming Profitability Data
slug: /en/industry/finance-d007-c111-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Livestock and Poultry Farming
meta_description: This data is used for financial and wealth management scenarios. It mainly comes from the Ministry of Agriculture and Rural Affairs livestock and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Livestock and Poultry Farming Profitability Data

## What this category of data looks like
This data is used for financial and wealth management scenarios. It mainly comes from the Ministry of Agriculture and Rural Affairs livestock and poultry farming monitoring database, public monitoring reports from local livestock technology promotion stations, and weekly reports from industry livestock associations. The basic update cycle is daily. Slaughter average prices for core categories such as live pigs and white feather chickens update dynamically with market transactions. Some cost data is aggregated weekly. Each data document includes fields: category identifier, monitoring region, statistical date, slaughter weight, mixed feed average price, epidemic prevention cost, purchase guide price, unit farming net profit, and others. Field units include yuan/kilogram, yuan/head, and yuan/feather. No percentage-based metrics are included.

## Constraints imposed by these characteristics on sharing and embedding workflows
Data has a high update frequency and dynamic fluctuations. If the cache period is too long in embedding scenarios, displayed content will lag behind actual market trends, reducing decision-making reference value for financial and wealth management scenarios. Multiple different units are used across fields. If no filtering or formatting is applied after embedding, mixed units will cause reading difficulties, failing to meet fast viewing needs of professional users. Livestock and poultry farming data often involves regional segmentation dimensions. Sharing and embedding processes need to support parameterized filtering by region and category, otherwise they cannot meet precise viewing needs of different users. Some scenarios require batch export of multi-day data reports. Embedding functions must adapt to display formats for batch data, avoiding interference from redundant information when displaying single items.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_cache_ttl` | `10–20 minutes` | Matches the update cycle of livestock and poultry farming data, prevents data lag caused by overly long caching |
| `iframe_allow_origin` | List of domain names belonging to the business | Restricts embedding sources, prevents content theft and data leakage in unauthorized scenarios |
| `embed_field_filter` | `slaughter average price, mixed feed average price, unit farming net profit` | Retains core revenue-related fields focused on the scenario, removes redundant content such as region codes and statistical dimensions |
| `embed_voice_permission` | `prompt_user` | Guides users to actively authorize voice permissions in embedding scenarios, avoids direct `permission denied` errors |
| `custom_avatar_url` | Address of scenario-specific avatar file | Replaces the default avatar to match the visual style of the livestock and poultry farming industry |
| `hide_thinking_process` | `true` | Hides non-essential thinking process displays, simplifies the market report interface |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: A `permission denied` error pops up when triggering voice playback after embedding. Cause: The `embed_voice_permission` parameter is not configured, or the parameter value does not meet permission requirements for the embedding scenario.
- Symptom: The default generic avatar is displayed on the embedded interface instead of the scenario-specific avatar. Cause: The `custom_avatar_url` parameter is not uploaded or correctly configured, or the file address format is incorrect.
- Symptom: The embedded page displays all redundant data fields, leading to low reading efficiency. Cause: The `embed_field_filter` parameter is not configured, so all data fields are returned by default without targeted filtering.

## How to Confirm Successful Configuration
- Access the configured embedding link, check that the displayed fields only include preset core items such as slaughter average price, mixed feed average price, and unit farming net profit, with no redundant content.
- Wait for the data update cycle, then refresh the embedded page, confirm that the displayed market data matches the latest content released by the data source.
- Attempt embedding from a test domain not added to `iframe_allow_origin`, confirm that the page returns a cross-domain intercept prompt or fails to load normally.
- Trigger the voice playback function, confirm that no permission errors occur, and the interface avatar uses the preset scenario-specific style.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
