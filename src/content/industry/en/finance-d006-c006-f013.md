---
title: Knowledge Base Retrieval and Recall for TCM Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c006-f013
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for TCM Investment
meta_description: TCM investment research data originates from multiple sources: editions of the Pharmacopoeia of the People's Republic of China, provincial and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for TCM Investment Research Knowledge Base Construction

## What this type of data looks like
TCM investment research data originates from multiple sources: editions of the Pharmacopoeia of the People's Republic of China, provincial and municipal TCM processing specifications, internal quality inspection reports of TCM enterprises, clinical research literature, and raw component analysis datasets. Two update cycles apply: scheduled updates for pharmacopoeia materials, revised roughly every 5 years, and unscheduled updates for enterprise inspection reports, which are adjusted alongside process changes, plus real-time additions of clinical literature.

Document structures include structured component inspection tables, unstructured pharmacopoeia text entries, and full research papers. Fields cover medicinal material name, origin, harvesting period, active ingredient content, nature, taste, meridian tropism, functions and indications. Units include grams, milligrams, percentages, degrees Celsius and other professional measurement identifiers.

## What constraints do these characteristics impose on the knowledge base retrieval and recall link
The multi-source heterogeneous nature of TCM investment research data requires retrieval to support both semantic matching and structured field filtering. This avoids low precision issues caused by relying solely on semantic recall.

Document lengths vary widely: some pharmacopoeia entries have fewer than 100 characters, while full clinical research papers can reach tens of thousands of characters. This setup requires adapting text splitting rules for different length ranges.

The presence of professional fields and units requires retrieval to support precise filtering based on conditions such as content thresholds and origin. This meets professional retrieval needs.

Data sources with multiple update cycles require configuring incremental synchronization mechanisms. This avoids resource consumption from full index reconstruction.

## How to set the configurations
| Configuration Item | Recommended Value Range | Rationale |
| ---- | ---- | ---- |
| `similarity_threshold` | 0.85–0.92 | Aligns with semantic similarity judgment for professional TCM text, to avoid low relevant processing specification entries being included in results |
| `top_k` | Top 8–12 results | Covers core paragraphs of single pharmacopoeia entries and clinical studies, while controlling retrieval load |
| `chunk_size` | 800–1200 characters | Balances semantic integrity of TCM text, avoids disrupting the coherence of professional expressions such as nature, taste and meridian tropism from short splitting |
| `enable_structured_index` | Enabled | Supports precise filtering based on fields such as active ingredient content and origin, to adapt to structured inspection data |
| `sync_interval` | Every 12 hours | Aligns with the scheduled update cycle of pharmacopoeia and daily adjustments of enterprise standards, balancing real-time performance and index construction costs |
| `max_chunk_overlap` | 100–150 characters | Retains contextual association of professional terms, avoids semantic breaks across split chunks |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Phenomenon: Duplicate document chunks in the knowledge base are automatically deleted, causing the index order from custom splitting to differ from the original document. Cause: The default document deduplication configuration is enabled, and the filter switch for duplicate text chunks was not disabled.
- Phenomenon: The retrieval interface continuously displays "Retrieving" with no results returned. Cause: Database synchronization connection parameters were not configured, or the synchronization task timed out before completion, so the index was not correctly generated.
- Phenomenon: Retrieval results include low-quality content with semantic similarity below 0.9 and full-text retrieval score below 50000. Cause: Filter rules for `similarity_threshold` and full-text retrieval scores were not set, or the threshold configuration does not meet the matching requirements for professional TCM text.

## How to verify a correct configuration
- Upload a single pharmacopoeia entry and an ingredient inspection report, check if the split text chunks retain professional fields and units, with no obvious semantic breaks.
- Set `similarity_threshold` to 0.9, retrieve "Active ingredient content of Astragalus membranaceus", check if the semantic similarity of returned results matches the set threshold.
- Run an incremental synchronization task, view the index construction log to confirm that structured field indexes were correctly generated.
- Upload two TCM inspection reports with similar content, check if the custom split order is retained and the chunks were not automatically deduplicated.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
