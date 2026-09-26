---
title: Citation Sources and Traceability for Refining and Chemical Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c094-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Refining and Chemical
meta_description: Data sources for refining and chemical scenarios include real-time collection data from the enterprise’s internal distributed control system (DCS)
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Refining and Chemical Intelligent Due Diligence Reports

## What data for this category looks like
Data sources for refining and chemical scenarios include real-time collection data from the enterprise’s internal distributed control system (DCS), monthly quality inspection archive reports, and supply chain upstream and downstream raw material delivery documents.
Real-time operating data syncs hourly. Quality inspection reports are archived per production batch, with full sync completed within 72 hours maximum.
Document structures split into structured datasets and unstructured process description documents. Structured fields include unit number, operating load, raw material impurity content, and batch number. Corresponding units are none, tons per hour, milligrams per kilogram, and string type. No additional statistical percentage or quantitative ratio data is included.

## Constraints for citation sources and traceability
Real-time operating data updates hourly. Traceability links must bind timestamps precise to the hour, to avoid referencing outdated data outside the current shift cycle.
Mixed structured and unstructured document structures require matching both structured fields and contextual semantics. Single keyword recall can miss associated process parameters.
Fields with dedicated units require recall rules to link unit information. This prevents confusion between parameters of different device loads and impurity contents.
Cross-system data source association requires traceability links to connect batch numbers from both DCS systems and quality inspection systems. This ensures complete corresponding relationships for referenced data.

## Configuration settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall count` | `Top 8–12 entries` | Refining and chemical data has many fields. Too many recalled entries introduce irrelevant parameters, while too few may miss core process-related data |
| `Similarity threshold` | `0.72–0.85` | Structured field matching needs high precision, to avoid mixing content from different devices or parameters into recall results |
| `Rerank result count` | `Top 4–6 entries` | Refining and chemical process parameters have strong correlations. Retaining core associated data after reordering improves report logical coherence |
| `Citation Source Display Fields` | `Batch number + timestamp + system source` | Traceability must link to specific production batches, times, and data source systems, to meet due diligence report traceability requirements |
| `Max Context Token Count` | `8000–12000` | Refining and chemical process documents are long. Sufficient context must be retained to associate process logic and parameter details |
| `Update Sync Cycle` | `Hourly` | Matches real-time operating data update rhythm, to ensure referenced data is the latest from the current shift |

## Three common configuration mistakes
- When the `变量引用` mode is enabled, the temperature setting button disappears from the interface, and generation parameters cannot be adjusted. This occurs because the variable reference mode inherits temperature parameters from upstream configurations by default, and no independent setup entry is bound.
- The `{{id}}` field returns null in referenced data. This occurs because the `Citation Source Display Fields` configuration is not set to a field that includes batch numbers or system IDs, and no traceability ID mapping rule is established.
- Recall results include refining and chemical parameters with different units, such as confusing load data in tons per hour with volume data in cubic meters per hour. This occurs because unit matching logic is not added to recall rules, and matching relies only on keywords.

## How to confirm configuration is complete
- Initiate a query that includes a specific unit number and shift time range, and check whether the reference source fields of the returned results include batch numbers, timestamps, and system source information.
- Adjust the `Similarity threshold` to the preset range, and verify that recall results only include refining and chemical data with units matching the query parameters.
- Switch to the `变量引用` mode, confirm that generation parameters can be configured by binding upstream variables, or verify that the inherited temperature configuration meets the requirements of due diligence report generation.
- Manually trigger a knowledge base sync task, and check whether real-time operating data completes update sync within the set cycle.

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
