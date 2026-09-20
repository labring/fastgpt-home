---
title: Citation Sources and Provenance for Professional Services Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c002-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Provenance for Professional Services
meta_description: The data for professional services intelligent due diligence reports comes primarily from publicly archived files of industrial and commercial
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Provenance for Professional Services Intelligent Due Diligence Reports

## What the data for this category looks like
The data for professional services intelligent due diligence reports comes primarily from publicly archived files of industrial and commercial administrative departments, judicial judgment document databases, public information from industry regulatory authorities, and scanned paper due diligence working papers submitted by cooperating parties.
Data update cycles vary. Industrial and commercial archives are updated quarterly. Regulatory public information is pushed in real time. Paper working papers are uploaded on demand.
Documents mostly combine structured tables and unstructured text. They include fields such as the subject’s unified social credit code, registered address, penalty reasons, and related party transaction amount. The default unit for amount fields is ten thousand yuan. Time fields uniformly use the YYYY-MM-DD format.

## What constraints these characteristics impose on citation sources and provenance
The mixed structured and unstructured document structure requires citation provenance to cover both exact matches for structured fields and semantic association for unstructured text.
Data from multiple sources has inconsistent field naming. For example, some archives use "registration number" instead of "unified social credit code". Field mapping rules must be pre-configured to ensure provenance accuracy.
Scanned paper working papers require OCR recognition before provenance links can be established, adding a step for OCR result verification.
Real-time updated regulatory information requires synchronization of knowledge base indexes to avoid citing expired content. Provenance results must also include information release timestamps.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `ragRecallTopK` | Top 8-12 entries | Professional services due diligence reports have large data volumes. Too many recalled entries will increase context length. Too few will fail to cover core due diligence information |
| `ragSimilarityThreshold` | 0.75-0.85 | Balance exact matching and semantic matching to avoid recalling irrelevant due diligence working papers or outdated regulatory information |
| `parseOcrEnable` | Enabled | Professional services due diligence includes a large number of paper scanned working papers. OCR is required to extract text for provenance |
| `ragSourceShowDetail` | Enabled | Due diligence reports must clearly label the release time and document type of citation sources to meet compliance requirements for professional services |
| `ragUpdateInterval` | Every 6 hours | Balance real-time performance of regulatory public information and quarterly update cycle of industrial and commercial archives, while balancing retrieval efficiency and data freshness |
| `ragSourceTemplate` | Configured per business scenario | Supports custom provenance display copy to adapt to Chinese or English business display needs |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing.

## Three Common Configuration Mistakes
- Phenomenon: The provenance display copy uses the default Chinese language and cannot adapt to English business scenarios. Cause: The template content of the `ragSourceTemplate` configuration item was not modified. The platform loads Chinese provenance prompt copy by default.
- Phenomenon: The number of recalled citation entries far exceeds the configured `ragRecallTopK` value. Cause: The knowledge base recall scope was not limited, resulting in mixing non-due diligence data from other categories.
- Phenomenon: Generated content does not cite the highest-similarity match result in the knowledge base. Cause: The `ragReRankEnable` configuration was enabled. The system reorders recalled entries based on semantic relevance, prioritizing content that better matches the current query.

## How to Verify Your Configuration
- Upload a scanned paper due diligence working paper. Check if the parsing result includes OCR-extracted text and the original file’s association identifier to confirm the OCR configuration is active.
- Initiate a due diligence-related query. Review the provenance list in the returned results to confirm that the source’s release time, document type and field-mapped name are displayed, verifying the provenance details configuration.
- Modify the `ragSourceTemplate` to an English template. Initiate a query and check if the language of the provenance labels matches, confirming the template configuration is active.
- Adjust `ragRecallTopK` to a specified value. Run the same query multiple times and count whether the number of returned provenance entries matches the configured value, verifying the recall count configuration.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
