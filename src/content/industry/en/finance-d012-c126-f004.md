---
title: Vector Models and Indexing for Airport Marketing Content
slug: /en/industry/finance-d012-c126-f004
page_type: Industry scenario page
article_section: Marketing Content and Lead Generation
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexing for Airport Marketing Content
meta_description: Data sources for airport marketing content include ad schedules from official airport marketing management systems, route promotion copy, terminal
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexing for Airport Marketing Content

## Data Profile for Airport Marketing Content
Data sources for airport marketing content include ad schedules from official airport marketing management systems, route promotion copy, terminal interactive materials, member-exclusive event assets, promotional content from partner brand collaborations, and historical posts from airport official WeChat accounts and airline mobile apps. Update cadences fall into three categories: route promotion assets are updated quarterly, regular ad schedules weekly, and temporary event assets daily. Document structure includes unique asset identifiers, publishing channels, asset types, effective time windows, associated flight numbers, and target audience tags. Field units include character count, seconds, and flight numbers.

## Constraints for Vector Models and Indexing
Data includes multi-source, heterogeneous types: structured schedule tables, unstructured copy and short video scripts. This requires vector models to support vectorization of both text and metadata. Assets with different update cadences need configurable, differentiated index refresh cycles to avoid resource waste or expired content. Structured metadata such as flight numbers and effective time windows requires indexes to support filtered recall based on metadata fields, to enable precise matching of user query scenarios. Mixed content lengths of short copy and long posts require flexible adjustment of chunking strategies to avoid breaking the logical integrity of marketing content. Cross-source material format differences require the preprocessing link to automatically adapt to different text extraction rules.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `EMBEDDING_MODEL` | `text-embedding-3-small` or `bge-large-zh-v1.5` | Airport marketing content is primarily in Chinese. These models balance vectorization accuracy and inference speed |
| `CHUNK_SIZE` | `800–1200 characters` | Matches the paragraph length of marketing copy, retains complete event information and audience guidance logic |
| `RECALL_TOP_K` | `Top 8–12 results` | Covers multi-channel, multi-scenario airport marketing content, avoids overly single recall results |
| `INDEX_REFRESH_INTERVAL` | Set to `every 15 minutes` for high-frequency temporary assets, `every 24 hours` for low-frequency route assets | Matches the update cadence of different types of marketing content, balances index performance and content timeliness |
| `MONGODB_INDEX_FIELDS` | `embedding_vector, publish_time, flight_number` | Associates vector fields, publish time, and associated flight numbers of the MongoDB collection, supports filtered recall by scenario |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Accommodates parsing time for long assets such as long video scripts and multi-page brochures |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing.

## Three Common Configuration Mistakes
- Symptom: The exported knowledge base dataset.csv only contains the index field and no content field. Cause: The `EXPORT_CONTENT_WITH_INDEX` configuration item is not enabled, or the main body content of marketing assets was not correctly extracted during the parsing phase.
- Symptom: The vector index model fails to load after Docker deployment. Cause: The model storage directory was not mounted in `docker-compose.yml`, or the access address for `EMBEDDING_MODEL_API_BASE` was not correctly configured.
- Symptom: Custom indexes associated with MongoDB collections fail to recall content normally. Cause: FastGPT index configuration does not align with the actual field names of the MongoDB collection, or the correct collection name was not specified.

## Verifying Successful Configuration
- Upload a sample airport marketing post. Review parsed chunked content to confirm chunking logic aligns with the `CHUNK_SIZE` configuration, and that copy logical integrity is preserved.
- Access the FastGPT index management page. Review index refresh task execution logs to confirm different types of marketing assets complete updates per configured refresh cycles.
- Input keywords simulating user queries to run vector recall. Verify recall result count falls within the `RECALL_TOP_K` configuration range.
- Export the knowledge base dataset.csv. Confirm the content field generates normally and contains complete asset main body content.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
