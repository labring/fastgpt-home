---
title: Knowledge Base Retrieval and Recall for Joint-Stock Bank Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c122-f013
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Joint-Stock Bank
meta_description: Investment research data for joint-stock banks covers internal risk control and compliance documents, listed company periodic reports, industry
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Joint-Stock Bank Investment Research Knowledge Base Construction

## What Data for This Category Looks Like

Investment research data for joint-stock banks covers internal risk control and compliance documents, listed company periodic reports, industry research reports, macroeconomic monitoring data, and regulatory policy documents.

Update cycles are tiered. Regulatory announcement documents are updated in real time upon release. Industry weekly reports are updated weekly. In-depth research reports are updated monthly. Internal special analysis reports are updated on demand.

Most documents use structured chapter formats, including tables, visual charts, and paragraphs with professional terminology. Fields include report number, issuing institution, release date, industry classification, target rating, target price, core data indicators, and more. Units include RMB yuan, percentage, 100 million yuan, and others.

## Constraints Imposed by These Characteristics on Knowledge Base Retrieval and Recall

Multi-source investment research data with widely varying update cycles requires the retrieval system to support filtering recall scope by update time. This prevents expired data from being included.

Documents contain structured tables and visual charts. The retrieval system must support extracting text content from charts. Otherwise, core investment research information carried by charts cannot be covered.

Rich field dimensions require the retrieval system to support precise filtering by fields such as industry classification and issuing institution. This narrows the recall candidate set.

A high proportion of long text documents requires retaining contextual connections during segmentation. This avoids losing the complete logic of professional terms after splitting.

## Configuration Settings

| Configuration Item | Recommended Value | Rationale for the Value |
| --- | --- | --- |
| `chunk_size` | 800–1200 characters | Most joint-stock bank investment research documents are long-text research reports. This length preserves the core logic of a single chapter while avoiding contextual breaks. |
| `recall_top_k` | Top 10–15 results | Investment research data has multiple dimensions. A sufficient candidate set must be recalled for subsequent re-ranking and filtering, balancing recall breadth and precision. |
| `similarity_threshold` | 0.72–0.80 | Professional terminology accounts for a high share in the investment research field. This threshold filters low-match irrelevant content while retaining results matched with professional terminology. |
| `rerank_top_k` | Top 3–5 results | Final output must focus on core investment research conclusions, avoiding interference from redundant information in decision-making. |
| `enable_field_filter` | Enabled | Investment research data requires precise filtering by fields such as industry classification and issuing institution, to narrow the recall scope. |
| `parse_image_ocr` | Enabled | Investment research documents often include data charts. Text within charts must be extracted for retrieval, to cover core information carried by visualizations. |

> The parameter values provided on this page are all common recommendations used as a starting point for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes

- Phenomenon: Low accuracy of retrieval results for complex investment research questions, or failure to return corresponding conclusions. Cause: The `similarity_threshold` was not adjusted for investment research professional terminology. An overly high threshold leads to insufficient matching of professional terminology, or `enable_field_filter` was not enabled, leading to recall of irrelevant industry data.
- Phenomenon: Semantic retrieval fails to hit knowledge chunks containing specified keywords. Cause: Keyword weights were not configured, `enable_field_filter` was not enabled, or context fragments containing keywords were lost during document segmentation.
- Phenomenon: When using a strict question-answering template, retrieving an image address returns no answer. Cause: `parse_image_ocr` was not enabled, so text carried within the image was not extracted, leading to the strict template being unable to match investment research information associated with the image.

## How to Confirm the Configuration Is Correct

- Upload a typical joint-stock bank industry research report, check the parsed segmentation results, confirm the segmentation length meets expectations.
- Initiate a retrieval request containing professional investment research terminology, check the field matching status of the recall results, confirm `enable_field_filter` is active.
- Upload a document containing data charts, confirm the parsed results include text extracted from within the charts.
- Call the API interface with the specified `kb_id`, confirm the returned retrieval results are associated with data from the target knowledge base.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
