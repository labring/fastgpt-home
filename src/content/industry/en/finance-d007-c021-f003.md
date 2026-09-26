---
title: Sharing and Embedding for Other Composite Yield Rates
slug: /en/industry/finance-d007-c021-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Other Composite Yield Rates
meta_description: Data sources include public financial market APIs, internal accounting statements from licensed financial institutions, and standardized datasets from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Other Composite Yield Rates

## What the Data for This Category Looks Like
Data sources include public financial market APIs, internal accounting statements from licensed financial institutions, and standardized datasets from third-party data service providers. Full daily data updates complete after market close each trading day. No new data adds on non-trading days. The document uses a structured table format. Each row corresponds to a single statistical target. Fields include target unique code, target full name, daily profit change value, cumulative profit change value, corresponding benchmark change value, and statistical period label. Profit change values use yuan as the unit. Benchmark comparison values appear as numerical values.

## Constraints for Sharing and Embedding Workflows
Differing field names or formats across multiple data sources require unified mapping during sharing and embedding. Without this, embedded content displays incorrectly. The T+1 update cycle requires sharing cache validity to match data update rhythms. This prevents expired cache from causing display lag or invalid data. Structured table formats must adapt to layout containers of different embedding platforms. Otherwise, overflow or layout errors occur. Fields include multiple profit change data types. Custom display fields must be supported to avoid information overload that harms reading experience. Fallback prompts must be configured for non-trading days with no data. This avoids returning direct error messages.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_cache_ttl` | `86400 seconds` | Matches the T+1 daily update cycle to avoid cache expiration or data lag |
| `custom_share_fields` | `["target unique code", "target full name", "daily profit change value", "cumulative profit change value"]` | Filters redundant fields and adapts to the limited display space of embedding scenarios |
| `embed_container_fit` | `responsive` | Adapts to layout containers of different terminals to avoid table overflow or display abnormalities |
| `share_auth_enabled` | `true` | Enables identity authentication for sharing links to control access permissions |
| `data_sync_trigger` | `post_daily_update` | Synchronizes and refreshes sharing cache after daily data updates to ensure timeliness of embedded content |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: Embedded tables have misaligned fields or missing content. Cause: The `custom_share_fields` parameter is not configured, and default full fields are used directly without adapting to the field structure of other composite data.
- Symptom: Sharing links load slowly or return expired data. Cause: The `share_cache_ttl` setting does not match the data update cycle, and an unreasonable caching strategy leads to frequent requests or data lag.
- Symptom: Self-deployed FastGPT cannot enable sharing identity authentication. Cause: An open-source version that supports authentication is not used, or the `share_auth_enabled` configuration item is not set to enabled.

## How to Verify Successful Configuration
- Access the sharing link and check if displayed fields match the content configured in `custom_share_fields`.
- Access the sharing link on a non-trading day and confirm that the preset empty data prompt is displayed, without an error page.
- Access the sharing link with an invalid token and confirm that an authentication failure prompt is returned.
- Paste the embedding code into a test page, adjust the page container size, and confirm that the table displays adaptively.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
