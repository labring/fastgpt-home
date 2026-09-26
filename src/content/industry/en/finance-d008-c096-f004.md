---
title: Vector Models and Indexes for Coke Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c096-f004
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexes for Coke Intelligent Due Diligence
meta_description: Data sources for coke due diligence reports include public statistics from coking industry associations, bulk commodity spot trading platforms
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexes for Coke Intelligent Due Diligence Reports

## What the data for this category looks like
Data sources for coke due diligence reports include public statistics from coking industry associations, bulk commodity spot trading platforms, futures exchange market data, and public reports from downstream steel enterprises. Update frequencies vary: spot prices are updated daily, port inventory every two days, monthly industry analysis reports are released each month, and futures market data is updated in real time during trading days. Document structures include structured fielded reports and semi-structured analytical text. Core fields include ex-factory prices by origin, port warehouse delivery prices, total inventory, average daily output, cross-regional transportation costs, and more. Corresponding units include yuan/ton, ton, ton/day, and others.

## What constraints these characteristics impose on vector models and indexes
The mixed multi-type data characteristics, differentiated update rhythms, and clear field units of coke data create multiple constraints for vector model and index configuration. First, coexisting structured numeric fields and semi-structured text require vector models to support both numeric feature encoding and semantic embedding, to avoid losing field associations after text splitting. Second, frequently updated time-series data requires indexes to support incremental refreshes instead of full reconstruction, reducing computing resource consumption. Third, clear field and unit definitions require index configurations to set differentiated embedding weights for different fields, improving recall accuracy. Fourth, some documents are structured tables, so vector models must correctly parse table row and column structures to preserve data correspondences.

## How to set the configurations
| Configuration Item | Recommended Range | Rationale |
| ---- | ---- | ---- |
| `max_chunk_size` | 800–1200 characters | Coke due diligence reports include long-text analysis and multi-column numeric tables. This length preserves field associations and semantic context within a single chunk, avoiding splitting-induced breaks |
| `embedding_batch_size` | 32–64 | Adapts to the memory usage of dengcao/Qwen3-Embedding-8B:F16, balances embedding efficiency and resource consumption |
| `index_refresh_interval` | 5 minutes | Adapts to the daily update of coke spot prices and two-day update of port inventory. Near-real-time refresh ensures the timeliness of recalled data |
| `recall_top_k` | 15–20 | Coke due diligence requires coverage of multi-dimensional indicators (price, inventory, transportation costs). A higher number of recalled entries improves matching comprehensiveness |
| `rerank_top_n` | 5–8 | Filters redundant recall results, focusing on core related indicators and analytical content |
| `vector_db_max_storage` | 2000 GB | Set based on the storage requirements of full annual coke due diligence data and incremental updates, adapts to the single-database capacity threshold of vector databases |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Issue: Vector database fails to start, logs show PostgreSQL connection failure. Cause: The PostgreSQL configuration parameters in the default vector database compose file are not adapted. Local environment ports or permissions do not match preset values, causing dependent services to fail to start normally.
- Issue: Embedding task fails to execute, the interface returns a `Connection refused` error. Cause: The access port of the local model service is not configured correctly, or the embedding model deployed via ollama/VLLM failed to load, causing the vector model service to fail to respond to requests normally.
- Issue: Index storage space usage exceeds expectations. Cause: `max_chunk_size` is set too small, causing a single document to be split into too many chunks. Each chunk generates a separate vector embedding, which adds additional index storage and computing overhead.

## How to confirm configuration is complete
- Log in to the vector database management interface, view index refresh logs, and confirm that refresh intervals for all data sources match preset configurations.
- Submit a standard coke due diligence report, check that the number of post-embedding chunks matches the preset `max_chunk_size` value, with no excessive splitting or semantic breaks.
- Run a recall test, enter query terms related to coke, and verify that the relevance between recalled result fields and query semantics meets expectations.
- View vector database storage usage, confirm that index occupied space matches the preset `vector_db_max_storage` threshold, with no abnormal growth.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
