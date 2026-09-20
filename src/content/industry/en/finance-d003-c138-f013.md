---
title: Knowledge Base Retrieval and Recall for Expense Statement Insurance Claim Initial Review
slug: /en/industry/finance-d003-c138-f013
page_type: Industry scenario page
article_section: Insurance Claim First-Level Review
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Expense Statement
meta_description: Expense statement data originates from medical institution billing systems and insurance company claim acceptance systems. It is submitted with each
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Expense Statement Insurance Claim Initial Review

## What Data for This Category Looks Like
Expense statement data originates from medical institution billing systems and insurance company claim acceptance systems. It is submitted with each individual claim application. Updates are triggered on demand. Data is generated and synced only when the corresponding claim enters the initial review stage. Most documents are structured tables. Fields include charge item name, medical insurance code, unit price, quantity, total price, billing department, treatment date, overall payment amount, personal out-of-pocket amount, and additional relevant fields. Amount fields use yuan as the standard unit. Quantity units are typically times, pieces, or groups.

## Constraints on Knowledge Base Retrieval and Recall From These Characteristics
The structured table format requires retrieval to preserve field associations. Full-text fuzzy matching alone cannot deliver accurate recall. Targeted retrieval rules must be set for fields such as charge items and codes. The on-demand update feature requires the knowledge base to support incremental synchronization. This avoids fully retransmitting large volumes of historical files, which would reduce retrieval efficiency. The requirement for multiple fields and fixed units means recall results must retain complete field and unit information. This prevents field associations from being lost when parsed content is broken apart. Minor format differences exist across expense statements from different medical institutions. Parsing rules compatible with multiple formats must be configured to ensure statements from all sources can be correctly identified.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Expense statement files have small sizes but require matching field structures. This setting prevents parsing interruptions due to timeout |
| `UPLOAD_FILE_MAX_SIZE` | `10 MB` | Individual expense statements are typically 1-3 pages long. This value covers standard file sizes and restricts uploads of abnormally large files |
| `Recall count` | `Top 8 results` | Individual claim expense statements usually contain 10-20 charge items. Retrieving the top 8 results covers core retrieval needs |
| `Similarity threshold` | `0.75–0.85` | Similar charge item codes and names must be differentiated. This range balances retrieval precision and coverage |
| `metadata` | Pass charge item code, claim ID | Facilitates subsequent association with claim system data, enabling quick location of corresponding expense rules and historical cases |
| `Chunk size` | `600–800 characters` | Charge statement entry groups have moderate length. This segment length retains contextual association information for charge items |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. Testing on local samples is recommended before finalizing settings.

## Three Common Configuration Mistakes
- Calling the create file collection interface with the `metadata` parameter returns empty file metadata fields. Cause: The metadata storage switch is not enabled in the knowledge base parsing configuration, so passed parameters are not persisted.
- After uploading a docx-format expense statement, RAG retrieval results do not include chapter title information from the main body. Cause: The chapter title extraction configuration during document parsing is not enabled, so title nodes are not captured during parsing.
- After configuration is complete, AI responses still include content outside the knowledge base. Cause: The strict response restriction configuration is not enabled, so the model generates content not constrained by the knowledge base.

## How to Confirm Configuration Is Complete
- Upload a test expense statement file containing 3-5 charge items. Check if parsed text retains all fields and corresponding units in full.
- Call the knowledge base retrieval interface with a test charge item keyword. Verify that the number of returned results and similarity scores fall within the configured threshold range.
- View the file collection details page. Confirm that the charge item code and claim ID fields corresponding to the `metadata` parameter are correctly displayed in the metadata section.
- Launch a simulated claim initial review query. Verify that response content only revolves around expense rules and statement information within the knowledge base, with no irrelevant content appearing.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
