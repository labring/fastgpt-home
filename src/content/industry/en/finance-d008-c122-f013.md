---
title: Knowledge Base Retrieval and Recall for Joint-Stock Bank Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c122-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Joint-Stock Bank
meta_description: Data sources include internal credit approval archives of joint-stock banks, compliance documents submitted to regulatory authorities, audit reports
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Joint-Stock Bank Intelligent Due Diligence Reports

## What the data for this category looks like
Data sources include internal credit approval archives of joint-stock banks, compliance documents submitted to regulatory authorities, audit reports submitted by cooperating enterprises, and inquiry data from the People's Bank of China credit reporting system.
Update frequency is adjusted based on due diligence project progress. Single-project document updates cover the full project cycle. Regular stock due diligence data is synchronized every quarter.
Document structures mostly combine structured reports and unstructured risk explanations. Fields include the customer's unified social credit code, credit balance (unit: ten thousand yuan), risk level, approval date, and more. Some documents include transcribed content from scanned paper archives.

## What constraints these characteristics impose on the knowledge base retrieval and recall link
The mixed structure of structured reports and unstructured explanations requires the retrieval system to support both keyword matching and semantic recall. This avoids missing relevant risk description content that relies only on keywords.
Data updated according to project cycles requires incremental synchronization logic. Only newly added or modified due diligence documents are updated, reducing resource consumption from full retrieval.
Documents include fields with fixed units. Retrieval must associate fields with their unit context to prevent invalid recall across units.
Documents with transcribed scanned content require OCR parsing and structured extraction support. This ensures table and digital information in images can be retrieved.

## How to set the configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `PARSE_OCR_ENABLE` | Enabled | Due diligence documents include transcribed content from scanned paper archives, requiring extraction of structured information from images |
| `MAX_PARSE_SEGMENT_LENGTH` | 800–1200 characters | Due diligence reports contain long compliance clauses; this length preserves clause integrity and avoids semantic damage from improper splitting |
| `RECALL_TOP_K` | Top 8–12 results | Joint-stock bank due diligence requires covering multi-dimensional risk points; an appropriate number of recall results ensures comprehensive information |
| `SIMILARITY_THRESHOLD` | 0.72–0.85 | Balances precision and recall coverage, avoiding omission of low-correlation but critical risk descriptions |
| `UPLOAD_FILE_MAX_SIZE` | 500 MB | Due diligence reports may include multiple attached collections, requiring support for large file uploads |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | Large due diligence documents include multiple scanned pages, requiring sufficient time for OCR and parsing |

> The parameter values provided on this page are common recommendations for initial configuration. Actual values are affected by material form, data volume and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three common errors
- Phenomenon: After uploading a PDF document with embedded images, the parsing result fails to extract tables and text from the images. Cause: The `PARSE_OCR_ENABLE` configuration item is not enabled, or the OCR parsing module has not completed initialization and deployment.
- Phenomenon: After adding a custom knowledge base selection variable in the workflow, the retrieval link cannot call the specified knowledge base. Cause: The variable's data type is not set to `knowledge base ID string` or `array`, causing the parameter transfer format to not meet system requirements.
- Phenomenon: The CSV format import option is not displayed in the knowledge base upload interface. Cause: The current FastGPT version does not enable the CSV parsing plugin, or system caching causes the interface options to load incorrectly.

## How to confirm the configuration is correct
- Upload a due diligence PDF document with embedded images. Verify if the parsing result extracts tables and text from the images to confirm the OCR configuration is active.
- Trigger an incremental synchronization task. Check whether the synchronization log only shows newly added or modified due diligence documents to confirm the incremental synchronization logic works properly.
- Initiate a retrieval test. Enter a query term that includes the credit balance unit. Check whether the recall results associate the corresponding field's context to confirm the field matching logic is active.
- Adjust the `MAX_PARSE_SEGMENT_LENGTH` parameter. Parse the same long document, compare the integrity of the segmented results to confirm the parameter configuration meets the document structure requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
