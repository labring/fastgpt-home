---
title: Citation Sources and Traceability for Financial Leasing Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c129-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Financial Leasing
meta_description: - Client industry: Financial leasing
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Financial Leasing Intelligent Due Diligence Reports

## What this page covers
- Client industry: Financial leasing
- Business direction: Intelligent due diligence reports
- Capability area: Citation sources and traceability

## What this category of data looks like
Data for financial leasing due diligence reports comes from several sources. These include public information published by administrative departments for industry and commerce, property right registration records of leased assets from real estate registration centers, lessee credit reports, scanned copies of original lease contracts signed by both parties, and data from industry supervision and public platforms.

Update frequencies vary by source. Industrial and commercial information updates quarterly. Leased asset right changes sync in real time. Credit reports update monthly.

Document structures typically include four core modules. These are lessee main body qualifications, leased asset detailed list, repayment performance records, and guarantor qualifications.

Fields include original value of leased assets (unit: ten thousand yuan), lease term (unit: month), annualized rental rate (unit: %), and credit inquiry timestamp, among others.

## Constraints on citation sources and traceability
The multi-source, scattered nature of financial leasing due diligence data requires traceability links to associate unique identifiers across multiple data sources. This prevents mixing of information from different sources.

Differences in update frequencies across data sources mean independent recall time ranges must be set for industrial and commercial, credit, right registration, and other data sources. This ensures cited content is up to date and valid.

Strongly related fields such as leased asset details and repayment plans have dedicated units and numerical formats. Traceability requires matching field names and units. This prevents citation errors where values do not correspond to their units.

Additionally, due diligence reports often include OCR content from scanned documents. Original file upload paths and parsed version identifiers must be retained. This ensures traceability can be traced back to the original input files.

## Configuration settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | `Top 8 entries` | Financial leasing due diligence reports contain multi-module associated information. 8 recalled entries can cover associated data from the three core modules: lessee, leased asset, and repayment |
| `Similarity threshold` | `0.75–0.85` | Due diligence reports have high field precision requirements. This interval filters low-correlation unrelated documents while retaining valid information for cross-source matching |
| `Chunk size` | `1000–1200 characters` | Single paragraphs of due diligence reports contain complete leased asset or repayment information. This length retains full context of fields and units, avoiding loss of traceability information due to splitting |
| `Citation Source ID Return Configuration` | `Enabled` | Knowledge base document IDs and data source identifiers can be returned in the conversation interface, meeting traceability verification needs |
| `Knowledge Base Update Time Range` | `最近90 days` | Update cycles of core data sources such as industrial and commercial information and credit reports mostly fall within 30-90 days. This range ensures cited content is up to date and valid |
| `OCR Trace Retention Switch` | `Enabled` | Financial leasing due diligence reports often include contracts and property right documents in scanned format. When enabled, parsed versions and upload paths of original scanned documents are retained |

## Three common configuration errors
- Phenomenon: In version 3.9.2, conversation results only display citation entries uniformly at the bottom of the page, and do not bind corresponding content to content modules. Cause: The `分段引用展示` configuration is not enabled, making it impossible to associate specific citation sources with content modules.
- Phenomenon: When calling the conversation interface, the `sourceDocs` field is not present in the returned results or the field is empty. Cause: The `Citation Source ID Return Configuration` is not enabled, so the interface does not return unique identifiers and data source information of knowledge base documents.
- Phenomenon: In non-tool call mode, cited content is not associated with web search or external data sources. Cause: Web search configuration is not enabled, and only the local knowledge base is configured, so the large model cannot reference content from external search.

## How to confirm configuration is correct
- Enter the knowledge base configuration page, check whether the values of configuration items such as `Recall count` and `Similarity threshold` meet business requirements, save the configuration after adjustment.
- Upload a standard financial leasing due diligence report document, trigger parsing, and check whether the parsed segmented content retains complete field and unit information.
- Initiate a test conversation, check whether the file path and field identifier of the corresponding citation source are displayed in the conversation results, or check whether the `sourceDocs` field exists in the interface returned results.
- Adjust the `Knowledge Base Update Time Range` configuration, verify that the recalled content only includes documents within the specified time range.

> The parameter values provided on this page are all conventional recommendations for establishing configuration starting points. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test against your own samples before finalizing.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
