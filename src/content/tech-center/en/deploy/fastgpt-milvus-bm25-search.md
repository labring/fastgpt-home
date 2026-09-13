---
title: Configure FastGPT Full-Text Search for Milvus BM25
slug: /en/deploy/fastgpt-milvus-bm25-search
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/milvus-bm25
source_type: 官方文档
---

# Configure FastGPT Full-Text Search for Milvus BM25

## Full-Text Search Behavior with Milvus Vector Stores
FastGPT’s default full-text search functionality relies on MongoDB `$text` queries for text matching across stored dataset content. When Milvus is configured as the primary vector store for a FastGPT deployment, full-text search automatically switches to use Milvus BM25 as its backend, with no additional user configuration required. This setup uses a single `modeldata_v2` collection that stores both vector embeddings and full-text data in one unified storage location, replacing the need for a separate dedicated full-text table. Additionally, the system stops writing full-text data to the MongoDB full-text table once Milvus is active as the vector store.

## Full-Text Backend Mapping Rules
The full-text search backend is determined exclusively by the selected vector store, with no standalone full-text engine configuration switch available for separate adjustment. When using Milvus as the vector store, BM25 is the active full-text backend. For all other supported vector stores (PostgreSQL, OceanBase, SeekDB, openGauss), the system retains the default MongoDB `$text` full-text search implementation as its primary text matching method.

## Milvus Version Compliance and Startup Requirements
A minimum Milvus version of 2.5.16 is mandatory to use the BM25 full-text search integration with FastGPT. If the deployed Milvus instance’s version is below this threshold, FastGPT will fail to start completely and display an explicit error message. The system will never silently downgrade to an alternative full-text search implementation in this scenario, ensuring users are immediately aware of version compatibility issues.

## Quick Reference Parameters
| Parameter/Setting | Value/Requirement |
|-------------------|-------------------|
| Minimum Supported Milvus Version | 2.5.16 |
| Unified Full-Text/Vector Collection | `modeldata_v2` |
| Disabled MongoDB Full-Text Writes | Enabled when Milvus is active |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/milvus-bm25)
