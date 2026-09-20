---
title: Knowledge Base Retrieval and Recall for Minor Metal Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c058-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Minor Metal
meta_description: Minor metal data comes primarily from publicly available statistical materials from the China Nonferrous Metals Industry Association, listed trading
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Minor Metal Intelligent Due Diligence Reports

## What data looks like for this category
Minor metal data comes primarily from publicly available statistical materials from the China Nonferrous Metals Industry Association, listed trading data on the Shanghai Futures Exchange, monthly operation announcements from production enterprises, and import and export trade data from the General Administration of Customs. Spot trading data updates daily. Industry supply and demand statistics update weekly. Annual industrial planning documents update quarterly. Documents fall into three categories: structured quotation tables, unstructured analysis reports, and policy and regulatory files. Fields include product name, origin identifier, transaction benchmark price, inventory scale, and production capacity data. Units are yuan/ton, origin code, yuan/ton, ten thousand tons, and ten thousand tons respectively.

## Constraints on knowledge base retrieval and recall
There are many minor metal subcategories. Accurate matching of exclusive fields such as product name and origin is required. Fuzzy matching may introduce irrelevant category content. Daily updated spot data requires the knowledge base refresh frequency to align with the update rhythm. Otherwise, recalled content may become outdated. Unstructured analysis reports have long lengths. Reasonable segmentation is needed to avoid exceeding the large model context window and truncating key analysis content. Format differences across data sources require unified parsing rules to align fields. Inconsistent field formats in recall results will disrupt due diligence logic. Import and export data links closely with policy documents. Cross-document associated recall must be supported to fully cover the information chain required for due diligence.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall count` | Top 10-15 entries | Minor metal data has many fields, requiring sufficient precise matching entries to avoid missing key quotation or supply and demand data |
| `similarity threshold` | 0.75-0.85 | There are many minor metal subcategories, requiring filtering of low-match irrelevant content while retaining valid data from precise matches |
| `segment length` | 800-1200 characters | Minor metal analysis reports have long lengths, with segment length adapted to large model context windows to avoid truncating key data |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 seconds | Some large industry report files have large sizes, requiring sufficient time to complete structured parsing |
| `maxContext` | 12000-16000 characters | Minor metal due diligence requires integrating multiple types of data including quotations, supply and demand, and policies, requiring sufficient context window to carry recalled content |
| `reranked return count` | Top 5-8 entries | Streamlining recall results, prioritizing display of core data most relevant to due diligence requirements |

> The parameter values provided on this page are common recommended starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to conduct tests on your own samples before finalizing settings.

## Three common mistakes
- Symptom: In non-tool call mode, returned results do not include knowledge base reference entries, and the web search function operates normally. Cause: The `enable knowledge base recall` configuration item is not enabled, so the large model cannot access reference content from the local knowledge base.
- Symptom: Returned results only display knowledge base reference entries at the page bottom, and cannot integrate reference content into the answer body. Cause: Only the bottom reference display mode is enabled, and the `embed references in context` parameter is not configured.
- Symptom: Uploading a single large minor metal industry report triggers a `413 Request Entity Too Large` error. Cause: The `UPLOAD_FILE_MAX_SIZE` parameter is not adjusted, and the default value cannot accommodate large industry analysis reports.

## How to verify successful configuration
- Upload a minor metal spot quotation document, check if parsed fields include exclusive fields such as product name, transaction price, and origin. Adjust custom parsing rules until all target fields are covered.
- Initiate a due diligence query, count the number of knowledge base reference entries in returned results. Adjust the `recall count` parameter until reference content for core requirements is covered.
- Test uploading a single large industry report, check if an upload error occurs. Adjust the `UPLOAD_FILE_MAX_SIZE` parameter to a suitable value range.
- Switch to non-tool call mode, verify if returned results embed knowledge base reference content. Adjust the `embed references in context` configuration item to the target mode.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
