---
title: Knowledge Base Retrieval and Recall for Pre-existing Condition Determination in Insurance Claim Initial Review
slug: /en/industry/finance-d003-c078-f013
page_type: Industry scenario page
article_section: Insurance Claim First-Level Review
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Pre-existing
meta_description: Data sources for pre-existing condition determination primarily include de-identified historical insurance claim case files, past medical visit
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Pre-existing Condition Determination in Insurance Claim Initial Review

## What This Category of Data Looks Like
Data sources for pre-existing condition determination primarily include de-identified historical insurance claim case files, past medical visit records from health insurance systems, and official medical diagnostic standard documents such as the ICD-10 coding manual. Data is updated monthly as new claim cases are submitted.
Each individual data document includes fields such as: unique case identifier, de-identified insured identity information, list of pre-existing medical history entries, single diagnosis time, treating hospital tier, corresponding ICD-10 code, claim submission time, and underwriting determination result.
Field formatting rules: diagnosis time uses ISO 8601 date format, hospital tier uses tier 3/tier 2/tier 1 grading, and monetary fields use Chinese Yuan as the unit.

## Constraints Imposed on Knowledge Base Retrieval and Recall
The data sources contain de-identified personal sensitive information. The retrieval process must automatically filter fields such as insured identity to prevent privacy leaks.
The monthly update rhythm of the data sources requires the knowledge base to support incremental sync and pull. This reduces resource overhead from full index rebuilds.
Data includes multi-dimensional associated fields such as diagnosis time and ICD-10 code. Multi-condition combined retrieval must be supported to improve matching accuracy.
Each single data entry contains multiple independent pre-existing medical history entries. Chunking granularity must correspond to a single medical history entry to avoid mixing information across entries.
Standardized medical terminology requirements mean support for term code associated matching, covering synonym and alias scenarios.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Count` | `Top 8-12 entries` | Pre-existing condition determination needs to cover multi-dimensional past medical history records. This value balances information completeness and context length limits |
| `Similarity Threshold` | `0.75-0.85` | Medical term matching requires high accuracy to avoid interfering determination results with low-relevance pre-existing condition records |
| `Chunk Length` | `800-1200 characters` | A single pre-existing medical history entry contains diagnostic information, time, code and other content. This length can fully cover a single entry and avoid chunking across entries |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | Medical document parsing includes term code mapping and de-identification processing, which takes a long time. This setting avoids parsing timeout interruptions |
| `Incremental Sync Trigger Method` | `Pull incrementally by update time` | Data sources are updated monthly. Incremental pull reduces resource overhead from full index rebuilds |
| `Reranked Return Count` | `Top 5 entries` | The claim initial review process does not require excessive results. Focusing on highly relevant pre-existing condition records improves efficiency |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Errors
- Phenomenon: No search results are returned after calling the knowledge base retrieval interface or binding the knowledge base ID in a workflow. Cause: The incoming knowledge base ID is not bound to the permission scope of the current workflow, the valid ID of the corresponding knowledge base was not obtained correctly, or the knowledge base has not completed full index construction.
- Phenomenon: An `Invalid URL, code: 500` error is returned when calling the knowledge base upload interface. Cause: The incoming file source URL has a format error or cannot be pulled normally by the system, causing the parsing process to interrupt.
- Phenomenon: Retrieval results only match the main content, and do not associate information from auxiliary data fields. Cause: The retrieval matching rule for auxiliary data was not enabled for configuration, and recall was only performed against the main content of chunks.

## How to Confirm Correct Configuration
- Call the knowledge base retrieval interface, pass test pre-existing condition keywords, check if the number of returned results matches the configured recall count range.
- View the knowledge base index logs, confirm that the incremental sync task triggers according to the preset update time, with no abnormal interruption records.
- Upload a single pre-existing medical history document, check if the chunking results correspond to a single medical history entry, with no cross-entry chunking.
- Call the interface to verify the auxiliary data matching function, confirm that the configured auxiliary fields can be normally retrieved and recalled.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
