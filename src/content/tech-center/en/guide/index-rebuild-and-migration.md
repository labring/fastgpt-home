---
title: When an Index Must Be Rebuilt: Triggers, Cost and Migration Paths
slug: /en/guide/index-rebuild-and-migration
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: When an Index Must Be Rebuilt: Triggers, Cost and Migration Paths
meta_description: Understand when to rebuild indexes in your enterprise AI platform. Evaluate triggers, costs, and migration paths for optimal performance.
date_published: 2026-09-29
date_modified: 2026-09-29
---

# When an Index Must Be Rebuilt: Triggers, Cost and Migration Paths

## When this decision has to be made
Indexes are critical for efficient data retrieval in enterprise technology architectures. Index effectiveness can be impacted by changes in underlying vector models, data processing logic, or system version upgrades. Rebuilding an index prematurely or unnecessarily wastes significant resources. This includes compute resource consumption, increased storage costs, and potential business downtime. For example, a full index rebuild can take hours or even days. During this time, system performance degrades, and services may become unavailable.

Conversely, failing to identify changes that invalidate an index and perform necessary rebuilds or migrations leads to a sharp decline in system retrieval accuracy. This harms user experience. Business decisions relying on this data may become flawed. For instance, incompatible changes to vector model API parameters prevent correct querying of old indexes, leading to empty or incorrect search results. If data chunking logic or vector dimensions change, old indexes cannot effectively match new data, affecting recall and precision.

Therefore, technical leaders and buyers must carefully decide under what conditions an index rebuild or migration is mandatory. They must also assess the associated costs.

## Criteria matrix

| Candidate/Criterion | Vector Model API Parameter Change | Vector Model Dimension Change | Document Parsing/Chunking Logic Change | Vector Storage Engine Change | System Version Upgrade (Key Components) |
| :------------------ | :-------------------------------- | :---------------------------- | :------------------------------------- | :--------------------------- | :------------------------------------ |
| **voyage series models `encoding_format`** | `encoding_format=float` (mandatory in new versions) | Not stated in the documentation; verify in your environment | No direct correlation | No direct correlation | Introduced in v4.14.10.1 |
| **Custom embedding model** | `encoding_format` parameter compatibility | 1536 (default), 384, 768, 1024 (supports zero-padding) | No direct correlation | No direct correlation | `encoding_format` became mandatory in v4.14.10.1 |
| **PDF enhanced parsing** | No direct correlation | No direct correlation | Old proprietary parsing solution deprecated | No direct correlation | Introduced in v4.9.0 |
| **Knowledge base chunking optimization** | No direct correlation | No direct correlation | `chunkSettingMode`, `chunkSplitMode`, `indexSize` optional parameters | No direct correlation | Introduced in v4.9.2 |
| **Milvus Full-Text Search (BM25)** | No direct correlation | No direct correlation | `modeldata_v2` collection stores vectors and full text | Milvus 2.5.16 or higher | Introduced in v4.16.2 |
| **PG Vector plugin upgrade** | No direct correlation | No direct correlation | No direct correlation | PG Vector version 0.8.0 | Introduced in v4.9.0 |
| **MongoDB index sync adjustment** | No direct correlation | No direct correlation | No direct correlation | `SYNC_INDEX` deprecated, `MONGO_DEPRECATE_INDEX` introduced | Introduced in v4.15.4 |
| **FastGPT core API change** | No direct correlation | No direct correlation | `trainingType` field changed | No direct correlation | Old file upload API deprecated in v4.9.0, `trainingType` changed |

## Why each criterion matters

**Vector Model API Parameter Change**
When vector model API parameters change, especially with mandatory parameter introductions or format adjustments, existing indexes may become invalid. They cannot match the new calling specification. For example, starting from version v4.14.10.1, FastGPT requires custom embedding requests to carry the `encoding_format=float` parameter. If an integrated voyage series vector model does not accept this format (only accepts base64), the vectorization request returns a 400 error. This directly causes knowledge base vectorization to fail. In this situation, even if the vector model itself has not changed, its API compatibility change prevents existing indexes from updating or querying. You must adjust configurations or switch models.

**Vector Model Dimension Change**
The output dimension of a vector model is a core characteristic. If the configured vector dimension does not match the actual output dimension of the vector model, index construction will fail or query results will be abnormal. For instance, the system might expect 1536-dimensional vectors. However, if the integrated model outputs 384, 768, or 1024-dimensional vectors, even if the system supports zero-padding for compatibility, errors like `RangeError: Invalid array length` or `error: expected 1536 dimensions, not 384` may occur. This mismatch directly impacts index generation and retrieval accuracy. You must modify database table structures (e.g., `ALTER TABLE modeldata alter COLUMN vector type vector(384)`) or adjust model configurations.

**Document Parsing/Chunking Logic Change**
Document parsing and chunking logic form the foundation of knowledge base construction. Any significant adjustment to this logic can lead to new indexes that are inconsistent with old index structures, or new and old data that cannot effectively match. For example, v4.9.0 introduced enhanced PDF parsing, deprecating the old proprietary parsing solution. This means new documents may not parse and chunk correctly if you still rely on the old solution. Version v4.9.2 introduced knowledge base chunking optimization, supporting optional parameters like `chunkSettingMode`, `chunkSplitMode`, and `indexSize`. These allow finer control over chunk and index sizes. If these parameters differ significantly from previous default behaviors, updating and rebuilding existing knowledge bases may require re-evaluating chunking strategies to ensure index quality.

