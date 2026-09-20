---
title: Citation Sources and Traceability for Airport Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c126-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Airport Intelligent
meta_description: Airport intelligent due diligence report data primarily comes from three sources: public operation statistics released by civil aviation regional
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Airport Intelligent Due Diligence Reports

## What the Data Looks Like for This Category
Airport intelligent due diligence report data primarily comes from three sources: public operation statistics released by civil aviation regional administrations, official annual operation reports of airports, and real-time traffic monitoring data from air traffic control departments.

Data update rhythms fall into three categories:
- Real-time traffic data updates every minute.
- Monthly operation data is released within five working days of the following month.
- Annual operation reports are released by the end of March of the next year.

Most documents use structured tables and PDF reports as their format. Core fields include flight takeoff and landing sorties, passenger throughput, cargo and mail throughput, and runway operation duration. Their respective units are sorties, person-times, tons, and hours. Some reports also include detailed airspace usage period information.

## Constraints on Citation Sources and Traceability
The minute-by-minute update of real-time traffic data requires traceability links to quickly locate the latest data source, to avoid citing expired information.
The mixed structure of structured tables and PDF reports requires traceability systems to support precise binding of structured fields, as well as page and paragraph positioning for unstructured text.
Data with different update frequencies must match corresponding cache periods: monthly data is cached until new monthly data is released, and annual data is cached until new annual reports are released the following year.
Exclusive units for core fields must be verified during traceability, to prevent citing content with mismatched units.

## Configuration Recommendations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall count` | `top 8` | Airport due diligence reports need to cover three core data categories: takeoff and landing, throughput, and airspace. 8 entries balance recall coverage and information redundancy |
| `similarity threshold` | `0.72–0.78` | Most airport data consists of structured statistical values. A threshold that is too low will easily introduce irrelevant industry data, while a threshold that is too high will fail to recall comparison data of the same dimension |
| `traceability cache duration` | `Real-time data: 10 minutes; Monthly data: 30 days; Annual data: 180 days` | Matches the update rhythms of different data sources to avoid citing expired content |
| `citation content template` | `{{content}} (Source: {{source}}, Update time: {{update_time}})` | Clearly mark the source and update time to meet the traceability requirements of due diligence reports |
| `field unit verification switch` | `Enabled` | There is a risk of mixed use of multiple units for core airport fields. Verification can avoid citing content with mismatched units |
| `rearranged return count` | `top 3` | Prioritize returning data sources most relevant to the core indicators of due diligence, improving the rigor of reports |

> The parameter values provided on this page are conventional recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Failing to bind the `update_time` variable when configuring the `citation content template`, resulting in no update time label for cited content. This occurs when only text content is extracted, and metadata variables returned by the knowledge base are not correctly referenced in the template.
- Setting `recall count` to more than `top 20`, causing non-core airport peripheral data to be included in due diligence reports. This happens when the recall upper limit is not adjusted based on the classification dimensions of airport data, and irrelevant fields are not filtered.
- Setting the `similarity threshold` above `0.9`, making it impossible to recall throughput comparison data for the same airport across different years. This occurs because the numerical differences of structured statistical data are small, and an overly high threshold will filter out valid comparison information.

## How to Verify Configuration is Working
- Enter keywords for core airport indicators, check if the end of returned results includes source and update time labels, to confirm the `citation content template` configuration is effective.
- Test data sources with different update rhythms. For example, enter keywords for annual throughput, check if the cache automatically updates after a new report is released, to confirm the `traceability cache duration` configuration is correct.
- Check logs for field unit mismatch alerts, to confirm the `field unit verification switch` is enabled and effective.
- Verify that the number of returned results matches the configured values for `recall count` and `rearranged return count`, to confirm the recall and rearrangement rules are operating normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
