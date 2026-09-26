---
title: Knowledge Base Retrieval and Recall for Financial Report Analysis
slug: /en/industry/finance-d014-c052-f013
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Financial Report
meta_description: Financial report data for this use case comes primarily from publicly disclosed consolidated annual reports, quarterly reports, and interim
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Financial Report Analysis

## What the use case data looks like
Financial report data for this use case comes primarily from publicly disclosed consolidated annual reports, quarterly reports, and interim announcements. It also includes standalone financial reports from fully owned and controlling subsidiaries. Data updates follow a fixed quarterly and annual schedule, with temporary updates tied to major event announcements. A single financial report document includes modules such as consolidated financial statements, segment operating data, and related party transaction disclosures. Core fields include net profit attributable to parent company, revenue share of each subsidiary, asset-liability ratio, and similar metrics. Units are mostly based on ten thousand yuan or hundred million yuan. Some reports involving cross-border business include foreign currency accounting items.

## Constraints on knowledge base retrieval and recall
The dual data structure of consolidated statements and standalone subsidiary financial reports requires distinguishing between consolidated and standalone query intent during retrieval, to avoid mixed recall results. Multi-module, multi-field document content leads to redundant general recall results, so precise matching of field keywords is required. The fixed update schedule and temporary ad-hoc updates require the knowledge base to support incremental synchronization and temporary refresh mechanisms. Foreign currency accounting fields for cross-border business require associating currency information during recall, to avoid confusion across currency datasets.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `Recall count` | `Top 10-15 entries` | Financial report data includes consolidated statements and standalone subsidiary data. Too many recalled results cause context overload, while too few miss key segment operating information |
| `Similarity threshold` | `0.75-0.85` | High precision is required for matching financial report fields to business intent, so low-match unrelated documents must be filtered |
| `Chunk size` | `800-1200 characters` | Financial report paragraphs include continuous financial data and business explanations. Too long segments break semantic connections, while too short segments split data logic |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Consolidated financial report files include multi-subsidiary data, so overall parsing takes longer. Extend the timeout threshold to avoid parsing interruptions |
| `UPLOAD_FILE_MAX_SIZE` | `1000 MB` | Combined uploads of multi-subsidiary financial reports may exceed default single-file size limits, so adjustments are needed |
| `Rerank result count` | `Top 5-8 entries` | Prioritize returning the most relevant core financial report modules to reduce interference from non-essential content in retrieval results |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Each scenario requires separate analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Issue: Passing the `kbId` variable when calling the chat interface returns a 400 error. Cause: The permission to pass the knowledge base ID in system variable configuration is not enabled, or the variable is not passed as a string-formatted knowledge base identifier.
- Issue: After setting a single PDF query, retrieval results include a large number of non-target documents. Cause: The "limit recall to specified documents" configuration item is not enabled, or the unique identifier parameter for the single document is not correctly bound.
- Issue: After modifying knowledge base content, exported files still show old version content. Cause: The "re-parse" operation for the knowledge base was not performed. The exported file is a previously generated cache file and does not include the latest changes.

## How to Verify Proper Configuration
- Upload a test segment of a subsidiary's financial report, run a retrieval, and check if the recall results include distinguishing identifiers for consolidated and standalone scopes.
- Adjust the `Similarity threshold` value, run a test query, and confirm that the matching accuracy of retrieval results meets business expectations, with no low-quality irrelevant content.
- Upload a consolidated financial report file that exceeds the default size, confirm that the upload succeeds and there are no parsing timeout errors.
- Pass the `kbId` variable to start a chat, confirm that the interface returns normally with no parameter error prompts.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
