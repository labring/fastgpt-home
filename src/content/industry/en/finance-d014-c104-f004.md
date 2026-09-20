---
title: Vector Models and Indexing for Glass Industry Financial Report Analysis
slug: /en/industry/finance-d014-c104-f004
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexing for Glass Industry Financial
meta_description: Glass financial report data primarily comes from public monthly operational data released by the architectural glass industry association, annual and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexing for Glass Industry Financial Report Analysis

## What the Data for This Category Looks Like
Glass financial report data primarily comes from public monthly operational data released by the architectural glass industry association, annual and quarterly regular reports of listed glass manufacturing enterprises, and building material category import and export statistical data from customs authorities.
Monthly industry data is released by the 5th of each month. Listed company financial reports are updated on fixed quarterly and annual timelines.
Most documents combine structured tables and industry analysis text. They include fields such as production capacity, output, average selling price, and inventory turnover days for sub-categories like float glass and tempered glass. Units include ten thousand heavy cases, yuan per square meter, tons, ten thousand square meters, and others.

## Constraints on Vector Models and Indexing
The structured multi-field format, incremental node-based updates, and diverse sub-categories of glass financial reports impose multiple constraints on the vector models and indexing workflow.
Structured numerical fields require separate semantic feature extraction, followed by fusion with text analysis content for embedding.
Monthly incremental data must support incremental index updates to avoid excessive time spent on full index reconstruction.
Individual document lengths vary widely based on sub-category analysis content length, so dynamic adjustment of segment thresholds is required.
Specialized building materials industry terminology needs a matching embedding model to ensure accurate semantic vectors.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `embedding_api_base` | `http://localhost:11434/v1` | Matches the API interface format for the locally deployed Qwen3-Embedding-8B:F16 model hosted by Ollama |
| `chunk_size` | `800–1200 characters` | Matches the average length of structured table paragraphs and industry analysis text in glass financial reports, to avoid breaking semantic associations across segments |
| `milvus_shard_num` | `2–4` | Adapts to the storage scale of monthly incremental vector data, balancing query concurrency and storage costs for single cluster nodes |
| `rerank_top_k` | `Top 5–8 results` | Adapts to the recall requirements for multiple sub-categories in glass financial reports, filtering redundant low-relevance results |
| `similarity_score_threshold` | `0.72–0.80` | Matches the semantic similarity distribution of specialized building materials industry terminology, filtering non-relevant recall content |
| `max_rag_context` | `8000 characters` | Adapts to the total vector concatenation length for a complete single financial report analysis, avoiding exceeding model context limits |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: Milvus container fails to start with a database connection failure, and logs contain `psql: error: could not connect to server`. Cause: The default Milvus Compose file that uses PostgreSQL for metadata storage was used, and the configuration version using Etcd for metadata storage was not switched to, resulting in missing dependencies that prevent startup.
- Symptom: Testing the embedding model connection returns `connection refused` or `404 Not Found` errors. Cause: The API base address and port for the embedding model were not configured correctly, or the local Ollama service did not load the specified Qwen3-Embedding-8B:F16 model, making it unable to receive requests.
- Symptom: Parsed financial report documents show field fragmentation, and complete single-category revenue data is missing from recall results. Cause: The set `chunk_size` is too small, splitting entire rows or columns of structured tables into independent segments, losing semantic associations between fields, and the structured document table merging parsing switch in FastGPT was not enabled.

## How to Verify Proper Configuration
- Run an embedding model connection test, confirm that the model identifier returned by the interface matches the configured model name, and there are no connection timeout or permission error messages.
- Upload a single glass industry financial report document, check the parsed segment list, confirm that segment lengths fall within the configured `chunk_size` range, and structured tables are not overly split.
- Enter industry-related keywords such as "2024 float glass production capacity", verify that the number of recall results matches the configured `rerank_top_k` setting, and relevance aligns with preset threshold rules.
- Import a single new monthly financial report data entry, observe that the index system only updates new vector data, and no full index reconstruction process is triggered.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
