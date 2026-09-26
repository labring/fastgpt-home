---
title: Citation Sources and Traceability for Investment Platform Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c068-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Investment Platform
meta_description: Intelligent due diligence report data for investment platforms comes primarily from four categories: public industrial and commercial information
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Investment Platform Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
Intelligent due diligence report data for investment platforms comes primarily from four categories: public industrial and commercial information, listed company financial reports, industry research reports, and secondary market trading data. Update rhythms vary across sources:
- Industrial and commercial information updates irregularly alongside enterprise changes
- Financial reports are released on a quarterly or annual cycle
- Research reports update regularly or unexpectedly alongside industry developments
- Trading data is synced in real time

Document structure includes both structured fields and unstructured fragments. Structured fields include `company_code`, `report_date`, `revenue`, `debt_ratio`, and others, with corresponding units such as 100 million yuan and percentage. Unstructured fragments include original financial report paragraphs and research report commentary content.

## Constraints on Citation Traceability Imposed by These Characteristics
The characteristics of due diligence data for investment platforms impose multiple constraints on the traceability link:
1.  Dispersed multi-source data requires traceability to associate at least two types of information sources, to avoid one-sidedness from a single data source.
2.  Data sources with different update rhythms require distinguishing real-time and offline cached traceability markers, to ensure displayed cited content matches the current data version.
3.  The coexistence of structured fields and unstructured fragments requires traceability to support both precise field matching and paragraph localization.
4.  Structured data with clear units requires retaining corresponding units during traceability, to avoid data ambiguity.
5.  Multi-dimensional due diligence dimensions require recalled citation fragments to cover multiple dimensions such as revenue, risk control, and industry status, rather than focusing solely on a single indicator.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxRetrievalCount` | 10–15 entries | Due diligence data for investment platforms comes from dispersed sources; enough multi-source fragments should be retrieved to cover multiple due diligence dimensions such as revenue and risk control |
| `rerankTopN` | Top 5–8 entries | Due diligence reports require highly relevant citation fragments. Retaining TopN results after reranking filters low-value content and ensures traceability accuracy |
| `referenceFragmentLength` | 300–800 characters | Balances complete semantics of original financial report paragraphs and research report commentary, avoiding truncation of key financial data or industry analysis content |
| `mysqlQueryTimeout` | 60 seconds | Due diligence data queries involve multi-table association of enterprise information and financial report data; sufficient timeout time is required to avoid query interruptions |
| `enableSourceMeta` | Enabled | Metadata fields such as `report_date` and `source_type` need to be displayed to meet compliance traceability requirements for investment due diligence |
| `referenceDisplayMode` | Grouped display | Group by source types such as financial reports, research reports, and trading data, to help users quickly distinguish different categories of cited content |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: The AI response does not display original MySQL query fragments, only returns aggregated conclusions. Cause: The `enableSourceMeta` configuration is not enabled, or data source metadata fields are not included in API calls.
- Symptom: Citation fragments exceed the set length and are truncated, resulting in missing key financial data. Cause: The `referenceFragmentLength` value is too small and does not match long paragraphs of original financial reports in due diligence reports.
- Symptom: The number of recalled citation fragments far exceeds the set limit, causing page loading lag. Cause: The `maxRetrievalCount` limit is not configured, or filtering is not performed during the reranking stage.

## How to Verify Proper Configuration
- Initiate a query containing multi-source due diligence data, check the citation block at the end of the AI response, and confirm that metadata fields such as `report_date` and `source_type` are included.
- Check the length of citation fragments, confirm that no key data is truncated, and that it matches the setting of `referenceFragmentLength`.
- Simulate high-concurrency queries, check that the number of citation fragments returned by the interface does not exceed the set value of `maxRetrievalCount`.
- Check system logs, confirm that no `504 Gateway Timeout` error is triggered, and that the MySQL query timeout configuration is effective.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
