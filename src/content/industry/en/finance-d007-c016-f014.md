---
title: Forms and Interactions for Photovoltaic Yield Reporting
slug: /en/industry/finance-d007-c016-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Forms and Interactions for Photovoltaic Yield Reporting
meta_description: PV yield-related data primarily comes from SCADA monitoring systems of grid-connected PV power stations, publicly available settlement reports from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Forms and Interactions for Photovoltaic Yield Reporting

## What the data for this category looks like
PV yield-related data primarily comes from SCADA monitoring systems of grid-connected PV power stations, publicly available settlement reports from regional power trading platforms, and grid-connected operation data from power grid companies. It is used for revenue estimation and daily report broadcasting of PV projects in financial and wealth management scenarios. There are two update frequencies: real-time power generation data is pushed and updated every 15 minutes, and daily settlement data is fully updated every early morning. The document structure includes core fields such as unique power station identifier, total installed capacity, daily cumulative power generation, grid-connected power generation, self-consumed power generation, settlement electricity price, and regional grid load reference parameters. All fields have clear standard units: installed capacity is measured in kilowatts (kW), power generation in kilowatt-hours (kWh), and electricity price in yuan per kilowatt-hour. Some large-scale power stations also include string-level power generation data fields for refined yield calculation.

## Constraints Imposed on Forms and Interactions by These Characteristics
The need to access multi-source data requires forms to support configuration of multiple data sources, including interfaces for different types of monitoring systems and trading platforms. This requires custom configuration items such as open ports and authentication methods. The layered update frequency requires forms to support two synchronization modes: scheduled pull and real-time pull, with corresponding trigger intervals to be configured separately. The standardized fields and units require forms to include targeted input validation rules to prevent non-standard units or incorrect field values from being entered. The need for batch management of unique power station identifiers requires forms to support batch import of power station ID lists, reducing operational costs of single-entry entry. The feature that yield calculation relies on multi-field linkage requires forms to support automatic calculation logic between fields, eliminating the need for manual repeated entry of calculation formulas.

## How to Configure the Settings
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `datasource_port` | Integer between 1000–65535 | Complies with TCP port allocation specifications, matches the default port range of PV power station monitoring systems |
| `form_field_mapping` | One-to-one mapping based on data source field names | Matches the standardized field structure of PV data, reduces manual adjustment costs |
| `data_sync_interval` | 900 seconds (real-time) or 86400 seconds (daily) | Corresponds to the update frequency of real-time power generation data and daily settlement data |
| `form_validation_rule` | Preset unit validation for "kW", "kWh", "yuan per kilowatt-hour" | Matches the standard units of PV data, prevents input errors |
| `batch_import_limit` | First 100 entries per import | Balances form loading performance and batch operation efficiency |
| `form_calculate_trigger` | Automatically triggered after field changes | Supports real-time yield calculation, matches user interaction habits |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to conduct testing on custom samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: The port input field of the database connection node is grayed out and cannot be entered. Cause: The "custom data source port" switch is not enabled, or the currently used data source type does not support port customization.
- Symptom: A "unit mismatch" error appears after form submission, or obvious deviations appear in calculation results. Cause: The unit validation rule for `form_validation_rule` is not configured, or non-standard fields are incorrectly matched during field mapping.
- Symptom: The voice input function cannot recognize PV industry professional terms such as "string" and "self-consumption ratio". Cause: The PV industry professional thesaurus is not loaded, or domain adaptation of the speech recognition model is not enabled.

## How to Confirm Successful Configuration
- Open the database connection node configuration page, confirm that the `datasource_port` input box can be normally edited and valid port numbers can be entered.
- Import a test sample of PV data, confirm that the form automatically matches fields and displays correct unit validation prompts.
- Manually modify a field in the form, confirm that the yield calculation result is automatically updated.
- Call the form initialization API, confirm that the returned opening remarks, required field information, and configuration content are consistent.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
