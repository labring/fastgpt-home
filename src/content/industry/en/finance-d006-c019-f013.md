---
title: Knowledge Base Retrieval and Recall for Duty-Free Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c019-f013
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Duty-Free Investment
meta_description: Duty-free investment research data comes from four main sources: offshore duty-free policy announcements released by the General Administration of
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Duty-Free Investment Research Knowledge Base Construction

## What the Data for This Category Looks Like
Duty-free investment research data comes from four main sources: offshore duty-free policy announcements released by the General Administration of Customs, daily updated operation ledgers from offshore duty-free shops, duty-free price lists provided by brands, and public operational information from stores.
Policy documents mostly use PDF and Word formats, and include clauses such as offshore duty-free quotas and purchase restriction rules.
Operation ledgers are structured Excel files, with fields including SKU code, duty-free retail price, and purchase limit quantity. Units are mostly yuan/person-time and piece/order.
Store documents include information such as address and business hours.
Update rhythms vary significantly: policy documents are updated irregularly, while operational data is updated daily or weekly.

## Constraints Imposed on Knowledge Base Retrieval and Recall
The multi-source and decentralized nature of duty-free investment research data requires the retrieval system to support both structured field matching and unstructured text recall. This avoids missing policy clauses and operational data.
Frequently updated operational data requires the retrieval system to support incremental updates. This prevents data lag from affecting investment research accuracy.
Mixed document formats require adaptation to parsing logic for multiple types such as PDF and Excel. This ensures that both policy text and SKU data can be correctly indexed.
Fields have dedicated units. Retrieval must match unit dimensions to avoid confusing results with different limiting conditions.

## Configuration Recommendations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Count` | `8-12 results` | Duty-free related documents include structured operational data and unstructured policy text. Too many recall results will cause context overload, while too few will miss key policy clauses |
| `Similarity Threshold` | `0.72-0.85` | Duty-free policy text is precise, so low-related generic results need to be filtered. SKU matching for operational data requires high accuracy, so this interval covers needs for different scenarios |
| `Chunk Length` | `800-1200 characters` | Duty-free policy documents are mostly long paragraphs, while single records in operational data tables are moderately sized. This chunk length preserves complete purchase restriction rules and price information |
| `Rerank Result Count` | `4-6 results` | Investment research scenarios require prioritizing the most relevant policies and core operational data. Reranking optimizes sorting logic to avoid structured data being overwhelmed by unstructured content |
| `UPLOAD_FILE_MAX_SIZE` | `1000 MB` | Duty-free inventory list Excel files may contain large amounts of SKU data. This setting allows upload of large files while preventing parsing timeouts from overly large single files |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Parsing large duty-free operational data files takes significant time, so extending the timeout ensures complete parsing |

> The parameter values provided on this page are general recommendations used as a starting point for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: Knowledge base retrieval returns no results, and GPU resource usage is 0. Cause: GPU acceleration configuration for knowledge base retrieval is not enabled, or the acceleration service failed to start properly.
- Symptom: After uploading a duty-free promotional PDF containing product images, retrieval results only return text content and do not include image OCR text. Cause: FastGPT's mixed text and image parsing function is not enabled, or image OCR configuration is not turned on.
- Symptom: After modifying the `Similarity Threshold` to 0.8, saving the change and re-entering the configuration interface, the parameter displays the default value of 0.7. Cause: Configuration changes were not written to the persistent storage directory, or the service loaded the default configuration file on startup.

## How to Confirm Proper Configuration
- Upload a test document containing duty-free policy clauses and SKU data, run a retrieval test, and check if the number of returned results falls within the configured range.
- View the knowledge base parsing log to confirm that structured data fields such as duty-free quota and purchase limit quantity are correctly extracted, with no missing fields.
- Restart the FastGPT service, re-enter the knowledge base configuration interface, and check that all modified parameters remain unchanged.
- Upload a duty-free promotional PDF containing product images, run a retrieval, and confirm that the OCR text content of the images is included in the returned results.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
