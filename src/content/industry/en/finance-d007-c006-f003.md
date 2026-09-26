---
title: Sharing and Embedding of Traditional Chinese Medicine (TCM) Yield Rates
slug: /en/industry/finance-d007-c006-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Traditional Chinese Medicine (TCM)
meta_description: Daily report data for TCM yield rates and market trends comes from two channels: national public trading platforms for Chinese herbal medicine
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Traditional Chinese Medicine (TCM) Yield Rates

## What does this category’s data look like
Daily report data for TCM yield rates and market trends comes from two channels: national public trading platforms for Chinese herbal medicine circulation, and the securities market TCM sector market database. Updates are completed within 1 hour after market close on each trading day, with no updates on non-trading days. The document uses a structured table format, where each row corresponds to a single Chinese herbal medicine variety or sector constituent stock. Fields include variety or sector name, origin or stock code, specification or industry classification, daily trading price, previous trading day’s trading price, and price change amount. The price unit is yuan per kilogram or yuan per share, and the change amount unit matches the corresponding price unit.

## What constraints do these characteristics impose on the "sharing and embedding" link
Market trend data for Chinese herbal medicines and TCM sectors comes from dispersed sources, so content from both data sources must be aggregated. When embedding, multi-data source association rules need to be configured to ensure accurate data integration. Data updates only occur during fixed times on trading days, so the automatic refresh interval of the embedded component must match this cycle to avoid invalid requests or data lag. Fields include prices and change values with different units, so units must be clearly marked during embedded display to prevent data misinterpretation. There is no daily data on non-trading days, so the embedded component needs to be configured with empty data placeholder logic. The number of Chinese herbal medicine varieties is large, so the embedded component must adapt to pagination loading rules to avoid page loading overload.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `multi_source_data_switch` | `enabled` | TCM market trend data includes circulation quotation and securities market data sources, so multi-source aggregation must be enabled |
| `auto_refresh_interval` | `86400 seconds` | TCM market trend data is updated only once per day, setting a fixed 24-hour refresh interval matches the update cycle |
| `field_unit_display` | `enabled` | Data fields include different units such as yuan/kg and yuan/share, so enabling unit display prevents data misinterpretation |
| `empty_data_template` | `No daily market trend data available on non-trading days` | No daily updated data on non-trading days, so a clear placeholder prompt must be configured |
| `embed_pagination_limit` | `20–50 items` | The number of Chinese herbal medicine varieties is large, so pagination loading balances page loading speed and data display volume |
| `share_permission_mode` | `public` | Daily market reports belong to public industry data, so sharing does not require private authentication |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: The embedded page loads with an error in Internet Explorer, and the console returns a `403 Forbidden` or `Unsupported browser` error. Cause: The FastGPT embedded component does not natively support Internet Explorer kernel browsers, and no compatibility downgrade solution has been configured.
- Symptom: No unit labels are displayed for the TCM market trend data shown in the embedded view, leading to confusion between price values. Cause: The `field_unit_display` configuration item is not enabled, so field units are not displayed alongside the data.
- Symptom: The embedded page still displays old trading day data on non-trading days, without updating to the empty data prompt. Cause: The `auto_refresh_interval` is not configured correctly, or no data switching logic for non-trading days has been set.

## How to confirm the configuration is complete
- Trigger the non-trading day scenario, and confirm that the embedded page displays the preset empty data prompt.
- Check the fields displayed in the embedded view, and confirm that each numerical value is accompanied by its corresponding unit label.
- Test the multi-data source configuration, and confirm that the embedded page aggregates both circulation quotation and securities market trend data.
- Verify the permission settings of the shared link, and confirm that they match the preset access rules.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
