---
title: Sharing and Embedding for Chemical Pharmaceutical Yield Data
slug: /en/industry/finance-d007-c031-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Chemical Pharmaceutical Yield Data
meta_description: The yield and market data for the chemical pharmaceutical sector is sourced from publicly available industry sector market data from domestic
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Chemical Pharmaceutical Yield Data

## What the data for this category looks like
The yield and market data for the chemical pharmaceutical sector is sourced from publicly available industry sector market data from domestic securities markets, and sector statistical data released by official index compiling institutions. Updates are synchronized daily after market close on trading days, with a 15 to 30 minute window for completing post-market data updates. The document structure includes three categories of fields: sector identifiers, sector names, same-day yield, multi-period cumulative yield, and auxiliary statistical fields. For field units, yields are presented in decimal format, transaction volume is measured in yuan, and all statistical fields use integer formatting.

## What constraints these characteristics impose on sharing and embedding
The yield data for the chemical pharmaceutical sector relies on fixed periodic updates tied to trading days. Embedding scenarios must align with the data update window to avoid displaying unsynchronized old data. The multi-period yield fields require sharing and embedding configurations to support specifying returned field sets; otherwise, core analytical information will be omitted. Auxiliary statistical fields are not always necessary, so configurations must allow flexible toggling of displayed content to prevent redundant information on embedded pages. Public data sources also have call frequency limits, so cache configurations must balance data timeliness and interface call restrictions.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_link_expire` | `86400 seconds` | Matches the daily update cycle of chemical pharmaceutical sector data, prevents shared links from displaying old data after expiration |
| `iframe_refresh_interval` | `3600 seconds` | Adapts to the 15 to 30 minute post-market data synchronization window, 1-hour refresh balances timeliness and resource consumption |
| `return_required_fields` | `section name, daily yield, 7-day rolling yield, transaction volume` | Covers fields required for core business analysis, avoids returning redundant data |
| `cache_ttl` | `1800 seconds` | Balances data timeliness and interface call frequency limits, prevents triggering rate limiting rules from third-party data sources |
| `enable_iframe_export` | `false` | Adapts to the lightweight needs of embedding scenarios, disables non-essential Markdown export entry |

> The parameter values provided on this page are all common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: A Markdown export button appears on the embedded iframe page, and it cannot be hidden via configuration. Cause: The `enable_iframe_export` parameter is not set to `false`, or the deployment instance did not load the latest configuration file.
- Symptom: Custom sector filter variables passed via password-free shared links do not take effect for returned chemical pharmaceutical yield data, and the corresponding fields are empty. Cause: Password-free links do not support passing custom variables. Filter conditions must be pre-configured as fixed parameters or dynamically passed via the embedding interface.
- Symptom: Yield data displayed on embedded pages has not been updated for multiple consecutive trading days. Cause: The configured cache duration exceeds the update cycle of the third-party data source, or the `iframe_refresh_interval` is set too long, failing to trigger data refresh.

## How to confirm configurations are correct
- Open the configured shared link, check if returned fields match preset requirements, and adjust `return_required_fields` to align with business needs.
- Embed a test page, wait for the configured refresh interval, then refresh the page to confirm whether data has completed updating, and adjust the refresh interval to meet timeliness requirements.
- View the deployment instance’s running logs to confirm that the `enable_iframe_export` parameter has taken effect, and that no Markdown export entry appears in the iframe.
- Test the password-free shared scenario, confirm that custom filter conditions have been replaced with fixed parameters, and that corresponding fields display correctly.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
