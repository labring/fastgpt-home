---
title: Citation Sources and Traceability for Minor Metals Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c058-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Minor Metals
meta_description: Minor metals data sources primarily include monthly supply and demand reports from industry associations, listed trading data from futures exchanges
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Minor Metals Intelligent Due Diligence Reports

## What data for this category looks like
Minor metals data sources primarily include monthly supply and demand reports from industry associations, listed trading data from futures exchanges, production data publicly disclosed by mining enterprises, and customs import and export statistical statements. Data update frequencies vary: futures price data is updated daily, industry supply and demand data is updated every two weeks, and customs import and export data is updated monthly. Document structures mainly consist of structured tables paired with textual analysis, including fields such as metal designation, grade, origin, transaction price (units are mostly yuan per ton or US dollars per ounce), remaining inventory, import and export volume, and some documents also include analysis of the impact of policy changes on the market.

## What constraints these characteristics impose on the citation sources and traceability link
Decentralized data sources and inconsistent update frequencies require citation traceability to simultaneously mark data source type and update time, to avoid due diligence content that does not match timeliness. There are numerous minor metal subcategories, and field formats are inconsistent. Grade and price units from different sources may vary, so standardized fields must be matched during traceability to prevent data confusion. The mixed structure of structured and unstructured content requires traceability to extract both precise data within table cells and the contextual source of the corresponding paragraph, rather than only extracting plain text fragments.

## How to configure the settings
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `similarityThreshold` | 0.75–0.85 | There are many minor metal subcategories, and high keyword accuracy is required. A threshold that is too low will mix in data from unrelated categories, while a threshold that is too high will lead to insufficient effective recall |
| `maxReference` | Top 6–10 entries | Minor metal data sources are decentralized, so data from multiple sources of the same category must be covered to avoid bias from a single source |
| `rerankReturnCount` | Top 3–5 entries | Intelligent due diligence reports require precise citation of core data. Too many returned entries will lead to content redundancy and reduce report readability |
| `chunkSize` | 500 characters | Minor metal data includes structured tables and unit annotations. Chunk length must preserve field integrity to avoid splitting that disrupts data associations |
| `referenceFragmentMaxLength` | 800–1200 characters | Key information such as units and origin of minor metal data must be fully extracted. Fragments that are too long will mix in irrelevant content, while fragments that are too short cannot cover complete fields |
| `enableCustomPrompt` | Enable based on scenario | The open-source version V4.8.22 must be upgraded to the corresponding version before enabling, used to configure traceability prompts exclusive to minor metals |

> The parameter values provided on this page are all conventional recommendations used as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Empty citation results after enabling reranking functionality, with no matching fragments returned by knowledge base search. Cause: The set `similarityThreshold` is too high, and the reranking model has insufficient matching weight for minor metal-specific keywords, leading to initial recall results being filtered out.
- Unable to configure custom citation templates and prompts in the open-source version V4.8.22. Cause: This version does not have the advanced configuration module unlocked, and must be upgraded to a later version to use this feature.
- Inconsistent unit field data appearing in citation fragments. Cause: No field standardization rules during chunking were configured, and minor metal data from different sources (such as grade mixed with % and g/t) was not uniformly matched, leading to failure to associate correct units during traceability.

## How to confirm configurations are correct
- Import a single exclusive test document for minor metals, trigger retrieval, check the category matching degree of recall results, and adjust `similarityThreshold` to the required range.
- After enabling the reranking functionality, compare the number of recalled entries before and after enabling to confirm that the rerank return count meets the configuration requirements.
- View the display fields of citation sources, confirm that each citation fragment includes the data source name, update time, and key field information.
- After upgrading to the corresponding version, check whether the advanced configuration module is accessible, and confirm that the custom citation template has taken effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
