---
title: Citation Source and Traceability for Glass Industry Research Reports
slug: /en/industry/finance-d009-c104-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Glass Industry Research
meta_description: Glass industry research report data draws from public reports released by architectural glass industry associations, spot check data from third-party
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Glass Industry Research Reports

## What Data for This Category Looks Like
Glass industry research report data draws from public reports released by architectural glass industry associations, spot check data from third-party building material testing institutions, and quarterly operational documents published by production enterprises.
Update cycles include monthly spot price updates, quarterly capacity inventories, and annual industry trend analyses.
Document structures typically include product specification parameters, raw material cost proportions, regional supply and demand data, and price fluctuation curve annotations.
Fields include `report_title`, `publish_time`, `product_category`, `unit_price`, `source_organization`. Most units are yuan per square meter or ton.

## Constraints Imposed on Traceability
The multi-dimensional fields and versioned update features of glass industry research reports create three traceability requirements.
First, accurately link fields such as `product_spec` and `unit_price` to corresponding paragraphs in original documents. This prevents mismatches between specifications and prices.
Second, documents with different update cycles are mixed together. Traceability results must include `publish_time` to help distinguish report content from the same category across different cycles.
Third, some reports include regional segmented data. Regional tags for paragraphs must be recorded to ensure accurate reference to content from the target region.
Enterprise internal report exclusive numbers must also be included in traceability identifiers to ensure reference uniqueness.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `recall_top_k` | Top 8-12 entries | Glass industry research report paragraphs often include specification and price details. Too many recalled entries add redundancy, while too few fail to cover complete information |
| `similarity_threshold` | 0.72-0.85 | Glass industry research reports use many specialized terms. A threshold that is too low introduces irrelevant building material category content, while a threshold that is too high fails to recall accurate specification data |
| `parse_segment_length` | 800-1200 characters | Specification parameters in glass industry research reports are often concentrated in a single paragraph. Segments that are too long lead to overly long traceability paragraphs, while segments that are too short split critical parameters |
| `source_field_mapping` | `product_spec: Product Specification, unit_price: Unit Price, publish_time: Publish Time` | The main traceability fields for glass industry research reports are specifications, prices, and publish times. Database fields must be mapped to displayable Chinese labels |
| `show_source_detail` | `true` | Engineers need to verify matching between cited original paragraphs and fields, so full display of traceability information is required |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Errors
- Cited results only display plain text fragments, not the original Markdown formatting of the document. Cause: The `parse_markdown` parameter was not enabled when uploading the knowledge base, so segmented paragraphs lose formatting information, making it impossible to restore formatting during traceability.
- Cited source fields cannot be linked to corresponding database records. Cause: No association mapping was configured between `source_id` and the database's `report_id`, so traceability fails to match original data using the retrieved document ID.
- Some queries fail to recall corresponding knowledge base files. Cause: `similarity_threshold` is set too high, so the matching degree of specialized terms in glass industry research reports fails to meet requirements, or `recall_top_k` is set too low, failing to recall paragraphs that include target specifications.

## How to Confirm Proper Configuration
- Upload a test glass industry research report document. View the metadata list after the knowledge base upload, and confirm that fields such as `report_id`, `publish_time`, `product_spec` have been correctly extracted.
- Submit a query that includes glass specifications or prices. Check the traceability module in the returned results, and confirm that the corresponding document title, publish time, and field mapping labels are displayed.
- Adjust test values for configuration parameters, and verify whether the number and matching degree of recalled documents meet expectations. Ensure no target content is missed and no irrelevant data is introduced.
- Check the `source_match` field in system logs, and confirm that the retrieved document ID is correctly linked to the `report_id` in the database, with no field mismatches.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
