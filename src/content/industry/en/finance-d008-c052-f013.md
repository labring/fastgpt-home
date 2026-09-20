---
title: Knowledge Base Retrieval and Recall for Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c052-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Intelligent Due
meta_description: Data sources include internal consolidated financial statements, standalone operating records of subsidiaries, related transaction ledgers, and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Intelligent Due Diligence Reports

## What the data for this use case consists of
Data sources include internal consolidated financial statements, standalone operating records of subsidiaries, related transaction ledgers, and industry regulatory public documents. Update cadence follows quarterly consolidated financial statement updates, monthly related transaction ledger synchronization, and irregular regulatory inquiry response archiving. Document structures include long-form narrative text, structured financial tables, and related party lists. Fields cover consolidated total assets, attributable net profit, and related transaction amount, with units in ten thousand yuan and hundred million yuan. Subsidiary shareholding ratios are recorded as numerical values. Individual document lengths range from dozens to hundreds of pages.

## What constraints these characteristics impose on retrieval and recall workflows
The due diligence data includes both long-form text and structured content, with wide variation in individual document lengths. This requires balancing context completeness and retrieval accuracy during searching, to avoid losing business connections between parent and subsidiary companies due to overly fragmented segmentation, or introducing irrelevant information due to overly long segments. Multi-source data with varying update frequencies requires the retrieval system to support incremental synchronization and incremental recall, ensuring that the latest related transaction and subsidiary operating data is included in the retrieval scope in a timely manner. Fields with different monetary units must be uniformly normalized to avoid retrieval matching deviations caused by unit differences. Cross-entity related data requirements require the recall logic to support cross-document association matching, retrieving due diligence content for both the parent company and its corresponding subsidiaries simultaneously.

## Configuration Settings
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `chunk_size` | 800–1200 characters | Balances context completeness and retrieval accuracy for long documents, adapts to the mixed text structure of target due diligence reports, and avoids losing business connections due to overly fragmented segmentation |
| `recall_top_k` | Top 8–12 results | Covers multi-entity data requirements for parent companies, multiple subsidiaries, and related transactions, ensuring core related information is not missed |
| `similarity_threshold` | 0.72–0.78 | Distinguishes valid related content from irrelevant text, filters redundant data with low matching degrees, and improves the relevance of retrieval results |
| `rerank_top_k` | Top 3–5 results | Performs secondary filtering on recall results, focuses on the most relevant core due diligence data, and reduces context length to lower token consumption |
| `parse_file_timeout_seconds` | 300–600 seconds | Adapts to the long-document nature of individual due diligence reports, ensuring complex documents complete parsing and vectorization processing |
| `enable_incremental_parse` | Enabled | Adapts to the varying update frequency characteristics of target data, reducing computational overhead from repeated full-document parsing |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Issue: Some documents are stored as raw text fragments in the knowledge base after parsing, without generating question-answer pairs. Cause: The question-answer generation switch after document segmentation is not enabled, or the used vectorization model does not adapt to semantic associations of long-text segments.
- Issue: The error `insufficient_quota 当前分组上游负载已饱和，请稍后再试` is returned during retrieval. Cause: No load balancing policy is configured, or the recall request concurrency exceeds the resource limit of the current group.
- Issue: Retrieval response slows down and token consumption increases as knowledge base content grows. Cause: No reasonable recall count and similarity threshold are set, resulting in retrieval of too many redundant non-core document fragments and excessive context length.

## How to Verify Proper Configuration
- Upload a typical annual due diligence report for the target use case, confirm that the parsed segment length falls within the preset `chunk_size` range.
- Initiate a retrieval query for related transaction data, confirm that the recall results include relevant document fragments for both parent companies and their corresponding subsidiaries.
- Check system logs to confirm that incremental update tasks only sync newly added or modified documents, and do not repeatedly parse full datasets.
- Simulate high-concurrency retrieval requests, check for upstream load saturation errors, and confirm that the load configuration adapts to the current business scale.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
