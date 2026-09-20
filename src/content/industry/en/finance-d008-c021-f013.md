---
title: Knowledge Base Retrieval and Recall for General Comprehensive Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c021-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for General
meta_description: The data for general comprehensive intelligent due diligence reports comes primarily from industrial and commercial public disclosure systems
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for General Comprehensive Intelligent Due Diligence Reports

## What the data for this category looks like
The data for general comprehensive intelligent due diligence reports comes primarily from industrial and commercial public disclosure systems, publicly released regulatory documents, due diligence workpapers submitted by target parties, public industry research reports, and credit reference databases. Update schedules are adjusted based on project progress: regulatory documents are updated when released by relevant authorities, and target party workpapers are synchronized on demand during the due diligence cycle. Most documents use a mixed structure, with structured fields including unified social credit codes, due diligence entity names, and due diligence dates, alongside long text sections such as business transaction details and risk alerts. Amount fields typically use ten thousand yuan or hundred million yuan as units, and time fields follow the YYYY-MM-DD format.

## Constraints imposed by these characteristics on the knowledge base retrieval and recall link
Differences in multi-source heterogeneous data formats require field standardization and text cleaning during the knowledge base preprocessing stage, to avoid format mismatch issues during retrieval. The high proportion of long text paragraphs in document structures requires adjusting segmentation rules to retain key logical connections and prevent semantic fragmentation. The mixed structure of coexisting structured fields and unstructured text requires support for both field-level keyword matching and full-text semantic matching, to cover different retrieval needs. The on-demand update feature of data sources requires the knowledge base to support incremental synchronization mechanisms, reducing resource usage from full re-scans. The standardized unit requirements for amounts and times require automatic unit conversion during the retrieval stage, to ensure accurate cross-document numerical and time comparisons.

## How to configure the settings
| Configuration Item | Recommended Value Range | Rationale |
| ---- | ---- | ---- |
| `chunkSize` | 800–1200 characters | Adapts to long text paragraphs in due diligence reports, retains contextual connections for business logic and risk reminders |
| `recallTopK` | Top 10–15 results | Covers scattered risk points and business details in due diligence reports, avoids missing critical information |
| `similarityThreshold` | 0.72–0.80 | Balances precision and recall coverage, adapts to text matching with many professional domain terms |
| `maxContext` | 6000–8000 characters | Accommodates core retrieval results for a single due diligence report, supports complete logical chain analysis |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | Adapts to parsing time for large-volume due diligence reports, avoids timeout errors |
| `enableStructuredRetrieval` | Enabled | Supports precise matching of fields such as unified social credit codes and due diligence dates, improves retrieval efficiency |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- Phenomenon: A `timeout of 60000ms exceeded` error occurs during batch knowledge base retrieval. Cause: The `PARSE_FILE_TIMEOUT_SECONDS` parameter was not adjusted for folders containing multiple large-volume due diligence reports. The default timeout duration is insufficient to complete batch parsing of long documents.
- Phenomenon: Amount field matching deviations appear in retrieval results, or time fields cannot be sorted according to business rules. Cause: Structured field standardization configuration was not enabled, and amount units and time formats from multiple data sources were not unified, leading to ambiguity during semantic matching.
- Phenomenon: The number of returned retrieval results is far lower than expected, and cannot cover scattered risk points in due diligence reports. Cause: The `similarityThreshold` was set too high, filtering out some key information that is semantically related but has slightly lower matching scores.

## How to confirm the configuration is correctly set
- Upload a typical general comprehensive due diligence report, and check whether the segmentation length meets business requirements via the document parsing preview interface.
- Initiate a retrieval request that includes both structured fields and text keywords, and confirm that both structured field matching results and full-text semantic matching results are returned.
- Adjust the similarity threshold and recall count parameters, and verify whether the quantity and precision of retrieval results meet business requirements via a batch test sample set.
- Simulate batch import of a folder containing large-volume due diligence reports, and check parsing time via background logs to confirm that no timeout errors are triggered.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
