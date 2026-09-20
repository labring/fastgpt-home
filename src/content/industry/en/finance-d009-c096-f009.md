---
title: Citation Source and Traceability for Coke Research Reports
slug: /en/industry/finance-d009-c096-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Coke Research Reports
meta_description: Data sources for coke research reports include public statistics from the China Coking Industry Association, market data from the Dalian Commodity
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Coke Research Reports

## What the Data for This Category Looks Like
Data sources for coke research reports include public statistics from the China Coking Industry Association, market data from the Dalian Commodity Exchange, on-site survey records from steel mills, monitoring reports from industrial chain data platforms, and more. Update frequencies cover three categories: daily spot prices, weekly supply and demand ledgers, and monthly industry analysis reports. Document structures typically include fields such as core indicators, raw material coking coal cost proportion, downstream steel demand data, policy regulation updates, and more. Units are mostly professional industrial statistical units like yuan/ton, ten thousand tons/year, percentage, and similar.

## What Constraints Do These Characteristics Impose on the "Citation Source and Traceability" Link
These characteristics create three main constraints for traceability:
1. Multi-source data requires traceability records to clearly mark release entity types, to avoid confusion between statistical standards of industry associations and trading platforms.
2. Frequently updated data requires attaching release times in traceability records, to help users judge data timeliness.
3. Structures with many subdivided professional fields require traceability to accurately map to the source paragraph of specific fields.
Additionally, as a segmented category under the broader coal category, coke data is easily confused with other coal categories. Traceability links must add clear category association tags to prevent cross-category citation errors.

## How to Configure the Settings

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | `Top 20 entries` | Covers multi-source latest coke research report data, avoids missing key information in segmented industry areas |
| `Similarity threshold` | `0.75–0.85` | Filters low-relevance cross-category content, retains retrieval results that highly match core coke indicators |
| `maxContext` | `12000–15000 token` | Adapts to professional analysis content in long paragraphs of coke research reports, ensures complete contextual association can be displayed during traceability |
| `Citation Count Limit` | `10–15 entries` | Controls the total amount of traceability information output, avoids content redundancy from excessive citations |
| `Chunk size` | `4000–5000 token` | Matches the long document structure of coke research reports, balances contextual integrity and retrieval accuracy |
| `Rerank result count` | `Top 8 entries` | Prioritizes results most relevant to core coke indicators, simplifies the complexity of traceability display |

## Three Common Misconfigurations
- Issue: Setting `Citation Count Limit` to 1500 results in citation content token count exceeding limits. Cause: Failed to truncate individual retrieved segment lengths, only limited the total number of recalled segments, and did not match the single-segment citation token rules of FastGPT 4.6.7.
- Issue: Non-coke category research report content appears in retrieval results. Cause: The `Similarity threshold` setting is too low, incorrectly matching documents from other categories under the coal category, and failing to filter irrelevant technical term association content.
- Issue: No release time for research reports is marked in citation traceability. Cause: The "Retain Metadata" option was not enabled during the document parsing stage, resulting in loss of the research report's release time field, making it impossible to add timeliness information in traceability displays.

## How to Verify Proper Configuration
- Upload a public coke research report document, trigger retrieval, and check that the citation sources in the returned results include metadata such as publishing organization and release time.
- Initiate a query containing core coke indicators, verify that the number of returned citations meets the preset `Citation Count Limit` requirement.
- Check the sorting logic of retrieval results, confirm that content related to core coke indicators is displayed first, and that original similarity is not the sole basis for sorting.
- Check the length of individual citation content, confirm that it does not exceed the preset context window limit, avoiding content truncation or overflow.

> The parameter values provided on this page are common recommendations used as a starting point for configuration. Actual values are affected by material form, data volume and business rules. Each situation requires specific analysis, and it is recommended to test on your own samples before finalizing settings.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
