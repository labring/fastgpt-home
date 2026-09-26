---
title: Knowledge Base Retrieval and Recall for Gas Marketing Content
slug: /en/industry/finance-d012-c099-f013
page_type: Industry scenario page
article_section: Marketing Content and Lead Generation
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Gas Marketing
meta_description: Gas marketing-related data mainly comes from official materials of gas operators, and includes three core types of content: tiered gas price
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Gas Marketing Content

## What the data for this category looks like
Gas marketing-related data mainly comes from official materials of gas operators, and includes three core types of content: tiered gas price adjustment notices, account opening/renewal/stored value promotion copy, safe gas use and customer service Q&A documents. The update cadences vary significantly: temporary marketing events are updated weekly or monthly, price adjustment notices are updated quarterly or annually, and safety guides are iterated every quarter. Document structures include fixed fields: activity effective date, applicable administrative regions, gas price tiers (unit: yuan/cubic meter), stored value rebate rate, safety prompt level. Some long documents include multi-paragraph scenario explanations.

## What constraints do these characteristics impose on the knowledge base retrieval and recall workflow
Dispersed data sources and inconsistent update cadences require the retrieval system to support tag-based classification recall to avoid mixing different types of content. Exclusive fields such as applicable region, effective date, gas price tiers, and stored value rebate rate require field-level filtering during the retrieval process, otherwise invalid content such as cross-region, expired, or mismatched rebate rate results will be returned. There is a wide span in document length, from tens of characters of Q&A to thousands of characters of price notices, so a chunking strategy must adapt to different document lengths to avoid splitting critical numerical or scenario information. Temporarily updated marketing content requires high-frequency incremental indexing to balance retrieval timeliness and system resource consumption.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `Recall count` | `Top 8 entries` | There is a large difference in single-document length for gas marketing content. Too many recalled results will exceed the context window, leading to truncation of critical information |
| `Similarity threshold` | `0.72–0.80` | Gas-related keywords have similar semantics but different scenarios, such as "tiered gas price" and "gas price adjustment". A threshold that is too low will introduce irrelevant results |
| `Chunk size` | `800–1200 characters` | Gas price notice documents are relatively long. Too short chunking will split critical numerical information such as gas price tiers, affecting retrieval matching accuracy |
| `Incremental Update Trigger Interval` | `Every 6 hours` | Temporary marketing events have a high update frequency, while long-term price lists have a low update frequency. This interval balances update costs and timeliness |
| `Field Filter Toggle` | `Enabled` | Gas content includes exclusive fields such as "applicable region" and "effective date". Field-level precise recall is required to avoid returning cross-region or expired content |
| `Rerank result count` | `Top 3 entries` | Marketing content should prioritize displaying the most relevant activities or notices, reducing user screening costs |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Each scenario requires tailored analysis, and testing on your own samples is recommended before finalizing settings.

## Three common mistakes
- Phenomenon: When calling the `api/v1/chat/completions` interface, specifying a knowledge base tag does not return corresponding content. Cause: The `kbTags` or `kbIds` parameter is not correctly included in the request body, or the tag name does not exactly match the tag configured for the knowledge base.
- Phenomenon: The variable selection panel of the code running node does not display knowledge base reference options. Cause: The target knowledge base has not been bound in the application configuration in advance, or the bound knowledge base has not completed its first index build.
- Phenomenon: Multiple results are returned by the retrieval, but they are not sorted by match degree. Cause: The reranking function is not enabled, or the `Rerank result count` configuration value is greater than the `Recall count` configuration value, causing the sorting logic to fail.

## How to confirm the configuration is correct
- Upload 1 gas community-specific price notice document in the application debugging interface, enable field filtering, search for "XX community gas price", and verify that the returned results only include content related to that community.
- View the incremental update log in the knowledge base management interface, confirm that temporary marketing event documents complete index updates within the configured `Incremental Update Trigger Interval`.
- Call the `api/core/datas` interface to create a knowledge base collection, verify that the returned `id` field matches the collection ID displayed on the interface.
- Enter a search query in the debugging window, check whether the `score` value of the retrieval results falls within the configured `Similarity threshold` interval.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
