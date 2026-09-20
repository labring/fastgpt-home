---
title: Citation Sources and Traceability for Environmental Monitoring Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c103-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Environmental
meta_description: Environmental monitoring data primarily comes from three sources: national-level automatic monitoring stations, online monitoring sensors deployed
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Environmental Monitoring Intelligent Due Diligence Reports

## What this type of data looks like
Environmental monitoring data primarily comes from three sources: national-level automatic monitoring stations, online monitoring sensors deployed independently by enterprises, and mobile monitoring sampling vehicles. Data update frequencies vary by collection method. Automatic stations typically push real-time data at minute-level intervals. Mobile sampling generates a single record after each single sampling. A single due diligence report’s associated monitoring data documents usually include fields such as monitoring point code, collection time, pollutant project name, measured concentration value, monitoring method standard, and equipment calibration status. Concentration value units are mostly μg/m³ or mg/m³. Timestamps use the UTC+8 standard format.

## What constraints do these characteristics impose on the "citation sources and traceability" link
The multi-source and fine-grained update characteristics of environmental monitoring data impose multiple constraints on the citation traceability process. First, minute-level real-time data requires traceability to match collection timestamps precise to the minute. Otherwise, citation errors involving mismatched points and time periods will occur. Second, single records from mobile sampling must be bound to the sampling device ID and point code. Traceability requires verifying both fields to avoid invalid citations across points. Third, monitoring data documents from different sources have varying formats. Automatic station data is mostly structured CSV. Enterprise-owned data is mostly custom JSON. Dedicated field mapping rules must be configured for different sources to ensure accurate binding of extracted concentration values and corresponding monitoring information. Finally, intelligent due diligence reports need to cover monitoring data for a specified time period. The recall process must filter by time range to prevent introducing monitoring records from unrelated time periods.

## How to set the configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `maxRecallNum` | Top 10 entries | Environmental monitoring data documents have a large number of entries per document. Too many recalls will cause redundant context. Too few will fail to cover all monitoring period data required for due diligence. 10 entries balances recall completeness and context length. |
| `similarityThreshold` | 0.75–0.85 | Environmental monitoring data has a high degree of field standardization. A similarity threshold that is too low will introduce irrelevant monitoring point data. A threshold that is too high may miss eligible valid records. This range adapts to the matching needs of structured monitoring data. |
| `chunkSize` | 600–800 characters | Single monitoring records have a large number of fields. An overly long segment length will cause a single segment to contain multiple unrelated monitoring entries. An overly short length will split key information from a single monitoring record. This length can fully carry multiple sets of pollutant data for a single monitoring point. |
| `fileParseFieldMapping` | Configure based on actual measurement | Field names for monitoring data vary across different sources. Field mappings must be configured separately for automatic stations, enterprise sensors, and mobile sampling data sources, to map original fields to unified fields of "monitoring point", "collection time", "pollutant name", and "concentration value". |
| `recallTimeRangeEnabled` | Enabled | Intelligent due diligence reports need to limit monitoring data for a specific time period. Enabling this switch automatically filters monitoring records outside the due diligence report’s time range to avoid invalid citations. |
| `referenceDisplayMode` | Show original file name + point code + collection time | Traceability of environmental monitoring data requires clear source files and specific collection information. This display format allows reviewers to quickly locate the specific point and time of the original monitoring record. |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Issue: The generated intelligent due diligence report includes unhideable citation links, or fails to display necessary monitoring point and collection time information. Cause: The `referenceDisplayMode` parameter is not configured correctly, retaining the default full-link display mode, or the required metadata fields are not specified.
- Issue: Recalled monitoring data includes records outside the specified time period of the due diligence report, resulting in invalid cross-time-period citations. Cause: The `recallTimeRangeEnabled` switch is not enabled, or the due diligence report’s time range parameter is not correctly bound.
- Issue: Some monitoring pollutant projects are not recalled, or monitoring data from other regions irrelevant to the due diligence topic is recalled. Cause: The `similarityThreshold` value is inappropriate. A value that is too low introduces irrelevant data, while a value that is too high misses eligible valid monitoring records.

## How to confirm the configuration is correct
- Upload an environmental monitoring data document with clearly specified monitoring time period and points, initiate a due diligence request covering the corresponding monitoring topic, and check whether the recall results include the target monitoring data.
- View the citation display area of the generated content, confirm that the displayed metadata includes necessary information such as monitoring point and collection time, to meet traceability requirements.
- Modify the `referenceDisplayMode` parameter, compare the citation display format before and after the modification, and confirm that the parameter takes effect.
- Enter keywords for monitoring data outside the specified time period of the due diligence report, confirm that the system automatically filters this part of data and does not include it in the citation scope.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
