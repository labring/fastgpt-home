---
title: Citation Sources and Traceability for Glass Industry Financial Report Analysis
slug: /en/industry/finance-d014-c104-f009
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Glass Industry
meta_description: Glass industry financial report data mainly comes from periodic reports publicly disclosed by listed building materials enterprises, monthly operation
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Glass Industry Financial Report Analysis

## What the data for this category looks like
Glass industry financial report data mainly comes from periodic reports publicly disclosed by listed building materials enterprises, monthly operation data released by industry associations, and raw material market quotation documents. The core update cycle is quarterly. Some raw material price data is updated monthly. Each document includes core operating fields: current period glass output, average unit product price, total revenue, raw material procurement cost ratio, capacity utilization rate, and others. The unit of output is ten thousand tons. The unit of average price is yuan per weight box. The unit of revenue is hundred million yuan. Most field names follow the disclosure standards of domestic listed enterprises.

## What constraints do these characteristics impose on citation sources and traceability
The multi-source data structure and update rhythm of the glass category impose multiple constraints on the citation and traceability process. First, scenarios covering both corporate financial reports and industry association data require precise distinction of field attribution from different sources during traceability, to avoid cross-reference errors. Second, there are many segmented data for sub-categories. Operating data for different glass types such as float glass and tempered glass is scattered in different paragraphs of documents. Traceability requires locating the original text fragments corresponding to the specific sub-category. Third, raw material price data is updated monthly. The valid duration of traceability cache must adapt to this update rhythm to avoid referencing expired market quotation information. Finally, there are slight differences in field names across different sources. Standardized field names must be matched during traceability to ensure that the referenced content is consistent with the original text expression.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `PARSE_SEGMENT_LENGTH` | `800–1200 characters` | Glass financial report documents contain long paragraphs of segmented operating data. This length can cover complete data blocks for a single category, avoiding loss of contextual association after splitting |
| `RECALL_TOP_K` | `Top 6 entries` | Core data fields of glass financial reports are concentrated in distribution. Excessive recall will introduce irrelevant content, while insufficient recall will fail to cover complete traceability basis |
| `SIMILARITY_THRESHOLD` | `0.75–0.85` | There are slight differences in field names for sub-categories. This threshold can accurately match original text paragraphs of target fields while filtering low-relevance recall results |
| `SOURCE_CACHE_TTL` | `7200 seconds` | Raw material price data is updated monthly. This duration adapts to the monthly update rhythm, avoiding referencing outdated data due to expired or overly long cache |
| `ENABLE_SOURCE_ANCHOR` | `Enabled` | Sub-category data of glass financial reports is scattered. Enabling anchor positioning can accurately reference original text content of corresponding paragraphs |
| `UPLOAD_FILE_MAX_SIZE` | `200 MB` | The total size of a single annual financial report and supporting industry data documents usually does not exceed this threshold, preventing upload failures |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to conduct tests on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: After connecting to enterprise WeChat, the reply only displays citation sources and does not generate financial report analysis content. Cause: The `SIMILARITY_THRESHOLD` value is set too high, resulting in failure to recall valid original text paragraphs, and only citation prompts are returned.
- Phenomenon: An error is prompted when configuring the model for testing, but the citation function operates normally. Cause: The configuration of `ENABLE_SOURCE_ANCHOR` is not synchronized to the test environment, and it only takes effect during formal operation.
- Phenomenon: When splitting knowledge base question and answer pairs, some files do not generate structured question and answer pairs, and directly write the original text. Cause: The `PARSE_SEGMENT_LENGTH` value does not match the document structure. Long segmented paragraphs of data are not split correctly, causing the parsing tool to fail to generate valid question and answer pairs.

## How to confirm the configuration is complete
- Upload a single glass financial report document, trigger knowledge base parsing, and check the segmented content after parsing to confirm that paragraphs of sub-categories are not overly split.
- Enter a query containing glass sub-categories, check the number of recall results to confirm that it meets the preset recall range.
- Wait for the preset cache duration, then initiate the same query again to confirm that no expired prompt appears for the referenced raw material price data.
- Enter the configuration page, check the switch status of `ENABLE_SOURCE_ANCHOR` to confirm that it matches the business requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
