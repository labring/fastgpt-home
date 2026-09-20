---
title: Citation Source and Traceability for Traditional Chinese Medicine (TCM) Financial Report Analysis
slug: /en/industry/finance-d014-c006-f009
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Traditional Chinese
meta_description: TCM-related financial report data comes from four primary sources:
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Traditional Chinese Medicine (TCM) Financial Report Analysis

## What the Data for This Category Looks Like
TCM-related financial report data comes from four primary sources:
- Annual, semi-annual, and quarterly financial reports of publicly listed TCM enterprises
- Industry monitoring data from the China Traditional Chinese Medicine Association
- TCM registration filing information from the National Medical Products Administration
- Industry statistical bulletins from main producing areas of medicinal materials

Data update cadence varies by regulatory requirements and source type:
- Financial reports are disclosed on annual, semi-annual, and quarterly cycles
- Industry monitoring data is updated monthly
- Filing data is updated dynamically as enterprises submit applications

Structurally, TCM-related data is scattered across supplementary notes in financial reports. This includes sections on operating revenue details, operating costs, R&D expenditures, and capacity disclosures. Specific fields cover Chinese medicinal material purchase volume and unit price, decoction pieces production capacity and output, and proportion of proprietary Chinese medicine revenue. Units include tons, yuan per kilogram, ten thousand yuan, ten thousand tablets, ten thousand bags, and other standard units.

## Constraints on Citation Source and Traceability
The scattered nature of multiple data sources requires associating metadata from different platforms during traceability. This ensures cited data sources can be traced back.
Differences in update cycles require setting different refresh rules based on data source type. This avoids using expired industry monitoring data or delayed financial report data.
The large number of segmented fields requires clear field mapping rules during citation. This prevents mistakenly associating non-TCM sector fields with TCM analysis.
Inconsistent unit systems require retaining original unit annotations during traceability. This avoids data ambiguity.
Traceability for genuine medicinal materials requires associating origin filing information. This adds additional association dimensions for traceability, and requires corresponding field matching logic to be configured.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `Recall Count` | `Top 10` | There are many segmented fields in TCM financial reports. A sufficient number of candidate segments must be recalled to match precise fields, while avoiding redundant content interfering with analysis |
| `Similarity Threshold` | `0.75–0.85` | TCM financial report terminology is highly specialized. A higher threshold is needed to filter irrelevant segments, while retaining matching possibilities for segmented fields |
| `Segment Length` | `800–1200 characters` | Segmented fields in TCM financial reports, such as Chinese medicinal material purchase details, are mostly long paragraphs. Too long segments will lose field associations. Too short segments will destroy data integrity |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Large financial report PDF files often include multi-page supplementary tables. Parsing takes longer, so extending the timeout period avoids parsing failures |
| `Citation Source Retained Fields` | `Data Source Name, Update Time, Original Field Name, Unit` | TCM financial report data requires clear traceability of source, timeliness, specific fields, and units. This meets compliance requirements |

> The parameter values provided on this page are general recommendations used as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Symptom: A `Cannot redefine property: toString` error occurs when uploading a TCM financial report PDF. Cause: The parsing process attempts to redefine built-in object properties. This usually happens when segment configuration is too short, resulting in split segments containing code fragments that reference built-in properties, or the uploaded file contains non-standard PDF metadata.
- Symptom: No original unit is annotated for Chinese medicinal material purchase data in citation results. Cause: The `Citation Source Retained Fields` configuration does not include the unit parameter, or field context containing the unit is lost during segmentation. This makes it impossible to extract unit information during traceability.
- Symptom: Recalled citation segments include non-TCM sector financial report content. Cause: The `Similarity Threshold` setting is too low, or no label filtering for the TCM sector has been applied to the knowledge base. This results in irrelevant industry data being recalled.

## How to Verify Proper Configuration
- Upload a single TCM financial report PDF. Check whether parsed segments include core segmented fields such as Chinese medicinal material purchases and proprietary Chinese medicine revenue. Verify that the segment configuration adapts to the document structure.
- Initiate a query for TCM financial report analysis. Check whether citation sources in returned results are annotated with data source name, update time, original field name, and unit.
- Adjust the `Similarity Threshold` and compare recall results. Confirm that the threshold setting meets the matching accuracy requirements of the current scenario.
- Simulate update operations for different data sources. Verify that the configured refresh frequency triggers data updates as expected.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
