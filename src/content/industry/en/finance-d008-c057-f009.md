---
title: Citation Sources and Traceability for Small Home Appliance Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c057-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Small Home Appliance
meta_description: The data sources for small home appliance intelligent due diligence reports primarily come from official brand technical documents, national energy
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Small Home Appliance Intelligent Due Diligence Reports

## What the data for this category looks like
The data sources for small home appliance intelligent due diligence reports primarily come from official brand technical documents, national energy efficiency filing platforms, e-commerce platform product detail pages, and third-party quality inspection institution reports. The update cadence is to synchronize core parameter updates when new products are released, and perform quarterly reviews of public parameters for standard models currently on sale. Most documents are single-page structured parameter tables, including fields such as rated power, operating voltage, product dimensions, safety certification numbers, and energy efficiency levels. The primary units are watts (W), volts (V), millimeters (mm), and kilograms (kg). Some silent models will also include decibel (dB) parameters.

## What Constraints Do These Characteristics Impose on the Citation Sources and Traceability Workflow?
The multi-source, dispersed nature of small home appliance data requires the traceability system to support associated matching across platform sources. It must distinguish between authoritative sources such as official filings and quality inspection reports, and non-compliant content displayed on e-commerce platforms. Structured short parameter tables require precise traceability to specific parameter rows, to avoid confusing parameters of different models in the same category. Standardized fields and units must retain their original identifiers, to ensure that parameter units in due diligence reports match those in source documents. In addition, custom parameters for some models require complete source links to be retained, to prevent compliance verification failures due to missing fields.

## How to Set Up Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `reference_enable` | `Enabled` | Enable citation source display during Q&A to meet the compliance traceability requirements of due diligence reports |
| `recall_top_k` | `Top 5–7 entries` | Small home appliance parameter documents are relatively short; excessive recall will introduce irrelevant content. Limiting to the top 5-7 entries can cover core parameter sources |
| `reference_segment_length` | `800–1200 characters` | Adapt to the length of single-page parameter tables for small home appliances, avoiding truncation of key fields and unit information |
| `source_include_pattern` | `["Official Documents","Quality Inspection Reports","Energy Efficiency Filings"]` | Filter non-compliant promotional content, only include authoritative sources for small home appliance parameters |
| `api_reference_output` | `Enabled` | Support returning citation source content via API to meet traceability requirements for automated due diligence |
| `reference_download_allow` | `Restricted by source type` | Official documents and quality inspection reports are allowed to be downloaded, while e-commerce pages are only allowed to be displayed, to comply with regulatory requirements |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- Phenomenon: No `reference` field appears in Q&A results returned via the API. Cause: The `api_reference_output` configuration item is not enabled, or the citation traceability function is not activated in the corresponding knowledge base. For version 4.8.22, the "API Citation Output" switch for the knowledge base must be enabled separately.
- Phenomenon: Citation sources cannot be downloaded, with a pop-up prompt indicating insufficient permissions. Cause: `reference_download_allow` is incorrectly set to globally disabled, without differentiating download permissions between official authoritative sources and third-party displayed content.
- Phenomenon: Recalled citation sources include non-compliant e-commerce promotional content. Cause: The `source_include_pattern` filtering rule is not configured, or the filtering rule does not cover the authoritative source types for small home appliances.

## How to Verify Successful Configuration
- On the management page of the corresponding knowledge base, check the status of `reference_enable` and `api_reference_output` to confirm both are enabled.
- Initiate a test Q&A, enter a question related to small home appliance parameters, and verify whether the returned results include fields such as source links and document names.
- Call the corresponding API interface, and check whether the returned JSON structure contains the `reference` array, with the array including source type, link, and field information.
- Click the official source link in the returned results, and verify whether it can navigate normally or trigger a compliant download permission check.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
