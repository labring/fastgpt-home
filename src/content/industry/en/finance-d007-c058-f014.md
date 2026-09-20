---
title: Form and Interaction for Minor Metal Yield Data
slug: /en/industry/finance-d007-c058-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Minor Metal Yield Data
meta_description: Minor metal yield-related data primarily comes from public spot quotes released by domestic nonferrous metal industry associations, futures exchange
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Minor Metal Yield Data

## What this category's data looks like
Minor metal yield-related data primarily comes from public spot quotes released by domestic nonferrous metal industry associations, futures exchange market APIs, and third-party bulk commodity information platform APIs. Update frequency varies by product category: spot-based products are updated once daily after market close, while futures-based products push real-time quotes every 15 minutes during trading days. Each data entry includes a unique product identifier, standard Chinese name, trading pricing unit, daily average transaction price, daily price change amount, daily trading volume, and settlement benchmark price. Pricing units are mostly yuan per ton, with some rare minor metals using yuan per kilogram.

## Constraints imposed by these characteristics on form and interaction workflows
The multi-source data access feature requires the form to support configuring authentication parameters and field mapping rules for multiple data sources, to adapt to interface format differences across platforms. Differences in update frequencies require the form to provide options for configuring update cycles by category, distinguishing pull frequencies for spot and futures products to avoid repeated pulls or delayed updates. Inconsistent pricing units require unit validation and automatic conversion logic in the interactive form, to prevent data chaos across sources. Differences in product identifiers require the form to support custom product mapping rules, matching field naming conventions across different data sources to ensure accurate data matching. The large number of minor metal categories requires the form to support bulk import of category configuration lists, reducing repetitive operations for single-entry configuration. When there are many data fields, the form must provide optional field configuration items, allowing users to display and validate required fields as needed, to avoid invalid data entry.

## How to set configurations
| Configuration Item | Recommended Approach | Rationale |
| --- | --- | --- |
| `external_data_source` | Configure API keys and interface addresses for 2-3 compliant data sources | Multi-source backup prevents single-source failures from disrupting data access |
| `sync_interval` | Set spot products to `86400 seconds`, futures products to `900 seconds` | Matches the actual update rhythms of the two data types |
| `field_mapping` | Configure field mapping rules for product identifiers, names, average transaction prices, price change amounts, and trading volumes | Matches the standard field structure of minor metal data |
| `unit_conversion_enabled` | Enable `true`, and configure conversion coefficients for yuan per ton and yuan per kilogram | Adapts to the characteristic that some minor metals use different pricing units |
| `required_fields` | Configure product identifiers and average transaction prices as required fields | Ensures core availability of data |
| `batch_import_limit` | Set to `1000 entries per batch` | Prevents service timeouts caused by overly large single import volumes |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- Symptom: For form pages configured with the `qwen-max` model, after shrinking and then enlarging the window, previously entered parameters such as Alibaba Cloud API keys disappear. Cause: Persistent storage configuration for the form is not enabled, and cached parameter data is not loaded during re-rendering triggered by page scaling.
- Symptom: When bulk importing minor metal category configurations, the pricing units for some products are not automatically converted. Cause: Conversion coefficients for the `unit_conversion_enabled` parameter are not configured, or the conversion coefficients are set incorrectly.
- Symptom: Some fields in market data returned after form submission are empty. Cause: The `field_mapping` parameter is not configured correctly, causing fields returned by the data source to not match the system's preset fields, preventing proper data parsing.

## How to confirm successful configuration
- Navigate to the FastGPT data source management page, verify that the configured `external_data_source` list matches the actually connected data sources.
- Manually trigger a data sync, check the sync logs for any field parsing failure prompts, and confirm that the `field_mapping` configuration is correct.
- Submit a test data entry, verify that the unit conversion logic takes effect, and confirm that the `unit_conversion_enabled` parameter is configured correctly.
- Simulate a page scaling operation, check that saved configuration parameters in the form are not lost, and confirm that persistent storage configuration is enabled.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
