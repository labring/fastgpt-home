---
title: Citation Sources and Traceability for Jewelry Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c154-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Jewelry Intelligent
meta_description: Jewelry due diligence data primarily comes from brand official quality inspection reports, raw material supplier inspection documents, industry
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Jewelry Intelligent Due Diligence Reports

## What Data for This Category Looks Like
Jewelry due diligence data primarily comes from brand official quality inspection reports, raw material supplier inspection documents, industry compliance filing documents, and e-commerce platform product traceability labels. Data update timing adjusts with new product launches and compliance inspection results, with no fixed cycle. Updates are synchronized when core compliance fields change. Single documents are mostly structured tables or PDFs with attachments, containing raw material components, single/total weight, setting parameters, production batch numbers, quality inspection numbers, and origin information. Field units are mostly grams, carats, and pieces; some fields are unitless identification text.

## Constraints Imposed by These Characteristics on Citation Sources and Traceability
The multi-source nature of jewelry data requires marking the data source type when citing, to distinguish credibility levels between official quality inspection reports and e-commerce platform traceability labels. Structured field characteristics require precise matching of fields such as raw materials and weight when citing, to avoid unit confusion. For example, do not mix gram weight data with carat parameters of set stones. The lack of a fixed update cycle requires attaching a data acquisition timestamp to the traceability link to ensure cited content timeliness. Unique identification fields such as jewelry batch numbers and quality inspection numbers must be fully retained during traceability for subsequent cross-verification.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `maxRecall` | `100–150 items` | Jewelry data documents have many fields and relatively structured content, so enough candidate sources must be covered to match precise fields |
| `similarityThreshold` | `0.72–0.80` | Fields such as raw materials and weight of jewelry have high semantic similarity. A threshold that is too low will introduce irrelevant results, while a threshold that is too high may miss compliance documents |
| `rerankTopN` | `20–30 items` | Enough candidates must be retained for secondary screening to avoid filtering out key documents with quality inspection numbers during early recall |
| `sourceFieldWhitelist` | `["raw material components", "quality inspection number", "production batch", "origin"]` | The core traceability fields for jewelry due diligence are the above identifiers. Filtering irrelevant fields simplifies traceability display |
| `contextWindow` | `8000–12000 characters` | A single jewelry due diligence document typically combines multiple fields, so sufficient context is required to ensure complete field association |
| `dataRefreshCycle` | `Calibrated based on actual testing` | Jewelry data updates have no fixed cycle, so the refresh interval must be adjusted based on compliance inspection frequency |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to confirm values after testing on your own samples.

## Three Common Configuration Mistakes
- Phenomenon: The number of context items displayed on the page does not match the number sent to the calling interface. For example, the interface displays 30 items but the backend receives 310 items. Cause: The linkage logic between `contextWindow` and `maxRecall` was not configured correctly. Some versions of FastGPT confuse context window limits with recall counts, leading to a mismatch between front-end display and back-end call parameters.
- Phenomenon: `maxRecall` is set to 1500, but document blocks longer than 1500 characters in the knowledge base are still recalled. Cause: `maxRecall` configures the number of recalled document blocks, and does not involve the configuration of single-block character length. Failing to additionally configure `chunkMaxSize` to limit single-block length causes large document blocks to still be counted in the recall count after being split.
- Phenomenon: After citing variables into the report body, the quality inspection number field is not displayed in the traceability information. Cause: The corresponding field was not configured in `sourceFieldWhitelist`, causing the traceability link to automatically filter identification information not in the whitelist.

## How to Verify Proper Configuration
- Call the test interface, check the returned `sourceDocuments` field, and verify that the number of recalled items matches the `maxRecall` configuration.
- Generate a due diligence report preview, check that the fields displayed in the traceability module include the content in the configured `sourceFieldWhitelist`.
- Upload a jewelry document that exceeds the preset single-block length, and check whether the split block size meets expectations.
- Adjust `similarityThreshold`, then test whether irrelevant documents with low similarity are filtered out from the recall results.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
