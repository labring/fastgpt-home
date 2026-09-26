---
title: Citation Sources and Traceability for Condiment Smart Due Diligence Reports
slug: /en/industry/finance-d008-c134-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Condiment Smart Due
meta_description: Condiment traceability data comes from three primary channels. First, industry monitoring documents published by the National Condiment
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Condiment Smart Due Diligence Reports

## What the Data for This Category Looks Like
Condiment traceability data comes from three primary channels. First, industry monitoring documents published by the National Condiment Standardization Technical Committee. Second, raw material procurement and production test reports released publicly by manufacturing enterprises. Third, sales movement and traceability barcode data from supermarket systems.

Data update frequencies vary across channels. Industry monitoring documents are updated monthly. Enterprise test reports are updated in real time alongside production batches. Sales movement data is updated weekly.

Individual documents include fields such as product barcode, production batch number, raw material traceability code, test items and corresponding values, and dealer filing information. Most field units are mg/kg (test values), boxes/ton (sales volume), and string type (barcodes and batch numbers).

## Constraints Imposed by These Characteristics on Citation Sources and Traceability
Condiment traceability data includes precise identification fields like barcodes and batch numbers. The citation process must prioritize matching these fields. Using generic text retrieval can easily retrieve irrelevant industry-wide data.

Data update frequencies differ widely between channels. Corresponding recall time ranges must be set for different data sources to avoid introducing expired production batch information.

Fields within a single document are closely linked. For example, a batch number corresponds to a specific test report. When parsing in segments, ensure the segment length covers complete field groups. Otherwise, the linkage of traceability information will be disrupted.

Additionally, test items and values in condiment traceability data must be strictly paired. Citations must retain both fields and units, otherwise the accuracy of the due diligence report will be compromised.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Count` | `Top 8` | Condiment traceability data has moderate single-document length. Too many recalled entries will cause citation redundancy. Too few will fail to cover the full traceability information required for due diligence |
| `Similarity Threshold` | `0.75–0.82` | Fields such as barcodes and batch numbers in condiment data have high recognizability. A threshold that is too low will introduce irrelevant industry-wide documents. A threshold that is too high will fail to recall matching traceability data |
| `Segment Length` | `1000–1200 characters` | Condiment traceability documents often include multiple sets of linked fields. Setting segment length to cover complete field groups avoids disrupting the linkage of traceability information |
| `PARSE_FILE_TIMEOUT_SECONDS` | `90 seconds` | Batch traceability documents include multi-page test reports, which take longer to parse. Setting 90 seconds prevents parsing failures caused by timeouts |
| `Citation Template` | `{{source.title}} | Batch No:{{source.metadata.batch_no}} | Test Item:{{source.metadata.test_item}} | Unit:{{source.metadata.unit}}` | Condiment due diligence requires clear traceable batches, test items and corresponding units. The template must include core traceability fields |
| `Reranked Return Count` | `Top 3` | Condiment traceability information requires precise matching. Retaining the top 3 most relevant entries after reranking meets due diligence requirements |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: The AI response in the workflow does not cite query results. Cause: The `Enable Citation` configuration item is not enabled, or knowledge base recall results are not passed into the context variables of the prompt.
- Symptom: The knowledge base citation variable cannot be selected in the code running node. Cause: The knowledge base output node is not connected to the input port of the code node, or the `Output Metadata` configuration of the knowledge base node is not enabled.
- Symptom: The reply only displays cited content with no main text information. Cause: Only citation display rules are configured in the prompt, and no logic for main text generation is set, or forced citation output is triggered when knowledge base recall results are empty.

## How to Verify Proper Configuration
- Upload a condiment traceability document that includes clear batch numbers and test items. Run the workflow and check the response content to confirm it includes the core traceability fields from the document.
- View the knowledge base recall logs to confirm the number of returned results matches the value set for the `Recall Count` configuration.
- Check the output node metadata of the workflow to confirm it includes traceability fields such as `batch_no` and `test_item`.
- Adjust the `Similarity Threshold` to 0.70 and 0.85, test the relevance of the recall results, and confirm the recall results meet expectations after threshold adjustment.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
