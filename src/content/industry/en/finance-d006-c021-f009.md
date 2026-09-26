---
title: Citation Sources and Provenance for General Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c021-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Provenance for General Investment
meta_description: Data sources for general investment research include public industry research reports, regulatory agency public documents, listed company periodic
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Provenance for General Investment Research Knowledge Base Construction

## What data for this category looks like
Data sources for general investment research include public industry research reports, regulatory agency public documents, listed company periodic announcements, and third-party industry databases.
Data update follows two patterns: event-triggered and scheduled release. Regulatory documents update immediately when policies are published. Industry research reports update regularly per institutional schedules. Corporate announcements are pushed in real time when business events occur.
Documents have unified standard fields: publishing entity, publish time, and document number. Most main body content consists of long text paragraphs. Some documents include structured table data. Individual documents have wide variation in word count, and are stored as individual files.

## What constraints these characteristics impose on citation sources and provenance
Different data sources have varying levels of credibility. Regulatory documents and corporate announcements have higher authority. Third-party database data requires additional source verification information. As a result, citation provenance must support configuring weights by source.
Real-time event-triggered data requires the provenance chain to quickly link to the latest document versions, avoiding the return of outdated content.
Documents with structured tables require precise location of the table's page number and paragraph range during provenance. Only marking the start of the main body does not meet precise provenance requirements.
The wide variation in word count across individual documents requires support for splitting provenance by paragraph and chapter. Returning only the overall document link cannot locate specific cited fragments.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `recall_top_k` | `Top 8-12 results` | Data sources for general investment research are scattered, so enough candidate segments must be recalled to cover multiple data types and avoid missing authoritative documents |
| `similarity_threshold` | `0.65-0.75` | Investment research content is highly professional; this balances recall precision and coverage. A threshold that is too low introduces irrelevant noise, while one that is too high may miss relevant segments |
| `source_weight_config` | `Regulatory documents:1.2, Corporate announcements:1.1, Industry research reports:1.0, Third-party databases:0.9` | Different sources have varying authority levels. Adjust recall ranking by weight to prioritize display of high-credibility content |
| `chunk_max_length` | `800-1200 characters` | Investment research documents mostly contain long paragraphs and structured tables. Splitting to this length preserves complete logical units, facilitating precise provenance of cited segments |
| `trace_segment_level` | `Paragraph level` | The wide word count range of individual documents requires paragraph-level provenance to accurately locate the specific content of citations, meeting precise provenance needs for investment research scenarios |
| `update_strategy` | `Incremental real-time update + daily full verification` | Event-triggered data requires real-time synchronization, while scheduled data requires daily verification updates to ensure provenance content matches the latest version |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on appropriate samples before finalizing settings.

## Three common configuration errors
- Phenomenon: Recall results only return a single document link, without displaying specific cited segments. Cause: The `trace_segment_level` parameter is not configured. The default setting only returns full-document provenance, unable to locate specific cited paragraphs.
- Phenomenon: A 400 Bad Request error status code is returned after calling, with the prompt "source_weight_config format is invalid". Cause: The configured weight dictionary does not use English colons and commas as required, or includes unsupported source types.
- Phenomenon: Recall results have high matching degree with search keywords, but expected authoritative documents are not returned. Cause: The `similarity_threshold` is set too high, filtering out eligible authoritative data source content.

## How to confirm the configuration is correct
- Upload an investment research document containing structured tables, trigger a recall, and check the provenance information to confirm whether the table's paragraph position and page number are displayed.
- Adjust `similarity_threshold` to different ranges, compare the number and matching precision of recall results to verify the threshold configuration's rationality.
- Upload test documents from different sources, check the recall ranking results to confirm that documents from high-weight sources are displayed first.
- Trigger an incremental update task, check the document synchronization status to confirm whether the real-time update configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
