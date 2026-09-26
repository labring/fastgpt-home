---
title: Knowledge Base Retrieval and Recall for List Screening KYC
slug: /en/industry/finance-d001-c041-f013
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for List Screening KYC
meta_description: List screening data mainly comes from sanction lists and politically exposed person (PEP) lists released by national law enforcement agencies and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for List Screening KYC

## What the Data for This Category Looks Like
List screening data mainly comes from sanction lists and politically exposed person (PEP) lists released by national law enforcement agencies and international organizations, as well as public disclosure information of involved subjects. The data update cycle is not fixed, and timely synchronization is required after official release of new lists. Each single data document includes fields such as subject name, former/alias names, document type, document number, affiliated institutions, sanction reason, issuing authority, and release date. Field types include string, date, and text, with no uniform unit attributes.

## What Constraints Do These Characteristics Impose on the "Knowledge Base Retrieval and Recall" Link
Multi-source heterogeneous data sources require retrieval systems to support connecting to different data formats and unifying formats.
Irregular update cycles require retrieval pipelines to support incremental synchronization, and avoid full reindexing to prevent wasted duplicate computing resources.
Fields contain sensitive information and entity aliases, so retrieval processes need to enable permission control, and support entity alignment to match former and official names of subjects.
High field density per single data entry requires prioritizing matching core entity fields during retrieval, instead of using full-text matching to reduce interference from irrelevant results.

## Configuration Settings
| Configuration Key | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Top N` | Top 20 entries | List screening datasets have a large number of entries, sufficient candidates must be retained to cover potential related subjects |
| `Similarity Threshold` | 0.85–0.92 | Entity names must be matched precisely to avoid recalling irrelevant entries with low similarity |
| `PARSE_CHUNK_SIZE` | 800–1200 characters | List data has high field density, chunk length should match the core information length of a single record |
| `SYNC_INCREMENT_INTERVAL` | Every 6 hours | Adapts to data sources with no fixed update cycle, balances synchronization timeliness and computing resource usage |
| `ENABLE_DOC_PERMISSION` | Enabled | List data contains sensitive information, view permissions for non-authorized roles must be restricted |
| `RERANK_TOP_N` | Top 10 entries | Filters redundant candidate results, focuses on highly relevant entity entries |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- After deleting sanction list entries from the knowledge base backend, the entries still appear in retrieval results. The cause is failure to perform an incremental synchronization operation for the vector database, or system cache not being automatically cleared.
- Occasional upload failures occur when uploading a list CSV file, and the indexing status remains stuck at 1 or 2 groups. The cause is insufficient video memory of the locally deployed `m3e-large` model during high-concurrency parsing, which interrupts parsing tasks.
- Retrieval prioritizes matching pinyin combinations of names instead of entity Chinese character names. The cause is failure to disable the `Pinyin Matching` configuration item, or retrieval weights being biased toward pinyin features.

## How to Confirm the Configuration is Properly Set Up
- Perform a manual incremental synchronization, and check if the vector database synchronization log shows the number of added or removed entries matching backend operations.
- Submit a test retrieval containing sensitive subject names, and verify that only authorized roles can view complete field information such as document numbers and sanction reasons.
- Upload a test list file, confirm that parsing progress does not stall, indexing is completed, and no abnormal error logs are generated.
- Test retrieval terms containing both pinyin and Chinese characters, and confirm that entity entries matching Chinese characters are returned first.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
