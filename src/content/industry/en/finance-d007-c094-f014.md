---
title: Forms and Interactions for Refinery Yield Rates
slug: /en/industry/finance-d007-c094-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Forms and Interactions for Refinery Yield Rates
meta_description: Data related to refinery yield rates comes primarily from internal enterprise Manufacturing Execution Systems (MES), raw material purchase receipts
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Forms and Interactions for Refinery Yield Rates

## What this category of data looks like
Data related to refinery yield rates comes primarily from internal enterprise Manufacturing Execution Systems (MES), raw material purchase receipts, finished product sales settlement documents, and third-party bulk commodity quote platforms. Full production and quote data from the previous day is synced at fixed daily times. Document formats are structured CSV or Excel tables. Fields include unique device code, raw material processing volume, each finished product output volume, unit processing cost, and same-day settlement price. Units are exclusively tons and yuan per ton; no percentage annotations are used. Daily snapshots are generated and synced as device production status, raw material purchase prices, and finished product selling prices change.

## What constraints these characteristics impose on forms and interactions
Multiple data source access requirements mean forms must support configuring interface permissions for both internal systems and third-party platforms, to avoid missing data dimensions. Structured table formats require forms to preset fixed field extraction ranges, to prevent redundant content extraction from interfering with yield rate calculations. Fixed daily update rhythms require forms to support scheduled daily report generation logic, to ensure data timeliness. Differences in field naming across data sources (for example, internal systems use "feeding volume" while third-party platforms use "raw material processing volume") require forms to support field mapping configurations, to unify data standards. Parallel production across multiple devices requires forms to provide interactive components for filtering by device code, to facilitate targeted generation of yield rate reports for single or multiple devices. Unit differences across data sources require forms to configure unit conversion rules, to ensure values from different sources can be uniformly calculated.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `fieldMapping` | `{"feeding_amount": "raw_material_processing_volume", "finished_product_output": "output_volume"}` | Matches field naming differences between internal MES and third-party quote platforms, unifies data extraction standards |
| `dataSourceWhitelist` | `["internal_mes", "third_party_quote"]` | Grants access to both internal production data and external quote data, covers all dimensions required for yield rate calculations |
| `unitConvertConfig` | `{"kg": "0.001 t", "t": 1}` | Unifies measurement units across different data sources, ensures consistent numerical calculation logic |
| `scheduleCron` | `0 0 3 * * *` | Aligns with the rhythm of syncing previous day's data every early morning in the refinery industry, ensures generated daily reports include complete same-day data |
| `extractFieldList` | `Device Code, Raw Material Processing Volume, Output Volume, Settlement Price` | Limits extraction scope, excludes redundant fields, reduces response and calculation complexity |
| `dataFilterRule` | `{"device_status": "normal_production"}` | Filters invalid data from paused devices, ensures reports only include information from active production devices |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material forms, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: The `any` parameter is passed into the prompt code block of the text content extraction module, and the content of this code block appears as `undefined` in the final response. Cause: No corresponding mapping rule is configured for the `fieldMapping` parameter, so the system cannot recognize the actual field name referenced by `any`, resulting in extraction failure.
- Phenomenon: When "device yield" is entered in form interactions, the tool call parameter displays a misprinted Chinese character for the intended term. Cause: No input content error correction verification configuration is enabled, so the system's tolerance logic for similar Chinese characters does not take effect.
- Phenomenon: After configuring global variables to bind knowledge base selection, the variables do not automatically load the retrieval results of the corresponding knowledge base. Cause: No mapping relationship between global variables and knowledge base IDs is configured, resulting in variable assignment failure.

## How to Confirm Configurations Are Complete
- Trigger the preset scheduled task, view the generated daily report document, and confirm that all field data configured in `extractFieldList` is included.
- Manually enter test data with different units, verify that the system automatically completes unit conversions configured in `unitConvertConfig`.
- Submit test data containing paused device identifiers, confirm that the report automatically filters the relevant content of that device.
- Call the text extraction module, pass the preset field names, confirm that the extraction results match the expected field content.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
