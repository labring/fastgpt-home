---
title: Vector Models and Indexing for List Screening KYC
slug: /en/industry/finance-d001-c041-f004
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexing for List Screening KYC
meta_description: List screening data originates primarily from regulatory sanctions lists, terrorist watch lists, court-ordered defaulter lists, and industry-shared
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexing for List Screening KYC

## What This Category's Data Looks Like
List screening data originates primarily from regulatory sanctions lists, terrorist watch lists, court-ordered defaulter lists, and industry-shared risk entity lists. Update frequency aligns with regulatory requirements: full daily syncs are standard, with temporary incremental pushes for urgent lists. Each entry includes fields such as entity name, ID type and number, institution name, risk level, inclusion reason, issuing authority, and effective time. Field types include strings, enums, and timestamps. No nested complex structures are present, but single batch sync volumes vary widely.

## Constraints on Vector Models and Indexing
Real-time updates to regulatory lists require indexes to support incremental synchronization and fast refreshes to avoid compliance risks. Wide fluctuations in single batch data volume require index sharding and scaling mechanisms to adapt to dynamic data sizes. Fields include sensitive information such as ID numbers, so vector models must retain unique entity features during encoding, while complying with data masking requirements. Enumerated risk level fields need separate classification indexes, paired with text vector indexes to improve recall accuracy. Recall results for list data must strictly match entity fields, so index recall logic should prioritize multi-field association, rather than relying solely on text similarity.

## Configuration Recommendations
| Configuration Item | Recommended Setting | Rationale |
|---|---|---|
| `embedding_model` | `bge-large-zh-v1.5` or `text-embedding-3-small` | List data mostly consists of short entity text, these models deliver stable encoding performance for entity features |
| `index_refresh_interval` | `3600 seconds` | Regulatory lists are normally updated daily; a 1-hour refresh balances sync costs and compliance timeliness |
| `recall_top_k` | `20–30` | List screening requires covering all high-match results to avoid missing risk entities |
| `similarity_threshold` | `0.75–0.85` | Entity matching requires balancing strictness to avoid false recalls of non-target entities |
| `enable_incremental_index` | Enabled | Real-time updated list data eliminates the need for full index reconstruction, reducing computational overhead |
| `sensitive_field_mask` | Mask ID number and institution name fields | List data contains sensitive information, must comply with data compliance requirements |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: When deploying v4.9.0 locally, no dedicated entity index configuration option displays when creating a knowledge base. Cause: The open-source package for this version does not expose index enhancement features for KYC list scenarios; only the commercial edition includes the corresponding configuration entry.
- Phenomenon: When configuring OneAPI as the embedding model backend, logs return a `500 Bad Gateway` error, and knowledge base index construction fails. Cause: OneAPI failed to properly forward embedding model requests, or did not configure access permissions for the target embedding model.
- Phenomenon: Recall results only match partial fields, and do not associate key entity information such as ID numbers. Cause: Multi-field combined recall configuration was not enabled during index construction, and only text similarity calculations were used.

## How to Verify Correct Configuration
- Navigate to the knowledge base settings page, confirm the `embedding_model` configuration matches the selected embedding model.
- Check index refresh logs to confirm incremental sync tasks run at the set interval.
- Upload test list data to verify that recall results include preset key entity fields.
- Check sensitive data masking configuration to confirm sensitive fields such as ID numbers have been processed as required.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
