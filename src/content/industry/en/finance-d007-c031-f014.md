---
title: Form and Interaction for Chemical Pharmaceutical Yield Rates
slug: /en/industry/finance-d007-c031-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Chemical Pharmaceutical Yield Rates
meta_description: Data related to chemical pharmaceutical yield rates is primarily sourced from public medical databases, regular periodic disclosures from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Chemical Pharmaceutical Yield Rates

## What data for this category looks like
Data related to chemical pharmaceutical yield rates is primarily sourced from public medical databases, regular periodic disclosures from pharmaceutical companies, pharmaceutical circulation quotation platforms, and securities trading interfaces. Market data is synchronized daily after market close. Raw material and finished product quotation data updates every 6 hours. Quarterly financial report data is released on a quarterly basis.

Each daily report document is a structured table containing fields including generic drug name, chemical molecular formula, manufacturing enterprise, raw material procurement cost, terminal sales price, per-dose profit, price difference between the current day and the previous trading day, and others. The units for cost and selling price are yuan per kilogram or yuan per dosage unit, and the unit for per-dose profit is yuan per dosage unit.

## Constraints imposed by these characteristics on the form and interaction workflow
Multiple data sources and differentiated update cycles require the form to support module-based configuration of data source trigger rules, with separate binding of update cycles for market, quotation, and financial report data.

Multiple fields and unit differences require the form to have built-in automatic unit matching verification to avoid unit incompatibility issues across data sources. Fixed fields in structured documents require the form to have preset field mapping templates that automatically associate the column names of uploaded documents with the system's built-in yield-related fields.

The requirement for incremental updates requires the interaction flow to support an incremental synchronization configuration switch, reducing resource usage caused by full pulls. Additionally, the public nature of data sources requires the form to have built-in legal compliance verification rules for data sources, filtering non-compliant data source configurations.

## How to set configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `KNOWLEDGE_BASE_SYNC_INTERVAL` | `1800 seconds` | Chemical pharmaceutical raw material and finished product quotations update every 6 hours. This interval ensures the data synchronization frequency matches the update rhythm. |
| `UPLOAD_FILE_MAX_SIZE` | `100 MB` | Each structured daily report document contains multiple columns of drug data. This upper limit covers the size of most daily report files. |
| `FIELD_MAPPING_RULE` | `Auto-match by document column name` | The field naming of chemical pharmaceutical daily reports has a high degree of standardization. Automatic matching reduces manual configuration costs. |
| `RECALL_NUMBER` | `Top 8 entries` | Each daily report typically contains dozens of drug entries. Recalling the top 8 entries covers core yield-related items. |
| `SIMILARITY_THRESHOLD` | `0.75–0.85` | Drug names and molecular formulas in the chemical pharmaceutical field have high recognizability. This threshold effectively filters irrelevant recall results. |
| `PROXY_MODEL_TIMEOUT` | `600 seconds` | Pulling data from multiple sources and parsing documents requires long processing times. This duration prevents task interruptions due to timeout mid-execution. |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing the configuration.

## Three common mistakes
- Issue: The `failed to create post p` error appears after uploading a structured daily report document. Cause: The `UPLOAD_FILE_MAX_SIZE` parameter is not set correctly. The uploaded file exceeds the preset upper limit, causing the interface request to fail.
- Issue: An empty result is returned when calling the knowledge base variable reference function to obtain yield data. Cause: The `FIELD_MAPPING_RULE` is not configured to automatic matching mode, so no association is established between document column names and system built-in variables.
- Issue: The yield reporting task remains unresponsive for a long time after triggering. Cause: The `PROXY_MODEL_TIMEOUT` parameter is not adjusted. The default timeout duration is insufficient to complete the multi-source data pulling and document parsing process.

## How to confirm the configuration is complete
- Upload a standard-format chemical pharmaceutical daily report test document, confirm that the upload status shows completed, and check whether the file size matches the `UPLOAD_FILE_MAX_SIZE` setting.
- Call the knowledge base variable reference module, select the preset yield-related fields, verify whether the returned results contain the corresponding data in the document, and confirm that the field binding is correct.
- Manually trigger a data source synchronization task, check the execution results of the synchronization log, and confirm that the synchronization cycle matches the data source update rhythm.
- Initiate a simulated reporting request, check whether the number of returned result entries matches the configured recall rules, and confirm that the interaction logic is working properly.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
