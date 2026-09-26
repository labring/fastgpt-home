---
title: Vector Models and Indexing for Advertising and Marketing Content
slug: /en/industry/finance-d012-c062-f004
page_type: Industry scenario page
article_section: Marketing Content and Lead Generation
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexing for Advertising and Marketing
meta_description: Core advertising and marketing data for financial institutions comes from campaign materials, landing page copy, campaign keyword libraries, user
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexing for Advertising and Marketing Content

## What Data for This Category Looks Like
Core advertising and marketing data for financial institutions comes from campaign materials, landing page copy, campaign keyword libraries, user interaction logs, and campaign performance reports for credit card, wealth management, and insurance products. Data update cadence falls into two categories: campaign plan data updates daily alongside campaign adjustments, while user interaction data syncs in real time. The structure of a single data entry includes fields for unique material ID, delivery channel code, copy body, target audience tags, delivery time configuration, impressions, and conversions. Units include material file size (MB), campaign budget (yuan), and conversion count (units), among others.

## Constraints Imposed on Vector Models and Indexing by These Characteristics
Financial institution advertising and marketing data includes structured tags and unstructured text, plus real-time updated interaction data. This creates multiple constraints for the vector model and indexing workflow.
Multiple field types require the vector model to adapt to text inputs of varying lengths related to financial products, while supporting associative indexing for structured tags. Real-time data sync requirements demand that the index supports incremental writes and low-latency queries, avoiding the time cost of full index rebuilding. Significant differences in copy style across delivery channels require the vector model to capture contextual semantic features and avoid cross-channel semantic confusion.

## Configuration Settings

| Configuration Item | Recommended Values | Rationale |
|---|---|---|
| `embedding_model` | `bge-large-zh-v1.5` or `text-embedding-3-large` | Adapts to medium and long text inputs for financial product advertisements, supports multi-channel semantic alignment, and balances accuracy and inference speed |
| `chunk_size` | 800–1200 characters | Advertising copy ranges from short to medium-long text. This range preserves complete semantic units and avoids semantic fragmentation caused by overly small chunks |
| `index_type` | `HNSW` | Supports high-concurrency, low-latency queries, and adapts to real-time campaign adjustments and real-time sync of interaction data |
| `recall_top_k` | 10–15 entries | Balances recall coverage and the computational load of subsequent reranking, and matches the recall requirements of multi-dimensional tags for financial advertisements |
| `vector_store` | `Zilliz Cloud` or on-premises Milvus cluster | Supports high-concurrency writes and storage, adapts to real-time sync requirements for interaction data, and supports configuration adjustments for migration scenarios |
| `rerank_model` | `bge-reranker-large` | Optimizes semantic matching accuracy between financial advertising copy and query keywords, and improves precise recall effectiveness

> The parameter values provided on this page are all conventional recommendations used as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Errors
- Symptom: A `500 Internal Server Error` occurs after vector store migration, and queries return empty results. Cause: The connection parameters for `vector_store` are not configured correctly, so FastGPT cannot connect to the target vector cluster and cannot read or write vector data.
- Symptom: An `ETIMEDOUT` timeout error occurs when calling the rerank model in version 4.9. Cause: The local deployment address of the private rerank model is not configured, and the default cloud interface address is still used, resulting in excessive network latency that prevents the call from completing.
- Symptom: The number of recall results from test queries is far lower than the configured `recall_top_k`, and fails to cover all valid advertising materials. Cause: The incremental index update function is not enabled. Only historical campaign data is synced, and real-time updated user interaction data is not included, resulting in incomplete index content.

## How to Confirm the Configuration Is Correct
- Log in to the FastGPT vector store management interface, check the connection status of `vector_store`, and confirm it shows "Connected".
- Upload a sample of financial product advertising copy to trigger the vector generation and indexing process, and check that there are no `embedding`-related error messages in the system logs.
- Initiate a test query, enter keywords related to financial product campaigns, and verify that the number of returned results matches the configured `recall_top_k`.
- Adjust the copy content of an existing campaign plan, wait 10 minutes, then initiate the query again, and confirm that the new vector data has been included in the index results.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
