---
title: Citation Sources and Traceability for Refractory Materials Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c121-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Refractory Materials
meta_description: Data sources for this category include national and industry-released refractory material performance standard documents, batch quality inspection
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Refractory Materials Intelligent Due Diligence Reports

## What data for this category looks like
Data sources for this category include national and industry-released refractory material performance standard documents, batch quality inspection reports from production enterprises, composition test documents from raw material suppliers, and category performance ledgers from industry associations.
Update rhythm: Industry standard documents are revised every 3 to 5 years. Enterprise quality inspection reports are updated with each production batch. Raw material test documents change with each raw material batch.
Document structure: A single quality inspection report includes sample identification, chemical composition values, physical performance parameters, test date, and testing organization information. Industry standard documents include performance thresholds, applicable scenarios, and test method specifications.
Common fields include bulk density, compressive strength, and maximum service temperature. Their corresponding units are g/cm³, MPa, and ℃ respectively.

## What constraints do these characteristics impose on citation and traceability
Refractory material category data characteristics impose multiple constraints on citation and traceability.
First, batch-level quality inspection data must be bound to sample numbers or production batch numbers. Performance parameters vary significantly across different batches. Traceability requires precise matching of corresponding batch test documents.
Second, industry standard documents are revised regularly. Citations must include standard version numbers to avoid using expired performance thresholds.
Third, data documents include two types: structured tables and unstructured scanned files. Different parsing logic must be adapted. Structured data can extract fields directly. Unstructured data requires field extraction to locate parameters.
Fourth, physical performance parameters must be linked to test methods and testing organization information to ensure the credibility of traceability data.

## How to set the configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `quoteEnable` | `Enabled` | Refractory material due diligence requires clear data sources. When enabled, it can associate corresponding document fragments and batch information |
| `recallCount` | `Top 8-12 entries` | Refractory material data includes multi-dimensional performance parameters. A sufficient number of recalled documents is needed to cover different test dimensions |
| `similarityThreshold` | `0.75-0.85` | Refractory material performance parameters fall within standardized ranges. Low-match irrelevant documents must be filtered to avoid traceability errors |
| `parseChunkSize` | `800-1200 characters` | Parameter paragraphs in refractory material quality inspection reports are usually long. Appropriate chunking preserves the association between parameters and batch numbers |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Batch-uploaded refractory material quality inspection reports include multi-page scanned files. Sufficient time is required for OCR and field extraction |
| `rerankTopN` | `Top 5-7 entries` | Highly relevant traceability documents must be retained to avoid redundant information interfering with the accuracy of due diligence reports |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Issue: Citation sources are still displayed in due diligence reports after `quoteEnable` is set to disabled. Cause: A configuration cache desynchronization issue exists in version 4.9.4. The toggle does not take effect immediately after being disabled, or the global citation toggle is confused with the knowledge base citation toggle.
- Issue: Batch number fields cannot be matched during citation traceability. Cause: An appropriate chunk length is not configured, or structured data parsing is not enabled. This causes the binding relationship between batch numbers and parameters to be lost.
- Issue: Cited industry standard parameters do not match currently valid specifications. Cause: Version traceability configuration is not enabled, or standard version numbers are not included during citation. This leads to the use of expired standard document content.

## How to confirm the configuration is set correctly
- Upload a single refractory material quality inspection report, trigger a due diligence query, and check if traceability fields such as testing organization and test date are included in the returned results.
- Adjust the similarity threshold value, observe changes in the number of recalled documents, and confirm that the configuration's impact on recall results meets expectations.
- Upload multiple versions of the same category of refractory material standard documents, and verify that citations can distinguish parameter thresholds across different versions.
- Check system parsing logs to confirm that extracted document fragments include key traceability information such as sample numbers and batch numbers.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
