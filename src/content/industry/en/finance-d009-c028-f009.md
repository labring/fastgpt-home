---
title: Citation Source and Traceability for Thermal Coal Research Reports
slug: /en/industry/finance-d009-c028-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Thermal Coal Research
meta_description: The data sources for thermal coal research reports primarily include spot market data from domestic coal exchanges, supply and demand statistical
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Thermal Coal Research Reports

## What this type of data includes
The data sources for thermal coal research reports primarily include spot market data from domestic coal exchanges, supply and demand statistical reports from industry associations, brokerage energy sector research reports, and port spot ledgers. Update cycles cover daily spot prices, weekly port inventory, monthly supply and demand balance sheets, and quarterly industry trend analyses. Document structures typically include core indicator cards, supply and demand trend charts, and policy interpretation sections. Fields include calorific value (Q value, unit: large calories per kilogram), sulfur content, ash content, port flat price, pithead price, and others, with units mostly expressed in yuan per ton.

## Constraints for Citation Traceability
The multi-data-source and multi-update-frequency nature of thermal coal research reports requires that traceability operations clearly mark source types and release times, to avoid confusion between data of different cycles. The presence of specialized terminology and fixed fields requires that traceability content fully retain key information such as Q values and units, to prevent data distortion from truncation. The structured paragraphs and table distribution in long documents require that traceability accurately locate specific text blocks or table positions. Additionally, format differences across data sources require that traceability logic adapt to both structured tables and free-form text content.

## Configuration Parameters
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `retrieveTopK` | Top 8-12 entries | Core data of thermal coal research reports is scattered across multiple sources, so sufficient recall is needed to cover professional content across different dimensions |
| `similarityThreshold` | 0.65-0.75 | Thermal coal research reports contain a large number of exclusive specialized terms. A threshold that is too low will introduce irrelevant documents, while a threshold that is too high may miss core relevant content |
| `referenceMode` | `fullChunk` | Core data in thermal coal research reports is mostly structured tables or coherent paragraphs. Full chunk citation can retain key information such as units and field names |
| `showReference` | Configured as `true` or `false` based on scenario | Adapt to traceability display requirements across different business scenarios. Some lightweight scenarios can hide citation content |
| `referenceFieldWhitelist` | `["title", "publishTime", "source", "contentChunk"]` | Traceability for thermal coal research reports requires clear labeling of document titles, release times, source institutions, and specifically cited text content |
| `parseChunkSize` | 800-1200 characters | Adapt to the conventional length of supply and demand tables and market analysis paragraphs in thermal coal research reports, to avoid damaging data integrity during chunking |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- Phenomenon: The API returns the `quote type error` error code. Cause: The passed citation variable format does not meet verification rules, or correct field names are not configured in `referenceFieldWhitelist`.
- Phenomenon: Returned results only show a single cited file name. Cause: The `retrieveTopK` parameter is set too low, or the recall policy does not enable multi-document associated recall, which fails to cover multi-source core data of thermal coal research reports.
- Phenomenon: Unable to hide citation content in the knowledge base. Cause: The `showReference` parameter is not set to `false`, or the front-end rendering logic forcibly displays the citation module.

## How to Verify Proper Configuration
- A test query containing thermal coal specialized terminology can be run, and returned results can be checked for clear source file names, release times, and cited text blocks.
- The API interface can be called, and the returned `references` field can be checked for multiple entries with thermal coal research report characteristics, covering different source types such as exchange data and brokerage research reports.
- A citation variable with an incorrect format can be passed, and the `quote type error` error can be verified as triggered, confirming that the parameter verification logic is functioning properly.
- The `showReference` parameter can be adjusted to `false`, a query can be initiated, and it can be confirmed that citation-related fields and content are no longer included in the returned results.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
