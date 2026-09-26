---
title: Sharing and Embedding of Telecommunications Service Revenue Yields
slug: /en/industry/finance-d007-c144-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Telecommunications Service Revenue
meta_description: Telecommunications service revenue yield data originates from financial institution telecommunications service billing systems and customer
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Telecommunications Service Revenue Yields

## What the data for this category looks like
Telecommunications service revenue yield data originates from financial institution telecommunications service billing systems and customer interaction signaling collection platforms.
Data is aggregated by calendar day. Same-day statistical data is finalized in the early morning of the next day.
Each data document contains six core fields: service code, covered service scenarios, statistical period, per-unit traffic revenue, monthly cumulative revenue, and period change value.
Per-unit traffic revenue is measured in yuan per 100 SMS.
Monthly cumulative revenue is measured in ten thousand yuan.
Period change value refers to the revenue difference relative to the baseline period.

## Constraints imposed by these characteristics on the sharing and embedding process
The daily aggregation characteristic of telecommunications service revenue yields restricts shared content to only finalized historical statistical results. Real-time pushing of incomplete temporary data is not allowed.
The multi-field document structure requires embedding configurations to explicitly specify the display field combination. This avoids display chaos caused by too many fields, or inability to support business judgment due to missing key fields.
Different fields use different units. Embedding configurations must include unit annotation parameters to prevent business misunderstandings caused by unit confusion.
The fixed update cadence requires that the cache period of shared links matches the aggregation period. This prevents displaying expired data beyond the update cycle.
Telecommunications service data is often associated with specific service scenarios. Embedding components must support passing scenario filtering parameters to meet the viewing needs of different business roles.

## Configuration Setup
These configuration guidelines apply to FastGPT 4.9.6 and later versions.

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_expire_days` | `1–7 days` | Matches the daily aggregation update cadence of telecommunications service revenue data, ensuring the timeliness of cached data |
| `embed_show_fields` | `Service Code, Covered Scenarios, Unit Traffic Revenue, Monthly Cumulative Revenue` | Matches the core fields of telecommunications service revenue documents, avoiding redundancy or missing key business information |
| `embed_unit_override` | `Unit Traffic Revenue: yuan/100 SMS, Monthly Cumulative Revenue: ten thousand yuan` | Uniformly annotates the units of display fields, eliminating business misunderstandings caused by unit confusion |
| `share_require_auth` | `Configure by Business Permission` | Telecommunications service revenue data belongs to sensitive data operated by financial institutions, requiring access permission control based on scenario |
| `share_show_source` | `Configure by Business Permission` | Controls whether to display the data source link, adapting to different permission control requirements |
| `workflow_share_url_enable` | `true` | Supports automatic generation of shared links in workflows, adapting to integration requirements for automated daily report broadcasts |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on appropriate samples before finalizing settings.

## Three common configuration mistakes
- Phenomenon: After enabling `share_show_source` as `false` for a non-login shared link, the original view button still displays when accessed. Cause: The `share_allow_anonymous` parameter was not updated synchronously. In non-login mode, this parameter takes priority over `share_show_source`, resulting in the configuration not taking effect.
- Phenomenon: The per-unit traffic revenue value displayed in the embedding component does not match the actual value, resulting in numerical deviation. Cause: The `embed_unit_override` parameter was not configured. The default unit does not match the unit used by the business, and no conversion was performed.
- Phenomenon: The interface for generating shared links called in the workflow returns a `403 Forbidden` error. Cause: The `workflow_share_url_enable` configuration was not enabled. The workflow does not have permission to generate shared links.

## How to confirm the configuration is successful
- Access the configured shared link, verify that the displayed fields match the configuration in `embed_show_fields`.
- Check the numerical annotations in the embedding component, confirm that the units match the configuration in `embed_unit_override`.
- Test both non-login and authorized login access modes, confirm that permission configurations meet the control requirements of financial business.
- Trigger the shared link generation action in the workflow, confirm that the returned link can load the configured content normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
