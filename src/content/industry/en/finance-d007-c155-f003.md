---
title: Sharing and Embedding for Feed Yield Rates
slug: /en/industry/finance-d007-c155-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Feed Yield Rates
meta_description: Feed market daily report data is collected via daily sampling and monitoring at provincial-level domestic feed wholesale markets. Data aggregation is
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Feed Yield Rates

## What this category's data looks like
Feed market daily report data is collected via daily sampling and monitoring at provincial-level domestic feed wholesale markets. Data aggregation is finalized at a fixed time each day. The data uses a structured table format. Core fields include: feed category code, category name, sampling market name, daily average transaction price (unit: yuan/ton), market transaction volume (unit: ton), and statistical date. The data only includes publicly monitored transaction information, with no additional derived calculations.

## Constraints imposed by these characteristics on the sharing and embedding workflow
The multi-dimensional filtering attributes of feed daily report data require the sharing and embedding process to support targeted content display by category, market, and date. Without this support, accurate access to specified data cannot be achieved. The fixed daily update rhythm requires the embedding component's caching strategy to align with the data update cycle. This prevents display of outdated information. Fields include clear unit labels. Embedded rendering must retain unit information, otherwise data meaning will be ambiguous. The official monitored data attribute requires shared content to include a data source statement. This ensures content compliance and traceability.

## How to set configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `share_allowed_params` | `["category name", "statistical date", "sampling market"]` | Matches the core filtering dimensions of feed daily reports, ensuring targeted and accurate shared content |
| `embed_cache_expire` | `86400 seconds` | Aligns with the daily update rhythm of feed data, balancing timeliness and request efficiency |
| `embed_render_fields` | `["category name", "daily average transaction price", "market transaction volume", "statistical date"]` | Covers core display fields of feed daily reports, retaining unit and statistical dimensions |
| `share_enable_source_tag` | `Enabled` | Meets compliance display requirements for officially monitored data, retaining data source annotations |
| `share_custom_icon` | Upload SVG format icons in accordance with brand visual guidelines | Unifies brand display styles for business scenarios, preventing mismatches between default icons and business needs |
| `embed_allow_ie_compatible` | `Enabled` | Compatible with rendering environments of Trident kernel browsers, adapting to older access scenarios |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: Embedded links opened in Trident kernel IE browsers fail to load and return a 400 error. Cause: The `embed_allow_ie_compatible` configuration is not enabled, and the rendering protocol for older browsers is not supported.
- Symptom: Custom icons in the sharing interface automatically revert to the platform's default icons every few hours. Cause: Custom icons were not uploaded to a compliant storage path, or the configuration was not persistently saved. This causes default values to restore after cache reset.
- Symptom: When calling the embedding interface via OpenAPI, the returned embedding link fails to load feed daily report data for the specified category. Cause: Allowed filtering fields are not configured in `share_allowed_params`, leading to request parameter filtering and inability to obtain targeted data.

## How to confirm configurations are correct
- Navigate to the sharing configuration page, check whether `share_allowed_params` includes the required filtering fields. Generate a sharing link with corresponding parameters, and verify that displayed content matches the filtering conditions after redirection.
- Access the embedding link using a Trident kernel browser, verify that the page loads normally with no rendering errors.
- Wait for the data update cycle, then refresh the embedding page, verify that the data has been updated to the latest version.
- View the icon in the sharing interface, confirm that the custom icon has not automatically reverted to the default style. Check that the configuration is persistently effective.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
