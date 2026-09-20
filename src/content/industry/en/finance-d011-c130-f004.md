---
title: Vector Models and Indexes for In-Terminal Natural Language Retrieval of Market Data
slug: /en/industry/finance-d011-c130-f004
page_type: Industry scenario page
article_section: In-App Natural Language Search
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexes for In-Terminal Natural Language
meta_description: Market data is sourced from exchange-authorized interfaces and compliant official market data channels. Update frequency varies by category. Stock
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexes for In-Terminal Natural Language Retrieval of Market Data

## What This Category of Data Looks Like
Market data is sourced from exchange-authorized interfaces and compliant official market data channels. Update frequency varies by category. Stock data pushes real-time transaction-by-transaction data or minute-by-minute snapshots. Exchange-traded funds and bonds update at a slightly lower rate.

Each data entry has a standardized structure, including fields such as security code, security abbreviation, latest transaction price, price change percentage, daily trading volume, daily cumulative transaction amount, and data generation timestamp. Price is measured in Renminbi yuan, trading volume is in shares, and transaction amount is in yuan.

## Constraints Imposed on Vector Models and Indexes
The high-frequency real-time update nature of market data requires indexes to support incremental writes and low-latency updates. Full index rebuilding must be avoided to prevent business delays.

The need for combined multi-structured field queries requires vector models to support multi-field weighted encoding, or indexes to support hybrid queries of structured filtering and vector recall.

The small size of single data entries, combined with growing total data volume as the number of securities increases, requires index sharding strategies to adapt to high-concurrency small-batch writes.

The high-frequency retrieval requirement for timestamp fields requires indexes to support time range filtering. This narrows the candidate set for vector recall and improves query efficiency.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `embedding_batch_size` | 32–64 | Adapts to the small size of single market data entries, avoids memory overflow from oversized batches, and controls embedding time per batch |
| `vector_index_type` | `HNSW` | Meets high-frequency low-latency recall requirements. HNSW index has better query performance than Flat indexes, making it suitable for real-time retrieval scenarios |
| `index_refresh_interval` | 60 seconds | Matches the minute-level update rhythm of market data, balances index update latency and write overhead |
| `filter_field_enable` | Enabled | Supports structured filtering on the `security_code` and `data_timestamp` fields to narrow down the candidate range for vector recall |
| `max_recall_count` | Top 20 entries | Covers the typical candidate needs of a single terminal user per retrieval, avoids excessive redundant data entering subsequent processing steps |
| `embedding_dimension` | 768 | Matches the output dimension of the selected embedding model, ensures alignment between vector indexes and embedding results, and prevents dimension mismatch errors |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by data format, data volume, and business rules. Specific issues require individual analysis, and testing on available samples is recommended before finalizing settings.

## Three Common Configuration Mistakes
- Symptom: When deploying with a PostgreSQL database, index creation tasks time out or throw a `connection timeout` error. Cause: Insufficient host machine memory. Without optimizing PostgreSQL memory parameters on an 8-core 16GB configuration without a GPU, memory is exhausted during batch writes of market data.
- Symptom: Embedding model calls return errors including `model not supported` or `dimension mismatch`. Cause: A dedicated embedding model for indexing is not configured, the API key of a chat model is reused, and the dimension for field encoding of market data is not matched.
- Symptom: After starting with docker-compose, the index function does not work, and retrieval returns no results. Cause: The `CHAT_API_KEY` environment variable is not configured correctly, and the container is not recreated to apply the new configuration, causing the index service to fail to access the embedding model interface.

## How to Verify Correct Configuration
- View embedding model call logs to confirm that the `embedding_dimension` field matches the dimension configured for the index, with no dimension mismatch errors.
- Submit a test market data entry to trigger index writing, check the write latency of index shards to ensure it meets the business required update rhythm.
- Construct a retrieval request that includes `security_code` and a time range, verify that hybrid queries of structured filtering and vector recall return results normally.
- Check the incremental update status of the index, confirm that newly added market data can be retrieved within the configured `index_refresh_interval` time period.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