**Vector Storage Engine Change**
Replacing or upgrading the underlying vector storage engine often involves fundamental changes in data structure, query methods, and even indexing mechanisms. For example, version v4.16.2 automatically switched Milvus full-text search to Milvus BM25, using the new `modeldata_v2` collection to store vectors and full text. This requires Milvus to be upgraded to 2.5.16 or higher. If the Milvus version is too low, FastGPT will terminate startup. For existing Milvus deployments, you must migrate vectors from the old `modeldata` collection and index text from MongoDB to `modeldata_v2`. This change involves data migration and index reconstruction. It is mandatory; otherwise, the system will not function correctly.

**System Version Upgrade (Key Components)**
System version upgrades, especially those involving core components or the data storage layer, can introduce incompatible changes that invalidate old indexes. For example, during the v4.8.1 upgrade, due to non-standard collection names, an initialization command (`/api/admin/initv481`) was required to reset table names, migrating `dataset.collections` to `dataset_collections`. If this initialization command was not executed or failed, existing knowledge bases and application data might become inaccessible, or data loss might appear to have occurred. Additionally, v4.15.4 introduced MongoDB index synchronization adjustments, deprecating `SYNC_INDEX` and introducing `MONGO_DEPRECATE_INDEX`. While the default behavior is safe synchronization, understanding its impact on custom indexes and the old index cleanup mechanism is crucial to avoid unexpected data loss.

## The cost of switching later

Choosing or changing index solutions, vector models, or underlying storage engines incurs costs beyond technical implementation.

First, **data considerations**: If a new solution is incompatible with the existing data structure, it may require extensive data conversion or cleansing. For example, a vector model dimension change might necessitate regenerating vector embeddings for all data. This is time-consuming and can introduce data precision loss. If the vector storage engine changes, you must migrate vector data and metadata from the old engine to the new. This may involve complex ETL processes and carries a risk of data loss or corruption.

Second, **index considerations**: Almost all significant changes mean existing indexes become invalid and require rebuilding. Rebuilding an index is a resource-intensive operation, demanding substantial compute resources (CPU, GPU) and time. For large knowledge bases, rebuilding can take hours to days, severely impacting system performance. For example, when migrating Milvus to BM25, data from the old `modeldata` collection must be migrated to `modeldata_v2`. While this avoids re-embedding, data copying and merging remain time-consuming operations.

**Downtime windows** are another critical consideration. Many index rebuilds or data migration operations cannot be performed seamlessly in a production environment. They require scheduled downtime. The length of downtime directly affects business continuity. You must plan for it in advance and communicate fully with business stakeholders. For instance, the v4.8.1 initialization command recommends pausing all ongoing business operations before execution to avoid data conflicts.

Finally, **validation effort**: After deploying a new indexing solution or model, you must perform comprehensive functional and performance validation. This ensures retrieval accuracy, recall, and response speed meet expectations. This includes writing test cases, executing regression tests, and conducting A/B tests to confirm no new issues were introduced. Validation effort is often underestimated but is critical for system stability and data quality.

## When this decision can wait

In some situations, the decision to rebuild or migrate an index can be postponed. This avoids unnecessary resource consumption and risks.

First, if **changes only involve non-core functions or minor optimizations**, and do not significantly impact the retrieval accuracy or performance of existing indexes, you can delay execution. For example, UI optimizations, non-critical log adjustments, or minor bug fixes usually do not affect the underlying logic of indexes. Therefore, an immediate rebuild is not necessary.

Second, when **the system is currently under high load or has other higher-priority business tasks** underway, avoid introducing large-scale index rebuild operations. Such operations consume significant system resources, potentially leading to performance degradation or outages in the production environment. In these cases, wait for off-peak business hours or completion of critical tasks before re-evaluating and planning.

Third, if **the change provides options compatible with old indexes or temporary workarounds**, and these solutions meet current business needs, a full index rebuild can be temporarily avoided. For example, when FastGPT's mandatory `encoding_format=float` parameter causes incompatibility with voyage series models, temporarily switching to a compatible BAAI/bge-m3 model can restore knowledge base availability. This avoids immediate processing of all old indexes.

Finally, if **the change only affects newly created data or knowledge bases**, and has no negative impact on queries of existing data, you can adopt an incremental update strategy. Apply the new logic only to new data, while existing data remains unchanged. For instance, the introduction of knowledge base chunking optimization parameters might only affect newly imported data, without invalidating indexes of existing knowledge bases. In this scenario, you can transition gradually, reducing the impact of a one-time change.

## Keep reading

- [Chunking by Document Type: How Each Class Splits and What Values to Use](/en/guide/chunking-strategy-selection)
- [Observability Choices: What Each Layer Records, and How Long to Keep It](/en/guide/observability-and-logging-stack)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
