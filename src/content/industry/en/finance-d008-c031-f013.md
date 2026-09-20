---
title: Knowledge Base Retrieval and Recall for Chemical Pharmaceutical Smart Due Diligence Reports
slug: /en/industry/finance-d008-c031-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Chemical
meta_description: Data sources for chemical pharmaceutical smart due diligence include drug registration submission materials, publicly available clinical trial
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Chemical Pharmaceutical Smart Due Diligence Reports

## What the data for this category looks like
Data sources for chemical pharmaceutical smart due diligence include drug registration submission materials, publicly available clinical trial documents, industry regulatory compliance documents, enterprise R&D pipeline announcements, API production process parameter files, and more. Update frequency varies by scenario: regulatory documents update with each submission batch, R&D pipelines update quarterly, and clinical trial data updates with phase result releases. Document formats include long-text PDF registration reports, structured Excel process sheets, JSON-formatted pipeline data, and others. Core fields include drug generic name, trade name, CAS number, production batch number, impurity content (unit: ppm), clinical trial phase, and R&D progress milestones.

## What constraints these characteristics impose on knowledge base retrieval and recall
The multi-source, scattered nature of chemical pharmaceutical due diligence data requires retrieval systems to support cross-source metadata association, to avoid duplicate or missing compliance information. Long-text registration reports and process parameter documents need appropriate segmentation logic. Poor segmentation will break the association between process parameters and clinical trial milestones. Precise fields such as CAS numbers and ppm-level impurity content require retrieval to support both keyword matching and semantic recall. A single recall mode cannot cover precise retrieval needs. Data with different update frequencies need flexible configuration for incremental and full synchronization, to ensure the timeliness of R&D pipelines and regulatory documents.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `segment_length` | 800–1200 characters | Chemical pharmaceutical documents often contain long paragraphs of process descriptions and clinical trial data. Excessively long segments will lose contextual associations, while excessively short segments cannot cover complete parameter associations |
| `recall_count` | Top 8–12 results | Due diligence reports need to cover multi-dimensional compliance data and R&D information. Too few results will miss key parameters, while too many will increase context window pressure |
| `similarity_threshold` | 0.72–0.80 | Chemical pharmaceutical data contains numerous precise fields such as CAS numbers and ppm values. A threshold that is too low will introduce irrelevant matches, while a threshold that is too high will fail to recall similar process compliance documents |
| `UPLOAD_FILE_MAX_SIZE` | 500 MB | Individual registration submission materials may contain multi-page scanned documents and structured data, requiring support for large file uploads |
| `PARSE_FILE_TIMEOUT_SECONDS` | 900 seconds | Parsing long documents requires sufficient time to complete OCR recognition and structured splitting, to avoid mid-parsing timeout failures |
| `rerank_return_count` | Top 4–6 results | Core retrieval results for due diligence reports should prioritize the most relevant compliance and R&D data, to improve report generation efficiency |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three common errors
- Phenomenon: A "No knowledge base selected" prompt appears in the chat window, and due diligence retrieval cannot be started. Cause: The dedicated chemical pharmaceutical due diligence knowledge base is not bound in the conversation configuration, or the knowledge base access permissions are not configured for the current conversation role.
- Phenomenon: Compliance questions outside the knowledge base are directly rejected, and general reasoning cannot be triggered. Cause: The `force_knowledge_base_matching` parameter is enabled, and the fallback logic for general reasoning is not retained.
- Phenomenon: Imported documents cannot be filtered for retrieval by folder, and retrieval results mix documents from different categories. Cause: No target folder was specified when importing documents, or the folder's metadata index is not enabled, so retrieval cannot filter by path.

## How to confirm the configuration is properly set
- Upload a sample document of chemical pharmaceutical registration submission materials, and check if the parsed metadata includes exclusive fields such as CAS numbers and production process parameters.
- Initiate a retrieval containing precise fields such as the CAS number of a specific drug, and verify that the number of recall results and similarity threshold match the preset configuration.
- Enable the knowledge base binding setting for the conversation, and verify that when switching between different folders, retrieval results only display documents under the corresponding path.
- Simulate a timeout scenario by uploading a large file, and check that the system triggers a reasonable timeout prompt without abnormal parsing failures.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
