---
title: Citation Source and Traceability for Aquaculture Research Reports
slug: /en/industry/finance-d009-c082-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Aquaculture Research
meta_description: Aquaculture research report data primarily comes from agricultural and rural affairs ministry-affiliated aquatic technology institutions, local
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Aquaculture Research Reports

## What the data for this category looks like
Aquaculture research report data primarily comes from agricultural and rural affairs ministry-affiliated aquatic technology institutions, local aquatic promotion stations, industry professional associations, and university research institutes. Data update cycles fall into three categories: monthly monitoring data, quarterly industry analysis, and annual special reports. Most documents are in PDF format, and contain structured breeding parameter tables and analysis text. Core fields include breeding density, unit yield, feed conversion ratio, and disease prevention and control indicators. Common units include kilograms per mu, fish per cubic meter, percentage, and other detailed measurement units. Some documents also include regional breeding plans and policy interpretations. The overall structure is clear, with parameters tightly bound to analysis content.

## Constraints on traceability from these data characteristics
The multi-source, periodic update, and structured parameter characteristics of aquaculture research reports impose three core constraints on the traceability process. First, precisely bind the institutional identifier of the data source to avoid mixing similar monitoring data from different stations, which reduces the accuracy of decision-making references. Second, set layered recall thresholds based on data update cycles: recall content from the last 3 months first for monthly monitoring data, and cover the last 2 years for annual reports to ensure data timeliness. Third, support extracting specific cell positions from structured tables in documents, and mark specific paragraphs or cell positions while retaining original units of measurement to avoid unit ambiguity in cross-regional parameters.

## Configuration Settings
These configurations apply to FastGPT 4.8.10 and later versions.

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxRecall` | `Top 10 results` | Aquaculture research reports have many individual parameters. Excessive recall causes context overload. 10 results cover core monitoring data and analysis content |
| `similarityThreshold` | `0.75–0.85` | High precision is required for matching professional breeding terminology. This range filters irrelevant general agricultural content |
| `rerankTopN` | `Top 5 results` | Core data from different sources must be retained. Limiting to 5 results after reranking balances recall breadth and traceability clarity |
| `enableSourceCite` | `Enabled` | The authority of aquaculture research report sources directly affects decision-making references. Citation sources must be displayed |
| `sourceCiteFormat` | `Institution name + release time + paragraph position` | Clearly mark the data collection institution and specific location to meet the traceability needs of industry decision-making |
| `parseChunkSize` | `800–1200 characters` | Structured tables and analysis paragraphs in research reports have uneven lengths. This segmentation range retains complete context for parameters |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- Reference sources display in the debug page but are empty in the official chat page. Cause: The `enableSourceCite` parameter is not enabled in the release configuration, and traceability display is only enabled in debug mode.
- Attempt to limit the number of citations to a fixed integer, but the system only supports limiting by a fractional proportion. Cause: The `maxRecall` parameter is not used correctly, and a fractional threshold is mistakenly configured as a quantity limit.
- Attempt to extract text content from knowledge base citations, but no valid text is retrieved. Cause: The `sourceCiteExtract` parameter is not enabled, or the segmentation length is set too small, causing the cited paragraph to be truncated and cannot be fully extracted.

## How to Verify Proper Configuration
- Submit a query containing aquaculture professional terminology, check the citation module of the returned results to confirm that it includes institution name, release time, and specific position information.
- Adjust the `maxRecall` parameter and submit the same query again, verify that the number of cited results in the returned content matches the configured value.
- Upload a test aquaculture research report PDF to trigger the parsing process, confirm that the parsed segmentation length matches the preset range.
- Switch to the official release environment, submit the same query, verify that the citation display is consistent with the debug page.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
