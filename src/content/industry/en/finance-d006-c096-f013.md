---
title: Knowledge Base Retrieval and Recall for Coke Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c096-f013
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Coke Investment
meta_description: Coke investment research data originates from four primary sources: Dalian Commodity Exchange public market data, China Coal Industry Association
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Coke Investment Research Knowledge Base Construction

## What the data for this category looks like
Coke investment research data originates from four primary sources: Dalian Commodity Exchange public market data, China Coal Industry Association industry reports, major coastal port spot transaction ledgers, and downstream steel mill production briefings.
Update cadence follows tiered scheduling:
Futures market data synchronizes daily after market close.
Monthly industry reports release in the early part of each month.
Port inventory data updates the following day.
Steel mill operating survey data updates weekly.
Each standard document includes these fields: release date, origin, benchmark spot price, total port inventory, average daily trading volume, and downstream operating related statistics.
Price units use yuan/ton. Inventory and trading volume units use ten thousand tons. Operating related statistics use standardized statistical units.

## Constraints on knowledge base retrieval and recall
The multi-source nature and tiered update cadence of coke investment research data require the knowledge base retrieval link to support incremental synchronization rules configured by update cycle. This avoids resource waste caused by full synchronization.
The structured multi-field characteristics require the retrieval system to support numerical range matching and metadata filtering. Examples include filtering relevant documents based on price ranges or total inventory.
The attribute that coke’s downstream demand is tied to the steel industry requires the recall logic to associate cross-category documents such as steel operating data and crude steel production data. This avoids the limitations of single-category retrieval.
The fixed field and unit format require the parsing link to complete unit normalization processing. This unifies the expression formats of price and inventory across different documents, ensuring the accuracy of retrieval matching.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall_count` | `top 10-15` | Coke investment research documents have high professionality. Too many recall results will exceed the context window limit, while too few will fail to cover key associated information |
| `similarity_threshold` | `0.72-0.80` | Coke documents contain a large number of precise numerical values and professional terms. A higher similarity threshold is needed to filter irrelevant content and ensure the relevance of recall results |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Single large industry reports contain multiple data tables, which take a long time to parse. A sufficient timeout setting is required to avoid parsing interruptions |
| `chunk_length` | `800-1000 characters` | Professional terms and numerical values in coke documents are closely linked. Longer chunks can retain complete contextual logic and improve retrieval matching accuracy |
| `metadata_index_toggle` | `Enabled` | Structured fields such as price and inventory can be used for quick filtering, greatly improving the efficiency of precise retrieval |
| `incremental_sync_cycle` | `Tiered configuration by document type: futures data daily, industry reports monthly` | Matches the tiered update cadence of coke data, avoiding ineffective synchronization or delayed updates |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Phenomenon: After uploading a Markdown document containing local image paths, images fail to load normally in knowledge base retrieval results, and broken placeholder icons are displayed in the interface. Cause: Images are referenced only using local absolute paths, and are not uploaded to the public storage path allowed by the knowledge base. This causes the image resources to be unavailable during retrieval.
- Phenomenon: Only the default text understanding model can be selected during the retrieval configuration phase, and custom deployed models cannot be added. Cause: The system access configuration for the custom model has not been completed, or the call permission for the custom model has not been enabled in the retrieval task.
- Phenomenon: The index generated after batch document import contains a large number of irrelevant header and footer contents, and cannot be grouped according to preset business fields. Cause: The document structured parsing function has not been enabled, and the core metadata fields to be extracted have not been specified. This causes the parsed text to contain redundant content.

## How to confirm successful configuration
- Upload a test document containing coke spot prices and port inventory, and check whether the parsed metadata fields are correctly extracted. For example, verify that fields such as origin and price values are complete.
- Initiate a retrieval based on a preset price range, and verify that documents meeting the conditions can be filtered out. Confirm that the metadata filtering function is working properly.
- View the recall count and similarity score of retrieval results, and confirm that they fall within the value range set in the configuration items.
- Upload a Markdown test document containing local images, and check whether the images load normally in retrieval results. Confirm that the resource storage path configuration is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
