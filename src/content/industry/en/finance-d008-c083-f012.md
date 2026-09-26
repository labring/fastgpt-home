---
title: Model Integration and Configuration for Water Utility Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c083-f012
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Model Integration and Configuration for Water Utility
meta_description: Data for water utility intelligent due diligence reports mainly comes from monthly operation reports of water utility operators, real-time pipe
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Model Integration and Configuration for Water Utility Intelligent Due Diligence Reports

## What the data for this category looks like
Data for water utility intelligent due diligence reports mainly comes from monthly operation reports of water utility operators, real-time pipe network monitoring data, third-party water quality test reports, regulatory public documents from local housing and urban-rural development or water conservancy departments, and bidding and completion documents for water projects.
Update rhythms vary significantly: pipe network operation parameters are updated hourly, monthly operation reports are updated monthly, water quality test reports are updated weekly or monthly, and bidding and completion documents are updated irregularly.
Document formats include structured tables, long-text analysis reports, and official public documents in PDF format. Core fields include total water supply (unit: 10,000 cubic meters), pipe network leakage rate, water quality compliance rate, project investment amount (unit: 10,000 yuan), and some monitoring data also include longitude and latitude coordinates and timestamps.

## What constraints do these characteristics impose on the "model integration and configuration" link
Water utility due diligence data includes hourly updated real-time pipe network parameters, monthly structured reports, and mixed long-text analysis reports. Core fields have clear units and data types. The model integration link must adapt to the synchronization rhythm and format requirements of multi-source data.
It is necessary to support incremental synchronization configuration to match the update frequency of real-time monitoring data. It is necessary to configure field standardization rules to unify units and data types from different sources. It is necessary to adapt to the parsing of official public documents in PDF format. It is also necessary to reserve sufficient model inference resources to handle large amounts of structured and unstructured data in a single due diligence report.

## How to set the configuration
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `embedding_max_seq_length` | `800–1200 characters` | The long-text analysis section of water utility due diligence reports usually covers core business information. This length avoids model truncation of critical data |
| `vector_store_batch_size` | `4–8` | Water utility data includes a large number of structured table entries. This batch size balances indexing efficiency and memory usage |
| `PARSE_PDF_TIMEOUT_SECONDS` | `120 seconds` | Water utility official PDF public documents usually include multi-page pipe network drawings and tables. A longer timeout ensures complete parsing |
| `field_mapping_rule` | Calibrated based on actual measurements | Different water utility enterprises have differences in field naming and units. Standardization rules must be customized for accessed data |
| `local_model_gpu_memory_threshold` | `4 GB` | Locally deployed embedding or inference models must handle mixed-format water utility data. This video memory threshold meets basic inference requirements |
| `rag_recall_top_k` | `5–7` | Water utility due diligence reports must cover multi-dimensional information such as pipe networks, water quality, and projects. This number of recalled entries balances comprehensiveness and accuracy |

> The parameter values provided on this page are common recommendations used as a starting point for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing the settings.

## Three common mistakes
- Phenomenon: After deploying the m3e vector model locally, the interface shows "Indexing" status for a long time. Cause: The `vector_store_batch_size` parameter is not configured, or the value is set too large, causing timeout when writing to the vector database in batches. There are many structured table entries in water utility data, exceeding the model's processing threshold.
- Phenomenon: An error is returned when accessing the custom embedding-2 model, and the error message includes "dimension mismatch" or "input format error". Cause: The preprocessing logic of the model input is not adjusted according to the field standardization rules for water utility data, causing mixed input of unstructured text and structured fields that does not meet the model requirements.
- Phenomenon: The <think></think> tags in the answers generated by the locally deployed deepseek-r1 model are not recognized correctly, or the inference result is empty. Cause: The format adaptation rules for model output are not configured, and the tags native to the model output are not converted to a format recognizable by the platform, making it impossible to correctly parse the long-text analysis part of the water utility due diligence report.

## How to confirm the configuration is complete
- Upload a monthly operation report PDF of a water utility, check that the parsed text and fields are complete, with no obvious truncation or format confusion.
- Trigger a vector indexing task, check that the indexing progress is completed within a reasonable time, with no long-term "Indexing" status.
- Launch a Q&A test for the due diligence report, verify that the model can correctly extract core information from structured fields and long text.
- Check the model inference logs, confirm that there are no format error or insufficient resource warning messages, and adjust parameter values based on the logs.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
