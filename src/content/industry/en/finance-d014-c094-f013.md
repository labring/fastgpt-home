---
title: Knowledge Base Retrieval and Recall for Refinery Financial Report Analysis
slug: /en/industry/finance-d014-c094-f013
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Refinery Financial
meta_description: Data sources include periodic reports of listed companies disclosed by domestic and overseas stock exchanges, internal enterprise production ledgers
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Refinery Financial Report Analysis

## What the data for this category looks like
Data sources include periodic reports of listed companies disclosed by domestic and overseas stock exchanges, internal enterprise production ledgers, and monthly operating statements. Update frequency follows: annual reports are updated once per year, quarterly reports are updated each quarter, and monthly operating data is updated monthly. Document structure combines structured tables and paragraph descriptions. Modules include equipment category, total processing volume, output volume of various products, raw material procurement costs, total revenue, and more. Fields include equipment number, processing volume, output volume, procurement unit price, and revenue amount, with units such as units, tons, ten thousand yuan, and others.

## What constraints do these characteristics place on knowledge base retrieval and recall?
Data sources are scattered across public disclosure reports and internal operating ledgers. This requires the retrieval pipeline to support cross-source associated recall, to avoid data silos. Data sources with different update frequencies need corresponding incremental update trigger rules. Monthly data requires high-frequency synchronization, while annual data only needs periodic full updates. Documents contain structured tables and paragraph descriptions. This requires the retrieval model to support both structured field matching and unstructured text semantic recall. Fields and units have clear requirements. Retrieval must automatically match field association rules, to avoid recall bias caused by mixing values with different units.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `EMBEDDING_MODEL` | `text-embedding-3-large` | Refinery financial reports contain a large number of technical terms and structured numerical values. This model has higher matching accuracy for long texts and professional semantics |
| `RECALL_TOP_K` | Top 10 entries | Refinery financial reports have many data fields. Sufficient associated information must be covered to avoid missed recalls |
| `CHUNK_SIZE` | 800–1200 characters | The structured tables and paragraph lengths of refinery financial reports are moderate. This segmentation range can retain complete semantic units and field associations |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 seconds | A single refinery financial report document usually contains multiple pages of tables and long paragraphs. Sufficient time is required to complete structured parsing and segmentation |
| `SIMILARITY_THRESHOLD` | 0.75–0.85 | A balance must be struck between recall accuracy and recall rate, to avoid excessive irrelevant content or missed valid information |
| `VECTOR_DB_TYPE` | Adapted to the scenario | When there are many structured numerical fields, a relational database can be used to store structured metadata, and unstructured text can be stored as vectors to improve retrieval efficiency |

> The parameter values provided on this page are all conventional recommendations used to determine the starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: After replacing `EMBEDDING_MODEL`, the existing knowledge base recall results deviate, and some historical documents cannot match the new semantic features. Cause: Vector index reconstruction was not performed. Existing vectors are still generated based on the old model and have not been updated synchronously.
- Phenomenon: When using `PostgreSQL` to store vectors, the semantic matching degree of recall results is lower than expected. Cause: The vector extension plugin was not enabled, or a suitable vector index type was not configured, making it impossible to efficiently handle semantic retrieval of technical terms.
- Phenomenon: A `PARSE_FAILED` error code appears when importing refinery financial report documents, and document parsing progress stalls. Cause: The document contains complex nested structured tables, and the default parsing rules cannot fully extract field and numerical association relationships.

## How to Confirm Proper Configuration
- Check the `EMBEDDING_MODEL` configuration item, confirm it matches the currently selected model, and that vector index reconstruction for historical documents has been triggered.
- Enter a query containing refinery technical terms, and check whether the recall results include target fields and corresponding numerical information.
- Import a test monthly operating data document, and check whether parsing progress and field extraction results are normal.
- Compare recall test results from different vector databases, confirm they meet the business requirements for matching accuracy.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
