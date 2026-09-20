---
title: Citation Sources and Traceability for Aquaculture Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c082-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Aquaculture
meta_description: Aquaculture due diligence data includes multi-source heterogeneous types. Structured monitoring data comes from online monitoring equipment at
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Aquaculture Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
Aquaculture due diligence data includes multi-source heterogeneous types. Structured monitoring data comes from online monitoring equipment at aquaculture ponds, feed supplier feeding systems, and fishery management platforms. Fields include pond ID, monitoring time, dissolved oxygen (mg/L), water temperature (℃), pH value, feeding amount (kg), and others. Update frequencies vary significantly: water quality monitoring data updates hourly, feeding records update daily, fishery permit data updates monthly, and satellite remote sensing pond area data updates every ten days. Unstructured data includes aquaculture log PDFs and seedling quarantine report Word documents, which contain free text content such as aquaculture cycle, disease treatment records, and seedling source.

## What Constraints Do These Characteristics Impose on the "Citation Sources and Traceability" Link
Multi-source and heterogeneous data structures require the traceability link to distinguish between structured fields and source identifiers for non-full-segment documents, to avoid citation confusion across ponds and time periods. Different update frequencies lead to differences in recall priority. Without differentiation, old monthly fishery data may overwrite new hourly water quality monitoring data, reducing the accuracy of due diligence conclusions. Clear field units require retaining original unit information during traceability, otherwise errors such as mismatched dissolved oxygen values and units will occur. The unique pond ID is the core association identifier; all cited data must be bound to the corresponding pond to ensure that citations in due diligence reports can be traced back to specific aquaculture entities.

## How to Configure the Settings

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Similarity threshold` | 0.65-0.75 | Aquaculture structured monitoring data has clear features. A threshold that is too low will introduce monitoring records from irrelevant ponds, while a threshold that is too high will miss associated data from the same pond |
| `Recall count` | Top 8-10 entries | Aquaculture data is grouped by pond. Too many recalled entries will lead to citation redundancy, while too few will fail to cover full-cycle monitoring and feeding data |
| `Rerank result count` | Top 3-5 entries | Due diligence reports need to focus on core aquaculture indicators. Too many citations will distract from the expression of core conclusions |
| `Citation Source Display Fields` | `塘口ID,监测时间,数据来源` | Aquaculture due diligence requires clear identification of the pond and collection time corresponding to cited data, to avoid cross-pond citation confusion |
| `File Parsing Timeout` | 300 seconds | Some satellite remote sensing data files have large file sizes, and sufficient parsing time must be reserved to complete data extraction |

> The parameter values provided on this page are common recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Phenomenon: After setting `Similarity threshold` to 1, a large number of low-relevance citation contents are still returned. Cause: The features of aquaculture structured monitoring data are highly similar. Setting the threshold to 1 will only match completely identical fields, failing to recall associated pond context data, and reordering filtering is not enabled.
- Phenomenon: Pond ID or monitoring time are not displayed in the citation content. Cause: `Citation Source Display Fields` is not configured, or core identification fields such as pond ID and monitoring time are omitted during configuration.
- Phenomenon: A `504 Gateway Timeout` error is triggered when parsing satellite remote sensing data. Cause: The `File Parsing Timeout` setting value is lower than the actual parsing time of satellite remote sensing data, causing the parsing process to be terminated before completion.

## How to Confirm Correct Configuration
- Input a known pond's monitoring indicators, check whether the returned citation content includes the corresponding pond ID and collection time.
- Adjust `Similarity threshold` to 0.7, confirm whether the number of recalled citations meets the preset range.
- Upload an aquaculture satellite remote sensing data file, confirm that no timeout error is triggered during the parsing process.
- Generate a simulated due diligence report, check whether citation sources are sorted by pond and collection time, with no redundant irrelevant data.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
