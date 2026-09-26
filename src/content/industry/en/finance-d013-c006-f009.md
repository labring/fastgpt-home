---
title: Citation Sources and Traceability for Traditional Chinese Medicine Financing Daily Reports
slug: /en/industry/finance-d013-c006-f009
page_type: Industry scenario page
article_section: Financing Daily Report
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Traditional Chinese
meta_description: Data for the Traditional Chinese Medicine (TCM) financing daily report comes from domestic pharmaceutical and biotechnology enterprise financing
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Traditional Chinese Medicine Financing Daily Reports

This configuration is compatible with FastGPT V4.8.18 and later versions.

## What the data for this category looks like
Data for the Traditional Chinese Medicine (TCM) financing daily report comes from domestic pharmaceutical and biotechnology enterprise financing disclosure announcements, official public notices from local financial regulatory bureaus, and third-party industry financing monitoring databases. Data is updated daily, covering TCM-related enterprise financing events completed and disclosed on the same day. Each daily report document primarily uses structured tables, with each record containing fields including full enterprise name, financing round, financing amount, investor list, financing completion time, affiliated TCM sub-sector, disclosing media name, and others. The financing amount is uniformly denominated in RMB ten thousand yuan.

## What constraints these characteristics impose on citation sources and traceability
Since data sources are scattered and mostly consist of fragmented publicly disclosed information, the traceability link must associate unique identifiers from multiple data sources to avoid duplicate records. The daily update rhythm requires the traceability system to regularly pull incremental data, preventing repeated processing of historical financing entries. The structured table document structure requires precise matching of fields within the table during traceability to ensure the completeness of traceability information. The dedicated TCM sub-sector field requires secondary verification of this field during traceability, to avoid including financing records from non-TCM categories in traceability results. The unified unit for financing amounts requires strict matching of field formats during traceability, preventing traceability errors caused by unit confusion.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | Top 10–15 entries | TCM financing daily report records have many associated fields, so sufficient related sources must be covered to complete full traceability |
| `Similarity threshold` | 0.75–0.85 | Avoid mistakenly recalling similar records of non-TCM financing, while covering financing information from the same sub-sector |
| `Rerank result count` | Top 5–8 entries | Focus on core financing entries and reduce redundant information in traceability results |
| `Chunk size` | 800–1200 characters | Adapt to the field-intensive structure of financing daily report documents, avoiding splitting that destroys the integrity of individual financing records |
| `UPLOAD_FILE_MAX_SIZE` | 500 MB | Support batch import of monthly TCM financing daily report collections, adapting to conventional industry data volume |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | Adapt to the parsing time of long documents, avoiding parsing failures for large daily report files |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume and business rules, so specific issues require specific analysis. It is recommended to test on your own samples before finalizing.

## Three Common Configuration Errors
- Phenomenon: The traceability results returned by the knowledge base search node only show fragmentary text, with no metadata such as document name and disclosure time. Cause: The `元数据提取` configuration is not enabled, and the dedicated fields of the financing daily report are not included in the traceability display scope.
- Phenomenon: When calling a workflow via API, passing a knowledge base ID variable triggers a `400 Bad Request` error. Cause: The variable format is not configured as the standard `{{variable name}}`, or the variable does not carry a valid knowledge base identification parameter.
- Phenomenon: Recalled traceability results include financing records from non-TCM categories. Cause: The similarity threshold is set too low, and no secondary filtering is performed for the TCM sub-sector field, causing unrelated records to be included in the results.

## How to Confirm the Configuration Is Complete
- Initiate a question-and-answer query targeting the TCM financing daily report, check the traceability block of the returned results, and confirm that metadata fields such as disclosing media and financing time are included.
- Call a workflow via API, pass a custom TCM financing daily report knowledge base ID variable, and verify that the workflow can normally call the specified knowledge base and return relevant results.
- Adjust the similarity threshold to 0.70, check whether non-TCM financing entries are mixed into the recalled results, and confirm that the threshold configuration takes effect.
- Upload a test TCM financing daily report document, check whether the document metadata is correctly extracted and displayed after the parsing progress is completed.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
