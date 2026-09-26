---
title: Citation Sources and Provenance for Paper Manufacturing Financing Daily Reports
slug: /en/industry/finance-d013-c147-f009
page_type: Industry scenario page
article_section: Financing Daily Report
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Provenance for Paper Manufacturing
meta_description: Data sources for paper manufacturing industry financing daily reports include listed company announcements from the Shanghai Stock Exchange and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Provenance for Paper Manufacturing Financing Daily Reports

## What data for this category looks like
Data sources for paper manufacturing industry financing daily reports include listed company announcements from the Shanghai Stock Exchange and Shenzhen Stock Exchange, industry monitoring public disclosures from the China Paper Association, and regional financing filing information from local financial supervision bureaus. Data is synced daily at midnight for all financing entries from the previous day. Most documents are in structured CSV or single-page PDF format, with seven standard fields: unified social credit identifier, company name, financing type, financing amount, financing occurrence date, disclosure date, and release channel. Financing amount is denominated in ten thousand yuan. Financing types include three common scenarios: working capital loan, bill discounting, and supply chain financing.

## What constraints do these characteristics impose on the citation sources and provenance workflow
Dispersed multi-source data requires the provenance process to cover three levels of disclosure channels: exchanges, industry associations, and local regulators, to avoid missing information from single sources. The daily T+1 update rhythm requires provenance timestamps to be bound to disclosure dates, not collection times, to ensure consistent information timing. The presence of the unified social credit identifier field requires verifying the identity match of the financing subject during provenance, to avoid mixing up financing information of different paper manufacturing enterprises. Some small and medium-sized enterprises’ financing information is only publicly disclosed on local non-standard platforms, without unified announcement numbers, so complete page URLs must be retained as provenance basis, and simplified identifiers cannot be used for provenance. Additionally, paper manufacturing industry financing subjects include listed companies and regional leading enterprises, with different disclosure compliance levels across subjects, so the provenance workflow must adapt to format specifications of different levels of data sources.

## How to configure the settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `rag_source_enable` | `Enabled` | Enable multi-source provenance binding to associate the complete original disclosure URL with each financing daily report entry |
| `rag_source_max_depth` | `2 levels` | Adapt to the cross-level provenance needs of paper manufacturing financing daily reports with multiple sources (exchanges + associations + local regulators) |
| `parse_chunk_size` | `800–1200 characters` | Adapt to the field length of structured documents, avoid splitting that damages key information such as financing subjects and financing amounts |
| `rag_recall_topk` | `Top 8 entries` | Cover the recall needs of multiple financing transactions in a single daily report, avoid missing financing entries of small and medium-sized paper manufacturing enterprises |
| `rag_source_verify` | `Enabled` | Verify the consistency between the unified social credit identifier of the financing subject and the disclosed information, prevent provenance errors |
| `rag_timeout` | `600 seconds` | Adapt to the delay of multi-source data collection, avoid provenance failures caused by slow data source loading |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test against your own samples before finalizing.

## Three common configuration mistakes
- Recall results include non-paper manufacturing financing entries. Cause: The `rag_source_verify` parameter is not enabled, and the industry attribute of the financing subject is not verified against the paper manufacturing category.
- Some financing entries lack provenance links. Cause: The `rag_source_enable` parameter is not configured, and the original disclosure URL is not bound.
- Workflow calls cannot reference locally uploaded financing daily report file variables, only public links are supported. Cause: Workflow file call parameters are not correctly configured, and only public link reference permissions are enabled.

## How to confirm the configuration is complete
- Upload a single paper manufacturing financing daily report test file, check if parsed fields retain key information such as company name and financing amount, adjust `parse_chunk_size` to match the current document length.
- Initiate a financing information query request, check if each entry in the returned results includes the complete URL of the original data source, verify the active status of `rag_source_enable` and `rag_source_verify`.
- Configure a workflow to call this knowledge base, attempt to upload a local test file, confirm whether file references are supported, adjust workflow file parameter configurations.
- Simulate a scenario where multiple sources are called simultaneously, check if the system completes provenance requests within a reasonable time, adjust the `rag_timeout` parameter to match current data source loading speeds.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
