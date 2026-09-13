---
title: Key Code Improvements for FastGPT 4.16.2
slug: /en/deploy/fastgpt-code-improvements-4162
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162
source_type: 官方文档
---

# Key Code Improvements for FastGPT 4.16.2

## Legacy Workflow Tool Parameter Compatibility
Standardized compatibility handling for legacy tool parameters in Workflows ensures existing workflow configurations remain functional without breaking changes following the upgrade, reducing migration effort for self-hosted deployments.

## Permission & ACL Standardization
This update introduces materialized effective ACLs for Apps, Datasets, and Agent Skills, alongside centralized collaborator permission mutations and inheritance synchronization. This streamlines permission management across platform resources, ensuring consistent access control and eliminating fragmented permission logic across individual resource types.

## Data Integrity & Search Standardization
### Transactional Dataset Data Handling
When creating Dataset data, a mandatory MongoDB session is required, with a transaction added for manual data insertion. This configuration guarantees atomic commitment of primary dataset records, full-text search entries, and image TTL state, preventing partial data writes that could cause consistency errors.
### Unified Full-Text Search Abstraction
Full-text search functionality is unified behind the `FullTextStore` abstraction layer. Milvus deployments use the BM25 indexing algorithm, while all other vector stores continue to utilize MongoDB’s native `$text` query operator, creating a consistent search interface across different storage backends.

## File Parsing Resource Management
This update standardizes file parsing inputs on `FileSource` and defers content materialization until a Worker acquires a processing slot and reserves initial resources, with tiered rules for different source types:
1.  **Trusted S3 objects**: Retrieve file size directly from object metadata, and reserve resources for both materialization and parsing upfront. The upload path already enforces business file-size limits, so parsing skips duplicate validation checks.
2.  **Untrusted External URLs**: Declare only the parser’s base resource reservation when added to the queue. During download, FastGPT enforces configured business file-size limits and a permanent per-task memory limit, then dynamically increases soft resource reservations to match the actual downloaded byte count. Exhausting available capacity blocks subsequent queued tasks but does not interrupt active downloads.
3.  The wait queue has no hard task-count or aggregate estimated-resource limit, with a fixed 30-minute queue timeout. Any failures, timeouts, or Worker exits will abort unfinished downloads and immediately release all reserved resources to avoid resource leaks.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162)
