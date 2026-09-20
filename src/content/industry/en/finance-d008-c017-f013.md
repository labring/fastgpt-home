---
title: Knowledge Base Retrieval and Recall for Optoelectronics Industry Due Diligence Reports
slug: /en/industry/finance-d008-c017-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Optoelectronics
meta_description: Optoelectronics industry due diligence data primarily comes from industry association public statistics, listed companies’ periodic financial reports
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Optoelectronics Industry Due Diligence Reports

## What data for this category looks like
Optoelectronics industry due diligence data primarily comes from industry association public statistics, listed companies’ periodic financial reports, patent databases, supply chain monitoring platforms, and terminal application survey data. Update rhythms vary significantly by data source type. Financial report data updates quarterly, industry monitoring data updates monthly, and patent data syncs in real time. Document formats include structured tables of shipment volume, yield rate, and unit price; unstructured technical analysis and supply chain interpretation text; and product specification sheets with parameter annotations. Fields cover brightness, color gamut, response time, shipment volume, and more. Units include nits, percentage, milliseconds, 10,000 units, yuan per sheet, and others.

## What constraints these characteristics impose on knowledge base retrieval and recall
Dispersed data sources require retrieval across multiple database types, increasing cross-source integration difficulty for vector indexes. Varied update rhythms demand a combined incremental and full update strategy to avoid data lag or redundancy. Mixed structured and unstructured document formats require differentiated chunking rules for different content to ensure retrieval matching accuracy. Diverse fields and units require pre-established field mapping rules to prevent retrieval deviations caused by inconsistent units. Additionally, multiple optoelectronics sub-categories mean a single query may involve data for multiple product types, so recall results need sufficient coverage breadth.

## How to set configurations
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `chunkSize` | 800–1200 characters | Adapts to the mixed structured and unstructured nature of optoelectronics documents, avoiding paragraph fragmentation or context loss |
| `similarityThreshold` | 0.75–0.85 | Filters industry noise, retaining technical parameters and analysis content strongly related to due diligence topics |
| `recallTopK` | Top 10–15 results | Covers multi-source, multi-sub-category optoelectronics data, avoiding omission of critical supply chain or product information |
| `UPLOAD_FILE_MAX_SIZE` | 2000 MB | Supports uploading industry report documents with large numbers of charts and data |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 seconds | Reserves sufficient time for parsing large optoelectronics documents |
| `vectorStoreType` | `pgvector` or `milvus` | Use `pgvector` for small knowledge bases, switch to `milvus` for high-data-volume scenarios to meet higher capacity requirements |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common misconfigurations
- Semantic search and full-text search tools return "Connection error". This occurs due to incorrect vector database connection parameter configuration, such as incorrect `vectorStoreHost` or `vectorStorePort` entries, or the vector database service not starting normally.
- The number of knowledge base recall results is far lower than expected. This happens because the `recallTopK` parameter is set too low, failing to cover multi-source data across multiple optoelectronics sub-categories.
- Knowledge base upper limit cannot be increased. This occurs when using `pgvector` without adjusting the database connection limit configuration, or not switching to `milvus` to support larger-scale knowledge base storage.

## How to confirm successful configuration
- Navigate to the vector database management page in FastGPT, run a connection test to verify connectivity for configurations including `vectorStoreHost` and `vectorStorePort`.
- Upload an optoelectronics product specification sheet, check the parsed chunking results to confirm chunk length matches the `chunkSize` setting.
- Submit a due diligence query related to optoelectronics supply chains, verify that the similarity of recall results falls within the range set by `similarityThreshold`.
- Add multiple knowledge bases, confirm the number of createable knowledge bases is not limited by initial configurations, and verify that knowledge base upper limit adjustments take effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
