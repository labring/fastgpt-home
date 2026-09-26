---
title: Vector Models and Indexes for Traditional Chinese Medicine Financial Report Analysis
slug: /en/industry/finance-d014-c006-f004
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexes for Traditional Chinese Medicine
meta_description: Traditional Chinese medicine enterprise financial report data is sourced primarily from periodic reports disclosed by domestic stock exchanges, and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexes for Traditional Chinese Medicine Financial Report Analysis

## What This Category of Data Looks Like
Traditional Chinese medicine enterprise financial report data is sourced primarily from periodic reports disclosed by domestic stock exchanges, and annual, semi-annual, and quarterly operating announcements officially released by enterprises. Update rhythms follow legal disclosure requirements, with fixed updates on a quarterly, semi-annual, and annual basis, alongside occasional temporary operating announcements. Document structures include main business breakdowns (segments such as Chinese herbal medicine planting, proprietary Chinese medicine production, pharmaceutical commercial circulation, etc.), R&D investment, inventory details (including Chinese herbal medicine raw material inventory), gross profit margin, compliance certification disclosures, and other fields. Units cover multiple categories such as monetary and quantity-based types.

## Constraints on Vector Models and Indexes
Traditional Chinese medicine financial report data includes both structured financial fields and unstructured business disclosure content, plus business indicators with multiple unit types. This requires vector models to have strong multimodal semantic encoding capabilities. The concurrent update rhythm of fixed-period updates and temporary announcements means the index system must support a synchronization strategy that combines incremental and batch updates. Fields across different business segments have significant semantic differences, so differentiated vector recall weights must be configured for segmented fields to avoid cross-segment semantic confusion. Additionally, the pharmaceutical field has many specialized terms, so a pre-trained vector model adapted to the biomedical field must be selected to ensure accurate semantic encoding.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `EMBEDDING_MODEL` | `bge-large-zh-v1.5` | Adapts to biomedical field specialized terms, with higher semantic encoding accuracy |
| `INDEX_TYPE` | `Zilliz` | Supports incremental and batch index updates, adapts to the update rhythm of fixed-period disclosures plus temporary announcements for traditional Chinese medicine financial reports |
| `RECALL_TOP_K` | `20-30 items` | Covers relevant content across multiple segments in traditional Chinese medicine financial reports, avoids missing segmented business information |
| `SIMILARITY_THRESHOLD` | `0.75-0.85` | Filters low-match irrelevant financial report fragments, ensures relevance of recall results |
| `CHUNK_SIZE` | `800-1200 characters` | Balances completeness of specialized terms and semantic coherence, adapts to long-paragraph structure of traditional Chinese medicine financial reports |
| `INDEX_SYNC_STRATEGY` | `scheduled + incremental` | Meets synchronization needs for both fixed-period disclosures and temporary announcements, reduces index update overhead |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: Index synchronization failure occurs after migrating vector storage to Zilliz, with a `400 Bad Request` error returned in logs. Cause: The vector dimension of Zilliz is not configured to match the output dimension of the local vector model, resulting in a dimension mismatch.
- Symptom: After accessing a private reranking model, the number of returned results does not match the configuration, and recall results are unexpectedly truncated. Cause: The `RE_RANK_TOP_K` parameter is not correctly configured, or the interface return format of the private model is not adapted to FastGPT’s parsing rules.
- Symptom: Search results only cover core financial fields of financial reports, and do not include business details such as Chinese herbal medicine inventory. Cause: Vector recall weights are not adjusted for segmented business fields, leading to overly high priority of core fields and limited coverage.

## How to Confirm Proper Configuration
- Upload a single sample of a traditional Chinese medicine annual financial report, view the segmented records of the vector index, and confirm that the segment length meets the `CHUNK_SIZE` configuration requirement.
- Input test keywords related to Chinese herbal medicine planting, perform a retrieval operation, and check that the total number of recall results matches the configured `RECALL_TOP_K`.
- Switch the vector storage backend to Zilliz, view the index synchronization logs, and confirm that there are no dimension mismatch or connection timeout errors.
- Enable the private reranking model, input multiple sets of financial report-related keywords, and verify that the sorting priority of returned results meets business requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
