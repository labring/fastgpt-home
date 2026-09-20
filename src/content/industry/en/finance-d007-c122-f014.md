---
title: Form and Interaction for Joint-Stock Bank Yield Rates
slug: /en/industry/finance-d007-c122-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Joint-Stock Bank Yield Rates
meta_description: Data for joint-stock bank yield rates comes from official retail product announcements, interbank business disclosure platforms, and internal business
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Joint-Stock Bank Yield Rates

## What the data for this category looks like
Data for joint-stock bank yield rates comes from official retail product announcements, interbank business disclosure platforms, and internal business systems. Full dataset updates are completed within one hour after daily market close. Documents use structured spreadsheet format.

Document fields include product unique identifier, product category, yield level, minimum investment amount, product duration, and information release date. Yield level uses annualized yield benchmark units. Minimum investment amount uses CNY yuan as the unit. Product duration uses natural days as the unit. Only standardized business parameters are retained, with no unstructured marketing descriptions included.

## What constraints these characteristics impose on the form and interaction stage
Data sources rely on official structured announcements, so the form must support bulk import of standardized templates to avoid field misalignment caused by unstructured data parsing. The daily fixed update schedule requires the form to be configured with scheduled sync trigger nodes, to ensure displayed data aligns fully with official release times.

The structured multi-field requirement means the interaction stage must configure corresponding input controls based on field type. For example, numeric fields limit input ranges, and enumeration fields provide fixed options. The product unique identifier field requires the form to support a combination of exact retrieval and fuzzy matching, to cover different user query scenarios.

Additionally, confidentiality requirements for banking business data mean external form display must be strictly limited to authorized channels.

## How to set the configurations
| Configuration Item | Recommended Approach | Rationale |
| --- | --- | --- |
| `form_field_mapping` | Map one-to-one with the fields in the bank yield rate document, including product unique identifier, product category, yield level, minimum investment amount, product duration, release date | Match the structured field structure of the data source to avoid field misalignment during bulk import |
| `sync_update_interval` | 86400 seconds | Match the official data update schedule of once per day for joint-stock banks, ensuring displayed data aligns with official release times |
| `api_form_display_scope` | Visible only to authorized internal channels | Comply with the confidentiality requirements of banking business data to prevent unauthorized platforms from accessing yield rate information |
| `search_match_threshold` | 0.85–0.95 | Balance retrieval precision and recall rate, adapting to mixed retrieval scenarios for product identifiers and names |
| `input_field_validation` | Enable validation by field type, restrict numeric fields to non-negative values | Avoid invalid inputs and ensure form-submitted parameters comply with business specifications |
| `form_export_template` | CSV template consistent with official announcement format | Facilitate bulk import and subsequent data processing, improving data synchronization efficiency |

> The parameter values provided on this page are all common recommended starting points for determining configurations. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: When embedding a FastGPT application via API, the target platform fails to load the yield rate query form. Cause: The `api_form_display_scope` parameter is not configured correctly, or the form display permission for the corresponding channel is not enabled.
- Symptom: When bulk importing structured bank yield rate data, some fields have empty values or abnormal formats. Cause: The `form_field_mapping` configuration does not match the field structure of the official announcement, and the `input_field_validation` rule is not enabled.
- Symptom: When initiating a yield rate query via voice input, the system returns the "Permission denied by system" error. Cause: The system permission for voice input is not configured in the Workflow, or the corresponding permission parameter is not enabled.

## How to confirm the configuration is complete
- Perform a bulk data import, and check whether the form fields after import fully match the fields in the official announcement.
- Configure a scheduled sync task, wait for one update cycle, and check whether the data release date displayed in the form aligns with the latest official announcement date.
- Initiate different types of query requests, including exact input of product unique identifiers and fuzzy input of product names, and check whether the recall rules of retrieval results match the configured expectations.
- Call the open API, verify that the form can be rendered and submitted normally in the test environment, and confirm that the permission configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
