---
title: Citation Sources and Traceability for Power Industry Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c107-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Power Industry
meta_description: The data for power industry intelligent due diligence reports mainly comes from publicly disclosed grid data, internal operation and maintenance logs
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Power Industry Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
The data for power industry intelligent due diligence reports mainly comes from publicly disclosed grid data, internal operation and maintenance logs of power enterprises, transaction records of power trading platforms, industry compliance review documents, and other similar sources. Data update cadences cover three categories: real-time (such as grid load curves), daily updates (such as unit operation parameters), and weekly updates (such as regional power supply and demand reports). The document structure of a single report is usually divided into a core indicator section, trend analysis section, and compliance verification section. Core fields include rated capacity (unit: MW), coal consumption for power supply (unit: g/kWh), transaction electricity price (unit: yuan/MWh), grid connection time, and others. Some long documents include multi-page load curve charts and data tables.

## Constraints Imposed on Citation Sources and Traceability
The multi-source nature, layered structure, and specialized field attributes of power data create multiple constraints for the traceability process. Real-time data requires precise collection timestamps to avoid referencing expired load curve data. Fixed units for specialized fields require traceability information to display units synchronously, preventing parameter confusion. The chunked structure of long documents requires retaining contextual associations, avoiding the recall of only isolated numerical fragments. Compliance requirements mandate retaining complete data source links, ensuring every citation can be traced back to the original document and acquisition channel. Additionally, the cross-department collaboration attribute of power data requires traceability information to mark the business module the data belongs to, allowing due diligence personnel to quickly locate the corresponding section.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall_top_k` | `Top 10-15 results` | Power due diligence data includes multi-dimensional specialized fields. Too many recalled results will introduce irrelevant content, while too few will fail to cover core indicators |
| `similarity_threshold` | `0.72-0.85` | Power specialized terms have high recognition accuracy. This range balances recall precision and coverage of specialized content |
| `reference_template` | `[{source_name}], {update_time}, {field_name}({unit})` | Matches the traceability requirements of power data, and synchronously displays data source, time, field and unit |
| `source_metadata_fields` | `["额定容量(MW)", "供电煤耗(g/kWh)", "交易电价(元/MWh)"]` | Extracts core metadata for power due diligence, ensuring traceability information includes key business parameters |
| `chunk_size` | `800-1200 characters` | Trend analysis and table content in power reports are lengthy. This length retains complete contextual associations |
| `enable_source_verification` | `Enabled` | Meets compliance traceability requirements for power data, ensuring citations have not been tampered with |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
-  Phenomenon: A citation list is returned first when calling the chat interface, with no answer body returned. Cause: The `reference_show_before_answer` parameter has not been adjusted. The default configuration displays the citation list before the answer.
-  Phenomenon: The answer body does not include the specialized power content marked in the citation list, while the citation list displays correctly. Cause: The `chunk_size` setting is too small, causing the complete text block containing the specialized fields to be truncated and not included in the context.
-  Phenomenon: The update time of the data is not displayed in the traceability information. Cause: Timestamp-related fields are not configured in `source_metadata_fields`, and the automatic metadata extraction function is not enabled.

## How to Verify Proper Configuration
-  Initiate a query containing specialized power terms, and check whether the returned citation list includes data source names, update times and corresponding field units.
-  View the `reference` field in the interface return, and confirm that it includes the configured metadata field content.
-  Upload a test power operation and maintenance document, and check after parsing whether the text blocks retain necessary contextual overlap to avoid fragmentation of specialized content.
-  Adjust the `similarity_threshold` parameter to the boundary values of the range, and compare the number and precision of recalled results to confirm alignment with business requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
