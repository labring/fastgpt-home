---
title: Workflow Orchestration for Traditional Chinese Medicine Research Report Retrieval
slug: /en/industry/finance-d009-c006-f007
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Traditional Chinese Medicine
meta_description: Traditional Chinese Medicine (TCM) research report data comes from TCM industry databases, public reports from herbal medicine industry associations
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Traditional Chinese Medicine Research Report Retrieval

## What the Data for This Category Looks Like
Traditional Chinese Medicine (TCM) research report data comes from TCM industry databases, public reports from herbal medicine industry associations, R&D disclosure documents of listed pharmaceutical enterprises, and research outcomes from TCM universities and colleges.
Two update schedules apply:
- Industry trend reports are updated quarterly or semi-annually
- Pharmacological and clinical research documents for single herbs or compound formulas are updated in real time alongside new experimental results
Document structures typically include: medicinal material origin descriptions, nature and meridian tropism annotations, clinical application cases, pharmacological component analysis, quality control standards, and industrial market data.
Common fields include: medicinal material Latin name, active ingredient content, clinical sample size, production batch number, and others. Content units are mostly mg/g and μg/kg, while sample size is measured in cases.

## Constraints Imposed by These Characteristics on Workflow Orchestration
TCM research report data originates from scattered sources with distinct update rhythms. Workflows must include multi-source data pull nodes adapted to the interface formats of different data sources.
Complex document structures include multiple specialized fields. Field mapping rules must be configured in the workflow’s preprocessing stage to align standardized fields across different sources.
Diverse unit systems require built-in unit conversion logic in workflows to unify measurement standards for fields such as active ingredient content and clinical sample size.
Real-time updated research documents require workflows to support incremental sync trigger mechanisms to avoid resource consumption from full data pulls.

## How to Determine Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Knowledge Base Chunk size` | `800–1200 characters` | TCM research reports contain numerous specialized terms and long sentences. Excessively long chunks reduce retrieval accuracy, while excessively short chunks damage semantic integrity. |
| `Recall count` | `Top 8–12 results` | Professional content density in TCM research reports is high. Too many retrieved results introduce irrelevant information, while too few fail to cover complete research conclusions. |
| `Similarity threshold` | `0.72–0.80` | Specialized terms in TCM research reports have high distinctiveness. A threshold that is too low retrieves reports from irrelevant categories, while a threshold that is too high fails to match details of similar studies. |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Some TCM research reports include high-resolution pharmacological charts or long-form experimental data. The default timeout duration is insufficient to complete parsing. |
| `Multi-source Data Sync Frequency` | `Incremental sync every hour, full sync every quarter` | Industry trend reports have long update cycles. Real-time research documents require high-frequency sync to ensure content timeliness. |
| `Field mapping rule` | `Align by medicinal material Latin name, active ingredient content, and clinical sample size` | Core analysis dimensions of TCM research reports focus on these three fields, enabling rapid cross-source data integration.

> The parameter values provided on this page are general recommendations used as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing values.

## Three Common Configuration Errors
- Symptom: Workflow API calls return `400 Bad Request` with the prompt `missing required parameter: kb_id`. Cause: The knowledge base ID referenced by the variable is not configured in the workflow’s knowledge base call node, so external calls cannot specify the target TCM research report knowledge base.
- Symptom: The number of retrieved results returned by the workflow remains 0. Cause: The `Similarity threshold` is set to above 0.9. Minor differences exist in specialized term expressions for TCM research reports, so an excessively high threshold fails to match valid content.
- Symptom: The file parsing node stays in a running state indefinitely, eventually triggering a timeout error. Cause: The `PARSE_FILE_TIMEOUT_SECONDS` parameter is not adjusted, and the default timeout duration is insufficient to parse long documents containing high-resolution pharmacological charts.

## How to Verify Successful Configuration
- Initiate a test call and check if returned results include core TCM research report fields such as active ingredient content and clinical cases.
- Review workflow running logs to confirm multi-source data pull nodes successfully synchronized the latest research report data with no connection errors.
- Upload a test TCM research report document to confirm the parsing node completed parsing successfully with no timeout errors.
- Adjust the `Similarity threshold` and run multiple retrieval requests to verify that the number of results changes as expected with the threshold.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
