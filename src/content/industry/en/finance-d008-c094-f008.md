---
title: Tool Calling and Plugins for Refinery Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c094-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Refinery Intelligent Due
meta_description: Data sources for refinery intelligent due diligence reports include the National Energy Administration petrochemical industry public statistical
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Refinery Intelligent Due Diligence Reports

## What the data for this category looks like
Data sources for refinery intelligent due diligence reports include the National Energy Administration petrochemical industry public statistical database, annual reports and environmental assessment documents disclosed by refinery enterprises, raw material and product market data from third-party bulk commodity trading platforms, and public documents of refinery unit processes.
Update schedules vary across data types: raw material and refined oil prices are updated every working day, industry production capacity and compliance data are updated quarterly, enterprise operating data are updated every six months, and process documents are updated alongside technical renovations.
Documents primarily use structured tables as their main format, with unstructured attachments such as process flow diagrams. Core fields include crude oil purchase volume, atmospheric and vacuum unit processing volume, gasoline yield, and diesel inventory, with corresponding units of ten thousand tons, cubic meters per hour, kilograms per kilogram, and tons respectively.

## What Constraints Do These Characteristics Impose on Tool Calling and Plugins?
Scattered data sources require calls to multiple plugin types to aggregate information. Configure the logical order of plugin calls and data merging rules to avoid information confusion.
Differences in data update frequencies require setting differentiated cache durations for different plugin types. This prevents calls to expired data or overconsumption of interface quotas.
Inconsistent field units and naming require plugins to support unit conversion and field mapping. This ensures consistent data standards for due diligence reports.
Refinery documents include unstructured content such as process flow diagrams. Enable OCR plugins to extract text from images. This increases the complexity of plugin configuration.

## How to Set the Configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `plugin_call_order` | Follow the sequence: raw material supply → production parameters → product production and sales → compliance data | The logical link of refinery due diligence data runs from raw materials to finished products. Calling plugins in this order reduces invalid requests |
| `plugin_cache_ttl` | 3600 seconds for price-related plugins, 604800 seconds for industry data plugins | Large differences exist in update frequencies for different data types. Matching cache durations avoids expired or repeated calls |
| `parse_image_ocr_enable` | Enabled | Refinery documents contain image content such as process flow diagrams and unit nameplates. OCR is needed to extract text |
| `field_mapping_rule` | Map plugin return fields to "refinery due diligence standard fields" | Unify field naming and units across different plugins to prevent data confusion in reports |
| `max_parallel_plugin_calls` | 3 | Refinery due diligence requires calling multiple plugin types. Limiting parallel calls avoids triggering interface rate limits |
| `plugin_timeout` | 120 seconds | Some industry data interfaces have slow response times. Setting a reasonable timeout prevents request interruptions |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: Clicking the plugin trigger button results in no response, and the console returns a `429 Too Many Requests` error. Cause: `max_parallel_plugin_calls` is not configured, and excessive simultaneous plugin calls trigger interface rate limits.
- Symptom: Plugin logs show continuous requests during non-working hours, and account balance is depleted quickly. Cause: `plugin_cache_ttl` is not set, and reasonable call trigger rules are not configured. This causes the system to repeatedly call plugins for non-updated data.
- Symptom: The plugin selection menu pops up for every user question, and it is not possible to set prompts only for the first session. Cause: Session-level plugin trigger restriction configuration is not enabled. The system defaults to triggering plugin selection verification for every user input.

## How to Confirm Correct Configuration
- Send a single round of refinery due diligence simulation request. Check the system plugin call log to confirm that the plugin execution order matches the preset `plugin_call_order`.
- Extract the refinery data fields returned by plugins. Verify that units and naming conform to the preset `field_mapping_rule`.
- Send the same raw material price query request after a 1-hour interval. Confirm that the interface is not called repeatedly. This verifies that the `plugin_cache_ttl` configuration takes effect.
- Send two consecutive due diligence conversations. Confirm that the plugin selection trigger logic conforms to the preset session rules.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
